/* import Doctor from 'entities/Doctor.entity';
import Patient from 'entities/Patient.entity'; */

import formatters from 'utils/formatters';

/**
 * TODO: remove id
*/
export default class Record {
  constructor(props) {
    const {
      date,
      doctorId,
      patientId,
      notes,
      id,
    } = props;

    this.id = id;

    this.date = formatters.shortDate.format(date);
    this.time = formatters.time.format(date);

    this.doctorId = doctorId/* new Doctor(doctor).fullName */;

    this.notes = notes || '';

    /* const patientsProfile = new Patient(patient); */
    this.patientId = patientId/* patientsProfile.fullName */;
    /* this.phoneNumber = patientsProfile.phoneNumber; */
  }
}
