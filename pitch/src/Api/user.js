import axios from 'axios';
import Constants from "expo-constants";
const {manifest} = Constants

export default axios.create({
    baseURL : `http://${manifest.hostUri.split(':').shift()}:8080/api`    
})