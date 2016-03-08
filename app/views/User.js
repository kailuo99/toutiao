'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  PixelRatio,
  Platform
} from 'react-native';

import StarList from './StarList';

export default class User extends React.Component{
    constructor(props) {
      super(props);
    }

    render() {
      return (
          <View style={{flex:1,flexDirection:'column',backgroundColor:'#eee'}}>
            <View style={styles.navBar}>
              <Text style={[styles.navBarText, styles.navBarTitleText]}>我的收藏</Text>
            </View>
            <View style={{flex:1}}>
              <StarList pnav={this.props.pnav} starDatas={this.props.starDatas}/>
            </View>
          </View>
      );
    }
};

var styles = StyleSheet.create({

    navBar: {
        backgroundColor:'#fff',
        borderColor:'#dddddd',
        borderWidth:1,
        height: (Platform.OS === 'ios')? 64: 50
    },
    navBarText: {
      color:'#333',
      fontSize: 20,
      marginTop: (Platform.OS === 'ios')? 32: 13,
    },
    navBarTitleText: {
      textAlign:'center',
      fontWeight: '400',
      letterSpacing:0.8,
    },

});
