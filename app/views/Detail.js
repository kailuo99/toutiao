'use strict';

import React, {
  StyleSheet,
  View, // 类似于DIV
  Text,
  WebView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform
} from 'react-native';

export default class Detail extends React.Component{

  constructor(props) {
    super(props);
  }
  render() {
    if(this.props.id) {
      return (
        <View style={{flex:1}}>
            <View style={styles.content}>
              <WebView
              source={{uri: "http://m.yergoo.com/api/news/app/" + this.props.id}}
              automaticallyAdjustContentInset={false}
              contentInset={{top:20,left:0,bottom:20,right:0}}
              startInLoadingState={true}
              // android
              domStorageEnabled={true}
              javaScriptEnabled={true}
              //ios
              bounces={true}
              allowsInlineMediaPlayback={true}
              scrollEnabled={true}
              decelerationRate="normal"
              />
            </View>
        </View>
      );
    }
    return null;
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems:'center',
    justifyContent:'center',
  },
  content: {
    marginTop: (Platform.OS === 'ios')? 64: 48,
    backgroundColor:'#fff',
    width: Dimensions.get('window').width,
    flex:1,
    borderColor:'#e6e6e6',
    borderWidth: 1/PixelRatio.get(),
  },
});
