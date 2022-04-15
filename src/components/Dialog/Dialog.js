import React, { useState, forwardRef, useContext } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
// import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import classes from "./Dialog.module.css";
import Dropdown from "../Dropdown/Dropdown";
import {
  DifficultyContext,
  MenuContext,
  OpponentContext,
} from "../../Contexts/GameContext";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  // const [open, setOpen] = useState(true);
  const { openMenu, setOpenMenu } = useContext(MenuContext);

  const { opponent, setOpponent } = useContext(OpponentContext);
  const { difficulty, setDifficulty } = useContext(DifficultyContext);

  const handleClickOpen = () => {
    setOpenMenu(true);
  };

  const handleClose = () => {
    if (opponent === "AI" && difficulty === "") {
      return;
    } else if (opponent === "") return false;
    setOpenMenu(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open full-screen dialog
      </Button> */}
      <Dialog
        fullScreen
        open={openMenu}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }} className={classes.appbar}>
          <Toolbar>
            {/* <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton> */}
            <Typography sx={{ ml: 2, flex: 1 }} variant="h5" component="div">
              Chess AI
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={handleClose}
              size="large"
            >
              Start
            </Button>
          </Toolbar>
        </AppBar>
        <List className={classes.dialogBody}>
          <ListItem className={classes.listItem}>
            <ListItemText primary="Play against" />
            <Dropdown label="opponent" />
          </ListItem>
          <Divider />
          <ListItem className={classes.listItem}>
            <ListItemText primary="Difficulty" />
            <Dropdown label="difficulty" />
          </ListItem>
          {/* <Divider /> */}
        </List>
      </Dialog>
    </div>
  );
}
