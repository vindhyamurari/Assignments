export class Book {
    constructor(bookId, title, author, price, rating, details = 'Book Details', coverPhotoUrl = 'url Not Specified') {
        this.bookId = bookId;
        this.title = title;
        this.author = author;
        this.price = price;
        this.rating = rating;
        this.details = details;
        this.coverPhotoUrl = coverPhotoUrl;
    }
}
