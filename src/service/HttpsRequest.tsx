import axios from 'axios';

const HttpsRequest = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default HttpsRequest;
