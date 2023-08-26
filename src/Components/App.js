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
    this.props.dispatch(
      addHabit([
        {
          id: 1,
          title: "Running",
          weeklog: getWeeklog(),
          daysCompleted: 0,
        },
      ])
    );
  }
  handleDelete = () => {};
  render() {
    const { data, createMode } = this.props;
    console.log("Updated State", data);
    return (
      <div className="App" style={{display:"flex",flexDirection:"column",justifyContent:"center"}}>
        <Navbar />
        <div className={styles.main} id="main">
          {data &&
            data.map((habit, index) => {
              return this.props.detailView ? (
                <Habit habit={habit} key={index} />
              ) : (
                <HabitWeek habit={habit} key={index} />
              );
            })}
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