import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Avatar, createStyles, makeStyles, Theme } from "@material-ui/core";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import * as Constants from '../Reducers/constants';
import { useDispatch, useSelector } from "react-redux";
import BookIcon from '@material-ui/icons/Book';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
      padding: theme.spacing(2),
    },
    small: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    },
  })
);
interface Props {}
export default function Header({}: Props): ReactElement {
  const [authorizedDisplay, setauthorizedDisplay] = useState(false);
  const [userSearchInput, setuserSearchInput] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] =
  React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  let history = useHistory();

  const logout = () => {
    dispatch({ type: Constants.USER_LOGOUT });
    setauthorizedDisplay(false);
    history.push("/");
  };

  useEffect(() => {
    if (user.token != "") {
      setauthorizedDisplay(true);
    }
  }, [user.token])

  const searchInput=(e:any)=>{
    setuserSearchInput(e.target.value)
  }

  const checkIfEnter=(e:any)=>{
    if (e.charCode === 13) {
      console.log(`userSearchInput`, userSearchInput)
      if(userSearchInput[0]==='t' && userSearchInput[1]==="t"){
        setuserSearchInput('')
        dispatch({type:Constants.SET_SEARCHED_MOVIES_IMDB,payload:{}})
        history.push(`/movies/${userSearchInput}`)
      }
      else{
        console.log('simple search')
        setuserSearchInput('')
        dispatch({type:Constants.SET_SEARCHED_MOVIES_TEXT,payload:[]})
        history.push(`/search?q=${userSearchInput}`)
      }
    }
  }

  const userOption=(option :string )=>{
    console.log(`option`, option)
    if(option==="BookmarkedMovies"){
      history.push(`/bookmarked-movies`)
    }
    setAnchorEl(null);
  }
  return (
    <>
      <nav className="navbar navbar-expand-md navbar basic-navbar-nav my-nav-bar">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span
            className="navbar-brand-titleOne"
          >
            OMDB Movies
          </span>
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav navbar-right">
            <ul className="navbar-nav">
            <input className="form-control form-control-sm" type="text" onChange={searchInput} onKeyPress={checkIfEnter} value={userSearchInput}></input>
              <li className="nav-item active">
                {authorizedDisplay ? (
                  <>
                    <div style={{display:'inline-block',marginLeft:'0vw'}}>
                      <Button onClick={handleClick} style={{marginLeft:'4vw'}}>
                        <Avatar className={classes.small}>{user.loggedInUser.username[0]}</Avatar>
                      </Button>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={()=>userOption('BookmarkedMovies')}>
                         < BookIcon/>Movies
                        </Typography> 
                        <Typography style={{cursor:'pointer'}} className={classes.typography} onClick={logout}>
                         <ExitToAppIcon/>LogOut
                        </Typography>
                      </Popover>
                    </div>
                  </>
                ) : (
                  <>
                    <Link className="nav-link-one" to="/login">
                      Login
                    </Link>
                    <Link className="nav-link-one" to="/register">
                      Register
                    </Link>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
