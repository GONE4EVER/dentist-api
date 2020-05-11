/* eslint no-param-reassign: 0 */

export default (modulePrefix) => (sourceObject) => Object
  .entries(sourceObject)
  .reduce(
    (result, [ propName, propValue ]) => {
      const newPropValue = `${modulePrefix}/${propValue}`;

      result[propName] = newPropValue;
      return result;
    },
    {},
  );
