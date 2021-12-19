import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from "@reduxjs/toolkit";
export interface IPostsData {
    id: number | string
    title: string
    content: string
}
export interface IInitialStateData {
    postsData: IPostsData[]
}
export interface IPREPARE {
        payload: {
            id: string;
            title: any;
            content: any;
            meta?: string;
            error?: boolean;
        } 
}

export interface IAddReducer {
    postsData: IPostsData[];
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
        /*  addPost: (state: IInitialStateData, action: IAction) => {
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
         }, */

        addPost: {
            reducer: (state: IInitialStateData, action: IAction): IAddReducer => {
                const { id, title, content } = action.payload;
                return {
                    ...state,
                    postsData: [
                        ...state.postsData,
                        { id, title, content },
                    ],
                }
            },
            prepare: (title, content): IPREPARE => {
                return {
                    payload: { id: nanoid(), title, content, meta: " Additional Information ", error: false }
                }
            }
        },

        updatePost: (state: IInitialStateData, action: IAction) => {
            const { id, title, content } = action.payload;
            /* 
              const existingPostData: IPostsData | undefined = state.postsData.find(
                  (post) => post.id == id
              )
      
             if(existingPostData){
                      existingPostData.title = title;
                      existingPostData.content = content;
              } 
              */
            return {
                ...state,
                postsData: state.postsData.map((post) => {
                    // console.log("b=",post.id.toString()===id.toString())
                    if (post.id.toString() === id.toString()) {
                        return { ...post, id: id, title: title, content: content }
                    }
                    return post
                })
            }
        },
    },
})
export const { addPost, updatePost } = postSlice.actions
export default postSlice.reducer

//map bize yeni state verir
//immer ise yox
