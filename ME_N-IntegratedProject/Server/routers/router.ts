import express, { request } from 'express'
import { deleteBook, getAllBooks, getBookById, getBooksByAuthor,getBookByTitle, getBooksBySearchOnSimpleText, getBooksInPriceRange,getBooksLessThanGivenRating, postBook, updateBook } from '../controllers/controllers'

let router=express.Router()

router.route('/books')
    .get((request,response)=>{
        if(request.query.q){
            let search=''+request.query.q
            getBooksBySearchOnSimpleText(request,response,search)
        }
        else if(request.query.author){
            let auth=''+request.query.author
            getBooksByAuthor(request,response,auth)
        }
        else if(request.query.title){
            let title=''+request.query.title
            getBookByTitle(request,response,title)
        }
        else if(request.query['price']){
            let prices:any=request.query['price']
            getBooksInPriceRange(request,response,prices)
        }
        else if(request.query.rating){
            let rating=''+request.query.rating
            getBooksLessThanGivenRating(request,response,rating)
        }
        else{
            getAllBooks(request,response)
        }
    })
    .post((request,response)=>{
        postBook(request,response)
    })

router.route('/books/:id')
    .get((request,response)=>{
        getBookById(request,response,request.params.id)
    })
    .put((request,response)=>{
        updateBook(request,response,request.params.id)
    })
    .delete((request,response)=>{
        deleteBook(request,response,request.params.id)
    })


export{router}