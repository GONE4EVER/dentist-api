class Person {
  constructor(props) {
    const {
      firstName,
      id,
      lastName,
      phoneNumber,
    } = props;

    this.firstName = firstName;
    this.id = id;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  get fullName() {
    const { firstName, lastName } = this;

    return `${lastName} ${firstName}`;
  }
}

export default Person;
