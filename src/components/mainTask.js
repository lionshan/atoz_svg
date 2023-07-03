import { ObjectExt } from '@antv/x6'
export default {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 120, // 默认宽度
    height: 90, // 默认高度
    markup: [
        {
            tagName: 'g',
            selector: 'mainWrap',
            children: [
                {
                    tagName: 'rect',
                    selector: 'body',
                },
                {
                    tagName: 'text',
                    selector: 'mainLabel',
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
                    selector: 'imgQus',
                },
                {
                    tagName: 'image',
                    selector: 'imgRisk',
                },
            ]
        },


    ],
    attrs: {
        mainWrap: {
            cursor: 'pointer',
            event: 'click:task',
        },
        body: {
            rx: 10, // 圆角矩形
            strokeWidth: 1,
            fill: '#d7d7d7',
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
            strokeWidth: 1
        },
        mainLabel: {
            ref: 'body',
            refWidth: '80%',
            fontSize: 16,
            refX: '50%',
            refY: '50%',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
        progessLabel: {
            // xAlign: 'center',
            ref: 'body',
            refWidth: '100%',
            fill: '#000',
            fontSize: 20,
            refX: '50%',
            refY: '100%',
            refY2: -15,
            textAnchor: 'middle',
            // refX: '100%',
            // refX2: -5,
            // refY: 10,
            

        },
        imgRisk: {
            ref: 'body',
            refX: 6,
            refY: 2,
            width: 26,
            height: 26,
            'xlink:href':
                './assets/risk.jpg',
            display: 'none'
        },
        imgQus: {
            ref: 'body',
            refX: 6,
            refY: 2,
            width: 26,
            height: 26,
            'xlink:href':
                './assets/question.jpg',
            display: 'none'
        },
    },
    propHooks(metadata) {
        const { progessLabel, mainLabel, progessVisible, hasQuestion, hasRisk, status, ...others } = metadata
        if (mainLabel) {
            ObjectExt.setByPath(others, 'attrs/mainLabel/text', mainLabel)
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

        if (hasQuestion) {
            ObjectExt.setByPath(others, 'attrs/imgQus/display', 'block')
        }

        if (hasRisk) {
            ObjectExt.setByPath(others, 'attrs/imgRisk/display', 'block')
        }
      
        if (hasQuestion && hasRisk) {
            ObjectExt.setByPath(others, 'attrs/imgRisk/refX', 38)
        }
        if (status) {
            ObjectExt.setByPath(others, 'attrs/body/fill', status)
        }
        return others
    },
}
