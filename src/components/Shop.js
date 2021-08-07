import React from 'react';
import {
  makeStyles,
  Box,
} from '@material-ui/core';
import Student from '../assets/student.png';

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: '#FFB421',
    color: 'white',
    '&::after': {
      content: '""',
      position: 'fixed',
      width: '100%',
      height: '100%',
      opacity: '0.1',
      backgroundImage: `url(${Student})`,
      backgroundSize: '50%',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right bottom',
      color: 'white',
    },
  },
}));

const Shop = () => {
  const classes = useStyles();
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
      className={classes.container}
      fontSize={30}
    >
      COMMING SOON
    </Box>
  );
};

export default Shop;
