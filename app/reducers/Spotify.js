
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
      let next_url = null;
      let prev_url = null;
     if(String(state.category).match(/artists|albums/i)){
       if(typeof action.results[state.category] != "undefined"){
          
         next_url = action.results[state.category].next;
         if(typeof action.results[state.category].previous != "undefined"){
           prev_url = action.results[state.category].previous;
         }
       }
       else{
         next_url = action.results.next;
         if(typeof action.results.previous != "undefined"){
           prev_url = action.results.previous;
         } 
       }
     }
     else{
       next_url = action.results.albums.next;
       if(typeof action.results.albums.previous != "undefined"){
         prev_url = action.results.albums.previous;
       }
     } 
      
      state = Object.assign({}, state, {results: action.results, prev_url: prev_url, next_url: next_url })
      return state;
    case "SET_TRACKS":
      state = Object.assign({}, state, {selected_tracks: action.tracks})
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