<template>
  <div id="container"></div>
</template>

<script>
import { getXMLData } from "../request";
import Graph from './antv.js';
import MainTaskInstance from './mainTaskInstance'
export default {
  name: "Atoz_app",
  props: {},
  data() {
    return {
      needMianTask: [],
      quoteTask: [],
      eventNode: [],
      flowEdge: [],
      inclusiveNode: [],
      exclusiveNode: [],
      graph: null,
      scale: 2,
      maxX:0,
      maxY:0
    }
  },
  mounted() {


    //1 加载xml数据 （通过接口请求文件地址，然后根据地址请求数据）
    getXMLData("./test.xml").then((res) => {
      const xotree = new window.XML.ObjTree();
      const json = xotree.parseXML(res.data);
      console.log(res);
      console.log(json);
      this.handleXML(json)
      //初始画布
      this.graph = new Graph({
        container: document.getElementById('container'),
        width: (this.maxX + 100) / this.scale,
        height: (this.maxY + 100) / this.scale,
      });
      this.drawMainTask(this.needMianTask)
    });
  },
  methods: {
    drawMainTask(tasks) {
      for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        let taskInstance = new MainTaskInstance(task,index)
        // console.log('taskInstancetaskInstancetaskInstance', taskInstance)
        this.graph.addNode(taskInstance)
      }
    },
    //处理xml数据返回不同类型的task  
    handleXML(xmlJson) {
      let needMianTask = [];
      let mainTask = [];
      let quoteTask = [];
      let eventNode = xmlJson.processes.Process.event;
      let flowEdge = xmlJson.processes.Process.flow;
      let inclusiveNode = xmlJson.processes.Process.InclusiveGateway;
      let exclusiveNode = xmlJson.processes.Process.ExclusiveGateway;
      let allTask = xmlJson.processes.Process.task;
      let anchorFlag = xmlJson.processes.Process.anchor;

      //区分主副任务
      for (let index = 0; index < allTask.length; index++) {

        const task = allTask[index];
        let positionArr = task['-position'].replaceAll('[', '').replaceAll(']', '').split(',')
        if (Number(positionArr[2]) > this.maxX) {
          this.maxX = Number(positionArr[2])
        }
        if (Number(positionArr[3]) > this.maxY) {
          this.maxY = Number(positionArr[3])
        }

        let isQuote = anchorFlag.find(item => { return item['-from'] == task['-id'] })
        if (isQuote) {
          quoteTask.push(task)
        }
        else {
          mainTask.push(task)
        }
      }

      needMianTask = this.handleParent(mainTask)

      this.needMianTask = needMianTask;
      this.quoteTask = quoteTask;
      this.eventNode = eventNode;
      this.flowEdge = flowEdge;
      this.inclusiveNode = inclusiveNode;
      this.exclusiveNode = exclusiveNode;
      console.log('this.maxX = maxX;',this.maxX)
      console.log('this.maxY = maxY;',this.maxY)

    },

    handleParent(tempTasks) {
      let tasksArr = tempTasks
      let taskRootObj = {}// filed: 最大的父节点 value: 子节点
      let taskParentNameObj = {}// filed: 父节点 value: 子节点
      let taskNameObj = {} // filed: 任务名称 value: 任务对象
      tasksArr.forEach((item) => {
        const { '-name': taskName, '-parentname': parentname } = item
        taskNameObj[taskName] = item
        if (!parentname) {
          taskRootObj[taskName] = item
          return
        }
        if (!taskParentNameObj[parentname]) {
          taskParentNameObj[parentname] = []
        }
        taskParentNameObj[parentname].push(item)
      });
      const testData = []
      const getChildrenData = (taskName, element) => {
        let children = taskParentNameObj[taskName] || []
        if (children.length) {
          element['children'] = taskParentNameObj[taskName]
          element['children'].forEach((item, index) => {
            getChildrenData(item.name, element['children'][index])
          })
        } else {
          element['lastchild'] = true
        }
        testData.push(element)
      }
      for (const key in taskRootObj) {
        if (Object.prototype.hasOwnProperty.call(taskRootObj, key)) {
          getChildrenData(key, taskNameObj[key])
        }
      }
      console.log(testData, 'testData')
      return testData
    }

  }
};
</script>

<style lang="scss" scoped></style>
