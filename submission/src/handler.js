const {nanoid} = require('nanoid');
const books = require('./book');

// Add book
const addBookHandler = (request, h) => {
  if (!request.payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  // Check if readpage > pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
        `Gagal menambahkan buku.`+
        ` readPage tidak boleh lebih besar dari pageCount`,
    });

    response.code(400);
    return response;
  }

  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = pageCount === readPage;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

// Get all books
const getAllBooksHandler = (request, h) => {
  const {
    name,
    reading,
    finished,
  } = request.query;
  if (name) {
    const filteredBooks = books.filter((book) =>
      book.name.toLowerCase().includes(name.toLowerCase(),
      ),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  } else if (reading) {
    const filteredBooks = books.filter((book) =>
      Number(book.reading) === Number(reading),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  } else if (finished) {
    const filteredBooks = books.filter((book) =>
      Number(book.finished) === Number(finished),
    );
    const response = h.response({
      status: 'success',
      data: {
        books: filteredBooks.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: 'success',
      data: {
        books: books.map((item) => (
          {
            id: item.id,
            name: item.name,
            publisher: item.publisher,
          }
        )),
      },
    });
    response.code(200);
    return response;
  }
};

const getBookByIdHandler = (req, h) => {
  const {id} = req.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const {id} = request.params;
  if (!request.payload.name) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message:
      `Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount`,
    });

    response.code(400);
    return response;
  }

  const updatedAt = new Date().toISOString();
  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookHandler = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookHandler,
};
