
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
    
    //get the next or previous url property for paging in curretn category
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
      
      //combine the results into an item array on the results property in redux store
      var filtered = null;
      if(typeof action.results.artists != "undefined"){
          filtered = action.results.artists;
      }
      else if(typeof action.results.albums != "undefined"){
        filtered = action.results.albums;
      }
      else{
        filtered = action.results; 
      }
      state = Object.assign({}, state, {results: filtered, prev_url: prev_url, next_url: next_url })
      return state;
    
    case "ADD_ALBUM_DETAILS":
      var new_results = Object.assign({}, state.results, {items: action.results.albums})
      state = Object.assign({}, state, {results: new_results})
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