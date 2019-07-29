import React from "react";
import {Image, StatusBar, Text, View} from "react-native";
import {  loadSortlist, } from '../redux/actions'
import { connect } from 'react-redux'
import { loadData } from '../utils/LocalStorage'

class Home extends React.Component {
    componentDidMount () {
      loadData({ key:'sortlist', })
        .then(sortlist=>{this.props.loadSortlist(sortlist)})
        .catch(err=>console.log(err))
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Home!</Text>
                <Image source={{uri: 'search'}} style={{width: 40, height: 40}} />
            </View>
        );
    }
}

const mapStateToProps = state => {
  return {
    sortlist:state.sortlist,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    loadSortlist: (data)=>{
      dispatch(loadSortlist(data))
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)