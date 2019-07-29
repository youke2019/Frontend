import React from 'react'
import { Image, FlatList, Text, View, ScrollView, TouchableOpacity, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { Divider } from 'react-native-elements'
import HighlightCard from '../components/HighlightCard'
import { getAllHighlight } from '../utils/DataRequest'

class Highlight extends React.Component {
  state = {
    highlights: [],
    is_refreshing:false,
  }
  newHighlight = () => {
    this.props.navigation.navigate('NewHighlight', {
      user_id: this.props.user_info.id,
      callBack: this.refresh
    })
  }
  componentDidMount () {
    this.getData()
  }

  refresh = () => {
    this.getData()
  }
  getData = () => {
    console.log('refresh')
    this.setState({
      is_refreshing: true
    })
    getAllHighlight(this.props.user_info.id)
      .then((response) => {
        console.log(response)
        this.setState({
          highlights: response.data,
          is_refreshing: false
        })
      })
      .catch(err => {
        this.setState({
          is_refreshing: false
        })
        console.log(err)
      })
  }

  render () {
    const { highlights, is_refreshing } = this.state
    console.log(highlights)
    return (
      <View style={styles.base_container}>
        <View style={styles.header}>
          <View style={styles.header_center}>
            <Image source={{ uri: 'planet' }} style={styles.header_center_img}/>
            <Text style={styles.header_text}>
              精彩瞬间
            </Text>
          </View>
          <TouchableOpacity
            style={styles.top_right_touchable}
            onPress={this.newHighlight}
          >
            <Image source={{ uri: 'picture_yellow' }} style={styles.camera}/>
          </TouchableOpacity>
        </View>
        <Divider style={{ backgroundColor: 'black' }}/>
        <FlatList
          style={{ height: '100%', width: '100%' }}
          keyboardShouldPersistTaps={'handled'}
          refreshing={is_refreshing}
          onRefresh={this.refresh}
          data={highlights}
          renderItem={({ item }) =>
            <View style={{ flexDirection: 'column' }}>
              <HighlightCard data={item} user_id={this.props.user_info.id} refresh={this.refresh}/>
              <Divider style={{ height: 5, backgroundColor: 'whitesmoke' }}/>
            </View>
          }
          keyExtractor={(item) => item.video_id.toString()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  base_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 35,
    borderTopColor: 'whitesmoke'
  },
  header: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    backgroundColor: 'whitesmoke',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  header_text: {
    color: '#000000',
    fontSize: 25,
    fontFamily: '字魂95号-手刻宋'
  },
  header_center: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header_center_img: {
    height: 35,
    width: 35,
    marginRight: 10
  },
  camera: {
    height: 35,
    width: 35
  },
  top_right_touchable: {
    marginLeft: 80,
    marginRight: 20
  },
  divider: {
    backgroundColor: 'blue'
  }
})
const mapStateToProps = (state) => ({
  user_info: state.user_info
})

export default connect(
  mapStateToProps
)(Highlight)