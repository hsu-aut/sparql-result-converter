import { groupBy } from "lodash";
import isEmpty = require ("lodash.isempty");
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

// Maps the query result of "select_allModules" to an array of Modules
export class SparqlResultConverter {


	convertToClass<T>(inputArray: SparqlResultLine[], initialProperty: string, type: (new () => T)): T{
		let mappingDefinition: MappingDefinition;
		mappingDefinition.propertyToGroup = initialProperty;
		mappingDefinition.name = initialProperty;
		mappingDefinition.rootName = `${initialProperty}s`
		let propertyNames: string[];
		try {
			const obj = new type();
			propertyNames = Object.getOwnPropertyNames(obj);
		}catch (err) {
			throw new Error("Error while creating an instance of your type. Make sure 'type' is a valid class with a default constrcutor.");
		}
		//TODO:
		// If a property type is simple, it can be collected -> push to toCollect
		// If a property type is another class, there has to be a new childmapping
		// But what about arrays of (both simple and complex) properties?
		propertyNames.forEach(propName => {
			if(typeof propName == ("string" || "number" || "boolean")) {
				mappingDefinition.toCollect.push(propName);
			} else {
				mappingDefinition.
			}

		});
		return;
	}

	convertToDefinition(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[]): Record<string, Array<unknown>> {
		const flattenedArray = ArrayUtil.extractValues(inputArray);
		return this.convert(flattenedArray, mappingDefinitions);
	}

	/**
    * Groups a table-structure and converts it to a tree-like structure
 	* @param {*} inputArray An array representing data structured as a table
 	* @param {*} mappingDefinitions An array of objects representing the structure of the final output
 	*/
	private convert(inputArray: Record<string, string>[], mappingDefinitions: Partial<MappingDefinition>[]): Record<string,Array<unknown>> {
		const outputObject = {};

		mappingDefinitions.forEach(mappingDefinition => {

			// if no element of the input array has the property to group on, there's nothing to do return
			// if(!inputArray.some(elem => elem[mappingDefinition.propertyToGroup])) return null;


			// create a new array with the key [rootName], this will hold the grouped array


			let groupedObject;
			if (mappingDefinition.propertyToGroup && inputArray.some(elem => elem[mappingDefinition.propertyToGroup])) {
				outputObject[mappingDefinition.rootName] = new Array<unknown>();
				groupedObject = this.groupArray(inputArray, mappingDefinition);

				for (const key in groupedObject) {
					const groupedElement = groupedObject[key];


					// Collect all elements that should be collected
					// TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
					const elemsToCollect = {};
					if(mappingDefinition.toCollect) {
						mappingDefinition.toCollect.forEach((elemToCollect) => {
							elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];
							groupedElement.forEach((elem) => {
								delete elem[elemToCollect];
							});
						});
					}


					let objToPush = {};
					const nameToPush = {
						[mappingDefinition.name]: key,
					};

					let groupedArrayToPush : Record<string, Array<unknown>>;
					let rootName;
					if (mappingDefinition.childMappings){
						// If there are "real" childMappings (with a propertyToGroup) -> call convert() recursively on the groupedElement
						groupedArrayToPush = this.convert(groupedElement as Record<string, string>[], mappingDefinition.childMappings);
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
					objToPush = {
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


	private groupArray(inputArray: Record<string, string>[], mappingDefinition: Partial<MappingDefinition>): Record<string, Array<unknown>> {

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

