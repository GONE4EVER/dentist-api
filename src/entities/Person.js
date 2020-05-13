class Person {
  constructor(props) {
    const {
      firstName,
      lastName,
      phoneNumber,
    } = props;

    this.id = Math.ceil(Math.random() * 1000000000); // TODO: remove

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
