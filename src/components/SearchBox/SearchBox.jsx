import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { selectContactsFilter } from "../../redux/filters/selectors";
import { TextField, Box, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import css from "./SearchBox.module.css";

export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(selectContactsFilter);

  const handleChange = (event) => {
    dispatch(changeFilter(event.target.value));
  };

  return (
    <Box sx={{ mb: 2 }} className={css.searchBox}>
      <Typography variant="subtitle1" sx={{ mb: 1 }}>
        Search contacts:
      </Typography>

      <TextField
        id="search-input"
        value={query}
        onChange={handleChange}
        placeholder="Search by name or phone..."
        variant="outlined"
        fullWidth
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="action" />
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

