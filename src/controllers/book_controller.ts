import { Request, Response } from 'express';
import { BookService } from '../services/book_service';

interface IBookController {
    createBook(req: Request, res: Response): Promise<void>;
    getAllBooks(req: Request, res: Response): Promise<void>;
    getBookById(req: Request, res: Response): Promise<void>;
    updateBook(req: Request, res: Response): Promise<void>;
    deleteBook(req: Request, res: Response): Promise<void>;
    searchBooks(req: Request, res: Response): Promise<void>;
}

export class BookController implements IBookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    createBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const bookData = req.body;

            if (!bookData.title || !bookData.author || !bookData.isbn) {
                res.status(400).json({
                    success: false,
                    message: 'Missing required fields: title, author, and isbn are required'
                });
                return;
            }

            const newBook = await this.bookService.createBook(bookData);

            res.status(201).json({
                success: true,
                message: 'Book created successfully',
                data: newBook
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: error.message || 'Failed to create book',
                error: error.message
            });
        }
    };

    getAllBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookService.getAllBooks();

            res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve books',
                error: error.message
            });
        }
    };

    getBookById = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            const book = await this.bookService.getBookById(id);

            if (!book) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book retrieved successfully',
                data: book
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve book',
                error: error.message
            });
        }
    };

    updateBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            delete updateData._id;
            delete updateData.createdAt;
            delete updateData.updatedAt;

            const updatedBook = await this.bookService.updateBook(id, updateData);

            if (!updatedBook) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book updated successfully',
                data: updatedBook
            });
        } catch (error: any) {
            res.status(400).json({
                success: false,
                message: 'Failed to update book',
                error: error.message
            });
        }
    };

    deleteBook = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;

            if (!id || typeof id !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Book ID is required'
                });
                return;
            }

            const deletedBook = await this.bookService.deleteBook(id);

            if (!deletedBook) {
                res.status(404).json({
                    success: false,
                    message: 'Book not found'
                });
                return;
            }

            res.status(200).json({
                success: true,
                message: 'Book deleted successfully',
                data: deletedBook
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete book',
                error: error.message
            });
        }
    };

    searchBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const { q } = req.query;

            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Search query is required'
                });
                return;
            }

            const books = await this.bookService.searchBooks(q);

            res.status(200).json({
                success: true,
                message: 'Search completed successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to search books',
                error: error.message
            });
        }
    };

    getBooksByGenre = async (req: Request, res: Response): Promise<void> => {
        try {
            const { genre } = req.params;

            if (!genre || typeof genre !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Genre is required'
                });
                return;
            }

            const books = await this.bookService.getBooksByGenre(genre);

            res.status(200).json({
                success: true,
                message: 'Books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve books by genre',
                error: error.message
            });
        }
    };

    getInStockBooks = async (req: Request, res: Response): Promise<void> => {
        try {
            const books = await this.bookService.getInStockBooks();

            res.status(200).json({
                success: true,
                message: 'In-stock books retrieved successfully',
                count: books.length,
                data: books
            });
        } catch (error: any) {
            res.status(500).json({
                success: false,
                message: 'Failed to retrieve in-stock books',
                error: error.message
            });
        }
    };
}