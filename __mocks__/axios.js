const axios = jest.genMockFromModule('axios');

function post(url,data) {
    const promise = new Promise(function (resolve, reject) {
        if (
            data.answer_content == 'error'
            || data.question_content == 'error'
            || data.credit_point == -1
        ) {
            reject("error")
        } else {
            resolve(data)
        }
    })
    return promise
}

function get(url,data) {
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
        } else if (url == 'baseUrl/courses/evaluates/find' && data.params.course_id == 'test'){
            resolve({
                data: [
                        {
                            "evaluate_id": 5,
                            "evaluate_time": "2019-07-22 14:21:34",
                            "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
                            "course_id": "LI901",
                            "evaluate_content": {
                                "course_id": "LI901",
                                "课程简述": "又水分又高",
                                "credit_point": 10,
                                "上课自由程度": "基本不管 坐后排随便你干嘛",
                                "课程个人体验": "课是挺水的 但是没什么好玩的地方",
                                "evaluate_id": 5,
                                "user_id": "1A7A1F80-59D0-4E8C-B4C6-AAAFFC606120",
                                "考核形式": "5分钟个人pre+1000字论文"
                            },
                            "evaluate_praise_point": 0,
                            "current_user_praise": false,
                            "courseEvaluationPraiseList": []
                        },
                ]
            })
        } else {
            reject("error");
        }
    })
    return promise
}

axios.post = post;
axios.get = get;

module.exports = axios;