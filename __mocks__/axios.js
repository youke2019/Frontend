const axios = jest.genMockFromModule('axios');

let mockFiles = Object.create(null);
function post(data) {
    const promise = new Promise(function (resolve, reject) {
        if (true) {
            resolve(data);
        } else {
            reject(error);
        }
    })
    return promise
}

function get(data) {
    const promise = new Promise()
    return promise.resolve(data)
}

axios.post = post;
axios.get = get;

module.exports = axios;