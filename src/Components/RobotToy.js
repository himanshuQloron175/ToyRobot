import React, { useState } from 'react';
import './ToyRobot.css'; 

const ToyRobot = () => {
  const [position, setPosition] = useState({ x: null, y: null, facing: null });
  const [commandInput, setCommandInput] = useState('');
  const [output, setOutput] = useState('');

  const handleCommandInputChange = (event) => {
    setCommandInput(event.target.value);
  };

  const handlePlace = (x, y, facing) => {
    if (isValidPosition(x, y)) {
      setPosition({ x, y, facing });
    }
  };

  const handleMove = () => {
    if (!position.x || !position.y || !position.facing) return;

    let newX = position.x;
    let newY = position.y;

    switch (position.facing) {
      case 'NORTH':
        newY = Math.min(position.y + 1, 4);
        break;
      case 'SOUTH':
        newY = Math.max(position.y - 1, 0);
        break;
      case 'EAST':
        newX = Math.min(position.x + 1, 4);
        break;
      case 'WEST':
        newX = Math.max(position.x - 1, 0);
        break;
      default:
        break;
    }

    if (isValidPosition(newX, newY)) {
      setPosition({ ...position, x: newX, y: newY });
    }
  };

  const handleLeft = () => {
    if (!position.facing) return;

    const facings = ['NORTH', 'WEST', 'SOUTH', 'EAST'];
    const currentFacingIndex = facings.indexOf(position.facing);
    const newFacingIndex = (currentFacingIndex + 1) % 4;

    setPosition({ ...position, facing: facings[newFacingIndex] });
  };

  const handleRight = () => {
    if (!position.facing) return;

    const facings = ['NORTH', 'EAST', 'SOUTH', 'WEST'];
    const currentFacingIndex = facings.indexOf(position.facing);
    const newFacingIndex = (currentFacingIndex + 1) % 4;

    setPosition({ ...position, facing: facings[newFacingIndex] });
  };

  const handleReport = () => {
    const reportOutput = `Output: ${position.x},${position.y},${position.facing}`;
    console.log(reportOutput);
    setOutput(reportOutput);
  };

  const handleExecuteCommand = () => {
    const commands = commandInput.trim().toUpperCase().split(/\s+/);

    if (commands.length === 0) return;

    const command = commands[0];
    const args = commands.slice(1);

    switch (command) {
      case 'PLACE':
        const [x, y, facing] = args.map((arg) => parseInt(arg, 10) || arg);
        handlePlace(x, y, facing);
        break;
      case 'MOVE':
        handleMove();
        break;
      case 'LEFT':
        handleLeft();
        break;
      case 'RIGHT':
        handleRight();
        break;
      case 'REPORT':
        handleReport();
        break;
      default:
        console.log('Invalid command');
    }
  };

  const isValidPosition = (x, y) => {
    return x >= 0 && x <= 4 && y >= 0 && y <= 4;
  };

  return (
    <div className="toy-robot-container">
      <div className="input-container">
        <label>
          Enter Command:
          <input type="text" value={commandInput} onChange={handleCommandInputChange} />
        </label>
        <button onClick={handleExecuteCommand}>Execute Command</button>
      </div>
      <div className="buttons-container">
        <button onClick={() => handlePlace(0, 0, 'NORTH')}>PLACE 0,0,NORTH</button>
        <button onClick={handleMove}>MOVE</button>
        <button onClick={handleLeft}>LEFT</button>
        <button onClick={handleRight}>RIGHT</button>
        <button onClick={handleReport}>REPORT</button>
      </div>

      <div className="output-container">
        <div className="position-details">
          X: {position.x}, Y: {position.y}, Facing: {position.facing}
        </div>
        <div className="output">{output}</div>
      </div>
    </div>
  );
};

export default ToyRobot;
