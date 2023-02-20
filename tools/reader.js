const fs = require("fs");

function getMainHTML(HTML_FILE_DIR) {
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

    return folderDir;
}

function getFolderDir(HTML_FILE_DIR, TASK_MESSAGE_STRING) {
    console.log(`** HTML ${TASK_MESSAGE_STRING} RUNNING..`);
    
    let mainHTML = "";
    
    // read the main html
    try {
        mainHTML = fs.readFileSync(HTML_FILE_DIR, "utf-8");
    }
    catch (err) {
        console.log(`** HTML ${TASK_MESSAGE_STRING} ERROR!`);
        console.log(err);
        return "";
    }

    return mainHTML;
}

function getMainHTMLAndFolderDir(HTML_FILE_DIR, TASK_MESSAGE_STRING) {
    return [getMainHTML(HTML_FILE_DIR, TASK_MESSAGE_STRING), getFolderDir(HTML_FILE_DIR)];
}

module.exports = {getMainHTML, getFolderDir, getMainHTMLAndFolderDir};