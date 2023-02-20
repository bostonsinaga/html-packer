/*
*   HTML SHRINKER BY BOSTON SINAGA
*   FOR NODEJS
*   USE THIS TO FORM CLIENT HTML TO ONE LINE
*/

const fs = require("fs");
const readerTool = require("./tools/reader");

function getOneLine(HTML_FILE_DIR) {
    const taskMessageStr = "SHRINKER GET ONE LINE";

    // using reader tool
    let [mainHTML, folderDir] = readerTool.getMainHTMLAndFolderDir(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == "") return "";

    // SPECIAL START //

    

    // SPECIAL END //

    if (mainHTML != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return mainHTML;
}

function writeOneLine(HTML_FILE_DIR) {

}