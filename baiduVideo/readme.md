# 百度视频播放器demo

官网demo地址: http://cyberplayer.bcelive.com/demo/new/index.html


![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122160754521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5NzU5MTE1,size_16,color_FFFFFF,t_70)

## 打开方式

1. 下载此文件夹

2. 登陆百度云管理中心，获取  Access Key （免费的），登陆地址:https://cloud.baidu.com/?from=console

3. 在此文件夹的 index.html 中填写你的 Access Key，浏览器打开即可

## 修改

视频播放器的图片广告宽高为固定的 400 * 300，可能与实际使用不符。此文件夹中的 **cyberplayer.js** 文件，相关地方已经被我统一改为变量：

```
window.ADWIDTH = 400; // 广告宽度
window.ADHEIGHT = 300; // 广告高度
```
可通过修改 `window.ADWIDTH` 和 `window.ADHEIGHT` 自定义

原文件位于 **baidu** 文件夹中
