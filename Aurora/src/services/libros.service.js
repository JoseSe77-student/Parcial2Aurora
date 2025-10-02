const path = require('path');
const fs = require('fs').promises;

const DATA_PATH = path.join(__dirname, '..', 'data', 'libros_1000.json');

//Leer 1000 libros 
async function readBooks() {
  const data = await fs.readFile(DATA_PATH, 'utf8');
  return JSON.parse(data);
}

async function writeBooks(books) {
  const tempPath = DATA_PATH + '.tmp';
  await fs.writeFile(tempPath, JSON.stringify(books, null, 2), 'utf8');
  await fs.rename(tempPath, DATA_PATH);
}

async function getAll() {
  return await readBooks();
}

async function getById(id) {
  const books = await readBooks();
  return books.find(b => b.id === id);
}

async function create(book) {
  const books = await readBooks();
  books.push(book);
  await writeBooks(books);
  return book;
}

async function remove(id) {
  const books = await readBooks();
  const idx = books.findIndex(b => b.id === id);
  if (idx === -1) return false;
  books.splice(idx, 1);
  await writeBooks(books);
  return true;
}

module.exports = { getAll, getById, create, remove };
