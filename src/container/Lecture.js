import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
} from '@material-ui/core';
import { GrCaretPrevious } from 'react-icons/gr';
import { fetchAllLectures } from '../actions';

const useStyles = makeStyles(() => ({
  colorPicker: {
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: 'rgba(0,0,0,.1)',
      outline: '1px solid slategrey',
    },
  },
  tridi: {
    objectFit: 'contain',
    maxHeight: '50vw',
    '& div': {
      minWidth: '100%',
    },
  },
  hideLoading: {
    display: 'none',
  },
  showLoading: {
    width: '60%',
    height: '16px',
    position: 'absolute',
    bottom: '-80px',
  },
  colorPickerColor: {
    cursor: 'pointer',
  },
  showLoadingText: {
    width: '60%',
    position: 'absolute',
    bottom: '-80px',
  },
  title: {
    top: '-8rem',
  },

}));

const Models = () => {
  const { lectureId } = useParams();
  const lectureIdParam = parseInt(lectureId, 10);
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  const classes = useStyles();
  const currentLecture = lectures.filter((lecture) => lecture.id === lectureIdParam)[0];
  const [setImagesArray] = React.useState([]);

  React.useEffect(() => {
    if (lectures.length <= 0) {
      dispatch(fetchAllLectures());
    } else {
      setImagesArray.push(currentLecture.img_thumb);
    }
  }, [loading]);

  if (!loading) {
    return (
      <Box
        pt={8}
        position="relative"
        minWidth="0"
        maxWidth="100vw"
        maxHeight="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Box
          width="90%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100%"
          flexDirection="column"
          position="relative"
        >
          <Box
            position="absolute"
            textAlign="center"
            justifySelf="flex-start"
            className={classes.title}
          >
            <Box fontWeight={500} fontSize="h3.fontSize">
              {currentLecture.name}
            </Box>
          </Box>

        </Box>
        <Box
          display="flex"
          flexDirection="column"
          width="10vw"
          minWidth="10rem"
          maxHeight="90vh"
          overflow="auto"
          mt={-4}
          p={1}
          className={classes.colorPicker}
        />
        <Link to={`/types/${currentLecture.group[0].id}`}>
          <div className="swiperPrevious backToModels">
            <GrCaretPrevious />
          </div>
        </Link>
      </Box>
    );
  }

  return '';
};

export default Models;
