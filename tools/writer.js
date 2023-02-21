const fs = require("fs");

exports.newFile = (
    HTML_FILE_DIR,
    NEW_FILE_DIR,
    TASK_TITLE_STRING,
    CALLBACK_OBJECT,    // must be able to yield 'html' string
    IS_OVERWRITE        // 'undefined' value will prompt error to prevent inadvertent overwriting file
) => {
    console.log(`** HTML ${TASK_TITLE_STRING} WRITE FILE RUNNING..`);
    
    if (HTML_FILE_DIR == NEW_FILE_DIR && !IS_OVERWRITE) {
        console.log(
            `** HTML ${TASK_TITLE_STRING} OVERWRITE SAFETY!\n` +
            "**** recommended to write into new file instead\n" +
            "**** otherwise if you intended to do so\n" +
            "**** please pass into the function as 'writeFunction(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE)'"
        );
        console.log(`** HTML ${TASK_TITLE_STRING} WRITE FAILED!`);
    }
    else {
        const mainHTML = CALLBACK_OBJECT(HTML_FILE_DIR);
        if (mainHTML != "") {
            fs.writeFileSync(NEW_FILE_DIR, mainHTML);
            console.log(`** HTML ${TASK_TITLE_STRING} WRITE COMPLETED!`);
        }
        else console.log(`** HTML ${TASK_TITLE_STRING} WRITE FAILED!`);
    }
};