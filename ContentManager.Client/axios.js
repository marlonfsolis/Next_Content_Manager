import axios from "axios";
import config from "appconfig";

const instance = axios.create();

instance.defaults.baseURL = config.baseURL;
instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';

// instance.interceptors.request...

export default instance;