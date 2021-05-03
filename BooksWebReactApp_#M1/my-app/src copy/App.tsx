/* import React, { Component } from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Header from './components/header'
import Table from './components/Table'
import AddBook from './components/addBook'
import BookDetails from './components/bookDetails'
import {fetchFromLocalStorage} from './utils'

interface Props {
    
}
interface State {
    bookId:number
}


export default class App extends Component<Props, State> {
    state = {
        bookId:0
    }
    redirectToDetails:Function=(id:any)=>{
        console.log(id);
        this.setState({bookId:id})
    }
    render() {
        let books=fetchFromLocalStorage()
        console.log(books)
        return (
            <div>
                <Router>
                    <Header/>
                    <Switch>
                        <Route exact path="/">
                            <Table books={books} forRedirect={this.redirectToDetails}></Table>
                        </Route>
                        <Route exact path="/addBook">
                            <AddBook></AddBook>
                        </Route>
                        <Route exact path="/bookDetails">
                            <BookDetails id={this.state.bookId}></BookDetails>
                        </Route>
                    </Switch>
                </Router>
                
            </div>
        )
    }
} */

import React, { ReactElement, useEffect, useState } from 'react'
import {  Route,BrowserRouter as Router, Switch } from 'react-router-dom'
import AddBook from './components/addBook'
import BookDetails from './components/bookDetails'
import Header from './components/header'
import Table from './components/Table'
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
                        {/* {toggleScreenForSearch?<Table books={searchedBooks} forRedirect={redirectToDetails}></Table>
                        : <Table books={books} forRedirect={redirectToDetails}></Table>
                        } */}
                        <Table searchedBooks={searchedBooks} forRedirect={redirectToDetails}></Table>
                        </Route>
                        <Route exact path="/addBook">
                            <AddBook></AddBook>
                        </Route>
                        <Route exact path="/bookDetails">
                            <BookDetails id={bookId}></BookDetails>
                        </Route>
                       {/* {toggleScreenForSearch?<BookDetails id={bookId}></BookDetails>:<Redirect to="/" />}  */}
                    </Switch>
                </Router>
                
            </div>
    )
}


