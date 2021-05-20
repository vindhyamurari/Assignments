import express, { request } from 'express'
import {getAllBooks} from '../controllers/controller'

let router=express.Router()


router.route('/books')
    .get((request,response)=>{
        getAllBooks(request,response)
    })

export{router}