import dotenv from 'dotenv';
import { devices } from 'playwright';
import SpecialDate from './SpecialDate.js';

dotenv.config();

export const CONFIG = {
  authFile: 'auth.json',
  baseUrl: 'https://clients.mindbodyonline.com/classic',
  credentials: {
    email: process.env.EMAIL,
    password: process.env.PASSWORD
  },
  browserConfig: {
    headless: false,
    context: {
      ...devices['Desktop Chrome']
    }
  },
  selectors: {
    username: 'input[name="requiredtxtUserName"]',
    password: 'input[name="requiredtxtPassword"]',
    loginButton: 'input#btnSu1Login',
    loginSuccess: 'td#top-login-container-td.top-section-table-ends',
    dateInput: 'input#txtDate',
    submitEnrollButton: 'input[name="SubmitEnroll2"]',
    confirmationText: 'text="Book another class"'
  },
  screenshots: {
    dir: 'screenshots',
    beforeLogin: 'screenshots/before_login.png',
    afterLogin: 'screenshots/after_login.png',
    classPage: 'screenshots/class_page.png',
    classPageNextWeek: 'screenshots/class_page_next_week.png',
    afterBooking: 'screenshots/after_booking.png'
  },
  dates: {
    nextWeekDate: new SpecialDate(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
    customDate: new SpecialDate('2025-01-31'),
    useCustomDate: false,
    get chosenDate() {
      return this.useCustomDate ? this.customDate : this.nextWeekDate;
    }
  },
  classSelection: {
    timeFilter: {
      start: 7,
      end: 9
    },
    locationFilter: 'Williamsburg',
    classFilter: 'FITNESS'
  }
}; 