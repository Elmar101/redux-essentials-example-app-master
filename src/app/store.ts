import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "../features/posts/postSlice";
import usersReducer from "../features/users/usersSlice";

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;

export const store =  configureStore({
  reducer: {
    posts: postsReducer,
    users: usersReducer
  },
})



export const postsState = (state: RootState ) => state.posts;
export const postsStateData = (state: RootState ) => state.posts.postsData;
export const usersState = (state: RootState ) => state.users;