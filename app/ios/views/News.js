'use strict';

var React = require('react-native');
var List = require('./List');
var Detail = require('./Detail');
var { Icon, } = require('react-native-icons');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity
} = React;

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
    if(navState.routeStack[index].page == 'detail') {
        return (
          <TouchableOpacity
            onPress={() => navigator.jumpBack()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, {color:'#666'}]}>
              返回
            </Text>
          </TouchableOpacity>
        );
    } else {
        if(index == 0) {
            return null;
        }
        var previousRoute = navState.routeStack[index - 1];
        return (
          <TouchableOpacity
            onPress={() => navigator.jumpBack()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {previousRoute.name}
            </Text>
          </TouchableOpacity>
        );
    }

  },

  RightButton: function(route, navigator, index, navState) {
    if(ROUTE_STACK.length == (index+1) || route.page == 'detail') {
        return (
            <TouchableOpacity
              onPress={() => navigator.jumpForward()}
              style={styles.navBarRightButton}>
              <Icon
                  name='ion|ios-star'
                  size={25}
                  coloe='black'
                  style={{width:25,height:25,marginTop:10,}}
                />
            </TouchableOpacity>
        );
    } else {
        var nextRoute = ROUTE_STACK[index + 1];
        return (
          <TouchableOpacity
            onPress={() => navigator.jumpForward()}
            style={styles.navBarRightButton}>
            <Text style={[styles.navBarText, styles.navBarButtonText]}>
              {nextRoute.name}
            </Text>
          </TouchableOpacity>
        );
    }

  },

  Title: function(route, navigator, index, navState) {
    if(route.page == 'detail') {
        return null;
    } else {
        return (
          <Text style={[styles.navBarText, styles.navBarTitleText]}>
            {route.name}资讯
          </Text>
        );
    }
  },
};

var News = React.createClass({

  _renderScene: function(route,nav) {
      switch(route.page) {
          case 'lists':
            return <List navigator={nav} route={route}/>;
          case 'detail':
            return <Detail navigator={nav} route_stact={ROUTE_STACK} />;
      }
  },
  _refFunc: function(navigator) {
    //   var callback = (event) => {
    //        var route = event.data.route;
    //        console.log(navigator.getCurrentRoutes(),navigator.getRouteID(),event.type,'lists');
    //   };
    //     // Observe focus change events from the owner.
    //     this._listeners = [
    //       navigator.navigationContext.addListener('didfocus', callback),
    //       navigator.navigationContext.addListener('willfocus', callback),
    //     ];
  } ,
  componentWillUnmount: function() {
    // this._listeners && this._listeners.forEach(listener => listener.remove());
  },
  render: function() {
    return (
        <Navigator
          ref={this._refFunc}
          style={styles.container} // 整体的背景颜色
          initialRoute={ROUTE_STACK[0]}
          initialRouteStack={ROUTE_STACK}
          renderScene={this._renderScene}
          sceneStyle={{backgroundColor:'#eeeeee'}} // 场景的北京颜色
          configureScene={() => ({
            ...Navigator.SceneConfigs.HorizontalSwipeJump,
          })}
          navigationBar={
            <Navigator.NavigationBar
              routeMapper={Nav}
              style={styles.navBar}
            />
          }
        />
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navBar: {
      backgroundColor:'#fff',
      borderColor:'#EAEAEA',
      borderWidth:1
  },
  navBarButtonText: {
      color:'#666',
      fontSize:16,
  },
  navBarText: {
    color:'#333',
    fontSize: 18,
    marginVertical: 14,
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
    paddingRight: 10,
  },
  scene: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#EAEAEA',
  },
});

module.exports = News;
