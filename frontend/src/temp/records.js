import doctors from 'temp/doctors';
import patients from 'temp/patients';


const baseDate1 = new Date('May 29, 2020 13:24:00');
const baseDate2 = new Date('May 23, 2020 09:52:00');


export default [
  {
    id: 0,
    date: baseDate1,

    doctor: doctors.find(({ id }) => id === 0),
    patient: patients.find(({ id }) => id === 123),
    notes: 'Corey Taylor\'s dentist',
  },
  {
    id: 1,
    date: baseDate2,

    doctor: doctors.find(({ id }) => id === 1),
    patient: patients.find(({ id }) => id === 321),
    notes: 'Roy Jones\'s dentist',
  },
  {
    id: 2,
    date: baseDate2,

    doctor: doctors.find(({ id }) => id === 2),
    patient: patients.find(({ id }) => id === 321),
    notes: 'Roy Jones\'s dentist',
  },
];
