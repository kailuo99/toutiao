# react-native-toutiao
ios app


# question
## 无法dev=false,无法去掉shake your phone
### 离线打包标准步骤
1. 去掉注释 Appdelegate.m 里面的注释，详情看文档。
2. 项目目录下执行：react-native bundle --dev false --platform ios --bundle-output main.jsbundle --entry-file index.ios.js
3. XCODe下执行：你的项目->build settings->Linking->Dead Code Stripping设置为No.
4. XCODe下执行：菜单->product->scheme->edit scheme->run->build config 设置为 release，debug executable 去掉。

第一步是为了将js bundle包进行压缩。2、3步是为了去掉 shake your phone 模式。

## onpress 怎么做到多次单击，只有一次有效



# JS ES6学习

## 类的使用方法

class extends ParentClass {
    constructor() { // 类似于php __construct()

    }

    say() { // 定义方法

    }
}

## let var区别

let在 {}之内使用，超出调用返回undefined
var 在 function() {} 里面使用。

    eg:  function printName() {
              var name = "Hey";
              if(true) {
                let name = "Rafael";
                console.log(name); // Rafael
              }
              console.log(name); // Hey
          }
