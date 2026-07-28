const fs = require('fs');
const path = require('path');

const outputDirectory = path.resolve(__dirname, '..', 'dist-lib');

fs.writeFileSync(path.join(outputDirectory, 'primeflex.css'), "/* Legacy entry point. Prefer mantleflex.css for new projects. */\n@import './mantleflex.css';\n");
fs.writeFileSync(path.join(outputDirectory, 'primeflex.min.css'), "@import './mantleflex.min.css';\n");
