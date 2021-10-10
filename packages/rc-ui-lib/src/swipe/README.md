# Swipe 轮播

### 介绍

用于循环播放一组图片或内容，采用[Swiper](https://swiperjs.com/react)实现。

### 引入

```js
import { Swipe } from 'rc-ui-lib';
```

## 代码演示

### 基础用法

每个 SwipeItem 代表一张轮播卡片，可以通过 `autoplay` 属性设置自动轮播的间隔。

```jsx
<Swipe className="my-swipe" autoplay={3000}>
  <Swipe.Item>1</Swipe.Item>
  <Swipe.Item>2</Swipe.Item>
  <Swipe.Item>3</Swipe.Item>
  <Swipe.Item>4</Swipe.Item>
</Swipe>

<style>
  .my-swipe .rc-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>
```

### 自定义指示器

通过 `pagination` 可以自定义指示器的渲染，详见[pagination api](https://swiperjs.com/swiper-api#pagination)。

```jsx
<Swipe
  autoplay={3000}
  pagination={{
    renderBullet: (index, className) => {
      return `<span class="custom-pagination--bullet ${className}"></span>`;
    },
  }}
>
  <Swipe.Item>1</Swipe.Item>
  <Swipe.Item>2</Swipe.Item>
  <Swipe.Item>3</Swipe.Item>
  <Swipe.Item>4</Swipe.Item>
</Swipe>

<style>
  .custom-pagination--bullet {
    width: 10px !important;
    height: 4px !important;
    margin: 0 2px !important;
    border-radius: 2px !important;
  }
</style>
```

### 懒加载

当 Swipe 中含有图片时，可以通过 `lazy` 属性来开启懒加载模式。配置相见[lazy api](https://swiperjs.com/swiper-api#lazy-loading)

```jsx
<Swipe autoplay={3000} lazy>
  {images.map((item) => (
    <Swipe.Item key={item}>
      <img className="swiper-lazy" src={item} alt="" />
    </Swipe.Item>
  ))}
</Swipe>
```

```js
const images = [
  'https://img.yzcdn.cn/vant/apple-1.jpg',
  'https://img.yzcdn.cn/vant/apple-2.jpg',
  'https://img.yzcdn.cn/vant/apple-3.jpg',
  'https://img.yzcdn.cn/vant/apple-4.jpg',
];
```

### 监听 change 事件

```jsx
<Swipe onChange="{onChange}">
  <Swipe.Item>1</Swipe.Item>
  <Swipe.Item>2</Swipe.Item>
  <Swipe.Item>3</Swipe.Item>
  <Swipe.Item>4</Swipe.Item>
</Swipe>
```

```js
import { Toast } from 'rc-ui-lib';

const onChange = (index: number) => Toast(`当前 Swipe 索引：${index}`);
```

### 纵向滚动

设置 `vertical` 属性后滑块会纵向排列，此时需要指定滑块容器的高度。

```jsx
<Swipe autoplay={3000} vertical style={{ height: '200px' }} className="demo-swipe--vertical">
  <Swipe.Item>1</Swipe.Item>
  <Swipe.Item>2</Swipe.Item>
  <Swipe.Item>3</Swipe.Item>
  <Swipe.Item>4</Swipe.Item>
</Swipe>
```

## API

### Swipe Props

> 支持所有 Swiper 的原生 api，[Swiper 文档](https://swiperjs.com/swiper-api)

| 参数         | 说明                     | 类型      | 默认值  |
| ------------ | ------------------------ | --------- | ------- |
| autoplay     | 自动轮播间隔，单位为 ms  | _number_  | `3000`  |
| duration     | 动画时长，单位为 ms      | _number_  | `500`   |
| initialSwipe | 初始位置索引值           | _number_  | `0`     |
| width        | 滑块宽度，单位为`px`     | _number_  | -       |
| height       | 滑块高度，单位为`px`     | _number_  | -       |
| loop         | 是否开启循环播放         | _boolean_ | `true`  |
| vertical     | 是否为纵向滚动           | _boolean_ | `false` |
| lazy         | 是否延迟渲染未展示的轮播 | _boolean_ | `false` |

### Swipe Events

| 事件名   | 说明                 | 回调参数            |
| -------- | -------------------- | ------------------- |
| onChange | 每一页轮播结束后触发 | index, 当前页的索引 |

### SwipeItem Props

`SwipeItem` 是 `Swipeer.SwiperSlide` 的别名导出，详见[SwiperSlide Props](https://swiperjs.com/react#swiper-slide-props)

### Swipe 方法

通过 ref 可以获取到 Swipe 实例并调用实例方法，详见[swiper-api](https://swiperjs.com/swiper-api)。

```jsx
import { Swipe, SwipeInstance } from 'rc-ui-lib'

export default () => {
  const ref = useRef<SwipeInstance>()
  const next = () => {
    // 调用Swipe实例方法
    ref.current?.slideNext()
  }
  return (
    <Swipe ref={ref} autoplay={3000}>
      <Swipe.Item>1</Swipe.Item>
      <Swipe.Item>2</Swipe.Item>
      <Swipe.Item>3</Swipe.Item>
      <Swipe.Item>4</Swipe.Item>
    </Swipe>
  )
}
```


## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](#/zh-CN/config-provider)。

| 名称 | 默认值 | 描述 |
| --- | --- | --- |
| --rc-swipe-indicator-size | _6px_ | - |
| --rc-swipe-indicator-margin | _var(--rc-padding-sm)_ | - |
| --rc-swipe-indicator-active-opacity | _1_ | - |
| --rc-swipe-indicator-inactive-opacity | _0.3_ | - |
| --rc-swipe-indicator-active-background-color | _var(--rc-primary-color)_ | - |
| --rc-swipe-indicator-inactive-background-color | _var(--rc-border-color)_ | - |
