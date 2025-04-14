import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeFilter } from "../../redux/filters/slice";
import { TextField, Box, InputAdornment } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { selectContactsFilter } from "../../redux/filters/selectors";
import css from "./SearchBox.module.css";


export default function SearchBox() {
  const dispatch = useDispatch();
  const query = useSelector(selectContactsFilter);

  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <Box sx={{ mb: 2 }} className={css.searchBox} >
      <h4> Search contacts:</h4>
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

