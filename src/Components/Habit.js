import React from "react";
import styles from "../Styles/Habit.module.css";
import { connect } from "react-redux";
import { updateHabits } from "../Redux/Actions";

const Habit = (props) => {
  const { habit } = props;
  const handleDelete = () => {
    const newHabits = props.data.filter((oldhabit)=>oldhabit.id!==habit.id);
    props.dispatch(updateHabits(newHabits))
  };
  return (
    <div className={styles.habitContainer}>
      <div className={styles.mainContainer}>
        <img
          src="https://cdn.icon-icons.com/icons2/3767/PNG/512/hash_hashtag_sharp_icon_231461.png"
          className={styles.icon}
        />
        <div className={styles.nameCountContainer}>
          <h3 className={styles.name}>{habit.title}</h3>
          <div className={styles.count}>{habit.daysCompleted}/{habit.weeklog.length} days</div>
        </div>
      </div>
      <button className={styles.delete} onClick={handleDelete}>
        <img src="https://cdn.icon-icons.com/icons2/1808/PNG/512/trash-can_115312.png" />
      </button>
    </div>
  );
};

const callback = (state) => {
  return {
    ...state,
  };
};
export default connect(callback)(Habit);
