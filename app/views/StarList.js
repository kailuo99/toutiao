'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Component,
  ScrollView,
  TouchableOpacity,
  AsyncStorage,
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
                                    <TouchableOpacity key={data.id} onPress={()=>{
                                        this.props.pnav.push({sence:'detail', id:data.id, title:data.title,isStar:true});
                                    }}>
                                        <View style={styles.li}>
                                            <Text style={styles.fonts}>{data.title}</Text>
                                        </View>
                                    </TouchableOpacity>
                                );
                            })
                        }
                    </ScrollView>
                </View>
            );
        }
    }
}

var styles = StyleSheet.create({

    lists: {
        marginTop:60,
    },
    li: {
        height: 75,
        backgroundColor:'#fff',
        marginBottom: 1,
        justifyContent:'center',
    },
    fonts: {
        fontSize:18,
        letterSpacing:0.5,
        marginLeft: 15,
        lineHeight: 25,
    },

});
