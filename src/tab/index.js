import Tab from './directive/Tab';
import TabBar from './directive/TabBar';
import TabIndicator from './directive/TabIndicator';
import TabScroller from './directive/TabScroller';
import 'vue'; // <-- notice the changed import
export { Tab, TabBar, TabIndicator, TabScroller };
export class TabPluginOptions {
}
// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
const TabPlugin = {
    key: 'TabPlugin',
    install: (Vue, options) => {
        console.log('Installing the CommentsOverlay plugin!');
        Vue.directive('tab', Tab);
        Vue.directive('tab-bar', TabBar);
        Vue.directive('tab-indicator', TabIndicator);
        Vue.directive('tab-scroller', TabScroller);
    },
};
export default TabPlugin;
//# sourceMappingURL=index.js.map