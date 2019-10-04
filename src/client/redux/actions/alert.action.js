const DOCUMENT = "ALERT_";

//Alert
export const ALERT_SET = Symbol(`${DOCUMENT}SET`);
export const ALERT_SET_DONE = Symbol(`${DOCUMENT}SET_DONE`);

export const ALERT_REMOVE = Symbol(`${DOCUMENT}REMOVE`);
export const ALERT_REMOVED = Symbol(`${DOCUMENT}REMOVED`);

export const setAlert = payload => ({
  type: ALERT_SET,
  payload
});

// export const alertRemove = payload => ({
//   type: ALERT_REMOVE,
//   payload
// });

// export const setAlert = (msg, alertType, timeout = 5000) => dispatch => {
//   const id = uuid.v4();
//   dispatch({
//     type: ALERT_SET,
//     payload: {
//       msg,
//       alertType,
//       id
//     }
//   });

//   setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
// };
