import axios from "axios";
import Constants from "expo-constants";
const { manifest } = Constants;

const pavilion = axios.create({
	baseURL: `http://${manifest.hostUri.split(":").shift()}:8080/api`,
});


// set 500ms api call timeout
pavilion.defaults.timeout = 500;

export default pavilion;
