
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
        this.progessLabel = '100%'
        console.log('task',task)
        if(task.Status == 'red') {
            this.progessVisible = false
        }
    }
}


export default ParentInstance
