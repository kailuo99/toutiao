'use strict';

var React = require('react-native');
var News = require('./app/ios/views/News');
var Video = require('./app/ios/views/Video');
var User = require('./app/ios/views/User');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TabBarIOS,
  AlertIOS,
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

var toutiao = React.createClass({
    getInitialState: function() {
        return {
            tabIndex:0,
        };
    },
  _renderScene: function() {
      switch(this.state.tabIndex) {
          case 0:
            return <News />;
          case 1:
            return <Video />;
          case 2:
            return <User />;
      }
  },

  render: function() {
    return (
        <View style={styles.container}>
          <TabBarIOS translucent={true}>
              <Icon.TabBarItem
                title={ROUTE_STACK[0].name}
                selected={this.state.tabIndex === 0}
                iconName="ios-list-outline"
                selectedIconName="ios-list"
                onPress={() => {
                  this.setState({ tabIndex: 0, });
                }}>
                {this._renderScene()}
              </Icon.TabBarItem>
              <Icon.TabBarItem
                title={ROUTE_STACK[2].name}
                selected={this.state.tabIndex === 2}
                iconName="ios-person-outline"
                selectedIconName="ios-person"
                onPress={() => {
                  this.setState({ tabIndex: 2, });
                }}>
                {this._renderScene()}
              </Icon.TabBarItem>
          </TabBarIOS>
        </View>
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
