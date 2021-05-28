import TextField from "@material-ui/core/TextField";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import React, { useState, useContext, useEffect } from "react";
import CheckIcon from "@material-ui/icons/Check";
import { makeStyles } from "@material-ui/core/styles";
import { UserContext } from "../Context/UserContext";
import { MyVerticallyCenteredModal } from "./Modal";
import { useHistory } from "react-router-dom";
import { postQuestion } from "../services/AxiosHandler";

interface Props {}

const useStyles = makeStyles((theme) => ({
  margin: {
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    width: 250,
  },
  button: {
    marginLeft: theme.spacing(2),
  },
}));
export default function AddQuestion({}: Props) {
  const { dispatch, state } = useContext(UserContext);
  const [question, setQuestion] = useState<any>({
    question: "",
    category: [],
  });
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setmodalMessage] = useState("");
  const [categoryName, setCategoryName] = useState("");
  let history = useHistory();
  const multipleCategory = () => {
    if (categoryName !== "") {
      setQuestion({
        ...question,
        category: [...question.category, categoryName],
      });
      setCategoryName("");
    }
  };
  const inputEvent = (e: any) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "categoryName") {
      setCategoryName(value);
    } else setQuestion({ ...question, [name]: value });
  };
  useEffect(() => {
    if (state.token === "") {
      history.push("/login");
    }
  }, []);
  const submitQuestion = async (e: any) => {
    e.preventDefault();
    console.log(question);
    postQuestion(question, state.token)
      .then((response) => {
        if (response.data.success === true) {
          history.push("/");
        } else {
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
  };
  const classes = useStyles();
  return (
    <>
      <MyVerticallyCenteredModal
        header="Failed"
        body={modalMessage}
        show={modalShow}
        onHide={() => {
          setModalShow(false);
          history.push("/");
        }}
      />
      <div className="addQues-form">
        <div className="addQues-form-inner">
          <p style={{ color: "rgb(122, 122, 122)", marginLeft: "6vw" }}>
            add a question
          </p>
          <form onSubmit={submitQuestion}>
            <TextField
              label="Question"
              placeholder="Enter question"
              name="question"
              autoComplete="off"
              type="text"
              onChange={inputEvent}
              className={classes.margin}
              required
              value={question.question}
            />
            <div>
              <TextField
                label="Category"
                placeholder="Enter category"
                autoComplete="off"
                type="text"
                name="categoryName"
                onChange={inputEvent}
                className={classes.margin}
                value={categoryName}
              />
              <Fab
                size="small"
                aria-label="add"
                onClick={multipleCategory}
                style={{ marginTop: "2vw" }}
              >
                <AddIcon />
              </Fab>
              <p>{question.category.join(' ') }</p>
            </div>
            <div style={{ marginTop: "3vw", marginLeft: "5vw" }}>
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
          </form>
        </div>
      </div>
    </>
  );
}
