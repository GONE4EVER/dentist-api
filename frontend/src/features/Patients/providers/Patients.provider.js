import BaseProvider from 'common/providers/Base.provider';

import Patient from 'common/entities/Patient.entity';


class PatientsProvider extends BaseProvider {
  constructor() {
    super(Patient);
  }
}


export default new PatientsProvider();
