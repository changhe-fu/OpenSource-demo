<template>
  <div class="upload-container">
    <el-button icon='upload' :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary" size="mini">
      <slot>上传图片</slot>
    </el-button>
    <el-dialog :visible.sync="dialogVisible" append-to-body>

      <el-upload :action="url" :before-upload="beforeUpload" list-type="picture-card" :file-list="fileList" :before-remove="handleRemove" :http-request="RequestQiu" v-loading.fullscreen.lock="fullscreenLoading" class="upload-inner">
        <i class="el-icon-plus"></i>
      </el-upload>
      <span>建议上传750*360大小的图片，仅支持上传：".png", ".jpg", ".jpeg", ".gif"等格式文件)</span>
      <div style="margin-top: 10px">
        <el-button @click="handleCancel">取 消</el-button>
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
      url: "do",
      dialogVisible: false,
      listObj: {},
      fileList: [],
      qiniuToken: "",
      fullscreenLoading: false
    };
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess);
    },
    handleSubmit() {
      const arr = Object.keys(this.listObj).map(v => this.listObj[v]);
      if (!this.checkAllSuccess()) {
        this.$message("请等待所有图片上传成功 或 出现了网络问题，请刷新页面重新上传！");
        return;
      }
      // console.log(this.fileList.length);
      if (this.fileList.length == 0) {
        this.$message.error("请上传正确的图片格式");
        return false;
      }
      this.$emit("successCBK", arr);
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    handleRemove(file, filelist) {
      var listObj = this.listObj;
      for (var i in listObj) {
        if (file.uid == i) {
          delete listObj[i];
        }
      }
      for (var j = 0; j < filelist.length; j++) {
        if (file.uid == filelist[j].uid) {
          filelist.splice(j, 1);
        }
      }
      this.fileList = filelist;
      this.listObj = listObj;
    },
    handleCancel() {
      this.listObj = {};
      this.fileList = [];
      this.dialogVisible = false;
    },
    // handleSuccess(res, file) {
    //   console.log("sssssssssssssssss", file);
    //   const uid = file.uid;
    //   const objKeyArr = Object.keys(this.listObj);
    //   for (let i = 0, len = objKeyArr.length; i < len; i++) {
    //     if (this.listObj[objKeyArr[i]].uid === uid) {
    //       this.listObj[objKeyArr[i]].url = `http://dgan.img.didoxy.com/${
    //         res.hash
    //       }`;
    //       this.listObj[objKeyArr[i]].hasSuccess = true;
    //       return;
    //     }
    //   }
    // },
    // 封面上传
    beforeUpload(file) {
      let isJPG = file.type;
      const isLt2M = file.size / 1024 / 1024 < 2;
      const _self = this;
      const _URL = window.URL || window.webkitURL;
      const fileName = file.uid;
      this.listObj[fileName] = {};
      const img = new Image();
      img.src = _URL.createObjectURL(file);
      img.onload = function() {
        _self.listObj[fileName] = {
          hasSuccess: false,
          uid: file.uid,
          width: this.width,
          height: this.height
        };
      };
      if (isJPG == "image/jpeg" || isJPG == "image/png" || isJPG == "image/jpeg" || isJPG == "image/gif") {
        _self.requestQiNiutoken().then(res => {
          console.log("ssss", res);
          var formData = new FormData();
          formData.append("file", file);
          formData.append("token", res.token);
          formData.append("key", res.key);
          const loading = this.$loading({
            lock: true,
            text: "上传中请稍等。。。",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.7)"
          });
          this.RequestQiu(formData).then(res => {
            // console.log(res);
            if (res.hash) {
              this.$message.success("上传成功");
              const uid = file.uid;
              const objKeyArr = Object.keys(this.listObj);
              for (let i = 0, len = objKeyArr.length; i < len; i++) {
                if (this.listObj[objKeyArr[i]].uid === uid) {
                  this.listObj[objKeyArr[i]].url = `https://img.sqydt.darongshutech.com/${res.key}`;
                  this.listObj[objKeyArr[i]].hasSuccess = true;
                  // console.log("thi", this.listObj);
                  this.fileList.push(this.listObj[objKeyArr[i]]);
                  loading.close();
                  return;
                }
              }
            }
          });
        });
      } else {
        this.$message.error("请上传正确的图片格式");
        return false;
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
          }
        });
      });
    },
    // 七牛云获取
    requestQiNiutoken() {
      return (
        (!this.qiniuToken &&
          getToken({ file_ext: "jpg" }).then(res => {
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
