"use strict"
import axios from 'axios';

//GET A BOOK

export function getBooks(){
    return function(dispatch){
        axios.get('/api/books')
        .then((response)=>{
            dispatch({type:"GET_BOOKS",payload:response.data});
        })
        .catch((err)=>{
            dispatch({type:"GET_BOOKS_REJECTED",payload:err});
        })
    }
}
//POST A BOOK

export function postBooks(book){
    return function(dispatch){
        axios.post('/api/books',book)
        .then((response)=>{
            dispatch({
                type:"POST_BOOK",
                payload:response.data
            })
        })
        .catch((err)=>{
            dispatch({
                type:"POST_BOOK_REJECTED",
                payload:"there was a error while posting a new book to server, please check"
            })
        })
    }
}

//DELETE A BOOK

export function deleteBooks(id){
    return function(dispatch){
        axios.delete('/api/books/'+id)
        .then((response)=>{
            dispatch({
                type:"DELETE_BOOK",
                payload:id
            })
        })
        .catch((err)=>{
            dispatch({
                type:"DELETE_BOOK_REJECTED",
                payload:err
            })
        })
    }
}

//UPDATE A BOOK

export function updateBooks(book){
    return {
        type:"UPDATE_BOOK",
        payload:book
    }
}

export function resetButton(){
    return {
        type:"RESET_BUTTON"
    }
}