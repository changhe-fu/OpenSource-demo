
# videoJS demo

videoJs 文档 https://docs.videojs.com/docs/

实现PC/移动端适应直播，暂停播放出现广告（哎，万恶的广告）

![在这里插入图片描述](https://img-blog.csdnimg.cn/20181122153320471.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzM5NzU5MTE1,size_16,color_FFFFFF,t_70)


### 打开方式

下载此[demo](https://github.com/Let-river/Let-river.github.io/tree/master/videoJS)，浏览器打开 index.html

### 记录

#### 初始化

1. 直接在<video>标签里面加上 `class="video-js"` 和 `data-setup='{}'` 属性。
2. 通过JS初始化
	```
	// 初始化播放器
	var myPlayer = videojs(document.querySelector(".video-js"), {
	  controls: true,
	  autoplay: false,
	  preload: "auto"
	});
	myPlayer.src([{ type: "", src: "" }]); // 播放资源
	myPlayer.poster(”“); // 预览图
	myPlayer.ready(function() {
	  // 开始播放
	  this.on("play", function() {
	     // ...
	  });
	  // 暂停
	  this.on("pause", function() {
	     // ...
	  });
	});
	```
#### 居中播放按钮
在 video 标签中添加 class ` vjs-big-play-centered`
```
<video class="video-js vjs-big-play-centered" ></video>
```
在暂停的时候出现播放按钮，可通过添加样式
```
.vjs-paused .vjs-big-play-button {
  display: block;
}
```
