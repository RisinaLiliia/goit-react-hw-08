import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel, contactName }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete contact <strong>{contactName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions >
        <Button 
          onClick={onCancel} >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
       
         sx={{
  
    color: 'wheit',
    '&:hover': {
      color: '#f35044',
    },
    '&:focus': {
      color: '#f35044',
    },
  }}
        >
          delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;



