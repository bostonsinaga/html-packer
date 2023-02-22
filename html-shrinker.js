/*
*   HTML SHRINKER FOR NODEJS
*   BY BOSTON SINAGA
*   USE THIS TO MAKE IT HARDER TO READ SOURCE CODE
*   (SET SOURCE CODE INTO ONE LINE FORM)
*/

/*  WARNING!
*   This will affect/remove string new line (enter),
*   use '\n' sign for new line instead
*/

const readerTool = require("./tools/reader");
const writerTool = require("./tools/writer");

/* PRIVATE FUNCTIONS */

/*  NOTE:
*   recommended to use minimal one white space
*   after the white space removement
*   for prevent syntax error (being concatenated)
*
*   eg. //////          if no white space: //////
*       aVar = 1                           aVar = 1bFunc()
*       bFunc()                            //////
*       //////
*/

// set text to only has one white space
function removeMultiWhiteSpace(text) {

    let isStringIndex = false,
        whiteSpaceRate = 0;

    // pause removement when iside a string 
    const detectStringSign = (index) => {
        if ((text.charAt(index) == '"' ||
            text.charAt(index) == "'"  ||
            text.charAt(index) == '`') &&
            whiteSpaceRate <= 1
        ) {
            isStringIndex = !isStringIndex;
            if (whiteSpaceRate != 0) whiteSpaceRate = 0;
            return true;
        }
        return false;
    };

    for (let i = 0; i < text.length; i++) {
        
        // outside string (removement available)
        if (!detectStringSign(i) && !isStringIndex) {

            if (text.charAt(i) == ' ') {
                whiteSpaceRate++;
            }
            // multi white space detected
            else if (whiteSpaceRate > 1) { // char is not a white space

                text = (
                    text.slice(0, i - whiteSpaceRate + 1) +
                    text.slice(i)
                );

                i = i - whiteSpaceRate + 1;
                whiteSpaceRate = 0;
                detectStringSign(i);
            }
            else { // char is not a white space
                whiteSpaceRate = 0;
            }
        }
    }

    return text;
}

/* PUBLIC FUNCTIONS */

// contains random spaces (replacement for new line)
function getOneLineString(HTML_FILE_DIR) {
    const taskMessageStr = "SHRINKER ONE LINE";

    // using reader tool
    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return "";

    // SPECIAL START //

    mainHTML = removeMultiWhiteSpace(mainHTML);

    for (let i = 0; i < mainHTML.length; i++) {
        if (mainHTML.charAt(i) == '\n') {

            // the '\n' become a white space
            mainHTML = mainHTML.slice(0, i - 1) + ' ' + mainHTML.slice(i + 1);
            i--;
        }
    }

    // SPECIAL END //

    if (mainHTML != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return mainHTML;
}

function writeOneLine(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {
    writerTool.newFile(
        HTML_FILE_DIR,
        NEW_FILE_DIR,
        "SHRINKER",
        getOneLineString,
        IS_OVERWRITE
    );
}

module.exports = {getOneLineString, writeOneLine};