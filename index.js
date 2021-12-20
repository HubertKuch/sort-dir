const fs = require('fs');
const { clearInterval } = require('timers');

let path = '';

function writeHelp () {
    console.log(`
    File version: node index [OPTION]... [PATH],
    installed version: sorter [OPTION]... [PATH]
    OPTIONS:
    \t-p,--path \t\t\t Next parameter must path to directory like '~/' or 'C:/'
    \t-cf, --count-files \t\t Count sorted files
    \t-cd, --count-dir \t\t Count created directories
    \t-h, --help \t\t\t Show help
    \t-v, --version \t\t Show version

    Installation:
    \tAll you need to do is run installer.sh. After in your environment \n\tthe variables will be set to the variable 'sorter'. Usage is very simple like 'sorter --help'\n\tIMPORTANT: installer must be runned as administrator in windows or sudo in linux!
    `);
}

async function sortFiles (path) {
    if(!path || path.length === 0 || !typeof path === 'string') {
        console.log('Provide path');
        return;
    }


    fs.readdir(path, (err, content) => {
        if (err ){
            return err;
        }

        let files = {
            txt: [],
            pdf: [],
            java: [],
            js: [],
            ts: [],
            png: [],
            exe: [],
            jpg: [],
            bmp: [],
            html: [],
            css: [],
        };

        content.forEach((element, index) => {
            if (element.includes('.')) {
                const dots = element.split('.');
                if (files.hasOwnProperty(dots[dots.length-1])) {
                    files[dots[dots.length-1]].push(element);
                }
            }

        });


        let i = 0;
        const interval = setInterval(() => {
            Object.keys(files).forEach(key => {
                // check if folder with ex exists if not make it
                if (!fs.existsSync(`${path}/${files}`)) {
                    fs.mkdir(`${path}/${key}`, (err, path) => {
                        if (err) {
                            return err;
                        }
                    });
                }
    
                if(fs.existsSync(`${path}/${key}`)) {
                    files[key].forEach(file => {
                        // move files to specific folders
                        console.log(`${path}/${file}`);
                        console.log(`${path}/${key}/${file}`);
                        fs.rename(`${path}/${file}`, `${path}/${key}/${file}`, () => {});
                    });
                }
            });
            i++;
            i === 5 && clearInterval(interval);
        }, 200);

        console.log(files);
    });
}

if (process.argv[2] == '--path' || process.argv[2] == '-p') {
    path = process.argv[3];
    sortFiles(path);
}

if (process.argv[2] === '--help' || process.argv[2] == '-h') {
    writeHelp();
}

if (process.argv[2] === '-v' || process.argv[2] === '--version') {
    console.log(`You actual you 1.0 version.`);
}
