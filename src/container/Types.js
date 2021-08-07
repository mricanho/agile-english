import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import {
  makeStyles,
  Box,
  Button,
  Paper,
} from '@material-ui/core';
import { GrCaretPrevious } from 'react-icons/gr';
import { fetchAllLectures, fetchLectureGroups } from '../actions';

const useStyles = makeStyles((theme) => ({
  carHolder: {
    '&:not(:last-child)': {
      marginBottom: theme.spacing(12),
    },
  },
  imgLink: {
    display: 'flex',
    justifyContent: 'center',
  },

}));

const Types = () => {
  const { lectureGroupId } = useParams();
  const lectureGroupIdParam = parseInt(lectureGroupId, 10);
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lectures);
  const { lectureGroups } = useSelector((state) => state.lectureGroups);
  const classes = useStyles();
  const currentLectures = lectures.filter((lecture) => lecture.group[0].id === lectureGroupIdParam);
  const currentGroup = lectureGroups.filter((group) => group.id === lectureGroupIdParam);
  React.useEffect(() => {
    if (loading) {
      dispatch(fetchLectureGroups());
      dispatch(fetchAllLectures());
    }
  }, []);
  return (
    <Box
      pt={30}
      pb={8}
      position="relative"
      minWidth="0"
      maxWidth="100vw"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box position="absolute" top="0" pt={6} textAlign="center" justifySelf="flex-start">
        <Box mb={2} mx={4} fontWeight={500} fontSize="h3.fontSize">
          {currentGroup[0] ? currentGroup[0].name : '' }
        </Box>
        <Box fontWeight={500} fontSize="subtitle1" textAlign="center">
          {currentGroup[0] ? currentGroup[0].description : '' }
        </Box>
      </Box>
      <Box
        width="100%"
      >

        {currentLectures.map((lecture) => (
          <Paper
            key={lecture.id}
            className={classes.carHolder}
            elevation={3}
          >
            <Box
              display="flex"
              direction="row"
              justifyContent="space-around"
              alignItems="stretch"
              width="100%"
              ml="auto"
              p={2}
            >
              <Box display="flex" justifyContent="center" width="40%">
                <Link to={`/types/${lectureGroupId}/${lecture.id}`} className={classes.imgLink}>
                  <img src={lecture.img_thumb} alt={lecture.name} style={{ objectFit: 'contain', width: '100%' }} />
                </Link>
              </Box>
              <Box width="30%">
                <Box mb={2} fontWeight={500} fontSize="h6.fontSize">
                  {lecture.name}
                </Box>
              </Box>
              <Box justifySelf="flex-end" width="20%">
                <Button variant="contained" color="secondary" component={Link} to="/bookings">
                  Make an appointment
                </Button>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
      <Link to="/types">
        <div className="swiperPrevious backToModels">
          <GrCaretPrevious />
        </div>
      </Link>

    </Box>
  );
};

export default Types;
