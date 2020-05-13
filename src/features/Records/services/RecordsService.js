import Record from 'entities/Record.entity';

// temporary
import emitFetch from 'temp/emitFetch';
import data from 'temp/records';


// TODO: error handling
export default {
  getAll: async () => emitFetch(
    () => data.map((dataItem) => new Record(dataItem)),
    // 'Data loading error',
  ),
  create: async (payload) => emitFetch(
    () => new Record(payload),
    // 'Data loading error',
  ),
  update: async (payload) => emitFetch(
    () => {
      const originalItem = data.find(({ id }) => id === payload.id);

      return originalItem
        ? new Record({ ...originalItem, ...payload })
        : null;
    },
    // 'Loading error occured',
  ),
};
