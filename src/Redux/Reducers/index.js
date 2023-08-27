import {
  ACTION_TOGGLE,
  ADD_HABITS,
  ADD_TO_HABITS,
  CREATE_HABIT,
  DELETE_HABIT,
  HABIT_ACTION,
  TOGGLE_VIEW,
  UPDATE_HABITS,
} from "../Actions";

const InitialState = {
  data: [],
  createMode: false,
  detailView: true,
  actionMode: false
};

export function habits(state = InitialState, action) {
  switch (action.type) {
    case ADD_HABITS:
      return {
        ...state,
        data: action.habit,
      };
    case DELETE_HABIT:
      return {
        ...state,
        data: action.habit,
      };
    case CREATE_HABIT:
      return {
        ...state,
        createMode: action.createMode,
      };
    case UPDATE_HABITS:
      return {
        ...state,
        data: action.newHabits,
      };
    case TOGGLE_VIEW:
      return {
        ...state,
        detailView: !state.detailView,
      };
    default:
      break;
  }
}
