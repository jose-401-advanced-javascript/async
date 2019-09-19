const { readFile, writeFile } = require('./files');
const shortid = require('shortid');
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
    const filePath = `${this.folder}/${id}.json`;
    // 2. use promisified fs to read file
    return readFile(filePath, 'utf8')
    // 3. deserialize contents
      .then((json) => {
        const object = JSON.parse(json);
        // 4. "return" object
        return object;
      });
    // 5. if expected, turn promisified fs errors into meaningful database errors
  }

  getAll() {
    // TODO:
    // 1. read folder file names
    // 2. use Promise.all and map each file name to a this.get call (remove .json file extension!)
    // 3. "return" array of objects
    // 4. if expected, turn promisified fs errors into meaningful database errors
  }
}



module.exports = DocumentCollection;