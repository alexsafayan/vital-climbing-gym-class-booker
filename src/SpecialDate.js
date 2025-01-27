class SpecialDate {
  constructor(date) {    
    // If it's a string, parse it as UTC to avoid timezone shifts
    if (typeof date === 'string') {
      const [year, month, day] = date.split('-').map(Number);
      this.date = new Date(Date.UTC(year, month - 1, day));
    } else {
      // If it's already a Date object (like in nextWeekDate case),
      // create new Date with local year/month/day values
      this.date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
  }

  // Returns the date in the format MM/DD/YYYY
  toNumericFormat() {
    // Use UTC methods to prevent timezone shifts
    return `${this.date.getUTCMonth() + 1}/${this.date.getUTCDate()}/${this.date.getUTCFullYear()}`;
  }

  // Returns the date in the format Month Day, Year
  toLongFormat() {
    return this.date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timeZone: 'UTC'  // Force UTC timezone for consistent output
    });
  }

  getDate() {
    return this.date;
  }
}

export default SpecialDate; 