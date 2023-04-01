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
import styles from './../styles/App.scss'

const Fields=({formik})=>{
	//The 4 fields and its config

	const fields=['Name','Email','Message','Contact']

	return(<>
		<KeyboardAwareScrollView enableOnAndroid={true} enableAutomaticScroll={false} 
		 extraScrollHeight={200} extraHeight={80}>
		<VStack mt='10' w='100%' justifyContent='space-evenly'>
		  {
		   fields.map((v,i)=>{
			  return(
				  <Box p='1' w='100%' h='35%' my='10' key={i}>
			  	     <Text style={styles.text}>{v}</Text>
				     {v==="Message"?
				     (<TextArea value={formik.values[v]} color='#fff' fontWeight='bold' fontSize='15' 
				       h='55%'  w='90%' onChangeText={(ch)=>formik.setFieldValue(v,ch)}/>):
			             (<Input value={formik.values[v]} color='#fff' fontWeight='bold' fontSize='15' 
				        keyboardType={v==="Contact"?"numeric":"default"} 
					style={styles.placeholder} w='90%' 
				       onChangeText={(ch)=>formik.setFieldValue(String(v),ch)}
				       onBlur={()=>formik.setFieldTouched(v,true)}
				       variant='underlined' placeholder={v} placeholderTextColor='#fff'
				       focusOutlineColor='#0b2477'/>)}
				     {formik.touched[v] && formik.errors[v]?
				     (<Text style={{color:'#fff',fontWeight:'bold'}}>{formik.errors[v]}</Text>):null}
				  </Box>
			  	)
		  	})
		  }
		</VStack>
		</KeyboardAwareScrollView>
		</>)
}

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
		axios.post('http://10.0.2.2:8005/getUserDetails',data)
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
		         <Button onPress={()=>formik.resetForm({values:{
				 Email:'',Message:'',Name:'',Contact:''}})} 
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
