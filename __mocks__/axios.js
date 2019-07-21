const axios = jest.genMockFromModule('axios');

let mockFiles = Object.create(null);
function post(url,data) {
    const promise = new Promise(function (resolve, reject) {
        if (
            data.answer_content == 'error'
            || data.question_content == 'error'
        ) {
            reject("error")
        } else {
            resolve(data)
        }
    })
    return promise
}

function get(url,data) {
    console.log(url)
    const promise = new Promise(function (resolve, reject) {
        if (url == 'baseUrl/courses/questions/find') {
            resolve({
                data: [{
                    "question_id": 17,
                    "user_id": "01231",
                    "course_id": "66974",
                    "question_content": "老师好看吗",
                    "question_time": "2019-07-18 20:44:34",
                    "question_isbanned": false,
                    "question_praise_point": 2,
                    "courseAnswerList": [
                        {
                            "answer_id": 33,
                            "question_id": 17,
                            "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
                            "answer_content": "杜鹃老师很好看",
                            "answer_time": "2019-07-18 22:20:42",
                            "answer_isbanned": false,
                            "answer_praise_point": 0,
                            "current_user_praise": false,
                            "courseAnswerPraiseList": []
                        },
                        {
                            "answer_id": 37,
                            "question_id": 17,
                            "user_id": "01231",
                            "answer_content": "没用的问题",
                            "answer_time": "2019-07-19 11:06:35",
                            "answer_isbanned": false,
                            "answer_praise_point": 0,
                            "current_user_praise": false,
                            "courseAnswerPraiseList": []
                        },
                        {
                            "answer_id": 38,
                            "question_id": 17,
                            "user_id": "01231",
                            "answer_content": "楼上说啥呢",
                            "answer_time": "2019-07-19 13:22:44",
                            "answer_isbanned": false,
                            "answer_praise_point": 0,
                            "current_user_praise": false,
                            "courseAnswerPraiseList": []
                        }
                    ],
                    "courseQuestionPraiseList": [
                        {
                            "question_praise_id": 1757,
                            "question_id": 17,
                            "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120"
                        },
                        {
                            "question_praise_id": 1758,
                            "question_id": 17,
                            "user_id": "01231"
                        }
                    ],
                    "current_user_praise": false
                }]
            });
        } else {
            reject("error");
        }
    })
    return promise
}

axios.post = post;
axios.get = get;

module.exports = axios;