import Doctor from 'entities/Doctor.entity';
import Patient from 'entities/Patient.entity';

import formatters from 'utils/formatters';


export default class Record {
  constructor(props) {
    const {
      date,
      doctor,
      patient,
      notes,
      id,
    } = props;

    this.id = id; // TODO: remove

    this.date = formatters.shortDate.format(date);
    this.time = formatters.time.format(date);

    this.doctor = new Doctor(doctor).fullName;

    this.notes = notes || '';

    const patientsProfile = new Patient(patient);
    this.patient = patientsProfile.fullName;
    this.phoneNumber = patientsProfile.phoneNumber;
  }
}
