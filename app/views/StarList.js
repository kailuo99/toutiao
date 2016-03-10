'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Component,
  ScrollView,
  TouchableHighlight,
  AsyncStorage,
  Platform,
  PixelRatio
} from 'react-native';

export default class StarList extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
        if(this.props.starDatas == null || this.props.starDatas.length == 0) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{letterSpacing: 0.8,color:'#666'}}>暂无收藏~</Text>
                </View>
            );
        } else {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.lists}>
                        {
                            this.props.starDatas.map((data)=>{
                                return (
                                    <TouchableHighlight activeOpacity={0.7} underlayColor="#ccc" key={data.id} onPress={()=>{
                                        this.props.pnav.push({sence:'detail', id:data.id, title:data.title,isStar:true});
                                    }}>
                                        <View style={styles.li}>
                                            <Text style={styles.fonts}>{data.title}</Text>
                                        </View>
                                    </TouchableHighlight>
                                );
                            })
                        }
                        <View style={{height:20}}/>
                    </ScrollView>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({

    lists: {
        marginTop: 0,
    },
    li: {
        height: 75,
        backgroundColor:'#fff',
        justifyContent:'center',
        borderColor:'#dadbd8',
        borderBottomWidth:1/PixelRatio.get(),
        paddingLeft: 10,
    },
    fonts: {
        fontSize:(Platform.OS === 'ios')? 18: 17,
        letterSpacing:0.5,
        lineHeight: 25,
        marginRight: 10,
        color: (Platform.OS === 'ios')? '#333': '#555',
    },

});
