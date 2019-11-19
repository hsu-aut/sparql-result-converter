const groupBy = require('json-groupby');
const _ = require('lodash');

const transformArray = require('./array-util').transformArray;
const allEntriesContainGroupingProperty = require('./array-util').allEntriesContainGroupingProperty;

// Maps the query result of "select_allModules" to an array of Modules
class Rdf4jResultConverter {
  /**
   * Groups a table-structure and converts it to a tree-like structure
   * @param {*} inputArray An array representing data structured as a table
   * @param {*} treeModel An object representing the final output (as a tree-structure)
   */
  convert(inputArray, treeModel, currElement = 0) {
    let outputArray;

    // first: transform array
    if (currElement === 0) {
      outputArray = transformArray(inputArray);
    }


    // get currrent element and fix child root
    const currGroup = treeModel[currElement];
    currGroup.childRoot = typeof currGroup.childRoot === 'undefined' ? 'content' : currGroup.childRoot;

    // group the ungrouped outputArray
    const groupedArray = groupBy(outputArray, [currGroup.object]);

    // Empty the outputArray array, it will later be filled with the grouped content
    outputArray = [];

    Object.keys(groupedArray).forEach((key) => {
      let groupedElement = groupedArray[key];

      // Collect all elements that should be collected
      // TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
      const elemsToCollect = {};
      if (Object.prototype.hasOwnProperty.call(currGroup, 'toCollect')) {
        currGroup.toCollect.forEach((elemToCollect) => {
          elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];
          groupedElement.forEach((inputElem) => {
            delete inputElem[elemToCollect];
          });
        });
      }


      if (currElement <= (treeModel.length - 2)) {
        if (allEntriesContainGroupingProperty(groupedElement, treeModel[currElement + 1].object)) {
          groupedElement = (this.convert(groupedElement, treeModel, currElement + 1));
        }
      }


      // Delete the all elements that have already been grouped
      groupedElement.forEach((element) => {
        treeModel.forEach((group) => {
          delete element[group.object];
        });
      });


      const nameToPush = {
        [currGroup.name]: key,
      };

      let objToPush = {};
      if (!_.isEmpty(groupedElement[0])) {
        const groupToPush = {
          [currGroup.childRoot]: groupedElement
        };
        objToPush = {
          ...nameToPush,
          ...elemsToCollect,
          ...groupToPush
        };
      } else {
        objToPush = {
          ...nameToPush,
          ...elemsToCollect
        };
      }


      // Add the grouped element to the inputArray
      outputArray.push(objToPush);
    });

    return outputArray;
  }
}


module.exports = Rdf4jResultConverter;
