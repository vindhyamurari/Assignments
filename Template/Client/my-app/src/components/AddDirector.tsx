// import axios from 'axios';
// import React, { ReactElement, useState } from 'react'
// import { addDirector } from '../services/AxiosHandler';
// import { MyVerticallyCenteredModal } from './Modal';

// interface Props {
    
// }

// export default function AddDirector({}: Props): ReactElement {

//     const [directorDetails, setdirectorDetails] = useState({
//         name:"",
//         age:0,
//         gender:"",
//         awardCount:0
//     })
//     const [modalShow, setModalShow] = useState(false)
//     const [modalMessage, setmodalMessage] = useState('')
//     const [showAlert, setshowAlert] = useState(false)

//   const inputEvent = (event: any) => {
//     let value = event.target?.value;
//     let name = event.target?.name;
//     setdirectorDetails((prevValue) => ({ ...prevValue, [name]: value }));
//   };

//   const submitFormDetails = (e: any) => {
//     e.preventDefault()
//     addDirector(directorDetails)
//     .then((res)=>{
//         if(res.data.success===true){
//             setshowAlert(true)
//         }
//         else{
//             setModalShow(true)
//             setmodalMessage(res.data.message)
//         }
//     })
//     .catch((err)=>{
//         setModalShow(true)
//         if(err.response){
//           setmodalMessage(err.response.data.message)
//           return 
//         }
//         setmodalMessage(err.message)
//     })
//   };

//     return (
//         <div>
//             <MyVerticallyCenteredModal
//         header="Failed"
//         body={modalMessage}
//         show={modalShow}
//         onHide={() => {
//           setModalShow(false);
//          // history.push("/addDirector");
//         }}
//       /> 
//       {showAlert?<div className="alert alert-success" style={{textAlign:'center'}} role="alert">
//        Director Details Added Successfully !
//          </div>:null}
//              <form onSubmit={submitFormDetails} className="registrationForm">
//         <div className="form-group">
//           <label htmlFor="name">Director Name</label>
//           <input
//             type="text"
//             className="form-control"
//             autoComplete="true"
//             name="name"
//             onChange={inputEvent}
//             placeholder="Director Name"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="author">Age</label>
//           <input
//             type="number"
//             className="form-control"
//             name="age"
//             onChange={inputEvent}
//             placeholder="age"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="author">Gender</label>
//           <input
//             type="text"
//             className="form-control"
//             name="gender"
//             onChange={inputEvent}
//             placeholder="gender"
//             required
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="author">Award Count</label>
//           <input
//             type="number"
//             className="form-control"
//             name="awardCount"
//             onChange={inputEvent}
//             placeholder="award Count"
//             required
//           />
//         </div>
//         <div className="submitform">
//           <button type="submit" className="btn btn-dark">
//             Submit
//           </button>
//         </div>
//       </form>
//         </div>
//     )
// }
export {}