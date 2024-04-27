import { configureStore } from '@reduxjs/toolkit';
import User from './User';
import Diagram from './Diagram';
import Process from './Process';
import Step from './Step';

export const store = configureStore({
  reducer: {
    User,
    Diagram,
    Process,
    Step,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
