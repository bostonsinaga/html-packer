/*                     NODEJS                   */
/* USE THIS FOR COMBINE CLIENT HTML, JS AND CSS */

const fs = require("fs");

function unite(htmlFileDir) {
    let text;

    fs.readFile(htmlFileDir, "utf-8", (err, dataStr) => {
        if (err) console.log(err);
        else {
            text = dataStr;
        }
    });

    // searhing and inserting
    for (let i = 0; i < text.length; i++) {

        // CSS file //

        let searchPattern = '<link rel="stylesheet" href="';
        let foundDex = text.search(searchPattern);
        let includedFileDir;

        if (foundDex != -1) {
            const startCt = foundDex + searchPattern.length;
            
            for (let j = startCt; j < text.length; j++) {

                if (text.charAt(j) != '"' &&
                    startCt + includedFileDir.search(".css") + 4 == j
                ) {
                    break;
                }
                else {
                    includedFileDir += text.charAt(j);
                }
            }

            

            continue;
        }

        // JavaScript file //

        searchPattern = '<script src="';
        foundDex = text.search(searchPattern);

        if (foundDex != -1) {

            continue;
        }

        // not found or the end
        break;
    }
}