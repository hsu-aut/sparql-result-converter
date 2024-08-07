import { groupBy, cloneDeep, isEmpty } from "lodash";
import { ArrayUtil, SparqlResultLine } from "./ArrayUtil";

export class SparqlResultConverter {

	outputObject = {};

	public convertToDefinition(inputArray: SparqlResultLine[], mappingDefinitions: MappingDefinition[], keepUngroupedContents = true)
	: SparqlResultConverter {
		const flattenedArray = ArrayUtil.extractValues(inputArray);
		this.outputObject = this.convert(flattenedArray, mappingDefinitions, keepUngroupedContents);
		return this;
	}


	/**
    * Convert a SPARQL result according to an array of MappingDefinition
 	* @param {*} inputArray An array representing data structured as a table
 	* @param {*} mappingDefinitions An array of MappingDefinition objects representing the structure of the final output
 	*/
	private convert(inputArray: Record<string, string>[], mappingDefinitions: Partial<MappingDefinition>[], keepUngroupedContents: boolean)
	: Record<string,Array<unknown>> {
		const outputObject = {};

		// Loop over mapping definitions, there could be multiple definitions on one layer
		mappingDefinitions.forEach(mappingDefinition => {

			// Only group if propertyToGroup exists and at least some elements of inputArray have it
			if (mappingDefinition.propertyToGroup && inputArray.some(elem => elem[mappingDefinition.propertyToGroup])) {

				// Create a new array and add it under "rootName"
				outputObject[mappingDefinition.rootName] = new Array<unknown>();

				// Group the inputArray
				const groupedObject = this.groupArray(inputArray, mappingDefinition);

				// After grouping the array, we have to check for every element of the groupedObject if it can be further grouped
				for (const key in groupedObject) {
					const groupedElement = groupedObject[key] as Record<string, string>[];

					// toCollect can be used to specify common properties of the superordinate element -> Here we extract these properties
					// TODO: Not only take groupedElement[0], but make sure the properties to collect are equal for all groupedElements
					const elemsToCollect = this.collectElements(groupedElement, mappingDefinition);

					// Create a new entry for the grouped element under the new key (=name)
					const nameToPush = {
						[mappingDefinition.name]: key,
					};

					let groupedArrayToPush : Record<string, Array<unknown>>;

					if (mappingDefinition.childMappings){
						// If this mapDef has childMappings -> call convert() recursively on the groupedElement
						groupedArrayToPush = this.convert(groupedElement, mappingDefinition.childMappings, keepUngroupedContents);
					} else {
						// if there are no more childMappings -> create a copy of the groupedElement and remove all elements that might be grouped in the next steps
						// (i.e. elements with key = propertyToGroup). All the remaining bits (stuff that doesn't get grouped) is added under "children"
						const clonedGroupedElement = cloneDeep(groupedElement);
						clonedGroupedElement.forEach(elem => {
							const keys = Object.keys(elem);
							const keysToDelete = keys.filter(key => mappingDefinitions.some(mapDef => key === mapDef.propertyToGroup));
							keysToDelete.forEach(keysToDelete => {
								delete elem[keysToDelete];
							});
						});
						if(keepUngroupedContents && !clonedGroupedElement.every(elem => isEmpty(elem))) {
							groupedArrayToPush = {children: [ ...clonedGroupedElement]};
						}

					}

					// Create the object that will be pushed and add it to the outputObject
					const objToPush = {
						...nameToPush,			// the entry that was used for grouping
						...elemsToCollect,		// everything that was collected
						...groupedArrayToPush	// the rest (either recursively mapped stuff or the leftovers)
					};

					outputObject[mappingDefinition.rootName].push(objToPush);

				}
			} else {
				// if there is nothing to group and the inputArry is not empty -> Simple return the inputArray as output
				if(!inputArray.every(elem => isEmpty(elem)) && keepUngroupedContents) {
					outputObject[mappingDefinition.rootName] = [...inputArray];
				} else {
					outputObject[mappingDefinition.rootName] = [];
				}
			}

		});
		return outputObject;
	}

	/**
	 * Returns the grouped array of the first root element. Can be used as an easy getter if there is only one root element
	 */
	public getFirstRootElement(): Array<unknown>{
		const keys = Object.keys(this.outputObject);
		return this.get(keys[0]);
	}

	public getAll(): Record<string, Array<unknown>> {
		return this.outputObject;
	}

	/**
	 * Returns the grouped array with a given key
	 * @param key A key of one of the root elements
	 */
	public get(key: string): Array<unknown> {
		if(this.outputObject[key]) {
			return this.outputObject[key];
		} else {
			return [];
		}
	}


	/**
	 * Groups an array using lodash's groupBy
	 * @param inputArray array that is going to be grouped
	 * @param mappingDefinition Object of class MappingDefinition that is used for grouping (using propertyToGroup)
	 */
	private groupArray(inputArray: Record<string, string>[], mappingDefinition: Partial<MappingDefinition>)
	: Record<string, Array<unknown>> {

		// Group inputArray using propertyToGroup
		const groupedObject = groupBy(inputArray, (elem) => elem[mappingDefinition.propertyToGroup]) as Record<string, Array<unknown>>;

		// If there are entries that don't contain propertyToGroup, undefined is added -> delete it
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

	/**
	 *
	 * @param elemsToCollect
	 * @returns
	 */
	private processElemsToCollect(elemsToCollect: Array<string>) {
		const regex = /^([a-zA-Z0-9\-_]*)(?:\s(?:as)\s(\w*))?$/;
		return elemsToCollect.map(elem => {
			const match = elem.match(regex);
			if (match) {
				const originalName = match[1];
				const renamedName = match[2] || originalName;
				return new ElementToCollect(originalName, renamedName);
			}
			return null;
		}).filter(Boolean);
	}

	/**
	 * Extracts element that should be extracted out of a previously grouped element
	 * @param groupedElement Element that was previously grouped
	 * @param mappingDefinition Mapping definition whose "toCollect" property will be extracted
	 */
	private collectElements(groupedElement: unknown[], mappingDefinition: Partial<MappingDefinition>): Record<string, unknown> {
		const elemsToCollect = {};

		// if there's no "toCollect" -> do nothing
		if (!mappingDefinition.toCollect || mappingDefinition.toCollect.length == 0) return null;

		// Get elemsToCollect in case some entries use renaming (e.g., x as y)
		const processedElems = this.processElemsToCollect(mappingDefinition.toCollect);

		processedElems.forEach(({ originalName, renamedName }) => {
			if(groupedElement.every(groupedElem => groupedElem[originalName])) {
				elemsToCollect[renamedName] = groupedElement[0][originalName];
				groupedElement.forEach((elem) => {
					delete elem[originalName];
				});
			}
		});

		return elemsToCollect;
	}
}


/**
 * An interface for the structure of a mapping definition that is used to define the output of the SparqlResultConverter
 */
export interface MappingDefinition {
	rootName: string,
	propertyToGroup: string,
	name: string,
	toCollect?: string[];
	childMappings?: Array<Partial<MappingDefinition> & Pick<Required<MappingDefinition>, "rootName">>,
}

export class ElementToCollect {
	constructor(
		public originalName: string,
		public renamedName: string
	){}
}
