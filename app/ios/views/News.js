'use strict';

var React = require('react-native');
var List = require('./List');
var Detail = require('./Detail');
var Icon = require('react-native-vector-icons/Ionicons');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableOpacity,
  AsyncStorage,
  AlertIOS,
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
  },

  RightButton: function(route, navigator, index, navState) {
    if(ROUTE_STACK.length == (index+1)) {
        return null;
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
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}资讯
      </Text>
    );
  },
};

var News = React.createClass({
    getInitialState: function() {
        return {
            datas:null,
            loaded:false,
            isFetchMaxId:0, //正在拉取的当前的数据的最大ID
        };
    },
  _renderScene: function(route,nav) {
      switch(route.page) {
          case 'lists':
            return <List navigator={nav} route={route} pnav={this.props.pnav} starDatas={this.props.starDatas}/>;
            break;
      }
  },
  _refFunc: function(navigator) {
    //   var callback = (event) => {
    //        var route = event.data.route;
    //        if(route.page == 'detail') {
    //           // 这里写逻辑来加载收藏的路由
    //           // console.log(navigator.getCurrentRoutes(),route,event.type,'lists');
    //        }
      //
    //   };
    //     // Observe focus change events from the owner.
    //     this._listeners = [
    //       navigator.navigationContext.addListener('didfocus', callback),
    //       // navigator.navigationContext.addListener('willfocus', callback),
    //     ];
  } ,
  componentWillUnmount: function() {
    //   this._listeners && this._listeners.forEach(listener => listener.remove());
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
      fontSize:18,
  },
  navBarText: {
    color:'#333',
    fontSize: 19,
    marginVertical: 13,
  },
  navBarTitleText: {
    fontWeight: '500',
    letterSpacing:1,
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
