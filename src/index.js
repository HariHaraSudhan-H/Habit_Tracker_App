import React from "react";
import ReactDOM from "react-dom/client";
import { createStore } from "redux";
import { Provider } from "react-redux";

import "./index.css";
import App from "./Components/App";
import { habits } from "./Redux/Reducers";

const store = createStore(habits);

export const getWeeklog= ()=>{
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    const day =['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    const date = new Date();
    const first = date.getDate()-7;
    const firstDate = new Date(date.setDate(first));
    let newWeek = [];
    for(let i=0;i<7;i++){
      const newDateNumber = date.getDate()+1;
      const newDate = new Date(date.setDate(newDateNumber));
      const newDay = {
        id:i,
        day: day[newDate.getDay()],
        date: newDate.getDate(),
        month: month[newDate.getMonth()],
        completed: 'No action',
        style: {backgroundColor : 'rgb(17, 129, 204)'},
        timestamp: newDate,
        actionMode:false
      }
      newWeek.push(newDay);
    }

    return newWeek;
}

export const getCompleted = (weeklog)=>{
  let count = 0;
  weeklog.map((day)=>{
    if(day.completed==='Completed'){
      count++;
    }
  })
  return count;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
