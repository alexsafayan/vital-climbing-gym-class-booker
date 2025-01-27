import { CONFIG } from './config.js';
import { delay } from './utils.js';

export async function navigateToClassPage(context) {
  const page = await context.newPage();
  
  await page.goto(`${CONFIG.baseUrl}/mainclass?fl=true&tabID=7`);
  await delay(2000, 2000);
  
  await page.screenshot({ path: CONFIG.screenshots.classPage });
  console.log(`Screenshot saved to ${CONFIG.screenshots.classPage}`);
  
  return page;
}

export async function setDate(page) {
  await page.fill(CONFIG.selectors.dateInput, CONFIG.dates.chosenDate.toNumericFormat());
  await page.keyboard.press('Enter');
  console.log(`date set to ${CONFIG.dates.chosenDate.toLongFormat()}`);

  await delay(1000, 2000);
  await page.screenshot({ path: CONFIG.screenshots.classPageNextWeek });
  console.log(`Screenshot saved to ${CONFIG.screenshots.classPageNextWeek}`);
} 