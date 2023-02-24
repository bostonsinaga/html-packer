/*
*   HTML NO COMMENT FOR NODEJS
*   BY BOSTON SINAGA
*   USE THIS TO CLEAN COMMENTS
*/

/*  WARNING!
*   Only available for '.js' and '.css' comments!
*/

const readerTool = require("../tools/reader");
const writerTool = require("../tools/writer");

function getCleanedString(HTML_FILE_DIR) {
    const taskMessageStr = "NO COMMENT CLEAN";

    // using reader tool
    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return "";

    // SPECIAL START //

    let commentFlag = 0,
        startCutDex;

    const sliceRange = (startDex, endDex) => {
        // cut the 'comment'
        mainHTML = mainHTML.slice(0, startDex) + mainHTML.slice(endDex + 1);

        // return '+1' index after 'comment' as the next of '-1' index before 'comment'
        return endDex - startDex - 2;
    };

    for (let i = 0; i < mainHTML.length; i++) {

        if (commentFlag == 0 || commentFlag == 1) {
            if (mainHTML.charAt(i) == '/' && commentFlag == 0) {
                commentFlag = 1;
            }
            // single line (START) [//]
            else if (mainHTML.charAt(i) == '/' && commentFlag == 1) {
                commentFlag = 2;
                startCutDex = i - 1;
            }
            // multi line (START) [/**/]
            else if (mainHTML.charAt(i) == '*' && commentFlag == 1) {
                commentFlag = 3;
                startCutDex = i - 1;
            }
            else commentFlag = 0;
        }
        // single line handling [//]
        else if (commentFlag == 2) {

            // single line (END) [//]
            if (mainHTML.charAt(i) == '\n') {
                commentFlag = 0;
                i = sliceRange(startCutDex, i-1);  // '\n' is not included
            }
        }
        // multi line handling [/**/]
        else if (commentFlag == 3 || commentFlag == 4) {

            // about to end
            if (mainHTML.charAt(i) == '*') {
                commentFlag = 4;
            }
            // multi line (END) [/**/]
            else if (mainHTML.charAt(i) == '/' && commentFlag == 4) {
                commentFlag = 0;
                i = sliceRange(startCutDex, i);
            }
        }
    }

    // SPECIAL END //

    if (mainHTML != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return mainHTML;
}

function writeClean(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {
    writerTool.newFile(
        HTML_FILE_DIR,
        NEW_FILE_DIR,
        "NO COMMENT",
        getCleanedString,
        IS_OVERWRITE
    );
}

module.exports = {getCleanedString, writeClean};