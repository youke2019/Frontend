import React from "react";
import axios from 'axios';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ShadowedTitle } from './ShadowedTitle'
import EvaluationCard from './EvaluationCard'
import axios from 'axios'

class QAAbstractTitle extends React.Component{
    render () {
      const {tags = ["高分课程","值得一选"]} = this.props;
      return(
        <View style = {styles.header_container}>
          <ShadowedTitle text={"评测"}  uri ={"wenda"}/>
        </View>
      )
    }
}
export default class EvaluationAbstract extends React.Component{
  state ={
    evaluations:[],
  }
  componentDidMount () {
    this.getEvaluations();
  }
  componentWillReceiveProps (nextProps, nextContext) {
    this.getEvaluations()
  }
  getEvaluations = () => {
    axios.get(baseUrl+'/courses/evaluates/find',{
      params:{
        course_id: this.props.course_id
      }
    }).then(res=>{
      this.setState({
        evaluations: res.data
      })
    }).catch(err => {
      console.log(err)
    })
  }
  render() {
    const {
      evaluations
    } = this.state;
    const first_ev = evaluations.length > 0 ? evaluations[0]:null
    return(
      <View style = {styles.container}>
        <QAAbstractTitle/>
        {
          first_ev ?
            <View style={styles.first_ev}>
              <EvaluationCard
                evaluation={first_ev}
                onDetail={()=>{}}
              />
            </View>: null
        }
        <View style = {styles.button_container}>
          <TouchableOpacity
            onPress={this.props.onGotoEvaluationPage}
            style = {styles.button_touchable}
            activeOpacity={0.3}
          >
            <Text
              style={styles.button_text}
            >更多评测</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  first_ev:{
    alignItems:'center'
  },
  button_text:{
    color:"#ff812e",
    textAlign: 'center',
  },
  button_touchable: {
    borderRadius: 20,
    paddingHorizontal: 55,
    paddingVertical: 5,
    borderWidth:0.5,
    borderColor:'orange',
    backgroundColor: 'white'
  },
  button_container:{
    marginTop:10,
    flexDirection: 'row',
    justifyContent:'center',
  },
  header_container:{
    flexDirection:'row',
    alignItems:'center',
    flexWrap:'wrap',
  },
  tag_style:{
    paddingHorizontal: 5,
    marginHorizontal:5,
  },
  tag_text:{
    textAlign:"center",
  },
  container:{
    borderTopWidth:15,
    borderTopColor:'whitesmoke',
    marginBottom:50,
  }

})