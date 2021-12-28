import { createSlice, PayloadAction, nanoid, createAsyncThunk, AsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import { Post, PostState } from './post'
import { Reaction } from '../../model/reactions'
import { RootState } from '../../app/store'
import { client } from '../../api/client';

const initialState: PostState = {
    posts: [],
    status: 'idle',
    error: null,
}
export const fetchPosts: AsyncThunk<Post[], void, {}> = createAsyncThunk('posts/fetchPosts', async () => {
    const result = await client.get('fakeApi/posts');
    //console.log("Response", result.data)
    return result.data as Post[];
})

type AddNewPostParams = Pick<Post, 'title' | 'content'> & { user: string };
export const addNewPost = createAsyncThunk('posts/addPost',  async (_post: AddNewPostParams)=> {
    const result = await client.post('fakeApi/posts', _post );
    console.log('addNewPost : ',result)
    return result.data as Post
})

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        //AddPostT Start

        /* addPost: {
            reducer: (
                state: PostState,
                action: PayloadAction<Pick<Post, 'user' | 'title' | 'content'>>
            ) => {
                const { title, content, user } = action.payload
                return {
                    ...state,
                    posts: [
                        ...state.posts,
                        {
                            id: nanoid(),
                            title,
                            content,
                            user,
                            date: new Date().toISOString(),
                            reactions: {
                                thumbsUp: 0,
                                hooray: 0,
                                heart: 0,
                                rocket: 0,
                                eyes: 0,
                            },
                        },
                    ],
                }
            },
            prepare: (title, content, user) => {
                return {
                    payload: { title, content, user },
                }
            },
        }, */
        //AddPostT END

        //UpdatePost Start
        updatePost: {
            reducer: (
                state: PostState,
                action: PayloadAction<Pick<Post, 'id' | 'title' | 'content' | 'user'>>
            ) => {
                const { id, title, content, user } = action.payload
                return {
                    ...state,
                    posts: state.posts.map((post) => {
                        if (post.id === id) {
                            return { ...post, id, title, content, user }
                        }
                        return post
                    }),
                }
            },
            prepare: (postId, title, content, userId) => {
                return {
                    payload: {
                        id: postId,
                        title: title,
                        content: content,
                        user: userId,
                    },
                }
            },
        },
        //UpdatePost END

        //reactionAdded START
        reactionAdded: {
            reducer: (
                state: PostState,
                action: PayloadAction<{ postId: string; reaction: Reaction }>
            ) => {
                const { postId, reaction } = action.payload

                console.log('reactions: ', reaction)
                return {
                    ...state,
                    posts: state.posts.map((post) => {
                        if (post.id === postId) {
                            return {
                                ...post,
                                reactions: {
                                    ...post.reactions,
                                    [reaction]: (post.reactions[reaction] as number) + 1,
                                },
                            }
                        }
                        return post
                    }),
                }
            },
            prepare: (id: string, name: Reaction) => {
                return {
                    payload: { postId: id, reaction: name },
                }
            },
        },
        //reactionAdded END
    },

    extraReducers: (builder: ActionReducerMapBuilder<PostState>) => {
        builder.addCase(fetchPosts.pending.toString(), (state: PostState, action: PayloadAction<PostState>) => {
            return {
                ...state,
                status: 'loading'
            }

        })
        builder.addCase(fetchPosts.fulfilled.toString(), (state: PostState, action: PayloadAction<Post>) => {
            return {
                ...state,
                status: 'succeeded',
                posts: state.posts.concat(action.payload) as Post[]
            }

        })
        builder.addCase(fetchPosts.rejected.toString(), (state: PostState, action: PayloadAction<PostState>) => {
            return {
                ...state,
                status: 'failed',
                error: action.payload.error as string
            }
        })

        //addNewPost
        builder.addCase(addNewPost.fulfilled, (state: PostState , action: PayloadAction<Post>)=> {
            //state.posts.push(action.payload) 
            return {
                ...state,
                status: 'succeeded',
                posts: state.posts.concat(action.payload) as Post[]
            } 
        })
    }
})
export const { /* addPost */ updatePost, reactionAdded} = postSlice.actions
export default postSlice.reducer

//SELECT ALL POST FUNCTION
export const selectAllPostFn = (state: RootState) => state.posts.posts

//SELECT  POST BY ID FUNCTION
export const selectPostByIdFn: (
    state: RootState,
    paramsId: string
) => Post | undefined = (state: RootState, paramsId: string) => state.posts.posts.find((post) => post.id === paramsId)








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
