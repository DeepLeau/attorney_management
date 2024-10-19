import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { TextField, Button, Typography, Container, Box, Paper, MenuItem, Select, FormControl, InputLabel, Grid, CircularProgress } from '@mui/material';

const EditAttorneyPriceMap = () => {
  const router = useRouter();
  const { id } = router.query;
  const [priceMap, setPriceMap] = useState(null);
  const [options, setOptions] = useState({
    attorneys: [],
    courts: [],
    counties: [],
    violations: []
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      await Promise.all([fetchPriceMap(), fetchOptions()]);
      setIsLoading(false);
    };

    if (id) {
      loadData();
    }
  }, [id]);

  useEffect(() => {
    console.log('Courts updated:', options.courts);
  }, [options.courts]);

  const fetchPriceMap = async () => {
    try {
      const response = await fetch(`/api/attorney-price-map/${id}`);
      const data = await response.json();
      if (response.ok) {
        setPriceMap(data.data);
      } else {
        setError('Failed to load price map');
      }
    } catch (error) {
      setError('Server connection error');
    }
  };

  const fetchOptions = async () => {
    try {
      const [attorneysRes, courtsRes, countiesRes, violationsRes] = await Promise.all([
        fetch('/api/attorney-data'),
        fetch('/api/traffic-court'),
        fetch('/api/traffic-county'),
        fetch('/api/violation')
      ]);
      const [attorneysData, courtsData, countiesData, violationsData] = await Promise.all([
        attorneysRes.json(),
        courtsRes.json(),
        countiesRes.json(),
        violationsRes.json()
      ]);
      setOptions({
        attorneys: attorneysData.data || [],
        courts: courtsData.data || [],
        counties: countiesData.data || [],
        violations: violationsData.data || []
      });
    } catch (error) {
      console.error('Error fetching options:', error);
      setError('Error loading options');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPriceMap(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/attorney-price-map/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(priceMap),
      });
      if (response.ok) {
        router.push('/attorney-price-maps');
      } else {
        const data = await response.json();
        setError(data.message || 'An error occurred during the update');
      }
    } catch (error) {
      setError('Server connection error');
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
    return <Typography color="error" align="center">Error: {error}</Typography>;
  }

  if (!priceMap) {
    return <Typography align="center">No price map data available</Typography>;
  }

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Edit price map</Typography>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <FormControl fullWidth>
            <InputLabel id="attorney-label">Attorney</InputLabel>
            <Select
              labelId="attorney-label"
              id="attorney"
              name="attorney"
              value={priceMap?.attorney || ''}
              onChange={handleChange}
              required
            >
              <MenuItem value=""><em>Select an attorney</em></MenuItem>
              {options.attorneys.map(attorney => (
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
              value={priceMap?.court || ''}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a court</em></MenuItem>
              {options.courts.map(court => (
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
              value={priceMap?.county || ''}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a county</em></MenuItem>
              {options.counties.map(county => (
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
              value={priceMap?.violation || ''}
              onChange={handleChange}
            >
              <MenuItem value=""><em>Select a violation</em></MenuItem>
              {options.violations.map(violation => (
                <MenuItem key={violation._id} value={violation._id}>{violation.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Points"
            type="number"
            id="points"
            name="points"
            value={priceMap?.points || 0}
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
            value={priceMap?.price || 0}
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
                Update
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default EditAttorneyPriceMap;
