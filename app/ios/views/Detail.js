'use strict';

var React = require('react-native');
var {
  StyleSheet,
  View, // 类似于DIV
  Text,
  ActivityIndicatorIOS,
  WebView,
  AlertIOS,
  TouchableOpacity,
  Image,
  PixelRatio,
  Dimensions
} = React;

var Detail = React.createClass({
    componentWillMount: function() {
        var navigator = this.props.navigator;
        var callback = (event) => {
             var route = event.data.route;
              if(route.page=='lists') {
                 navigator.ResetRouteStack(this.props.route_stact, this.props.route_stact.indexOf(route));
                //  console.log(navigator.getCurrentRoutes(),event.type);
              }
        };
          // Observe focus change events from the owner.
          this._listeners = [
            navigator.navigationContext.addListener('didfocus', callback),
          ];
    },
    componentWillUnmount: function() {
      this._listeners && this._listeners.forEach(listener => listener.remove());
    },
  render: function() {
    return (
        <View style={{flex:1}}>
            <View style={styles.content}>
              <WebView
              url={"http://m.yergoo.com/api/news/app/" + this.props.navigator.state.routeStack[this.props.navigator.state.routeStack.length-1].id}
              automaticallyAdjustContentInset={true}
              />
            </View>
        </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    marginTop:60,
    backgroundColor:'#fff',
    width: Dimensions.get('window').width,
    flex:1,
    borderColor:'#e6e6e6',
    borderWidth: 1/PixelRatio.get(),
  },
});

module.exports = Detail;
