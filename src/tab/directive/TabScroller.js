import 'vue';
import { MDCTabScrollerFoundation, } from '@material/tab-scroller';
import * as util from '@material/tab-scroller/util';
import { matches } from '@material/dom/ponyfill';
const TabScroller = {
    bind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            //Foundation Component
            let mdcInstance = null;
            boundElement.scroller = {
                get area() {
                    const x = boundElement.querySelector('.mdc-tab-scroller__scroll-area');
                    if (x == null) {
                        return boundElement;
                    }
                    else {
                        return x;
                    }
                },
                get content() {
                    const x = boundElement.querySelector('.mdc-tab-scroller__scroll-content');
                    if (x == null) {
                        return boundElement.firstChild;
                    }
                    else {
                        return x;
                    }
                },
            };
            const _adapter = {
                addClass(className) {
                    boundElement.classList.add(className);
                },
                removeClass(className) {
                    boundElement.classList.remove(className);
                },
                addScrollAreaClass(className) {
                    boundElement.scroller.area.classList.add(className);
                },
                eventTargetMatchesSelector(evtTarget, selector) {
                    return matches(evtTarget, selector);
                },
                setScrollAreaStyleProperty(propName, value) {
                    var _a;
                    (_a = boundElement.scroller.content) === null || _a === void 0 ? void 0 : _a.style.setProperty(propName, value);
                },
                setScrollContentStyleProperty(propName, value) {
                    window
                        .getComputedStyle(boundElement.scroller.content)
                        .getPropertyValue(propName);
                },
                getScrollContentStyleValue(propertyName) {
                    return window
                        .getComputedStyle(boundElement.scroller.content)
                        .getPropertyValue(propertyName);
                },
                setScrollAreaScrollLeft(scrollLeft) {
                    boundElement.scroller.area.scrollLeft = scrollLeft;
                },
                getScrollAreaScrollLeft() {
                    return boundElement.scroller.area.scrollLeft;
                },
                getScrollContentOffsetWidth() {
                    return boundElement.scroller.content.offsetWidth;
                },
                getScrollAreaOffsetWidth() {
                    return boundElement.scroller.area.offsetWidth;
                },
                computeScrollAreaClientRect() {
                    return boundElement.scroller.area.getBoundingClientRect();
                },
                computeScrollContentClientRect() {
                    return boundElement.scroller.content.getBoundingClientRect();
                },
                computeHorizontalScrollbarHeight() {
                    return util.computeHorizontalScrollbarHeight(document);
                },
            };
            mdcInstance = new MDCTabScrollerFoundation(_adapter);
            mdcInstance.init();
            boundElement.mdcScroller = mdcInstance;
            //Fire Tab Scroller Added Event on next tick
            (_a = vnode === null || vnode === void 0 ? void 0 : vnode.context) === null || _a === void 0 ? void 0 : _a.$nextTick(() => {
                const eventArgs = new CustomEvent('v-mdc-tab-scroller:initialized', {
                    bubbles: true,
                    detail: {
                        source: boundElement,
                    },
                });
                boundElement.dispatchEvent(eventArgs);
            });
        }
    },
    inserted(el, binding, vnode) {
        //
    },
    unbind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            (_a = boundElement.mdcScroller) === null || _a === void 0 ? void 0 : _a.destroy();
            boundElement.mdcScroller = null;
        }
    },
};
export default TabScroller;
//# sourceMappingURL=TabScroller.js.map