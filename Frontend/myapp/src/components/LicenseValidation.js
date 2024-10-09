import React, { useState } from 'react';
import { Button, TextField, Typography, Box, Modal } from '@mui/material';
import axios from 'axios';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

const LicenseValidation = () => {
  const [licenseKey, setLicenseKey] = useState('');
  const [validationResult, setValidationResult] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const validateLicense = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/validate_license/', {
        license_key: licenseKey,  
      });
      setValidationResult(response.data.valid ? 'License is valid' : 'License is invalid');
    } catch (error) {
      setValidationResult('Error validating license');
    }
    handleOpen(); 
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Typography variant="h4" gutterBottom>
        License Validation
      </Typography>
      <TextField
        label="Enter License Key"
        variant="outlined"
        value={licenseKey}
        onChange={(e) => setLicenseKey(e.target.value)}
        style={{ marginBottom: '20px', width: '300px' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={validateLicense}
        style={{ width: '300px' }}
      >
        Validate License
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-title" variant="h6" component="h2">
            Validation Result
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {validationResult}
          </Typography>
          <Button onClick={handleClose} variant="contained" style={{ marginTop: '10px' }}>
            Close
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};


export default LicenseValidation;
