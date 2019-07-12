import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {Button}from 'react-native-elements'
import {connect} from "react-redux";
import {clearUserInfo} from "../redux/actions";

const mapStateToProps = state => {
    return {
        user: state.user_info
    }
}

const mapDispatchToProps = dispatch => {
    return {
        clearUserInfo: () => {
            dispatch(clearUserInfo())
        }
    }
}

class Profile extends React.Component {
    _logout = () => {
        storage.remove({
            key:'user'
        }).then(() => {
            this.props.clearUserInfo()
            this.props.navigation.navigate('Login')
        }).catch((err) => {
            console.log(err)
        })
    }
    gotoProfileSetting = () =>{
      this.props.navigation.navigate("ProfileSetting");
    }
    render() {
      const {user} = this.props;
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>
                    欢迎
                </Text>
              <Text>
                {user == null ? null : user.nickname}
              </Text>
              <Text>
                    {user == null? null:user.name}
                </Text>
                <Text>
                    {this.props.user == null? null:user.department}
                </Text>
                <Text>
                    {user == null? null:user.major}
                </Text>
                <Button
                  title={"编辑资料"}
                  onPress={this.gotoProfileSetting}
                  type={"outline"}
                  buttonStyle={styles.link}
                />
                <Button
                    title="登出"
                    onPress={this._logout}
                    buttonStyle={styles.logout}
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
    logout: {
        backgroundColor: 'crimson'
    },
    link: {
      borderColor: "#ffff00"
  }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)