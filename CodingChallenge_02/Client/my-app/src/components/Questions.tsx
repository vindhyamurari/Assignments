import {
  Avatar,
  Button,
  Card,
  createStyles,
  Fab,
  IconButton,
  makeStyles,
  Theme,
} from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import React, { ReactElement, useContext, useEffect, useState } from "react";
import { UserContext } from "../Context/UserContext";
import { getAllQuestions } from "../services/AxiosHandler";
import { MyVerticallyCenteredModal } from "./Modal";
import { grey } from "@material-ui/core/colors";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow';
import VisibilityIcon from '@material-ui/icons/Visibility';
import {getQuestionsByCatrgory,getQuestionsByText} from '../services/AxiosHandler'

interface Props {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 900,
      marginLeft: 180,
      marginTop: 30,
      zIndex: -1,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    expand: {
      transform: "rotate(0deg)",
      marginLeft: "auto",
      transition: theme.transitions.create("transform", {
        duration: theme.transitions.duration.shortest,
      }),
    },
    expandOpen: {
      transform: "rotate(180deg)",
    },
    avatar: {
      backgroundColor: grey[300],
    },
    button: {
      marginLeft: theme.spacing(2),
    },
  })
);

export default function Questions({}: Props): ReactElement {
  const { state, dispatch } = useContext(UserContext);
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [searchInput, setsearchInput] = useState("");
  const [searchBy, setsearchBy] = useState("");
  const classes = useStyles();
  
  useEffect(() => {
    getAllQuestions()
      .then((response) => {
        dispatch({
          type: "SET_QUESTIONS",
          questions: response.data.allQuestions,
        });
      })
      .catch((err) => {
        setModalShow(true);
        if (err.response) {
          setmodalMessage(err.response.data.message);
          return;
        }
        setmodalMessage(err.message);
      });
  }, [state.questions]);
  const selection = (e: any) => {
    setsearchBy(e.target?.value);
  };

  const inputEvent = (e: any) => {
    let inp = e.target?.value;
    setsearchInput(inp);
  };
  const submitSearchData = (e:any) => {
    e.preventDefault()
    console.log(`searchBy `, searchBy)
    console.log(searchInput)
    if(searchBy==='category'){
      getQuestionsByCatrgory(searchInput)
        .then((response)=>{
          dispatch({
            type: "SET_SELECTED_QUESTION",
            selectedQuestions: response.data.allQuestion,
          });
        })
        .catch((err)=>{
          setModalShow(true);
          if (err.response) {
            setmodalMessage(err.response.data.message);
            return;
          }
          setmodalMessage(err.message);
        })
    }
    else{
      getQuestionsByText(searchInput)
      .then((response)=>{
        dispatch({
          type: "SET_SELECTED_QUESTION",
          selectedQuestions: response.data.question,
        });
      })
      .catch((err)=>{
        setModalShow(true);
        if (err.response) {
          setmodalMessage(err.response.data.message);
          return;
        }
        setmodalMessage(err.message);
      })
    }
  };

  return (
    <div>
      <div>
        <MyVerticallyCenteredModal
          header="Failed"
          body={modalMessage}
          show={modalShow}
          onHide={() => {
            setModalShow(false);
          }}
        />
      </div>
      <div style={{display:"inline-block",marginLeft:'20vw',marginTop:'2vw'}}>
      <select 
              id="displayOptions"
              className="btn btn-white"
              onClick={selection}
              style={{ color: "black",display:"inline-block" }}
              defaultValue="search"
            >
              <option value="search" disabled>
                Select Search Option
              </option>
              <option value="category" style={{ color: "black" }}>
                Category
              </option>
              <option value="text" style={{ color: "black" }}>
                Text
              </option>
            </select>
            <form onSubmit={submitSearchData} className="form-inline my-2 my-lg-0" style={{display:"inline-block"}}>  
              <input
                style={{height:'3vw',width:'30vw',display:"inline-block"}}
                className="form-control mr-sm-2"
                id="searchButton"
                type="search"
                placeholder="Search"
                aria-label="Search"
                onChange={inputEvent}
              />
            <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            startIcon={<SearchIcon/>}
            type="submit"
            style={{marginLeft:'2vw',display:"inline-block"}}
             >
          </Button>
            </form>
        </div>
        <QuestionCard questions={searchInput===""?state.questions:state.selectedQuestions}></QuestionCard>
     
    </div>
  );
}


interface QuesProps {
  questions:any
}

function QuestionCard({questions}: QuesProps): ReactElement {
  const [authorizedDisplay, setauthorizedDisplay] = useState(false)
  const { state, dispatch } = useContext(UserContext);
  const classes = useStyles();
  useEffect(() => {
    if (state.token != "") {
        setauthorizedDisplay(true)
      }
      if (state.token === "") {
        setauthorizedDisplay(false)
      }
  }, [state.token])
 
  return (
    <div>
       {questions.map((question: any) => (
        <Link to={`/showAnswer/${question._id}`} style={{textDecoration:'none'}}>
        <Card key={question._id} className={classes.root} >
          <CardHeader style={{textDecoration:'none'}}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                Q
              </Avatar>
            }
            action={
              <>{authorizedDisplay?
                <>
                <Fab
                  size="small"
                  aria-label="add"
                  title="Add Answer"
                  style={{
                    marginTop: "0.5vw",
                    marginLeft: "1.5vw",
                    marginRight: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                  <DoubleArrowIcon color="action" />
                </Fab>
              
              </>:  
              <Fab
                  size="small"
                  aria-label="add"
                  title="View Answer"
                  style={{
                    marginTop: "0.5vw",
                    marginRight: "1.5vw",
                    marginLeft: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                  <VisibilityIcon color="action" />
                </Fab>
            }
              </>
            }
            title={question.question}
            subheader={question.category.join(",")}
          />
        </Card>
        </Link>
      ))}
    </div>
  )
}
