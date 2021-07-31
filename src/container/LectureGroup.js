/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import {
  useSelector,
  useDispatch,
} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation } from 'swiper/core';
import Skeleton from '@material-ui/lab/Skeleton';
import { GrCaretNext, GrCaretPrevious } from 'react-icons/gr';
import { fetchLectureGroups, fetchAllLectures } from '../actions';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.scss';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    padding: '0',
    height: '100vh',
    maxWidth: '100vw',
    justifySelf: 'center',
    minWidth: '0',
  },
  swiperWrapper: {
    maxWidth: '100%',
    padding: '0 4rem',
    position: 'relative',
  },
  titleHr: {
    border: 'dotted 5px',
    width: '10%',
    borderStyle: 'none none dotted none',
    color: 'grey',
    opacity: '30%',
    marginTop: '2rem',
    marginBottom: '1rem',
  },
  lectureHr: {
    border: 'dotted 5px',
    width: '30%',
    borderStyle: 'none none dotted none',
    color: 'grey',
    opacity: '30%',
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  link: {
    textDecoration: 'none',
    color: theme.palette.text.primary,
  },

}));

SwiperCore.use([Navigation]);

const LectureGroup = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { loading, lectureGroups } = useSelector((state) => state.lectureGroup);

  React.useEffect(() => {
    if (loading) {
      dispatch(fetchLectureGroups());
      dispatch(fetchAllLectures());
    }
  }, []);

  return (
    <div className={classes.wrapper}>
      <Typography variant="h3">
        What kind of lectures do you prefer?
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Select from any of the Options
      </Typography>
      <hr className={classes.titleHr} />
      <div className={classes.swiperWrapper}>
        <Swiper
          className="mySwiper"
          slidesPerView={1}
          spaceBetween={0}
          resizeObserver
          navigation={{
            nextEl: '.swiperNext',
            prevEl: '.swiperPrevious',
          }}
          breakpoints={{
            1025: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
        >
          {
            loading
              ? (
                <>
                  <SwiperSlide>
                    <Skeleton variant="rect" width="100%" height={400} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Skeleton variant="rect" width="100%" height={400} />
                  </SwiperSlide>
                  <SwiperSlide>
                    <Skeleton variant="rect" width="100%" height={400} />
                  </SwiperSlide>
                </>
              )
              : (
                lectureGroups.map((lectureGroup) => (
                  <SwiperSlide key={lectureGroup.id} style={{ width: '100%', position: 'relative' }}>
                    <Link to={`types/${lectureGroup.id}`} className={classes.link}>
                      <img src={lectureGroup.img_thumb} alt={lectureGroup.name} style={{ width: '100%' }} />
                      <Typography variant="h4" align="center" style={{ position: 'absolute', top: '10px', left: '10px' }}>
                        {lectureGroup.shortname}
                      </Typography>
                    </Link>
                    <Typography variant="h5" align="center" gutterBottom>
                      {lectureGroup.name}
                    </Typography>
                    <hr className={classes.lectureHr} />
                    <Typography variant="subtitle2" align="center">
                      {lectureGroup.description}
                    </Typography>
                  </SwiperSlide>
                ))
              )
          }
        </Swiper>
        <div className="swiperNext">
          <GrCaretNext />
        </div>
        <div className="swiperPrevious">
          <GrCaretPrevious />
        </div>
      </div>
    </div>

  );
};

export default LectureGroup;
