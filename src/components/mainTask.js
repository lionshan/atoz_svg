import ObjectExt from 'objext'
export default {
    inherit: 'rect', // 继承自 Shape.Rect
    width: 120, // 默认宽度
    height: 90, // 默认高度
    markup: [
        {
            tagName: 'rect',
            selector: 'body',
        },
        {
            tagName: 'text',
            selector: 'label',
        },
        {
            tagName: 'text',
            selector: 'label2',
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
            selector: 'img',
        },

    ],
    attrs: {
        body: {
            rx: 10, // 圆角矩形
            strokeWidth: 1,
            fill: '#5755a1',
            stroke: '#5755a1',
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
        label: {
            ref: 'body',
            fill: '#fff',
            fontSize: 12,
            refX: '50%',
            refY: '40%',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
        label2: {
            ref: 'body',
            fill: '#fff',
            fontSize: 12,
            refX: '50%',
            refY: '60%',
            textAnchor: 'middle',
            textVerticalAnchor: 'middle',
        },
        progessLabel: {
            ref: 'body',
            fill: '#fff',
            fontSize: 12,
            refX: '100%',
            x: -30,
            refY: 10,
            textAnchor: 'right',
        },

        img: {
            ref: 'body',
            refX: 6,
            refY: 6,
            width: 16,
            height: 16,
        }


    },
    propHooks(metadata) {
        console.log('propHookspropHookspropHooks', metadata)
        const { progessLabel, ...others } = metadata
        if (progessLabel) {
            ObjectExt.setByPath(others, 'attrs/text/text', progessLabel)
        }
        return others
    },
}
