const DOCUMENT = "FOOD_";

//Load Food
export const LOAD_ALL = `${DOCUMENT}LOAD_ALL`;
export const LOADED_ALL = `${DOCUMENT}LOADED_ALL`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;
//create Food
export const CREATE = `${DOCUMENT}CREATE`;
export const CREATED = `${DOCUMENT}CREATED`;
export const CREATE_ERROR = `${DOCUMENT}CREATE_ERROR`;
//update Food
export const UPDATE = `${DOCUMENT}UPDATE`;
export const UPDATED = `${DOCUMENT}UPDATED`;
export const UPDATE_ERROR = `${DOCUMENT}UPDATE_ERROR`;
//Load user


// SET SEARCH TERM
export const SEARCH_FOOD = `${DOCUMENT}SEARCH_FOOD`;
export const SEARCH_FOOD_SUCCESS = `${DOCUMENT}SEARCH_FOOD_SUCCESS`;

export const loadAllFoods = () => ({
  type: LOAD_ALL
});
export const searchFoods = (term) => ({
  type: SEARCH_FOOD,
  payload: term
});
export const searchFoodSuccess = (payload) => ({
  type: SEARCH_FOOD_SUCCESS,
  payload
});
