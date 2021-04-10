# `Tab`

`v-tab`, `v-tab-bar`, `v-tab-indicator` and `v-tab-scroller` Vue Directives for MDC Tab - MDC Web (Material Components for Web).

![npm (scoped)](https://img.shields.io/npm/v/@vueable-material/tab)
[![Canary Release](https://github.com/surevelox/vueable-material/actions/workflows/canary-release.yml/badge.svg)](https://github.com/surevelox/vueable-material/actions/workflows/canary-release.yml)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-ff69b4)](https://github.com/sponsors/surevelox)

## Usage

```bash
npm install @vueable-material/tab --save
```

Use in Vue Component

```javascript
import { Tab, TabBar, TabIndicator, TabScroller } from '@vueable-material/tab';

export default {
    directives: {
        Tab,
        TabBar,
        TabIndicator,
        TabScroller,
    },
};
```

Define HTML and use MDC Web CSS/SCCSS

```html
<template>
    <div>
        <div
            class="mdc-tab-bar"
            role="tablist"
            @MDCTabBar:activated="tabActivated"
            v-tab-bar
        >
            <div class="mdc-tab-scroller" v-tab-scroller>
                <div class="mdc-tab-scroller__scroll-area">
                    <button
                        id="tabRecent"
                        class="mdc-tab"
                        role="tab"
                        aria-selected="true"
                        tabindex="0"
                        v-tab
                    >
                        <span class="mdc-tab__content">
                            <span
                                class="mdc-tab__icon material-icons"
                                aria-hidden="true"
                                >access_time</span
                            >
                            <span class="mdc-tab__text-label">Recents</span>
                        </span>
                        <span class="mdc-tab-indicator" v-tab-indicator>
                            <span
                                class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                            ></span>
                        </span>
                        <span class="mdc-tab__ripple" v-ripple></span>
                    </button>
                    <div class="mdc-tab-scroller__scroll-content">
                        <button
                            id="tabNearBy"
                            class="mdc-tab"
                            role="tab"
                            aria-selected="true"
                            tabindex="0"
                            v-tab
                        >
                            <span class="mdc-tab__content">
                                <span
                                    class="mdc-tab__icon material-icons"
                                    aria-hidden="true"
                                    >near_me</span
                                >
                                <span class="mdc-tab__text-label">Near By</span>
                            </span>
                            <span class="mdc-tab-indicator" v-tab-indicator>
                                <span
                                    class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                                ></span>
                            </span>
                            <span class="mdc-tab__ripple" v-ripple></span>
                        </button>
                        <button
                            id="tabFavorite"
                            class="mdc-tab"
                            role="tab"
                            aria-selected="true"
                            tabindex="0"
                            v-tab
                        >
                            <span class="mdc-tab__content">
                                <span
                                    class="mdc-tab__icon material-icons"
                                    aria-hidden="true"
                                    >favorite</span
                                >
                                <span class="mdc-tab__text-label"
                                    >Favorites</span
                                >
                            </span>
                            <span class="mdc-tab-indicator" v-tab-indicator>
                                <span
                                    class="mdc-tab-indicator__content mdc-tab-indicator__content--underline"
                                ></span>
                            </span>
                            <span class="mdc-tab__ripple" v-ripple></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div
            style="border-top: 1px solid #ccc; padding: 20px;"
            v-if="activeTab == 'tabRecent' "
        >
            Recent Tab Selected
        </div>
        <div
            style="border-top: 1px solid #ccc; padding: 20px;"
            v-if="activeTab == 'tabNearBy' "
        >
            Near by Tab Selected
        </div>
        <div
            style="border-top: 1px solid #ccc; padding: 20px;"
            v-if="activeTab == 'tabFavorite' "
        >
            Favorite tab Selected
        </div>
    </div>
</template>
<style>
    .mdc-ripple-surface {
        padding: 8px;
    }
</style>
```

## Examples

See working examples at https://surevelox.github.io/vueable-material/
