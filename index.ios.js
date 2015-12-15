'use strict';

var React = require('react-native');
var News = require('./app/ios/views/News');
var Video = require('./app/ios/views/Video');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS
} = React;

var ROUTE_STACK = [
    {
        page:'news',
        name:'资讯'
    },
    {
        page:'videos',
        name:'视频'
    },
    {
        page:'user',
        name:'我的'
    }
];
// tab
class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: props.initTabIndex,
    };
};

  render() {
    return (
      <View style={styles.tabs}>
        <TabBarIOS>
        <TabBarIOS.Item
          title={ROUTE_STACK[1].name}
          selected={this.state.tabIndex === 0}
          onPress={() => {
            this.props.onChangeTab(0);
            this.setState({ tabIndex: 0, });
          }}>
          <View />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={ROUTE_STACK[1].name}
          selected={this.state.tabIndex === 1}
          onPress={() => {
            this.props.onChangeTab(1);
            this.setState({ tabIndex: 1, });
          }}>
          <View />
        </TabBarIOS.Item>
        <TabBarIOS.Item
          title={ROUTE_STACK[1].name}
          selected={this.state.tabIndex === 2}
          onPress={() => {
            this.props.onChangeTab(2);
            this.setState({ tabIndex: 2, });
          }}>
          <View />
        </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}

var toutiao = React.createClass({

  _renderScene: function(route,nav) {
      switch(route.page) {
          case 'news':
            return <News navigator={nav} route={route}/>;
          case 'videos':
            return <Video navigator={nav} route={route}/>;
      }
  },
  render: function() {
    return (
        <Navigator
          ref={(navigator)=>{this._navigator = navigator}}
          style={styles.container} // 整体的背景颜色
          initialRoute={ROUTE_STACK[0]}
          initialRouteStack={ROUTE_STACK}
          renderScene={this._renderScene}
          sceneStyle={{backgroundColor:'#eeeeee'}} // 场景的背景颜色
          configureScene={() => ({
            ...Navigator.SceneConfigs.PushFromRight,
          })}
          navigationBar={
              <Tab
                initTabIndex={0}
                routeStack={ROUTE_STACK}
                onChangeTab={(index) => {
                  this._navigator.jumpTo(ROUTE_STACK[index]);
                }}
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
  tabs: {
    height: 50,
  }
});

AppRegistry.registerComponent('toutiao', () => toutiao);
