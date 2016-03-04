'use strict';

var PRE_LIST_URL = "http://m.yergoo.com/api/news/app/lists/";
var LISTS_KEY = "toutiao-kailuo99-";

import React, {
  Text,
  View,
  TouchableOpacity,
  ListView,
  AsyncStorage,
  Navigator,
  Alert,
  RefreshControl,
  AppState,
  ActivityIndicatorIOS,
  Platform
} from 'react-native';
import ProgressBar from 'ProgressBarAndroid';

import Li from './Li';

var ds = new ListView.DataSource({
    rowHasChanged: (r1, r2) => r1 !== r2,
    sectionHeaderHasChanged: (s1, s2) => s1 !== s2
});
//
export default class List extends React.Component{
  constructor(props) {
      super(props);
      this.state = {
         sign: null,
          datas:null,
          loaded:false,
          isFetchMaxId:0, //正在拉取的当前的数据的最大ID
          isRefreshing: false,
      };
      this._renderList=this._renderList.bind(this);
      this.onEndReached = this.onEndReached.bind(this);
      this._reloadLists = this._reloadLists.bind(this);
  }
  componentDidMount() {
      if(!this.state.loaded) {
          this._loadinitData();
      }

  }
  componentWillUnmount() {
    AppState.removeEventListener('change');
  }

  // 异步加载数据
  async _loadinitData() {
      var tmp = await AsyncStorage.getItem(LISTS_KEY + this.props.route.sign);
      if(tmp != null) {
          tmp =  JSON.parse(tmp);
          if(tmp.lists.length > 2) {
              if(tmp.lists[0].length > 6) {
                  tmp.lists.splice(0,tmp.lists.length-2);
              } else {
                  tmp.lists.splice(1,tmp.lists.length-2);
              }

              AsyncStorage.setItem(LISTS_KEY + this.props.route.sign, JSON.stringify(tmp)).done();
          }
          this.setState({
            datas: tmp,
            loaded: true,
          });
          if(this.props.route.sign == 'index') {
            await this.getData('top');
          }
      } else {
          await this.getData('init');
      }
  }
  // 获取数据
  async getData(pos) {
      if(!this.state.datas) {
        var begin_id = 0;
      } else {
        var begin_id = this.state.datas.max;
      }
      var url = PRE_LIST_URL + this.props.route.sign + '?beginid=' + begin_id;
      console.log(url);
      fetch(url)
        .then((response) => response.json())
        .then(
          (responseData) => {
            if(responseData.status == 1) {

                if(this.state.datas == null) {
                    var tmp = {
                        lists:[responseData.data.lists.lists],
                        max: responseData.data.lists.max,
                    };

                } else {
                    var tmp = this.state.datas;
                    if(pos == 'top') {
                      tmp.lists.unshift(responseData.data.lists.lists);
                    } else {
                      tmp.lists.push(responseData.data.lists.lists);
                    }
                    tmp.max = responseData.data.lists.max;

                }
                this.setState({
                  datas: tmp,
                  loaded: true,
                });
                AsyncStorage.setItem(LISTS_KEY + this.props.route.sign, JSON.stringify(tmp)).done();
            } else {
                // Alert.alert('暂无最新，请稍等片刻！');
            }
          }
         )
        .done();
  }
  
  _renderList(data,sectionID,rowID) {
      return (
        <TouchableOpacity activeOpacity={0.5} key={data.resource.id} onPress={()=>this.navHandleChange(data.resource)}>
          <Li data={data.resource} />
        </TouchableOpacity>
      );
  }
  // 进入详情页
  navHandleChange(data) {
      if(this.props.starDatas != null) {
          for(var i = 0; i < this.props.starDatas.length; i++) {
              if(this.props.starDatas[i].id == data.id) {
                  this.props.pnav.push({
                      id: data.id,
                      sence:'detail',
                      isStar: true,
                      title: data.title,
                  });
                  return;
              }
          }
      }

      this.props.pnav.push({
          id:data.id,
          sence:'detail',
          isStar: false,
          title: data.title,
      });
  }
  _reloadLists() {
      this.setState({isRefreshing: true});
      setTimeout(() => {
        this.getData('top');
        this.setState({isRefreshing: false});
      }, 1000);
  }

  renderFooter() {
    if(Platform.OS === 'ios') {
        return (
          <View style={{flex:1, height:40,alignItems:'center',justifyContent:'center'}}>
            <ActivityIndicatorIOS color = {'#d43d3d'} />
          </View>
        );
    } else {
      return (
        <View style={{flex:1, height:40,alignItems:'center',justifyContent:'center'}}>
          <ProgressBar color = {'#d43d3d'} />
        </View>
      );
    }
  }
  // 数据加载到底部时候拉取新数据
  onEndReached() {
    // 防止多次重复加载
    if(this.state.isFetchMaxId != this.state.datas.max) {
        this.setState({
            isFetchMaxId:this.state.datas.max,
        });
        this.getData('bottom');
    }
  }
  render() {
      if(!this.state.loaded) {
        if(Platform.OS === 'ios') {
          return (
            <View style={{flex:1}}>
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <ActivityIndicatorIOS color = {'#d43d3d'} />
              </View>
            </View>
          );
        } else {
          return (
            <View style={{flex:1}}>
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <ProgressBar color = {'#d43d3d'} />
              </View>
            </View>
          );
        }
        
      } else {
        return (
          <View style={{flex: 1,marginTop:64,}} >
            <ListView style={{flex:1,overflow: 'hidden',marginBottom:50}}
              initialListSize={6}
              pageSize={1}
              scrollRenderAheadDistance={100}
              removeClippedSubviews={true}
              dataSource={ds.cloneWithRowsAndSections(this.state.datas.lists)} // 渲染的数据聚合
              renderRow={this._renderList}  // 单一条数模板
              minPulldownDistance={30}   // 最新下拉长度
              renderFooter={this.renderFooter}
              onEndReached={this.onEndReached}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.isRefreshing}
                  onRefresh={this._reloadLists}
                  tintColor="#fff"
                  title="正在拉取数据..."
                />
              }
            />
          </View>
        );
      }
  }

};
