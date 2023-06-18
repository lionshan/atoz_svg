import { ObjectExt } from '@antv/x6'
export default {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 120, // 默认宽度
    height: 90, // 默认高度
    markup: [
        {
            tagName: 'g',
            selector: 'taskWrap',
            attrs: {

            },
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
            fill: '#d7d7d7',
            stroke: '#000',
        },
        progess: {
            ref: 'body',
            rx: 5, // 圆角矩形
            height: 10,
            refWidth: '50%',
            refX: '0',     // 矩形 x 轴坐标位于节点右下角
            refY: '100%',     // 矩形 y 轴坐标位于节点右下角
            y: -10,
            fill: "#666",
            stroke: "none"
        },
        progessBg: {
            ref: 'body',
            rx: 5, // 圆角矩形
            height: 10,
            refWidth: '100%',
            refX: '0',     // 矩形 x 轴坐标位于节点右下角
            refY: '100%',     // 矩形 y 轴坐标位于节点右下角
            y: -10,
            fill: "#fff",
            strokeWidth: 1
        },
        leftLabel: {
            ref: 'body',
            fill: '#000',
            fontSize: 12,
            refX: 5,
            refY: 10,
            textAnchor: 'left',
            textVerticalAnchor: 'middle',
        },
        progessLabel: {
            xAlign: 'right',
            ref: 'body',
            fill: '#000',
            fontSize: 12,
            refX: '100%',
            refX2: -5,
            refY: 10,
            textAnchor: 'right'
        },
    },
    propHooks(metadata) {
        const { progessLabel, leftLabel, progessVisible, ...others } = metadata
        if (leftLabel) {
            ObjectExt.setByPath(others, 'attrs/leftLabel/text', leftLabel)
        }
        if (progessLabel) {
            ObjectExt.setByPath(others, 'attrs/progessLabel/text', progessLabel)
        }
        console.log('metadatametadatametadata', metadata)
        if (progessVisible === false) {
            ObjectExt.setByPath(others, 'attrs/progessBg/display', 'none')
            ObjectExt.setByPath(others, 'attrs/progessLabel/display', 'none')
            ObjectExt.setByPath(others, 'attrs/progess/display', 'none')
        }
        return others
    },
}
