
<style scoped>
.ueEditor {
  text-align: left;
}
</style>

<template>
  <main>
    <div class="ueEditor" :id="id">
    </div>
    <p>主题切换：ueditor.config.js 文件中修改配置 theme: "ws", 支持 default/ws</p>
    <p>自定义模板：\UE\dialogs\template\config.js 文件中添加模板；lang熟悉在 \UE\lang\zh-cn\zh-cn.js 中配置</p>
  </main>
</template>
<script>
export default {
  name: "UE",
  data() {
    return {
      editor: null,
      editorId: this.id,
      editorData: this.dataObject,
      placeholderHtml: "nihaowa",
      original: false,
      show_cover_pic: "1"
    };
  },
  props: {
    dataObject: {
      //  内容
      type: String,
      default: ""
    },
    placeholderMsg: {
      type: String, // placeholder
      default: "从这里开始正文！"
    },
    hasTitle: {
      type: Boolean, // 是否有标题和作者
      default: true
    },
    config: {
      type: Object, // UE配置
      default: function() {
        return {
          id: "myEditor",
          initialFrameWidth: 750,
          initialFrameHeight: 550,
          initialStyle: ".view{padding:0 3px;}",
          initialContent: "从这里开始正文！",
          autoClearinitialContent: true,
          wordCount: false,
          elementPathEnabled: false
        };
      }
    },
    id: {
      type: String, // 编辑区ID
      default: "ue"
    },
    isVideioShow: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    id() {
      this.editorId = this.id;
    },
    dataObject: function() {
      this.editorData = this.dataObject;
      this.editorData = this.editorData.replace("data-src", "src");
      this.editor.setContent(this.editorData ? this.editorData : this.placeholderHtml);
    },
    editorData() {
      this.$emit("changeContent", this.editorData);
    }
  },
  created() {
    this.placeholderHtml = '<p style="color: rgb(153, 153, 153);">' + this.placeholderMsg + "</p>";
  },
  mounted() {
    this.initEditor();
    // console.log("dataObject", this.dataObject);
  },

  methods: {
    initEditor() {
      const _this = this;
      _this.editor = UE.getEditor(_this.id, _this.config); // 初始化UE
      // 确保UE加载完成后，放入内容。
      _this.editor.addListener("ready", function() {
        // 设置编辑区域宽度 adss
        // let editorArea = _this.qS("#" + _this.config.id + "_iframeholder");
        // let toolBar = _this.qS("#" + _this.config.id + "_toolbarboxouter");
        // editorArea.style.width = "99%";
        // editorArea.style.margin = "5px auto";

        // 加载默认内容
        _this.editorData && _this.editor.setContent(_this.editorData);
      });
    },

    getUEContent() {
      // 获取编辑器html内容
      let _content = this.editor.getContent();
      return _content == this.placeholderHtml ? "" : _content;
    },
    getUEContentTxt() {
      // 获取纯文本内容方法
      let _content = this.editor.getContentTxt();
      return _content == this.placeholderMsg ? "" : _content;
    },
    clearEditor() {
      // 清空默认显示的内容
      if (this.editor.getContent() == this.placeholderHtml) this.editor.setContent("");
    },

    qS(el) {
      // DOM获取
      return document.querySelector(el);
    },
    qsAll(el) {
      // DOM获取
      return document.querySelectorAll(el);
    },
    insertContent(_content) {
      // 在光标处插入内容
      this.editor.execCommand("inserthtml", _content);
    }
  },
  bedoreDestroy() {
    this.editor.setContent("");
    this.editor.destroy();
  },
  destroyed() {}
};
</script>
