'use strict';

import React, {
    AsyncStorage,
    NetInfo,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';

var DEVICE_KEY = "toutiao-device-";
var PRE_LIST_URL = "http://m.yergoo.com/api/news/app/statistics/";
var INSTALL_KEY = "toutiao-install-statistics";

// 格式化时间
Date.prototype.Format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//
export default class Statistic {
    // 安装后执行一次
    Run() {
        this._getDeviceInfo();
        // 判断是否联网
        NetInfo.isConnected.fetch().done((isConnected) => {
            if (isConnected) {
                this._fetchData();
            } else {
                NetInfo.isConnected.addEventListener(
                    'change',
                    handleFirstConnectivityChange
                );
            }
        });
        //
        function handleFirstConnectivityChange(isConnected) {
            if (isConnected) {
                this._fetchData();
                NetInfo.isConnected.removeEventListener(
                    'change',
                    handleFirstConnectivityChange
                );
            }
        }
    }
    // 获取设备信息
    async _getDeviceInfo() {
            // 收集数据，本地存储
            var device_info = await AsyncStorage.getItem(DEVICE_KEY);
            if (device_info == null) {
                var ret = {
                    device_unique: DeviceInfo.getUniqueID(),
                    model: DeviceInfo.getModel(),
                    device: DeviceInfo.getDeviceId(),
                    device_name: DeviceInfo.getDeviceName(),
                    system: DeviceInfo.getSystemName(),
                    system_version: DeviceInfo.getSystemVersion(),
                    bundle: DeviceInfo.getBundleId(),
                    bundle_name: DeviceInfo.getBuildNumber(),
                    version: DeviceInfo.getVersion(),
                    datetime: (new Date()).Format("yyyy-MM-dd hh:mm:ss"),
                };
                navigator.geolocation.getCurrentPosition(
                  (initialPosition) => {
                    ret.latitude = initialPosition.coords.latitude;
                    ret.longitude = initialPosition.coords.longitude;
                    AsyncStorage.setItem(DEVICE_KEY, JSON.stringify(ret));

                  },
                  (error) => {
                    AsyncStorage.setItem(DEVICE_KEY, JSON.stringify(ret));
                  },
                );
            }
    }
    //
    async _fetchData() {

        // 统计安装
        var tmp = await AsyncStorage.getItem(INSTALL_KEY);
        // console.log(tmp);

        if (tmp == null) {
            // 获取数据
            var post_data = await AsyncStorage.getItem(DEVICE_KEY);
            if(post_data == null) {
                await this._getDeviceInfo();
                post_data = await AsyncStorage.getItem(DEVICE_KEY);
            }

            // 调用接口进行上报
            var responseJson = await fetch(
                PRE_LIST_URL + 'install',
                {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: post_data
                }
            );
            if(responseJson.ok) {

                var dataJson = await responseJson.json();
                if (dataJson.status == 1 && dataJson.data.unique && dataJson.data.id) {
                    tmp = {
                        unique: dataJson.data.unique,
                        id: dataJson.data.id,
                    };
                    await AsyncStorage.setItem(INSTALL_KEY, JSON.stringify(tmp));
                }
            };

        } else {
            tmp = JSON.parse(tmp);
        }
        tmp.datetime = (new Date()).Format("yyyy-MM-dd hh:mm:ss");
        // 运行接口
        await fetch(
            PRE_LIST_URL + 'run',
            {
              method: 'POST',
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
              },
              body: JSON.stringify(tmp) //string
            }
        );

    }

}
