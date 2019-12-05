import axios from 'axios';


export default axios.create({
    baseURL : 'http://192.168.99.100:8000/api/user'    // POINT TO THE IP OF YOUR SERVER
})