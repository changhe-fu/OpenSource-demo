<template>
  <div style="text-align:left;">
    <div :id=id></div>
    <div>
      <div id="message_box">

        <!-- <p class="message_title">
        <input maxlength="30" type="text" @focus="setToolDisabled(1)" @blur="setToolEnabled(1)" tabindex="1" v-model="editorData.title" placeholder="请输入标题">
        <span :hidden="titleLenBoxHidden">{{titleLength}}/30</span>
      </p> -->
        <!-- <p class="message_author">
        <input maxlength="8" tabindex="1" type="text" @focus="setToolDisabled(2)" @blur="setToolEnabled(2)" v-model="editorData.author" placeholder="请输入作者">
        <span :hidden="authorLenBoxHidden">{{authorLength}}/8</span>
      </p> -->
      </div>
      <div id="message_footer">
        <el-form :model="editorData" ref="editorData" :rules="rules" label-position="top" status-icon label-width="200px">
          <!-- <el-form-item label="原文链接" prop="content_source_url">
          <el-input size="mini" placeholder="请输入链接地址,若没有链接地址默认为http://darongshutech.com" v-model="editorData.content_source_url"></el-input>
        </el-form-item> -->
          <!-- <el-form-item label="资讯封面">
          <el-button @click="chooseCover" size="mini">从图片库选择</el-button>
          <div :hidden="editorData.thumb_media_id == ''" :class="[editorId == 0? 'cover_img2':'']" class="cover_img" :style="{backgroundImage: 'url(' + editorData.thumb_url  + ')'}">
            <div class="cover_img_mask">
              <i @click="editorData.thumb_media_id = ''" class="wx-manage-delete icon_del"></i>
            </div>
          </div>
        </el-form-item> -->
          <!-- <el-form-item label="是否在文章头部显示封面" prop="show_cover_pic">
          <el-radio-group @change="changeCoverShow" v-model="show_cover_pic">
            <el-radio label="1">显示</el-radio>
            <el-radio label="0">不显示</el-radio>
          </el-radio-group>
        </el-form-item> -->
          <!-- <el-form-item label="摘要" prop="digest">
    
          <el-input type="textarea" placeholder="选填" v-model="editorData.digest"></el-input>
        </el-form-item> -->

          <!-- <el-form-item label="是否原创">
          <el-radio-group v-model="editorData.isOriginal">
            <el-radio label="true">原创</el-radio>
            <el-radio label="false">非原创</el-radio>
          </el-radio-group>
        </el-form-item> -->
        </el-form>
      </div>
    </div>

  </div>
</template>
<script>
let formRules = {
  // content_source_url: [
  //   { required: true, message: "不能为空！", trigger: "change" }
  // ],
  // show_cover_pic: [
  //   { required: true, message: "不能为空！", trigger: "change" }
  // ],
  // digest: [{ required: true, message: "不能为空！", trigger: "blur" }]
};

export default {
  name: "UE",
  data() {
    return {
      editor: null,
      editorId: this.id,
      editorData: this.dataObject,
      placeholderHtml: "",
      titleLength: 0,
      titleLenBoxHidden: true,
      authorLength: 0,
      authorLenBoxHidden: true,
      original: false,
      rules: formRules,
      show_cover_pic: "1"
    };
  },
  props: {
    dataObject: {
      // 标题 作者 内容
      type: Object,
      default: function() {
        return {
          title: "",
          author: "",
          news_content: "我是一的内容",
          content_source_url: "", // 原文地址
          thumb_media_id: "", // 	图文消息的封面图片素材id
          digest: "", // 摘要
          // isOriginal: false, // 是否原创
          show_cover_pic: false, // 是否显示封面
          category_id: "", //栏目id
          attr_id: "" // 分类id
        };
      }
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
      type: Object // UE配置
    },
    id: {
      type: String // 编辑区ID
    }
  },
  watch: {
    id() {
      this.editorId = this.id;
    },
    dataObject: function() {
      this.editorData = this.dataObject;
      this.editorData.news_content = this.editorData.news_content.replace("data-src", "src");

      this.editor.setContent(this.editorData.news_content ? this.editorData.news_content : this.placeholderHtml);
      // this.titleLength = this.editorData.title.length;
      // this.authorLength = this.editorData.author.length;
      // this.original = !!this.editorData.content_source_url.length;
      this.show_cover_pic = this.editorData.show_cover_pic + "";
      // console.log("content_source_url change", this.editorData, typeof this.editorData.show_cover_pic);
    }
  },
  created() {
    this.original = !!this.editorData.content_source_url.length;
    this.placeholderHtml = '<p style="color: rgb(153, 153, 153);">' + this.placeholderMsg + "</p>";
  },
  mounted() {
    this.initEditor();
    // this.getModule();
  },

  methods: {
    changeCoverShow(val) {
      this.editorData.show_cover_pic = +val;
    },
    initEditor() {
      const _this = this;
      this.editor = UE.getEditor(this.id, this.config); // 初始化UE

      // 确保UE加载完成后，放入内容。
      this.editor.addListener("ready", function() {
        let editorArea = _this.qS("#" + _this.config.id + "_iframeholder");
        let toolBar = _this.qS("#" + _this.config.id + "_toolbarboxouter");
        editorArea.style.width = _this.hasTitle ? "70%" : "99%";
        editorArea.style.margin = "5px auto";

        // 加载默认内容
        _this.editor.setContent(_this.editorData.news_content ? _this.editorData.news_content : _this.placeholderHtml);

        // 编辑区域前插入标题和作者
        _this.hasTitle ? _this.qS("#" + _this.config.id).insertBefore(_this.qS("#message_box"), editorArea) : (_this.qS("#message_box").style.display = "none");

        // 编辑区域后插入 message_footer
        _this.qS("#" + _this.config.id).appendChild(_this.qS("#message_footer"));

        toolBar.onclick = function() {
          _this.clearEditor();
        };
      });

      // 文本框获取焦点时清空默认显示的内容（bug：单击标题和作者有时也会触发）
      // this.editor.addListener("focus", function() {
      //   console.log("focus");
      //   if (_this.editor.getContentTxt() == _this.placeholderMsg)
      //     _this.editor.setContent("");
      // });

      // 文本框失去焦点时,若内容为空则显示默认显示的内容
      this.editor.addListener("blur", function(eType, event) {
        // if (!_this.editor.getContent()) {
        //   _this.editor.setContent(_this.placeholderHtml);
        // } else {
        //   _this.editorData.news_content = _this.getUEContent();
        //   _this.editorData.contentText = _this.getUEContentTxt();
        // }
        // console.log("_this.getUEContent()", _this.getUEContent());
        _this.editorData.news_content = _this.getUEContent();
        _this.editorData.contentText = _this.getUEContentTxt();
      });

      // 编辑区域单击事件
      this.editor.addListener("click", function() {
        _this.clearEditor();
        // 编辑区域获得焦点
        if (!_this.editor.isFocus) _this.editor.focus();
      });
    },
    setToolDisabled(type) {
      this.editor.setDisabled(); //设置工具栏为禁用状态
      if (type == 1) {
        this.titleLength = this.editorData.title.length;
        this.titleLenBoxHidden = false;
      } else if (type == 2) {
        this.authorLength = this.editorData.author.length;
        this.authorLenBoxHidden = false;
      }
    },
    setToolEnabled(type) {
      this.editor.setEnabled(); //设置工具栏为启用状态（会触发正文失焦事件）
      if (type == 1) {
        this.titleLenBoxHidden = true;
      } else if (type == 2) {
        this.authorLenBoxHidden = true;
      }
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
    chooseCover() {
      this.$emit("changeCover");
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
    },
    validateForm(formName) {
      if (!this.titleLength) {
        this.$message({
          message: "标题不能为空！",
          type: "warning"
        });
      }

      this.$refs[formName].validate(valid => {});
    }
  },
  bedoreDestroy() {
    this.editor.setContent("");
  },
  destroyed() {
    this.editor.destroy();
  }
};
</script>

<style scoped>
.edui-editor div {
  width: 100%;
}
.edui-editor {
  border-top: 1px solid #e7e7eb !important;
}
#message_box {
  padding: 120px 15% 0;
}
.message_title {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px 0 20px;
}
.message_title input {
  height: 100%;
  font-size: 22px;
  font-weight: 500;
}
#message_box span {
  font-size: 14px;
  color: #999;
}
input::-webkit-input-placeholder {
  color: #999;
}
.message_author {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.message_author input {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}
input {
  width: 90%;
  outline: none;
  border: 0;
}

#message_footer {
  width: 70%;
  margin: 0 auto;
  padding: 40px 0;
  /* border-top: 1px solid #eee; */
  /* margin-left: 10px; */
}
#message_footer .cover_img {
  margin-top: 10px;
  width: 120px;
  height: 120px;
  background-image: url("");
  background-size: cover;
  background-position: 50% 50%;
  background-color: #f6f8f9;
  background-repeat: no-repeat;
}
#message_footer .cover_img2 {
  width: 214px;
}
.cover_img:hover > .cover_img_mask {
  display: flex;
}
.cover_img_mask {
  display: none;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.cover_img_mask i {
  padding: 3px;
  cursor: pointer;
}
</style>
