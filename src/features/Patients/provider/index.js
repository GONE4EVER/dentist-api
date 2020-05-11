// import pipe from 'utils/pipe';
import Patient from 'entities/Patient.entity';

import data from './temp';

export default {
  all() {
    return new Promise((resolve/* , reject */) => {
      setTimeout(() => {
        const formattedData = data.map(
          (dataItem) => new Patient(dataItem),
        );

        resolve(formattedData);
      }, 2000);
    });
  },
};
