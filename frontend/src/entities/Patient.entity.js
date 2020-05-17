import Person from 'entities/Person';


export default class Patient extends Person {
  constructor(props) {
    const {
      address,
      company,
      email,
      job,
      notes,
      ...rest
    } = props;

    super(rest);

    this.address = address;
    this.email = email;

    this.company = company;
    this.job = job;

    this.notes = notes || '';
  }
}
