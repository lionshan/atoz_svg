import { Graph } from '@antv/x6';
import MainTask from './mainTask'
import ParentTask from './parentTask'
import QuoteTask from './quoteTask'


Graph.registerNode('mainTask', MainTask)
Graph.registerNode('parentTask', ParentTask)
Graph.registerNode('quoteTask', QuoteTask)




export default Graph