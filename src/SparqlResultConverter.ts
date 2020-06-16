import groupBy = require('json-groupby')
// import { groupby} from "json-groupby";
import { isEmpty } from "lodash";
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

// Maps the query result of "select_allModules" to an array of Modules
export class SparqlResultConverter {
    /**
   * Groups a table-structure and converts it to a tree-like structure
   * @param {*} inputArray An array representing data structured as a table
   * @param {*} mappingDefinitions An array of objects representing the structure of the final output
   */
    convert(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[], currElement = 0) {
        let outputArray;

        // first: transform array
        if (currElement === 0) {
            outputArray = ArrayUtil.extractValues(inputArray);
        }


        // get currrent element and fix child root
        const currGroup = mappingDefinitions[currElement];

        // Fix childRoot if its not passed in. TODO: Remove this... Should always be passed
        // currGroup.childRoot = typeof currGroup.childRoot === 'undefined' ? 'content' : currGroup.childRoot;

        // group the ungrouped outputArray
        const groupedArray = groupBy(outputArray, [currGroup.objectToGroup]);

        // Empty the outputArray array, it will later be filled with the grouped content
        outputArray = [];

        Object.keys(groupedArray).forEach((key) => {
            let groupedElement = groupedArray[key];

            // Collect all elements that should be collected
            // TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
            const elemsToCollect = {};
            if (Object.prototype.hasOwnProperty.call(currGroup, 'toCollect')) {
                currGroup['toCollect'].forEach((elemToCollect) => {
                    elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];
                    groupedElement.forEach((inputElem) => {
                        delete inputElem[elemToCollect];
                    });
                });
            }


            if (currElement <= (mappingDefinitions.length - 2)) {
                if (ArrayUtil.allEntriesContainGroupingProperty(groupedElement, mappingDefinitions[currElement + 1].objectToGroup)) {
                    groupedElement = (this.convert(groupedElement, mappingDefinitions, currElement + 1));
                }
            }


            // Delete the all elements that have already been grouped
            groupedElement.forEach((element) => {
                mappingDefinitions.forEach((group) => {
                    delete element[group.objectToGroup];
                });
            });


            const nameToPush = {
                [currGroup.name]: key,
            };

            let objToPush = {};
            if (!isEmpty(groupedElement[0])) {
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


interface MappingDefinition {
    objectToGroup: string,
    name: string,
    childRoot: string
}
