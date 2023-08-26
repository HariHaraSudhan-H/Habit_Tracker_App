export const ADD_HABITS = "ADD_HABITS";
export const DELETE_HABIT = "DELETE_HABIT";
export const CREATE_HABIT = "CREATE_HABIT";
export const UPDATE_HABITS = "ADD_TO_HABITS";
export const TOGGLE_VIEW = "TOGGLE_VIEW";
// export const HABIT_ACTION = 'HABIT_ACTION';

export const addHabit = (habit) => {
  return {
    type: ADD_HABITS,
    habit,
  };
};

export const deleteHabit = (habit) => {
  return {
    type: DELETE_HABIT,
    habit,
  };
};

export const createHabit = (createMode) => {
  return {
    type: CREATE_HABIT,
    createMode,
  };
};

export const updateHabits = (newHabits) => {
  return {
    type: UPDATE_HABITS,
    newHabits,
  };
};
export const toggleView = () => {
  return {
    type: TOGGLE_VIEW,
  };
};

// export const habitAction = (new) => {
//   return {
//     type: HABIT_ACTION,
//     action
//   };
// };