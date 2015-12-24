'use strict';

var React = require('react-native');
var TabIndex = require('./app/ios/views/TabIndex');
var Detail = require('./app/ios/views/Detail');
var Icon = require('react-native-vector-icons/Ionicons');
var {
  AppRegistry,
  StyleSheet,
  Navigator,
  AlertIOS,
  AsyncStorage,
  TouchableOpacity,
  Text
} = React;

var STAR_KEY = "toutiao-star-";

//
var toutiao = React.createClass({
    getInitialState: function() {
        return {
            hideNavBar:true,
            starDatas: null,
        };
    },
    componentDidMount: function() {
        // 异步获取
        this._getstars().done();
    },
    _renderScene: function(route,nav) {
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
    // 获取收藏数据
    async _getstars() {
        var tmps = await AsyncStorage.getItem(STAR_KEY);
        this.setState({
            starDatas: tmps != null? JSON.parse(tmps): null,
        });
    },
    _navBar: function() {
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
            return null;
        }
    },

    _refFunc: function(navigator) {
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
    componentWillUnmount: function() {
        this._listeners && this._listeners.forEach(listener => listener.remove());
    },

    render: function() {
        return (
            <Navigator
              ref={this._refFunc}
              style={{flex:1}} // 整体的背景颜色
              initialRoute={{sence:'tab'}}
              renderScene={this._renderScene}
              sceneStyle={{backgroundColor:'#fff'}} // 场景的北京颜色
            //   configureScene={() => ({
            //     ...Navigator.SceneConfigs.FloatFromRight,
            //   })}
              navigationBar={
                  this._navBar()
              }
            />
        );
    },
    // Nav使用
    LeftButton: function(route, navigator, index, navState) {
        return (
          <TouchableOpacity
            onPress={() => navigator.pop()}
            style={styles.navBarLeftButton}>
            <Text style={[styles.navBarText, {color:'#666'}]}>
              返回
            </Text>
          </TouchableOpacity>
        );
    },
    RightButton: function(route, navigator, index, navState) {
      if(route.isStar) {
          return (
              <TouchableOpacity
               onPress={()=>this._changeDetailStar(route,navigator,this.state.starDatas)}
                style={styles.navBarRightButton}>
                <Icon
                    name='ios-star'
                    size={25}
                    color='black'
                    style={{width:25,height:25,marginTop:10}}
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
                    size={25}
                    color='black'
                    style={{width:25,height:25,marginTop:10}}
                />
              </TouchableOpacity>
          );
      }
  },
  _changeDetailStar: function(route,navigator) {
      var tmpRoute = route;
      var dataArr = this.state.starDatas;
        if(dataArr != null) {
             if(route.isStar) {
                if(dataArr.length > 0) {
                    for(var i=0; i< dataArr.length; i++) {
                        if(dataArr[i] == route.id) {
                           dataArr.splice(i,1);
                           tmpRoute.isStar = !tmpRoute.isStar;
                           navigator.replace(tmpRoute);
                           break;
                        }
                    }
                }
            } else {
                dataArr.unshift(route.id);
                tmpRoute.isStar = !tmpRoute.isStar;
                navigator.replace(tmpRoute);
            }
        } else {
            dataArr = [];
            if(!route.isStar) {
              dataArr.unshift(route.id);
              tmpRoute.isStar = !tmpRoute.isStar;
              navigator.replace(tmpRoute);
            }
        }
        this.setState({
            starDatas: dataArr,
        });
        AsyncStorage.setItem(STAR_KEY, JSON.stringify(dataArr)).done();
  },
  Title: function(route, navigator, index, navState) {
    return null;
  },
});

var styles = StyleSheet.create({
  navBar: {
      backgroundColor:'#fff',
      borderColor:'#EAEAEA',
      borderWidth:1
  },
  navBarButtonText: {
      color:'#666',
      fontSize:16,
  },
  navBarText: {
    color:'#333',
    fontSize: 18,
    marginVertical: 14,
  },
  navBarTitleText: {
    fontWeight: '500',
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
  navBarRightButton: {
      marginRight:10,
  }
});

AppRegistry.registerComponent('toutiao', () => toutiao);
