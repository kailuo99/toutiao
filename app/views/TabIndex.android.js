'use strict';

import React, {
  StyleSheet, // 样式
  PixelRatio,
  View,
  Text
} from 'react-native';

import News from './News';
import User from './User';
import Icon from 'react-native-vector-icons/Ionicons';

var TabArr = [
    {
        key: 0,
        title: '资讯',
        icon: 'ios-list-outline',
        selectedIcon:'ios-list',
    },
    {
        key: 1,
        title: '收藏',
        icon: 'ios-paper-outline',
        selectedIcon:'ios-paper',
    },
];


export default class TabIndex extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
         tabIndex:0,
      };
    }

    _renderScene() {
        switch(this.state.tabIndex) {
            case 0:
                return <News pnav={this.props.pnav} starDatas={this.props.starDatas} />;
                break;
            case 1:
                return <User pnav={this.props.pnav} starDatas={this.props.starDatas} />;
                break;
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <News pnav={this.props.pnav} starDatas={this.props.starDatas} />
                <View style={styles.tabbar}>
                  <View style={styles.tabitem}>
                    <Text style={styles.tabtext}>首页</Text>
                  </View>
                  <View style={styles.tabitem}>
                    <Text style={styles.tabtext}>收藏</Text>
                  </View>
                </View>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom:0,
      flexDirection:'column'
    },
    tabbar: {
      backgroundColor: '#fff',
      borderTopColor:'#dddddd',
      borderTopWidth: 1,
      height: 55,
      flexDirection:'row',
    },
    tabitem: {
      flex: 1,
      height: 55,
    },
    tabtext: {
      height: 55,
      textAlign: 'center',
      lineHeight: 55
    }

});
