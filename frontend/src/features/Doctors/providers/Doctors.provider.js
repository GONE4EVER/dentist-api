import Doctor from 'common/entities/Doctor.entity';


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
    const { availability, ...rest } = data;

    return new Doctor({
      ...rest,
      availability: availability.map((d) => new Date(d)), // TODO: remove
    });
  },
};
