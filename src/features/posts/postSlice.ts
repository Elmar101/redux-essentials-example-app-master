import { createSlice } from "@reduxjs/toolkit";
export interface IPostsData {
    id: number | string, title: string, content: string
}
export interface IInitialStateData {
    postsData: IPostsData[];
}

interface IAction {
    payload: {id: number | string, title: string, content: string };
}

const initialState: IInitialStateData = {
    postsData: [
        { id: 1, title: "first post", content: "Hello" },
        { id: 2, title: "second post", content: "Hello Text" }
    ]
}

export const postSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {
        addPost: (state: IInitialStateData, action:IAction) => {
            return {
                ...state,
                postsData:[
                    ...state.postsData,
                    {
                        id: action.payload.id,
                        title: action.payload.title,
                        content: action.payload.content
                    }
                ]
            }
        }
    }
})
export const { addPost } = postSlice.actions;
export default postSlice.reducer;