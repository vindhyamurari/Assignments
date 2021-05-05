import React, { ReactElement, useEffect, useState } from 'react'
import {  Route,BrowserRouter as Router, Switch } from 'react-router-dom'
import AddBook from './components/addBook'
import BookDetails from './components/bookDetails'
import Header from './components/header'
import Table from './components/Table'
import Register from './components/registration'
import Login from './components/login'


interface Props {
    
}

export default function App({}: Props): ReactElement {

    const [dataToSearch,setDataToSearch] = useState({
        searchBy:'',
        searchText:''
    })
    const searchData=(searchBy:string,searchText:string)=>{
        console.log('In App ',searchBy,' ',searchText)
        setDataToSearch({searchBy:searchBy,searchText:searchText})
    }
    return (
        <div>
                <Router>
                    <Header forSearch={searchData}/>
                    <Switch>
                    <Route exact path="/">
                        <Table dataTosearch={dataToSearch} ></Table>
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


