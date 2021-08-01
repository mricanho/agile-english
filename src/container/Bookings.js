import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  makeStyles,
  Box,
  Button,
} from '@material-ui/core';
import Divider from '@material-ui/core/Divider';
import {
  fetchAllLectures,
  fetchAppointments,
} from '../actions';
import Booking from '../components/Booking';
import AppointmentsTable from '../components/AppointmentsTable';
import Teach from '../assets/teach.png';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#373485',
    zIndex: '0',
    '&::after': {
      content: '""',
      position: 'fixed',
      width: '100%',
      height: '100%',
      opacity: '0.1',
      backgroundColor: '#96BF01',
      backgroundImage: `url(${Teach})`,
      backgroundSize: '100%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right bottom',
      zIndex: '-1',
    },
  },
}));

const Bookings = () => {
  const { loggedIn } = useSelector((state) => state.user);
  const { appointments } = useSelector((state) => state.appointments);
  const { lectures } = useSelector((state) => state.lectures);
  const dispatch = useDispatch();
  const classes = useStyles();

  const [showAppointments, setShowAppointments] = React.useState(false);

  React.useEffect(() => {
    if (lectures.length <= 0) {
      dispatch(fetchAllLectures());
    }
    if (loggedIn && appointments.length <= 0) {
      dispatch(fetchAppointments());
    }
  }, [loggedIn]);

  return (
    <Box
      p={8}
      position="relative"
      minWidth="0"
      maxWidth="100vw"
      height="100vh"
      maxHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      className={classes.container}
      color="white"
    >
      {appointments.length <= 5 ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          zIndex="9"
          width="80%"
        >
          <Box
            fontSize={30}
            letterSpacing={5}
            mb={4}
            zIndex="10"
          >
            BOOK YOUR LESSON TODAY
          </Box>
          <Divider width="100%" />
          <Box
            my={2}
            fontSize={15}
            maxWidth="100%"
            textAlign="center"
          >
            We have more than 250 teachers around the world!
            <br />
            The best certifications are here, you are gonna be native in no time!
            <br />
            For Booking a Lesson use this form &#8595;
          </Box>
          {showAppointments ? (
            <>
              <Box mb={2}>
                <Button onClick={() => setShowAppointments(false)} variant="contained" color="secondary">
                  Back to form
                </Button>
              </Box>
              <AppointmentsTable appointments={appointments} />
            </>
          ) : (
            <Booking loggedIn={loggedIn} lectures={lectures} />
          )}
        </Box>
      ) : (
        <Box maxWidth="80%">
          <Box mb={2} color="secondary" textAlign="center" fontSize={25}>
            You have exceeded the maximum appointments for this period of time.
          </Box>
          <Box mb={2} color="secondary" textAlign="center" fontSize={15}>
            Current appointments:
          </Box>
          <AppointmentsTable appointments={appointments} />
        </Box>
      )}
      {appointments.length > 0 && !showAppointments ? (
        <Box my={2}>
          <Button onClick={() => setShowAppointments(true)} variant="contained" color="secondary">
            Show Appointments
          </Button>
        </Box>
      ) : null}
    </Box>
  );
};

export default Bookings;
