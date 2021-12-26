import { createAsyncThunk} from "@reduxjs/toolkit"
import { client } from "../api/client";


export const fetchAllPost = createAsyncThunk("posts/fetchAllPosts",async () => {
    const response = await client.get('/fakeApi/posts');
    return response.data 
});