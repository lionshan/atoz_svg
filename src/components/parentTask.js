import { ObjectExt } from '@antv/x6'

export default {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 120, // 默认宽度
    height: 90, // 默认高度
    markup: [
        {
            tagName: 'g',
            selector: 'taskWrap',
            children: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'leftLabel',
                },
                {
                    tagName: 'rect',
                    selector: 'progessBg',
                },

                {
                    tagName: 'rect',
                    selector: 'progess',
                },
                {
                    tagName: 'text',
                    selector: 'progessLabel',
                },
                {
                    tagName: 'image',
                    selector: 'imgRisk',
                },
                {
                    tagName: 'image',
                    selector: 'imgQus',
                },
            ]
        }
    ],
    attrs: {
        taskWrap: {
            cursor: 'pointer',
            event: 'click:task',
        },
        body: {
            rx: 10, // 圆角矩形
            strokeWidth: 1,
            fill: '#fffbe6',
            stroke: '#c3c6c7',
            filter: {
                name: 'dropShadow',
                args: {
                    dx: -5,
                    dy: 1,
                    blur: 2,
                    opacity: 0.5,
                    color:'#000'
                },
            },
        },
        progess: {
            ref: 'body',
            rx: 5, // 圆角矩形
            height: 30,
            refWidth: '50%',
            refX: '0',     // 矩形 x 轴坐标位于节点右下角
            refY: '100%',     // 矩形 y 轴坐标位于节点右下角
            y: -30,
            fill: "#699c37",
            stroke: "none"
        },
        progessBg: {
            ref: 'body',
            rx: 5, // 圆角矩形
            height: 30,
            refWidth: '100%',
            refX: '0',     // 矩形 x 轴坐标位于节点右下角
            refY: '100%',     // 矩形 y 轴坐标位于节点右下角
            y: -30,
            fill: "#fff",
            strokeWidth: 1,
            stroke: "#c3c6c7"
        },
        leftLabel: {
            ref: 'body',
            fill: '#000',
            fontSize: 16,
            refX: 5,
            refY: 10,
            textAnchor: 'left',
            textVerticalAnchor: 'middle',
        },
        progessLabel: {
            // xAlign: 'right',
            // ref: 'body',
            // fill: '#000',
            // fontSize: 16,
            // refX: '100%',
            // refX2: -5,
            // refY: 10,
            // textAnchor: 'right',
            ref: 'body',
            refWidth: '100%',
            fill: '#000',
            fontSize: 20,
            refX: '50%',
            refY: '100%',
            refY2: -15,
            textAnchor: 'middle',
        },
        imgRisk: {
            ref: 'body',
            refX: 6,
            refY: 2,
            width: 16,
            height: 16,
            'xlink:href':
                './assets/risk.jpg',
            display:'none'
        },
        imgQus: {
            ref: 'body',
            refX: 6,
            refY: 2,
            width: 16,
            height: 16,
            'xlink:href':
                './assets/question.jpg',
            display:'none'
        },
    },
    propHooks(metadata) {
        const { progessLabel,leftLabelFont, leftLabel, progessVisible,hasQuestion,hasRisk,bgColor, ...others } = metadata
        if (leftLabel) {
            ObjectExt.setByPath(others, 'attrs/leftLabel/text', leftLabel)
        }
        if(leftLabelFont) {
            ObjectExt.setByPath(others, 'attrs/leftLabel/fontSize', leftLabelFont)
            ObjectExt.setByPath(others, 'attrs/leftLabel/refY', 20)
        }
        if (progessLabel) {
            ObjectExt.setByPath(others, 'attrs/progessLabel/text', progessLabel)
            ObjectExt.setByPath(others, 'attrs/progess/refWidth', progessLabel)
        }
        if (progessVisible === false) {
            ObjectExt.setByPath(others, 'attrs/progessBg/display', 'none')
            ObjectExt.setByPath(others, 'attrs/progessLabel/display', 'none')
            ObjectExt.setByPath(others, 'attrs/progess/display', 'none')
        }

        if(hasQuestion) {
            ObjectExt.setByPath(others, 'attrs/imgQus/display', 'block')
            ObjectExt.setByPath(others, 'attrs/leftLabel/refX', 25)
        }

        if(hasRisk) {
            ObjectExt.setByPath(others, 'attrs/imgRisk/display', 'block')
            ObjectExt.setByPath(others, 'attrs/leftLabel/refX', 25)
        }

        if(hasQuestion && hasRisk) {
            ObjectExt.setByPath(others, 'attrs/imgRisk/refX', 26)
            ObjectExt.setByPath(others, 'attrs/leftLabel/refX', 50)
        }

        if (bgColor) {
            ObjectExt.setByPath(others, 'attrs/body/fill', bgColor)
        }


        return others
    },
}
