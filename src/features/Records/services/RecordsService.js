import Record from 'entities/Record.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import fakeBackend from 'temp/fakeBackend';


/**
 * TODO: error handling
 * TODO: replace date creating
*/
export default {
  getAll: async () => emitFetch(
    () => {
      const result = fakeBackend.getRecords();

      return result.map((r) => new Record(r));
    },
    '' /* 'Data loading error' */,
  ),
  create: async (payload) => emitFetch(
    () => {
      const result = fakeBackend.createRecord(payload);

      return new Record(result);
    },
    '' /* 'Data loading error' */,
  ),
  update: async (payload) => emitFetch(
    () => {
      const updatedItem = fakeBackend.updateRecord(payload);

      return updatedItem
        ? new Record(updatedItem)
        : null;
    },
    '' /* 'Data loading error' */,
  ),
};
