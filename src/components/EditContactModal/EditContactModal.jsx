import { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";

export default function EditContactModal({ isOpen, onClose, onSave, contact }) {
  const [name, setName] = useState(contact.name || "");
  const [number, setNumber] = useState(contact.number || "");

  useEffect(() => {
    if (contact) {
      setName(contact.name);
      setNumber(contact.number);
    }
  }, [contact]);

  const handleSave = () => {
    onSave({ name, number });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Edit Contact</DialogTitle>
      <DialogContent>
        <TextField
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Phone Number"
          fullWidth
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} color="primary">Save</Button>
      </DialogActions>
    </Dialog>
  );
}

