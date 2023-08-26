import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./Components/App";
import { createStore } from "redux";
import { habits } from "./Redux/Reducers";
import { Provider } from "react-redux";

const store = createStore(habits);
console.log(store);

export const getWeeklog= ()=>{
  const month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sept','Oct','Nov','Dec'];
    const day =['Sun','Mon','Tue','Wed','Thur','Fri','Sat'];
    const date = new Date();
    const first = date.getDate()-6;
    const firstDate = new Date(date.setDate(first));
    let newWeek = [];
    for(let i=0;i<7;i++){
      const newDate = new Date(date.setDate(firstDate.getDate()+i));
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
export const weeklog = [
  { id:0,day: "Sunday", date: "20/08/2023" },
  { id:1,day: "Sunday", date: "20/08/2023" },
  { id:2,day: "Sunday", date: "20/08/2023" },
  { id:3,day: "Sunday", date: "20/08/2023" },
  { id:4,day: "Sunday", date: "20/08/2023" },
  { id:5,day: "Sunday", date: "20/08/2023" },
  { id:6,day: "Sunday", date: "20/08/2023" },
];
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
