import React from "react";
import styles from "../Styles/navbar.module.css";
import { connect } from "react-redux";
import { createHabit, toggleView } from "../Redux/Actions";

const Navbar = (props) => {
  const handleToggleView = ()=>{
    props.dispatch(toggleView())
  }
  const handleAddHabit = () => {
    document.getElementById('main').style.filter = 'blur(4px)';
    props.dispatch(createHabit(true));
  };
  return (
    <div className={styles.nav}>
      <h1 className={styles.logo}>Habits</h1>
      <div className={styles.btngrp}>
        <button className={styles.toggleButton} onClick={handleToggleView} disabled={props.createMode}>{props.detailView?'Week View':'Detail View'}</button>
        <button className={styles.addButton} onClick={handleAddHabit} disabled={props.createMode}>
          + Add Habit
        </button>
      </div>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Navbar);
