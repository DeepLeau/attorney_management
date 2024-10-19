import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Container, Box, Paper, Grid } from '@mui/material';

const AttorneysPanel = () => {
  const [attorneys, setAttorneys] = useState([]);

  const fetchAttorneys = async () => {
    const response = await fetch('/api/attorney-data');
    const data = await response.json();
    if (response.ok) {
      setAttorneys(data.data);
    } else {
      console.error('Failed to fetch attorneys');
    }
  };

  const handleDelete = async (id) => {
    const response = await fetch(`/api/attorney-data/${id}`, {
      method: 'DELETE',
    });
    if (response.ok) {
      fetchAttorneys();  
    } else {
      console.error('Failed to delete attorney');
    }
  };

  useEffect(() => {
    fetchAttorneys();
  }, []);

  return (
    <Box sx={{ backgroundColor: '#ffcc80', minHeight: '100vh', py: 4 }}>
      <Container component={Paper} sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom align="center">Attorneys Panel</Typography>
        <Grid container justifyContent="center" sx={{ mb: 4 }}>
          <Grid item>
            <Link href="/attorneys-panel/create" passHref>
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
                Create New Attorney
              </Button>
            </Link>
          </Grid>
        </Grid>
        <List>
          {attorneys.map((attorney) => (
            <ListItem key={attorney._id} divider>
              <ListItemText primary={`${attorney.name} - ${attorney.email}`} />
              <ListItemSecondaryAction>
                <Grid container spacing={1}>
                  <Grid item>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => handleDelete(attorney._id)}
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
                  <Grid item>
                    <Link href={`/attorneys-panel/edit/${attorney._id}`} passHref>
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
                </Grid>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Grid container justifyContent="center" sx={{ mt: 4 }}>
          <Grid item>
            <Link href="/attorney-price-maps" passHref>
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
                View Price Maps
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AttorneysPanel;