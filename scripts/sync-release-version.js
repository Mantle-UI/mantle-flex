const fs = require('fs');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..');
const workspacePackage = JSON.parse(fs.readFileSync(path.join(repositoryRoot, 'package.json'), 'utf8'));
const publishPackagePath = path.join(repositoryRoot, 'package-lib.json');
const publishPackage = fs.readFileSync(publishPackagePath, 'utf8');
const versionPattern = /("version"\s*:\s*")[^"]+(")/;

if (!versionPattern.test(publishPackage)) {
    throw new Error('Could not find the Flex package version.');
}

fs.writeFileSync(publishPackagePath, publishPackage.replace(versionPattern, `$1${workspacePackage.version}$2`));
