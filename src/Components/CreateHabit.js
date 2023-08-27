import React, { useState } from "react";
import { connect } from "react-redux";

import styles from "../Styles/CreateHabit.module.css";
import nameStyles from "../Styles/Habit.module.css";
import navStyles from "../Styles/navbar.module.css";
import { addHabit, createHabit } from "../Redux/Actions";
import { getCompleted, getWeeklog } from "..";

const CreateHabit = (props) => {
  const [newHabit, setNewHabit] = useState("");

  // Handles submission of create form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newHabit.length == 0) {
      alert("Enter some text for Habit Creation");
      return;
    }
    props.dispatch(createHabit(false));
    const newHabitData = {
      id: props.data.length + 1,
      title: newHabit,
      weeklog: getWeeklog(),
      daysCompleted: 0,
    };
    const newHabits = [newHabitData, ...props.data];
    props.dispatch(addHabit(newHabits));
    document.getElementById("main").style.filter = "";
  };

  // Handle closing of form
  const handleFormClose = (e) => {
    e.preventDefault();
    console.log("close");
    props.dispatch(createHabit(false));
    document.getElementById("main").style.filter = "";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      
      <h3 className={nameStyles.name}>New Habit</h3>
      <div style={{ width: "80%" }}>
        <label htmlFor="HabitTitle">Name </label>
        <input
          type="text"
          id="HabitTitle"
          onChange={(e) => {
            setNewHabit(e.target.value);
          }}
        />
      </div>
      <div className={navStyles.btngrp}>
        <button
          type="submit"
          className={navStyles.addButton}
          style={{ position: "absolute", left: "80%" }}
        >
          Save
        </button>
      </div>
      <button
        className={`${nameStyles.delete} ${styles.close}`}
        onClick={handleFormClose}
      >
        <img src="https://img.icons8.com/?size=512&id=fYgQxDaH069W&format=png" />
      </button>
    </form>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};

export default connect(callback)(CreateHabit);
