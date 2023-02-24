# html-packer v.1.0.0
*Usually used on NodeJS*

**Pack HTML, JS, CSS into one single HTML with addition**
**for clean comments and harder readability shrinker**

# MODULES API REFERENCE:

```
const HTMLPacker = require("./html-packer/html-packer");


HTMLPacker.HTMLNoComment.getCleanedString(HTML_FILE_DIR);

HTMLPacker.HTMLNoComment.writeClean(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE);


HTMLPacker.HTMLShrinker.getSolidString(TEXT, IS_NOTIFYING);

HTMLPacker.HTMLShrinker.writeSolid(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE);

HTMLPacker.HTMLShrinker.getOneLineString(HTML_FILE_DIR);

HTMLPacker.HTMLShrinker.writeOneLine(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE);


HTMLPacker.HTMLWrapper.getUnifiedString(HTML_FILE_DIR);

HTMLPacker.HTMLWrapper.writeUnify(HTML_FILE_DIR, NEW_FILE_DIR, IS_OVERWRITE);

```