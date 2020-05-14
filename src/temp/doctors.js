const baseDate1 = new Date('May 29, 2020 08:55:00');
const baseDate2 = new Date('May 31, 2020 19:05:00');
const baseDate3 = new Date('May 23, 2020 13:40:00');
const baseDate4 = new Date('June 14, 2020 16:30:00');


export default [
  {
    id: 0,
    firstName: 'Rick',
    lastName: 'Estley',
    availability: [
      baseDate1,
      baseDate3,
    ],
  },
  {
    id: 1,
    firstName: 'Paul',
    lastName: 'McCartney',
    availability: [
      baseDate3,
      baseDate4,
    ],
  },
  {
    id: 2,
    firstName: 'Freddie',
    lastName: 'Mercury',
    availability: [
      baseDate2,
    ],
  },
];
