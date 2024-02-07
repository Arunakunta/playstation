import React from "react";
import { format } from "date-fns"; // Import the format function from date-fns

const Day = ({
  day,
  daysInMonth,
  row,
  date,
  handleDateClick,
  getFormattedDate,
  getBackgroundStyle,
  data,
}) => {
  const currentDate = new Date(date.getFullYear(), date.getMonth(), day);
  const formattedDate = format(currentDate, "yyyy-MM-dd"); // Format the date using date-fns
  const imageData = data.find(
    (item) => item.launchDate.split("T")[0] === formattedDate
  );

  const handleClick = () => {
    handleDateClick(day, row);
  };

  return (
    <div
      className={` ${day > 0 && day <= daysInMonth ? "day" : "empty-cell"}`}
      onClick={handleClick}
      style={getBackgroundStyle(day)}
    >
      <div className={imageData ? "circle" : ""}>
        {day > 0 && day <= daysInMonth ? day : ""}
      </div>
    </div>
  );
};

export default Day;
