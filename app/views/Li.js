'use strict';

import React, {
  StyleSheet, // 样式
  Text, // 文本
  View, // 类似于DIV
  Image,
  PixelRatio,
} from 'react-native';

import Dimensions from 'Dimensions';


export default class Li extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        if(this.props.data.images.length >=3) {
            return this.li3(this.props.data);
        } else if (this.props.data.images.length >=1) {
            return this.li1(this.props.data);
        } else {
            return this.li0(this.props.data);
        }
    }

    li0(data) {
        return (
            <View style={styles.list}>
                <Text style={styles.listTitle}>{data.title}</Text>
                <Text style={styles.listMute}>{data.source_public_time}    {data.source}</Text>
            </View>
        );
    }

    li1(data) {
        return (
            <View style={styles.list}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{flex:1}}>
                        <Text style={styles.listTitle}>{data.title}</Text>
                        <Text style={styles.listMute}>{data.source_public_time}    {data.source}</Text>
                    </View>
                    <Image style={styles.listImg} source={{uri: data.images[0].url}} />
                </View>
            </View>
        );
    }

    li3(data) {
        return (
            <View style={styles.list}>
                <Text style={styles.listTitle}>{data.title}</Text>
                <View style={{marginTop:3,flexDirection:'row'}}>
                    <Image style={styles.listImg} source={{uri: data.images[0].url}} />
                    <Image style={styles.listImg} source={{uri: data.images[1].url}} />
                    <Image style={styles.listImg} source={{uri: data.images[2].url}} />
                </View>
                <Text style={styles.listMute}>{data.source_public_time}    {data.source}</Text>
            </View>
        );
    }
};

var styles = StyleSheet.create({

  list: {
        paddingTop:12,
        paddingBottom:12,
        paddingLeft:5,
        paddingRight:5,
        backgroundColor:'#fff',
        marginBottom:1,
  },
  listTitle: {
      marginTop:-4,
      lineHeight:23,
      fontWeight:'400',
      marginBottom:4,
      letterSpacing:0.8,
      fontSize:19,
      color:'#333',
  },
  listImg: {
      marginLeft:2,
      marginRight:2,
      width: (Dimensions.get('window').width-22)/3,
      height: (Dimensions.get('window').width-22)*10/43,
  },
  listMute: {
      fontSize:12,
      color:'#999',
      marginTop:10,
  }

});
