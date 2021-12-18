import { createSlice } from '@reduxjs/toolkit'
export interface IPostsData {
  id: number | string
  title: string
  content: string
}
export interface IInitialStateData {
  postsData: IPostsData[]
}

interface IAction {
  payload: { id: number | string; title: string; content: string }
}

const initialState: IInitialStateData = {
  postsData: [
    { id: 1, title: 'first post', content: 'Hello' },
    { id: 2, title: 'second post', content: 'Hello Text' },
  ],
}

export const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    addPost: (state: IInitialStateData, action: IAction) => {
      return {
        ...state,
        postsData: [
          ...state.postsData,
          {
            id: action.payload.id,
            title: action.payload.title,
            content: action.payload.content,
          },
        ],
      }
    },

    updatePost: (state: IInitialStateData, action: IAction) => {
      const { id, title, content } = action.payload
      const existingPostData: IPostsData | undefined = state.postsData.find(
        (post) => post.id == id
      )

      /*  if(existingPostData){
                existingPostData.title = title;
                existingPostData.content = content;
            } */
      return {
        ...state,
        postsData: existingPostData
          ? state.postsData.map((post) => {
              if (existingPostData) {
                return { ...post, id: id, title: title, content: content }
              }
              return post
            })
          : [...state.postsData],
      }
    },
  },
})
export const { addPost, updatePost } = postSlice.actions
export default postSlice.reducer

//map bize yeni state verir 
//immer ise yox
