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
    } = props;

    this.id = Math.ceil(Math.random() * 1000000000); // TODO: remove

    this.date = formatters.date.format(date);
    this.time = formatters.time.format(date);

    this.doctor = new Doctor(doctor).fullName;
    this.patient = new Patient(patient).fullName;

    this.notes = notes || '';
  }
}
