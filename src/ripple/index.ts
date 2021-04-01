import Ripple from './directive/Ripple';

import _Vue, { PluginObject } from 'vue';

export { Ripple };

export class RipplePluginOptions {}

const RipplePlugin: PluginObject<RipplePluginOptions> = {
    key: 'RipplePlugin',
    install: (Vue: typeof _Vue, options?: any): void => {
        Vue.directive('ripple', Ripple);
    }
};

export default RipplePlugin;
