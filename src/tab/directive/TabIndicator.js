import 'vue';
import { MDCSlidingTabIndicatorFoundation, MDCFadingTabIndicatorFoundation, } from '@material/tab-indicator';
const TabIndicator = {
    inserted(el, binding, vnode) {
        //
    },
    bind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            const _adapter = {
                addClass(className) {
                    boundElement.classList.add(className);
                },
                removeClass(className) {
                    boundElement.classList.remove(className);
                },
                computeContentClientRect() {
                    const contentEl = boundElement.querySelector('.mdc-tab-indicator__content');
                    return contentEl.getBoundingClientRect();
                },
                setContentStyleProperty(propName, value) {
                    const contentEl = boundElement.querySelectorAll('.mdc-tab-indicator__content');
                    const styleProp = propName;
                    if (contentEl != null && contentEl.length > 0) {
                        contentEl[0].style[styleProp] = value;
                    }
                },
            };
            // Bind Implementation
            const indicatorArg = binding.arg || 'sliding';
            //Foundation Component
            let mdcInstance;
            if (indicatorArg == 'fade')
                mdcInstance = new MDCFadingTabIndicatorFoundation(_adapter);
            else
                mdcInstance = new MDCSlidingTabIndicatorFoundation(_adapter);
            mdcInstance.init();
            boundElement.mdcIndicator = mdcInstance;
            boundElement.activateIndicator = (e) => {
                const event = e;
                mdcInstance.activate(event.detail.previousIndicatorClientRect);
            };
            boundElement.deactivateIndicator = () => {
                mdcInstance.deactivate();
            };
            boundElement.addEventListener('v-mdc-tab:activate-indicator', boundElement.activateIndicator);
            boundElement.addEventListener('v-mdc-tab:deactivate-indicator', boundElement.deactivateIndicator);
            //Fire Tab Added Event on next tick
            (_a = vnode === null || vnode === void 0 ? void 0 : vnode.context) === null || _a === void 0 ? void 0 : _a.$nextTick(() => {
                const eventArgs = new CustomEvent('v-mdc-tab-indicator:initialized', {
                    bubbles: true,
                    detail: {
                        source: boundElement,
                    },
                });
                boundElement.dispatchEvent(eventArgs);
            });
        }
    },
    unbind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        if (boundElement != null) {
            boundElement.removeEventListener('v-mdc-tab:activate-indicator', boundElement.activateIndicator);
            boundElement.removeEventListener('v-mdc-tab:deactivate-indicator', boundElement.deactivateIndicator);
            (_a = boundElement.mdcIndicator) === null || _a === void 0 ? void 0 : _a.destroy();
            boundElement.mdcIndicator = null;
        }
    },
};
export default TabIndicator;
//# sourceMappingURL=TabIndicator.js.map