import React from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { add, set } from 'date-fns';
import {
  makeStyles,
  Box,
  Button,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { DateTimePicker } from '@material-ui/pickers';
import {
  snackBar,
  openModal,
  createAppointment,
} from '../actions';

const useStyles = makeStyles(() => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
  },
  select: {
    width: '100%',
  },
  datePicker: {
    width: '100%',
  },
}));

const Booking = ({
  loggedIn,
  lectures,
}) => {
  const [lecture, setLecture] = React.useState('');
  const [openLecture, setOpenLecture] = React.useState(false);
  const [errorLecture, setErrorLecture] = React.useState(false);
  const [selectedDate, handleDateChange] = React.useState(
    set(
      add(new Date(), { days: 1 }), { hours: 9, minutes: 0 },
    ),
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChangeLecture = (event) => {
    setLecture(event.target.value);
    setErrorLecture(false);
  };

  const handleCloseLecture = () => {
    setOpenLecture(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const minutes = selectedDate.getMinutes();
    if (!lecture) {
      setErrorLecture(true);
      return null;
    }
    if (minutes === 0 || minutes === 30) {
      if (!loggedIn) {
        dispatch(openModal('login'));
        dispatch(snackBar('SNACKBAR_ERROR', 'You must be logged in before booking an appointment.'));
      } else {
        const formInputs = {
          start_time: selectedDate,
          lecture_id: lecture,
        };
        dispatch(createAppointment(formInputs));
        setLecture('');
      }
    } else {
      dispatch(snackBar('SNACKBAR_ERROR', 'The minutes in DATE should be 00 or 30.'));
      return null;
    }
    return null;
  };

  const maxDate = add(new Date(), { days: 60 });
  const minDate = add(new Date(), { days: 1 });

  return (
    <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
      <Box
        width="100%"
        mb={2}
      >
        <TextField
          select
          id="demo-controlled-open-select"
          label="Lecture to book"
          open={openLecture}
          onClose={handleCloseLecture}
          value={lecture}
          onChange={handleChangeLecture}
          variant="filled"
          className={classes.select}
          error={errorLecture}
        >
          {lectures.length <= 0 ? (
            <MenuItem value="">
              <em>Loading...</em>
            </MenuItem>
          ) : (
            lectures.map((lecture) => (
              <MenuItem
                key={lecture.id}
                value={lecture.id}
              >
                {lecture.name}
              </MenuItem>
            ))
          )}
        </TextField>
      </Box>
      <Box
        width="100%"
        mb={2}
      >
        <DateTimePicker
          dateRangeIcon
          maxDate={maxDate}
          minDate={minDate}
          minDateMessage="Appointments can be booked starting from tomorrow."
          disablePast
          value={selectedDate}
          onChange={handleDateChange}
          label="Pick a Date"
          className={classes.datePicker}
          inputVariant="filled"
          minutesStep={30}
        />
      </Box>
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Book Now
      </Button>
    </form>
  );
};

Booking.propTypes = {
  lectures: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      img_thumb: PropTypes.string,

      lecture: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ).isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

export default Booking;
