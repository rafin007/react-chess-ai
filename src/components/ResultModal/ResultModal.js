import React, { useContext } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { ModalContext } from "../../Contexts/GameContext";

const style = {
  position: "relative",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ResultModal() {
  const { openModal, setOpenModal } = useContext(ModalContext);

  //   const handleOpen = () =>
  // setOpenModal({ ...openModal, message: openModal.message, value: true });
  const handleClose = () => setOpenModal({ ...openModal, value: false });

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openModal.value}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal.value}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            Game Over!
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {openModal.message}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
