import React, { useState } from 'react';
import { Container, CssBaseline, Typography, Box } from '@mui/material';
import CostEstimationForm from './components/CostEstimationForm';
import ResultDisplay from './components/ResultDisplay';
import Header from './components/Header';

function App() {
    const [result, setResult] = useState(null);

    return (
        <>
            <CssBaseline />
            <Header />
            <Container maxWidth="md">
                <Box my={4}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Construction Cost Estimator
                    </Typography>
                    <Typography variant="subtitle1" align="center" paragraph>
                        Calculate the estimated cost of construction based on area, storeys, and BHK size.
                    </Typography>

                    {/* Form Component */}
                    <CostEstimationForm setResult={setResult} />

                    {/* Result Display */}
                    {result && (
                        <>
                            {/* Add some spacing */}
                            <Box mt={4}>
                                <ResultDisplay result={result} />
                            </Box>
                        </>
                    )}
                </Box>
            </Container>
        </>
    );
}

export default App;
