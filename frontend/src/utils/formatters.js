const LOCALE = 'en-GB';

const fullDate = new Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

const shortDate = new Intl.DateTimeFormat(LOCALE, {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const time = new Intl.DateTimeFormat(LOCALE, {
  hour: 'numeric',
  minute: 'numeric',
  hour12: false,
});

const isoFormat = (formatter) => (date) => formatter.format(date)
  .split('/')
  .reverse()
  .join('-');


export default {
  fullDate,
  shortDate,
  time,
  isoFormat,
};
