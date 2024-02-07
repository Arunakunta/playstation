import React from "react";
import { format } from "date-fns";

const Image = ({ selectedDate }) => {
  function redirectToURL(url) {
    window.open(url, "_blank", "noopener,noreferrer");
  }
  return (
    <div className="largeImageContainer">
      <div
        style={{
          backgroundImage: `url(${require("../assets/" +
            selectedDate.imageFilenameFull +
            ".webp")})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          minHeight: "45vh",
          color: "white",
        }}
      >
        <div className="summary pd-left-60 ">
          <b>{selectedDate.title}</b> {selectedDate.summary}
        </div>
        <div className="avail-date pd-left-60 ">
          Available {format(selectedDate.launchDate, "MMMM do, yyyy")}
        </div>
        <div className="pd-left-60 mt-10">
          <button
            className="learn-more-btn"
            onClick={() => redirectToURL(selectedDate.learnMoreLink)}
          >
            Learn More
          </button>
          <button
            className="preorder-btn"
            onClick={() => redirectToURL(selectedDate.purchaseLink)}
          >
            Pre Order Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Image;
