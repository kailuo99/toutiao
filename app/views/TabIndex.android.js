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

export default class TabIndex extends React.Component{

    constructor(props) {
      super(props);
      this.state = {
         tabIndex:0,
      };
    }

    _renderScene() {
        switch(this.state.tabIndex) {
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
            <View style={styles.container}>
              {this._renderScene()}
              <View style={styles.tabbar}>
                {
                  TabArr.map((tabItem)=>{
                    return (
                      <TouchableOpacity
                        activeOpacity={1}
                        style={styles.tabitem} 
                        key={tabItem.key} 
                        onPress={()=>{
                          if(this.state.tabIndex !== tabItem.key) {
                            this.setState({
                              tabIndex: tabItem.key,
                            });
                          }
                        }}
                      >
                        <View>
                          <Icon 
                            name={(this.state.tabIndex === tabItem.key)? tabItem.selectedIcon: tabItem.icon} 
                            style={{marginTop:4, color: (this.state.tabIndex === tabItem.key)? '#5c73f9ff': '#666'}} 
                            size={30} 
                          />
                          <Text style={styles.tabtext}>{tabItem.title}</Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })
                }
              </View>
            </View>
        );
    }
};

var styles = StyleSheet.create({
    container: {
      flex: 1,
      marginBottom:0,
      flexDirection:'column'
    },
    tabbar: {
      backgroundColor: '#fff',
      borderTopColor:'#dddddd',
      borderTopWidth: 1,
      height: 55,
      flexDirection:'row',
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
