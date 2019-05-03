let initialState ={};

export default (state = initialState, action) => {
  let { type, payload = {} } = action;
  // let { id, model, record, records } = payload;


//   switch (type) {
//       default:
//         return state;

//         case "GET":
//             return { ...state, [model]: data };
    
//         case "POST":
//             return {
//             ...state,
//             [model]: state[model] ? [...state[model], data] : [data]
//             };
    
//         case "DELETE":
//             let deleteList = state[model].filter(r => r._id !== id);
//             return { ...state, [model]: deleteList };
    
//         case "PUT":
//             let putList = state[model].map((entry, idx) =>
//             idx === id ? data : entry
//             );
//             return { ...state, [model]: putList };
    
//         case "PATCH":
//             let currentRecord = state[model].filter(r => r.id !== id);
//             let updatedRecord = Object.assign(currentRecord, data);
    
//             let patchList = state[model].map(r => (r.id === id ? updatedRecord : r));
//             return { ...state, [model]: patchList };
  }
}
