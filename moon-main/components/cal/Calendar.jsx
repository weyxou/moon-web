'use client';
import React, { useState } from 'react';
import s from './Calendar.module.scss';

const Calendar = () => {
    const [date, setDate] = useState(new Date());
  
    const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  
    const generateCalendar = () => {
      const year = date.getFullYear();
      const month = date.getMonth();
  
      const firstDayOfMonth = new Date(year, month, 1);
      const startingDay = firstDayOfMonth.getDay();
  
      const totalDays = daysInMonth(month, year);
      const weeks = [];
  
      let day = 1;
  
      for (let i = 0; i < 6; i++) {
        const week = [];
  
        for (let j = 0; j < 7; j++) {
          if ((i === 0 && j < startingDay) || day > totalDays) {
            week.push(<td key={j}></td>);
          } else {
            const today = new Date();
            if (today.getDate() === day && today.getMonth() === month && today.getFullYear() === year) {
              week.push(
                <td key={j} className={s.day} style={{ backgroundColor: '#6900b5' }}>
                  {day}
                </td>
              );
            } else {
              week.push(
                <td key={j} className={s.day} onClick={() => handleClick(day)}>
                  {day}
                </td>
              );
            }
            day++;
          }
        }
  
        weeks.push(<tr key={i}>{week}</tr>);
      }
  
      return weeks;
    };
  
    const handleClick = (selectedDay) => {
      console.log(`You clicked on day ${selectedDay}`);
    };
  
    const nextMonth = () => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() + 1);
      setDate(newDate);
    };
  
    const prevMonth = () => {
      const newDate = new Date(date);
      newDate.setMonth(date.getMonth() - 1);
      setDate(newDate);
    };
  
    return (
      <div className={s.calendar}>
        <h2>Calendar</h2>
        <div className={s.controls}>
          <button onClick={prevMonth}>&lt;</button>
          <span>{date.toLocaleString('default', { month: 'long', year: 'numeric' })}</span>
          <button onClick={nextMonth}>&gt;</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>S</th>
              <th>M</th>
              <th>T</th>
              <th>W</th>
              <th>T</th>
              <th>F</th>
              <th>S</th>
            </tr>
          </thead>
          <tbody>{generateCalendar()}</tbody>
        </table>
      </div>
    );
  };
  

export default Calendar;
