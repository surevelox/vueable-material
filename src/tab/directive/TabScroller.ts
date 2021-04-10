import { DirectiveOptions, VNodeDirective, VNode } from 'vue';
import {
    MDCTabScrollerFoundation,
    MDCTabScrollerAdapter,
} from '@material/tab-scroller';
import * as util from '@material/tab-scroller/util';
import { matches } from '@material/dom/ponyfill';

type ScrollerElementProperty = {
    readonly area: HTMLElement;
    readonly content: HTMLElement;
};

interface MDCTabScrollerElement extends HTMLElement {
    mdcScroller: MDCTabScrollerFoundation | null;
    scroller: ScrollerElementProperty;
}

const TabScroller: DirectiveOptions = {
    bind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabScrollerElement;
        if (boundElement != null) {
            //Foundation Component
            let mdcInstance = null;

            boundElement.scroller = {
                get area() {
                    const x = boundElement.querySelector<HTMLElement>(
                        '.mdc-tab-scroller__scroll-area',
                    );
                    if (x == null) {
                        return boundElement;
                    } else {
                        return x;
                    }
                },
                get content() {
                    const x = boundElement.querySelector<HTMLElement>(
                        '.mdc-tab-scroller__scroll-content',
                    );
                    if (x == null) {
                        return boundElement.firstChild as HTMLElement;
                    } else {
                        return x;
                    }
                },
            };

            const _adapter: MDCTabScrollerAdapter = {
                addClass(className: string): void {
                    boundElement.classList.add(className);
                },
                removeClass(className: string): void {
                    boundElement.classList.remove(className);
                },
                addScrollAreaClass(className: string): void {
                    boundElement.scroller.area.classList.add(className);
                },
                eventTargetMatchesSelector(
                    evtTarget: EventTarget,
                    selector: string,
                ): boolean {
                    return matches(evtTarget as Element, selector);
                },
                setScrollAreaStyleProperty(
                    propName: string,
                    value: string,
                ): void {
                    boundElement.scroller.content?.style.setProperty(
                        propName,
                        value,
                    );
                },
                setScrollContentStyleProperty(
                    propName: string,
                    value: string,
                ): void {
                    window
                        .getComputedStyle(boundElement.scroller.content)
                        .getPropertyValue(propName);
                },
                getScrollContentStyleValue(propertyName: string): string {
                    return window
                        .getComputedStyle(boundElement.scroller.content)
                        .getPropertyValue(propertyName);
                },
                setScrollAreaScrollLeft(scrollLeft: number): void {
                    boundElement.scroller.area.scrollLeft = scrollLeft;
                },
                getScrollAreaScrollLeft(): number {
                    return boundElement.scroller.area.scrollLeft;
                },
                getScrollContentOffsetWidth(): number {
                    return boundElement.scroller.content.offsetWidth;
                },
                getScrollAreaOffsetWidth(): number {
                    return boundElement.scroller.area.offsetWidth;
                },
                computeScrollAreaClientRect(): ClientRect {
                    return boundElement.scroller.area.getBoundingClientRect();
                },
                computeScrollContentClientRect(): ClientRect {
                    return boundElement.scroller.content.getBoundingClientRect();
                },
                computeHorizontalScrollbarHeight(): number {
                    return util.computeHorizontalScrollbarHeight(document);
                },
            };

            mdcInstance = new MDCTabScrollerFoundation(_adapter);
            mdcInstance.init();
            boundElement.mdcScroller = mdcInstance;

            //Fire Tab Scroller Added Event on next tick
            vnode?.context?.$nextTick(() => {
                const eventArgs = new CustomEvent(
                    'v-mdc-tab-scroller:initialized',
                    {
                        bubbles: true,
                        detail: {
                            source: boundElement,
                        },
                    },
                );
                boundElement.dispatchEvent(eventArgs);
            });
        }
    },

    inserted(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        //
    },

    unbind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabScrollerElement;
        if (boundElement != null) {
            boundElement.mdcScroller?.destroy();
            boundElement.mdcScroller = null;
        }
    },
};
export default TabScroller;
