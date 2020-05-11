class Person {
  firstName

  lastName

  get fullName() {
    const { firstName, lastName } = this;

    return `${lastName} ${firstName}`;
  }
}

export default Person;
