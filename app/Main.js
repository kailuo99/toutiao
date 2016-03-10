'use strict';

import React, {
  Navigator,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform
} from 'react-native';

import TabIndex from './views/TabIndex';
import Detail from './views/Detail';
import Statistic from './modules/Statistic';
import Icon from 'react-native-vector-icons/Ionicons';

var STAR_KEY = "toutiao-star-";

//
export default class Main extends React.Component {

  constructor(props) {
      super(props);
      this.state = {
        hideNavBar: true,
        starDatas: null,
      };
      this._renderScene = this._renderScene.bind(this);
      this._willFocus = this._willFocus.bind(this);
      this.RightButton = this.RightButton.bind(this);
  }
  componentDidMount() {
      this._initGetData();
      var x = new Statistic();
      x.Run();
  }
  // 初始化执行-可以优化：1.不进行组建的刷新；2.不在这里获取收藏数据
  async _initGetData() {
      // 获取收藏数据
      var tmps = await AsyncStorage.getItem(STAR_KEY);
      this.setState({
          starDatas: tmps != null? JSON.parse(tmps): null,
      });
  }
  // 监听的回调
  _willFocus(route) {
     if(route.sence == 'detail') {
        // 这里写逻辑来加载收藏的路由
        this.setState({
            hideNavBar:false,
        });
    } else {
        this.setState({
            hideNavBar:true,
        });
    }
  }

  _renderScene(route,nav) {
      switch (route.sence) {
          case 'tab':
              return <TabIndex pnav={nav} starDatas={this.state.starDatas}/>
              break;
          case 'detail':
              return <Detail route={route} pnav={nav} id={route.id} />
              break;
          default:
      }
  }

  // 渲染DOM
  render() {
    return (
        <Navigator
          style={{flex:1}}
          initialRoute={{sence:'tab'}}
          renderScene={this._renderScene}
          sceneStyle={{backgroundColor:'#fff'}} // 场景的背景颜色
          navigationBar={this.navBar()}
          onWillFocus={this._willFocus}
        />
      );
  }

  // Nav使用
  navBar() {
    if(!this.state.hideNavBar) {
        return <Navigator.NavigationBar
                  routeMapper={{
                      LeftButton: this.LeftButton,
                      RightButton: this.RightButton,
                      Title: this.Title
                  }}
                  style={styles.navBar}
                />;
    } else {
        return <Text style={{height:0,position:'absolute',top:0}} />;
    }
  }

  LeftButton(route, navigator, index, navState) {
      return (
        <TouchableOpacity
          onPress={() => navigator.pop()}
          style={styles.navBarLeftButton}>
          <Icon
              name='ios-arrow-left'
              size={30}
              color='#666'
              style={styles.icon}
          />
        </TouchableOpacity>
      );
  }
  RightButton(route, navigator, index, navState) {
    if(route.isStar) {
        return (
            <TouchableOpacity
             onPress={()=>this._changeDetailStar(route,navigator,this.state.starDatas)}
              style={styles.navBarRightButton}>
              <Icon
                  name='ios-star'
                  size={30}
                  color='#333'
                  style={styles.icon}
              />
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
             onPress={()=>this._changeDetailStar(route,navigator,this.state.starDatas)}
              style={styles.navBarRightButton}>
              <Icon
                  name='ios-star-outline'
                  size={30}
                  color='#333'
                  style={styles.icon}
              />
            </TouchableOpacity>
        );
    }
  }
  _changeDetailStar(route,navigator) {
      var tmpRoute = route;
      var starDatas = this.state.starDatas;
        if(starDatas != null) {
             if(route.isStar) {
                if(starDatas.length > 0) {
                    for(var i=0; i< starDatas.length; i++) {
                        if(starDatas[i].id == route.id) {
                           starDatas.splice(i,1);
                           tmpRoute.isStar = !tmpRoute.isStar;
                           navigator.replace(tmpRoute);
                           break;
                        }
                    }
                }
            } else {
                starDatas.unshift({id: route.id, title: route.title});
                tmpRoute.isStar = !tmpRoute.isStar;
                navigator.replace(tmpRoute);
            }
        } else {
            starDatas = [];
            if(!route.isStar) {
              starDatas.unshift({id: route.id, title: route.title});
              tmpRoute.isStar = !tmpRoute.isStar;
              navigator.replace(tmpRoute);
            }
        }
        this.setState({
            starDatas: starDatas,
        });
        AsyncStorage.setItem(STAR_KEY, JSON.stringify(starDatas)).done();
  }
  Title(route, navigator, index, navState) {
    return null;
  }
}


var styles = StyleSheet.create({
  navBar: {
      backgroundColor:'#fff',
      borderColor:'#dddddd',
      borderWidth:1,
      height: (Platform.OS === 'ios')? 64: 48
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 5,
  },
  navBarRightButton: {
      marginRight:5,
  },
  icon: {
      width:30,
      height:30,
      marginTop:(Platform.OS === 'ios')? 6: 9,
      textAlign:'center'
  }
});
