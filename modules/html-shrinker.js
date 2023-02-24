/*
*   HTML SHRINKER FOR NODEJS
*   BY BOSTON SINAGA
*   USE THIS TO MAKE IT HARDER TO READ SOURCE CODE
*/

const readerTool = require("../tools/reader");
const writerTool = require("../tools/writer");

/*
*   WHITE SPACE SHRINKER
*   (multi white spaces will be trimmed into 1 white space)
*/
function getSolidString(TEXT, IS_NOTIFYING) {
    const taskMessageStr = "SHRINKER SOLID";

    if (IS_NOTIFYING) {
        console.log(`** HTML ${taskMessageStr} RUNNING..`);
    }

    // SPECIAL START //

    let whiteSpaceCount = 0;

    for (let i = 0; i < TEXT.length; i++) {

        // white space detection
        if (TEXT.charAt(i) == ' ') {
            whiteSpaceCount++;
        }
        // trimming multi white spaces into 1 space
        else if (whiteSpaceCount > 1) {

            // set the index at second multi spaces
            const fillBackCtr = i - whiteSpaceCount + 1;

            // cut the white spaces
            TEXT = TEXT.slice(0, fillBackCtr) + TEXT.slice(i);

            // go to proper current char index
            i = fillBackCtr;
            
            // stop the loop (reload)
            whiteSpaceCount = 0;
        }
        else whiteSpaceCount = 0;
    }

    // SPECIAL END //

    if (TEXT != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return TEXT;
}

function writeSolid(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {

    const taskMessageStr = "SHRINKER SOLID";
    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return;
    
    writerTool.newFile(
        mainHTML,
        NEW_FILE_DIR,
        taskMessageStr,
        getSolidString,
        IS_OVERWRITE
    );
}

/*
*   TEXT SHRINKER
*
*   WARNING!
*   This will affect/remove string new line (enter),
*   use '\n' sign for new line instead
*/
function getOneLineString(HTML_FILE_DIR) {
    const taskMessageStr = "SHRINKER ONE LINE";

    // using reader tool
    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return "";

    // SPECIAL START //

    // new line removement
    for (let i = 0; i < mainHTML.length; i++) {
        if (mainHTML.charAt(i) == '\n') {

            // the '\n' become a white space
            mainHTML = mainHTML.slice(0, i - 1) + ' ' + mainHTML.slice(i + 1);
            i--;
        }
    }

    // using white space shrinker (solidify text)
    mainHTML = getSolidString(mainHTML, true);

    // SPECIAL END //

    if (mainHTML != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return mainHTML;
}

// using white space shrinker (solidify text)
function writeOneLine(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {
    writerTool.newFile(
        HTML_FILE_DIR,
        NEW_FILE_DIR,
        "SHRINKER",
        getOneLineString,
        IS_OVERWRITE
    );
}

module.exports = {
    getSolidString,
    writeSolid,
    getOneLineString,
    writeOneLine
};