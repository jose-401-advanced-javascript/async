const { readFile, writeFile, readdir } = require('./files');
const shortid = require('shortid');
const path = require('path');
// use npm to find a module for creating ids

class DocumentCollection {
  constructor(folder) {
    this.folder = folder;
  }

  save(object) {
    // TODO:
    // 1. assign an id
    object.id = shortid.generate();
    // 2. serialize object
    const json = JSON.stringify(object);
    // 3. use promisified fs to write to folder path using id.json as file name
    return writeFile(`./${this.folder}/${object.id}.json`, json)
    // 4. "return" object (which now has an id)
      .then(() => {
        return object;
      });
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  get(id) {
    // TODO:
    // 1. create file path from id
    const filePath = `./${this.folder}/${id}.json`;
    // 2. use promisified fs to read file
    return readFile(filePath)
    // 3. deserialize contents
      .then(json => {
        const object = JSON.parse(json);
        // 4. "return" object
        return object;
      });
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    return readdir(this.folder)
      .then(files => {
      // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
        return Promise.all(files.map(file => {
          const fileId = path.parse(file).name;
          // 3. "return" array of objects
          return this.get(fileId);
        }));
      });
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}



module.exports = DocumentCollection;