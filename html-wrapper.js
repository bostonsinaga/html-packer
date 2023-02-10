/*                     NODEJS                   */
/* USE THIS FOR COMBINE CLIENT HTML, JS AND CSS */

const fs = require("fs");

/*  NOTE:
*   the 'htmlFileDir' should be inside
*   the level directory of this module
*/

// RETURN STRING
function uniteString(htmlFileDir) {
    let mainHTML;
    let folderDir;

    // cut 'htmlFileDir' for the folder directory name
    for (let i = htmlFileDir.length - 1; i >= 0; i--) {
        if (htmlFileDir.charAt(i) == '/' || htmlFileDir.charAt(i) == '\\') {
            fileDir = fileDir.split('').reverse().join('');
            folderDir = htmlFileDir.slice(0, htmlFileDir.search(folderDir));
            break;
        }
        else {
            folderDir += htmlFileDir.charAt(i);
        }
    }

    // read the main html (eg. 'index.html')
    fs.readFile(htmlFileDir, "utf-8", (err, dataStr) => {
        if (err) console.log(err);
        else {
            mainHTML = dataStr;
        }
    });

    // searhing and inserting (the 'i' is not really in use just formality)
    for (let i = 0; i < mainHTML.length; i++) {

        // expected return 'true' to perform 'continue' statement
        const insertFunc = (searchPattern) => {

            let foundDex = mainHTML.search(searchPattern);
            let includedFileDir;

            if (foundDex != -1) {

                const startCt = foundDex + searchPattern.length;
                let ctrGo; // continue to use
                
                for (ctrGo = startCt; ctrGo < mainHTML.length; ctrGo++) {

                    if (mainHTML.charAt(ctrGo) != '"' &&
                        startCt + includedFileDir.search(".css") + 4 == ctrGo
                    ) {
                        break;
                    }

                    includedFileDir += mainHTML.charAt(ctrGo);
                }

                fs.readFile(folderDir + '/' + includedFileDir, 'utf-8', (err, dataStr) => {
                    if (err) console.log(err);
                    else {
                        /* WARNING!!
                        *  this will just replace found line only not so the error
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

                        // first char of 'foundDex' and the new line character will be removed
                        mainHTML = (
                            mainHTML.slice(0, foundDex) +               // begin to explicit
                            dataStr +                                   // insert the 'dataStr'
                            mainHTML.slice(ctrGo + 1, mainHTML.length)  // explicit to end
                        );
                    }
                });
                return true;
            }
            return false;
        };

        // CSS file
        if (insertFunc('<link rel="stylesheet" href="')) continue;

        // JavaScript file
        if (insertFunc('<script src="')) continue;

        // not found or the end
        break;
    }

    return mainHTML;
}