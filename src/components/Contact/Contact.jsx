import { FaUserAlt, FaPhoneAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import { Box, IconButton, Typography } from "@mui/material";
import css from "./Contact.module.css";

export default function Contact({ contact }) {
  const dispatch = useDispatch();

  const handleDelete = () => dispatch(deleteContact(contact.id));

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
            {contact.number}{" "}
          </Typography>
        </Box>
      </Box>
      <IconButton
        className={css.deleteButton}
        onClick={handleDelete}
        aria-label="delete"
      >
        Delete
      </IconButton>
    </li>
  );
}
