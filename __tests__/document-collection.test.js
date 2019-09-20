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

    it(`propagates error`, () => {
      // arrange
      const error = 'file error';
      const documentCollection = new DocumentCollection('document');
      writeFile.mockRejectedValueOnce(error);
      expect.assertions(1);
  
      // act
      documentCollection.save({ test: 'object' })
        .catch(err => {
          expect(err).toBe(error);
        });
    });
  });

  describe('get method', () => {

    it('gets file by id', () => {      
      const id = 'test';
      const documentCollection = new DocumentCollection('document');
      const readPromise = Promise.resolve('{"name":"jose","id":"test"}');
      readFile.mockResolvedValue(readPromise);

      return documentCollection.get(id)
        .then(() => {

          const readCalls = readFile.mock.calls;
          expect(readCalls.length).toBe(1); 
          expect(readCalls[0][0]).toBe('./document/test.json');
        });
    });
  });

  describe('getAll method', () => {

    it('gets all files', () => {
      const obj = { name: 'jose', id: 'test' };
      
      const readPromise = Promise.resolve(JSON.stringify(obj));
      readFile.mockReturnValueOnce(readPromise);

      const readdirPromise = Promise.resolve(['test.json']);
      readdir.mockReturnValueOnce(readdirPromise);

      const documentCollection = new DocumentCollection('document');

      return documentCollection.getAll()
        .then(array => {

          const readCalls = readFile.mock.calls;
          const readDirCall = readdir.mock.calls;
          expect(readDirCall[0][0]).toBe('document'); 
          expect(readCalls[1][0]).toBe('./document/test.json');
          expect(array[0].id).toBe(obj.id);
        });      
    });
  });
});
