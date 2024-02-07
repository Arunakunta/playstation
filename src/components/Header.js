import React from "react";

const Header = ({ date, handlePrevMonth, handleNextMonth }) => (
  <div className="header">
    <button onClick={handlePrevMonth}>&lt;</button>
    <span>
      {date.toLocaleString("default", { month: "long", year: "numeric" })}
    </span>
    <button onClick={handleNextMonth}>&gt;</button>
  </div>
);

export default Header;
