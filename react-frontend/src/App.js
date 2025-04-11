import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import CostEstimationForm from './components/CostEstimationForm';
import ResultDisplay from './components/ResultDisplay';

function App() {
    const [result, setResult] = useState(null);

    return (
        <>
            <CssBaseline />
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Construction Cost Estimator
                    </Typography>
                    <Typography variant="subtitle1" align="center" paragraph>
                        Calculate the estimated cost of construction based on area, storeys, and BHK size
                    </Typography>

                    <CostEstimationForm setResult={setResult} />
                    {result && <ResultDisplay result={result} />}
                </Box>
            </Container>
        </>
    );
}

export default App;
