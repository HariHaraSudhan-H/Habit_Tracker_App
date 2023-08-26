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
  const [newStyle, setNewStyle] = useState({
    backgroundColor: "rgb(17, 129, 204)",
  });
  const handleHabitAction = (e, action, dayId, dayDate, dayMonth) => {
    e.preventDefault();
    const today = new Date();
    const todayDate = today.getDate();
    const todayMonth = today.getMonth();
    if (dayDate > todayDate || todayMonth !== dayMonth) {
      alert("Cannot update for after today");
      return;
    }
    let style = {};
    if (action === "No action") {
      style = daystyles[0];
    } else if (action === "Completed") {
      style = daystyles[1];
    } else {
      style = daystyles[2];
    }
    // setNewStyle(style);
    const newHabits = props.data;
    newHabits.map((newhabit) => {
      if (newhabit.id === habit.id) {
        newhabit.weeklog[dayId].completed = action;
        newhabit.weeklog[dayId].style = style;
        newhabit.weeklog[dayId].actionMode = false;
        console.log(newhabit.weeklog[dayId].actionMode === false);
        newhabit.daysCompleted = getCompleted(newhabit.weeklog);
      }
    });
    setAction(false);
    props.dispatch(updateHabits(newHabits));
    e.stopPropagation();
  };

  const handleDayClick = (habit, index) => {
    console.log("Clicked");
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
                style={day.style}
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
