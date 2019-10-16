const DOCUMENT = "AUTH_";
//REgister User
export const REGISTER_SUCCEEDED = `${DOCUMENT}REGISTER_SUCCEEDED`;
export const REGISTER_FAILED = `${DOCUMENT}REGISTER_FAILED`;
export const REGISTER_USER = `${DOCUMENT}REGISTER_USER`;
//Login
export const LOGIN_USER = `${DOCUMENT}LOGIN_USER`;
export const LOGIN_FAILED = `${DOCUMENT}LOGIN_FAILED`;
export const LOGIN_SUCCEEDED = `${DOCUMENT}LOGIN_SUCCEEDED`;

// Logout
export const LOGOUT_USER = `${DOCUMENT}LOGOUT_USER`;
export const LOGOUT_USER_DONE = `${DOCUMENT}LOGOUT_USER_DONE`;

//Load User Data
export const LOAD_USER = `${DOCUMENT}LOAD_USER`;
export const USER_LOADED = `${DOCUMENT}USER_LOADED`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;

//change password
export const CHANGE_PASSWORD = `${DOCUMENT}CHANGE_PASSWORD`;
export const CHANGED_PASSWORD = `${DOCUMENT}CHANGED_PASSWORD`;
export const CHANGE_PASSWORD_ERROR = `${DOCUMENT}CHANGE_PASSWORD_ERROR`;
//Authenticate User
export const AUTH_ERROR = `${DOCUMENT}_ERROR`;

//Load user

export const loadUser = () => ({
  type: LOAD_USER
});

//Register
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
//Login
export const login = payload => ({
  type: LOGIN_USER,
  payload
});
export const loginSuccess = payload => ({
  type: LOGIN_SUCCEEDED,
  payload
});
export const loginFailed = payload => ({
  type: LOGIN_FAILED,
  payload
});

//Login
export const logout = () => ({
  type: LOGOUT_USER
});

export const changePassword = payload => ({
  type: CHANGE_PASSWORD,
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
