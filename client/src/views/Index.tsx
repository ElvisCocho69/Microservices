import React, { useEffect, useState, CSSProperties } from "react";

interface TimeLeft {
  semanas: number;
  dias: number;
  horas: number;
  minutos: number;
  segundos: number;
}

const Inicio: React.FC = () => {
  const savedTargetDate = localStorage.getItem("targetDate");
  const initialTargetDate = savedTargetDate
    ? parseInt(savedTargetDate)
    : new Date().getTime() + 4 * 7 * 24 * 60 * 60 * 1000;

  const [targetDate, setTargetDate] = useState<number>(initialTargetDate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  function calculateTimeLeft(): TimeLeft {
    const now = new Date().getTime();
    const difference = targetDate - now;

    let time: TimeLeft = {
      semanas: 0,
      dias: 0,
      horas: 0,
      minutos: 0,
      segundos: 0,
    };

    if (difference > 0) {
      time = {
        semanas: Math.floor(difference / (1000 * 60 * 60 * 24 * 7)),
        dias: Math.floor((difference / (1000 * 60 * 60 * 24)) % 7),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / (1000 * 60)) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return time;
  }

  useEffect(() => {
    localStorage.setItem("targetDate", targetDate.toString());

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "70vh",
    backgroundColor: "#ECEFF4",
    fontFamily: "'Barlow', sans-serif",
  };

  const titleStyle: CSSProperties = {
    fontSize: "2.5rem",
    fontWeight: 600,
    color: "#3B4252",
    marginBottom: "10px",
  };

  const subtitleStyle: CSSProperties = {
    fontSize: "1.25rem",
    color: "#4C566A",
    marginBottom: "20px",
  };

  const countdownStyle: CSSProperties = {
    display: "flex",
    gap: "15px",
    fontSize: "1.5rem",
    padding: "15px 20px",
    backgroundColor: "#3B4252",
    color: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const timeBlockStyle: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };

  const timeLabelStyle: CSSProperties = {
    fontSize: "0.75rem",
    marginTop: "5px",
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Dashboard en proceso</h1>
      <p style={subtitleStyle}>
        Estamos preparando el mejor Dashboard para ti.
      </p>
      <div style={countdownStyle}>
        <div style={timeBlockStyle}>
          <span>{timeLeft.semanas}</span>
          <span style={timeLabelStyle}>Semanas</span>
        </div>
        <div style={timeBlockStyle}>
          <span>{timeLeft.dias}</span>
          <span style={timeLabelStyle}>Días</span>
        </div>
        <div style={timeBlockStyle}>
          <span>{timeLeft.horas}</span>
          <span style={timeLabelStyle}>Horas</span>
        </div>
        <div style={timeBlockStyle}>
          <span>{timeLeft.minutos}</span>
          <span style={timeLabelStyle}>Minutos</span>
        </div>
        <div style={timeBlockStyle}>
          <span>{timeLeft.segundos}</span>
          <span style={timeLabelStyle}>Segundos</span>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
