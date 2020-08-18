import { groupBy } from "lodash";
import { isEmpty } from "lodash";
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

// Maps the query result of "select_allModules" to an array of Modules
export class SparqlResultConverter {

	convert(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[]): any {
		const flattenedArray = ArrayUtil.extractValues(inputArray);
		return this.convert2(flattenedArray, mappingDefinitions);
	}

	/**
    * Groups a table-structure and converts it to a tree-like structure
 	* @param {*} inputArray An array representing data structured as a table
 	* @param {*} mappingDefinitions An array of objects representing the structure of the final output
 	*/
	convert2(inputArray: Record<string, string>[], mappingDefinitions: Partial<MappingDefinition>[]): Record<string,Array<any>> {
		const outputObject = {};

		mappingDefinitions.forEach(mappingDefinition => {
			outputObject[mappingDefinition.rootName] = new Array<any>();

			// group the flattened array by the current mapping object's "objectToGroup" property
			if(!inputArray.some(elem => elem[mappingDefinition.objectToGroup])) return null;
			const groupedObject = groupBy(inputArray, (elem) => elem[mappingDefinition.objectToGroup]) as Record<string, any>;

			// delete ungrouped (undefined) values
			delete groupedObject["undefined"];


			for (const key in groupedObject) {
				let groupedElement = groupedObject[key];

				if (groupedElement.length === 0) break;

				// Collect all elements that should be collected
				// TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
				const elemsToCollect = {};
				if(mappingDefinition.toCollect) {
					mappingDefinition.toCollect.forEach((elemToCollect) => {
						elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];
						groupedElement.forEach((inputElem) => {
							delete inputElem[elemToCollect];
						});
					});
				}
				// Delete the all elements that have already been grouped
				groupedElement.forEach((element) => {
					delete element[mappingDefinition.objectToGroup];
				});


				let objToPush = {};
				const nameToPush = {
					[mappingDefinition.name]: key,
				};


				if (mappingDefinition.childMappings && mappingDefinition.childMappings[0].objectToGroup){
				// if (ArrayUtil.allEntriesContainGroupingProperty(groupedElement, mappingDefinition.childMappings .objectToGroup)) {
					groupedElement = this.convert2(groupedElement, mappingDefinition.childMappings);
					// }



					// if (!isEmpty(groupedElement[0])) {

					// const groupToPush = {
					// 	[mappingDefinition.childMappings[0].rootName] : groupedElement
					// };
					objToPush = {
						...nameToPush,
						...elemsToCollect,
						...groupedElement
					};

				} else {
					let rootName;
					(mappingDefinition.childMappings) ? rootName = mappingDefinition.childMappings[0].rootName : rootName ="children";

					const groupToPush = {
						[rootName] : groupedElement
					};
					objToPush = {
						...nameToPush,
						...elemsToCollect,
						...groupToPush
					};
				}


				// } else {
				// objToPush = {
				// 	...nameToPush,
				// 	...elemsToCollect
				// };

				// }

				outputObject[mappingDefinition.rootName].push(objToPush);


			}

		});
		return outputObject;
	}
}


export interface MappingDefinition {
	rootName: string,
	objectToGroup: string,
	name: string,
	toCollect?: string[];
	childMappings?: Partial<MappingDefinition>[],
}
