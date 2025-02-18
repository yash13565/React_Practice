import { useEffect, useState } from "react";
import Button from "./components/Button";
import "./App.css";

function Timer() {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (!isStarted) return;

    const interval = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime;

        if (seconds < 59) {
          seconds += 1;
        } else if (minutes < 59) {
          minutes += 1;
          seconds = 0;
        } else {
          hours += 1;
          minutes = 0;
          seconds = 0;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isStarted]);

  const formatTime = (unit) => (unit < 10 ? `0${unit}` : unit);

  return (
    <div className="timerContainer">
      <h2 style={{ color: "lightsalmon" }}>React Timer App</h2>
      <section className="timeFormatContainer">
        <span className="timer">{`${formatTime(time.hours)} : ${formatTime(
          time.minutes
        )} : ${formatTime(time.seconds)}`}</span>
      </section>
      <div className="buttonContainer">
        <Button text={"Start"} onClick={() => setIsStarted(true)} />
        <Button text={"Pause"} onClick={() => setIsStarted(false)} />
        <Button
          text={"Reset"}
          onClick={() => {
            setIsStarted(false);
            setTime({ hours: 0, minutes: 0, seconds: 0 });
          }}
        />
      </div>
    </div>
  );
}

export default Timer;
