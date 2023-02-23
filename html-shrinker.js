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

function getSolidString(TEXT, IS_NOTIFYING) {
    const taskMessageStr = "SHRINKER SOLID";

    if (IS_NOTIFYING) {
        console.log(`** HTML ${taskMessageStr} RUNNING..`);
    }

    // SPECIAL START //

    

    // SPECIAL END //

    if (TEXT != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return TEXT;
}

function writeSolid(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {

    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return;
    
    writerTool.newFile(
        mainHTML,
        NEW_FILE_DIR,
        "WHITE SPACE SHRINKER",
        getSolidString,
        IS_OVERWRITE
    );
}

/*
*   -contains random spaces (replacement for new line)
*   -using white space shrinker (solidify text)
*/
function getOneLineString(HTML_FILE_DIR) {
    const taskMessageStr = "SHRINKER ONE LINE";

    // using reader tool
    let mainHTML = readerTool.getMainHTML(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return "";

    // SPECIAL START //

    mainHTML = getSolidString(mainHTML, true);

    // new line removement
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

// using white space shrinker
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