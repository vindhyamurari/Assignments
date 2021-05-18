import React, { ReactElement } from 'react'
import BookThumbnail from './BookThumbnail';
import SingleBook from '../BookDetails/singleBook';

interface CardsProps {
    books: any;
  }
 function Cards({ books }: CardsProps): ReactElement {
    let img =
      "http://www.yosmart.com/wp-content/uploads/userguide/UserManual-400px.png";
     // "https://www.bing.com/images/search?view=detailV2&ccid=HXYm5su9&id=A00D9D0281558041A14E15970F47D664082580CB&thid=OIP.HXYm5su9wCvhWxb6Nq3ZrgHaCo&mediaurl=https%3a%2f%2fwpamelia.com%2fwp-content%2fuploads%2f2018%2f11%2fezgif-2-6d0b072c3d3f.gif";
    return (
      <>
        {books ? (
          books[0] === undefined ? (
            <div>
              <h2 style={{ margin: "10vw 7vw 0vw 40vw" }}>PLEASE WAIT</h2>
              <img src={img} style={{ margin: "0vw 0vw 0vw 32vw" }} />
            </div>
          ) : (
            <div className="card-deck">
              {books?.length === 1
                ? books.map((b: any) => (
                    
                        <SingleBook key={b._id} book={b}></SingleBook>
                   
                  ))
                : books?.map((book: any) => {
                    return (
                      <BookThumbnail book={book} key={book._id}></BookThumbnail>
                    );
                  })}
            </div>
          )
        ) : (
          console.log("Not Found")
        )}
      </>
    );
  }
  
  export default Cards