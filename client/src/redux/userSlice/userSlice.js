import { createSlice } from '@reduxjs/toolkit'

const initialState={
    currentUser:null,
    loading:null,
    error:null
};



const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true;
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
            console.log("success");
        },
        signInFailures:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
            

        },
        updateUserStart:(state)=>{
             state.loading=true;
        },
        updateUserSuccess:(state,action)=>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        updateUserFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;

        }
    }
});


export const {signInStart,signInSuccess,signInFailures,updateUserStart,updateUserSuccess,updateUserFailure}=userSlice.actions;
export default userSlice.reducer;