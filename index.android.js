'use strict';

import React, {
  AppRegistry,
  StyleSheet,
  Navigator,
  AsyncStorage,
  TouchableOpacity,
  Text
} from 'react-native';

import TabIndex from './app/ios/views/TabIndex';
import Detail from './app/ios/views/Detail';
import Icon from 'react-native-vector-icons/Ionicons';
import Statistic from './app/ios/modules/Statistic';

var STAR_KEY = "toutiao-star-";

//
var toutiao = React.createClass({

    getInitialState() {
        return {
            hideNavBar:true,
            starDatas: null,
        };
    },
    componentDidMount() {
        // 异步获取
        this._initGetData();
        Statistic.Run();
    },
    // 初始化执行
    async _initGetData() {
        // 获取收藏数据
        var tmps = await AsyncStorage.getItem(STAR_KEY);
        this.setState({
            starDatas: tmps != null? JSON.parse(tmps): null,
        });
    },

    _refFunc(navigator) {
        var callback = (event) => {
             var route = event.data.route;
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
        };
          this._listeners = [
            // navigator.navigationContext.addListener('didfocus', callback),
            navigator.navigationContext.addListener('willfocus', callback),
          ];
    },
    componentWillUnmount() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },
    _renderScene(route,nav) {
        switch (route.sence) {
            case 'tab':
                return <TabIndex route={route} pnav={nav} starDatas={this.state.starDatas}/>
                break;
            case 'detail':
                return <Detail route={route} pnav={nav} id={route.id} />
                break;
            default:
        }
    },

    render() {
        return (
            <Navigator
              ref={this._refFunc}
              style={{flex:1}} // 整体的背景颜色
              initialRoute={{sence:'tab'}}
              renderScene={this._renderScene}
              sceneStyle={{backgroundColor:'#fff'}} // 场景的北京颜色
              navigationBar={this._navBar()}
            />);
    },

    _navBar() {
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
            return <Text style={{height:0,}}/>;
        }
    },
    // Nav使用
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
    },
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
  },
  _changeDetailStar(route,navigator) {
      var tmpRoute = route;
      var dataArr = this.state.starDatas;
        if(dataArr != null) {
             if(route.isStar) {
                if(dataArr.length > 0) {
                    for(var i=0; i< dataArr.length; i++) {
                        if(dataArr[i].id == route.id) {
                           dataArr.splice(i,1);
                           tmpRoute.isStar = !tmpRoute.isStar;
                           navigator.replace(tmpRoute);
                           break;
                        }
                    }
                }
            } else {
                dataArr.unshift({id: route.id, title: route.title});
                tmpRoute.isStar = !tmpRoute.isStar;
                navigator.replace(tmpRoute);
            }
        } else {
            dataArr = [];
            if(!route.isStar) {
              dataArr.unshift({id: route.id, title: route.title});
              tmpRoute.isStar = !tmpRoute.isStar;
              navigator.replace(tmpRoute);
            }
        }
        this.setState({
            starDatas: dataArr,
        });
        AsyncStorage.setItem(STAR_KEY, JSON.stringify(dataArr)).done();
  },
  Title(route, navigator, index, navState) {
    return null;
  },
});

var styles = StyleSheet.create({
  navBar: {
      backgroundColor:'#fff',
      borderColor:'#dddddd',
      borderWidth:1
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
      marginTop:6,
      textAlign:'center'
  }
});

AppRegistry.registerComponent('toutiao', () => toutiao);
