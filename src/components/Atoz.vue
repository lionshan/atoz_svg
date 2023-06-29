<template>
  <div class="atoz_wrap">
    <div class="loading" v-show="loading">正在加载中</div>
    <div id="container" v-show="!loading"></div>
    <el-dialog
      title="任务详情"
      :visible.sync="dialogVisible"
      width="50%"
      :show-close="false"
      @close="closeDialog"
    >
      <el-descriptions
        :title="dialogData && dialogData.name"
        direction="vertical"
        :column="12"
        border
        size="mini"
      >
        <!-- <el-descriptions-item :span="6" label="所有者">{{ dialogData && dialogData.owner }}</el-descriptions-item> -->
        <el-descriptions-item :span="6" label="被分派人">{{
          dialogData && dialogData.Assignee
        }}</el-descriptions-item>
        <el-descriptions-item :span="6" label="创建日期">{{
          dialogData && getDateStr(dialogData.originated)
        }}</el-descriptions-item>
        <!-- <el-descriptions-item :span="4" label="当前阶段">{{ dialogData && dialogData.current }}</el-descriptions-item> -->
        <!-- <el-descriptions-item :span="4" label="完成进度">{{ dialogData && dialogData.percentComplete }}</el-descriptions-item> -->
        <el-descriptions-item :span="12" label="描述信息">
          <div class="desc_scroll">
            {{ dialogData && dialogData.description }}
          </div>
        </el-descriptions-item>
        <el-descriptions-item :span="4" label="估计开始时间">{{
          dialogData && getDateStr(dialogData.estimatedStartDate)
        }}</el-descriptions-item>
        <el-descriptions-item :span="4" label="估计截止时间">{{
          dialogData && getDateStr(dialogData.estimatedEndDate)
        }}</el-descriptions-item>
        <el-descriptions-item :span="4" label="估计持续时间">{{
          dialogData && dialogData.estimatedDuration
        }}</el-descriptions-item>
        <el-descriptions-item :span="4" label="实际开始时间">{{
          dialogData && getDateStr(dialogData.actualStartDate)
        }}</el-descriptions-item>
        <el-descriptions-item :span="4" label="实际截止时间">{{
          dialogData && getDateStr(dialogData.actualEndDate)
        }}</el-descriptions-item>
        <el-descriptions-item :span="4" label="实际持续时间">{{
          dialogData && dialogData.actualDuration
        }}</el-descriptions-item>
        <el-descriptions-item :span="12" label="风险问题详细信息">
          <div class="url_scroll">
            <!-- <div class="item_style">
              <img :src="risk" alt="">
              <a target="_blank" href="https://www.baidu.com"> xxxxxsfdjlafj </a>
            </div>
            <div class="item_style">
              <img :src="risk" alt="">
              <a target="_blank" href="https://www.baidu.com"> xxxxxsfdjlafj </a>
            </div>
            <div class="item_style">
              <img :src="risk" alt="">
              <a target="_blank" href="https://www.baidu.com"> xxxxxsfdjlafj </a>
            </div> -->
            <div
              v-for="(item, index) in dialogData && dialogData.riskData"
              :key="`risk_${index}`"
              class="item_style"
            >
              <img :src="risk" alt="" />
              <a target="_blank" :href="item.url"> {{ item.name }} </a>
            </div>
            <div
              v-for="(item, index) in dialogData && dialogData.questionData"
              :key="`ques_${index}`"
              class="item_style"
            >
              <img :src="ques" alt="" />
              <a target="_blank" :href="item.url"> {{ item.name }} </a>
            </div>
          </div>
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>
    <div class="colorDsc">
      <div class="item">
        <div class="color_gray"></div>
        <div class="item_text">待办</div>
      </div>
      <div class="item">
        <div class="color_yellow"></div>
        <div class="item_text">进行中</div>
      </div>
      <div class="item">
        <div class="color_red"></div>
        <div class="item_text">延期</div>
      </div>
      <div class="item">
        <div class="color_lightred"></div>
        <div class="item_text">预警</div>
      </div>
      <div class="item">
        <div class="color_green"></div>
        <div class="item_text">已完成</div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getXMLData,
  getProjectTask,
  getXMLInfo,
  getProjectTaskTest,
} from "../request";
import Graph from "./antv.js";

import MainTaskInstance from "./mainTaskInstance";
import ParentTaskInstance from "./parentTaskInstance";
import QuoteTaskInstance from "./quoteTaskInstance";

export default {
  name: "Atoz_app",
  props: {},
  data() {
    return {
      risk: require("../assets/risk.jpg"),
      ques: require("../assets/question.jpg"),
      projectTaskData: {},
      needMianTask: [],
      allTask: [],
      quoteTask: [],
      eventNode: [],
      flowEdge: [],
      inclusiveNode: [],
      exclusiveNode: [],
      graph: null,
      maxX: 0,
      maxY: 0,
      loading: true,
      wrapRect: null,
      dialogVisible: false,
      dialogData: null,
      ani: null,
      ani2: null,
    };
  },
  mounted() {
    this.testInit();
    // this.proInit()
  },
  computed: {
    getDateStr() {
      return (str) => {
        if (str == "") {
          return "";
        }
        let date = new Date(str);
        return `${date.toLocaleDateString()}`;
      };
    },
  },
  methods: {
    testInit() {
      getProjectTaskTest().then((res) => {
        for (let index = 0; index < res.data.msg.length; index++) {
          const task = res.data.msg[index];
          this.projectTaskData[task.id] = task;
        }
        getXMLData("./test2.xml").then((res) => {
          const xotree = new window.XML.ObjTree();
          const json = xotree.parseXML(res.data);
          console.log("jsonjsonjson", json);
          this.handleXML(json);
          //初始画布
          let scaleY =
            document.documentElement.clientHeight / (this.maxY + 100);

          let scaleX = document.documentElement.clientWidth / (this.maxX + 100);

          let scale = Math.min(scaleY, scaleX);

          this.graph = new Graph({
            container: document.getElementById("container"),
            width: document.documentElement.clientWidth,
            height: document.documentElement.clientHeight,
            interacting: false,
            panning: true,
            // background: {
            //   color: '#fffbe6', // 设置画布背景颜色
            // },
            scroller: {
              enabled: true,
              pannable: true,
              pageVisible: true,
              pageBreak: false,
            },
            mousewheel: {
              enabled: true,
              modifiers: ["ctrl", "meta"],
            },
            highlighting: {
              // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
              default: {
                name: "stroke",
                args: {
                  rx: 10,
                  ry: 10,
                  padding: 10,
                  attrs: {
                    "stroke-width": 4,
                    stroke: "#7af001",
                  },
                },
              },
            },
          });

          this.graph.on("click:task", ({ node }) => {
            let id = node.id;
            let task = this.allTask.find((item) => {
              return id == item["-id"];
            });
            if (task) {
              let dataTask = this.projectTaskData[task["-id2"]];
              // console.log('点击', dataTask)
              this.dialogData = dataTask;
              this.dialogVisible = true;
              //展示弹窗数据
            }
          });

          this.graph.on("click:quotetask", ({ node }) => {
            console.log("nodenodenode", node);
            let id = node.id;
            let task = this.allTask.find((item) => {
              return id == item["-id"];
            });
            if (task) {
              //寻找主任务节点
              let mainTask = this.needMianTask.find((item) => {
                return task["-name"] == item["-name"];
              });

              if (mainTask) {
                //存在 添加主任闪烁
                let mainTaskView = this.graph.findViewByCell(mainTask["-id"]);

                // console.log('view', rectView)
                if (mainTaskView) {
                  // this.graph.positionCell(mainTaskView,'center')
                  if (this.ani) {
                    clearInterval(this.ani);
                    this.ani = null;
                  }
                  if (this.ani2) {
                    clearTimeout(this.ani2);
                    this.ani2 = null;
                  }
                  this.ani = setInterval(() => {
                    mainTaskView.highlight();
                    setTimeout(() => {
                      mainTaskView.unhighlight();
                    }, 200);
                  }, 400);
                  this.ani2 = setTimeout(() => {
                    clearInterval(this.ani);
                    clearTimeout(this.ani2);
                    this.ani = null;
                    this.ani2 = null;
                  }, 3000);
                }
              } else {
                let dataTask = this.projectTaskData[task["-id2"]];
                this.dialogData = dataTask;
                this.dialogVisible = true;
                //展示弹窗数据
              }
            }
          });

          console.log("scale", scale, this.graph);
          this.graph.zoomTo(scale);
          this.graph.translate(0, 0);

          this.drawMainTask(this.needMianTask);
          this.drawOtherTask(this.quoteTask);
          this.drawEvent(this.eventNode);
          this.drawExclusiveNode(this.exclusiveNode);
          this.drawInclusiveNode(this.inclusiveNode);
          this.drawEdge(this.flowEdge);

          // this.graph.addNode({
          //   x: 160,
          //   y: 120,
          //   width: 360,
          //   height: 120,
          //   shape: 'text-block',
          //   text: `There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.`,
          //   attrs: {
          //     body: {
          //       fill: '#efdbff',
          //       stroke: '#9254de',
          //       rx: 4,
          //       ry: 4,
          //     },
          //   },
          // })

          this.loading = false;
        });
      });
    },
    proInit() {
      getProjectTask(window.objectId).then((res) => {
        console.log("getProjectTask", res);
        for (let index = 0; index < res.data.msg.length; index++) {
          const task = res.data.msg[index];
          this.projectTaskData[task.id] = task;
        }
        getXMLInfo().then((xmlPath) => {
          //1 加载xml数据 （通过接口请求文件地址，然后根据地址请求数据）
          let xmlURL = "/3dspace/" + xmlPath.data.fileUrl.split("/3dspace/")[1];
          getXMLData(xmlURL).then((res) => {
            const xotree = new window.XML.ObjTree();
            const json = xotree.parseXML(res.data);
            this.handleXML(json);
            //初始画布
            let scaleY =
              document.documentElement.clientHeight / (this.maxY + 100);

            let scaleX =
              document.documentElement.clientWidth / (this.maxX + 100);

            let scale = Math.min(scaleY, scaleX);
            this.graph = new Graph({
              container: document.getElementById("container"),
              width: document.documentElement.clientWidth,
              height: document.documentElement.clientHeight,
              interacting: false,
              panning: true,
              // background: {
              //   color: '#fffbe6', // 设置画布背景颜色
              // },
              scroller: {
                enabled: true,
                pannable: true,
                pageVisible: true,
                pageBreak: false,
              },
              mousewheel: {
                enabled: true,
                modifiers: ["ctrl", "meta"],
              },
              highlighting: {
                // 当链接桩可以被链接时，在链接桩外围渲染一个 2px 宽的红色矩形框
                default: {
                  name: "stroke",
                  args: {
                    rx: 10,
                    ry: 10,
                    padding: 10,
                    attrs: {
                      "stroke-width": 4,
                      stroke: "#7af001",
                    },
                  },
                },
              },
            });

            this.graph.on("click:task", ({ node }) => {
              let id = node.id;
              let task = this.allTask.find((item) => {
                return id == item["-id"];
              });
              if (task) {
                let dataTask = this.projectTaskData[task["-id2"]];
                // console.log('点击', dataTask)
                this.dialogData = dataTask;
                this.dialogVisible = true;
                //展示弹窗数据
              }
            });
            this.graph.on("click:quotetask", ({ node }) => {
              console.log("nodenodenode", node);
              let id = node.id;
              let task = this.allTask.find((item) => {
                return id == item["-id"];
              });
              if (task) {
                //寻找主任务节点
                let mainTask = this.needMianTask.find((item) => {
                  return task["-name"] == item["-name"];
                });

                if (mainTask) {
                  //存在 添加主任闪烁
                  let mainTaskView = this.graph.findViewByCell(mainTask["-id"]);

                  // console.log('view', rectView)
                  if (mainTaskView) {
                    // this.graph.positionCell(mainTaskView,'center')
                    if (this.ani) {
                      clearInterval(this.ani);
                      this.ani = null;
                    }
                    if (this.ani2) {
                      clearTimeout(this.ani2);
                      this.ani2 = null;
                    }
                    this.ani = setInterval(() => {
                      mainTaskView.highlight();
                      setTimeout(() => {
                        mainTaskView.unhighlight();
                      }, 200);
                    }, 400);
                    this.ani2 = setTimeout(() => {
                      clearInterval(this.ani);
                      clearTimeout(this.ani2);
                      this.ani = null;
                      this.ani2 = null;
                    }, 3000);
                  }
                } else {
                  let dataTask = this.projectTaskData[task["-id2"]];
                  this.dialogData = dataTask;
                  this.dialogVisible = true;
                  //展示弹窗数据
                }
              }
            });

            console.log("scale", scale, this.graph);
            this.graph.zoomTo(scale);
            this.graph.translate(0, 0);

            this.drawMainTask(this.needMianTask);
            this.drawOtherTask(this.quoteTask);
            this.drawEvent(this.eventNode);
            this.drawExclusiveNode(this.exclusiveNode);
            this.drawInclusiveNode(this.inclusiveNode);
            this.drawEdge(this.flowEdge);
            this.loading = false;
          });
        });
      });
    },
    closeDialog() {
      this.dialogData = null;
    },
    handleState(arr) {
      return arr.map((item) => {
        let data = this.projectTaskData[item["-id2"]];
        return {
          ...data,
          ...item,
        };
      });
    },
    formEventPostion(positionStr) {
      let positionArr = positionStr
        .replaceAll("[", "")
        .replaceAll("]", "")
        .split(",");
      let x = positionArr[0];
      let y = positionArr[1];
      let width = positionArr[2] - positionArr[0];
      let height = positionArr[3] - positionArr[1];
      return {
        width,
        height,
        x,
        y,
      };
    },
    formNodePostion(positionStr) {
      let positionArr = positionStr
        .replaceAll("[", "")
        .replaceAll("]", "")
        .split(",");

      let x = positionArr[0];
      let y = positionArr[1];

      return {
        x,
        y,
      };
    },
    formFlowPostion(positionStr) {
      let positionArr = positionStr
        .replaceAll("[", "")
        .replaceAll("]", "")
        .split(",");
      return {
        x1: positionArr[0],
        y1: positionArr[1],
        x2: positionArr[2],
        y2: positionArr[3],
      };
    },
    drawInclusiveNode(nodes) {
      for (let index = 0; index < nodes.length; index++) {
        const node = nodes[index];
        let pos = this.formEventPostion(node["-position"]);
        this.graph.addNode({
          id: node["-id"],
          shape: "circle",
          width: pos.width,
          height: pos.height,
          x: pos.x,
          y: pos.y,
          attrs: {
            body: {
              strokeWidth: 1,
              stroke: "#000", // 边框颜色
              fill: "#fff", // 填充颜色
            },
          },
        });
      }
    },
    drawExclusiveNode(nodes) {
      this.drawInclusiveNode(nodes);
    },
    drawEvent(events) {
      for (let index = 0; index < events.length; index++) {
        const event = events[index];
        const pos = this.formEventPostion(event["-position"]);
        if (event["-type"] == "Start Event") {
          this.graph.addNode({
            id: event["-id"],
            shape: "circle",
            width: event["-r"] * 4,
            height: event["-r"] * 4,
            x: pos.x - event["-r"] * 2,
            y: pos.y - event["-r"] * 2,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: "#000", // 边框颜色
                fill: "#73e320", // 填充颜色
              },
            },
          });
        } else {
          this.graph.addNode({
            id: event["-id"],
            shape: "circle",
            width: event["-r"] * 4,
            height: event["-r"] * 4,
            x: pos.x - event["-r"] * 2,
            y: pos.y - event["-r"] * 2,
            attrs: {
              body: {
                strokeWidth: 1,
                stroke: "#000", // 边框颜色
                fill: "#c5cfd2", // 填充颜色
              },
            },
          });
        }
      }
    },
    drawOtherTask(tasks) {
      for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        let taskInstance = new QuoteTaskInstance(task);
        this.graph.addNode(taskInstance);
      }
    },
    drawMainTask(tasks) {
      for (let index = 0; index < tasks.length; index++) {
        const task = tasks[index];
        if (task.lastChild) {
          let taskInstance = new MainTaskInstance(task);
          this.graph.addNode(taskInstance);
        } else {
          let instance = new ParentTaskInstance(task);
          this.graph.addNode(instance);
        }
      }
    },
    drawEdge(edges) {
      for (let index = 0; index < edges.length; index++) {
        const edge = edges[index];
        try {
          this.graph.addEdge({
            router: {
              name: "manhattan",
              args: {
                padding: {
                  vertical: 15,
                  left: 15,
                },
              },
            },
            shape: "edge",
            source: edge["-from"],
            target: edge["-to"],
          });
        } catch (error) {
          console.error("errorerror", error);
        }
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
      this.allTask = allTask;
      //区分主副任务
      for (let index = 0; index < allTask.length; index++) {
        const task = allTask[index];
        let positionArr = task["-position"]
          .replaceAll("[", "")
          .replaceAll("]", "")
          .split(",");
        if (Number(positionArr[2]) > this.maxX) {
          this.maxX = Number(positionArr[2]);
        }
        if (Number(positionArr[3]) > this.maxY) {
          this.maxY = Number(positionArr[3]);
        }
        let isQuote = anchorFlag.find((item) => {
          return item["-from"] == task["-id"];
        });
        if (isQuote) {
          quoteTask.push(task);
        } else {
          mainTask.push(task);
        }
      }

      needMianTask = this.handleParent(mainTask);

      this.needMianTask = this.handleState(needMianTask);

      this.quoteTask = this.handleState(quoteTask);
      this.eventNode = eventNode;
      this.flowEdge = flowEdge;
      this.inclusiveNode = inclusiveNode;
      this.exclusiveNode = exclusiveNode;
      console.log("this.maxX = maxX;", this.maxX);
      console.log("this.maxY = maxY;", this.maxY);
    },

    handleParent(allTasks) {
      let resArr = [];
      let tempTasks = allTasks.filter((item) => {
        return item["-parentname"] != undefined;
      });
      let parentArr = allTasks
        .filter((item) => {
          return item["-parentname"] == undefined;
        })
        .map((item) => {
          return {
            ...item,
            level: 0,
          };
        });
      while (parentArr.length != 0) {
        let task = parentArr.shift();
        let children = tempTasks
          .filter((item) => {
            return item["-parentname"] == task["-name"];
          })
          .map((item) => {
            return {
              ...item,
              level: task.level + 1,
            };
          });
        tempTasks = tempTasks.filter((item) => {
          return item["-parentname"] != task["-name"];
        });
        task.lastChild = children.length == 0;
        parentArr.push(...children);
        resArr.push(task);
      }
      console.log("tempTasks", tempTasks);
      console.log("parentArr", parentArr);
      return [...resArr, ...tempTasks];
    },
  },
};
</script>

<style lang="css">
#app > div > div.colorDsc > div.item {
  width: 100%;
  display: flex;
  margin: 5px;
}

#app > div > div.colorDsc > div.item > div.item_text {
  width: 50%;
  margin-left: 10px;
}

.color_gray {
  width: 50%;
  background: #d7d7d7;
  border-radius: 5px;
}

.color_yellow {
  background: yellow;
  width: 50%;
  border-radius: 5px;
}

.color_lightred {
  background: #f99bae;
  width: 50%;
  border-radius: 5px;
}

.color_green {
  background: green;
  width: 50%;
  border-radius: 5px;
}

.color_red {
  background: red;
  width: 50%;
  border-radius: 5px;
}

#app > div > div.colorDsc {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 150px;
  display: flex;
  flex-direction: column;
}

#app
  > div
  > div.colorDsc
  > div
  > div
  > table
  > tbody
  > tr
  > td
  > div
  > span.el-descriptions-item__content {
  font-size: 16px;
  font-weight: 600;
}

#app > div > div.colorDsc > div > div.el-descriptions__body {
  background-color: rgba(0, 0, 0, 0);
}

#app > div > div.colorDsc > div > div > table {
  background-color: rgba(0, 0, 0, 0);
}

#app > div > div.colorDsc > div > div.el-descriptions__header {
  margin: 5px !important;
}

#app
  > div
  > div.colorDsc
  > div
  > div.el-descriptions__body
  > table
  > tbody
  > tr
  > td
  > div
  > span.el-descriptions-item__label {
  color: #000000;
}

#app > div > div.el-dialog__wrapper > div > div.el-dialog__header {
  padding: 10px !important;
}

#app > div > div.el-dialog__wrapper > div > div.el-dialog__body {
  padding: 10px !important;
}

#app
  > div
  > div.el-dialog__wrapper
  > div
  > div.el-dialog__body
  > div
  > div.el-descriptions__body
  > table
  > tbody:nth-child(3)
  > tr:nth-child(2)
  > td
  > div.desc_scroll {
  max-height: 20px;
  overflow: auto;
}

#app
  > div
  > div.el-dialog__wrapper
  > div
  > div.el-dialog__body
  > div
  > div.el-descriptions__body
  > table
  > tbody:nth-child(5)
  > tr:nth-child(2)
  > td
  > div.url_scroll {
  max-height: 80px;
  overflow: auto;
}

.item_style {
  display: flex;
  align-items: center;
  height: 30px;
  /* border: 1px solid #EBEEF5 */
}

.item_style > img {
  width: 16px;
  height: 16px;
  margin-right: 10px;
}
</style>
