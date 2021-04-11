import 'vue';
import { MDCTabBarFoundation } from '@material/tab-bar/foundation';
import '@material/tab';
import { TabEvents } from './Events';
const TabBar = {
    bind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            boundElement.tabList = [];
            // Bind Implementation
            const _adapter = {
                scrollTo(scrollX) {
                    var _a;
                    (_a = boundElement.scrollerEl) === null || _a === void 0 ? void 0 : _a.mdcScroller.scrollTo(scrollX);
                },
                incrementScroll(scrollXIncrement) {
                    boundElement.scrollerEl.mdcScroller.incrementScroll(scrollXIncrement);
                },
                getScrollPosition() {
                    var _a;
                    return (_a = boundElement.scrollerEl) === null || _a === void 0 ? void 0 : _a.mdcScroller.getScrollPosition();
                },
                getScrollContentWidth() {
                    var _a;
                    return (_a = boundElement.scrollerEl) === null || _a === void 0 ? void 0 : _a.scroller.content.offsetWidth;
                },
                getOffsetWidth() {
                    return boundElement.offsetWidth;
                },
                isRTL() {
                    return (window
                        .getComputedStyle(boundElement)
                        .getPropertyValue('direction') === 'rtl');
                },
                setActiveTab(index) {
                    var _a;
                    (_a = boundElement === null || boundElement === void 0 ? void 0 : boundElement.mdcTabBar) === null || _a === void 0 ? void 0 : _a.activateTab(index);
                },
                activateTabAtIndex(index, clientRect) {
                    const tabElement = boundElement.querySelector(`[data-vmdc-tab='${boundElement.tabList[index]}']`);
                    tabElement.dispatchEvent(new CustomEvent(TabEvents.ACTIVATE, {
                        detail: {
                            tabId: boundElement.tabList[index],
                            clientRect: clientRect,
                        },
                    }));
                    boundElement.dataset['activetab'] =
                        boundElement.tabList[index];
                },
                deactivateTabAtIndex(index) {
                    const tabElement = boundElement.querySelector(`[data-vmdc-tab='${boundElement.tabList[index]}']`);
                    tabElement.dispatchEvent(new CustomEvent(TabEvents.DEACTIVATE, {
                        detail: {
                            tabId: boundElement.tabList[index],
                        },
                    }));
                },
                focusTabAtIndex(index) {
                    const tabElement = boundElement.querySelector(`[data-vmdc-tab='${boundElement.tabList[index]}']`);
                    tabElement.dispatchEvent(new CustomEvent(TabEvents.FOCUS, {
                        detail: {
                            tabId: boundElement.tabList[index],
                        },
                    }));
                },
                getTabIndicatorClientRectAtIndex(index) {
                    var _a;
                    const x = boundElement
                        .querySelector(`#${boundElement.tabList[index]}`)
                        .querySelector('.mdc-tab-indicator');
                    return (_a = x === null || x === void 0 ? void 0 : x.mdcIndicator) === null || _a === void 0 ? void 0 : _a.computeContentClientRect();
                },
                getTabDimensionsAtIndex(index) {
                    const x = boundElement.querySelector(`#${boundElement.tabList[index]}`);
                    return x.mdcTab.computeDimensions();
                },
                getTabListLength() {
                    return boundElement.tabList.length;
                },
                getPreviousActiveTabIndex() {
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (boundElement.tabList[i] ==
                            boundElement.dataset['activetab']) {
                            return i;
                        }
                    }
                    return -1;
                },
                getFocusedTabIndex() {
                    const activeElement = document.activeElement;
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (boundElement.tabList[i] === activeElement.id) {
                            return i;
                        }
                    }
                    return -1;
                },
                getIndexOfTabById(id) {
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (boundElement.tabList[i] === id) {
                            return i;
                        }
                    }
                    return -1;
                },
                notifyTabActivated(index) {
                    boundElement.dispatchEvent(new CustomEvent('MDCTabBar:activated', {
                        detail: {
                            tabId: boundElement.tabList[index],
                        },
                    }));
                },
            };
            const mdcInstance = new MDCTabBarFoundation(_adapter);
            boundElement.mdcTabBar = mdcInstance;
            boundElement.handleTabInteraction = (evt) => {
                mdcInstance.handleTabInteraction(evt);
            };
            boundElement.onTabScrollerInitialized = (e) => {
                const eventArgs = e;
                e.stopPropagation();
                boundElement.scrollerEl = eventArgs.detail.source;
            };
            boundElement.handleKeyDown = (evt) => {
                mdcInstance.handleKeyDown(evt);
            };
            boundElement.UpdateTabList = () => {
                const tabs = [];
                boundElement
                    .querySelectorAll('[data-vmdc-tab]')
                    .forEach((item, index) => {
                    tabs.push(item.dataset.vmdcTab);
                });
                boundElement.tabList = tabs;
            };
            boundElement.tabObserver = new MutationObserver((mutations) => {
                boundElement.UpdateTabList();
            });
            boundElement.addEventListener('v-mdc-tab-scroller:initialized', boundElement.onTabScrollerInitialized);
            boundElement.addEventListener('MDCTab:interacted', boundElement.handleTabInteraction);
            boundElement.addEventListener('keydown', boundElement.handleKeyDown);
            //Fire Tab Bar Added Event on next tick
            (_a = vnode === null || vnode === void 0 ? void 0 : vnode.context) === null || _a === void 0 ? void 0 : _a.$nextTick(() => {
                boundElement.UpdateTabList();
                boundElement.tabObserver.observe(boundElement, {
                    childList: true,
                    subtree: true,
                });
            });
        }
    },
    update(el, binding, vnode) {
        //
    },
    componentUpdated(el, binding, vnode) {
        //
    },
    inserted(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            (_a = boundElement.mdcTabBar) === null || _a === void 0 ? void 0 : _a.init();
        }
    },
    unbind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        boundElement.removeEventListener('MDCTab:interacted', boundElement.handleTabInteraction);
        boundElement.removeEventListener('v-mdc-tab-scroller:initialized', boundElement.onTabScrollerInitialized);
        boundElement.removeEventListener('keydown', boundElement.handleKeyDown);
        (_a = boundElement.mdcTabBar) === null || _a === void 0 ? void 0 : _a.destroy();
        boundElement.mdcTabBar = null;
        boundElement.scrollerEl = null;
    },
};
export default TabBar;
//# sourceMappingURL=TabBar.js.map