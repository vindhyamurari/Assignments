import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../Context/UserContext";
import { MyVerticallyCenteredModal } from "./Modal";
import { Button, createMuiTheme, createStyles, makeStyles,  TextField,  Theme, ThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import { LoginOutlined } from "@ant-design/icons";
import { loginUser} from "../services/AxiosHandler";

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
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");

  const [login, setlogin] = useState({
    email: "",
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
    loginUser(login)
      .then((response) => {
        console.log('in then')
        if (response.data.success === true) {
            console.log('in if')
          dispatch({ type: "LOGIN_USER_ADD_TOKEN", token: response.data.token });
         // history.push("/");
         history.goBack();
        } else {
            console.log('in else')
            setModalShow(true);
            setmodalMessage(response.data.message);
        }
      })
      .catch((err) => {
          console.log('in catch')
        setModalShow(true);
        if (err.response) {
          setmodalMessage(err.response.data.message);
          return;
        }
        setmodalMessage(err.message);
      });
  };

 
  console.log(history)

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
              <p style={{color: 'rgb(122, 122, 122)',marginLeft:'0vw'}}>enter email & password to login</p>
            <div>
         <TextField
            label="Email"
            placeholder="Enter email "
            name="email"
            autoComplete="off"
            type="email"
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
            startIcon={<LoginOutlined/>}
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
