import { shallowMount } from '@vue/test-utils';
import Tab from '../directive/Tab';
import Vue from 'vue';

describe('Directive v-tab', () => {
    // The component to test
    const defaultTabTemplate = (caption: any) => ({
        template: `
    <button
        class="mdc-tab"
        role="tab"
        aria-selected="true"
        tabindex="0"
        v-tab>       
            <span class="mdc-tab__text-label">{{ text }}</span>
        </span>        
    </button>
    `,
        props: [caption],
        directives: {
            Tab,
        },
    });

    beforeAll(() => {
        // Replace RAF with setTimeout, since setTimeout is overridden to be
        // synchronous in Jasmine clock installation.
        window.requestAnimationFrame = (fn: Function) => setTimeout(fn, 1);
        window.cancelAnimationFrame = (id: number) => {
            clearTimeout(id);
        };
    });

    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {});

    it('Should initialize and create v-tab on nextTick ', (done) => {
        // Prepare

        // render the component
        const caption = 'Tab Text';
        const wrapper = shallowMount(defaultTabTemplate(caption));
        const rootEl: any = wrapper.element;

        let mockFn = jest.fn();

        // Act

        // Assert
        wrapper.vm
            .$nextTick()
            .then(() => {
                expect(rootEl.mdcTab).not.toBeUndefined();
            })
            .then(done, done);
    });

    it('Should handle click', (done) => {
        // Prepare

        // render the component
        const caption = 'Tab Text';
        const wrapper = shallowMount(defaultTabTemplate(caption));
        const rootEl: any = wrapper.element;

        // Assert
        wrapper.vm
            .$nextTick()
            .then(() => {
                rootEl.mdcTab.handleClick = jest.fn();
                const event = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true,
                });
                rootEl.dispatchEvent(event);
                expect(rootEl.mdcTab.handleClick).toHaveBeenCalled();
            })
            .then(done, done);
    });
});
