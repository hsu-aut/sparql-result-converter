/**
 * Checks whether or not all entries contain the property that is used for grouping
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
 * Transforms the array by extracting every value-property
 * @param {*} inputArray
 */
function transformArray(inputArray) {
  inputArray.forEach((inputElem) => {
    Object.keys(inputElem).map((inputElemKey) => {
      return (inputElem[inputElemKey] = inputElem[inputElemKey].value);
    });
  });
  return inputArray;
}


module.exports = {
  allEntriesContainGroupingProperty,
  transformArray
};
