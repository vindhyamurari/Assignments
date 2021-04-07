export class Book{
    bookId:number;
    title:string;
    author:string;
    price:number;
    rating:number;
    details:string;
    coverPhotoUrl:string;

    constructor(bookId:number,title:string,author:string, price:number,rating:number,details:string='Book Details',coverPhotoUrl:string='url Not Specified'){
        this.bookId=bookId;
        this.title=title;
        this.author=author;
        this.price=price;
        this.rating=rating;
        this.details=details;
        this.coverPhotoUrl=coverPhotoUrl;
    }
    
} 