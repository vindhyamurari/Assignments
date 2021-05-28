import React, { ReactElement, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../services/AxiosHandler"
import { UserContext } from "../Context/UserContext";
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
  const { dispatch } = useContext(UserContext);
  const classes = useStyles();
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [passwordMatch, setpasswordMatch] = useState("");
  const [register, setregister] = useState({
    email: "",
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
    let { email, password } = register;
    if (passwordMatch === "") {
      let newUser = {  email , password };
      registerUser(newUser)
      .then((response)=>{
        if(response.data.success===false){
          setModalShow(true);
          setmodalMessage(response.data.message);
        }
      })
      .catch((err)=>{
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
            // className={classes.margin}
            // value={movie.name}
          /></div><div>
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
