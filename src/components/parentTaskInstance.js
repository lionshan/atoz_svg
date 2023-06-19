
const formPostion = (positionStr) => {

    let positionArr = positionStr.replaceAll('[', '').replaceAll(']', '').split(',')
    let width = (positionArr[2] - positionArr[0]) 
    let height = (positionArr[3] - positionArr[1]) 
    let x = positionArr[0] 
    let y = positionArr[1] 

    return {
        width,
        height,
        x,
        y
    }
}
class ParentInstance {
    constructor(task) {
        this.shape = 'parentTask'
        this.id = task['-id']
        let positionObj = formPostion(task['-position'])
        this.width = positionObj.width
        this.height = positionObj.height
        this.x = positionObj.x
        this.y = positionObj.y
        this.leftLabel = task['-name']
        if(task.current != '工作中' && task.current != '审批中') {
            this.progessVisible = false
        }
        this.status = task.Status
        this.progessLabel = (Number(task.percentComplete) + Math.random() * 100).toFixed(2) + '%'
        this.hasQuestion = task.hasQuestion == 'Y'
        this.hasRisk = task.hasRisk == 'Y'
        if(Math.random() > 0.5) {
            this.progessVisible = true
            this.hasQuestion = true
        }

    }
}


export default ParentInstance
