import Person from 'entities/Person';


export default class Patient extends Person {
  constructor(props) {
    super(props);

    const {
      address,
      email,
      company,
      job,
      notes,
    } = props;

    this.address = address;
    this.email = email;
    this.company = company;
    this.job = job;
    this.notes = notes;
  }
}