import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { MyVerticallyCenteredModal } from "./Modal";
import { Button, createMuiTheme, createStyles, makeStyles,  TextField,  Theme, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';
import AxiosHandler from "../services/AxiosHandler";
import * as Constants from '../Reducers/constants';
import { useDispatch, useSelector } from "react-redux";

interface Props {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '20ch',
      },
    },
  myinput:{
    width:100000
},
button: {
    marginLeft: theme.spacing(2),
  },

  }),
  
);
export default function Login({}: Props): ReactElement {
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  const apiCall:any=new AxiosHandler();
  const [login, setlogin] = useState({
    username: "",
    password: "",
  });

  let history = useHistory();

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    setlogin((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    console.log(login)
    dispatch({type:Constants.USER_LOGIN,payload:apiCall.loginUser(login)})
    //type:USER_LOGIN_FAILED 
    /*
      if payload is a promise then 
          step 1 : dispatch({type:action.type+"_PENDING"})
          step 2: then dispatch({type:action.type,payload:result})
          step 3 : catch if error dispatch({type:action.type+"_FAILED",payload:error})
     */
    apiCall.loginUser(login)
      .then((response:any) => {
        if (response.data.success === true) {
            console.log('in if')
          dispatch({ type: Constants.USER_LOGIN, payload: response.data });
         history.goBack();
        } else {
            setModalShow(true);
            setmodalMessage(response.data.message);
        }
      })
      .catch((err:any) => {
          console.log('in catch')
        setModalShow(true);
        if (err.response) {
          setmodalMessage(err.response.data.message);
          return;
        }
        setmodalMessage(err.message);
      });
  };

  return (
    <>
      <MyVerticallyCenteredModal
        header="Login Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
     <div className="logi-form">
      <form onSubmit={submitFormDetails} className={classes.root}>
      <ThemeProvider
          theme={createMuiTheme({
            palette: {
              primary: grey,
            },
          })}
        >
            <div className="logi-from-inner">
              <p style={{color: 'rgb(122, 122, 122)',marginLeft:'0vw'}}>enter username & password to login</p>
            <div>
         <TextField
            label="Username"
            placeholder="Enter username "
            name="username"
            autoComplete="off"
            type="text"
            required
            onChange={inputEvent}
            className={classes.myinput}
          /></div><div>
        <TextField
            label="Password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            type="password"
            required
             onChange={inputEvent}
             className={classes.myinput}
          /></div>
          <div style={{marginTop:'2vw',marginLeft:'1.6vw'}}>
          <Button
              variant="outlined"
            size="medium"
            className={classes.button}
            startIcon={<PersonRoundedIcon/>}
            type="submit"
             >
            Login
          </Button></div>
          </div>
          </ThemeProvider>
      </form>
      </div>
      
    </>
  );
}
