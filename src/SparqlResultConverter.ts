import { groupBy } from "lodash";
import isEmpty = require ("lodash");
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

// Maps the query result of "select_allModules" to an array of Modules
export class SparqlResultConverter {

	convertToDefinition(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[]): Record<string, Array<any>> {
		const flattenedArray = ArrayUtil.extractValues(inputArray);
		return this.convert(flattenedArray, mappingDefinitions);
	}

	/**
    * Groups a table-structure and converts it to a tree-like structure
 	* @param {*} inputArray An array representing data structured as a table
 	* @param {*} mappingDefinitions An array of objects representing the structure of the final output
 	*/
	private convert(inputArray: Record<string, string>[], mappingDefinitions: Partial<MappingDefinition>[]): Record<string,Array<any>> {
		const outputObject = {};

		mappingDefinitions.forEach(mappingDefinition => {

			// if no element of the input array has the property to group on, there's nothing to do return
			if(!inputArray.some(elem => elem[mappingDefinition.propertyToGroup])) return null;

			// create a new array with the key [rootName], this will hold the grouped array
			outputObject[mappingDefinition.rootName] = new Array<any>();

			const groupedObject = groupBy(inputArray, (elem) => elem[mappingDefinition.propertyToGroup]) as Record<string, Array<any>>;

			// delete ungrouped (undefined) values
			delete groupedObject["undefined"];

			for (const key in groupedObject) {
				const groupedElement = groupedObject[key];

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

				// The common element (propertyToGroup) has been extracted, delete it from sub elements
				groupedElement.forEach((element) => {
					delete element[mappingDefinition.propertyToGroup];
				});


				let objToPush = {};
				const nameToPush = {
					[mappingDefinition.name]: key,
				};

				let groupedArrayToPush : Record<string, Array<any>>;
				let rootName;
				if (mappingDefinition.childMappings && mappingDefinition.childMappings[0].propertyToGroup){
					// If there are "real" childMappings (with a propertyToGroup) -> call convert() recursively on the groupedElement
					groupedArrayToPush = this.convert(groupedElement, mappingDefinition.childMappings);
				} else {
					// If there are no more propertiesToGroup: put this element under the subElements rootName (if not set, take "children" as default)
					(mappingDefinition.childMappings) ? rootName = mappingDefinition.childMappings[0].rootName : rootName ="children";
					groupedArrayToPush = {[rootName]: groupedElement};
				}

				// if the default rootName has been used and the element is empty -> don't add groupedArrayToPush to the object to add
				if(rootName == "children" && isEmpty(groupedElement[0])) {
					objToPush = {
						...nameToPush,
						...elemsToCollect,
					};
				} else {
					objToPush = {
						...nameToPush,
						...elemsToCollect,
						...groupedArrayToPush
					};
				}

				outputObject[mappingDefinition.rootName].push(objToPush);

			}

		});
		return outputObject;
	}
}


export interface MappingDefinition {
	rootName: string,
	propertyToGroup: string,
	name: string,
	toCollect?: string[];
	childMappings?: Partial<MappingDefinition>[],
}
