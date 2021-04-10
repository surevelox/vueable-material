import { DirectiveOptions, VNodeDirective, VNode } from 'vue';
import {
    MDCSlidingTabIndicatorFoundation,
    MDCFadingTabIndicatorFoundation,
    MDCTabIndicatorAdapter,
    MDCTabIndicatorFoundation,
} from '@material/tab-indicator';

interface MDCTabIndicatorElement extends HTMLElement {
    mdcIndicator: MDCTabIndicatorFoundation | null;
    activateIndicator: (e: Event) => void;
    deactivateIndicator: (e: Event) => void;
}

const TabIndicator: DirectiveOptions = {
    inserted(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        //
    },
    bind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabIndicatorElement;
        if (boundElement != null) {
            const _adapter: MDCTabIndicatorAdapter = {
                addClass(className: string): void {
                    boundElement.classList.add(className);
                },
                removeClass(className: string): void {
                    boundElement.classList.remove(className);
                },
                computeContentClientRect(): ClientRect {
                    const contentEl = boundElement.querySelector(
                        '.mdc-tab-indicator__content',
                    ) as HTMLElement;
                    return contentEl.getBoundingClientRect();
                },
                setContentStyleProperty(propName: string, value: string): void {
                    const contentEl = boundElement.querySelectorAll(
                        '.mdc-tab-indicator__content',
                    );
                    const styleProp = propName as any;
                    if (contentEl != null && contentEl.length > 0) {
                        (contentEl[0] as HTMLElement).style[styleProp] = value;
                    }
                },
            };

            // Bind Implementation
            const indicatorArg = binding.arg || 'sliding';

            //Foundation Component
            let mdcInstance: any;

            if (indicatorArg == 'fade')
                mdcInstance = new MDCFadingTabIndicatorFoundation(_adapter);
            else mdcInstance = new MDCSlidingTabIndicatorFoundation(_adapter);
            mdcInstance.init();
            boundElement.mdcIndicator = mdcInstance;

            boundElement.activateIndicator = (e: Event) => {
                const event = e as CustomEvent;
                mdcInstance.activate(event.detail.previousIndicatorClientRect);
            };

            boundElement.deactivateIndicator = () => {
                mdcInstance.deactivate();
            };

            boundElement.addEventListener(
                'v-mdc-tab:activate-indicator',
                boundElement.activateIndicator,
            );
            boundElement.addEventListener(
                'v-mdc-tab:deactivate-indicator',
                boundElement.deactivateIndicator,
            );

            //Fire Tab Added Event on next tick
            vnode?.context?.$nextTick(() => {
                const eventArgs = new CustomEvent(
                    'v-mdc-tab-indicator:initialized',
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
    unbind(el: Element | null, binding: VNodeDirective, vnode: VNode) {
        const boundElement = el as MDCTabIndicatorElement;
        if (boundElement != null) {
            boundElement.removeEventListener(
                'v-mdc-tab:activate-indicator',
                boundElement.activateIndicator,
            );
            boundElement.removeEventListener(
                'v-mdc-tab:deactivate-indicator',
                boundElement.deactivateIndicator,
            );
            boundElement.mdcIndicator?.destroy();
            boundElement.mdcIndicator = null;
        }
    },
};

export default TabIndicator;
