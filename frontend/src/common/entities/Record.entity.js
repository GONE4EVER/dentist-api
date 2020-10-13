import Doctor from 'common/entities/Doctor.entity';
import Patient from 'common/entities/Patient.entity';
import formatters from 'utils/formatters';


export default class Record {
  constructor(props) {
    const {
      date: baseDate,
      doctor,
      patient,
      notes,
      _id,
    } = props;

    this.id = _id;

    const date = new Date(baseDate);

    this.date = formatters.shortDate.format(date);
    this.time = formatters.time.format(date);

    this.doctor = new Doctor(doctor).fullName;

    this.notes = notes || '';

    const patientsProfile = new Patient(patient);

    this.patient = patientsProfile.fullName;
    this.phoneNumber = patientsProfile.phoneNumber;
  }
}


