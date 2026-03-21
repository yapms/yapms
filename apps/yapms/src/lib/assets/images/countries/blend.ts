// This script blends two images (one.jpg + two.jpg) using Laplacian pyramid blending
// to produce a 1200x600 blended.webp card background image. See additional elaboration below:

const INTRO_MESSAGE = `
This script blends two or four images using Laplacian blending to create a 1200x600 (2) or 2160x600 (4) country card background image.

To use, either:
  Place two 800x600 JPGs named one.jpg and two.jpg into a country folder and call this script with the folder name as an argument and 2 as the number to blend.
  Ex: node blend.ts bra 2
  This script will then output a 1200x600 blended.webp in that folder. one.jpg will appear on the LEFT and two.jpg on the RIGHT.
OR
  Place four 800x600 JPGs named one.jpg, two.jpg, three.jpg, and four.jpg into a country folder and call this script with the folder name as an argument and 4 as the number to blend.
  Ex: node blend.ts bra 4
  This script will then output a 2160x600 blended.webp in that folder. Images will appear from left to right, i.e one.jpg, two.jpg, three.jpg, four.jpg.
`;

import path from "path";
import fs from "fs";
import sharp from "sharp";
import cv from "@techstark/opencv-js";

// parameters
let IN_W = 800;
let IN_H = 600;
let OUT_W = 1200;
let OUT_H = 600;
let BLEND_W = 200;  // width of blend zone
const LEVELS = 6;    // more levels = smoother transition

// print with colors
const printError = (msg: string) => console.error(`\x1b[31m${msg}\x1b[0m`); //red
const printInfo = (msg: string) => console.log(`\x1b[36m${msg}\x1b[0m`); //blue
const printSuccess = (msg: string) => console.log(`\x1b[32m${msg}\x1b[0m`); //green

// load image into a 4-channel matrix we can use
async function loadImage(filepath: string) {
  let data, info;
  try {
    ({ data, info } = await sharp(filepath).ensureAlpha().raw().toBuffer({ resolveWithObject: true }));
  } catch {
    printError(`Could not load image ${filepath}`); process.exit(1);
  }
  if (info.width !== IN_W || info.height !== IN_H) {
    printError(`${filepath} must be ${IN_W}x${IN_H} (got ${info.width}x${info.height})`);
    process.exit(1);
  }
  const mat = new cv.Mat(info.height, info.width, cv.CV_8UC4);
  mat.data.set(data);
  return mat;
};

async function writeToWebp(result: cv.Mat, outPath: string) {
  const resultBuf = Buffer.from(result.data);

  await sharp(resultBuf, {
    raw: { width: OUT_W, height: OUT_H, channels: 4 },
  })
    .webp({ quality: 20 })
    .toFile(outPath);

  printSuccess(`Saved ${outPath} (${OUT_W}x${OUT_H})`);
}

// pyramid functions
function buildGaussianPyramid(img: cv.Mat, levels: number) {
  const pyramid = [];
  let current = new cv.Mat();
  img.convertTo(current, cv.CV_32FC4); // no op if already 32fc4
  pyramid.push(current);

  for (let i = 1; i < levels; i++) {
    const down = new cv.Mat();
    cv.pyrDown(pyramid[i - 1], down);
    pyramid.push(down);
  }
  return pyramid;
}

// build laplacian from a gaussian pyramid
function buildLaplacianPyramid(gaussianPyramid: cv.Mat[]) {
  const lp = [];
  const numLevels = gaussianPyramid.length;

  for (let i = 0; i < numLevels - 1; i++) {
    const dstSize = new cv.Size(gaussianPyramid[i].cols, gaussianPyramid[i].rows);
    const expanded = new cv.Mat();
    cv.pyrUp(gaussianPyramid[i + 1], expanded, dstSize);

    const lap = new cv.Mat();
    cv.subtract(gaussianPyramid[i], expanded, lap);
    lp.push(lap);
  }

  // Deepest level: just copy the coarsest Gaussian level
  const coarsest = new cv.Mat();
  gaussianPyramid[numLevels - 1].convertTo(coarsest, cv.CV_32FC4);
  lp.push(coarsest);

  return lp;
}

// blend lp1 and lp2 using mask
function blendPyramids(lp1: cv.Mat[], lp2: cv.Mat[], maskPyramid: cv.Mat[]) {
  const blended = [];

  for (let i = 0; i < lp1.length; i++) {
    // Expand single-channel mask to 4 channels to match images
    const chVec = new cv.MatVector();
    for (let ch = 0; ch < 4; ch++) chVec.push_back(maskPyramid[i]);
    const mask = new cv.Mat();
    cv.merge(chVec, mask);

    // Create inverse mask (1 - mask)
    const invMask = new cv.Mat();
    const ones = new cv.Mat(mask.rows, mask.cols, mask.type(), new cv.Scalar(1, 1, 1, 1));
    cv.subtract(ones, mask, invMask);

    // blended = mask * l1 + (1 - mask) * l2
    const img1Blended = new cv.Mat();
    const img2Blended = new cv.Mat();

    cv.multiply(mask, lp1[i], img1Blended);
    cv.multiply(invMask, lp2[i], img2Blended);

    const blendedLevel = new cv.Mat();
    cv.add(img1Blended, img2Blended, blendedLevel);
    blended.push(blendedLevel);
  }

  return blended;
}

// reconstruct image from it's laplacian pyramid
function reconstructFromLaplacian(pyramid: cv.Mat[]) {
  let img = pyramid[pyramid.length - 1].clone();

  for (let i = pyramid.length - 2; i >= 0; i--) {
    const dstSize = new cv.Size(pyramid[i].cols, pyramid[i].rows);
    const up = new cv.Mat();
    cv.pyrUp(img, up, dstSize);

    cv.add(up, pyramid[i], img);
  }
  return img;
}

function laplacianBlend(img1: cv.Mat, img2: cv.Mat, mask: cv.Mat) {
  // Build Gaussian pyramids (F32)
  const gp1 = buildGaussianPyramid(img1,  LEVELS);
  const gp2 = buildGaussianPyramid(img2, LEVELS);
  const maskPyramid = buildGaussianPyramid(mask, LEVELS);

  // Build Laplacian pyramids
  const lp1 = buildLaplacianPyramid(gp1);
  const lp2 = buildLaplacianPyramid(gp2);

  const blendedPyramid = blendPyramids(lp1, lp2, maskPyramid);

  // Construct blended image from the blended laplacian
  const resultF = reconstructFromLaplacian(blendedPyramid);

  // Clip to [0,255] and convert back to uint8
  cv.threshold(resultF, resultF, 255, 255, cv.THRESH_TRUNC);
  cv.threshold(resultF, resultF, 0, 0, cv.THRESH_TOZERO);

  const result = new cv.Mat();
  resultF.convertTo(result, cv.CV_8U);

  return result;
}

function blend2(img1: cv.Mat, img2: cv.Mat) {
  // Resize images to OUT_W x OUT_H, padding with (0, 0, 0, 0)
  // img1: pad OUT_W - IN_W px on the RIGHT
  // img2: pad BLEND_W * 2 px on the LEFT
  cv.copyMakeBorder(img1, img1, 0, 0, 0, OUT_W - IN_W, cv.BORDER_CONSTANT, new cv.Scalar(0, 0, 0, 255));
  cv.copyMakeBorder(img2, img2, 0, 0, OUT_W - IN_W, 0, cv.BORDER_CONSTANT, new cv.Scalar(0, 0, 0, 255));

  // Create mask ranging from (0, 1), going from 1 on the left to 0 on the right.
  // 255 = take from one.jpg, 0 = take from two.jpg
  const maskData = new Float32Array(OUT_W * OUT_H);
  const blendStart = Math.floor(OUT_W / 2 - BLEND_W / 2);
  const blendEnd = Math.floor(OUT_W / 2 + BLEND_W / 2);

  for (let y = 0; y < OUT_H; y++) {
    for (let x = 0; x < OUT_W; x++) {
      let alpha;
      if (x < blendStart) {
        alpha = 1.0;
      } else if (x >= blendEnd) {
        alpha = 0.0;
      } else {
        alpha = 1.0 - (x - blendStart) / BLEND_W;
      }
      maskData[y * OUT_W + x] = alpha;
    }
  }

  const mask = new cv.Mat(OUT_H, OUT_W, cv.CV_32FC1);
  mask.data32F.set(maskData);

  // Do the actual blending
  return laplacianBlend(img1, img2, mask);
}

// Wait for cv to initialize, and then run the script

cv.onRuntimeInitialized = async () => {
  printInfo(INTRO_MESSAGE);

  // Parse argument and load images
  if (process.argv.length !== 4) {
    printError(
      "Please provide the name of a directory within this folder and the number of images (2 or 4) to blend.\n\n  Ex: node blend.js bra 2"
    );
    process.exit(1);
  }

  const numToBlend = Number(process.argv[3]);
  if (numToBlend !== 2 && numToBlend !== 4) {
    printError(`Please ensure the number of images to blend is either 2 or 4`);
    process.exit(1);
  }

  const countryCode = process.argv[2];
  const countryDir = path.join(".", countryCode);

  if (!fs.existsSync(countryDir) || !fs.statSync(countryDir).isDirectory()) {
    printError(`Could not find directory: ${countryDir}`);
    process.exit(1);
  }

  const img1Path = path.join(countryDir, "one.jpg");
  const img2Path = path.join(countryDir, "two.jpg");
  const outPath = path.join(countryDir, "blended.webp");

  if (!fs.existsSync(img1Path)) { printError(`Could not find image ${img1Path}`); process.exit(1); }
  if (!fs.existsSync(img2Path)) { printError(`Could not find image ${img2Path}`); process.exit(1); }

  const img1 = await loadImage(img1Path);
  const img2 = await loadImage(img2Path);

  if (numToBlend == 2) {
    const blended = blend2(img1, img2)
    writeToWebp(blended, outPath);
  } else if (numToBlend == 4) {
    const img3Path = path.join(countryDir, "three.jpg");
    const img4Path = path.join(countryDir, "four.jpg");

    if (!fs.existsSync(img3Path)) { printError(`Could not find image ${img3Path}`); process.exit(1); }
    if (!fs.existsSync(img4Path)) { printError(`Could not find image ${img4Path}`); process.exit(1); }

    const img3 = await loadImage(img3Path);
    const img4 = await loadImage(img4Path);

    const intermediate1 = blend2(img1, img2);
    const intermediate2 = blend2(img3, img4);

    // Update parameters
    IN_W = 1200;
    IN_H = 600;
    OUT_W = 2160;
    OUT_H = 600;
    BLEND_W = 120;

    const final = blend2(intermediate1, intermediate2);
    writeToWebp(final, outPath);
  }
}