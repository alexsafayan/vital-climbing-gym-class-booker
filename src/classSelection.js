import { CONFIG } from './config.js';

/**
 * Filters and chooses classes based on given criteria
 * @param {Array} classData - Array of class data objects
 * @returns {Object|null} - First matching class or null if none found
 */
export function chooseClass(classData) {
    const openFitnessClasses = classData
        .filter(c => c.name.includes(CONFIG.classSelection.classFilter))
        .filter(c => c.open > 0)

    const sortedMorningOpenFitnessClassesInWilliamsburg = openFitnessClasses
        .filter(c => c.time.hours >= CONFIG.classSelection.timeFilter.start && c.time.hours <= CONFIG.classSelection.timeFilter.end)
        .filter(c => c.location === CONFIG.classSelection.locationFilter)
        .sort((a, b) => (a.time.hours - b.time.hours) || (a.time.minutes - b.time.minutes)) || null;

    // Choose the latest class
    const chosenClass = sortedMorningOpenFitnessClassesInWilliamsburg.at(-1) || null;

    return chosenClass;
}