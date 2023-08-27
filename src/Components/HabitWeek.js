import React, { useState } from "react";
import styles from "../Styles/Habit.module.css";
import { connect } from "react-redux";
import { updateHabits } from "../Redux/Actions";
import { getCompleted } from "..";
import Day from "./Day";

const HabitWeek = (props) => {
  const { habit } = props;
  const [action, setAction] = useState(false);
  const daystyles = [
    { backgroundColor: "rgb(17, 129, 204)" },
    { backgroundColor: "rgb(32, 196, 106)" },
    { backgroundColor: "rgb(243, 114, 82)" },
    {backgroundColor: "purple"}
  ];

  const todayStyles = {
    border: '2px solid white'
  }
  const handleHabitAction = (e, action, dayId, dayDate, dayMonth) => {
    e.preventDefault();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();

    // checks for date after today if it appears
    if (dayDate > todayDate || todayMonth !== dayMonth) {
      alert("Cannot update for after today");
      return;
    }
    // Chooses style as per action
    let style = {};
    if (action === "No action") {
      style = daystyles[0];
    } else if (action === "Completed") {
      style = daystyles[1];
    } else {
      style = daystyles[2];
    }

    const newHabits = props.data;
    newHabits.map((newhabit) => {
      if (newhabit.id === habit.id) {
        newhabit.weeklog[dayId].completed = action;
        newhabit.weeklog[dayId].style = style;
        newhabit.weeklog[dayId].actionMode = false;
        newhabit.daysCompleted = getCompleted(newhabit.weeklog);
      }
    });
    setAction(false);
    props.dispatch(updateHabits(newHabits));
    e.stopPropagation();
  };

  // Handle click of Day container click
  const handleDayClick = (habit, index) => {
    // console.log("Clicked");
    if(action){
      alert('Complete Previous Action...');
      return
    }
    setAction(true);
    const newHabits = props.data;
    newHabits.map((newhabit) => {
      if (newhabit.id === habit.id) {
        newhabit.weeklog[index].actionMode = true;
        newhabit.weeklog[index].style = daystyles[3];
      }
    });
    props.dispatch(updateHabits(newHabits));
  };
  
  return (
    <div className={`${styles.habitContainer} ${styles.habitWeekContainer}`}>
      <h3 className={styles.name}>{habit.title}</h3>
      <div className={styles.count} style={{ color: "yellowgreen" }}>
        {habit.daysCompleted}/{habit.weeklog.length} days
      </div>
      <div className={`${styles.weekContainer}`}>
        {habit.weeklog.map((day, index) => {
          return (
            <div className={styles.dayBlock} key={index}>
              <div className={styles.day}>{day.day}</div>
              <div
                className={styles.dayContainer}
                style={index===6?{...todayStyles,...day.style}:{...day.style}}
                onClick={() => {
                  handleDayClick(habit, index);
                }}
              >
                <span className={styles.date}>{day.date}</span>
                <span className={styles.date}>{day.month}</span>
              </div>
              {day.actionMode && (
                <Day
                  day={day}
                  index={index}
                  habit={habit}
                  handleHabitAction={handleHabitAction}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(HabitWeek);
