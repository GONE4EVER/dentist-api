import BaseProvider from 'common/providers/Base.provider';

import Doctor from 'common/entities/Doctor.entity';


class DoctorsProvider extends BaseProvider {
  constructor() {
    super(Doctor);
  }

  transformObject = (data) => {
    const { availability, ...rest } = data;

    return new this.Entity({
      ...rest,
      availability: availability.map((d) => new Date(d)), // TODO: remove
    });
  }
}


export default new DoctorsProvider();
