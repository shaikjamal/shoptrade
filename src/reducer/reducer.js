/* eslint-disable no-param-reassign */
/* eslint-disable default-case */

import produce from "immer";
import * as types from "../constants/actionTypes";


export const initialState = {
  allProducts: "",
  cartProducts:[]
};

const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.ALL_PRODUCTS:
        draft.allProducts = action.allProducts;
        break;

      case types.ADD_PRODUCTS_TO_CART:
        draft.cartProducts = [...state.cartProducts,...action.product];
        break;
    }
  });

export default reducer;
