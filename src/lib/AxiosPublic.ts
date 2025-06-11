import axios from 'axios'

const AxiosPublic=axios.create({
    baseURL:"http://localhost:3000/api/"
})

export default AxiosPublic;