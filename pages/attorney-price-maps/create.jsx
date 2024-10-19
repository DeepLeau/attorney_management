import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TextField, Button, Typography, Container, Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid, CircularProgress } from '@mui/material';

const CreateAttorneyPriceMap = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    attorney: '',
    court: '',
    county: '',
    violation: '',
    points: 0,
    price: 0
  });
  const [attorneys, setAttorneys] = useState([]);
  const [courts, setCourts] = useState([]);
  const [counties, setCounties] = useState([]);
  const [violations, setViolations] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    setIsLoading(true);
    try {
      const [attorneyRes, courtRes, countyRes, violationRes] = await Promise.all([
        fetch('/api/attorney-data'),
        fetch('/api/traffic-court'),
        fetch('/api/traffic-county'),
        fetch('/api/violation')
      ]);

      const [attorneyData, courtData, countyData, violationData] = await Promise.all([
        attorneyRes.json(),
        courtRes.json(),
        countyRes.json(),
        violationRes.json()
      ]);

      setAttorneys(attorneyData.data || []);
      setCourts(courtData.data || []);
      setCounties(countyData.data || []);
      setViolations(violationData.data || []);
      setIsLoading(false);
    } catch (error) {
      console.error('Error loading options :', error);
      setError('Error loading options');
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const dataToSubmit = {
      ...formData,
      court: formData.court || null,
      county: formData.county || null,
      violation: formData.violation || null,
    };

    try {
      const res = await fetch('/api/attorney-price-map', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSubmit),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'An error occurred during the creation');
      }

      router.push('/attorney-price-maps');
    } catch (error) {
      setError(error.message);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <Typography color="error" align="center">{error}</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Create a new price map</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormControl fullWidth>
            <InputLabel id="attorney-label">Attorney</InputLabel>
            <Select
              labelId="attorney-label"
              id="attorney"
              name="attorney"
              value={formData.attorney}
              onChange={handleChange}
              required
            >
              <MenuItem value=""><em>Select an attorney</em></MenuItem>
              {attorneys.map(attorney => (
                <MenuItem key={attorney._id} value={attorney._id}>{attorney.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="court-label">Court</InputLabel>
            <Select
              labelId="court-label"
              id="court"
              name="court"
              value={formData.court}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a court</em></MenuItem>
              {courts && courts.length > 0 && courts.map(court => (
                <MenuItem key={court._id} value={court._id}>{court.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="county-label">County</InputLabel>
            <Select
              labelId="county-label"
              id="county"
              name="county"
              value={formData.county}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a county</em></MenuItem>
              {counties.map(county => (
                <MenuItem key={county._id} value={county._id}>{county.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="violation-label">Violation</InputLabel>
            <Select
              labelId="violation-label"
              id="violation"
              name="violation"
              value={formData.violation}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a violation</em></MenuItem>
              {violations.map(violation => (
                <MenuItem key={violation._id} value={violation._id}>{violation.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Points"
            type="number"
            id="points"
            name="points"
            value={formData.points}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{ min: 0 }}
          />
          <TextField
            label="Price"
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
          />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={4}>
              <Link href="/attorney-price-maps" passHref>
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
                  Back to list
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
                Create
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default CreateAttorneyPriceMap;
