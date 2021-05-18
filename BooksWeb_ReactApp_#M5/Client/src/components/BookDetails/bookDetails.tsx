import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useParams,} from "react-router-dom";
import { getBookById } from "../../services/AxiosHandler";
import { UserContext } from "../../Context/UserContext";
import SingleBook from "./singleBook";

interface Props {

}

interface MatchParams {
  paramId: string;
}

export default function BookDetails({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);

  const { paramId } = useParams<MatchParams>();

   async function oneBook() {
      let book=await getBookById(paramId)
       dispatch({type:'BOOKS_BOOK_BY_ID',singleBook:book})
    
  }
  useEffect(() => {
    oneBook()
  },[]);  
 
  
  return (
  <>
    <SingleBook book={state.singleBookDetails}></SingleBook>
  </>
  );
}
