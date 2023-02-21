/*
*   HTML WRAPPER FOR NODEJS
*   BY BOSTON SINAGA
*   USE THIS TO COMBINE CLIENT HTML, JS AND CSS
*/

const fs = require("fs");
const readerTool = require("./tools/reader");
const writerTool = require("./tools/writer");

/*  NOTE:
*   the 'HTML_FILE_DIR' should be inside
*   the level directory of this module user
*/

// RETURN STRING
function getUnifiedString(HTML_FILE_DIR) {
    const taskMessageStr = "WRAPPER GET STRING";

    // using reader tool
    let [mainHTML, folderDir] = readerTool.getMainHTMLAndFolderDir(HTML_FILE_DIR, taskMessageStr);
    if (mainHTML == `** HTML ${taskMessageStr} ERROR!`) return "";

    // SPECIAL START //

    // searhing and inserting (the 'i' is not really in use just formality)
    for (let i = 0; i < mainHTML.length; i++) {

        /*
        *   Expected return 'true' to perform 'continue' statement
        *   eg. `insertFunc('<script src="', "js", "script")`
        */
        const insertFunc = (searchPattern, includedFileExtension, markName) => {

            let foundDex = mainHTML.search(searchPattern);
            let includedFileDirectory = "";

            // check whether has dot (should has a dot)
            if (includedFileExtension.charAt(0) != '.') {
                includedFileExtension = '.' + includedFileExtension;
            }

            if (foundDex != -1) {

                const startCt = foundDex + searchPattern.length;
                let ctrGo; // continue to use
                
                for (ctrGo = startCt; ctrGo < mainHTML.length; ctrGo++) {

                    if (mainHTML.charAt(ctrGo) == '"' &&
                        startCt + includedFileDirectory.search(includedFileExtension) +
                        includedFileExtension.length                                    == ctrGo
                    ) {
                        break;
                    }

                    includedFileDirectory += mainHTML.charAt(ctrGo);
                }

                try {
                    let dataStr = fs.readFileSync(folderDir + includedFileDirectory, 'utf-8');

                    // NOTE! When above get error the below code won't get executed

                    /* WARNING!!
                    *  This will just replace only a found line. So the error
                    *  still may happen. Example:
                    * 
                    *     <script src="script.js">     --> this line will be deleted
                    *     </script>                    --> this not deleted (error)
                    */

                    // 'ctrGo' as first new line index
                    for (ctrGo; ctrGo < mainHTML.length; ctrGo++) {
                        if (mainHTML.charAt(ctrGo) == '\n') {
                            break;
                        }
                    }

                    /*
                    *   using indentation spacing (except of the first insertion line)
                    *   [see the first 'markName']
                    */
                    let indentSpaces = '';

                    for (let j = foundDex - 1; j >= 0; j--)  {
                        if (mainHTML.charAt(j) == ' ') {
                            indentSpaces += ' ';
                        }
                        else if (mainHTML.charAt(j) == '\t') {
                            indentSpaces += '\t';
                        }
                        else if (mainHTML.charAt(j) == '\n') {
                            break;
                        }
                    }

                    // INDENTATION //
                    /* insert the indentation spaces to front of each 'dataStr' line */

                    let lineCharCount = 0;
                    let dataStr_buff = '';
                    let space4 = "    ";

                    for (let j = 0; j < dataStr.length; j++) {
                        if (dataStr.charAt(j) == '\n' || j == dataStr.length - 1) {
                            dataStr_buff += indentSpaces + space4 + dataStr.slice(j - lineCharCount, j+1);
                            lineCharCount = 0;
                        }
                        else lineCharCount++;
                    }

                    dataStr = dataStr_buff;

                    // first char of 'foundDex' and the new line character will be removed
                    mainHTML = (
                        mainHTML.slice(0, foundDex) +               // begin to exception
                        '<' + markName + ">\n" +
                        dataStr + '\n' +                            // insert the 'dataStr'
                        indentSpaces + "</" + markName + ">\n" +
                        mainHTML.slice(ctrGo + 1, mainHTML.length)  // exception to end
                    );
                }
                catch (err) {
                    console.log(`** HTML ${taskMessageStr} ERROR!`);
                    console.log(err);
                    return false;
                }

                return true;
            }
            return false;
        };

        // CSS file
        if (insertFunc('<link rel="stylesheet" href="', "css", "style")) continue;

        // JavaScript file
        if (insertFunc('<script src="', "js", "script")) continue;

        // not found or the end
        break;
    }

    // SPECIAL END //

    if (mainHTML != "") {
        console.log(`** HTML ${taskMessageStr} COMPLETED!`);
    }
    else console.log(`** HTML ${taskMessageStr} EMPTY!`);

    return mainHTML;
}

function writeUnify(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {
    writerTool.newFile(
        HTML_FILE_DIR,
        NEW_FILE_DIR,
        "WRAPPER",
        getUnifiedString,
        IS_OVERWRITE
    );
}

module.exports = {getUnifiedString, writeUnify};