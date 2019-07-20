const axios = jest.genMockFromModule('axios');

let mockFiles = Object.create(null);
function post(url,data) {
    const promise = new Promise(function (resolve, reject) {
        if (
            data.answer_content == 'error'
        ) {
            reject("error")
        } else {
            resolve(data)
        }
    })
    return promise
}

function get(data) {
    const promise = new Promise(function (resolve, reject) {
        if (false) {
            resolve(data);
        } else {
            reject("error");
        }
    })
    return promise
}

axios.post = post;
axios.get = get;

module.exports = axios;