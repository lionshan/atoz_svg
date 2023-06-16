
const formPostion = (positionStr) => {
    let scale = 2
    let positionArr = positionStr.replaceAll('[', '').replaceAll(']', '').split(',')
    let width = (positionArr[2] - positionArr[0]) / scale
    let height = (positionArr[3] - positionArr[1]) / scale
    let x = positionArr[0] / scale
    let y = positionArr[1] / scale

    return {
        width,
        height,
        x,
        y
    }
}
class MainTaskInstance {
    constructor(task) {
        this.shape = 'mainTask'
        this.id = task['-id']
        let positionObj = formPostion(task['-position'])
        this.width = positionObj.width
        this.height = positionObj.height
        this.x = positionObj.x
        this.y = positionObj.y
        this.label = task['-name']
        this.parent = task['parentId']
    }
}


export default MainTaskInstance
