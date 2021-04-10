import { DirectiveOptions, VNodeDirective, VNode } from 'vue';
import { MDCTabFoundation } from '@material/tab';
import { MDCTabIndicatorFoundation } from '@material/tab-indicator';
import { TabEvents, TabIndicatorEvents } from './Events';

let uid = 0;

function uId() {
    return 'tab_' + ++uid;
}

interface MDCTabElement extends HTMLElement {
    uid: number;
    mdcTab: MDCTabFoundation | null;
    mdcTabIndicator: MDCTabIndicatorFoundation;
    handleOnClick: (e: Event) => void;
    onTabIndicatorInitialized: (e: Event) => void;
    onSelectionChanged: (e: Event) => void;
}

function setModel(
    obj: any,
    objExpression: string,
    propertyName: string,
    value: any,
) {
    objExpression.split('.').reduce(function(o, x) {
        return o[x];
    }, obj)[propertyName] = value;
}

export interface TabArgs {
    Item: any;
    propName: string;
}

const Tab: DirectiveOptions = {
    bind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabElement;

        if (boundElement != null) {
            boundElement.id = boundElement.id || uId();
            boundElement.dataset.vmdcTab = boundElement.id;

            const tabArgs = binding.value as TabArgs;

            // Bind Implementation
            const _adapter = {
                addClass(className: string): void {
                    boundElement.classList.add(className);
                },
                removeClass(className: string): void {
                    boundElement.classList.remove(className);
                },
                hasClass(className: string): boolean {
                    return boundElement.classList.contains(className);
                },
                setAttr(attr: string, value: string): void {
                    boundElement.setAttribute(attr, value);
                },

                activateIndicator(
                    previousIndicatorClientRect?: ClientRect | undefined,
                ): void {
                    if (tabArgs != null) {
                        if (tabArgs.Item != null && tabArgs.propName != null) {
                            tabArgs.Item[tabArgs.propName] = true;
                        }
                    }

                    const contentEl = boundElement.querySelector(
                        '.mdc-tab-indicator',
                    ) as HTMLElement;

                    const eventArgs = new CustomEvent(
                        'v-mdc-tab:activate-indicator',
                        {
                            detail: {
                                source: boundElement,
                                previousIndicatorClientRect: previousIndicatorClientRect,
                            },
                        },
                    );

                    contentEl?.dispatchEvent(eventArgs);
                },

                deactivateIndicator(): void {
                    if (vnode.context != null && binding.expression != null) {
                        if (tabArgs.Item != null && tabArgs.propName != null) {
                            tabArgs.Item[tabArgs.propName] = false;
                        }
                    }

                    const contentEl = boundElement.querySelector(
                        '.mdc-tab-indicator',
                    ) as HTMLElement;

                    const eventArgs = new CustomEvent(
                        'v-mdc-tab:deactivate-indicator',
                        {
                            detail: {
                                source: boundElement,
                            },
                        },
                    );

                    contentEl?.dispatchEvent(eventArgs);
                },

                notifyInteracted(): void {
                    const eventArgs = new CustomEvent('MDCTab:interacted', {
                        bubbles: true,
                        detail: {
                            tabId: boundElement.id,
                        },
                    });
                    boundElement.dispatchEvent(eventArgs);
                },

                getOffsetLeft(): number {
                    return boundElement.offsetLeft;
                },

                getOffsetWidth(): number {
                    return boundElement.offsetWidth;
                },

                getContentOffsetLeft(): number {
                    const contentEl = boundElement.querySelector(
                        '.mdc-tab__content',
                    ) as HTMLElement;
                    return contentEl?.offsetLeft || 0;
                },
                getContentOffsetWidth(): number {
                    const contentEl = boundElement.querySelector(
                        '.mdc-tab__content',
                    ) as HTMLElement;
                    return contentEl?.offsetWidth || 0;
                },
                focus(): void {
                    boundElement.focus();
                },
            };

            const mdcInstance = new MDCTabFoundation(_adapter);
            boundElement.mdcTab = mdcInstance;
            mdcInstance.init();

            boundElement.onTabIndicatorInitialized = (e: Event) => {
                const eventArgs = e as CustomEvent;
                boundElement.mdcTabIndicator =
                    eventArgs.detail.source.mdcIndicator;
            };

            boundElement.handleOnClick = (e: Event) => {
                mdcInstance.handleClick();
            };

            boundElement.onSelectionChanged = (e: Event) => {
                const eventArgs = e as CustomEvent;
                if (eventArgs.detail.tabId == boundElement.id) {
                    if (e.type == TabEvents.ACTIVATE) {
                        boundElement.mdcTab?.activate(
                            eventArgs.detail.clientRect,
                        );
                    } else if (e.type == TabEvents.DEACTIVATE) {
                        boundElement.mdcTab?.deactivate();
                    } else if (e.type == TabEvents.FOCUS) {
                        boundElement.focus();
                    }
                }
            };

            boundElement.addEventListener(
                TabEvents.CLICK,
                boundElement.handleOnClick,
            );
            boundElement.addEventListener(
                TabIndicatorEvents.INITIALIZED,
                boundElement.onTabIndicatorInitialized,
            );
            boundElement.addEventListener(
                TabEvents.FOCUS,
                boundElement.onSelectionChanged,
            );
            boundElement.addEventListener(
                TabEvents.ACTIVATE,
                boundElement.onSelectionChanged,
            );
            boundElement.addEventListener(
                TabEvents.DEACTIVATE,
                boundElement.onSelectionChanged,
            );
        }
    },

    inserted(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        //
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

    unbind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabElement;
        const eventArgs = new CustomEvent(TabEvents.DESTROYING, {
            bubbles: true,
            detail: {
                source: boundElement,
            },
        });
        boundElement.dispatchEvent(eventArgs);

        boundElement.removeEventListener(
            TabEvents.CLICK,
            boundElement.handleOnClick,
        );
        boundElement.removeEventListener(
            TabIndicatorEvents.INITIALIZED,
            boundElement.onTabIndicatorInitialized,
        );
        document.removeEventListener(
            TabEvents.FOCUS,
            boundElement.onSelectionChanged,
        );
        document.removeEventListener(
            TabEvents.ACTIVATE,
            boundElement.onSelectionChanged,
        );
        document.removeEventListener(
            TabEvents.DEACTIVATE,
            boundElement.onSelectionChanged,
        );

        boundElement.mdcTab?.destroy();
        boundElement.mdcTab = null;
    },
};
export default Tab;
