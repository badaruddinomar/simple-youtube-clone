import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  btnCategories: "New",
};
export const customReducer = createReducer(initialState, {
  typeBtnCategories: (state, action) => {
    state.btnCategories = action.payload;
  },
});
