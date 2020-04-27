## 初识webpack4.0
### 1.什么是webpack？
  webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。   
  使用webpack ：
  * 在项目文件夹目录下执行：npm init -y 生成package.json文件，当然自己创建也可以
  * 安装webpack： npm install --save-dev webpack webpack-cli，
  注意webpack4.0一定要安装webpack-cli
### 2.webpack配置项组成
  * mode —— 环境
  * entry —— 打包的入口文件
  * output —— 打包的输出
  * module —— loader配置
  * plugins —— 插件配置    
#### 2.1 mode配置项
  mode⽤来指定当前的构建环境，可选项有：     
   * production （mode的默认值）—— 会将 process.env.NODE_ENV 的值设为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin
   * development —— 会将 process.env.NODE_ENV 的值设为 development，启用 NamedChunksPlugin 和 NamedModulesPlugin
   * none —— 不开启任何优化
#### 2.2 entry
  打包的入口文件，默认是单个入口（./src/index.js）。
   * 2.2.1 单入口,entry是一个字符串
```javascript
  module.exports = {
    entry: './src/index.js',
  };
```
   * 2.2.2 多入口，entry是一个对象  
  ```javascript
    module.exports = {
      entry: {
        app: './src/app.js',
        list: './src/list.js',
      },
    };
  ```
#### 2.3 output
  output是⽤来告诉webpack如何将编译后的⽂件输出到磁盘，output的配置和entry的单个、多个入口有一一对应的配置：
  * 单个entry入口配置：
  ```javascript
  module.exports = {
    entry : './src/index.js',
    output:{
      filename: 'bundle.js',
      path: __dirname + '/dist'
    }
  }
  ```
  * 多个entry 入口配置
  ```javascript 
    module.exports = {
      entry:{
        app: './src/index.js',
        list: './src/list.js'
      },
      output: {
        filename: '[name].js',
        path: __dirname + '/dist'
      }
    }
  ```
#### 2.4 module
 module的选项决定了如何处理项目中的不同类型的模块，着重讲解module.rules,rules主要是与loader相关的配置，我们常用的loader有：  
 | loader   | 描述 |
 | :----:   | :----: |
 | babel-loader | 转换ES6/ES7等js新特性语法 |
 | css-loader | 支持对css文件的加载和解析 |
 | less-loader | 将less转换成css |
 | ts-loader | 将ts转换成js |
 | file-loader | 对图片、字体打包 |
 | raw-loader | 将文件以字符串形式导入 |
 | thread-loader | 多进程打包js/css |

注意：每个loader在第一次使用前都需要先安装依赖。

 * babel-loader使用方法
   1. 安装： npm install babel-loader babel-core babel-preset-env webpack
   2. 创建.babel.rc文件
 ```javascript  
  // webpack.js的配置项内容  
  module.exports = {
    entry : './src/index.js',
    output:{
      filename: 'bundle.js',
      path: __dirname + '/dist'
    },
    module:{
      rules:[
      + {
      +   test: /\.js$/,
      +   use:[
      +     {
      +       loader:'babel-loader'
      +     }
      +   ]
      + }
      ]
    }
  }
  // .babel.rc 内容
  {
    "presets": [
      "@babel/preset-env"
    ]
  }
 ```
 * css-loader
    安装： npm install --save-dev css-loader style-loader  
    css-loader ⽤于加载 .css ⽂件，并且转换成 commonjs 对象  
    style-loader 将样式通过\<style>标签插⼊到head中  
    
```javascript 
      module.exports = {
        entry : './src/index.js',
        output:{
          filename: 'bundle.js',
          path: __dirname + '/dist'
        },
        module:{
          rules:[
          + {
          +   test:/\.css/,
          +   use:[
          +     'style-loader',
          +     'css-loader'
          +   ]
          + }
          ]
        }
      }
```
 * less-loader    
    将less转换成css   
    安装：npm install --save-dev less-loader less      

```javascript
      module.exports = {
        entry : './src/index.js',
        output:{
          filename: 'bundle.js',
          path: __dirname + '/dist'
        },
        module:{
          rules:[
          + {
          +   test: /\.less$/,
          +   use:[
          +     {
          +       loader:'style-loader',
          +     },
          +     {
          +       loader:'css-loader',
          +     },
          +     {
          +       loader:'less-loader',
          +     }
          +   ]
          + },
          ]
        }
      }
```   

  * file-loader   
    file-loader 的作用主要是解析资源文件例如图片、字体文件   
    安装：npm install --save-dev file-loader   

```javascript
      module.exports = {
        entry : './src/index.js',
        output:{
          filename: 'bundle.js',
          path: __dirname + '/dist'
        },
        module:{
          rules:[
          + {
          +   test: /\.(png|jpg|gif|svg|woff|woff2|eot|ttf|otf)$/,
          +   use:[
          +     {
          +       loader:'file-loader',
          +     },
          +  ]
          + },
          ]
        }
      }
```   


  同样处理图片的时候还可以使用url-loader，url-loader与file-loader的区别就是url-loader可以在文件大小(单位byte)低于指定值的时候返回一个base64格式的DataURL,
    安装：npm install --save-dev url-loader      
    使用如下：   



```javascript
      module.exports = {
        entry : './src/index.js',
        output:{
          filename: 'bundle.js',
          path: __dirname + '/dist'
        },
        module:{
          rules:[
          +  {
          +   test: /\.(png|jpg|gif|svg)$/,
          +   use:[
          +     {
          +       loader:'file-loader',
          +       options: {
          +         limit: 8192
          +       }
          +     },
          +   ]
          + },
          ]
        }
      }   

  ```   

 #### 2.5 plugins   
 在插件中我们使用的有很多，这里就先例举一个很简单的自动生成html文件的插件
 * html-webpack-plugin   
 该插件将为你生成一个 HTML5 文件， 其中包括使用 script 标签的 body 中的所有 webpack 包。 只需添加插件到你的 webpack 配置。
 安装：    
 
 配置如下：
 ```javascript
  module.exports = {
        entry : './src/index.js',
        output:{
          filename: 'bundle.js',
          path: __dirname + '/dist'
        },
    +  plugins:[
    +     new HtmlWebpackPlugins({
    +       template: 'index.html',
    +       filename: 'index.html'
    +     })
    +   ]
    + }
 ```
 
 以上对于webpack4.0最基本的用法就已经讲差不多了，完整的示例可以访问 [示例GitHub地址](https://github.com/RanCW/webpack4.0-introduce)

 未完待续、、、、

 即将奉上下一章《第二章：探索webpack》

参考文献：

 [webpack中文网](https://www.webpackjs.com/concepts/)

 [webpack官网](https://webpack.js.org/concepts/)

  