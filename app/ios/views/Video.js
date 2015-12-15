'use strict';

var React = require('react-native');

var {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Image,
  PixelRatio,
  AlertIOS,
} = React;


var Video = React.createClass({

    render: function() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text>正在开发中</Text></View>
        );
    }

});

var styles = StyleSheet.create({



});

module.exports = Video;
