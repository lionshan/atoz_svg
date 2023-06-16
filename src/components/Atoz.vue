<template>
  <div class="container"></div>
</template>

<script>
import { getXMLData } from "../request";
export default {
  name: "Atoz_app",
  props: {},
  mounted() {
    //1 加载xml数据 （通过接口请求文件地址，然后根据地址请求数据）
    getXMLData("./test.xml").then((res) => {
      const xotree = new window.XML.ObjTree();
      const json = xotree.parseXML(res);
      console.log(json);
    });
    // var xmlhttp = new window.XMLHttpRequest();
    // xmlhttp.open("GET", "/src/assets/test.xml", false);
    // xmlhttp.send();
    // let xmlDoc = xmlhttp.responseText;
    // // console.log(xmlDoc, 'xmlDoc')

    // const xotree = new XML.ObjTree();
    // const json = xotree.parseXML(xmlDoc);
    // console.log(json);

    // let taskDataArr = json.processes.Process.task;

    // let needData = {
    //   nodes: [],
    // };
    // needData.nodes = taskDataArr.map((item) => {
    //   return new MainTask(item);
    // });
    // this.drawSvg(needData);
  },
};
</script>

<style lang="scss" scoped>
</style>
