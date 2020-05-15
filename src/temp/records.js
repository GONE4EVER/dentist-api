/* import doctors from 'temp/doctors';
import patients from 'temp/patients'; */


const baseDate1 = new Date('May 29, 2020 13:30:00');
const baseDate2 = new Date('May 23, 2020 09:55:00');


export default [
  {
    id: 0,
    date: baseDate1,

    doctorId: 0 /* doctors.find(({ id }) => id === 0) */,
    patientId: 123/* patients.find(({ id }) => id === 123) */,
    notes: 'Corey Taylor\'s dentist',
  },
  {
    id: 1,
    date: baseDate2,

    doctorId: 1/* doctors.find(({ id }) => id === 1) */,
    patientId: 321/* patients.find(({ id }) => id === 321) */,
    notes: 'Roy Jones\'s dentist',
  },
  {
    id: 2,
    date: baseDate2,

    doctorId: 2/* doctors.find(({ id }) => id === 2) */,
    patientId: 123/* patients.find(({ id }) => id === 321) */,
    notes: 'Corey Taylor\'s dentist',
  },
];
