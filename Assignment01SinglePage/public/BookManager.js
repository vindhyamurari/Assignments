import { Book } from './Book.js';
export class BookManager {
    addBookArray(oneBook) {
        //Method to add details of one New Book and add it to local storage
        let returnedBooks = [];
        if (typeof (Storage) !== "undefined") {
            //get the books array from local storage
            let stringReturnedBooks = localStorage.getItem("books");
            //add the new book to the array 
            if (stringReturnedBooks != null)
                returnedBooks = JSON.parse(stringReturnedBooks);
            returnedBooks.push(oneBook);
            returnedBooks.push(new Book(1, "When u succeed ", "Ramji singh", 200, 8.3, "Book On Path to Success"));
            returnedBooks.push(new Book(2, "Dark Sky Day", "Niveditha Rai", 450, 6.3, "On the dream"));
            returnedBooks.push(new Book(3, "Ocean screams ", "Gowri das", 350, 5.6, "Heights Of life"));
            returnedBooks.push(new Book(4, "God Of Horror ", "Ajith Ram", 750, 9.8, "Heights Of life"));
            returnedBooks.push(new Book(5, "The Moon Light ", "Scarlet Reo", 800, 7.5, "Heights Of life"));
            returnedBooks.push(new Book(6, "Blues n' Pinks ", "Kithen Kumar", 322, 8.3, "Heights Of life"));
            console.log(returnedBooks);
            //place back the new array after adding new element
            let stringBooks = JSON.stringify(returnedBooks);
            localStorage.setItem("books", stringBooks);
        }
        else {
            console.log("Local Storage not Found while Pushing the Data");
        }
    }
    getBooksFromLocalStorage() {
        //Method to get the details from the local storage
        let returnedBooks = [];
        if (typeof (Storage) !== "undefined") {
            let stringReturnedBooks = localStorage.getItem("books");
            if (stringReturnedBooks != null)
                returnedBooks = JSON.parse(stringReturnedBooks);
        }
        else {
            console.log("Local Storage not Found while Getting the Data");
        }
        console.log(returnedBooks);
        return returnedBooks;
    }
    deleteBookFromLocalStorage(title) {
        let returnedBooks = [];
        if (typeof (Storage) !== "undefined") {
            // get books array from local storage
            let stringReturnedBooks = localStorage.getItem("books");
            if (stringReturnedBooks != null)
                returnedBooks = JSON.parse(stringReturnedBooks);
            //check for the position of the deleted element and delete in array
            for (let i = 0; i < returnedBooks.length; i++) {
                if (returnedBooks[i].title == title) {
                    returnedBooks.splice(i, 1);
                    break;
                }
            }
            // the new array after deletion to the local storage
            let stringBooks = JSON.stringify(returnedBooks);
            localStorage.setItem("books", stringBooks);
        }
        else {
            console.log("Local Storage not Found while Getting the Data");
        }
    }
    searchOnId(books, searchNum) {
        //Method to search Books on ID 
        let idsearchedBooks = [];
        for (let b of books) {
            let myNum = b.bookId.toString();
            if (myNum == searchNum) {
                idsearchedBooks.push(b);
            }
        }
        return idsearchedBooks;
    }
    searchOnTitle(books, searchText) {
        //Method for Displaying All Books n Console
        let searchedBooks = [];
        searchText = searchText.toLowerCase();
        for (let b of books) {
            if (b.title.toLowerCase().indexOf(searchText) != -1) {
                searchedBooks.push(b);
                continue;
            }
        }
        console.log("searchedBooks " + searchedBooks);
        return searchedBooks;
    }
    getBooksOfGivenAuthour(books, searchText) {
        //Method to get books on the given authour name
        let searchedBooks = [];
        searchText = searchText.toLowerCase();
        for (let b of books) {
            if (b.author.toLowerCase().indexOf(searchText) != -1) {
                searchedBooks.push(b);
                continue;
            }
        }
        return searchedBooks;
    }
    getBookswithLessRating(books, rating) {
        //Method to get all books with rating less than given rating
        let searchedBooks = [];
        for (let b of books) {
            if (b.rating <= rating)
                searchedBooks.push(b);
        }
        return searchedBooks;
    }
    getBooksInPriceRange(books, price) {
        //Method to get all Books with in the given price range
        let pricevalues = price.split('-');
        let searchedBooks = [];
        for (let b of books) {
            if (b.price >= Number(pricevalues[0]) && b.price <= Number(pricevalues[1]))
                searchedBooks.push(b);
        }
        return searchedBooks;
    }
}
