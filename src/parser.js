// import cheerio from 'cheerio';
import * as cheerio from 'cheerio';
import { CONFIG } from './config.js';

function cleanText($element) {
    return $element.text().trim().replace(/\s+/g, ' ');
}

function extractTime(timeStr) {
    const [time, period, timezone] = timeStr.split(' '); // ["10:30", "am", "EST"]
    const [hours, minutes] = time.split(':').map(Number);
    let hour24 = hours;
    if (period.toLowerCase() === 'pm' && hours !== 12) {
        hour24 += 12;
    } else if (period.toLowerCase() === 'am' && hours === 12) {
        hour24 = 0;
    }
    return { hours: hour24, minutes };
}

export function parseClassSchedule(html) {
    console.log(`parsing class schedule for ${CONFIG.dates.chosenDate.toLongFormat()}`);
    const $ = cheerio.load(html);
    const classes = [];

    // Find the header for February 2, 2025
    const feb1Header = $('.header').filter((_, el) =>
        cleanText($(el)).includes(CONFIG.dates.chosenDate.toLongFormat())
    );

    if (feb1Header.length) {
        // Traverse all rows until the next header
        feb1Header.nextUntil('.header').each((_, row) => {
            const $row = $(row);
            if ($row.hasClass('row')) {
                const col1 = $row.find('.col-1');
                const id = col1.find('input.SignupButton').attr('name');

                const availabilityText = cleanText(col1.find('.tablet-viewable')); // (22 Reserved, 3 Open)
                const [reserved, open] = availabilityText
                    .replace(/[()]/g, '')  // Remove parentheses
                    .split(',')            // Split into ["22 Reserved", " 3 Open"]
                    .map(part => parseInt(part)); // Extract numbers: [22, 3]

                const col2 = $row.find('.col-2');

                const timeStr = cleanText(col1.find('.col-first')); 
                const { hours, minutes } = extractTime(timeStr);

                classes.push({
                    name: cleanText(col2.find('div:nth-child(1)')),
                    time: { hours, minutes },
                    reserved: reserved,
                    open: open,
                    instructor: cleanText(col2.find('div:nth-child(2)')),
                    location: cleanText(col2.find('div:nth-child(3)')),
                    duration: parseInt(cleanText(col2.find('div:nth-child(4)'))),
                    id: id,
                });
            }
        });

        return classes;
    } else {
        return [];
    }
}