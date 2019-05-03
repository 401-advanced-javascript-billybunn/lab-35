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
      return { ...state, history: payload.history }

    case "RESETFORM":
      console.log('payload for RESETFORM', payload);
      return { ...payload }

    case "CHANGEFORM":
      // let { prop, value } = payload;
      let kv = Object.entries(payload)[0]
      let prop = kv[0];
      let value = kv[1];

      return { ...state, [prop]: value }

    case "USERPW":
      let { username, password } = payload;
      return { ...state, username, password }

    case "TOKEN":
      return { ...state, token: payload }

    case "HEADERS":
      return { ...state, headersVisible: payload }

    case "HEADERSBODY":
      let { header, body } = payload;
      return { ...state, header, body }

    default:
      return state;
  }
}