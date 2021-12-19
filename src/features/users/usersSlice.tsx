import {createSlice} from "@reduxjs/toolkit";

export interface IInitialUserState {
    id: number;
    name: string;
}

const initialUserState: IInitialUserState[] = [
    {id: 0, name: "Ali Reshidov"},
    {id:1 , name: "Ceyhun Almazzade"},
    {id:2 , name: "Elmar Amanov"}
] 

const usersSlice = createSlice({
    name: "users",
    initialState: initialUserState,
    reducers:{}
})

export default usersSlice.reducer;