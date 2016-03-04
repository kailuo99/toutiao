'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Navigator,
  ScrollView,
  PixelRatio,
  TouchableOpacity,
} from 'react-native';

import StarList from './StarList';
import Detail from './Detail';
import Dimensions from 'Dimensions';

var Nav = {

  LeftButton: function(route, navigator, index, navState) {
    return null;
  },

  RightButton: function(route, navigator, index, navState) {
    return null;
  },

  Title: function(route, navigator, index, navState) {
    return (
      <Text style={[styles.navBarText, styles.navBarTitleText]}>
        {route.name}
      </Text>
    );
  },
};

export default class User extends React.Component{
    constructor(props) {
      super(props);
      this._renderScene = this._renderScene.bind(this);
    }

    _renderScene(route,nav) {
        switch (route.idx) {
            // case 'user':
            //     return (
            //         <ScrollView style={styles.lists}>
            //             <View style={styles.banner}><Text>手机登录|微信登录|QQ登录</Text></View>
            //             <TouchableOpacity onPress={()=>{nav.push({idx:'starList',name:'我的收藏'})}}>
            //                 <View style={styles.li}>
            //                     <Text style={styles.fonts}>我的收藏</Text>
            //                 </View>
            //             </TouchableOpacity>
            //             <TouchableOpacity onPress={()=>{nav.push({idx:'aboutMe',name:'关于我们'})}}>
            //                 <View style={styles.li}>
            //                     <Text style={styles.fonts}>关于我们</Text>
            //                 </View>
            //             </TouchableOpacity>
            //         </ScrollView>
            //     );
            //     break;
            case 'starList':
                return (
                    <StarList navigator={nav} pnav={this.props.pnav} starDatas={this.props.starDatas}/>
                );
                break;
            // case 'aboutMe':
            //     return (
            //         <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
            //             <Text>我就是kailuo99，酷炫狂炸碉堡天~~~</Text>
            //         </View>
            //     );
            //     break;
            default:
        }

    }
    // 判断是否需要导航条
    _navigationbar() {
        return (
            <Navigator.NavigationBar
              routeMapper={Nav}
              style={styles.navBar}
            />
        );
    }
    render() {
        return (
            <Navigator
              style={{flex:1}}
              initialRoute={{idx:'starList',name:'我的收藏'}}
              renderScene={this._renderScene}
              sceneStyle={{backgroundColor:'#eeeeee'}} // 场景的北京颜色
              configureScene={() => ({
                ...Navigator.SceneConfigs.HorizontalSwipeJump,
              })}
              navigationBar={
                this._navigationbar()
              }
            />
        );
    }
};

var styles = StyleSheet.create({

    lists: {
        marginTop:45,
    },
    banner: {
        height:(Dimensions.get('window').height-20)*3/10,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center',
        marginBottom: 40,
        marginTop:20,
    },
    li: {
        height: 60,
        backgroundColor:'#fff',
        marginBottom: 1,
        justifyContent:'center',
    },
    fonts: {
        fontSize:0.8,
        letterSpacing: 0.5,
        marginLeft:15,
    },
    navBar: {
        backgroundColor:'#fff',
        borderColor:'#dddddd',
        borderWidth:1
    },

    navBarText: {
      color:'#333',
      fontSize: 20,
      marginVertical: 12,
    },
    navBarTitleText: {
      fontWeight: '500',
      letterSpacing:0.8,
    },

});
