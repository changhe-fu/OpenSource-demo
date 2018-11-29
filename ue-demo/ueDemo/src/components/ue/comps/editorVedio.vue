<template>
  <div class="upload-container">
    <el-button icon='upload' :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary" size="mini">视频上传
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <!-- <el-upload
        action="..."
        :before-upload="beforeUpload"
        list-type="picture-card"
        :file-list="fileList"
        :http-request="RequestQiu">
        <i class="el-icon-plus"></i>
      </el-upload> -->

      <div>
        <el-upload class="upload-demo" action="...." :on-change="vedioBeforeUpload" v-loading.fullscreen.lock="fullscreenLoading">
          <el-button size="small" type="primary" v-if="news_media==''">获取视频</el-button>
        </el-upload>
        <video :src="news_media_v1" controls="controls" width="500" height="300" v-if="news_media">您的浏览器不支持 video 标签。</video>
        <div style="line-height:40px">视频只支持mp4，大小不超过30M</div>
      </div>
      <div style="margin-top: 10px">
        <el-button @click="dialogVisible = false;news_media=''">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { getToken } from "../../../fetch/modules/public";
export default {
  name: "editorSlideUpload",
  props: {
    color: {
      type: String,
      default: "#20a0ff"
    }
  },
  data() {
    return {
      dialogVisible: false,
      news_media_v1: "",
      news_media: "",
      fullscreenLoading: false
    };
  },
  methods: {
    handleSubmit() {
      this.$emit("successCBK", this.news_media);
      this.dialogVisible = false;
      this.news_media = "";
      this.news_media_v1 = "";
    },
    // 封面上传
    vedioBeforeUpload(file) {
      let formData = new FormData(),
        isVedio = file.raw.type,
        self = this,
        fileText = "";
      let isVedioArr = isVedio.split("/");
      for (let i in isVedioArr) {
        i == 1 ? (fileText = isVedioArr[i]) : "";
      }
      const isLt30M = file.size / 1024 / 1024 < 30;
      if (!isLt30M) {
        this.$message.error("请上传30M以下的视频");
        return false;
      }
      if (isVedio == "video/mp4") {
        self.requestQiNiutoken(fileText).then(res => {
          let key = res.key;
          formData.append("file", file.raw);
          formData.append("token", res.token);
          formData.append("key", res.key);
          const loading = this.$loading({
            lock: true,
            text: "视频上传中请稍等。。。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.RequestQiu(formData).then(res1 => {
            // console
            this.news_media = `https://img.sqydt.darongshutech.com/${res1.key}`;
            this.news_media_v1 = `https://img.sqydt.darongshutech.com/${res1.key}`;
            loading.close();
          });
        });
      } else {
        return this.$message.error("请上传正确的视频格式");
      }
    },
    RequestQiu(formData) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      return new Promise((resolve, reject) => {
        this.$http.post("https://up.qbox.me", formData, config).then(res => {
          if (res.status == 200) {
            resolve(res.data);
          } else {
            this.$message.error("上传失败");
          }
        });
      });
    },
    // 服务器token获取
    requestQiNiutoken(fileText) {
      return (
        (!this.qiniuToken &&
          getToken({ file_ext: fileText }).then(res => {
            return res;
          })) ||
        Promise.resolve()
      );
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  position: relative;
  top: 1.5vh;
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
