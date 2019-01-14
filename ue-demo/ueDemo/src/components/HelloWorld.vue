<template>
  <div class="ue-box">
    <h2>ue-editor demo</h2>
    <UE :config="config"></UE>
  </div>
</template>

<script>
import UE from "@/components/ue/ueditor.vue";
export default {
  name: "HelloWorld",
  components: { UE },
  data() {
    return {
      msg: "Welcome to Your Vue.js App",
      config: {
        id: "myEditor",
        // initialFrameWidth: 750,
        initialFrameHeight: 350,
        initialStyle: ".view{padding:0 3px;}",
        initialContent: "从这里开始正文！",
        autoClearinitialContent: true,
        wordCount: false,
        elementPathEnabled: false
      }
    };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.ue-box {
  width: 850px;
  margin: 0 auto;
}
</style>
