import React, { ReactElement } from 'react'

interface Props {
    rating:number
}

export default function StarRating({rating}: Props): ReactElement {
    let fullStars=[];
    let remainingStars=[]
    let halfStar=rating-Math.trunc(rating);
    let showHalfStar=halfStar>=0.5?true:false;
    let truncedRating=Math.trunc(rating)
    while(truncedRating!==0){
        fullStars.push(1);
        truncedRating=truncedRating-1;
    }
    if(showHalfStar){
        let remains=5-Math.ceil(rating)
        while(remains!==0){
            remainingStars.push(1)
            remains=remains-1;
        }
    }
    else{
        let remains=(5-Math.floor(rating))
        while(remains!==0){
            remainingStars.push(1)
            remains=remains-1;
        }
    }
    return (
        <>
        {fullStars.map((x,i)=><span key={i}><i className="fa fa-star" aria-hidden="true"></i></span>)}
        {showHalfStar?<i className="fa fa-star-half-o" aria-hidden="true"></i>:<></>}
        {remainingStars.map((x,i)=><i key={i} className="fa fa-star-o" aria-hidden="true"></i>)}
        </>
    )
}


