import { configureStore } from '@reduxjs/toolkit'
import postsReducer from "../features/posts/postSlice";
export const store =  configureStore({
  reducer: {
    posts: postsReducer
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type Dispatch = typeof store.dispatch;