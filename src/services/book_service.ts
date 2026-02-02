import { BookModel, IBook } from '../schema/book_schema';

interface IBookService {
    createBook(bookData: Partial<IBook>): Promise<IBook>;
    getAllBooks(): Promise<IBook[]>;
    getBookById(id: string): Promise<IBook | null>;
    updateBook(id: string, bookData: Partial<IBook>): Promise<IBook | null>;
    deleteBook(id: string): Promise<IBook | null>;
    searchBooks(query: string): Promise<IBook[]>;
}

export class BookService implements IBookService {

    async createBook(bookData: Partial<IBook>): Promise<IBook> {
        try {
            const newBook = new BookModel(bookData);
            const savedBook = await newBook.save();
            return savedBook;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('A book with this ISBN already exists');
            }
            throw new Error(`Failed to create book: ${error.message}`);
        }
    }

    async getAllBooks(): Promise<IBook[]> {
        try {
            const books = await BookModel.find().sort({ createdAt: -1 }).exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch books: ${error.message}`);
        }
    }

    async getBookById(id: string): Promise<IBook | null> {
        try {
            const book = await BookModel.findById(id).exec();
            return book;
        } catch (error: any) {
            throw new Error(`Failed to fetch book: ${error.message}`);
        }
    }

    async updateBook(id: string, bookData: Partial<IBook>): Promise<IBook | null> {
        try {
            const updatedBook = await BookModel.findByIdAndUpdate(
                id,
                { $set: bookData },
                { new: true, runValidators: true }
            ).exec();
            return updatedBook;
        } catch (error: any) {
            if (error.code === 11000) {
                throw new Error('A book with this ISBN already exists');
            }
            throw new Error(`Failed to update book: ${error.message}`);
        }
    }

    async deleteBook(id: string): Promise<IBook | null> {
        try {
            const deletedBook = await BookModel.findByIdAndDelete(id).exec();
            return deletedBook;
        } catch (error: any) {
            throw new Error(`Failed to delete book: ${error.message}`);
        }
    }

    async searchBooks(query: string): Promise<IBook[]> {
        try {
            const books = await BookModel.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { author: { $regex: query, $options: 'i' } }
                ]
            }).sort({ createdAt: -1 }).exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to search books: ${error.message}`);
        }
    }

    async getBooksByGenre(genre: string): Promise<IBook[]> {
        try {
            const books = await BookModel.find({ genre }).sort({ createdAt: -1 }).exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch books by genre: ${error.message}`);
        }
    }

    async getInStockBooks(): Promise<IBook[]> {
        try {
            const books = await BookModel.find({ inStock: true }).sort({ createdAt: -1 }).exec();
            return books;
        } catch (error: any) {
            throw new Error(`Failed to fetch in-stock books: ${error.message}`);
        }
    }
}