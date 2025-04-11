import React, { useState } from 'react';
import {
    TextField, Button, Grid, Typography, Paper,
    MenuItem, FormControl, InputLabel, Select
} from '@mui/material';
import { getEstimate } from '../api';

const CostEstimationForm = ({ setResult }) => {
    const [formData, setFormData] = useState({
        area: '',
        storeys: 1,
        bhkSize: 1
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.area) newErrors.area = 'Area is required';
        else if (formData.area <= 0) newErrors.area = 'Area must be positive';

        if (formData.storeys < 1) newErrors.storeys = 'At least 1 storey is required';
        if (formData.bhkSize < 1) newErrors.bhkSize = 'BHK size must be at least 1';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        setLoading(true);
        try {
            const result = await getEstimate(
                parseFloat(formData.area),
                parseInt(formData.storeys),
                parseInt(formData.bhkSize)
            );
            setResult(result);
        } catch (error) {
            setErrors({ submit: error.error || 'Failed to get estimate' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Paper style={{ padding: 20, marginBottom: 20 }}>
            <Typography variant="h5" gutterBottom>
                Construction Cost Estimator
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            type="number"
                            label="Area (sq. ft)"
                            name="area"
                            value={formData.area}
                            onChange={handleChange}
                            error={!!errors.area}
                            helperText={errors.area}
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>Number of Storeys</InputLabel>
                            <Select
                                name="storeys"
                                value={formData.storeys}
                                onChange={handleChange}
                                error={!!errors.storeys}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <MenuItem key={num} value={num}>
                                        {num}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel>BHK Size</InputLabel>
                            <Select
                                name="bhkSize"
                                value={formData.bhkSize}
                                onChange={handleChange}
                                error={!!errors.bhkSize}
                            >
                                {[1, 2, 3, 4, 5].map(num => (
                                    <MenuItem key={num} value={num}>
                                        {num} BHK
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    {errors.submit && (
                        <Grid item xs={12}>
                            <Typography color="error">
                                {errors.submit}
                            </Typography>
                        </Grid>
                    )}

                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? 'Calculating...' : 'Calculate Estimate'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
};

export default CostEstimationForm;

