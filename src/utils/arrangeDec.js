
let mandatory=[],optional=[],mResult=[],mClass = [],Result = [],sum =0 ;
function conflict(data) {
    //这里拿到的是class，需要判定是否冲突，需要打开
    if(mClass.length === 0)
        return false;
    let segments = data.classSegments;
    for(let i=0;i<mClass.length;++i){
        let tmp = mClass[i].classSegments;
        for(let j =0; j<tmp.length ; ++j){
            for(let h = 0 ; h<segments.length;++h){
               // console.log("new "+h +"  week " + segments[h].week+" sec "+segments[h].begin_sec+"-"+segments[h].end_sec+" week "+segments[h].begin_week+"-"+segments[h].end_week+ " o " + segments[h].odd_or_even);
               // console.log("old "+i + " " + j +"  week " + tmp[j].week+" sec "+tmp[j].begin_sec+"-"+tmp[j].end_sec+" week "+tmp[j].begin_week+"-"+tmp[j].end_week+ " o " + tmp[j].odd_or_even);
             if(segments[h].week !== tmp[j].week  ){
                    continue;
                }
                else
                if( segments[h].end_sec <tmp[j].begin_sec|| segments[h].begin_sec > tmp[j].end_sec ){
               //     console.log("sec")
                    continue;
                }
                else if(segments[h].end_week <tmp[j].begin_week||segments[h].begin_week > tmp[h].end_week){
               //     console.log("enter")
                    continue;
                }
                else{
                    if(segments[h].odd_or_even === 'b' || tmp[j].odd_or_even === 'b' || segments[h].odd_or_even === tmp[j].odd_or_even){
                //        console.log("conflict");
                        return true;
                    }
                }
            }
        }
    }
    return false;
}
function loopOptional(num) {
    if(num === 0){
        if(mClass.length >= mandatory.length  && mClass.length <= sum){

            let tmp = [];
            for(let i = 0;i<mClass.length;++i){
                let tmpItem = mClass[i];
                tmp.push(tmpItem);
            }
            if(tmp.length !== 0){
                Result.push(tmp);
            }
        }
        return;
    }
    let data = optional.pop();
    let classes = data.classes;
    for(let i = 0;i<classes.length;++i){
        if(conflict(classes[i]) !== true){
            mClass.push(classes[i]);
            loopOptional(num-1);
            mClass.pop();
        }
            loopOptional(num-1);
    }
    optional.push(data);
}
function loopMandatory(num) {
    if(num === 0 ){
        if(mClass.length !== mandatory.length){
            //此时mandatory为0
            let tmp = [];
            for(let i = 0;i<mClass.length;++i){
                let tmpItem = mClass[i];
                tmp.push(tmpItem);
            }
            mResult.push(tmp);
        }
        return;
    }
    let data = mandatory.pop();
    let classes = data.classes;
    for(let i = 0; i< classes.length ; ++i){
        if(!conflict(classes[i]) ){
            let tmp = classes[i];
            mClass.push(tmp);
            loopMandatory(num-1);
            mClass.pop();
        }
    }
    mandatory.push(data);
}
function arrangeMandatory(){
    let num = mandatory.length;
    loopMandatory(num);
}
function arrangeOptional() {
    let num = optional.length;
    if(num === 0){
        return mResult;
    }
    else{
        console.log("mResult length",mResult.length)
        if(mandatory.length === 0 )
            loopOptional(num);
        else
            for(let i = 0 ; i < mResult.length ;++i){
                mClass = mResult[i];
                loopOptional(num);
            }
    }
    let tmp = [],dResult=[]
    for(let i = 0; i<Result.length; ++i){
        let t = Result[i]
        tmp.push(JSON.stringify(t))
    }
    tmp = tmp.filter((item, index, array) =>  array.indexOf(item) === index)
    for(let i = 0 ; i<tmp.length;++i){
        let t = JSON.parse(tmp[i])
        dResult.push(t)
    }
    return dResult;
}
export function arrange(data) {
    mandatory=[],optional=[],mResult=[],mClass = [],Result = [],sum =0;
    sum = data.length;
    for(let i = 0; i< data.length;++i){
        if(data[i].isCompulsory){
            mandatory.push(data[i]);
        }
        else
            optional.push(data[i]);
    }
    if(mandatory.length === 0){
        return arrangeOptional();
    }
    else{
        arrangeMandatory();
        if(mResult === null)
            return null;
        else{
            return arrangeOptional();
        }
    }
}