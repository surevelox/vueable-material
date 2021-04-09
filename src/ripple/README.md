# `Ripple`
`v-ripple` Vue Directive for MDC Ripple - MDC Web (Material Components for Web).

![npm (scoped)](https://img.shields.io/npm/v/@vueable-material/ripple)
[![Canary Release](https://github.com/surevelox/vueable-material/actions/workflows/canary-release.yml/badge.svg)](https://github.com/surevelox/vueable-material/actions/workflows/canary-release.yml)
[![Sponsor](https://img.shields.io/badge/Sponsor-%E2%9D%A4-ff69b4)](https://github.com/sponsors/surevelox)


## Usage


```bash
npm install @vueable-material/ripple --save
```

Use in Vue Component

```javascript
import { Ripple } from "@vueable-material/ripple";

export default {
  directives: {
    Ripple
  }
}
``` 
Define HTML and use MDC Web CSS/SCCSS
```html
<template>
    <div>
        <div  class="mdc-ripple-surface mdc-typography mdc-typography--caption" v-ripple>
            Ripple Text!
        </div>
    </div>
</template>
<style>
.mdc-ripple-surface{
    padding:8px;
}
</style>
```

## Examples

See working examples at https://surevelox.github.io/vueable-material/
