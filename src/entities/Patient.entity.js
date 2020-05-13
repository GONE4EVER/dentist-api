import Person from 'entities/Person';


export default class Patient extends Person {
  constructor(props) {
    const {
      address,
      email,
      company,
      job,
      notes,
      ...rest
    } = props;

    super(rest);


    this.id = Math.ceil(Math.random() * 1000000000); // TODO: remove

    this.address = address;
    this.email = email;

    this.company = company;
    this.job = job;

    this.notes = notes || '';
  }
}
