import axios from "axios";
import { endpoint } from "./constants";

export const authAxios = token => {
    return axios.create({
        baseURL: endpoint,
        headers: {
            'Authorization': `Token ${token}`,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
}

