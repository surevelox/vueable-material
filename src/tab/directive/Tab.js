import 'vue';
import { MDCTabFoundation } from '@material/tab';
import '@material/tab-indicator';
import { TabEvents, TabIndicatorEvents } from './Events';
let uid = 0;
function uId() {
    return 'tab_' + ++uid;
}
function setModel(obj, objExpression, propertyName, value) {
    objExpression.split('.').reduce(function (o, x) {
        return o[x];
    }, obj)[propertyName] = value;
}
const Tab = {
    bind(el, binding, vnode) {
        const boundElement = el;
        if (boundElement != null) {
            boundElement.id = boundElement.id || uId();
            boundElement.dataset.vmdcTab = boundElement.id;
            const tabArgs = binding.value;
            // Bind Implementation
            const _adapter = {
                addClass(className) {
                    boundElement.classList.add(className);
                },
                removeClass(className) {
                    boundElement.classList.remove(className);
                },
                hasClass(className) {
                    return boundElement.classList.contains(className);
                },
                setAttr(attr, value) {
                    boundElement.setAttribute(attr, value);
                },
                activateIndicator(previousIndicatorClientRect) {
                    if (tabArgs != null) {
                        if (tabArgs.Item != null && tabArgs.propName != null) {
                            tabArgs.Item[tabArgs.propName] = true;
                        }
                    }
                    const contentEl = boundElement.querySelector('.mdc-tab-indicator');
                    const eventArgs = new CustomEvent('v-mdc-tab:activate-indicator', {
                        detail: {
                            source: boundElement,
                            previousIndicatorClientRect: previousIndicatorClientRect,
                        },
                    });
                    contentEl === null || contentEl === void 0 ? void 0 : contentEl.dispatchEvent(eventArgs);
                },
                deactivateIndicator() {
                    if (vnode.context != null && binding.expression != null) {
                        if (tabArgs.Item != null && tabArgs.propName != null) {
                            tabArgs.Item[tabArgs.propName] = false;
                        }
                    }
                    const contentEl = boundElement.querySelector('.mdc-tab-indicator');
                    const eventArgs = new CustomEvent('v-mdc-tab:deactivate-indicator', {
                        detail: {
                            source: boundElement,
                        },
                    });
                    contentEl === null || contentEl === void 0 ? void 0 : contentEl.dispatchEvent(eventArgs);
                },
                notifyInteracted() {
                    const eventArgs = new CustomEvent('MDCTab:interacted', {
                        bubbles: true,
                        detail: {
                            tabId: boundElement.id,
                        },
                    });
                    boundElement.dispatchEvent(eventArgs);
                },
                getOffsetLeft() {
                    return boundElement.offsetLeft;
                },
                getOffsetWidth() {
                    return boundElement.offsetWidth;
                },
                getContentOffsetLeft() {
                    const contentEl = boundElement.querySelector('.mdc-tab__content');
                    return (contentEl === null || contentEl === void 0 ? void 0 : contentEl.offsetLeft) || 0;
                },
                getContentOffsetWidth() {
                    const contentEl = boundElement.querySelector('.mdc-tab__content');
                    return (contentEl === null || contentEl === void 0 ? void 0 : contentEl.offsetWidth) || 0;
                },
                focus() {
                    boundElement.focus();
                },
            };
            const mdcInstance = new MDCTabFoundation(_adapter);
            boundElement.mdcTab = mdcInstance;
            mdcInstance.init();
            boundElement.onTabIndicatorInitialized = (e) => {
                const eventArgs = e;
                boundElement.mdcTabIndicator =
                    eventArgs.detail.source.mdcIndicator;
            };
            boundElement.handleOnClick = (e) => {
                mdcInstance.handleClick();
            };
            boundElement.onSelectionChanged = (e) => {
                var _a, _b;
                const eventArgs = e;
                if (eventArgs.detail.tabId == boundElement.id) {
                    if (e.type == TabEvents.ACTIVATE) {
                        (_a = boundElement.mdcTab) === null || _a === void 0 ? void 0 : _a.activate(eventArgs.detail.clientRect);
                    }
                    else if (e.type == TabEvents.DEACTIVATE) {
                        (_b = boundElement.mdcTab) === null || _b === void 0 ? void 0 : _b.deactivate();
                    }
                    else if (e.type == TabEvents.FOCUS) {
                        boundElement.focus();
                    }
                }
            };
            boundElement.addEventListener(TabEvents.CLICK, boundElement.handleOnClick);
            boundElement.addEventListener(TabIndicatorEvents.INITIALIZED, boundElement.onTabIndicatorInitialized);
            boundElement.addEventListener(TabEvents.FOCUS, boundElement.onSelectionChanged);
            boundElement.addEventListener(TabEvents.ACTIVATE, boundElement.onSelectionChanged);
            boundElement.addEventListener(TabEvents.DEACTIVATE, boundElement.onSelectionChanged);
        }
    },
    inserted(el, binding, vnode) {
        //
    },
    update(el, binding, vnode) {
        //
    },
    componentUpdated(el, binding, vnode) {
        //
    },
    unbind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        const eventArgs = new CustomEvent(TabEvents.DESTROYING, {
            bubbles: true,
            detail: {
                source: boundElement,
            },
        });
        boundElement.dispatchEvent(eventArgs);
        boundElement.removeEventListener(TabEvents.CLICK, boundElement.handleOnClick);
        boundElement.removeEventListener(TabIndicatorEvents.INITIALIZED, boundElement.onTabIndicatorInitialized);
        document.removeEventListener(TabEvents.FOCUS, boundElement.onSelectionChanged);
        document.removeEventListener(TabEvents.ACTIVATE, boundElement.onSelectionChanged);
        document.removeEventListener(TabEvents.DEACTIVATE, boundElement.onSelectionChanged);
        (_a = boundElement.mdcTab) === null || _a === void 0 ? void 0 : _a.destroy();
        boundElement.mdcTab = null;
    },
};
export default Tab;
//# sourceMappingURL=Tab.js.map