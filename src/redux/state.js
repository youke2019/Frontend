const initialState = {
    user_info: null,
    course_list: null,
    login_ready:false,
    sortlist:[],
}

export const mockState = {
    course_list: [
        {"course_id":"GA312","course_name":"花卉学","course_hours":48,"course_credits":3,"general":false,"general_type":"","course_deptname":"设计学院"},
        {"course_id":"GA407","course_name":"花卉应用学","course_hours":32,"course_credits":2,"general":false,"general_type":"","course_deptname":"设计学院"},
        {"course_id":"PA302","course_name":"花卉与草虫禽鸟","course_hours":48,"course_credits":3,"general":false,"general_type":"","course_deptname":"媒体与传播学院"},
        {"course_id":"PL004","course_name":"插花艺术","course_hours":16,"course_credits":1,"general":false,"general_type":"","course_deptname":"设计学院"},
        {"course_id":"PL021","course_name":"花卉艺术","course_hours":32,"course_credits":2,"general":false,"general_type":"","course_deptname":"农业与生物学院"},
        {"course_id":"PL902","course_name":"国花、市花与文化","course_hours":32,"course_credits":2,"general":true,"general_type":"人文学科","course_deptname":"设计学院"},
        {"course_id":"SP079","course_name":"国花、市花鉴赏","course_hours":32,"course_credits":2,"general":false,"general_type":"","course_deptname":"设计学院"}
        ]
}

export default initialState