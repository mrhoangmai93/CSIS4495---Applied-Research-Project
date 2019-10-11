const DOCUMENT = "FOOD_";

//Load Food
export const LOAD_ALL = `${DOCUMENT}LOAD_ALL`;
export const LOADED_ALL = `${DOCUMENT}LOADED_ALL`;
export const LOAD_ERROR = `${DOCUMENT}LOAD_ERROR`;

//Load user

export const loadAllFoods = () => ({
  type: LOAD_ALL
});
