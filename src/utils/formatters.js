const date = new Intl.DateTimeFormat('eu', {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

const time = new Intl.DateTimeFormat(
  'eu',
  {
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  },
);

export default {
  date,
  time,
};
