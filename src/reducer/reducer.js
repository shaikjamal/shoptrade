/* eslint-disable no-param-reassign */
/* eslint-disable default-case */

import produce from "immer";
import * as types from "../constants/actionTypes";


export const initialState = {
  allProducts: "",
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.ALL_PRODUCTS:
        console.log(action,"A");
        draft.allProducts = action.allProducts;
        break;
    }
  });

export default reducer;
