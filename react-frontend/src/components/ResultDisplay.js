import React from 'react';
import { Paper, Typography, Grid, Divider, Box, useTheme } from '@mui/material';
import { HomeWork, Layers, KingBed, Construction } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, #fff5f5 100%)`,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  position: 'relative',
  overflow: 'hidden',
  textAlign: 'center',
  '&:before': {
    content: '""',
    position: 'absolute',
    top: -50,
    right: -50,
    width: 120,
    height: 120,
    background: `url(/construction-hat.svg) no-repeat center/contain`,
    opacity: 0.1,
  },
}));

const ResultItem = ({ icon: Icon, label, value, unit }) => (
  <Grid container spacing={2} alignItems="center" sx={{ mb: 2, justifyContent: 'center' }}>
    <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
        <Icon sx={{ color: 'primary.main', fontSize: 32 }} />
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {label}
        </Typography>
      </Box>
    </Grid>
    <Grid item xs={12} sm={6} sx={{ textAlign: 'center' }}>
      <Box
        sx={{
          bgcolor: 'background.default',
          p: 2,
          borderRadius: '8px',
          display: 'inline-block',
        }}
      >
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          {value} {unit && <small style={{ opacity: 0.8 }}>{unit}</small>}
        </Typography>
      </Box>
    </Grid>
  </Grid>
);

const ResultDisplay = ({ result }) => {
  const theme = useTheme();

  if (!result) return null;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <StyledPaper elevation={3}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2,
            mb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 60,
              height: 60,
              bgcolor: 'background.paper',
              borderRadius: '50%',
              boxShadow: '0 3px 5px rgba(0,0,0,0.2)',
            }}
          >
            <Construction sx={{ fontSize: 36, color: 'primary.main' }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: theme.palette.mode === 'dark' ? '#fff' : '#2d2d2d',
            }}
          >
            Construction Cost Breakdown
          </Typography>
        </Box>

        <ResultItem icon={HomeWork} label="Total Construction Area" value={result.area} unit="sq.ft" />
        <ResultItem icon={Layers} label="Number of Storeys" value={result.storeys} />
        <ResultItem icon={KingBed} label="BHK Configuration" value={result.bhkSize} unit="BHK" />

        <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

        <Box
          sx={{
            bgcolor: 'primary.light',
            p: 3,
            borderRadius: '12px',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          <Typography variant="overline" sx={{ opacity: 0.8 }}>
            Total Estimated Cost
          </Typography>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              color: '#ffffff', // white text
              mt: 1,
            }}
          >
            {formatCurrency(result.totalCost)}
          </Typography>
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mt: 1,
              opacity: 0.8,
            }}
          >
            (Including all construction materials and labor charges)
          </Typography>
        </Box>

        <Box
          sx={{
            mt: 4,
            display: 'flex',
            gap: 2,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                bgcolor: 'success.main',
                borderRadius: '50%',
                mr: 1,
              }}
            />
            Certified Estimation
          </Typography>
          <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="span"
              sx={{
                width: 12,
                height: 12,
                bgcolor: 'warning.main',
                borderRadius: '50%',
                mr: 1,
              }}
            />
            Includes GST
          </Typography>
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default ResultDisplay;
