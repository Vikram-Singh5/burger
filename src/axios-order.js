import axios from 'axios'

const instance = axios.create({
    baseURL: "https://react-my-burger-65a22-default-rtdb.firebaseio.com/"
})

export default instance;
