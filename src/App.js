import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Main from './components/Main';
import Navbar from './container/Navbar';
import Types from './container/Types';
import LectureGroup from './container/LectureGroup';
import Lecture from './container/Lecture';
import SnackBar from './components/SnackBar';
import Students from './components/Students';
import Shop from './components/Shop';
import Modal from './container/Modal';
import Bookings from './container/Bookings';
import { darkTheme, lightTheme } from './Theme';
import { getUserFromLocal } from './api';
import { loginUser } from './actions';

const App = () => {
  const [theme, setTheme] = useState(darkTheme);
  const dispatch = useDispatch();

  const handleThemeChange = () => {
    if (theme.palette.type === 'dark') {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  };

  useEffect(() => {
    const user = getUserFromLocal();
    if (user) {
      dispatch(loginUser(user));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Navbar handleThemeChange={handleThemeChange} />
        <Switch>
          <Main>
            <Route path="/" exact>
              <Redirect to="/types" />
            </Route>
            <Route path="/types" exact component={LectureGroup} />
            <Route path="/types/:lectureGroupId" exact component={Types} />
            <Route path="/types/:lectureGroupId/:lectureId" exact component={Lecture} />
            <Route path="/students" exact component={Students} />
            <Route path="/shop" exact component={Shop} />
            <Route path="/bookings" exact component={Bookings} />
          </Main>
        </Switch>
        <Modal />
        <SnackBar />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
};

export default App;
