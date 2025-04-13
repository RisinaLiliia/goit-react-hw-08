import { useState } from "react";
import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact, updateContact } from "../../redux/contacts/operations";
import { Box, IconButton, Typography, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDeleteModal from "../ConfirmDeleteModal/ConfirmDeleteModal";
import EditContactModal from "../EditContactModal/EditContactModal";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const handleDeleteClick = () => {
    setOpenDelete(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteContact(contact.id));
    setOpenDelete(false);
  };

  const handleCancelDelete = () => {
    setOpenDelete(false);
  };

  const handleEditClick = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleSaveEdit = (updatedData) => {
    dispatch(updateContact({ id: contact.id, ...updatedData }));
    setOpenEdit(false);
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

      <Box className={css.buttons}>
        <Tooltip title="Edit">
          <IconButton onClick={handleEditClick} aria-label="edit">
            <EditIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteClick} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </Box>

      <ConfirmDeleteModal
        isOpen={openDelete}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        contactName={contact.name}
      />

      <EditContactModal
        isOpen={openEdit}
        onClose={handleCloseEdit}
        onSave={handleSaveEdit}
        contact={contact}
      />
    </li>
  );
}



