import { Avatar } from "antd";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import {UserContext} from "../Context/UserContext";
interface Props {}

export default function Header({}: Props): ReactElement {
  const [authorizedDisplay, setauthorizedDisplay] = useState(false)
  const { state, dispatch } = useContext(UserContext);
  let history=useHistory();
  const logout=()=>{
    setauthorizedDisplay(false)
    dispatch({type:'LOGOUT_USER_REMOVE_TOKEN'})
    history.push('/')
  }
  useEffect(() => {
    if (state.token != "") {
        setauthorizedDisplay(true)
      }
  }, [state.token])
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar basic-navbar-nav my-nav-bar">
      <Link to="/" style={{textDecoration:'none'}}><span className="navbar-brand-titleOne" style={{fontFamily: 'Alex Brush'}}>Quees&Aees</span></Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav navbar-right">
            <ul className="navbar-nav">
              <li className="nav-item active">
                {authorizedDisplay? <>
                <Link className="nav-link-one" to="/addQuestion">
                  Add Question
                </Link>
                <button style={{backgroundColor:'white',border:'none', color: 'rgb(122, 122, 122)'}} onClick={logout}>Logout</button></>:
                <>
                <Link className="nav-link-one" to="/addQuestion">
                  Add Question
                </Link>
                <Link className="nav-link-one" to="/login">
                  Login
                </Link>
                <Link className="nav-link-one" to="/register">
                  Register
                </Link>
                </>}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
