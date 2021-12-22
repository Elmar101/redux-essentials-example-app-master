import { createSlice } from '@reduxjs/toolkit';
import { nanoid } from "@reduxjs/toolkit";
import { sub } from "date-fns";
export interface IPostsData {
    id: number | string
    title: string
    content: string,
    userId: string,
    date: Date | string
}

export interface IInitialStateData {
    postsData: IPostsData[]
}
export interface IPREPARE {
    payload: {
        id: string | number;
        title: any;
        content: any;
        userId: any;
        date?: Date | string;
        meta?: string;
        error?: boolean;
    }
}

export interface IAddReducer {
    postsData: IPostsData[];
}
interface IAction {
    payload: { id: number | string; title: string; content: string; userId: string, date?: Date | string }
}

const initialState: IInitialStateData = {
    postsData: [
        { id: 1, title: 'first post', content: 'Hello', userId: "", date: sub(new Date(), { minutes: 10 }).toISOString() },
        { id: 2, title: 'second post', content: 'Hello Text', userId: "", date: sub(new Date(), { minutes: 5 }).toISOString() },
    ],
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        addPost: {
            reducer: (state: IInitialStateData, action: IAction): IAddReducer => {
                const { id, title, content, userId, date } = action.payload;
                return {
                    ...state,
                    postsData: [
                        ...state.postsData,
                        { id, title, content, userId, date: date ? date : " " },
                    ],
                }
            },
            prepare: (title, content, userId): IPREPARE => {
                return {
                    payload: { id: nanoid(), title, content, userId, date: new Date().toISOString(), meta: " Additional Information ", error: false }
                }
            }
        },

        updatePost: {
            reducer: (state: IInitialStateData, action: IAction): IAddReducer => {
                const { id, title, content, userId } = action.payload;
                return {
                    ...state,
                    postsData: state.postsData.map((post) => {
                        if (post.id.toString() === id.toString()) {
                            return { ...post, id, title, content, userId }
                        }
                        return post
                    })
                }
            },
            prepare: (id, title, content, userId): IPREPARE => {
                return {
                    payload: { id, title, content, userId }
                }
            }
        }
    },
})
export const { addPost, updatePost } = postSlice.actions
export default postSlice.reducer

//map bize yeni state verir
//immer ise yox

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

/* updatePost: (state: IInitialStateData, action: IAction) => {
            const { id, title, content } = action.payload;
            // 
              const existingPostData: IPostsData | undefined = state.postsData.find(
                  (post) => post.id == id
              )
      
             if(existingPostData){
                      existingPostData.title = title;
                      existingPostData.content = content;
              } 
              //
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
        }, */

