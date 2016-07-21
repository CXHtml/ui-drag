import { dom } from 'regularjs';

Object.assign(dom, {
    getPosition(elem) {
        const doc = elem && elem.ownerDocument;
        const docElem = doc.documentElement;
        const body = doc.body;

        const box = elem.getBoundingClientRect ? elem.getBoundingClientRect() : { left: 0, top: 0 };

        const clientLeft = docElem.clientLeft || body.clientLeft || 0;
        const clientTop = docElem.clientTop || body.clientTop || 0;

        return { left: box.left - clientLeft, top: box.top - clientTop };
    },
    getSize(elem) {
        return { width: elem.clientWidth, height: elem.clientHeight };
    },
    getDimension(elem) {
        return Object.assign(this.getSize(elem), this.getPosition(elem));
    },
    isInRect(position, dimension) {
        if (!position || !dimension)
            return false;

        return position.left > dimension.left
            && (position.left < dimension.left + dimension.width)
            && position.top > dimension.top
            && (position.top < dimension.top + dimension.height);
    },
    getComputedStyle(elem, property) {
        const computedStyle = elem.currentStyle || window.getComputedStyle(elem, null);
        return property ? computedStyle[property] : computedStyle;
    },
});

export default dom;
