<template>
  <div id="container"></div>
</template>
<script>
import { Graph } from "@antv/x6";
import MainTask from "../components/mainTask.js";
export default {
  mounted() {
    // var xmlhttp = new window.XMLHttpRequest();
    // xmlhttp.open("GET", "/src/assets/test.xml", false);
    // xmlhttp.send();
    // let xmlDoc = xmlhttp.responseText;
    // // console.log(xmlDoc, 'xmlDoc')
    // const xotree = new XML.ObjTree();
    // const json = xotree.parseXML(xmlDoc);
    // console.log(json)
    // let taskDataArr = json.processes.Process.task
    // let needData = {
    //     nodes:[]
    // }
    // needData.nodes = taskDataArr.map(item => {
    //     return new MainTask(item)
    // })
    // this.drawSvg(needData)
  },
  methods: {
    drawSvg(dataParam) {
      const data = {
        // 节点
        nodes: [
          {
            id: "node1", // String，可选，节点的唯一标识
            x: 80, // Number，必选，节点位置的 x 值
            y: 40, // Number，必选，节点位置的 y 值
            width: 80, // Number，可选，节点大小的 width 值
            height: 40, // Number，可选，节点大小的 height 值
            label: "hello", // String，节点标签
          },
          // {
          //   id: 'node2', // String，节点的唯一标识
          //   x: 160,      // Number，必选，节点位置的 x 值
          //   y: 180,      // Number，必选，节点位置的 y 值
          //   width: 80,   // Number，可选，节点大小的 width 值
          //   height: 40,  // Number，可选，节点大小的 height 值
          //   label: 'world', // String，节点标签
          // },
        ],
        // 边
        //   edges: [
        //     {
        //       source: 'node1', // String，必须，起始节点 id
        //       target: 'node2', // String，必须，目标节点 id
        //     },
        //   ],
      };
      console.log("dataParamdataParam", dataParam);
      const graph = new Graph({
        container: document.getElementById("container"),
        width: 4000,
        height: 3000,
      });
      graph.fromJSON(dataParam);
    },
  },
};
</script>