import React, { ReactElement, useEffect, useState } from 'react'
import {  Route,BrowserRouter as Router, Switch } from 'react-router-dom'
import AddBook from './components/addBook'
import BookDetails from './components/bookDetails'
import Header from './components/header'
import Table from './components/Table'
import Register from './components/registration'
import Login from './components/login'
import { searchBooks } from './utils'

interface Props {
    
}

export default function App({}: Props): ReactElement {
    const [bookId, setbookId] = useState(0)
    const [searchedBooks, setsearchedBooks] = useState([])

    const redirectToDetails:Function=(id:any)=>{
        setbookId(id)
    }

    let resOfSearchedBooks:any;
    const searchData=(searchBy:string,searchText:string)=>{
        resOfSearchedBooks=searchBooks(searchBy,searchText)
        if(resOfSearchedBooks){
            setsearchedBooks(resOfSearchedBooks)
        }
    }
    return (
        <div>
                <Router>
                    <Header forSearch={searchData}/>
                    <Switch>
                    <Route exact path="/">
                        <Table searchedBooks={searchedBooks} forRedirect={redirectToDetails}></Table>
                        </Route>
                        <Route exact path="/addBook">
                            <AddBook></AddBook>
                        </Route>
                        <Route exact path="/bookDetails/:paramId">
                            <BookDetails></BookDetails>
                        </Route>
                        <Route exact path="/login">
                            <Login></Login>
                        </Route>
                        <Route exact path="/register">
                            <Register></Register>
                        </Route>
                    </Switch>
                </Router>
                
            </div>
    )
}


