# 环境变量

> #### 环境变量是非常必要的，通过环境变量你可以自定义项目当中相关配置，此时.env.local将帮助你去配置项目中的差异，你也可以丰富环境变量

- #### VITE_APP_TITLE ：当前项目的标题

- #### VITE_APP_SERVER_PORT : 指定开发服务器端口。注意：如果端口已经被使用，Vite 会自动尝试下一个可用的端口，所以这可能不是开发服务器最终监听的实际端口

- #### VITE_APP_SERVER_HOST ：指定服务器应该监听哪个 IP 地址。 如果将此设置为 `0.0.0.0` 或者 `true` 将监听所有地址，包括局域网和公网地址

- #### VITE_APP_SERVER_OPEN ：开发服务器启动时，自动在浏览器中打开应用程序。当该值为字符串时，它将被用作 URL 的路径名

- #### VITE_APP_BUILD_IDENTIFY : 打包输出文件夹的前缀

- #### VITE_APP_BUILD_OUTPUTDIR ：打包输出文件夹的名称

- #### VITE_APP_BUILD_DECLARATIONDIR ：打包类型声明文件的名称

> 注意：构架打包文件夹的格式必须区别于项目中的其他文件夹例如：( __**/ ), 在创建文件夹时避免于构架打包相同格式的文件夹。修改VITE_APP_BUILD_IDENTIFY后需要去修改.gitignore避免不必要的上传。修改VITE_APP_BUILD_IDENTIFY或VITE_APP_BUILD_OUTPUTDIR后上一次的构架打包文件夹将不会清楚需要手动清楚( 以后可能更新 )

