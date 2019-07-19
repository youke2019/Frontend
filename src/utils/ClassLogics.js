import { loadData } from './LocalStorage'

export function getWeekClassTable (data,week) {
  //console.log(JSON.stringify(data));
  let classTable = [[],[],[],[],[],[],[]];
  for (let lesson of data)
    for (let item of lesson.classes)
      if (item.schedule.week === week)
        classTable[item.schedule.day - 1].push({
          name:lesson.name,
          period:item.schedule.period,
        })
  let new_classTable = [];
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
        segment={
          name:lesson.name,
          span:1
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
/*
* given the time = {
*   week,
*   weekday,
*   hour,
*   minute,
* },schedule: raw schedule from storage
* return name of next class.
* */
export const nextClass = (time,schedule)=>{
  let res = null;
  const weekClasstable = getWeekClassTable(schedule,time.week);
  let current = time.hour - 8 + ((time.hour % 2 === 0) && time.minute > 20) + ((time.hour % 2 === 1) && time.minute > 10)*2;
  weekClasstable[time.weekday].forEach((span) =>{
    //console.log(span.name + " " + span.span + " " + current);
    if(res != null) return ;
    if(span.name === null){
      current -= span.span;
      return ;
    }
    if(current >= span.span)
      current -= span.span;
    else if(current < span.span)
      res = span.name;
  })
  return res;
}