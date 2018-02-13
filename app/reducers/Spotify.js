
const initialState = {
 token:null
};

const rootReducer = function(state=initialState,action) {  
	// console.log("rootReducer>>>");
	// console.log(state);
	// console.log(action);
 //  console.log("<<<rootReducer");
   switch (action.type) {
    case "SET_TOKEN":
      state = Object.assign({}, state, {token:action.token})
      return state;
    case "SET_RESULTS":
      state = Object.assign({}, state, {results: action.results})
      //console.log(state);
      return state;
     case "SET_AJAX_ERROR":
        state = Object.assign({}, state, {error: action.error});
        //console.log(state)
      return state;
    case "SET_ARTIST":
        state = Object.assign({}, state, {selected_artist: action.artist});
        //console.log(state)
      return state;
    case "SET_SEARCH_CATEGORY":
        state = Object.assign({}, state, {category: action.category});
        //console.log(state)
      return state;
    default:
      return state;  
   }
}

export default rootReducer;