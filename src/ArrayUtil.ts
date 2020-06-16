export class ArrayUtil {

    /**
    * Checks whether or not all entries of the array contain the property that is used for grouping
    * @param {*} arrayToCheck
    * @param {*} groupingProperty
    */
    static allEntriesContainGroupingProperty(arrayToCheck: any[], groupingProperty: string): boolean {
        for (let i = 0; i < arrayToCheck.length; i++) {
            const element = arrayToCheck[i];
            if (!Object.prototype.hasOwnProperty.call(element, groupingProperty)) {
                return false;
            }
        }
        return true;
    }



    /**
    * Transforms an array of objects to an array of simple datatypes by extracting every value-property.
    * @param {*} sparqlResult Array of objects that contain a value-property
    */
    static extractValues(sparqlResult: SparqlResultLine[]): TransformedSparqlResultElement[] {

        const outputArray = new Array<TransformedSparqlResultElement>();

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

export interface TransformedSparqlResultElement {
  [propName: string]: string;
}

