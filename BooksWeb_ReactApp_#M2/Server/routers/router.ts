import express, { request } from 'express'
import { deleteBook, getAllBooks, getBookById, 
    getBooksByAuthor, getBooksBySearchOnSimpleText,getBooksWithMinRating,
     getBooksInPriceRange, postBook, updateBook ,patchBook} from '../controllers/controllers'
import {registerUser,loginUser,isAuthorized} from '../controllers/userController'

let router=express.Router()

router.get('/books/matching',(request,response)=>{
    //console.log('in route')
    let search=''+request.query.q
    getBooksBySearchOnSimpleText(request,response,search)
})

router.route('/books')
    .get((request,response)=>{
        getAllBooks(request,response)
    })
    .post(isAuthorized,(request,response)=>{
        console.log('secret way')
        postBook(request,response)
    })

router.route('/books/:id')
    .get((request,response)=>{
        getBookById(request,response,request.params.id)
    })
    .put(isAuthorized,(request,response)=>{
        updateBook(request,response,request.params.id)
    })
    .patch(isAuthorized,(request,response)=>{
        patchBook(request,response,request.params.id)
    })
    .delete(isAuthorized,(request,response)=>{
        deleteBook(request,response,request.params.id)
    })

router.get('/books/by/:author',(request,response)=>{
    getBooksByAuthor(request,response,request.params.author)
})

router.get('/books/priced/:min/:max',(request,response)=>{
    getBooksInPriceRange(request,response,request.params.min,request.params.max)
})

router.get('/books/with-min-rating/:rating',(request,response)=>{
    getBooksWithMinRating(request,response,request.params.rating)
})

router.post('/users/register',(request,response)=>{
    registerUser(request,response)
})

router.post('/users/login',(request,response)=>{
    loginUser(request,response)
})


export{router}