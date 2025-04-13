import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { TextField, Box } from "@mui/material";
import { selectContactsFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(selectContactsFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <Box className={css.searchBox}>
      <label htmlFor="search-input" className={css.label}>
        Search contacts:
      </label>
      <TextField
        id="search-input"
        value={query}
        onChange={handleChange}
        placeholder="Search by name or phone..."
        variant="outlined"
        fullWidth
        className={css.input}
        size="small"
      />
    </Box>
  );
}
