import patients from 'temp/patients';


const baseDate1 = new Date('May 29, 2020 13:24:00');
const baseDate2 = new Date('May 23, 2020 09:52:00');


export default [
  {
    date: baseDate1,

    doctor: {
      firstName: 'Den',
      lastName: 'Braun',
    },
    patient: patients.find(({ id }) => id === 123),
    notes: 'Corey Taylor\'s dentist',
  },
  {
    date: baseDate2,

    doctor: {
      firstName: 'Paul',
      lastName: 'McCartney',
    },
    patient: patients.find(({ id }) => id === 321),
    notes: 'Roy Jones\'s dentist',
  },
  {
    date: baseDate2,

    doctor: {
      firstName: 'Den',
      lastName: 'Braun',
    },
    patient: patients.find(({ id }) => id === 321),
    notes: 'Roy Jones\'s dentist',
  },
];
