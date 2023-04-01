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

export default Fields

