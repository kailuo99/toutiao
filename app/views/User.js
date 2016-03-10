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
          <View style={{flex:1,flexDirection:'column',backgroundColor:'#ffffff'}}>
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
        height: (Platform.OS === 'ios')? 64: 48
    },
    navBarText: {
      color:(Platform.OS === 'ios')? '#333': '#666',
      fontSize: (Platform.OS === 'ios')? 20: 19,
      marginTop: (Platform.OS === 'ios')? 32: 10,
    },
    navBarTitleText: {
      textAlign:'center',
      fontWeight: '400',
      letterSpacing:0.8,
    },

});
