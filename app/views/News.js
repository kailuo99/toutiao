'use strict';

import React, {
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  AsyncStorage,
  Platform
} from 'react-native';

import List from './List';
import Detail from './Detail';
import Icon from 'react-native-vector-icons/Ionicons';

var ROUTE_STACK = [
    {
        name: "推荐",
        sign: "index",
        page: 'lists',
    },
    {
        name: "新闻",
        sign: "news",
        page: 'lists',
    },
    {
        name: "搞笑",
        sign: "joke",
        page: 'lists',
    },
    {
        name: "视频",
        sign: "video",
        page: 'lists',
    },
    {
        name: "娱乐",
        sign: "entertainment",
        page: 'lists',
    },
    {
        name: "时尚",
        sign: "fashion",
        page: 'lists',
    },
    {
        name: "科技",
        sign: "tech",
        page: 'lists',
    },
    {
        name: "体育",
        sign: "sports",
        page: 'lists',
    }
];

var Nav = {

  LeftButton: function(route, navigator, index, navState) {

        if(index == 0) {
            return null;
        }
        var previousRoute = navState.routeStack[index - 1];
        return (
          <TouchableOpacity
            onPress={() => {
              if(navigator.state.presentedIndex > 0) {
                navigator.jumpBack();
              }
            }}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {previousRoute.name}
            </Text>
          </TouchableOpacity>
        );
  },

  RightButton: function(route, navigator, index, navState) {
    if(ROUTE_STACK.length == (index+1)) {
        return null;
    } else {
        var nextRoute = ROUTE_STACK[index + 1];
        return (
          <TouchableOpacity
            onPress={() => {
              if(navigator.state.presentedIndex < ROUTE_STACK.length-1) {
                navigator.jumpForward();
              }
            }}
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {nextRoute.name}
            </Text>
          </TouchableOpacity>
        );
    }
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}资讯
      </Text>
    );
  },
};

export default class News extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
        currentRoute: ROUTE_STACK[0],
      }
      this._willFocus = this._willFocus.bind(this);
  }
  // 监听的回调
  _willFocus(route) {

     // if(route.sign !== ROUTE_STACK[0].sign) {
     //  this.setState({
     //    currentRoute: route
     //  });
     // }
  }

  render() {
    return (
        <Navigator
          style={styles.container} // 整体的背景颜色
          initialRoute={ROUTE_STACK[0]}
          initialRouteStack={ROUTE_STACK}
          renderScene={
              (route,nav)=>{
                  return <List navigator={nav} scanRoute={this.state.currentRoute} route={route} pnav={this.props.pnav} starDatas={this.props.starDatas}/>;
              }
          }
          sceneStyle={{backgroundColor:'#eeeeee'}} // 场景的背景颜色
          configureScene={() => ({
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
          })}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={Nav}
              style={styles.navBar}
            />
          }
          onWillFocus={this._willFocus}
        />
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
      backgroundColor:'#fff',
      borderColor:'#dddddd',
      borderWidth:1,
      height: (Platform.OS === 'ios')? 64: 48
  },
  navBarButtonText: {
      color:'#888',
      fontSize: (Platform.OS === 'ios')? 18: 17,
      letterSpacing: 1,
  },
  navBarText: {
    fontSize: (Platform.OS === 'ios')? 20: 19,
    marginVertical: (Platform.OS === 'ios')? 13: 12,
  },
  navBarTitleText: {
    fontWeight: (Platform.OS === 'ios')? '500': '300',
    letterSpacing: 0.8,
    marginTop: (Platform.OS === 'ios')? 12: 20,
    color: (Platform.OS === 'ios')? '#333': '#666',
  },
  navBarLeftButton: {
    paddingLeft: 5,
  },
  navBarRightButton: {
    paddingRight: 5,
  },
});
