import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { User } from "./userType";
import { RootState } from '../../app/store';

const users: User[] = [] 
export const fetchUsers = createAsyncThunk('users/fetchUsers', async ()=>{
    const response = await client.get('/fakeApi/users');
    console.log("Users: ", response)
    return response.data as User[];
})
const usersSlice = createSlice({
    name: "users",
    initialState: users,
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled , (state: User[] , action: PayloadAction<User[]>)=>{
            return action.payload;
        })
    }
})

export default usersSlice.reducer;

export const selectAllUsers = (state: RootState) => state.users;
export const selectUserById = (state: RootState, userId:string) => state.users.find( (user:User) =>
                               user.id === userId)