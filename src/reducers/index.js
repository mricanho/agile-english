/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { combineReducers } from 'redux';
import adminReducer from './admin';
import uiSnackbarReducer from './uiSnackbar';
import userReducer from './user';
import uiModalReducer from './uiModal';
import lectureReducer from './lecture';
import uiDrawerReducer from './uiDrawer';
import appointmentsReducer from './appointments';

const rootStore = combineReducers({
  admin: adminReducer,
  lectures: lectureReducer,
  uiSnackBar: uiSnackbarReducer,
  uiModal: uiModalReducer,
  uiDrawer: uiDrawerReducer,
  user: userReducer,
  appointments: appointmentsReducer,
});

export default rootStore;
