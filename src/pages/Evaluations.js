import React from "react";
import {
    Image,
    Text,
    View,
    ImageBackground, StyleSheet, TouchableOpacity,

} from "react-native"
import EvaluationCard from '../components/EvaluationCard'
import Carousel from 'react-native-snap-carousel'

class Evaluations extends React.Component {
    state={
        entries:[{item:'a'},
            {item:'b'},{item:'c'},{item:'d'},{item:'e'}]
    }

    _renderItem ({item, index}) {
        return (
            <EvaluationCard/>
        );
    }

    render () {
        return (
            <View
                style={styles.container}
            >
                <View style={styles.header}>
                    <Text style={styles.title}>课程评测</Text>
                </View>
                <View style={styles.slider}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.entries}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={300}
                        layout={'tinder'}
                        firstItem={this.state.entries.length}
                        layoutCardOffset={12}
                    />
                </View>
                <TouchableOpacity
                    style={styles.plus_container}
                >
                    <ImageBackground
                        style={styles.plus_button}
                        imageStyle={{resizeMode: 'stretch'}}
                        source={{uri:'button_orange'}}
                    >
                        <Text style={styles.plus_text}>发布我的评测</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FDD32A'
    },
    header:{
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title:{
        color: '#000000',
        fontSize: 40,
        fontFamily: '字魂95号-手刻宋'
    },
    slider:{
        justifyContent: 'center',
        alignItems: 'center',
        height: 380,
    },
    plus_container:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus_button:{
        width: 180,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    plus_text:{
        paddingHorizontal: 5,
        fontSize: 16,
        letterSpacing: 1,
        fontFamily: '字魂95号-手刻宋',
    }
})

export default Evaluations