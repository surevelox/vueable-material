import Ripple from "./directive/Ripple";
import "vue";
export { Ripple };
export class RipplePluginOptions {
}
const RipplePlugin = {
    key: "RipplePlugin",
    install: (Vue, options) => {
        Vue.directive("ripple", Ripple);
    }
};
export default RipplePlugin;
//# sourceMappingURL=index.js.map