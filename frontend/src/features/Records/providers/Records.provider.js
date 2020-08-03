import Record from 'common/entities/Record.entity';


/**
 * TODO: move common functionality to super class
 */
export default {
  getMapped(data) {
    return Array.isArray(data)
      ? this.transformArray(data)
      : this.transformObject(data);
  },
  transformArray(data) {
    return data.map(this.transformObject);
  },
  transformObject(data) {
    return new Record(data);
  },
};
