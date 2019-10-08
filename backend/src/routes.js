import { Router } from 'express';
import multer from 'multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import MeetappController from './app/controllers/MeetappController';
import SubscriptionController from './app/controllers/SubscriptionController';
import NotificationController from './app/controllers/NotificationController';
import OrganizerController from './app/controllers/OrganizerController';

import authMiddleware from './app/middlewares/auth';

import validateUserStore from './app/validators/UserStore';
import validateUserUpdate from './app/validators/UserUpdate';
import validateSessionStore from './app/validators/SessionStore';
import validateMeetappStoreUpdate from './app/validators/MeetappStoreUpdate';

import multerConfig from './config/multer';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', validateUserStore, UserController.store);
routes.post('/sessions', validateSessionStore, SessionController.store);

routes.use(authMiddleware);

routes.put('/users', validateUserUpdate, UserController.update);

routes.post('/files', upload.single('file'), FileController.store);

routes.get('/meetapps', MeetappController.index);
routes.post('/meetapps', validateMeetappStoreUpdate, MeetappController.store);
routes.put(
  '/meetapps/:id',
  validateMeetappStoreUpdate,
  MeetappController.update
);
routes.delete('/meetapps/:id', MeetappController.delete);

routes.get('/subscriptions', SubscriptionController.index);
routes.post('/meetapps/:meetappId/subscriptions', SubscriptionController.store);
routes.delete('/subscriptions/:id', SubscriptionController.delete);

routes.get('/notifications', NotificationController.index);
routes.put('/notifications/:id', NotificationController.update);

routes.get('/organizer', OrganizerController.index);

export default routes;
