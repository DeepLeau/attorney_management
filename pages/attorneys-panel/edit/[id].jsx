import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { TextField, Button, Typography, Container, Box, Paper, Grid } from '@mui/material';

const EditAttorney = () => {
  const router = useRouter();
  const { id } = router.query;

  const [attorney, setAttorney] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchAttorney = async () => {
        try {
          const res = await fetch(`/api/attorney-data/${id}`);
          const data = await res.json();
          if (res.ok) {
            setAttorney(data.data);
          } else {
            setError('Failed to load attorney');
          }
        } catch (error) {
          setError('Failed to load attorney');
        }
      };
      fetchAttorney();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAttorney((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch(`/api/attorney-data/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(attorney),
      });
      const data = await res.json();
      if (res.ok) {
        router.push('/attorneys-panel');
      } else {
        setError(data.message || 'Failed attorney update');
      }
    } catch (error) {
      setError('Server connection error');
    }
  };

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Edit attorney</Typography>
        {error && <Typography color="error" align="center">{error}</Typography>}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <TextField
            label="Name"
            name="name"
            value={attorney.name}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Email"
            type="email"
            name="email"
            value={attorney.email}
            onChange={handleInputChange}
            required
            fullWidth
          />
          <TextField
            label="Phone"
            name="phone"
            value={attorney.phone}
            onChange={handleInputChange}
            fullWidth
          />
          <TextField
            label="Address"
            name="address"
            value={attorney.address}
            onChange={handleInputChange}
            fullWidth
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Button
                variant="outlined"
                onClick={() => router.push('/attorneys-panel')}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default EditAttorney;