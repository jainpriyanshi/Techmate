import { GET_FORUM, GET_CATEGORY,GET_POST, ADD_COMMENT,LIKE, ADD_POST, DELETE_COMMENT, DELETE_POST, REPLY_COMMENT, LIKE_COMMENT } from "../actions/types";

const initialState = {
    loading:true,
    forum:[],
    post: null,
};

export default function(state = initialState, action) {
    const{type, payload} = action;
    switch (type) {

    case GET_FORUM:
      return {
          ...state,
          forum:payload,
          loading:false,
      }

      case ADD_POST:
        return{
          ...state,
          forum: payload,
          loading: false
        }

      case GET_POST:
        return{
          ...state,
          post:payload,
          loading:false,
        }

      case GET_CATEGORY:
        return{
          ...state,
          forum: payload,
          loading:false
        }

        case LIKE:
          return{
            ...state,
            post:payload,
            loading:false
          }

      case DELETE_POST:
        return{
          ...state,
          post:null,
          forum:payload,
          loading:false,
        }

        case ADD_COMMENT:
          return{
            ...state,
            post:payload,
            loading:false
          }

          case DELETE_COMMENT:
            return{
              ...state,
              post: payload,
              loading:false
            }

            case REPLY_COMMENT:
              return{
                ...state,
                post: payload,
                loading:false
              }

            case LIKE_COMMENT:
              return{
                ...state,
                post:payload,
                loading:false
              }
  
    default:
      return state;
  }

  
}