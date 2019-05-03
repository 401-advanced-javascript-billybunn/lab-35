

export const mount = payload => {
  return {
    type: "MOUNT",
    payload: payload
  };
}

export const resetForm = payload => {
  return {
    type: "RESETFORM",
    payload: payload
  }
}

export const changeForm = payload => {
  return {
    type: "CHANGEFORM",
    payload: payload
  }
}

export const userPw = payload =>{
  return {
    type: "USERPW",
    payload: payload
  }
}

export const token = payload => {
  return {
    type: "TOKEN",
    payload: payload
  }
}

export const headers = payload => {
  return {
    type: "HEADERS",
    payload: payload
  }
}

export const headersBody = payload => {
  return {
    type: "HEADERSBODY",
    payload: payload
  }
}

// export const save = payload => {
//   localStorage.setItem('history', JSON.stringify(this.state.history));
// }