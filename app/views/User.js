'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Navigator,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
  Platform
} from 'react-native';

import StarList from './StarList';
import Detail from './Detail';
import Dimensions from 'Dimensions';

var Nav = {

  LeftButton: function(route, navigator, index, navState) {
    return null;
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}
      </Text>
    );
  },
};

export default class User extends React.Component{
    constructor(props) {
      super(props);
      this._renderScene = this._renderScene.bind(this);
    }

    _renderScene(route,nav) {
        switch (route.idx) {
            case 'starList':
                return (
                    <StarList navigator={nav} pnav={this.props.pnav} starDatas={this.props.starDatas}/>
                );
                break;
            default:
        }

    }

    render() {
        return (
            <Navigator
              style={{flex:1}}
              initialRoute={{idx:'starList',name:'我的收藏'}}
              renderScene={this._renderScene}
              sceneStyle={{backgroundColor:'#eeeeee'}} // 场景的北京颜色
              navigationBar={
                <Navigator.NavigationBar
                  routeMapper={Nav}
                  style={styles.navBar}
                />
              }
            />
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
      marginVertical: (Platform.OS === 'ios')? 12: 18,
    },
    navBarTitleText: {
      fontWeight: '400',
      letterSpacing:0.8,
    },

});
