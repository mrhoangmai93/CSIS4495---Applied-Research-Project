const DOCUMENT = "AUTH_";
//REgister User
export const REGISTER_SUCCEEDED = `${DOCUMENT}REGISTER_SUCCEEDED`;
export const REGISTER_FAILED = `${DOCUMENT}REGISTER_FAILED`;
export const REGISTER_USER = `${DOCUMENT}REGISTER_USER`;

//Load User Data
export const USER_LOADED = `${DOCUMENT}USER_LOADED`;

//Authenticate User
export const AUTH_ERROR = `${DOCUMENT}_ERROR`;

export const register = payload => ({
  type: REGISTER_USER,
  payload
});

export const registerSuccess = payload => ({
  type: REGISTER_SUCCEEDED,
  payload
});

export const registerFailed = payload => ({
  type: REGISTER_FAILED,
  payload
});
/* // LOAD USER
export const loadUser = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  return dispatch({
      type: ACTION.USER_LOADED
    });
}
// Register User
// const requestDog = () => {
//   return { type: ACTION.REQUESTED_DOG }
// };

const registerUserSuccess = (res) => {
  return { type: ACTION.REGISTER_SUCCEEDED, payload: res.data }
};

const registerUserError = () => {
  return { type: ACTION.REGISTER_FAILED }
};

export const registerUser = ({
  name,
  email,
  password,
  role = "user"
}) => {
  return {
    type: ACTION.REGISTER_USER,
    value: {
      name,
      email,
      password,
      role = "user"
    }
  }
}; */

// export const registerUser = ({
//   name,
//   email,
//   password,
//   role = "user"
// }) => async dispatch => {
//   const config = {
//     header: {
//       "Content-type": "application/json"
//     }
//   };

//   const body = JSON.stringify({ name, email, password });
//   try {
//     const res = await axios.post(`/api/users/register/${role}`, body, config);

//     dispatch({
//       type: ACTION.REGISTER_SUCCESS,
//       payload: res.data
//     });
//   } catch (error) {
//     const errors = error.response.data.errors;

//     if (errors) {
//       errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
//     }
//     dispatch({
//       type: ACTION.REGISTER_FAILED
//     });
//   }
//   return dispatch =>
//     dispatch({
//       type: ACTION.REGISTER_USER,
//       value: {
//         name,
//         email,
//         password,
//         role = "user"
//       }
//     } );
// };
