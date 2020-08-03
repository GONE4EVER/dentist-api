import BaseProvider from 'common/providers/Base.provider';

import Record from 'common/entities/Record.entity';


class RecordsProvider extends BaseProvider {
  constructor() {
    super(Record);
  }
}


export default new RecordsProvider();
