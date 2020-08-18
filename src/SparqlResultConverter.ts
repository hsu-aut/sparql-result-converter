import { groupBy } from "lodash";
import { isEmpty } from "lodash";
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

// Maps the query result of "select_allModules" to an array of Modules
export class SparqlResultConverter {
    /**
 * Groups a table-structure and converts it to a tree-like structure
 * @param {*} inputArray An array representing data structured as a table
 * @param {*} mappingDefinitions An array of objects representing the structure of the final output
 */
    convert(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[], currElement = 0): unknown[] {
        let flattenedArray;

        // first: transform array
        if (currElement === 0) {
            flattenedArray = ArrayUtil.extractValues(inputArray);
        } else {
            flattenedArray = inputArray;
        }

        // get the current mapping object
        const currentMappingDefition = mappingDefinitions[currElement];

        // group the flattened array by the current mapping object's "objectToGroup" property
        const groupedObject = groupBy(flattenedArray, (elem) => elem[currentMappingDefition.objectToGroup]);

        // Empty the outputArray array, it will later be filled with the grouped content
        const outputArray = [];

        Object.keys(groupedObject).forEach((key) => {
            let groupedElement = groupedObject[key];

            // Collect all elements that should be collected
            // TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
            const elemsToCollect = {};
            if(currentMappingDefition.toCollect) {
                currentMappingDefition.toCollect.forEach((elemToCollect) => {
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
                mappingDefinitions.forEach((mapDef) => {
                    delete element[mapDef.objectToGroup];
                });
            });


            const nameToPush = {
                [currentMappingDefition.name]: key,
            };

            let objToPush = {};
            if (!isEmpty(groupedElement[0])) {
                const groupToPush = {
                    [currentMappingDefition.childRoot]: groupedElement
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


            // Add the grouped element to the outputArray
            outputArray.push(objToPush);
        });

        return outputArray;
    }
}


interface MappingDefinition {
  objectToGroup: string,
  name: string,
  childRoot: string,
  toCollect?: string[];
}
