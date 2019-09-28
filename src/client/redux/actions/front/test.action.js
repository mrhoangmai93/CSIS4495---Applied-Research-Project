

const DOCUMENT = 'TEST_';


export const GET_TEST = Symbol(`${DOCUMENT}GET_TEST`);

export function getTest() {
    return dispatch => dispatch({
        type: GET_TEST,
    });
}