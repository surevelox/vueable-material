import { shallowMount } from "@vue/test-utils";
import Ripple from "../directive/Ripple";
import "vue";
describe("Directive v-ripple", () => {
    // The component to test
    const defaultTemplate = (caption) => ({
        template: `<div v-ripple>{{ text }}</div>`,
        props: [caption],
        directives: {
            Ripple
        }
    });
    const unboundedTemplate = (caption) => ({
        template: `<div v-ripple.unbounded>{{ text }}</div>`,
        props: [caption],
        directives: {
            Ripple
        }
    });
    beforeAll(() => {
        // Replace RAF with setTimeout, since setTimeout is overridden to be
        // synchronous in Jasmine clock installation.
        window.requestAnimationFrame = (fn) => setTimeout(fn, 1);
        window.cancelAnimationFrame = (id) => {
            clearTimeout(id);
        };
    });
    beforeEach(() => {
        jest.useFakeTimers();
    });
    afterEach(() => { });
    it("Should initialize and create mdc-component on nextTick ", done => {
        // Prepare
        // render the component
        const caption = "Ripple Text";
        const wrapper = shallowMount(defaultTemplate(caption));
        const rootEl = wrapper.element;
        let mockFn = jest.fn();
        // Act
        expect(rootEl.mdcRipple).toBeUndefined();
        // Assert
        wrapper.vm
            .$nextTick()
            .then(() => {
            expect(rootEl.mdcRipple).not.toBeUndefined();
        })
            .then(done, done);
    });
    it("Should initialize without unbounded modifier Falsy", done => {
        // render the component
        const caption = "Ripple Text";
        const wrapper = shallowMount(defaultTemplate(caption));
        // Prepare
        const rootEl = wrapper.element;
        // Act
        expect(rootEl.mdcRipple).toBeUndefined();
        // Assert
        wrapper.vm
            .$nextTick()
            .then(() => {
            expect(rootEl.isUnbounded).toBeFalsy();
        })
            .then(done, done);
    });
    it("Should initialize with unbounded modifier Truthy", done => {
        // render the component
        const caption = "Ripple Text";
        const wrapper = shallowMount(defaultTemplate(caption));
        // Prepare
        const rootEl = wrapper.element;
        // Act
        expect(rootEl.mdcRipple).toBeUndefined();
        // Assert
        wrapper.vm
            .$nextTick()
            .then(() => {
            expect(rootEl.isUnbounded).toBeFalsy();
        })
            .then(done, done);
    });
    it("handleFocus() adds class", done => {
        // Prepare
        // render the component
        jest.useFakeTimers();
        const expectedClass = "mdc-ripple-upgraded--background-focused";
        const caption = "Ripple Text";
        const wrapper = shallowMount(defaultTemplate(caption));
        const rootEl = wrapper.element;
        wrapper.vm
            .$nextTick()
            .then(() => {
            var _a;
            (_a = rootEl.mdcRipple) === null || _a === void 0 ? void 0 : _a.handleFocus();
            jest.advanceTimersByTime(1);
            expect(rootEl.classList).toContain(expectedClass);
        })
            .then(done, done);
    });
    it("handleBlur() removes class", done => {
        // Prepare
        // render the component
        jest.useFakeTimers();
        const notExpectedClass = "mdc-ripple-upgraded--background-focused";
        const caption = "Ripple Text";
        const wrapper = shallowMount(defaultTemplate(caption));
        const rootEl = wrapper.element;
        rootEl.classList.add(notExpectedClass);
        wrapper.vm
            .$nextTick()
            .then(() => {
            var _a;
            (_a = rootEl.mdcRipple) === null || _a === void 0 ? void 0 : _a.handleBlur();
            jest.advanceTimersByTime(1);
            expect(rootEl.classList).not.toContain(notExpectedClass);
        })
            .then(done, done);
    });
});
//# sourceMappingURL=Ripple.spec.js.map