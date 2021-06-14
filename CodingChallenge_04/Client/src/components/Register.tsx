import React, { ReactElement, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import AxiosHandler from "../services/AxiosHandler"
import { MyVerticallyCenteredModal } from "./Modal";
import { Button, createMuiTheme, createStyles, makeStyles, TextField, Theme, ThemeProvider } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save' 
import { pink } from "@material-ui/core/colors";


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

interface Props {}

export default function Registration({}: Props): ReactElement {

  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [passwordMatch, setpasswordMatch] = useState("");
  const apiCall:any=new AxiosHandler();
  const [register, setregister] = useState({
    username:"",
    name:"",
    email: "",
    phone:"",
    password: "",
    confirmpassword: "",
  });

  let history = useHistory();

  const inputEvent = (event: any) => {
    let value = event.target?.value;
    let name = event.target?.name;
    if (name === "confirmpassword") {
      if (!(register.password === value)) {
        setpasswordMatch("Passwords does not Match");
      } else {
        setpasswordMatch("");
      }
    }
    setregister((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const submitFormDetails = (e: any) => {
    e.preventDefault();
    console.log(register)
    let {username,name,email ,phone, password } = register;
    if (passwordMatch === "") {
      let newUser = {username,name,email ,phone, password };
      apiCall.registerUser(newUser)
      .then((response:any)=>{
        if(response.data.success===false){
          setModalShow(true);
          setmodalMessage(response.data.message);
        }
      })
      .catch((err:any)=>{
        setModalShow(true);
        if (err.response) {
          setmodalMessage(err.response.data.message);
          return;
        }
        setmodalMessage(err.message);
      })
      history.push("/");
    } else {
      setModalShow(true);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        header="Registration Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
      <div className="regi-form">
      <form onSubmit={submitFormDetails} className={classes.root}>
      <ThemeProvider
          theme={createMuiTheme({
            palette: {
              primary: pink,
            },
          })}
        >
            <div className="regi-from-inner">
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
            // className={classes.margin}
            // value={movie.name}
          /></div>
          <div>
         <TextField
            label="Name"
            placeholder="Enter Name "
            name="name"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
            // className={classes.margin}
            // value={movie.name}
          /></div>
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
            // className={classes.margin}
            // value={movie.name}
          /></div>
          <div>
         <TextField
            label="Phone"
            placeholder="Enter Phone "
            name="phone"
            autoComplete="off"
            type="text"
            onChange={inputEvent}
            className={classes.myinput}
            // className={classes.margin}
            // value={movie.name}
          /></div>
          <div>
        <TextField
            label="Password"
            placeholder="Enter Password"
            name="password"
            autoComplete="off"
            type="password"
            required
             onChange={inputEvent}
             className={classes.myinput}
            // className={classes.margin}
            // value={movie.name}
          /></div>
          <div>
        <TextField
            label="Confirm Password"
            placeholder="Retype Password"
            name="confirmpassword"
            autoComplete="off"
            type="password"
            required
             onChange={inputEvent}
             className={classes.myinput}
            // className={classes.margin}
            // value={movie.name}
          /></div>
          <p style={{ color: "red", marginLeft: "0vw", marginTop: "0.5vw" }}>
            {passwordMatch}
          </p>
          <div style={{marginTop:'2vw',marginLeft:'1.3vw'}}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            startIcon={<SaveIcon />}
            type="submit"
             >
            Register
          </Button>
          </div>
          </div>
          </ThemeProvider>
      </form>
      </div>
    </>
  );
}
