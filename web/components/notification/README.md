# Notification

[toc]

## main.vue

```vue
<template>
  <transition name="notify">
    <div class="notify notification" v-show="visible" :style="verticalOffset">
      <div class="notify-header" :class="'notification-' + type">
        <i class="iconfont" :class="'icon-' + type" />
        <span class="notify-title" v-text="title" />
      </div>
      <div class="notify-body" v-text="message" />
    </div>
  </transition>
</template>

<script lang="ts">
export default {
  name: 'Notify',
  data () {
    return {
      visible: false,
      type: 'success',
      title: 'Notify',
      message: 'success',
      timer: null,
      duration: 5000,
      onClose: null,
      offset: 0,
      closed: false
    }
  },
  computed: {
    verticalOffset () {
      return `top: ${this.offset}px;`
    }
  },
  methods: {
    destroyElement() {
      this.$el.removeEventListener('transitionend', this.destroyElement);
      // this.$destroy(true);
      this.$destroy();
      this.$el.parentNode.removeChild(this.$el);
    },
    close () {
      this.closed = true
      this.onClose()
    }
  },
  mounted () {
    this.timer = setTimeout(() => {
      this.close()
    }, this.duration)
  },
  watch: {
    closed (val) {
      // 已关闭
      if (val) {
        this.visible = false
        // transition 结束移除 $el
        this.$el.addEventListener('transitionend', this.destroyElement)
      }
    }
  }
}
</script>
```

## index.ts

```ts
import Vue from 'vue'
// @ts-ignore
import Main from './main.vue'

const NotificationConstructor = Vue.extend(Main)

interface IOptions {
  [prop: string]: any;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
}

interface IInstance {
  [prop: string]: any;
}

let key = 1
let instance: IInstance
let instances: IInstance[] = []

const Notification = (options: IOptions): IInstance | undefined => {
  if (typeof window === 'undefined') return
  const id = 'notification_' + key++

  options.onClose = () => {
    Notification.close(id);
  };
  instance = new NotificationConstructor({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true

  // instance.dom = instance.$el
  let offset = 0
  // instance.$el.style.zIndex = PopupManager.nextZIndex();
  instances.forEach(item => {
    console.log('offsetHeight ==============', item.$el.offsetHeight);
    offset += item.$el.offsetHeight + 16
  })
  offset += 16
  
  instance.offset = offset
  instances.push(instance)
  return instance
}

// ['success', 'warning', 'info', 'error'].forEach(type => {
//   if (Notification !== undefined) {
//     // Notification[type] = options => {
//     //
//     // }
//   }
// })

Notification.close = (id: string) => {
  const len = instances.length
  let index = -1
  const curInstance = instances.filter((ins, i) => {
    if (ins.id === id) {
      index = i
      return true
    }
    return false
  })[0]
  if (!curInstance) return
  instances.splice(index, 1)
  // 实例列表只剩当前实例，就不存在需变动其他实例的 position 偏移量
  if (len <= 1) return
  // const position = curInstance.position
  // console.log('position ====', position);
  
  const removedHeight = instance.$el.offsetHeight
  for (let i = 0; i < len - 1; i++) {
    const verticalOffset = instances[i].$el.style['top']
    console.log('verticalOffset', verticalOffset);
    instances[i].$el.style['top'] = parseInt(verticalOffset) - removedHeight - 16 + 'px'
  }
}

export default Notification

```

## stylesheet

```scss
/**
  notify transition
*/
.notify-enter-active,
.notify-leave-active {
  transition: all .5s;
}

.notify-enter,
.notify-leave-to {
  transform: translateX(250px);
  opacity: 0;
}

.notification {
  position: fixed;
  right: 10px;
}

.notify {
  margin: 10px 0;
  transition: all .5s;
  max-width: 230px;
  box-shadow: 0 0 10px 3px rgba($color: #000, $alpha: 0.1);
  background-color: var(--white);
  border-radius: 10px;
  padding: 20px;
  &.notify-enter {
    transform: translateX(250px);
    opacity: 0;
  }
  .notify-header {
    margin-bottom: 10px;
    font-weight: 400;
    display: flex;
    align-items: center;
    &.notification-success {
      color: var(--success);
    }
    &.notification-info {
      color: var(--primary);
    }
    &.notification-warning {
      color: var(--warning);
    }
    &.notification-error {
      color: var(--error);
    }
    .iconfont {
      margin-right: 5px;
      color: inherit;
    }
  }
  &.notify-success .notify-header {
    color: var(--success);
  }
  &.notify-info .notify-header {
    color: var(--primary);
  }
  &.notify-error .notify-header {
    color: var(--error);
  }
  &.notify-warning .notify-header {
    color: var(--warning);
  }
  .notify-body {
    font-size: 14px;
    margin: 5px 0;
    color: var(--lightTxt);
  }
}
```
