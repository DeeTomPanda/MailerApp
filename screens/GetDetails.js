import React from 'react'
import {
	Center,
	Box,
	VStack,
	HStack,
	Input,
	TextArea,
	Button,
	Flex,
} from 'native-base'
import {
	ScrollView,
	Text,
	View,
	Keyboard
} from 'react-native'
import axios from 'axios'
import { useFormik } from 'formik'
import { API } from '@env'
import * as Yup from 'yup'
import {
	useDispatch,
	useSelector
} from 'react-redux'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import { update } from './../reducers/rootReducer'
import Fields from './Fields'
import styles from './../styles/App.scss'

console.log(API)

const GetDetails=()=>{

	const initialState=useSelector(state=>state)
	console.log(initialState)	//logs the redux state
	const dispatch=useDispatch()

	const [details,setDetails]=React.useState(initialState)
	const validationSchema=Yup.object().shape({
		Name:Yup.string().required(),
		Email:Yup.string().email().required(),
		Message:Yup.string().required(),
		Contact:Yup.string().min(10).max(10).required()})

	const onSubmit=(data)=>{
		axios.post(`${API}`,data)
		.then((res)=>console.log(res.data),(err)=>console.log(err))
		dispatch(update(data))}	

	const formik=useFormik({
		initialValues:{
			Email:'',
			Name:'',
			Message:'',
			Contact:''
		},
		onSubmit,
		validationSchema})

	return(
		<Box h='100%' w='100%' bg='#0B2447' >
		   <Box bg='#EA5455' mx='auto' my='auto' h='80%' width='80%' borderStyle='solid' 
		    borderWidth='10px'  borderColor='#F7DB6A' p='2' pt='-2' borderRadius='md'>
	              <Text style={styles.head}>{"Contact Us"}</Text>
		         <VStack m='auto' justifyContent='space-evenly' pt='-2'  h='70%' w='100%'>
		            <Fields formik={formik}/>
		         </VStack>
		         <Button onPress={()=>{
				 formik.resetForm({
				 values:{
				    Email:'',Message:'',Name:'',Contact:''}
			 	})
				Keyboard.dismiss()}
			 } 
				bg='#FACC15' w='30%' 
		          _text={{color:'black'}}>
		            Reset
		         </Button>
		   </Box>		
		   <Button onPress={()=>{
			    Keyboard.dismiss()
		   	    formik.handleSubmit()}
		    } mx='auto' bg='#FACC15' w='30%' 
		    _text={{color:'black'}} mb='15'>
		    Send
		   </Button>
		</Box>)
}

export default GetDetails
