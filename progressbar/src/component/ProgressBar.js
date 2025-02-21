import React, { useEffect, useState } from "react";
//Create a progress bar that will start from 0% to 100% on initial load.Add a button that will add another progress bar and it will start from zero as well.Note -> value should increase by 10% and it will stop on 100%.
const ProgressBar = () => {
  const [progressBars, setProgressBars] = useState([{ id: 1, progress: 0 }]);

  // Function to animate a progress bar

  useEffect(() => {
    const interval = setInterval(() => {
      setProgressBars((bars) =>
        bars.map((bar) =>
          bar.progress < 100
            ? { ...bar, progress: Math.min(bar.progress + 10, 100) }
            : bar
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const addProgressBar = () => {
    const newId = progressBars.length + 1;
    setProgressBars([...progressBars, { id: newId, progress: 0 }]);
  };

  return (
    <div style={{ padding: "20px" }}>
      {progressBars.map((bar) => (
        <div
          key={bar.id}
          style={{
            marginBottom: "10px",
            height: "20px",
            width: "100%",
            background: "gray",
            borderRadius: "10px",
          }}
        >
          <div
            style={{
              background: "green",
              height: "20px",
              width: `${bar.progress}%`,
              transition: "width 1s ease-in-out",
              borderRadius: "10px",
            }}
          >
            <span style={{ textAlign: "center" }}>{`${bar.progress}%`}</span>
          </div>
        </div>
      ))}
      <button
        onClick={addProgressBar}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "blue",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Add Progress Bar
      </button>
    </div>
  );
};

export default ProgressBar;
