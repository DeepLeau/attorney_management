import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Typography, Container, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid } from '@mui/material';

const AttorneyPriceMapsIndex = () => {
  const [priceMaps, setPriceMaps] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPriceMaps();
  }, []);

  const fetchPriceMaps = async () => {
    try {
      const response = await fetch('/api/attorney-price-map');
      const data = await response.json();
      if (response.ok) {
        setPriceMaps(data.data);
      } else {
        setError('Failed to load price maps');
      }
    } catch (error) {
      setError('Server connection error');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to do away with this price map ?')) {
      try {
        const response = await fetch(`/api/attorney-price-map/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchPriceMaps();
        } else {
          setError('Failed to delete price map');
        }
      } catch (error) {
        setError('Server connection error');
      }
    }
  };

  if (error) return <Typography color="error" align="center">Error : {error}</Typography>;

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 6 }}>Attorneys price maps</Typography>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          <Grid item>
            <Link href="/attorney-price-maps/create" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#0B3D91',
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#082567',
                  },
                }}
              >
                Create a new price map
              </Button>
            </Link>
          </Grid>
        </Grid>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Attorney</TableCell>
                <TableCell>Court</TableCell>
                <TableCell>County</TableCell>
                <TableCell>Violation</TableCell>
                <TableCell>Points</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {priceMaps.map((priceMap) => (
                <TableRow key={priceMap._id}>
                  <TableCell>{priceMap.attorney?.name || 'N/A'}</TableCell>
                  <TableCell>{priceMap.court?.name || 'N/A'}</TableCell>
                  <TableCell>{priceMap.county?.name || 'N/A'}</TableCell>
                  <TableCell>{priceMap.violation?.name || 'N/A'}</TableCell>
                  <TableCell>{priceMap.points}</TableCell>
                  <TableCell>{priceMap.price}</TableCell>
                  <TableCell>
                    <Grid container spacing={1}>
                      <Grid item>
                        <Link href={`/attorney-price-maps/edit/${priceMap._id}`} passHref>
                          <Button
                            variant="outlined"
                            sx={{
                              color: '#0B5153',
                              borderColor: '#0B5153',
                              '&:hover': {
                                backgroundColor: '#0B5153',
                                color: '#fff',
                              },
                            }}
                          >
                            Edit
                          </Button>
                        </Link>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleDelete(priceMap._id)}
                          sx={{
                            '&:hover': {
                              backgroundColor: '#d32f2f',
                              color: '#fff',
                            },
                          }}
                        >
                          Delete
                        </Button>
                      </Grid>
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Link href="/attorneys-panel" passHref>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#424242', 
                  color: '#fff',
                  '&:hover': {
                    backgroundColor: '#212121', 
                  },
                }}
              >
                Back to Attorneys Panel
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AttorneyPriceMapsIndex;