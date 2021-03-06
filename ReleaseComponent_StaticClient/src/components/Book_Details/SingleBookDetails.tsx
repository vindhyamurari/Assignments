import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { ReactElement ,useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Rich from "../../Images/book.png";
import "../../styles/singleBookDetails.css";
import StarRating from "../StarRating";
interface Props {}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1200,
      marginLeft: 30,
      marginTop: 30,
      zIndex: -1,
    },
    button: {
        marginLeft: theme.spacing(2),
      },
  })
);


export default function SingleBookDetails({}: Props): ReactElement {

  let book={_id:112379787318387983,stock:1,description:`THE LOST EPIC ============ The story of the epic battle of
  Kurukshetra has been told and retold for ages. Millennia of dust,
  fables, imaginations — and the epic itself is lost. What remained
  is the story of a family feud and ambition of Kauravas and
  Pandavas. But why, then, was this an epic war? Why entire Aryavart
  plunged into this first real world-war? Why the echo of this
  ancient war still resonates after all those centuries? Rediscover
  the lost epic whose origin lies in the birth of the Kurukshetra
  that had tasted its first blood over a hundred years before the
  final Mahabharata war. Discover the complete saga of Mahabharata
  which goes far and beyond just Kauravas and Pandavas and their
  ambitions.THE ACCURSED GOD ================ Long before the epic battle,
  long before even the birth of Kurukshetra, a man swore on his
  father’s pyre to avenge against the mightiest empire, any
  civilization had ever seen. Between his might and near-certain
  destruction of the Empire, stood a warrior, who rose like a
  phoenix from the ashes of his seven dead brothers — taking the
  mantle of a fabled Accursed God. In the clash that followed,
  Aryavart heard several more oaths by the side of more burning
  pyres, until, a young king decided that no price is too high for
  peace. Little did he know that the price would be a war
  engulfing the entire Aryavart, where few would live to tell the
  tale. And only one man can delay the inevitable if not prevent
  it. He is the accursed God and even he doesn’t know that destiny
  is like a quicksand, the more he tries to prevent it, the faster
  Aryavart moves towards the ultimate catastrophe. Discover the
  saga of a man’s journey to that of a legendary and universally
  hated Accursed God, the saga of the ruthless ambitions and
  unfulfilled loves, endless deceits and vengeful oaths, and the
  saga of the battles to prevent the ultimate war. TESTIMONIALS
  ============= When is the last time you finished a book and
  discover something? Here is a gripping and intriguing take on
  the greatest epic of all time through the eyes of its pivotal
  character that leaves your mind exhilarated, adding a fresh
  perspective to the tale that’s known, yet unknown. Throughout
  the fast action-packed book, the author masterfully blends
  politics, war and science and blurs the gap between love and
  hate, peace and war, and fiction and reality. A must-read novel
  which will leave you wanting for more. --- Colonel Avanish,
  Indian Army`,reviews:[{name:'Sreedhar',rating:5,comment:`Fascinating book about the legendary Bhishma, 
  with refreshing insights! With excess focus in the modern day narrations about the events connected to 
  the Pandava-Kaurava rivalry, the role of Bhishma has not got its due. This book is a big step towards addressing
   this anomaly.Portrayal of Bhishma as well as other prominent characters including Bhagwan Parasuram and Kashi 
   Princess Amba, has been exceptionally brilliant. The palace intrigues at Hastinapur, Panchal, Kashi, has been 
   presented in a lucid  way.`},{name:'Lokesh',rating:5,comment:`This is an amazing book that will force you to think. 
   Finally a copy of Mahabharat which doesn't rely on mirch masala but truth.`},{name:'Prabir',rating:4,comment:`It's a good read, shouldn't be looked at from 
   The Mahabharata's point of view. The focus shifted from The Bhishma to other characters. it's the writer's retelling of a story,
    but not the epic. will be waiting for the second half.`}]}

    const classes = useStyles();
  const [bookDescription, setbookDescription] = useState(book.description.substring(0,400))
  const [readMoreFlag, setReadMoreFlag] = useState(false)
  const [stockFlag, setstockFlag] = useState(false)
  const [authorizedUser, setauthorizedUser] = useState(false)
  const [isAdmin, setisAdmin] = useState(false)
  const [reviewSectionDisplay, setreviewSectionDisplay] = useState(false)
  const history=useHistory();
  let user=useSelector((state:any)=>state.user)
  console.log(`user from single`, user)
  const [userEnteredReview, setuserEnteredReview] = useState({
    name:'',
    comment:'',
    rating:0
  })

  useEffect(() => {
    if(book.stock===0){
      setstockFlag(true);
    }
  }, [])
  
  const readMoreDescription=()=>{
    setbookDescription(book.description);
    setReadMoreFlag(true);
    }
  const readLessDescription=()=>{
    setbookDescription(book.description.substring(0,400));
    setReadMoreFlag(false);
  }

  const addUserReview=()=>{
    if(user!==undefined){
      if(user.loggedInUser.role==="user"){
        setreviewSectionDisplay(true)
      }
    }
    else{
      history.push('/login')
    }
   
  }

  const inputEvent=(e:any)=>{
    let name = e.target.name;
    let value = e.target.value;
    setuserEnteredReview({ ...userEnteredReview, [name]: value })
  }

  const submitUserReview=(e:any)=>{
    e.preventDefault();
    console.log(userEnteredReview);
  }

  const proceedToCheckOut=()=>{
    // if directly going to check out take the book id to get book info
    if(user!==undefined){
      history.push('/checkout');
    }
    else{
      history.push('/login')
    }
      
  }

  const proceedToCart=()=>{
    if(user!==undefined){
      history.push('/cart');
    }
    else{
      history.push('/login')
    }
  }

  // useEffect(
  //   () => {
  //      if (user.token != "") {
  //       setauthorizedUser(true);
  //        if(user.loggedInUser.role==='admin')
  //           setisAdmin(true)
  //         else
  //           setisAdmin(false)
  //      }
  //   },  [user.token] 
  // );
  return (
    <>
      <div className="container details-container">
        <div className="row">
          <div className="col img-col">
            <img
              src={Rich}
              alt="Cover Image of the Book"
              className="book-details-img"
            />
          </div>
          <div className="col-7">
            <h2>The Accursed God</h2>  {/* add from db */}
            <p>
              by &nbsp;&nbsp;&nbsp;<Link to={`/author/vivek-dutta-mishra`}
                style={{ textDecoration: "none", color: "#51A7AD" }}>Vivek Dutta Mishra</Link>&nbsp;&nbsp;&nbsp;(Author)
            </p>
            <p>
              <StarRating rating={4.7} /> Ratings  {/* add from db */}
            </p>
            <hr />
            <p className="book-description">{!readMoreFlag?
             <>{bookDescription} <span onClick={()=>readMoreDescription()} className='read-more-less' > read more...</span></>
            : <>{bookDescription} <span onClick={()=>readLessDescription()} className='read-more-less'> read less...</span></>
            }
            </p>
            <hr/>
            <p>
              <div className="row">
                <div className="col icon-cols">
                 Language
                </div>
                <div className="col icon-cols">
                Print Length
                </div>
                <div className="col icon-cols">
                People Voted
                </div>
                <div className="col icon-cols">
                Free Delivary
                </div>
              </div>
              <div className="row">
                <div className="col icon-cols">
                <i className="fa fa-globe fa-2x icons" aria-hidden="true"></i>
                </div>
                <div className="col icon-cols">
                <i className="fa fa-file-text-o fa-2x icons" aria-hidden="true"></i>
                </div>
                <div className="col icon-cols">
                <i className="fa fa-thumbs-o-up fa-2x icons" aria-hidden="true"></i>
                </div>
                <div className="col icon-cols">
                <i className="fa fa-truck fa-2x icons" aria-hidden="true"></i>
                </div>
              </div>
              <div className="row">
                <div className="col icon-cols">
                  <b>English</b>
                </div>
                <div className="col icon-cols">
                  <b> 392 Pages</b>  {/* add from db */}
                </div>
                <div className="col icon-cols">
                  <b> 2909 Likes</b>  {/* add from db */}
                </div>
                <div className="col icon-cols">
                  <b>  Avaiable</b>
                </div>
              </div>    
            </p>
          </div>
          <div className="col price-col">
            <div className="price-section">
              <div className="row price-row">
                <span className="price-info" style={{color:'#B12704'}}> <span className="display-price"><i className="fa fa-inr" aria-hidden="true"></i>  <b>350</b></span></span>
                <span className="price-info">Type : Paper Back</span>
                <span className="price-info">Incl of all Taxes</span>
              </div>
              <div className="row price-row">
                {!stockFlag? <span className="stock" style={{color:'green'}}><b>In Stock</b></span>
                :<span className="stock" style={{color:'red'}}><b>Out Of Stock</b></span>}  
              </div>
              {/* <div className="row price-row" style={{display:'inline-block'}}>
                <span>Quantity : </span><input type="number" min="1" max="100" step="1" className="quantity" /> {/* add stock as max
              </div> */}
              <div className="row price-row">
                <button className="add-to-cart detail-btn" onClick={()=>proceedToCart()}><i className="fa fa-shopping-cart" aria-hidden="true"></i> Add to Cart </button>
              </div>
              <div className="row price-row">
              {!stockFlag?<button className="buy detail-btn" onClick={()=>proceedToCheckOut()}><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Buy Book </button>
              :<button className="buy detail-btn" disabled><i className="fa fa-credit-card-alt" aria-hidden="true"></i> Buy Book </button>}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-3">
            <div className="product-details">
              <h5><b>Product Details</b></h5>
              <span className="product-details-span"><b>Language :</b> English</span><br/>
              <span className="product-details-span"><b>Paper Back :</b> 392 Pages</span><br/> {/* add from db */}
              <span className="product-details-span"><b>ISBN : </b>9387818941</span><br/> {/* add from db */}
              <span className="product-details-span"><b>County of Origin :</b> India</span><br/>
              <span className="product-details-span"><b>Net Quantity :</b> 1.00 Count</span><br/>
              <span className="product-details-span"><b>Tags :</b> Mythology,Friction</span><br/>{/* add from db */}
            </div>
          </div>
          <div className="col">
            <div className="user-reviews">
            {book.reviews.map((review)=><><span><i className="fa fa-user-circle user-icon" aria-hidden="true"></i>&nbsp;&nbsp;<b className="reviewer-name">{review.name}</b></span><br/>
            <StarRating rating={review.rating}/><br/>
            <span className="review-comment">{review.comment}</span><br/><br/>
            </>)}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div className="add-comments">
              {!reviewSectionDisplay?<><span className="tag-line">How would you rate your experience shopping for books on Alapha Emporium today? </span><button className="add-comment-btn" onClick={()=>addUserReview()}><b>Add Review </b></button></>
              :<div className="review-form"> <span className="add-comment-text">Add comments here</span>
              <form onSubmit={submitUserReview}>
      <div>
      <TextField
                label="Name"
                placeholder="Enter your name"
                autoComplete="off"
                type="text"
                name="name"
                required
                onChange={inputEvent}
                value={userEnteredReview.name}
              />
       <span className="rating-input">Rating : <input name="rating" value={userEnteredReview.rating} type="number" min="1" max="5" step="0.1" className="quantity"  onChange={inputEvent}/></span >
      <TextField
          id="standard-full-width"
          label="Comment"
          name="comment"
          required
          onChange={inputEvent}
          placeholder="Please type your comment here"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        value={userEnteredReview.comment}
        />
         </div>
         <div>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            type="submit"
             >
            Add
          </Button>
          </div>
          </form>
              </div>
      }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
