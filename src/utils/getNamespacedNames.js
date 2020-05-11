/* eslint no-param-reassign: 0 */

export default (modulePrefix) => (sourceObject) => Object
  .entries(sourceObject)
  .reduce(
    (result, [ propName, propValue ]) => {
      const newPropName = `${modulePrefix}/${propName}`;

      result[newPropName] = propValue;
      return result;
    },
    {},
  );
