let initialState = {
  url: '',
  method: 'get',
  requestBody: '',
  username: '',
  password: '',
  token: '',
  header: {},
  body: {},
  history: {},
  headersVisible: false,
}

export default (state = initialState, action) => {
  let { type, payload = {} } = action;
  switch (type) {

    case "MOUNT":
      return { ...state, history: payload }

    default:
      return state;
  }
}