const fs = require('fs').promises;
const path = require('path');

const extensionsList = ['.pdf', '.txt'];

async function listFiles(rootDir){
     if (!rootDir) {
        throw new Error("The 'rootDir' parameter is required.");
    }

    try {
        const files = await fs.readdir(rootDir)
        scanFiles(files, rootDir)
    } catch (error) {
        console.error(`Error reading directory ${rootDir}:`, error)
    }
}
async function scanFiles(files, rootDir) {
    for (let file of files) {
        const filePath = path.resolve(rootDir, file);
        try {
            const stats = await fs.stat(filePath);
            if (stats.isDirectory()) {
                listFiles(filePath);
            } else{
                const fileExt = path.extname(filePath);
                if (extensionsList.includes(fileExt)) {
                    console.log(`File: ${filePath}`);
                }
            }
        } catch (error) {
            console.error(`Error reading file ${filePath}:`, error)
        }
       
    }
    
}

listFiles("")