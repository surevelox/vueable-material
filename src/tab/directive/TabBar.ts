import { DirectiveOptions, VNodeDirective, VNode } from 'vue';
import { MDCTabBarFoundation } from '@material/tab-bar/foundation';
import { MDCTabDimensions, MDCTabInteractionEvent } from '@material/tab';
import { TabEvents } from './Events';

interface MDCTabBarElement extends HTMLElement {
    tabList: Array<any>;
    mdcTabBar: MDCTabBarFoundation | null;
    scrollerEl: any | null;
    handleTabInteraction: (e: Event) => void;
    onTabScrollerInitialized: (e: Event) => void;
    handleKeyDown: (e: Event) => void;
    UpdateTabList: () => void;
    tabObserver: MutationObserver;
}

const TabBar: DirectiveOptions = {
    bind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabBarElement;

        if (boundElement != null) {
            boundElement.tabList = [];

            // Bind Implementation
            const _adapter = {
                scrollTo(scrollX: number): void {
                    boundElement.scrollerEl?.mdcScroller!.scrollTo(scrollX);
                },
                incrementScroll(scrollXIncrement: number): void {
                    boundElement.scrollerEl!.mdcScroller.incrementScroll(
                        scrollXIncrement,
                    );
                },
                getScrollPosition(): number {
                    return boundElement.scrollerEl?.mdcScroller.getScrollPosition();
                },
                getScrollContentWidth(): number {
                    return boundElement.scrollerEl?.scroller.content
                        .offsetWidth;
                },
                getOffsetWidth(): number {
                    return boundElement.offsetWidth;
                },
                isRTL(): boolean {
                    return (
                        window
                            .getComputedStyle(boundElement)
                            .getPropertyValue('direction') === 'rtl'
                    );
                },
                setActiveTab(index: number): void {
                    boundElement?.mdcTabBar?.activateTab(index);
                },
                activateTabAtIndex(
                    index: number,
                    clientRect?: ClientRect | undefined,
                ): void {
                    const tabElement = boundElement.querySelector(
                        `[data-vmdc-tab='${boundElement.tabList[index]}']`,
                    ) as HTMLElement;
                    tabElement.dispatchEvent(
                        new CustomEvent(TabEvents.ACTIVATE, {
                            detail: {
                                tabId: boundElement.tabList[index],
                                clientRect: clientRect,
                            },
                        }),
                    );
                    boundElement.dataset['activetab'] =
                        boundElement.tabList[index];
                },
                deactivateTabAtIndex(index: number): void {
                    const tabElement = boundElement.querySelector(
                        `[data-vmdc-tab='${boundElement.tabList[index]}']`,
                    ) as HTMLElement;
                    tabElement.dispatchEvent(
                        new CustomEvent(TabEvents.DEACTIVATE, {
                            detail: {
                                tabId: boundElement.tabList[index],
                            },
                        }),
                    );
                },
                focusTabAtIndex(index: number): void {
                    const tabElement = boundElement.querySelector(
                        `[data-vmdc-tab='${boundElement.tabList[index]}']`,
                    ) as HTMLElement;
                    tabElement.dispatchEvent(
                        new CustomEvent(TabEvents.FOCUS, {
                            detail: {
                                tabId: boundElement.tabList[index],
                            },
                        }),
                    );
                },
                getTabIndicatorClientRectAtIndex(index: number): ClientRect {
                    const x = boundElement
                        .querySelector(`#${boundElement.tabList[index]}`)!
                        .querySelector('.mdc-tab-indicator') as any;
                    return x?.mdcIndicator?.computeContentClientRect();
                },
                getTabDimensionsAtIndex(index: number): MDCTabDimensions {
                    const x = boundElement.querySelector(
                        `#${boundElement.tabList[index]}`,
                    ) as any;
                    return x.mdcTab.computeDimensions();
                },
                getTabListLength(): number {
                    return boundElement.tabList.length;
                },
                getPreviousActiveTabIndex(): number {
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (
                            boundElement.tabList[i] ==
                            boundElement.dataset['activetab']
                        ) {
                            return i;
                        }
                    }
                    return -1;
                },
                getFocusedTabIndex(): number {
                    const activeElement = document.activeElement;
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (boundElement.tabList[i] === activeElement!.id) {
                            return i;
                        }
                    }
                    return -1;
                },
                getIndexOfTabById(id: string): number {
                    for (let i = 0; i < boundElement.tabList.length; i++) {
                        if (boundElement.tabList[i] === id) {
                            return i;
                        }
                    }
                    return -1;
                },
                notifyTabActivated(index: number): void {
                    boundElement.dispatchEvent(
                        new CustomEvent('MDCTabBar:activated', {
                            detail: {
                                tabId: boundElement.tabList[index],
                            },
                        }),
                    );
                },
            };

            const mdcInstance = new MDCTabBarFoundation(_adapter);
            boundElement.mdcTabBar = mdcInstance;

            boundElement.handleTabInteraction = (evt: Event) => {
                mdcInstance.handleTabInteraction(evt as MDCTabInteractionEvent);
            };

            boundElement.onTabScrollerInitialized = (e: Event) => {
                const eventArgs = e as CustomEvent;
                e.stopPropagation();
                boundElement.scrollerEl = eventArgs.detail.source;
            };

            boundElement.handleKeyDown = (evt: Event) => {
                mdcInstance.handleKeyDown(evt as KeyboardEvent);
            };

            boundElement.UpdateTabList = () => {
                const tabs: Array<string> = [];
                boundElement
                    .querySelectorAll('[data-vmdc-tab]')
                    .forEach((item, index) => {
                        tabs.push(
                            (item as HTMLElement).dataset.vmdcTab as string,
                        );
                    });

                boundElement.tabList = tabs;
            };
            boundElement.tabObserver = new MutationObserver((mutations) => {
                boundElement.UpdateTabList();
            });

            boundElement.addEventListener(
                'v-mdc-tab-scroller:initialized',
                boundElement.onTabScrollerInitialized,
            );

            boundElement.addEventListener(
                'MDCTab:interacted',
                boundElement.handleTabInteraction,
            );
            boundElement.addEventListener(
                'keydown',
                boundElement.handleKeyDown,
            );

            //Fire Tab Bar Added Event on next tick
            vnode?.context?.$nextTick(() => {
                boundElement.UpdateTabList();
                boundElement.tabObserver.observe(boundElement, {
                    childList: true,
                    subtree: true,
                });
            });
        }
    },

    update(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        //
    },

    componentUpdated(
        el: Element | null,
        binding: VNodeDirective,
        vnode: VNode,
    ) {
        //
    },

    inserted(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabBarElement;

        if (boundElement != null) {
            boundElement.mdcTabBar?.init();
        }
    },

    unbind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabBarElement;
        boundElement.removeEventListener(
            'MDCTab:interacted',
            boundElement.handleTabInteraction,
        );
        boundElement.removeEventListener(
            'v-mdc-tab-scroller:initialized',
            boundElement.onTabScrollerInitialized,
        );
        boundElement.removeEventListener('keydown', boundElement.handleKeyDown);

        boundElement.mdcTabBar?.destroy();
        boundElement.mdcTabBar = null;
        boundElement.scrollerEl = null;
    },
};
export default TabBar;
