import React, { useContext, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DifficultyContext, OpponentContext } from "../../Contexts/GameContext";

export default function Dropdown({ label }) {
  const { opponent, setOpponent } = useContext(OpponentContext);
  const { difficulty, setDifficulty } = useContext(DifficultyContext);

  const handleOpponentChange = (event) => {
    setOpponent(event.target.value);
  };

  const handleDifficultyChange = (event) => {
    setDifficulty(event.target.value);
  };

  let select = null;

  if (label === "opponent") {
    select = (
      <Select
        labelId="opponent-dropDown"
        id="demo-simple-select-opponent"
        value={opponent}
        label="Opponent"
        onChange={handleOpponentChange}
      >
        <MenuItem value="AI">AI</MenuItem>
        <MenuItem value="Human">Human</MenuItem>
      </Select>
    );
  } else {
    select = (
      <Select
        labelId="difficulty-dropDown"
        id="demo-simple-select-difficulty"
        value={difficulty}
        label="Difficulty"
        onChange={handleDifficultyChange}
      >
        <MenuItem value={1}>Easy</MenuItem>
        <MenuItem value={2}>Medium</MenuItem>
        <MenuItem value={3}>Hard</MenuItem>
      </Select>
    );
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">
          {label === "opponent" ? "Opponent" : "Difficulty"}
        </InputLabel>
        {select}
      </FormControl>
    </Box>
  );
}
