import React, { ReactElement, useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { downVoteAnswer, downVoteQuestion, getAllAnswersForQuestion, getAllQuestions, postAnswer, upVoteAnswer, upVoteQuestion } from "../services/AxiosHandler";
import { MyVerticallyCenteredModal } from "./Modal";
import { grey } from "@material-ui/core/colors";
import ThumbUpAltOutlinedIcon from "@material-ui/icons/ThumbUpAltOutlined";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import ThumbDownOutlinedIcon from "@material-ui/icons/ThumbDownOutlined";
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt';
import CardHeader from "@material-ui/core/CardHeader";
import {
    Avatar,
    Button,
    Card,
    createStyles,
    Fab,
    IconButton,
    makeStyles,
    TextField,
    Theme,
  } from "@material-ui/core";
  import CheckIcon from '@material-ui/icons/Check';

interface Props {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 1200,
      marginLeft: 30,
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

interface MatchParams {
  questionId: string;
}

export default function AddAnswer({}: Props): ReactElement {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [answer, setanswer] = useState('')
  const [tumbsUpQues, settumbsUpQues] = useState(false)
  const [tumbsdownQues, settumbsdownQues] = useState(false)
  const [tumbsUpAes, settumbsUpAes] = useState(false)
  const [tumbsdownAes, settumbsdownAes] = useState(false)
  const [authorizedDisplay, setauthorizedDisplay] = useState(false)
  const classes = useStyles();
  let history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  const { questionId } = useParams<MatchParams>();

  let question = state.questions.find(
    (question: any) => question._id === questionId
  );
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
  }, [state.vote])
 
  function allAnswers(){
    getAllAnswersForQuestion(questionId)
    .then((response) => {
      if (response.data.success === true) {
        dispatch({type:'SET_ANSWERS',answers:response.data.answerArray})
      }
      else{
          setModalShow(true);
        setmodalMessage(response.data.message);
      }
    })
    .catch((err) => {
      setModalShow(true);
      if (err.response) {
        setmodalMessage(err.response.data.message);
        return;
      }
      setmodalMessage(err.message);
    });
  }
  useEffect(() => {
    allAnswers()
  });
  useEffect(() => {
    if (state.token != "") {
        setauthorizedDisplay(true)
      }
  }, [state.token])
  const inputEvent = (event: any) => {
    let value = event.target?.value;
    setanswer(value)
  };
  const submitAnswer=(e:any)=>{
      e.preventDefault()
      console.log(e.target)
      postAnswer(questionId,answer,state.token)
        .then((response)=>{
            if (response.data.success === true) {
                allAnswers()
              }
              else{
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
  }
  function upVoteClickQuestion(id:any){
    upVoteQuestion(id,state.token)
      .then((response)=>{
        if (response.data.success === true) {
          //allAnswers()
          console.log('true')
          settumbsUpQues(true)
          dispatch({type:'USER_VOTED'})
        }
        else{
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
  }
  function downVoteClickQuestion(id:any){
    downVoteQuestion(id,state.token)
      .then((response)=>{
        if (response.data.success === true) {
          console.log('downVoted')
          settumbsdownQues(true)
          dispatch({type:'USER_VOTED'})
        }
        else{
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
  }
  function upVoteClickAnswer(id:any){
    upVoteAnswer(id,state.token)
      .then((response)=>{
        if (response.data.success === true) {
          //allAnswers()
          console.log('upvotedAnswer')
          settumbsUpAes(true)
          dispatch({type:'USER_VOTED'})
        }
        else{
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
  }
  function downVoteClickAnswer(id:any){
    downVoteAnswer(id,state.token)
      .then((response)=>{
        if (response.data.success === true) {
          //allAnswers()
          console.log('downvotedAnswer')
          settumbsdownAes(true)
          dispatch({type:'USER_VOTED'})
        }
        else{
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
  }
  
  return (
    <div className="showAnswer-div">
         <MyVerticallyCenteredModal
        header="Error"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
      <div>
        <p><Card className={classes.root} style={{textDecoration:'none'}}>
          <CardHeader style={{textDecoration:'none'}}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                Q
              </Avatar>
            }
            action={
              <>{authorizedDisplay?
                <>
                <div style={{display:'inline-block'}}>
                  {tumbsUpQues===false?<Fab
                  size="small"
                  aria-label="add"
                  onClick={()=>upVoteClickQuestion(question._id)}
                  style={{
                    marginTop: "0.5vw",
                    marginLeft: "1.5vw",
                    marginRight: "0.4vw",
                    backgroundColor: "white",
                    display:'inline-block'
                  }}
                >
                  <ThumbUpAltOutlinedIcon color="action" />
                </Fab>:
                <Fab
                size="small"
                aria-label="add"
                onClick={()=>upVoteClickQuestion(question._id)}
                style={{
                  marginTop: "0.5vw",
                  marginLeft: "1.5vw",
                  marginRight: "0.4vw",
                  backgroundColor: "white",
                  display:'inline-block'
                }}
              >
                <ThumbUpAltIcon color="action" />
              </Fab>
                }
                
                <p style={{marginLeft: "2.3vw",marginTop:'0.4vw',marginBottom:'0vw',fontSize:'medium'}}>{question.upVoteCount.count}</p>
                  </div>
                  <div style={{display:'inline-block'}}>
                    {tumbsdownQues? <Fab
                  size="small"
                  aria-label="add"
                  onClick={()=>downVoteClickQuestion(question._id)}
                  style={{
                    marginTop: "0.5vw",
                    marginLeft: "1.5vw",
                    marginRight: "1.5vw",
                    backgroundColor: "white",
                    display:'inline-block'
                  }}
                >
                <ThumbDownAltIcon color="action" />
                </Fab>:
                 <Fab
                 size="small"
                 aria-label="add"
                 onClick={()=>downVoteClickQuestion(question._id)}
                 style={{
                   marginTop: "0.5vw",
                   marginLeft: "1.5vw",
                   marginRight: "1.5vw",
                   backgroundColor: "white",
                   display:'inline-block'
                 }}
               >
               <ThumbDownOutlinedIcon color="action" />
               </Fab>}
               
                <p style={{marginLeft: "2.3vw",marginTop:'0.4vw',marginBottom:'0vw',fontSize:'medium'}}>{question.downVoteCount.count}</p>
                  </div>
              </>:null
            }
              </>
            }
            title={question.question}
            subheader={question.category.join(",")}
          />
        </Card></p>
      </div>
      <div>
      {state.answers.map((answer: any) => (
        <Card key={question._id} className={classes.root} style={{textAlign:'justify'}}>
          <CardHeader style={{textDecoration:'none'}}
            avatar={
              <Avatar aria-label="recipe" className={classes.avatar}>
                A
              </Avatar>
            }
            action={
              <>{authorizedDisplay?
                <>
                  <div style={{display:'inline-block'}}>
                    {tumbsUpAes?<Fab
                  size="small"
                  aria-label="add"
                // onClick={()=>settumbsUpAes(false)}
                  style={{
                    marginTop: "2vw",
                    //marginRight: "1.5vw",
                    marginLeft: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                <ThumbUpAltIcon color="action" />
                </Fab>:<Fab
                  size="small"
                  aria-label="add"
                  onClick={()=>upVoteClickAnswer(answer._id)}
                  style={{
                    marginTop: "2vw",
                    //marginRight: "1.5vw",
                    marginLeft: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                <ThumbUpAltOutlinedIcon color="action" />
                </Fab>}
                
                <p style={{marginLeft: "2.3vw",marginTop:'0.4vw',marginBottom:'0vw',fontSize:'medium'}}>{answer.upVoteCount.count}</p>
                  </div>
                  <div style={{display:'inline-block'}}>
                    {tumbsdownAes?<Fab
                  size="small"
                  aria-label="add"
                  onClick={()=>downVoteClickAnswer(answer._id)}
                  style={{
                    marginTop: "2vw",
                    marginRight: "1.5vw",
                    marginLeft: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                  <ThumbDownAltIcon color="action" />
                </Fab>: <Fab
                  size="small"
                  aria-label="add"
                  onClick={()=>downVoteClickAnswer(answer._id)}
                  style={{
                    marginTop: "2vw",
                    marginRight: "1.5vw",
                    marginLeft: "1.5vw",
                    backgroundColor: "white",
                  }}
                >
                  <ThumbDownOutlinedIcon color="action" />
                </Fab>}
                <p style={{marginLeft: "2.3vw",marginTop:'0.4vw',marginBottom:'0vw',fontSize:'medium'}}>{answer.downVoteCount.count}</p>
                </div>
                </>:null
            }
              </>
            }
            title={answer.answer}
          />
        </Card>
      ))}
      {authorizedDisplay?
      <form onSubmit={submitAnswer}>
      <div style={{marginLeft:'2.3vw',marginTop:'3vw',maxWidth:'90vw'}}>
      <TextField
          id="standard-full-width"
          label="Answer"
          name="answer"
          onChange={inputEvent}
          style={{ margin: 8 }}
          placeholder="Please type here"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true,
          }}
        />
         </div>
         <div style={{marginTop:'2vw',marginLeft:'40vw'}}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.button}
            startIcon={<CheckIcon />}
            type="submit"
             >
            Submit
          </Button>
          </div>
          </form>:null}
      
      </div>
    </div>
  );
}
