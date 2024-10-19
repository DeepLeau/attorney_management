import React, { useState } from 'react';
import Link from 'next/link';
import { TextField, Button, Typography, Container, Box, Paper, Grid } from '@mui/material';
import { useMediaQuery } from '@mui/material';

const CreateAttorney = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });

  const isSmallScreen = useMediaQuery('(max-width:600px)');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/attorney-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Something went wrong');
      alert('Attorney added successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: ''
      });
    } catch (error) {
      console.error(error.message);
      alert('Failed to add attorney');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Create New Attorney</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            fullWidth
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Link href="/attorneys-panel" passHref>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    color: '#0B5153',
                    borderColor: '#0B5153',
                    '&:hover': {
                      backgroundColor: '#0B5153',
                      color: '#fff',
                    },
                  }}
                >
                  Back to List
                </Button>
              </Link>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: '#0B3D91',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#082567',
                  },
                }}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default CreateAttorney;