import { createSlice } from '@reduxjs/toolkit'
import { nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
export interface IPostsData {
    id: number | string
    title: string
    content: string
    userId: string
    date: Date | string
    reactions?: {
        [index: string]: number | undefined;
        thumbsUp?: number
        hooray?: number
        heart?: number
        rocket?: number
        eyes?: number
    }
}

export interface IInitialStateData {
    postsData: IPostsData[]
}
export interface IPREPARE {
    payload: {
        id: string | number
        title: any
        content: any
        userId: any
        date?: Date | string
        meta?: string
        error?: boolean,
        reactions?: {
            [index: string]: number | undefined;
            thumbsUp?: number
            hooray?: number
            heart?: number
            rocket?: number
            eyes?: number
        }
    }
}

export interface IAddReducer {
    postsData: IPostsData[]
}
interface IAction {
    payload: {
        id: number | string
        title: string
        content: string
        userId: string
        date?: Date | string,
        reactions?: {
            [index: string]: number | undefined;
            thumbsUp?: number
            hooray?: number
            heart?: number
            rocket?: number
            eyes?: number
        }
    }
}

export interface IPREPARE_REACTION {
    payload: {
        postId: string;
        reactionName: string
    }
}

interface IACTION_REACTION {
    payload: {
        postId: string;
        reactionName: string
    }
}

const initialState: IInitialStateData = {
    postsData: [
        {
            id: 1,
            title: 'first post',
            content: 'Hello',
            userId: '',
            date: sub(new Date(), { minutes: 10 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            }
        },
        {
            id: 2,
            title: 'second post',
            content: 'Hello Text',
            userId: '',
            date: sub(new Date(), { minutes: 5 }).toISOString(),
            reactions: {
                thumbsUp: 0,
                hooray: 0,
                heart: 0,
                rocket: 0,
                eyes: 0,
            }
        },
    ],
}

export const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        /*/----------- AddPost START-------------/*/
        addPost: {
            reducer: (state: IInitialStateData, action: IAction): IAddReducer => {
                const { id, title, content, userId, date, reactions } = action.payload;
                return {
                    ...state,
                    postsData: [
                        ...state.postsData,
                        { id, title, content, userId, date: date ? date : ' ', reactions },
                    ],
                }
            },
            prepare: (title: string, content: string, userId: string): IPREPARE => {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        userId,
                        date: new Date().toISOString(),
                        meta: ' Additional Information ',
                        error: false,
                        reactions: {
                            thumbsUp: 0,
                            hooray: 0,
                            heart: 0,
                            rocket: 0,
                            eyes: 0,
                        }
                    },
                }
            },
        },
        /*/----------- AddPost END -------------/*/

        /*/----------- UpdatePost START-------------/*/
        updatePost: {
            reducer: (state: IInitialStateData, action: IAction): IAddReducer => {
                const { id, title, content, userId } = action.payload
                return {
                    ...state,
                    postsData: state.postsData.map((post) => {
                        if (post.id === id) {
                            return { ...post, id, title, content, userId }
                        }
                        return post
                    }),
                }
            },
            prepare: (id: string, title: string, content: string, userId: string): IPREPARE => {
                return {
                    payload: { id, title, content, userId, meta:"", error: false },
                }
            },
        },

        /*/----------- UpdatePost END-------------/*/

        /*/----------- ReactionsAdded START-------------/*/
        reactionsAdded: {
            reducer: (state: IInitialStateData, action: IACTION_REACTION) => {
                const { postId, reactionName } = action.payload;
                return {
                    ...state,
                    postsData: state.postsData.map(post => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                reactions: {
                                    ...post.reactions,
                                    [reactionName]: (post.reactions?.[reactionName] as number) + 1
                                }
                            }
                        }
                        return post
                    })
                }

            },
            prepare: (postId: string, reactionName: string): IPREPARE_REACTION => {
                return {
                    payload: { postId, reactionName }
                }
            }
        },
        /*/----------- ReactionsAdded END-------------/*/
    },
})
export const { addPost, updatePost, reactionsAdded } = postSlice.actions;
export default postSlice.reducer;

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
