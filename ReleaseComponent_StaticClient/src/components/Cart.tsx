import React, { ReactElement, useEffect, useState } from 'react'
import StarRating from './StarRating'
import '../styles/cart.css'
import { useHistory } from 'react-router'

interface Props {
    
}

export default function Cart({}: Props): ReactElement {
    // fetch items from db and store it in redux
    let cartBooks=[
        {
            _id:7878278291827,
            title: "The Accursed God",
            author: "Vivek Dutta Mishra",
            pages: "380",
            price: 199,
            rating: 4.9,
             stock:100,
            votes: 4909,
            tags: [
            "epic",
            "indian",
            "mahabharata",
            "bhishma",
            "history"
            ],
            cover: "http://thelostepic.com/wp-content/uploads/2021/04/THE-ACCURSED-GOD-Front-780x1100-1.jpg"
            
            },
            {
                _id:7676878798989090,
                title: "Things Fall Apart",
                author: "Chinua Achebe",
                pages: "209",
                price: 204,
                rating: 3.7,
                votes: 3299,
                stock:20,
                tags: [
                    "africa",
                    "colonialism",
                    "fiction",
                    "imperialism",
                    "tribal system"
            
                ],
               cover: "https://upload.wikimedia.org/wikipedia/en/6/65/ThingsFallApart.jpg"
            },
            {
                _id:988787987887687,
                title: "Wish I Could Tell You",
                author: "Durjoy Dutta",
                pages: "209",
                price: 359,
                rating: 3.7,
                votes: 3299,
                 stock:20,
                tags: [
                    "africa",
                    "colonialism",
                    "fiction",
                    "imperialism",
                    "tribal system"
            
                ],
               cover: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1566325115l/52226370._SX0_SY0_.jpg"
            }
            
    ]

    let calculatingQtyArray:any=[]
    cartBooks.forEach((book:any)=>calculatingQtyArray.push(1))
    const [qtyArray, setqtyArray] = useState(calculatingQtyArray)
    const history=useHistory();
    const [currentQty, setcurrentQty] = useState(1)
    const [totalPrice, settotalPrice] = useState(0)
    const [totalItems, settotalItems] = useState(1)
    
    const totalCostAndItems=()=>{
        let total=0,items=0
        for(let i=0;i<cartBooks.length;i++){
            total+=cartBooks[i].price*qtyArray[i]
            items+=qtyArray[i]
        }
        settotalPrice(total);
        settotalItems(items);
    }
    const deletitemInCart=(bookId:any)=>{
        //console.log(`bookId`, bookId)
    }

    const QuantityInputEvent=(e:any)=>{
        setcurrentQty(Number(e.target.value))
    }

    const whichBooksQty=(bookId:any)=>{
        let index=-1;
        for(let i=0;i<cartBooks.length;i++){
            if(bookId===cartBooks[i]._id)
                index=i;
        }
        let newQtyArray=qtyArray;
        newQtyArray[index]=currentQty;
        setqtyArray(newQtyArray);
        totalCostAndItems();
    }

    const proceedToCheckOut=()=>{
        history.push('/checkout')
    }
    console.log(`qtyArray`, qtyArray)

    useEffect(() => {
        totalCostAndItems()
    })

    return (
        <div className="container cart-conatiner">
            <h5>Shipping Cart</h5>
            <div className="row"> 
                <div className="col-10">
                {cartBooks.map((book)=>
                    <div className="row">
                    <hr></hr>
                   
                        <div className="col-3 img-cointainer">
                            <img src={book.cover} alt="book-cover" className="book-cover"/>
                        </div>
                        <div className="col-6">
                            <h4>{book.title}</h4>
                            <p>{book.author}</p>
                            <span><StarRating rating={book.rating}></StarRating></span><br/><br/>
                            <span>Quantity : </span><input type="number" min="1" max="100" step="1" placeholder="1" onChange={QuantityInputEvent} onKeyUp={()=>whichBooksQty(book._id)} className="quantity" />
                        </div>
                        <div className="col-1 price">
                            <h5><i className="fa fa-inr" aria-hidden="true"></i> {book.price}</h5>
                        </div>
                        <div className="col-1">
                            <span style={{cursor:'pointer'}} onClick={()=>deletitemInCart(book._id)}><i className="fa fa-times fa-2x del-icon" aria-hidden="true"></i></span>
                        </div>
                    </div>
                      )}
                </div>
                <div className="col-2" /* style={{border:'1px solid grey'}} */>
                    <div className="checkout-btn-div">
                        <p className="total-items-at-checkout">Total items : {totalItems} </p> 
                        <p className="total-price-at-checkout">MRP : {totalPrice} <i className="fa fa-inr" aria-hidden="true"></i></p>
                        <button className="detail-btn"  onClick={()=>proceedToCheckOut()} ><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Checkout  </button></div>
                </div>
            </div>
          
            <hr></hr>
            <h4 className="total-price">Total Price : {totalPrice}</h4>
        </div>
    )
}
