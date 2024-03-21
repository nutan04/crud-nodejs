const Book = require('../models/book');

const authenticateUser = (req, res) => {
    const authorization = req.headers['authorization'];
    const _token = req.session.newtoken;

    if (!authorization || _token !== authorization) {
        res.status(401).json({ message: "Unauthorized user" });
        return false;
    }
    return true;
};


exports.getAllBooks = async (req, res) => {
    try {
        if (!authenticateUser(req, res)) return;
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createBook = async (req, res) => {
    const { title, author, publishedDate } = req.body;
    try {
        if (!authenticateUser(req, res)) return;
        const newBook = new Book({ title, author, publishedDate });
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBook = async (req, res) => {
    try {

        if (!authenticateUser(req, res)) return;
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'book not found' });
        }
        res.json(book);


    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};
exports.updateBook = async (req, res) => {
    try {
        if (!authenticateUser(req, res)) return;
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            res.json({ message: "book not found" });
        } else {
            res.json(updatedBook);
        }

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.deleteBook = async (req, res) => {
    try {
        if (!authenticateUser(req, res)) return;
        const deletedbook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedbook) {
            res.json({ message: "book not found" });
        } else {
            res.json({ message: "book deleted successfully" });

        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

