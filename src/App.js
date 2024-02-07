import React, { useState, useEffect } from "react";
import Calendar from "./components/Calendar";

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://amock.io/api/calendar/events", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return (
    <div>
      <Calendar data={data} />
    </div>
  );
};

export default App;
