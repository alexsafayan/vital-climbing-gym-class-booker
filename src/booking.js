import { CONFIG } from './config.js';
import { delay } from './utils.js';

/**
 * Books a class using its ID
 * @param {import('playwright').Page} page - Playwright page object
 * @param {string} classId - ID of the class to book
 * @returns {Promise<void>}
 */
export async function bookClass(page, classId) {
    // Click the "Sign Up" button
    await page.click(`input[name="${classId}"]`);

    // Wait for any of the submit buttons to appear
    const submitButton = await Promise.race(
        CONFIG.selectors.submitEnrollButtons.map(selector => 
            page.waitForSelector(selector)
        )
    );
    
    await delay(100,200);
    await submitButton.click();

    // Wait for confirmation text
    await page.waitForSelector(CONFIG.selectors.confirmationText);
    console.log("Successfully booked class!");
    await page.screenshot({ path: CONFIG.screenshots.afterBooking });
    await delay(1000,1000);
} 