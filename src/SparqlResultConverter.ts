import { groupBy, cloneDeep } from "lodash";
import isEmpty = require ("lodash.isempty");
import {} from "lodash";
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

export class SparqlResultConverter {

	/**
	 * Convert a SPARQL result according to an array of MappingDefinition
	 * @param inputArray The SPARQL result (result.bindings)
	 * @param mappingDefinitions An array of mapping definitions
	 */
	convertToDefinition(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[]): Record<string, Array<unknown>> {
		const flattenedArray = ArrayUtil.extractValues(inputArray);
		return this.convert(flattenedArray, mappingDefinitions);
	}


	/**
    * Convert a SPARQL result according to an array of MappingDefinition
 	* @param {*} inputArray An array representing data structured as a table
 	* @param {*} mappingDefinitions An array of MappingDefinition objects representing the structure of the final output
 	*/
	private convert(inputArray: Record<string, string>[], mappingDefinitions: Partial<MappingDefinition>[]): Record<string,Array<unknown>> {
		const outputObject = {};

		// Loop over mapping definitions, there could be multiple definitions on one layer
		mappingDefinitions.forEach(mappingDefinition => {

			if (mappingDefinition.propertyToGroup && inputArray.some(elem => elem[mappingDefinition.propertyToGroup])) {
				outputObject[mappingDefinition.rootName] = new Array<unknown>();
				const groupedObject = this.groupArray(inputArray, mappingDefinition);

				for (const key in groupedObject) {
					const groupedElement = groupedObject[key];


					// Collect all elements that should be collected
					// TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
					const elemsToCollect = {};
					if(mappingDefinition.toCollect) {
						mappingDefinition.toCollect.forEach((elemToCollect) => {
							elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];
							// const a = [];
							// groupedElement = groupedElement.filter(elem => elem[elemToCollect] == undefined);
							groupedElement.forEach((elem) => {
								delete elem[elemToCollect];
							});
						});
					}


					const nameToPush = {
						[mappingDefinition.name]: key,
					};

					let groupedArrayToPush : Record<string, Array<unknown>>;
					if (mappingDefinition.childMappings){
						// If there are "real" childMappings (with a propertyToGroup) -> call convert() recursively on the groupedElement
						groupedArrayToPush = this.convert(groupedElement as Record<string, string>[], mappingDefinition.childMappings);
					}
					else {
						const clonedGroupedElement = cloneDeep(groupedElement);
						clonedGroupedElement.forEach(elem => {
							const keys = Object.keys(elem);
							const keysToDelete = keys.filter(key => mappingDefinitions.some(mapDef => key === mapDef.propertyToGroup));
							keysToDelete.forEach(keysToDelete => {
								delete elem[keysToDelete];
							});
						});
						if(!isEmpty(clonedGroupedElement[0])) {
							groupedArrayToPush = {children: [ ...clonedGroupedElement]};
						}

					}
					// else {
					// 	// If there are no more propertiesToGroup: put this element under the subElements rootName (if not set, take "children" as default)
					// 	(mappingDefinition.childMappings) ? rootName = mappingDefinition.childMappings[0].rootName : rootName ="children";
					// 	groupedArrayToPush = {[rootName]: groupedElement};
					// }

					// if the default rootName has been used and the element is empty -> don't add groupedArrayToPush to the object to add
					// if(rootName == "children" && isEmpty(groupedElement[0])) {
					// 	objToPush = {
					// 		...nameToPush,
					// 		...elemsToCollect,
					// 	};
					// } else {
					const objToPush = {
						...nameToPush,
						...elemsToCollect,
						...groupedArrayToPush
					};
					// }

					outputObject[mappingDefinition.rootName].push(objToPush);

				}
			} else {
				// let rootName: string;
				// If there are no more propertiesToGroup: put this element under the subElements rootName (if not set, take "children" as default)
				// (mappingDefinition.childMappings == undefined) ? rootName = mappingDefinition.rootName : rootName ="children";
				const groupedArrayToPush = inputArray;
				// const elemsToCollect = [];
				// if(mappingDefinition.toCollect) {
				// 	mappingDefinition.toCollect.forEach((elemToCollect) => {
				// 		elemsToCollect[elemToCollect] = inputArray[0][elemToCollect];
				// 		// groupedArrayToPush.forEach((inputElem) => {
				// 		// 	delete inputElem[elemToCollect];
				// 		// });
				// 	});
				// }
				// let objToPush;
				if(!inputArray.every(elem => isEmpty(elem))) {
					outputObject[mappingDefinition.rootName] = new Array<unknown>();

					// if(!isEmpty(inputArray)) {
					// 	objToPush = {
					// 		...elemsToCollect,
					// 	};
					// } else {
					const objToPush = {
						// ...elemsToCollect,
						...groupedArrayToPush
					};
					outputObject[mappingDefinition.rootName].push(...groupedArrayToPush);
				}

			}

		});
		return outputObject;
	}


	private groupArray(inputArray: Record<string, string>[], mappingDefinition: Partial<MappingDefinition>)
	: Record<string, Array<unknown>> {

		const groupedObject = groupBy(inputArray, (elem) => elem[mappingDefinition.propertyToGroup]) as Record<string, Array<unknown>>;
		// delete ungrouped (undefined) values
		delete groupedObject["undefined"];

		// The common element (propertyToGroup) has been extracted, delete it from sub elements
		for (const key in groupedObject) {
			const groupedEntry = groupedObject[key];
			groupedEntry.forEach((element) => {
				delete element[mappingDefinition.propertyToGroup];
			});
		}

		return groupedObject;
	}
}


export interface MappingDefinition {
	rootName: string,
	propertyToGroup: string,
	name: string,
	toCollect?: string[];
	childMappings?: Array<Partial<MappingDefinition> & Pick<Required<MappingDefinition>, "rootName">>,
}

