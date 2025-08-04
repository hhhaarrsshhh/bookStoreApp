import Book from '../modal/book_modal.js'

export const getBook = async (req, res) => {
    try {
        const books = await Book.find();  // Await to get actual data
        res.status(200).json(books);  // Send plain array of books
    } catch(err) {
        console.error(err);
        res.status(500).json({ error: err.message });  // Send only error message
    }
}
