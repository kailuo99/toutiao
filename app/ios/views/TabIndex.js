'use strict';

var React = require('react-native');
var Icon = require('react-native-vector-icons/Ionicons');
var News = require('./News');
var User = require('./User');
var {
  StyleSheet, // 样式
  PixelRatio,
  AlertIOS,
  TabBarIOS,
  View,
} = React;

var TabIndex = React.createClass({
    getInitialState: function() {
        return {
            tabIndex:0,
        };
    },

    _renderScene: function(pnav) {
        switch(this.state.tabIndex) {
            case 0:
                return <News pnav={this.props.pnav} starDatas={this.props.starDatas} />;
                break;
            case 1:
                return <User pnav={this.props.pnav} starDatas={this.props.starDatas} />;
                break;
        }
    },

    render: function() {
        return (
            <View style={styles.container}>
              <TabBarIOS translucent={true} >
                  <Icon.TabBarItem
                    title="资讯"
                    selected={this.state.tabIndex === 0}
                    iconName="ios-list-outline"
                    selectedIconName="ios-list"
                    onPress={() => {
                      this.setState({ tabIndex: 0, });
                    }}>
                    {this._renderScene()}
                  </Icon.TabBarItem>
                  <Icon.TabBarItem
                    title="收藏"
                    selected={this.state.tabIndex === 1}
                    iconName="ios-paper-outline"
                    selectedIconName="ios-paper"
                    onPress={() => {
                      this.setState({ tabIndex: 1, });
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

module.exports = TabIndex;
