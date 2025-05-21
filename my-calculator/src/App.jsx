import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");

  const [darkMode, setDarkMode] = useState(true);

  const [history, setHistory] = useState([]);

  const toggleMode = () => setDarkMode(!darkMode);


const handleEqual = () => {
  try {
    const result = eval(input);
    const resultStr = result.toString();
    setHistory((prev) => [...prev, `${input} = ${resultStr}`]);
    setInput(resultStr);
  } catch {
    setInput("Error");
  }
};

  


  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;

      if (!isNaN(key) || "+-*/().".includes(key)) {
        setInput((prev) => prev + key);
      } else if (key === "Enter") {
        handleEqual();
      } else if (key === "Backspace") {
        handleDelete();
      } else if (key.toLowerCase() === "c") {
        handleClear();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleClick = (value) => {
    if (value === "π") value = Math.PI.toFixed(8);
    if (value === "√") value = "Math.sqrt(";
    if (value === "^") value = "**";
    if (value === "±") {
      setInput((prev) => (prev.charAt(0) === "-" ? prev.slice(1) : "-" + prev));
      return;
    }
    if (value === "%") {
    try {
      const lastNum = input.match(/(\d+\.?\d*)$/);
      if (lastNum) {
        const num = parseFloat(lastNum[0]);
        const percent = num / 100;
        setInput(input.replace(/(\d+\.?\d*)$/, percent.toString()));
      }
    } catch {
      setInput("Error");
    }
    return;
  }

    setInput((prev) => prev + value);
  };

  const handleClear = () => setInput("");

  const handleDelete = () => setInput((prev) => prev.slice(0, -1));

  const buttons = [
    "C", "←", "(", ")", 
    "√", "^", "π", "±",
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0",  ".", "uc", "%",
    "mc", "m+", "m-", "+",
     "=",
  ];

  return (
    <div className={`calculator ${darkMode ? "dark" : "light"}`}>
  
      <div className="display">{input || "0"}</div>
      <div className="history">
  {history.slice(-5).reverse().map((item, i) => (
    <div key={i} className="history-item">{item}</div>
  ))}
</div>

      <div className="buttons">
        {buttons.map((btn, idx) => {
          if (btn === "C") return <button key={idx} onClick={handleClear}>C</button>;
          if (btn === "←") return <button key={idx} onClick={handleDelete}>←</button>;
          if (btn === "=") return <button className="equal" key={idx} onClick={handleEqual}>=</button>;
          return <button key={idx} onClick={() => handleClick(btn)}>{btn}</button>;
        })}
      </div>
    
  <div className="equal-button">
  <button onClick={handleEqual}>=</button>
</div>

<button className="mode-toggle" onClick={toggleMode}>
  {darkMode ? "☀️ Light" : "🌙 Dark"}
</button>

</div>

    
  );
}

export default App;
