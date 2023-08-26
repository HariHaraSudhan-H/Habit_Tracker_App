import React from "react";
import windowStyles from "../Styles/CreateHabit.module.css";
import styles from "../Styles/Habit.module.css";
const Day = (props) => {
  const { day, index,habit, handleHabitAction } = props;
  return (
    <div className={`${styles.actionContainer} `}>
      <div style={{fontWeight:700}}>
        Select action for {habit.title} on {day.date} {day.month}
      </div>
      <div className={styles.btngrp}>
        <button
          className={styles.actionIcon}
          onClick={(e) => {
            handleHabitAction(
              e,
              "Completed",
              index,
              day.date,
              day.timestamp.getMonth()
            );
          }}
          title="Mark Done"
        >
          <img
            src="https://img.icons8.com/?size=512&id=21741&format=png"
            className={styles.icon}
            // style={{ margin: "0.25rem" }}
            alt="done"
          />
        </button>
        <button
          className={styles.actionIcon}
          onClick={(e) => {
            handleHabitAction(
              e,
              "Not done",
              index,
              day.date,
              day.timestamp.getMonth()
            );
          }}
          title="Mark not done"
        >
          <img
            src="https://img.icons8.com/?size=512&id=OZuepOQd0omj&format=png"
            className={styles.icon}
            // style={{ margin: "0.25rem" }}
            alt="Not done"
          />
        </button>
        <button
          className={styles.actionIcon}
          onClick={(e) => {
            handleHabitAction(
              e,
              "No action",
              index,
              day.date,
              day.timestamp.getMonth()
            );
          }}
          title="No action"
        >
          <img
            src="https://img.icons8.com/?size=512&id=LHmuCWgibLck&format=png"
            className={styles.icon}
            // style={{ margin: "0.25rem" }}
            alt="No action"
          />
        </button>
      </div>
    </div>
  );
};

export default Day;
