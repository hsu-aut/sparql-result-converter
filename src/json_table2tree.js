var groupBy = require('json-groupby')
var _ = require('lodash');

// Maps the query result of "select_allModules" to an array of Modules
class JsonTable2Tree {

    /**
     * Groups a table-structure and converts it to a tree-like structure
     * @param {*} inputArray An array representing data structured as a table 
     * @param {*} treeModel An object representing the final output (as a tree-structure)
     */
    convertTableToTree(inputArray, treeModel, currElement=0){

        // first: transform array
        if (currElement == 0 ) {
            inputArray = transformArray(inputArray);
        }
        
        
        // get currrent element and fix child root
        let currGroup = treeModel[currElement]
        currGroup.childRoot = typeof currGroup.childRoot === "undefined" ? "content" : currGroup.childRoot;

        // group the ungrouped inputArray
        let groupedArray = groupBy(inputArray, [currGroup.object]);
        
        // Empty the input array, it will later be filled with the grouped content
        inputArray = [];
        
        Object.keys(groupedArray).forEach(key => {
            let groupedElement = groupedArray[key];
           
            // Collect all elements that should be collected
            // TODO: Not only take groupedElement[0], but make sure the properties to collect are really equal for all groupedElements
            let elemsToCollect = {};
            if (currGroup.hasOwnProperty("toCollect")) {
                currGroup.toCollect.forEach(elemToCollect => {
                    elemsToCollect[elemToCollect] = groupedElement[0][elemToCollect];   
                    groupedElement.forEach(inputElem => {
                        delete inputElem[elemToCollect];
                    })
                });
            }


            if ((currElement <= (treeModel.length-2)) && (allEntriesContainGroupingProperty(groupedElement, treeModel[currElement+1].object))) {
                groupedElement = (this.convertTableToTree(groupedElement, treeModel, currElement+1));
            }

           
            

            // Delete the all elements that have already been grouped
            groupedElement.forEach(element => {
                treeModel.forEach(group => {
                    delete element[group.object];
                })
            });


            

            
            let nameToPush = {
                [currGroup.name] : key,
            }

            let objToPush;
            if (!_.isEmpty(groupedElement[0])) {
                let groupToPush = {[currGroup.childRoot] : groupedElement}
                objToPush = {...nameToPush, ...elemsToCollect, ...groupToPush};
            } else {
                objToPush = {...nameToPush, ...elemsToCollect};
            }  


            // Add the grouped element to the inputArray
            inputArray.push(objToPush);
           
        });
        
        return inputArray;
    }
}


/**
 * Checks whether or not all entries contain the property that is used for grouping
 * @param {*} arrayToCheck 
 * @param {*} groupingProperty 
 */
function allEntriesContainGroupingProperty(arrayToCheck, groupingProperty) {
    for (let i = 0; i < arrayToCheck.length; i++) {
        const element = arrayToCheck[i];
        if (!element.hasOwnProperty(groupingProperty)){
            return false;
        }
    }
    return true;
};


function transformArray(inputArray) {
    inputArray.forEach(inputElem => {
        Object.keys(inputElem).map(inputElemKey =>{
            return inputElem[inputElemKey] = inputElem[inputElemKey].value
        })
    });
    return inputArray;
}


module.exports = JsonTable2Tree;

