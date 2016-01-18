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


var TabIndex = React.createClass({
    getInitialState: function() {
        return {
            tabIndex:0,
        };
    },

    _renderScene: function() {
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
                    {
                        TabArr.map(
                            (val)=>{
                                return (
                                    <Icon.TabBarItem
                                      title={val.title}
                                      selected={this.state.tabIndex === val.key}
                                      iconName={val.icon}
                                      key={val.key}
                                      selectedIconName={val.selectedIcon}
                          
                                      onPress={() => {
                                        this.setState({ tabIndex: val.key,});
                                      }}>
                                      {this._renderScene()}
                                    </Icon.TabBarItem>
                                );
                            }
                        )
                    }
                </TabBarIOS>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom:0
    },
});

module.exports = TabIndex;
