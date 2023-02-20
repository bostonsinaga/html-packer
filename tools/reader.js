exports.getMainHTML = (HTML_FILE_DIR) => {
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
}

exports.getFolderDir = (HTML_FILE_DIR) => {
    let mainHTML = "";
    
    // read the main html
    try {
        mainHTML = fs.readFileSync(HTML_FILE_DIR, "utf-8");
    }
    catch (err) {
        console.log("** HTML WRAPPER GET STRING ERROR!");
        console.log(err);
        return "";
    }
}