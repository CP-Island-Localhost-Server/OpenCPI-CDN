const fs = require('fs');
const path = require('path');
const jsonfile = require('jsonfile');

const ip = 'PUT YOUR IP HERE!'

const directoryPath = './CDN_FILES/';

function processJSONFiles(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error('Error reading directory:', err);
            return;
        }

        files.forEach(file => {
            const filePath = path.join(dir, file);
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error('Error getting stats for file:', err);
                    return;
                }

                if (stats.isDirectory()) {
                    processJSONFiles(filePath); // Recursive call for directories
                } else if (stats.isFile() && path.extname(file) === '.json') {
                    // Process JSON files
                    jsonfile.readFile(filePath, (err, data) => {
                        if (err) {
                            console.error('Error reading JSON file:', err);
                            return;
                        }

                        // Update the value of 'cdnRoot' property
                        if (data.cdnRoot) {
                            data.cdnRoot = 'http://'+ip+':3000/cdn/';
                        }

                        if (data.url && data.url.includes('https://1263cf72.content.disney.io')) {
                            data.url = data.url.replace('https://1263cf72.content.disney.io', 'http://'+ip+':3000/cdn');
                        }

                        if (data.url && data.url.includes('storage.googleapis.com/1263cf72-5ae3-4931-afe6-9943ea80d972')) {
                            data.url = data.url.replace('storage.googleapis.com/1263cf72-5ae3-4931-afe6-9943ea80d972', ip+':3000/cdn');
                        }

                        // Write back the updated JSON data
                        jsonfile.writeFile(filePath, data, { spaces: 2 }, err => {
                            if (err) {
                                console.error('Error writing JSON file:', err);
                            } else {
                                console.log(`Updated ${filePath}`);
                            }
                        });
                    });
                }
            });
        });
    });
}

// Start processing JSON files in the specified directory
processJSONFiles(directoryPath);
