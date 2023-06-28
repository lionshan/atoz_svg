
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
class MainTaskInstance {
    constructor(task) {
        this.shape = 'mainTask'
        this.id = task['-id']
        let positionObj = formPostion(task['-position'])
        this.width = positionObj.width
        this.height = positionObj.height
        this.x = positionObj.x
        this.y = positionObj.y
        this.mainLabel = task['-name']
        if(task.current != '工作中' && task.current != '审批中') {
            this.progessVisible = false
        }
             
        const colorMap = {
            gray :'#d7d7d7',
            yellow: 'yellow',
            Lightred: '#f99bae',
            green: 'green',
            red: 'red'
        }
        this.status = colorMap[task.Status]
        if(task.percentComplete) {
            this.progessLabel = Number(task.percentComplete).toFixed(0) + '%'

        }
        
        this.hasQuestion = task.hasQuestion == 'Y'
        this.hasRisk = task.hasRisk == 'Y'
        // if(Math.random() > 0.5) {

            // this.hasQuestion = true
            // this.hasRisk = true
        // }
        // this.progessLabel =  (Math.random() * 100).toFixed(2) + '%'
        // this.progessVisible = true
    }
}


export default MainTaskInstance
