import React, { ReactElement, useEffect, useRef } from 'react'

interface Props {
    rating:number,
    limit:number
}

export default function StarRating({rating,limit}: Props): ReactElement {
let starRef = useRef<HTMLDivElement>(null)
let percentage=(rating/limit) *100;
let width=`${percentage}%`
percentage=0;
useEffect(() => {
   starRef.current?.style.setProperty('width',width)
})
    return (
        <div  className="stars-background">
        <div ref={starRef} className="fa-stars"></div>
        </div>
    )
}
