import React, { useState, useEffect } from "react";
import { format, addMonths, subMonths, getDay, getDaysInMonth } from "date-fns";
import Header from "./Header";
import Day from "./Day";
import Image from "./Image";
import "./Calendar.css";

const Calendar = ({ data }) => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getFormattedDate = (date) => {
    return format(date, "yyyy-MM-dd");
  };

  const getBackgroundStyle = (day) => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    const formattedDate = getFormattedDate(currentDate);
    const imageData = data.find((item) => {
      const month = item.launchDate.split("T")[0].split("-")[1];
      if (month > 12) {
        const date = new Date();
        item.launchDate = getFormattedDate(date);
      }
      return item.launchDate.split("T")[0] === formattedDate;
    });

    return imageData
      ? {
          backgroundImage: `url(${require("../assets/" +
            imageData.imageFilenameThumb +
            ".webp")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }
      : {};
  };

  const handlePrevMonth = () => {
    const newDate = subMonths(date, 1);
    setSelectedDate(null);
    setDate(newDate);
    updateURL(newDate);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(date, 1);
    setSelectedDate(null);
    setDate(newDate);
    updateURL(newDate);
  };

  const handleDateClick = (day, row) => {
    const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
    const formattedDate = getFormattedDate(currentDate);
    const imageData = data.find(
      (item) => item.launchDate.split("T")[0] === formattedDate
    );

    if (imageData) {
      setSelectedDate({ ...imageData, row: row });
    } else {
      setSelectedDate(null);
    }
  };

  const updateURL = (newDate) => {
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    window.history.pushState({}, "", `/${year}/${month}`);
  };

  useEffect(() => {
    const currentDate = new Date();
    updateURL(currentDate);
  }, []);

  const daysInMonth = getDaysInMonth(date);
  const firstDayOfMonth = getDay(
    new Date(date.getFullYear(), date.getMonth(), 1)
  );
  const totalDaysDisplayed = daysInMonth + firstDayOfMonth;
  const numberOfRows = Math.ceil(totalDaysDisplayed / 7);

  return (
    <div>
      <div className="calendar">
        <Header
          date={date}
          handlePrevMonth={handlePrevMonth}
          handleNextMonth={handleNextMonth}
        />
        <div className="line-separator"></div>
        <div className="days">
          <div className="day-row">
            {[
              "Sunday",
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ].map((day) => (
              <div key={day} className="day-name">
                {day}
              </div>
            ))}
          </div>
          {Array.from({ length: numberOfRows }, (_, row) => {
            return (
              <>
                <div className="day-row">
                  {Array.from({ length: 7 }, (_, col) => {
                    const day = row * 7 + col - firstDayOfMonth + 1;
                    if (day > 0 && day <= daysInMonth) {
                      return (
                        <Day
                          // key={day}
                          day={day}
                          daysInMonth={daysInMonth}
                          row={row}
                          date={date}
                          handleDateClick={handleDateClick}
                          getFormattedDate={getFormattedDate}
                          getBackgroundStyle={getBackgroundStyle}
                          data={data}
                        />
                      );
                    } else {
                      return <div key={col} className="empty-cell"></div>;
                    }
                  })}
                </div>
                {selectedDate && selectedDate?.row === row && (
                  <Image selectedDate={selectedDate} />
                )}
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
