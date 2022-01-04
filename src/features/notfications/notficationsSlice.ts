import { createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
import { client } from '../../api/client';
import { RootState } from '../../app/store';
import { Notfication } from './notificationsState';

const initialNotfications: Notfication[] = [];

export const fetchNotfications = createAsyncThunk('notfications/fetchNotfications',async (_ , {getState}) => {
    const allNotfications = selectAllNotficationFn( getState() as any );
    const [latesNotfications] = allNotfications as any;
    const latestTimestamp = latesNotfications ? latesNotfications.date : '';
    const result = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`);
    return result.data as Notfication[]
    
})
const notfcationsSlice = createSlice({
    name: 'notfications',
    initialState: initialNotfications,
    reducers:{
        allNotficationsRead:(state: Notfication[])=>{
           let readNotfications = state.map(st=> {
               return {
                   ...st,
                   read: true
               }
           })
           return readNotfications
          // state.forEach(st=> st.read = true)
        }
    },
    extraReducers: (builder) => {
        builder.addCase( fetchNotfications.fulfilled , (state: Notfication[] , action: PayloadAction<Notfication[]>)=>{
            return state.concat(...action.payload).sort((a,b)=> b.date.localeCompare(a.date));
        })
    }

})
//Reducer Actions
export const { allNotficationsRead } = notfcationsSlice.actions ;

export default notfcationsSlice.reducer;

// Selectors
export const selectAllNotficationFn = (state: RootState) => state.notfications;