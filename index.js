/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { NativeBaseProvider } from 'native-base';
import { Provider } from 'react-redux'
import store from './store/store.js'


const RedPositive=()=>{

	return(
		<Provider store={store}>
		   <NativeBaseProvider>
		      <App/>
		   </NativeBaseProvider>
		</Provider>)
}

AppRegistry.registerComponent(appName, () => RedPositive);
