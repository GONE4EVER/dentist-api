export default class BaseProvider {
  constructor(Entity) {
    this.Entity = Entity;
  }

  getMapped = data => (Array.isArray(data)
    ? this.transformArray(data)
    : this.transformObject(data))

  transformArray = data => data.map(this.transformObject)

  transformObject = data => new this.Entity(data)
}
