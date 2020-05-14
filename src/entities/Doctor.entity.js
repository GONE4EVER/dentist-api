import Person from 'entities/Person';

import formatters from 'utils/formatters';


export default class Doctor extends Person {
  constructor(props) {
    const {
      availability,
      ...rest
    } = props;

    super(rest);

    this.availability = availability.map(
      (date) => ({
        date: formatters.shortDate.format(date),
        time: formatters.time.format(date),
        isoDate: formatters.isoFormat(formatters.shortDate)(date),
      }),
    );
  }
}
