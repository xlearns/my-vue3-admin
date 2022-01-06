let {exec,echo} = require('shelljs')
let name = process.argv[2] || 'Auto-commit';
let branch = process.argv[3] || 'master';

if (exec('git add .').code !== 0) {
    echo('Error: Git add failed')
    // echo -e "\033[32m绿色字\033[0m"
    exit(1)
}
if (exec(`git commit -am "${name}"`).code !== 0) {
    echo('Error: Git commit failed')
    exit(1)
}
if (exec(`git push origin ${branch}`).code !== 0) {
    echo('Error: Git commit failed')
    exit(1)
}
