
/*
*   HTML WRAPPER BY BOSTON SINAGA
*   FOR NODEJS
*   USE THIS FOR COMBINE CLIENT HTML, JS AND CSS
*/

const fs = require("fs");

/*  NOTE:
*   the 'HTML_FILE_DIR' should be inside
*   the level directory of this module user
*/

// RETURN STRING
function getUnifiedString(HTML_FILE_DIR) {
    console.log("** HTML WRAPPER GET STRING RUNNING..");

    let mainHTML = "";
    let folderDir = "";

    // cut 'HTML_FILE_DIR' for the folder directory name
    for (let i = HTML_FILE_DIR.length - 1; i >= 0; i--) {
        if (HTML_FILE_DIR.charAt(i) == '/' || HTML_FILE_DIR.charAt(i) == '\\') {
            folderDir = folderDir.split('').reverse().join('');
            folderDir = HTML_FILE_DIR.slice(0, HTML_FILE_DIR.search(folderDir));
            break;
        }
        else {
            folderDir += HTML_FILE_DIR.charAt(i);
        }
    }

    // read the main html
    try {
        mainHTML = fs.readFileSync(HTML_FILE_DIR, "utf-8");
    }
    catch (err) {
        console.log("** HTML WRAPPER GET STRING ERROR!");
        console.log(err);
        return "";
    }

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
                    console.log("** HTML WRAPPER GET STRING ERROR!");
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

    if (mainHTML != "") {
        console.log("** HTML WRAPPER GET STRING COMPLETED!");
    }
    else console.log("** HTML WRAPPER GET STRING EMPTY!");

    return mainHTML;
}

function writeUnified(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE) {
    console.log("** HTML WRAPPER WRITE FILE RUNNING..");
    
    if (HTML_FILE_DIR == NEW_FILE_DIR && !IS_OVERWRITE) {
        console.log(
            "** HTML WRAPPER OVERWRITE SAFETY!\n" +
            "**** recommended to write into new file instead\n" +
            "**** otherwise if you intended to do so\n" +
            "**** please pass into the function as 'writeUnified(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE)'"
        );
        console.log("** HTML WRAPPER WRITE FAILED!");
    }
    else {
        const mainHTML = getUnifiedString(HTML_FILE_DIR);
        if (mainHTML != "") {
            fs.writeFileSync(NEW_FILE_DIR, mainHTML);
            console.log("** HTML WRAPPER WRITE COMPLETED!");
        }
        else console.log("** HTML WRAPPER WRITE FAILED!");
    }
}

module.exports = {getUnifiedString, writeUnified};