import { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(15 * 60);
  const [play, setPlay] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    let interval = null;
    if (play) {
      interval = setTimeout(() => {
        if (seconds) setSeconds((s) => s - 1);
      }, 1000);
    } else {
      clearTimeout(interval);
    }
    return () => clearTimeout(interval);
  });

  const handleClick = () => {
    if (inputRef.current.value) {
      const hms = inputRef.current.value;
      const temp = hms.split(':');
      const seconds = +temp[0] * 60 * 60 + +temp[1] * 60 + +temp[2];
      console.log(temp);
      setSeconds(seconds);
    }
    setPlay(!play);
  };

  return (
    <div className='App'>
      <div className='Time'>
        <p>
          {seconds === 0
            ? 'STOP'
            : `${
                Math.floor(seconds / 60) < 10
                  ? `0${Math.floor(seconds / 60)}`
                  : Math.floor(seconds / 60)
              }` +
              ':' +
              `0${seconds % 60}`.substr(-2)}
        </p>
      </div>
      <div className='Controls'>
        <input
          type='time'
          defaultValue='00:15:00'
          ref={inputRef}
          step='1'
          min='00:00:00'
          max='23:59:59'
        />
        <button onClick={handleClick}>{!play ? 'Start' : 'Pause'}</button>
      </div>
    </div>
  );
}

export default App;
