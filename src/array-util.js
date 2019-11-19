/**
 * Checks whether or not all entries of the array contain the property that is used for grouping
 * @param {*} arrayToCheck
 * @param {*} groupingProperty
 */
function allEntriesContainGroupingProperty(arrayToCheck, groupingProperty) {
  for (let i = 0; i < arrayToCheck.length; i++) {
    const element = arrayToCheck[i];
    if (!Object.prototype.hasOwnProperty.call(element, groupingProperty)) {
      return false;
    }
  }
  return true;
}

/**
 * Transforms an array of objects to an array of simple datatypes by extracting every value-property.
 * @param {*} inputArray Array of objects that contain a value-property
 */
function transformArray(inputArray) {
  const transformedArray = inputArray;

  // Take every array element and extract all values of all object keys -> flatten the array
  transformedArray.forEach((arrayObject) => {
    const objectKeys = Object.keys(arrayObject);

    objectKeys.forEach((key) => {
      arrayObject[key] = arrayObject[key].value;
    });
  });

  return transformedArray;
}


module.exports = {
  allEntriesContainGroupingProperty,
  transformArray
};
