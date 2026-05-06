import { configureStore } from '@reduxjs/toolkit'
// ...
import userReducer from './userSlice'

export const store = configureStore({
  reducer: {

    user: userReducer,

  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
/*| Code                       | Meaning                    |
| -------------------------- | -------------------------- |
| configureStore             | creates Redux store        |
| userReducer                | manages user data          |
| reducer:{user:userReducer} | adds user section in store |
| RootState                  | type of full store         |
| AppDispatch                | type of dispatch function  |
STORE
│
├── user
│     ├── name
│     ├── email
│     └── isLoggedIn*/