import { chromium } from 'playwright';
import fs from 'fs';

import { CONFIG } from './src/config.js';
import { setupBrowserContext } from './src/auth.js';
import { navigateToClassPage, setDate } from './src/navigation.js';
import { parseClassSchedule } from './src/parser.js';
import { chooseClass } from './src/classSelection.js';
import { bookClass } from './src/booking.js';

async function main() {
  const browser = await chromium.launch(CONFIG.browserConfig);

  try {
    const context = await setupBrowserContext(browser);
    const page = await navigateToClassPage(context);
    await setDate(page);
    
    const html = await page.content();
    fs.writeFileSync('test2.html', html);
    console.log("HTML content written to test2.html");

    const classes = parseClassSchedule(html);
    const chosenClass = chooseClass(classes);
    console.log("chosen class:", chosenClass);
    if (!chosenClass) {
        throw new Error("No class found matching the specified criteria");
    }
    await bookClass(page, chosenClass.id);
  } finally {
    await browser.close();
  }
}

main().catch(console.error); 