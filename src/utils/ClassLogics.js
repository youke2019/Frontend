import { loadData } from './LocalStorage'

export function getWeekClassTable (data,week) {
  let classTable = [[],[],[],[],[],[],[]];

  for (let lesson of data)
    for (let item of lesson.classes)
      if (item.schedule.week === week){
        classTable[item.schedule.day - 1].push({
          name:lesson.name,
          period:item.schedule.period,
          classroom: item.classroom.name,
          teachers: lesson.teachers
        })
      }


  let new_classTable = []
  let hash=0
  let hashTable=[]
  for (let weekday of classTable){
    weekday.sort((lesson1,lesson2) => lesson1.period < lesson2.period ? -1 : 1)
    let new_weekday = []
    let segment = {
      name: null,
      span: 1
    }
    let period = 0;

    for (let lesson of weekday){
      if (segment.name !== lesson.name){
        if (lesson.period - period > 2)
          new_weekday.push({
            name:null,
            span:lesson.period - (period + segment.span)
          })
        period = lesson.period

        let hash=-1
        for (let i=0;i<hashTable.length;i++)
          if (hashTable[i] == lesson.name){
            hash=i
            break
          }
        if (hash==-1){
          hashTable.push(lesson.name)
          hash=hashTable.length-1
        }
        segment={
          name:lesson.name,
          span:1,
          hash:hash%5,
          classroom: lesson.classroom,
          teachers: lesson.teachers,
        }
        new_weekday.push(segment)
      } else {
        segment.span++
      }
    }
    if (period !== 16)
      new_weekday.push({
        name:null,
        span:17 - (period + segment.span)
      })
    new_classTable.push(new_weekday);
  }
  return new_classTable;
}

export const nextClassIndex = (schedule)=>{
  if (schedule.length > 0){
    let date = new Date()
    let hour = date.getHours()
    let minutes = date.getMinutes()
    for (let i=0; i<schedule.length;i++) {
      let time = schedule[i].time.start.split(':')
      if (parseInt(time[0]) > hour || (time[0] == hour && parseInt(time[1])+10 > minutes)) {
        console.log(i)
        return i
      }
    }
    return schedule.length-1
  }

  return -1
}

export const timeConvert = (period,span) => {
  let originMinutes = 8*60
  let time = {
    start:null,
    end:null
  }

  let beginTimeMinutes = originMinutes + Math.floor(period/2)*2*60
  if (period%2 == 0){
    time.start = Math.floor(beginTimeMinutes/60).toString()+':00'
  } else {
    time.start = Math.floor(beginTimeMinutes/60).toString()+':55'
  }

  let endTimeMinutes = originMinutes + Math.floor((period+span)/2)*2*60
  if ((period+span)%2 == 0){
    time.end = Math.floor(endTimeMinutes/60-1).toString()+':40'
  } else {
    time.end = Math.floor(endTimeMinutes/60-1).toString()+':45'
  }

  return time
}

export const buildingConvert = (classroom) => {
  if (classroom.charAt(0) == '上')
    return '上院'
  if (classroom.charAt(0) == '中')
    return '中院'
  if (classroom.charAt(0) == '下')
    return '下院'
  if (classroom.charAt(1) == '上')
    return '东上院'
  if (classroom.charAt(1) == '下')
    return '东下院'
  if (classroom.charAt(1) == '中')
    return '东中院'+classroom.charAt(3)+'号楼'
  if (classroom.charAt(0) == '包')
    return '包图'
  if (classroom.charAt(0) == '逸')
    return '逸夫楼'
  if (classroom.charAt(0) == '工')
    return '工程馆'

  return '未知'
}