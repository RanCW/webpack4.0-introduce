## 初识webpack
### 1.什么是webpack？
  webpack 是一个现代 JavaScript 应用程序的静态模块打包器(module bundler)。当 webpack 处理应用程序时，它会递归地构建一个依赖关系图(dependency graph)，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 bundle。
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
        {
          test: /\.js$/,
          use:[
            {
              loader:'babel-loader'
            }
          ]
        }
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
            {
              test: /\.js$/,
              use:[
                {
                  loader:'babel-loader'
                }
              ]
            },
            {
              test:/\.css/,
              use:[
                'style-loader',
                'css-loader'
              ]
            }
          ]
        }
      }
```
 * less-loader 
    解析 Less 和 SaSS
 #### 2.5 plugins

  