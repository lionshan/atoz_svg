
const formPostion = (positionStr) => {
    let scale = 1
    let positionArr = positionStr.replaceAll('[', '').replaceAll(']', '').split(',')
    console.log(positionArr)
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
class MainTask {
    constructor(task) {
        this.id = task['-id']
        let positionObj = formPostion(task['-position'])
        console.log(positionObj)
        this.width = positionObj.width
        this.height = positionObj.height
        this.x = positionObj.x
        this.y = positionObj.y
        this.label = task['-name']
    }
}


export default MainTask
