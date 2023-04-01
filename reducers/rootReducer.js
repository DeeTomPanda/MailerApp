import React from 'react'
import { createSlice } from '@reduxjs/toolkit'

const userDetails=createSlice({
	name:'Details',
	initialState:{
		Name:'',
		Email:'',
		Contact:'',
		Message:''},
	reducers:{
		update(state,action){			//Basically just updates and prints data for now.
			console.log(state,"At reducers")
			const {Name,Email,Contact,Message}=action.payload
			state.Name= Name
			state.Email=Email
			state.Contact=Contact
			state.Message=Message 
		}
	}
})

export const { update }=userDetails.actions
export default userDetails.reducer

