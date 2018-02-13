export const setToken = token => {
  return {
    type: 'SET_TOKEN',
    "token":token
  }
}

export const setResults = results => {
  return {
    type: 'SET_RESULTS',
    "results":results
  }
}