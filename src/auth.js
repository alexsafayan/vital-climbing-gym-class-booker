import fs from 'fs';
import { CONFIG } from './config.js';
import { delay } from './utils.js';

export async function setupBrowserContext(browser) {
  if (fs.existsSync(CONFIG.authFile)) {
    console.log(`Reusing existing authentication from ${CONFIG.authFile}`);
    return browser.newContext({
      ...CONFIG.browserConfig.context,
      storageState: CONFIG.authFile
    });
  }

  const context = await browser.newContext(CONFIG.browserConfig.context);
  await performLogin(context);
  return context;
}

async function performLogin(context) {
  const page = await context.newPage();
  
  await page.goto(`${CONFIG.baseUrl}/ws?studioid=836167`);
  await delay(100, 300);
  
  await page.screenshot({ path: CONFIG.screenshots.beforeLogin });
  console.log(`Screenshot saved to ${CONFIG.screenshots.beforeLogin}`);
  
  // Login sequence
  await typeCredentials(page);
  await handleLoginResult(page);
  
  // Save authentication state
  await context.storageState({ path: CONFIG.authFile });
  console.log(`Authentication state saved to ${CONFIG.authFile}`);
}

async function typeCredentials(page) {
  const { username, password, loginButton } = CONFIG.selectors;
  const { email, password: pwd } = CONFIG.credentials;

  await page.waitForSelector(username);
  await page.click(username);
  await delay(100, 300);
  await page.fill(username, email, { delay: 100 });
  
  await delay(100, 300);
  
  await page.click(password);
  await delay(100, 300);
  await page.fill(password, pwd, { delay: 100 });
  
  await delay(100, 300);
  await page.click(loginButton);
}

async function handleLoginResult(page) {
  try {
    await page.waitForSelector(CONFIG.selectors.loginSuccess, { timeout: 5000 });
    console.log('Login successful');
  } catch (error) {
    console.log('Login failed');
  }

  await delay(100, 300);
  await page.screenshot({ path: CONFIG.screenshots.afterLogin });
  console.log(`Screenshot saved to ${CONFIG.screenshots.afterLogin}`);
} 