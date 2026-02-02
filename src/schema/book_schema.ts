import { Schema, Document, model } from 'mongoose';

export interface IBook extends Document {
    title: string;
    author: string;
    isbn: string;
    publishedYear: number;
    genre: string;
    price: number;
    inStock: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const BookSchema = new Schema<IBook>(
    {
        title: {
            type: String,
            required: [true, 'Book title is required'],
            trim: true,
            minlength: [1, 'Title must be at least 1 character long'],
            maxlength: [200, 'Title cannot exceed 200 characters']
        },
        author: {
            type: String,
            required: [true, 'Author name is required'],
            trim: true,
            minlength: [2, 'Author name must be at least 2 characters long']
        },
        isbn: {
            type: String,
            required: [true, 'ISBN is required'],
            unique: true,
            trim: true,
            validate: {
                validator: function (v: string) {
                    return /^(?:\d{10}|\d{13})$/.test(v.replace(/-/g, ''));
                },
                message: 'Please provide a valid ISBN-10 or ISBN-13'
            }
        },
        publishedYear: {
            type: Number,
            required: [true, 'Published year is required'],
            min: [1000, 'Published year must be after 1000'],
            max: [new Date().getFullYear(), 'Published year cannot be in the future']
        },
        genre: {
            type: String,
            required: [true, 'Genre is required'],
            trim: true,
            enum: {
                values: ['Fiction', 'Non-Fiction', 'Science', 'Technology', 'Biography', 'History', 'Fantasy', 'Mystery', 'Romance', 'Thriller', 'Other'],
                message: '{VALUE} is not a valid genre'
            }
        },
        price: {
            type: Number,
            required: [true, 'Price is required'],
            min: [0, 'Price cannot be negative']
        },
        inStock: {
            type: Boolean,
            default: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

BookSchema.index({ title: 1 });
BookSchema.index({ author: 1 });

export const BookModel = model<IBook>('Book', BookSchema);