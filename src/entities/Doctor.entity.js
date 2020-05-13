import Person from 'entities/Person';


export default class Doctor extends Person {
  constructor(props) {
    const {
      speciality,
      ...rest
    } = props;

    super(rest);

    this.id = Math.ceil(Math.random() * 1000000000); // TODO: remove

    this.speciality = speciality;
  }
}
