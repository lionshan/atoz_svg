import { Graph } from '@antv/x6';
import MainTask from './mainTask'
import ParentTask from './parentTask'


Graph.registerNode('mainTask', MainTask)
Graph.registerNode('parentTask', ParentTask)



export default Graph