import Patient from 'common/entities/Patient.entity';
import BaseProvider from 'common/providers/Base.provider';


class PatientsProvider extends BaseProvider {
  constructor() {
    super(Patient);
  }
}


export default new PatientsProvider();
