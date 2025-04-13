import React from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography } from "@mui/material";

const ConfirmDeleteModal = ({ isOpen, onConfirm, onCancel, contactName }) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onCancel}>
      <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>Confirm Deletion</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Are you sure you want to delete contact <strong>{contactName}</strong>?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center' }}>
        <Button 
          onClick={onCancel} 
          color="primary" 
          variant="outlined"
          sx={{ color: '#1976d2' }}  
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="secondary" 
          variant="contained"
          sx={{ backgroundColor: '#f44336', color: 'white' }}  
        >
          Yes, delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDeleteModal;



