import { MDCRippleFoundation } from "@material/ripple";
import { DirectiveOptions } from "vue";
export interface MDCRippleElement extends HTMLElement {
    mdcRipple: MDCRippleFoundation | null;
    isUnbounded: boolean;
}
declare const Ripple: DirectiveOptions;
export default Ripple;
