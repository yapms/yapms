
import { Browser, connect } from 'puppeteer';

let browser: Browser | null = null;

async function getBrowser() {
  if ( browser === null || browser.isConnected() === false ) {
    browser = await connect({
      browserWSEndpoint: 'ws://browserless:8082',
    });
  }

  if ( browser.isConnected() === false ) {
    browser = await connect({
      browserWSEndpoint: 'ws://browserless:8082',
    });
  }

  return browser;
}

export { getBrowser };