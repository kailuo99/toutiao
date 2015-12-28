# react-native-toutiao
一款使用react native 开发的ios版的资讯头条APP。

# 实现的功能有：

1. 手势支持的切换界面
2. 下拉刷新
3. 上拉加载更多
4. 收藏功能

# 使用的组件

1. 图标： oblador/react-native-vector-icons
2. 下拉刷新：jsdf/react-native-refreshable-listview

# 使用方式

    需要对react-native有所了解，不会配置环境请查看官方文档。

## 模拟器运行
1. 下载/解压压缩包 或者 git clone https://github.com/kailuo99/toutiao.git 源码
2. cd toutiao && npm install
3. 打开ios目录下的toutiao.xcodeproj，再xcode中点击run。

## 手机在线使用
1. 再xcode 中修改 Appdelegate.m .将里面的localhost改成你电脑的IP。电脑和手机需要在同一个局域网下。
2. 点击xcode中的run。
Note:
    1. 如果出现因为安全不能运行的提示  
    依次执行：手机中的设置-通用-设备管理-信任。点击实例icon，即可运行。

## 手机离线使用
1. 去掉注释 Appdelegate.m 里面的注释，详情看文档。
2. 项目目录下执行：react-native bundle --dev false --platform ios --bundle-output main.jsbundle --entry-file index.ios.js
3. XCODe下执行：你的项目->build settings->Linking->Dead Code Stripping设置为No.
4. XCODe下执行：菜单->product->scheme->edit scheme->run->build config 设置为 release，debug executable 去掉。

第一步是为了将js bundle包进行压缩。2、3步是为了去掉 shake your phone 模式。

# 截图


