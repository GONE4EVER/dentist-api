export default class Route {
  constructor(params) {
    const {
      icon,
      path,
      name,
      component,
      text,
    } = params;

    this.icon = icon;
    this.path = path;
    this.name = name;
    this.component = component;
    this.text = text || name;
  }
}
