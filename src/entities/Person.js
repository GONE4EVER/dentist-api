class Person {
  constructor({ firstName, lastName, phoneNumber }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
  }

  get fullName() {
    const { firstName, lastName } = this;

    return `${lastName} ${firstName}`;
  }
}

export default Person;
