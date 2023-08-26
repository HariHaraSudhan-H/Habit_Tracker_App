import React, { useState } from "react";
import Navbar from "./Navbar";
import Habit from "./Habit";
import CreateHabit from "./CreateHabit";
import { connect } from "react-redux";
import { addHabit } from "../Redux/Actions";
import HabitWeek from "./HabitWeek";
import { getCompleted, getWeeklog, weeklog } from "..";
import styles from "../Styles/navbar.module.css";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(
      addHabit([
        {
          id: 1,
          title: "Running",
          // weeklog: [{ id:0,day: "Sun", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:1,day: "Mon", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:2,day: "Tues", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:3,day: "Wed", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:4,day: "Thur", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:5,day: "Fri", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },
          // { id:6,day: "Sat", date: firstDate+month[date.getMonth()], completed: "No action",style:{backgroundColor : 'rgb(17, 129, 204)'} },],
          // completed: "No action",
          weeklog: getWeeklog(),
          daysCompleted: getCompleted(weeklog),
        },
      ])
    );
  }
  handleDelete = () => {};
  render() {
    // const style = {
    //   // filter: blur('4px')
    // }
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
