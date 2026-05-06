import { IUser } from '@/models/user.model'
import { createSlice } from '@reduxjs/toolkit'


// Define a type for the slice state
interface IuserState {
  userData: IUser | null
}

// Define the initial state using that type
const initialState: IuserState = {
  userData: null
}

export const userSlice = createSlice({
  name: 'user',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState, 
  reducers: { //reducers are functions that handle actions and update the state
   setUserData: (state,action)=>{
    state.userData=action.payload //setUserData is a reducer function that takes the current state and an action as parameters. It updates the userData property of the state with the payload of the action, which is expected to be of type IUser.

   }
  },
})

export const { setUserData } = userSlice.actions

// Other code such as selectors can use the imported `RootState` type


export default userSlice.reducer