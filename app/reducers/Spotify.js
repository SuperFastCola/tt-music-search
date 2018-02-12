
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
      state = {token:action.token,auth:state.auth};
      return state;
    default:
      return state;  
   }
}

export default rootReducer;