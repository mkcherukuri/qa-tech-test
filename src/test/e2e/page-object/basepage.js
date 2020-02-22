import TestData from "../utils/constants";
import { Selector as $ } from 'testcafe';

const BasePage = {

    baseUrl: TestData.environment.local,

    goto(relativeUrl = null) {
        if (relativeUrl) {
            //navigate via relative paths
            return `${this.baseUrl}${relativeUrl}`;
        } else {
            //get url from tests
            return this.baseUrl;
        }
    },

    extractDataFromUITable: async function () {
        let tableElement = $('table');
        let rowCount = await tableElement.find('tr').count;
        let columnCount = await tableElement.find('tr').nth(0).find('td').count;

        //Iterate through table elements from UI and extract it to the Array
        var allRows = [];
        for (let i = 0; i < rowCount; i++) {
            let rowValues = [];
            for (let j = 0; j < columnCount; j++) {
                let tdText = await tableElement.find('tr').nth(i).find('td').nth(j).textContent;
                rowValues.push(tdText);
            }
            allRows.push(rowValues);
        }
        return allRows;
    },

    //logic to iterate through the array elements and find the right index
    findIndex: async function (array) {
        let leftSum = 0;
        for (let i = 1; i < array.length - 1; i++) {
            leftSum += array[i - 1];
            let rightSum = 0;
            for (var j = i; j < array.length - 1; j++) {
                rightSum += array[j + 1];
            }
            if (leftSum === rightSum) {
                return i;
            }
        }
        return - 1;
    }
}

export default BasePage;