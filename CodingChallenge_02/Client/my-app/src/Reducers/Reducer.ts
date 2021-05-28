const Reducer = (state: any, action: any) => {
  switch (action.type) {
    case "SET_QUESTIONS":
      return { ...state, questions: action.questions };
    case "SET_ANSWERS":
      return { ...state, answers: action.answers };
    case 'SET_SELECTED_QUESTION':
        return {...state,selectedQuestions:action.selectedQuestions}
    case 'USER_VOTED':
        return {...state,vote:state.vote+1}
    case "LOGIN_USER_ADD_TOKEN":
      return { ...state, token: action.token };
    case "LOGOUT_USER_REMOVE_TOKEN":
      return { ...state, token: "" };
  }
};

export default Reducer;
