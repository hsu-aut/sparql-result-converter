export class ArrayUtil {

	/**
    * Transforms an array of objects to an array of simple datatypes by extracting every value-property.
    * @param {*} sparqlResult Array of objects that contain a value-property
    */
	static extractValues(sparqlResult: SparqlResultLine[]): Record<string, string>[] {

		const outputArray = new Array<Record<string, string>>();

		// Take every array element and extract all values of all object keys -> flatten the array
		sparqlResult.forEach((sparqlResultLine:SparqlResultLine) => {
			const objectKeys = Object.keys(sparqlResultLine);

			const outputElement = {};
			objectKeys.forEach((key) => {
				outputElement[key] = sparqlResultLine[key].value;
			});
			outputArray.push(outputElement);
		});

		return outputArray;
	}


}

export interface SparqlResultLine {
  [name: string]:  {
    type: string,
    value: string
  }
}
