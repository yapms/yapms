
import sys
import os

# Print error, info and success in different colors using ANSI color codes
def printError(msg):
    RED = '\033[31m'
    RESET = '\033[0m' # Resets the color to default
    print(RED + msg + RESET)

def printInfo(msg):
    CYAN = '\033[36m'
    RESET = '\033[0m'
    print(CYAN + msg + RESET)

def printSuccess(msg):
    GREEN = '\033[32m'
    RESET = '\033[0m'
    print(GREEN + msg + RESET)

def build_gaussian_pyramid(img, levels):
    pyramid = [img.astype(np.float32)]
    for _ in range(levels - 1):
        img = cv2.pyrDown(img)
        pyramid.append(img.astype(np.float32))
    return pyramid

def build_laplacian_pyramid(gaussian_pyramid):
    laplacian_pyramid = []
    levels = len(gaussian_pyramid)
    for i in range(levels - 1):
        size = (gaussian_pyramid[i].shape[1], gaussian_pyramid[i].shape[0])
        expanded = cv2.pyrUp(gaussian_pyramid[i + 1], dstsize=size)
        laplacian = cv2.subtract(gaussian_pyramid[i], expanded)
        laplacian_pyramid.append(laplacian)
    laplacian_pyramid.append(gaussian_pyramid[-1].astype(np.float32))
    return laplacian_pyramid

def blend_pyramids(lp1, lp2, gp_mask):
    blended = []
    for l1, l2, gm in zip(lp1, lp2, gp_mask):
        # Normalize mask to [0, 1] if needed
        if gm.max() > 1.0:
            gm = gm / 255.0
        # Handle grayscale mask with color images
        if len(l1.shape) == 3 and len(gm.shape) == 2:
            gm = gm[:, :, np.newaxis]
        blended_level = gm * l1 + (1 - gm) * l2
        blended.append(blended_level)
    return blended

def reconstruct_from_laplacian(laplacian_pyramid):
    img = laplacian_pyramid[-1]
    for i in range(len(laplacian_pyramid) - 2, -1, -1):
        size = (laplacian_pyramid[i].shape[1], laplacian_pyramid[i].shape[0])
        img = cv2.pyrUp(img, dstsize=size)
        img = cv2.add(img, laplacian_pyramid[i])
    return img

def laplacian_blend(img1, img2, mask, levels=6):
    """
    Blend two images using Laplacian pyramid blending.

    Args:
        img1: First image (numpy array)
        img2: Second image (numpy array)
        mask: Blend mask (0=img2, 255=img1). Same size as images.
              A soft/gradient mask gives the best seamless results.
        levels: Number of pyramid levels (default: 6)

    Returns:
        Blended image as uint8 numpy array
    """
    # Ensure images are the same size
    h, w = img1.shape[:2]
    img2 = cv2.resize(img2, (w, h))
    mask = cv2.resize(mask, (w, h))

    # Build Gaussian pyramids
    gp1 = build_gaussian_pyramid(img1, levels)
    gp2 = build_gaussian_pyramid(img2, levels)
    gp_mask = build_gaussian_pyramid(mask.astype(np.float32) / 255.0, levels)

    # Build Laplacian pyramids
    lp1 = build_laplacian_pyramid(gp1)
    lp2 = build_laplacian_pyramid(gp2)

    # Blend pyramids
    blended_pyramid = blend_pyramids(lp1, lp2, gp_mask)

    # Reconstruct
    result = reconstruct_from_laplacian(blended_pyramid)
    result = np.clip(result, 0, 255).astype(np.uint8)
    return result

## This script takes in two images, one.jpg and two.jpg of size IN_W, IN_H
if __name__ == "__main__":
    IN_W, IN_H = 800, 600 # input image size
    OUT_W, OUT_H = 1200, 600 # final blended image size
    BLEND_W = 200 # width of the blend/overlap zone in the middle. set to between 0 and 400.
    LEVELS = 6 # More levels means a smoother transition  

    # Print usage guidelines
    intro_msg = """This script blends two images using Laplacian blending to create a 1200x600 country card background image.
    \nTo use, place two 800x600 jpg's named one.jpg and two.jpg into a country folder and call this script with the folder name as an argument.
    \nEx: python blend2.py bra
    \nThis script will output a 1200x600 blended.webp in that folder to be used as the card background image. one.jpg will be on the right and two.jpg will be on the left.
    """
    printInfo(intro_msg)

    # Throw a more helpful message if user does not have cv2
    try:
        import cv2
        from PIL import Image
    except ImportError:
        printError("This script requires OpenCV and Pillow.\nTo install, run command: python -m pip install opencv-python Pillow")
        exit(1)
    import numpy as np # np is a necessary dependency of cv2 so no independent check needed

    # Parse country code from input and check that the folder exists.
    if len(sys.argv) != 2:
        printError("Please provide the name of a directory within this folder.\n\nEx: python blend2.py bra")
        exit(1)

    country_code = sys.argv[1]

    if not os.path.isdir(f"./{country_code}"):
        printError(f"Could not find {country_code} directory")
        exit(1)

    # Check that images exist
    if not os.path.isfile(f"./{country_code}/one.jpg"):
        printError(f"Could not find image {country_code}/one.jpg")
        exit(1)

    if not os.path.isfile(f"./{country_code}/two.jpg"):
        printError(f"Could not find image {country_code}/two.jpg")
        exit(1)

    img1 = cv2.imread(f"./{country_code}/one.jpg") # will appear on the LEFT
    img2 = cv2.imread(f"./{country_code}/two.jpg") # will appear on the RIGHT

    # Check that we were able to load images
    if img1 is None:
        printError(f"Could not load image {country_code}/one.jpg")
        exit(1)
    if img2 is None:
        printError(f"Could not load image {country_code}/two.jpg")
        exit(1)
    
    # Check that images are 800x600
    input_shape_tensor = (IN_H, IN_W, 3)
    if not img1.shape == input_shape_tensor:
        printError("one.jpg is not 800x600")
        exit(1)

    if not img2.shape == input_shape_tensor:
        printError("two.jpg is not 800x600")
        exit(1)

    # Extend images out to 1200x600 with the 400 pixels on the right/left being unused in the final blend
    img1 = cv2.copyMakeBorder(img1, 0, 0, 0, 400, cv2.BORDER_CONSTANT)
    img2 = cv2.copyMakeBorder(img2, 0, 0, 400, 0, cv2.BORDER_CONSTANT)

    # Build a mask for the full canvas where 255 = img1, 0 = img2
    mask = np.zeros((OUT_H, OUT_W), dtype=np.float32)

    blend_start = OUT_W // 2 - BLEND_W // 2
    blend_end = OUT_W // 2 + BLEND_W // 2

    mask[:, :blend_start] = 255
    mask[:, blend_end:]   = 0
    # Middle blended region
    for x in range(blend_start, blend_end):
        alpha = 1.0 - (x - blend_start) / BLEND_W
        mask[:, x] = alpha * 255

    mask = mask.astype(np.uint8)

    # Blend, convert to webp, and save
    result = laplacian_blend(img1, img2, mask, levels=LEVELS)
    jpegImg = Image.fromarray(cv2.cvtColor(result, cv2.COLOR_BGR2RGB))

    jpegImg.save(f"./{country_code}/blended.webp", format="WEBP", quality=20)

    printSuccess(f"Saved blended.webp ({OUT_W}x{OUT_H})")