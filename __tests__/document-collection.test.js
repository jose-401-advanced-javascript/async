jest.mock('../lib/files.js', () => {
  return {
    readFile: jest.fn(),
    writeFile: jest.fn(),
    readdir: jest.fn(),
  };
});

// for setting up mock expectations
const { readFile, writeFile, readdir } = require('../lib/files');

const DocumentCollection = require('../lib/document-collection');

describe('Document Collection', () => {
  // TODO
  describe('save method', () => {

    it('saves object', () => {
      const obj = { name : 'jose' };
      const documentCollection = new DocumentCollection('document');
      const writePromise = Promise.resolve(obj);
      writeFile.mockResolvedValue(writePromise);

      return documentCollection.save(obj)
        .then(() => {

          const writeCalls = writeFile.mock.calls;
          expect(writeCalls.length).toBe(1);
          expect(writeCalls[0][0]).toBe(`./document/${obj.id}.json`);
        });
    });
  });
});
