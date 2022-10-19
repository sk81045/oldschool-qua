
import request from '../axios/AxiosConfig'
import Vue from 'vue'
export function getList(page = 0, parPage = 10) {
  return request({
    url: '/api/getlist?page='+page+'&limit='+parPage,
    method: 'get',
  })
}

export function add(data) {
	return request({
	  url: '/api/addcourse',
	  method: 'post',
	  data
	})
}

export function publish(data) {
	return request({
	  url: '/api/publish',
	  method: 'post',
	  data
	})
}

export function checkCourse(data) {
	return request({
 	  url: '/api/checkcourse',
	  method: 'post',
	  data	
	})
}

export function teacher(params) {
	return request({
	  url: '/api/teachercourse',
	  method: 'get',
	  params		
	})
}


export function getClass(params) {
	return request({
	  url: '/api/getClass',
	  method: 'get',
	  params		
	})
}

export function courseList(act = 0, page = 0, parPage = 10) {
	return request({
	  url: '/api/courselist?act='+act+'&page='+page+'&limit='+parPage,
	  method: 'get'		
	})
}

export function getCourse(id) {
	return request({
	  url: '/api/getcourse?id='+id,
	  method: 'get'		
	})
}

export function afcourseList(page = 0, parPage = 10) {
	return request({
	  url: '/api/afcourselist?page='+page+'&limit='+parPage,
	  method: 'get'		
	})
}


export function dormGlobal(debug,time = 'am',day = '',page = 1,limit = 10) {   //宿舍归寝
	return request({
	  url: '/api/dorm/global/list?debug='+debug+'&time='+time+'&day='+day+'&page='+page+'&limit='+limit,
	  method: 'get',		
	})
}

export function parent(params) {   //宿舍归寝
	return request({
	  url: '/api/dorm/parent',
	  method: 'get',
	  params		
	})
}

export function msgdeptAll(type,dept='',text='') {   //发送短信 获取部门
	return request({
	  url: '/teacher/msg/deptAll?type='+type+'&dept='+dept+'&text='+text,
	  method: 'get',	
	})
}

export function  msgPerson(dept,type) {   //发送短信 获取部门人员
	return request({
	  url: '/teacher/msg/deptPerson?id='+dept+'&type='+type,
	  method: 'get',	
	})
}

export function  mydept(type,dept='',text='') {   //发送短信 获取班级
	return request({
	  url: '/teacher/msg/mydept?type='+type+'&dept='+dept+'&text='+text,
	  method: 'get',	
	})
}

export function  sendMsg(data) {   //发送短信 
	return request({
 	  url: '/teacher/msg/sendMsg',
	  method: 'post',
	  data	
	})
}

export function  addleave(data) {   //添加请假 
	return request({
 	  url: '/parents/leave/add',
	  method: 'post',
	  data	
	})
}

export function  login(data) {   
	return request({
 	  url: 'mobile/login',
	  method: 'post',
	  data	
	})
}

export function  getMenu(data) {   
	return request({
 	  url: 'mobile/menus',
	  method: 'post',
	  data
	})
}

export function  getUserRouter(data) {   
	return request({
 	  url: 'mobile/menus',
	  method: 'post',
	  data
	})
}

export function getUser(query = '') {
  return request({
    url: '/getuser',
    method: 'get',
  })
}

export function getDept(params) {
	return request({
	  url: '/getdept',
	  method: 'get',
	  params		
	})
}
export function putDept(data) {   //更改部门 
	return request({
 	  url: '/dept/put',
	  method: 'post',
	  data	
	})
}

export function logout() {
  return request({
    url: '/logout?logout=1045',
    method: 'get',
  })
}

export function  user(data) {   //信息 
	return request({
 	  url: '/user',
	  method: 'post',
	  data	
	})
}


export function handin(params = '') {  //缴费列表
	return request({
	  url: '/handin/list',
	  method: 'get',
	  params		
	})
}

export function  handinAdd(data) {   //添加缴费
	return request({
 	  url: '/handin/add',
	  method: 'post',
	  data	
	})
}
export function  phoneAdd(data) {   //添加手机号
	return request({
 	  url: '/phone/add',
	  method: 'post',
	  data	
	})
}
export function  phoneDelete(data) {   
	return request({
 	  url: '/phone/delete',
	  method: 'post',
	  data	
	})
}

export function grade(params = '') {  //年级列表
	return request({
	  url: '/fetchgrade',
	  method: 'get',
	  params		
	})
}

export function fetchClass(params = '') {  //班级列表
	return request({
	  url: '/fetchclass',
	  method: 'get',
	  params		
	})
}

export function fetchStudent(params = '') {  //班级列表
	return request({
	  url: '/fetchstudent',
	  method: 'get',
	  params		
	})
}
export function handinStudentAdd(data) {  //add班级列表
	return request({
		url: '/handinStudentAdd',
		method: 'post',
		data
	})
}


export function listleave(query = {}) {   //请假list 
	return request({
	  url: '/leave/list?query='+JSON.stringify(query),
	  method: 'get'		
	})
}

export function agreeleave(data) {   //审批 
	return request({
 	  url: '/leave/agree',
	  method: 'post',
	  data	
	})
}

export function getConsume(query = {}) {   
	return request({
	  url: '/student/consume/list?query='+JSON.stringify(query),
	  method: 'get'		
	})
}

export function getCheckin(query = {}) {   
	return request({
	  url: '/checkin/list?query='+JSON.stringify(query),
	  method: 'get'		
	})
}

export function getScoring() {   //获取打分项
	return request({
	  url: '/teacher/comment/getScoring',
	  method: 'get'		
	})
}

export function ActionScoring(data) {
	return request({
		url: '/teacher/comment/AddScoring',
		method: 'post',
		data
	})
}

export function studentList(query={},page=0, limit =30) {
	return request({
		url: '/studentlist?query='+JSON.stringify(query)+'&page='+page+'&limit='+limit,
		method: 'get',
	})
}

export function ClassList() {
	return request({
		url: '/teacher/comment/ClassList',
		method: 'get',
	})
}

export function getPersonInfo(debug = '',query={}) {   
	return request({
	  url: '/api/mobile/person?&query='+JSON.stringify(query),
	  method: 'get'		
	})
}

export function getCircle(debug = '') {   //班级圈
	return request({
	  url: '/index/classcircle/getcircle',
	  method: 'get'		
	})
}










