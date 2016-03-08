'use strict';

import React, {
  StyleSheet, // 样式
  PixelRatio,
  View,
  TouchableOpacity,
  Text,
  Navigator
} from 'react-native';

import News from './News';
import User from './User';
import Icon from 'react-native-vector-icons/Ionicons';

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

class TabBar extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        index: this.props.navState.presentedIndex
      };
    }
    render() {
      return (
        <View style={styles.tabbar}>
        {
          TabArr.map((tabItem)=>{

            return (
              <TouchableOpacity
                activeOpacity={1}
                style={styles.tabitem} 
                key={tabItem.key} 
                onPress={()=>{
                  if(this.state.index !== tabItem.key) {
                    if(tabItem.key === 0) {
                      this.props.navigator.pop();
                    } else {
                      this.props.navigator.push(TabArr[1]);
                    }
                    this.setState({
                      index: tabItem.key,
                    });
                  }
                }}
              >
                <View>
                  <Icon 
                    name={(this.state.index === tabItem.key)? tabItem.selectedIcon: tabItem.icon} 
                    style={{marginTop:4, color: (this.state.index === tabItem.key)? '#5c73f9ff': '#666'}} 
                    size={30}
                  />
                  <Text style={styles.tabtext}>{tabItem.title}</Text>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </View>
      );
    }
}

export default class TabIndex extends React.Component{

    constructor(props) {
      super(props);
      this._renderScene = this._renderScene.bind(this);
    }
    
    _renderScene(route, nav) {
        switch(route.key) {
          case 0:
            return <News pnav={this.props.pnav} starDatas={this.props.starDatas} />;
            break;
          case 1:
            return <User pnav={this.props.pnav} starDatas={this.props.starDatas} />;
            break;
        }
    }

    render() {

        return (

            <Navigator
              style={{flex:1}}
              initialRoute={TabArr[0]}
              renderScene={this._renderScene}
              sceneStyle={{backgroundColor:'#fff'}}
              navigationBar={
                <TabBar 
                  navigator={this.props.navigator}
                  navState={this.props.navState}
                />
              }

            />
        );
    }
};

var styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabbar: {
      backgroundColor: '#fff',
      borderTopColor:'#dddddd',
      borderTopWidth: 1,
      height: 55,
      flexDirection:'row',
      position: 'relative',
      bottom:0,
      left:0,
      right:0,
    },
    tabitem: {
      flex: 1,
      height: 55,
      alignItems: 'center',
    },
    tabtext: {
      textAlign: 'center',
      fontSize: 12,
    }

});
