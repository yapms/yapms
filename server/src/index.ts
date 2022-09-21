import Fastify, { FastifyRequest } from 'fastify';
import { MongoClient, GridFSBucket } from 'mongodb';
import { getBrowser } from './browser';
import { insertImage, getImage } from './database';

async function start() {

  const mongodb = await new MongoClient('mongodb://root:password@mongodb:8083').connect();
  const database = mongodb.db("yapms");
  const images = database.collection("images");
  images.dropIndexes();
  images.createIndex({ "createdAt": 1 }, { expireAfterSeconds: 10 });

  const fastify = Fastify({
    logger: true
  });

  type CreateRequest = FastifyRequest<{
    Params: {
      mapId: string
    }
  }>;

  fastify.get("/ping", async(request, reply) => {
    reply.send("pong");
  });

  fastify.get('/preview/:mapId', async ( request: CreateRequest, reply ) => {

    const mapId = request.params.mapId;

    const cachedImage = await getImage({
      name: mapId 
    });

    if ( cachedImage !== null ) {
      fastify.log.info("cache hit");
      return reply
        .type('image/webp')
        .header('Content-Length', cachedImage.data.length)
        .send(Buffer.from(cachedImage.data, 'base64'));
    }

    const browser = await getBrowser();
    const page = await browser.newPage();
    page.on('console', ( message ) => {
      console.log(message.text());
    });
    await page.goto(`https://www.yapms.com/app/?m=${mapId}`);
    //await page.goto('http://client:8080/app')
    await page.waitForSelector('#root');
    const element = await page.$('#root');
    const screenShot = await element?.screenshot({
      type: 'webp'
    });
    await page.close();
    fastify.log.info("screenshot taken");

    const doc = {
      createdAt: new Date(),
      name: mapId,
      data: screenShot?.toString('base64') || '',
      length: screenShot?.length || 0
    }

    fastify.log.info("screenshot cached");
    await insertImage(doc);

    reply
    .header('Content-Type', 'image/webp')
    .header('Content-Length', screenShot?.length)
    .send(screenShot);
  });

  fastify.listen({ host: '0.0.0.0', port: 8081 }, ( error, address ) => {
    if ( error ) {
      fastify.log.error( error );
      process.exit( 1 );
    }
  });
}

start();