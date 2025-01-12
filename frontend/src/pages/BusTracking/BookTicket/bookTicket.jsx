import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Paper,
  Stepper,
  Step,
  StepLabel,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';
import {
  DirectionsBus as BusIcon,
  LocationOn as MapPinIcon,
  Schedule as ClockIcon,
  Group as UsersIcon,
  Wifi as WifiIcon,
  Power as PowerIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const busData = [
  { id: 1, name: "Shatabdi Express", from: "Delhi", to: "Jaipur", departure: "06:00 AM", arrival: "10:00 AM", rating: 4.5, price: 450, seats: 25 },
  { id: 2, name: "Rajdhani Travels", from: "Mumbai", to: "Pune", departure: "09:00 AM", arrival: "12:00 PM", rating: 4, price: 350, seats: 15 },
  { id: 3, name: "Southern Express", from: "Chennai", to: "Bangalore", departure: "02:00 PM", arrival: "07:00 PM",  rating: 4,price: 500, seats: 30 },
  { id: 4, name: "Golden Line", from: "Kolkata", to: "Ranchi", departure: "08:00 AM", arrival: "02:00 PM", rating: 3, price: 400, seats: 20 },
];

export default function BookTicket() {
  useEffect(() => {
      window.scrollTo(0, 0); // Scrolls to the top of the page
    }, []);
  const [selectedBus, setSelectedBus] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    travelDate: '',
    passengers: '',
    ageGroup: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' });
  };

  const handleBooking = (busId) => {
    setSelectedBus(busData.find((bus) => bus.id === busId));
    setActiveStep(1);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = 'Full name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.travelDate) newErrors.travelDate = 'Travel date is required';
    if (!formData.passengers) newErrors.passengers = 'Number of passengers is required';
    if (!formData.ageGroup) newErrors.ageGroup = 'Age group is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleConfirmBooking = () => {
    if (validateForm()) {
      setOpenDialog(true);
    }
  };

  const handleFinalConfirmation = async () => {
    setOpenDialog(false);
    setOpenSnackbar(true);
    setActiveStep(2);
  
    // Send confirmation email to the user
    const bookingDetails = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      travelDate: formData.travelDate,
      passengers: formData.passengers,
      ageGroup: formData.ageGroup,
      selectedBus: selectedBus,
    };
  
    try {
      await fetch('http://localhost:3000/sendConfirmationEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingDetails),
      });
      console.log('Confirmation email sent successfully');
      handleCancelBooking();
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };
  

  const handleCancelBooking = () => {
    setSelectedBus(null);
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      travelDate: '',
      passengers: '',
      ageGroup: '',
    });
    setActiveStep(0);
  };

  const steps = ['Select Bus', 'Fill Details', 'Confirmation'];

  return (
    
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 4 }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
          Book Your Bus Ticket
        </Typography>
  
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {['Select Bus', 'Fill Details', 'Confirmation'].map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
  
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              Available Buses
            </Typography>
            {busData.map((bus) => (
              <Card 
                key={bus.id} 
                sx={{ 
                  mb: 2, 
                  opacity: activeStep === 0 ? 1 : 0.6,
                  '&:hover': {
                    boxShadow: 3,
                    transition: 'box-shadow 0.3s ease-in-out'
                  }
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <BusIcon />
                        <Typography variant="h6">{bus.name}</Typography>
                      </Stack>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StarIcon sx={{ color: 'warning.main' }} />
                        <Typography>{bus.rating}</Typography>
                      </Box>
                    </Box>
  
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Stack spacing={0.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MapPinIcon fontSize="small" />
                            <Typography variant="body2">From: {bus.from}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ClockIcon fontSize="small" />
                            <Typography variant="body2">Departure: {bus.departure}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack spacing={0.5}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <MapPinIcon fontSize="small" />
                            <Typography variant="body2">To: {bus.to}</Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <ClockIcon fontSize="small" />
                            <Typography variant="body2">Arrival: {bus.arrival}</Typography>
                          </Box>
                        </Stack>
                      </Grid>
                    </Grid>
  
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Stack direction="row" spacing={1} alignItems="center">
                        <UsersIcon fontSize="small" />
                        <Typography variant="body2">{bus.seats} seats available</Typography>
                      </Stack>
                      <Stack direction="row" spacing={1}>
                        <WifiIcon fontSize="small" color="action" />
                        <PowerIcon fontSize="small" color="action" />
                      </Stack>
                    </Box>
  
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <Typography variant="h6" color="success.main">
                        ₹{bus.price}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleBooking(bus.id)}
                        disabled={activeStep !== 0}
                        sx={{ 
                          bgcolor: 'black',
                          '&:hover': {
                            bgcolor: 'grey.900'
                          }
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h5" gutterBottom>
            Booking Form
          </Typography>
          <Paper elevation={3} sx={{ p: 3 }}>
            <form>
              <TextField
                fullWidth
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                margin="normal"
                error={!!errors.fullName}
                helperText={errors.fullName}
                disabled={activeStep !== 1}
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                margin="normal"
                error={!!errors.email}
                helperText={errors.email}
                disabled={activeStep !== 1}
              />
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                margin="normal"
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={activeStep !== 1}
              />
              <TextField
                fullWidth
                label="Travel Date"
                name="travelDate"
                type="date"
                value={formData.travelDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                margin="normal"
                error={!!errors.travelDate}
                helperText={errors.travelDate}
                disabled={activeStep !== 1}
              />
              <FormControl fullWidth margin="normal" error={!!errors.passengers}>
                <InputLabel>Passengers</InputLabel>
                <Select
                  name="passengers"
                  value={formData.passengers}
                  onChange={handleInputChange}
                  disabled={activeStep !== 1}
                >
                  {[...Array(5)].map((_, i) => (
                    <MenuItem key={i} value={i + 1}>
                      {i + 1}
                    </MenuItem>
                  ))}
                </Select>
                {errors.passengers && <Typography color="error">{errors.passengers}</Typography>}
              </FormControl>
              <FormControl fullWidth margin="normal" error={!!errors.ageGroup}>
                <InputLabel>Age Group</InputLabel>
                <Select
                  name="ageGroup"
                  value={formData.ageGroup}
                  onChange={handleInputChange}
                  disabled={activeStep !== 1}
                >
                  <MenuItem value="Adult">Adult</MenuItem>
                  <MenuItem value="Child">Child</MenuItem>
                  <MenuItem value="Senior">Senior</MenuItem>
                </Select>
                {errors.ageGroup && <Typography color="error">{errors.ageGroup}</Typography>}
              </FormControl>
              {selectedBus && (
                <Box sx={{ mt: 2, p: 2, bgcolor: 'primary.light', borderRadius: 1 }}>
                  <Typography variant="h6">Selected Bus</Typography>
                  <Typography>{selectedBus.name}</Typography>
                  <Typography>
                    From: {selectedBus.from} To: {selectedBus.to}
                  </Typography>
                  <Typography>Departure: {selectedBus.departure}</Typography>
                  <Typography fontWeight="bold">
                    Price: ₹{selectedBus.price}
                  </Typography>
                </Box>
              )}
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleConfirmBooking}
                disabled={activeStep !== 1}
              >
                Confirm Booking
              </Button>
              {activeStep > 0 && (
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleCancelBooking}
                >
                  Cancel Booking
                </Button>
              )}
            </form>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Your Booking</DialogTitle>
        <DialogContent>
          <Typography>Please review your booking details:</Typography>
          <Typography>Name: {formData.fullName}</Typography>
          <Typography>Email: {formData.email}</Typography>
          <Typography>Phone: {formData.phone}</Typography>
          <Typography>Travel Date: {formData.travelDate}</Typography>
          <Typography>Passengers: {formData.passengers}</Typography>
          <Typography>Age Group: {formData.ageGroup}</Typography>
          {selectedBus && (
            <>
              <Typography>Bus: {selectedBus.name}</Typography>
              <Typography>From: {selectedBus.from} To: {selectedBus.to}</Typography>
              <Typography>Departure: {selectedBus.departure}</Typography>
              <Typography>Total Price: ₹{selectedBus.price * formData.passengers}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleFinalConfirmation} color="primary" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          Your booking has been confirmed!
        </Alert>
      </Snackbar>
    </Box>
  );
}

