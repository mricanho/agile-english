import * as actions from '../actions';
import * as types from '../actions/types';

describe('Lectures actions', () => {
  it('should create an action to create Cars', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.SET_LECTURES,
      payload: obj,
    };
    expect(actions.createLectures(obj)).toEqual(expectedAction);
  });
  it('should create an action to create Appointments', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.SET_APPOINTMENTS,
      payload: obj,
    };
    expect(actions.createAppointments(obj)).toEqual(expectedAction);
  });
  it('should create an action to delete all Appointments', () => {
    const expectedAction = {
      type: types.DELETE_ALL_APPOINTMENTS,
    };
    expect(actions.deleteAllAppointments()).toEqual(expectedAction);
  });
  it('should create an action to delete all Appointments', () => {
    const expectedAction = {
      type: types.LOADING_APPOINTMENTS,
    };
    expect(actions.loadingAppointments()).toEqual(expectedAction);
  });
  it('should create an action to toggle uiDrawer', () => {
    const expectedAction = {
      type: types.DRAWER_TOGGLE,
    };
    expect(actions.toggleDrawer()).toEqual(expectedAction);
  });
  it('should create an action to create Lecture Groups', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.SET_LECTURE_GROUPS,
      payload: obj,
    };
    expect(actions.createLectureGroups(obj)).toEqual(expectedAction);
  });
  it('should create an action to create LoginUser', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.LOGIN_USER,
      payload: obj,
    };
    expect(actions.loginUser(obj)).toEqual(expectedAction);
  });
  it('should create an action to create LogOut User', () => {
    const expectedAction = {
      type: types.LOGOUT_USER,
    };
    expect(actions.logOutUser()).toEqual(expectedAction);
  });
  it('should create an action to create uiCloseModal', () => {
    const expectedAction = {
      type: types.MODAL_CLOSE,
    };
    expect(actions.closeModal()).toEqual(expectedAction);
  });
  it('should create an action to create uiOpenModal', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.MODAL_OPEN,
      payload: obj,
    };
    expect(actions.openModal(obj)).toEqual(expectedAction);
  });
  it('should create an action to create FormError', () => {
    const obj = { test: 'test' };
    const expectedAction = {
      type: types.FORM_ERROR,
      payload: obj,
    };
    expect(actions.formError(obj)).toEqual(expectedAction);
  });
  it('should create an action with different type to create SnackBar with Message', () => {
    const message = 'Everything perfect';
    const expectedAction = {
      type: types.SNACKBAR_ERROR,
      payload: message,
    };
    expect(actions.snackBar(types.SNACKBAR_ERROR, message)).toEqual(expectedAction);
  });
});
