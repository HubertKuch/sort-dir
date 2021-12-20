const fs = require('fs');
const { clearInterval } = require('timers');

let path = '';

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

if (process.argv[2] == '--path') {
    path = process.argv[3];
    sortFiles(path);
}
