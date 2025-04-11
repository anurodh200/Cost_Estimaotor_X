import React from 'react';
import { Paper, Typography, Grid, Divider } from '@mui/material';

const ResultDisplay = ({ result }) => {
    if (!result) return null;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <Paper style={{ padding: 20 }}>
            <Typography variant="h5" gutterBottom>
                Cost Estimation Results
            </Typography>
            <Divider style={{ margin: '10px 0' }} />

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Typography variant="body1">Area:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                        {result.area} sq. ft
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="body1">Number of Storeys:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                        {result.storeys}
                    </Typography>
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="body1">BHK Size:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="body1" align="right">
                        {result.bhkSize} BHK
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider style={{ margin: '10px 0' }} />
                </Grid>

                <Grid item xs={6}>
                    <Typography variant="h6">Estimated Cost:</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography variant="h6" align="right" color="primary">
                        {formatCurrency(result.totalCost)}
                    </Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ResultDisplay;
