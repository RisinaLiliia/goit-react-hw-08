import { Typography, Box } from "@mui/material";
import { FaPlusCircle, FaSearch, FaEdit, FaLock } from "react-icons/fa";
import css from "./HomeHero.module.css";

export default function HomeHero() {
  return (
    <Box className={css.container}>
      <Typography variant="h3" className={css.title}>
        Welcome to the Contact Book!
      </Typography>

      <Typography variant="body1" className={css.description}>
        Easily manage your personal contacts:
      </Typography>

      <ul className={css.list}>
        <li>
          <FaPlusCircle className={css.icon} />
          Add new contacts
        </li>
        <li>
          <FaSearch className={css.icon} />
          Search by name or phone number
        </li>
        <li>
          <FaEdit className={css.icon} />
          Edit and delete contacts
        </li>
        <li>
          <FaLock className={css.icon} />
          Your data is private and secure
        </li>
      </ul>

      <Typography variant="body1" className={css.footer}>
        Please register or log in to get started.
      </Typography>
    </Box>
  );
}
