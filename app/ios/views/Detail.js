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
  PixelRatio,
  Dimensions
} = React;

var Detail = React.createClass({
    componentDidMount: function() {
        // if(this.props.from == 'news') {
        //     var navigator = this.props.navigator;
        //     var callback = (event) => {
        //          var route = event.data.route;
        //           if(route.page=='lists') {
        //
        //              // console.log(this.props.route_stact.indexOf(route),navigator.getCurrentRoutes(),event.type);
        //           }
        //     };
        //       // Observe focus change events from the owner.
        //       this._listeners = [
        //         // navigator.navigationContext.addListener('didfocus', callback),
        //         // navigator.navigationContext.addListener('willfocus', callback),
        //       ];
        // }

    },
    componentWillUnmount: function() {
        // if(this.props.from == 'news') {
        //     this._listeners && this._listeners.forEach(listener => listener.remove());
        // }
    },
  render: function() {
    return (
        <View style={{flex:1}}>
            <View style={styles.content}>
              <WebView
              url={"http://m.yergoo.com/api/news/app/" + this.props.id}
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
