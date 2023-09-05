import React, { useState } from "react";
import Navbar from "./Navbar";
import Habit from "./Habit";
import CreateHabit from "./CreateHabit";
import { connect } from "react-redux";
import { addHabit } from "../Redux/Actions";
import HabitWeek from "./HabitWeek";
import { getCompleted, getWeeklog } from "..";
import styles from "../Styles/navbar.module.css";

class App extends React.Component {
  componentDidMount() {
    localStorage.setItem('habits',JSON.stringify([]))
    this.props.dispatch(
      addHabit(JSON.parse(localStorage.getItem('habits')))
    );
  }

  render() {
    const { createMode } = this.props;
    const data = JSON.parse(localStorage.getItem('habits'))
    return (
      <div className="App" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <Navbar />
        <div className={styles.main} id="main">
          {data&&data.length>0 ?
            data.map((habit, index) => {
              return this.props.detailView ? (
                <Habit habit={habit} key={index} />
              ) : (
                <HabitWeek habit={habit} key={index} />
              );
            }):<div className={styles.None}>Add Habits to Track</div>}
        </div>
        {createMode && <CreateHabit />}
      </div>
    );
  }
}

function callback(state) {
  return {
    ...state,
  };
}
export default connect(callback)(App);
