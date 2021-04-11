import { MDCRippleFoundation } from "@material/ripple";
import "@material/ripple";
import * as util from "@material/ripple/util";
import "vue";
import "@material/base/types";
import { applyPassive } from "@material/dom/events";
import { matches } from "@material/dom/ponyfill";
const Ripple = {
    inserted(el, binding, vnode) {
        // Empty Method
    },
    bind(el, binding, vnode) {
        var _a;
        const boundElement = el;
        const modifiers = binding.modifiers;
        const arg = binding.arg;
        boundElement.isUnbounded = (modifiers === null || modifiers === void 0 ? void 0 : modifiers.unbounded) || false;
        const _adapter = {
            browserSupportsCssVars() {
                return util.supportsCssVariables(window);
            },
            isUnbounded() {
                return boundElement.isUnbounded;
            },
            isSurfaceActive() {
                return matches(boundElement, ":active");
            },
            isSurfaceDisabled() {
                return false;
            },
            addClass(className) {
                boundElement.classList.add(className);
            },
            removeClass(className) {
                boundElement.classList.remove(className);
            },
            containsEventTarget(target) {
                return boundElement.contains(target);
            },
            registerInteractionHandler: (evtType, handler) => boundElement.addEventListener(evtType, handler, applyPassive()),
            deregisterInteractionHandler(evtType, handler) {
                boundElement.removeEventListener(evtType, handler, applyPassive());
            },
            registerDocumentInteractionHandler: (evtType, handler) => document.documentElement.addEventListener(evtType, handler, applyPassive()),
            deregisterDocumentInteractionHandler(evtType, handler) {
                document.documentElement.removeEventListener(evtType, handler, applyPassive());
            },
            registerResizeHandler(handler) {
                window.addEventListener("resize", handler);
            },
            deregisterResizeHandler(handler) {
                window.removeEventListener("resize", handler);
            },
            updateCssVariable(varName, value) {
                boundElement.style.setProperty(varName, value);
            },
            computeBoundingRect() {
                return boundElement.getBoundingClientRect();
            },
            getWindowPageOffset() {
                return { x: window.pageXOffset, y: window.pageYOffset };
            }
        };
        (_a = vnode === null || vnode === void 0 ? void 0 : vnode.context) === null || _a === void 0 ? void 0 : _a.$nextTick(() => {
            var _a;
            if (boundElement.mdcRipple == null) {
                //Create Foundation and Initialize
                boundElement.mdcRipple = new MDCRippleFoundation(_adapter);
                if (modifiers === null || modifiers === void 0 ? void 0 : modifiers.unbounded) {
                    boundElement.isUnbounded = true;
                    boundElement.mdcRipple.setUnbounded(true);
                }
                (_a = boundElement.mdcRipple) === null || _a === void 0 ? void 0 : _a.init();
            }
        });
    },
    unbind(el, binding, vnode) {
        const boundElement = el;
        boundElement.mdcRipple.destroy();
    }
};
export default Ripple;
//# sourceMappingURL=Ripple.js.map