/**
 * TODO: remove id
*/
class Person {
  constructor(props) {
    const {
      firstName,
      lastName,
      phoneNumber,
      id,
    } = props;

    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;

    this.phoneNumber = phoneNumber;
  }

  get fullName() {
    const { firstName, lastName } = this;

    return `${firstName} ${lastName}`;
  }
}

export default Person;