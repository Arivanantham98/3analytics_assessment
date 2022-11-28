import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './user'
import post from './post'

const reducer = combineReducers({
  user,
  post,
})

const store = configureStore({
  reducer,
})

export default store;