import { useState } from "react";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { Box, IconButton, Typography } from "@mui/material";
import css from "./Contact.module.css";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal"; // Импортируем компонент модального окна

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(contact.id));
    setOpen(false);
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  return (
    <li className={css.item}>
      <Box className={css.contactInfo}>
        <Box className={css.info}>
          <Box className={css.icon}>
            <FaUserAlt size={18} />
          </Box>
          <Typography variant="body1" className={css.text}>
            {contact.name}
          </Typography>
        </Box>
        <Box className={css.info}>
          <Box className={css.icon}>
            <FaPhoneAlt size={18} />
          </Box>
          <Typography variant="body1" className={css.text}>
            {contact.number}
          </Typography>
        </Box>
      </Box>
      <IconButton
        className={css.deleteButton}
        onClick={handleDeleteClick}
        aria-label="delete"
      >
        Delete
      </IconButton>

      <ConfirmDeleteModal
        isOpen={open}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        contactName={contact.name}
      />
    </li>
  );
}

