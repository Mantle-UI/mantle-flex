const { spawnSync } = require('child_process');
const path = require('path');

const nextCli = path.resolve(__dirname, '..', 'node_modules', 'next', 'dist', 'bin', 'next');
const environment = {
    ...process.env,
    GITHUB_PAGES: 'true'
};

function runNext(command) {
    const result = spawnSync(process.execPath, [nextCli, command], {
        env: environment,
        stdio: 'inherit'
    });

    if (result.status !== 0) {
        process.exit(result.status ?? 1);
    }
}

runNext('build');
runNext('export');
