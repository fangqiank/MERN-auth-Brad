import {configureStore} from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import {apiSlice} from './slices/apiSlice'

const store = configureStore({
	reducer: {
		user: apiSlice.reducer,
		auth: authReducer
	},
	
	middleware: getDefaultMiddelware => 
		getDefaultMiddelware().concat(apiSlice.middleware),
	
	devTools: true
})

export default store