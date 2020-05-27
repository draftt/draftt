import axios from 'axios';


export default axios.create({
    baseURL : 'http://192.168.100.20:8080/api'    // POINT TO THE IP OF YOUR SERVER
})