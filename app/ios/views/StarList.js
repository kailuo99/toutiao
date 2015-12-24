'use strict';

var React = require('react-native');
var {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Component,
  ScrollView,
  TouchableOpacity,
  AlertIOS,
  AsyncStorage,
} = React;

class StarList extends React.Component {

    constructor(props) {
      super(props);
    }

    render() {
        if(this.props.starDatas == null) {
            return (
                <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text>暂无收藏~</Text>
                </View>
            );
        } else {
            return (
                <View style={{flex:1}}>
                    <ScrollView style={styles.lists}>
                        {
                            this.props.starDatas.map((data)=>{
                                return (
                                    <TouchableOpacity onPress={()=>{
                                        this.props.pnav.push({sence:'detail', id:data, isStar:true});
                                    }}>
                                        <View style={styles.li}>
                                            <Text style={styles.fonts}>{data}</Text>
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
        marginTop:45,
        marginTop:85
    },
    li: {
        height: 60,
        backgroundColor:'#fff',
        marginBottom: 1,
        justifyContent:'center',
    },
    fonts: {
        fontSize:18,
        letterSpacing:0.5,
        marginLeft:15,
    },

});

module.exports = StarList;
