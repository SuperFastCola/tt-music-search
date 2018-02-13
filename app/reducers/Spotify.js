
const initialState = {
 token:null
};

const rootReducer = function(state=initialState,action) {  
	console.log("rootReducer>>>");
	console.log(state);
	console.log(action);
  console.log("<<<rootReducer");
   switch (action.type) {
    case "SET_TOKEN":
      state = Object.assign({}, state, {
                token:action.token
              })
      return state;
    case "SET_RESULTS":
      state = Object.assign({}, state, {
                results: action.results
              })
      console.log(state);
    return state;
    default:
      return state;  
   }
}

export default rootReducer;