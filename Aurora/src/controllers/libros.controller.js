const service = require('../services/libros.service');
const { isUUID, sanitizeTitle, validateYear } = require('../utils/validate');
const { randomUUID } = require('crypto');

//GET /api/libros
exports.getAll = async (req, res, next) => {
  try {
    const books = await service.getAll();
    return res.status(200).json(books);
  } catch (err) {
    return next(err);
  }
};

//GET /api/libros/:id
exports.getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: 'Id no valido (UUID requerido).' });
    }

    const book = await service.getById(id);
    if (!book) {
      return res.status(404).json({ error: 'Libro sin encontrar.' });
    }

    return res.status(200).json(book);
  } catch (err) {
    return next(err);
  }
};

//POST /api/libros
exports.create = async (req, res, next) => {
  try {
    let { title, author, year } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: 'Faltan title y author.' });
    }

    title = sanitizeTitle(String(title));
    author = sanitizeTitle(String(author));

    //Para Year
    if (year !== undefined && year !== null && year !== '') {
      const parsedYear = validateYear(year);
      if (parsedYear.error) {
        return res.status(400).json({ error: parsedYear.error });
      }
      year = parsedYear.value;
    } else {
      year = undefined;
    }

    const books = await service.getAll();
    const dup = books.find(b =>
      b.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      ((year !== undefined && b.year === year) || (year === undefined && (b.year === undefined || b.year === null)))
    );
    if (dup) {
      return res.status(409).json({ error: 'Ya existe un libro con el mismo titulo y año.' });
    }

    const newBook = {
      id: randomUUID(),
      title,
      author,
      ...(year !== undefined ? { year } : {})
    };

    const created = await service.create(newBook);
    return res.status(201).json(created);
  } catch (err) {
    return next(err);
  }
};

//DELETE /api/libros/:id
exports.remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isUUID(id)) {
      return res.status(400).json({ error: 'Id no valido (UUID requerido).' });
    }

    const ok = await service.remove(id);
    if (!ok) {
      return res.status(404).json({ error: 'Libro no encontrado.' });
    }

    return res.status(200).json({ message: 'Libro eliminado correctamente.' });
  } catch (err) {
    return next(err);
  }
};
