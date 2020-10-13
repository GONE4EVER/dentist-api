import Record from 'common/entities/Record.entity';
import BaseProvider from 'common/providers/Base.provider';


class RecordsProvider extends BaseProvider {
  constructor() {
    super(Record);
  }
}


export default new RecordsProvider();
