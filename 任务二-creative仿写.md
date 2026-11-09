# 任务二 · creative 仿写 — 胶片效果

> 课堂上只讲了 6 种 effect（slide / fade / cube / coverflow / flip / cards），creative 没讲。本任务通过**读 Swiper 官方 TypeScript 类型定义** + **读懂 creativeEffect 的 prev/next transform 写法**，仿写第 7 个效果按钮。

---

## 官方参考

- 官方 demo 页：`swiperjs.com/demos#effects` → creative
- Swiper 14 官方类型定义：`swiper/types/interfaces/modules_effect-creative`
- CreativeEffectTransform 接口关键字段：

```ts
interface CreativeEffectTransform {
  translate?: [string | number, string | number, string | number]; // X, Y, Z
  rotate?:    [number, number, number];                           // X, Y, Z 角度
  scale?:     number;                                              // 0~1
  opacity?:   number;                                              // 0~1
}
```

---

## 实现代码（加进 wySw4Config）

```js
creativeEffect: {
  prev: {
    translate: ['-15%', 0, -200],   // 左移 15%，Z 轴后退 200px（景深效果）
    rotate: [0, 0, 5],              // 顺时针转 5°（像胶片条微微倾斜）
    scale: 0.85,                     // 缩小到 85%
    opacity: 0.55,                   // 半透明，突出中间 active
  },
  next: {
    translate: ['15%', 0, -200],    // 右移 15%，Z 轴后退
    rotate: [0, 0, -5],             // 逆时针转 5°（和 prev 对称）
    scale: 0.85,
    opacity: 0.55,
  },
},
```

按钮 HTML：

```html
<button data-fx="creative">creative 影墙（胶片·学生自学）</button>
```

切换逻辑复用进阶任务的 `destroy + new`，data-fx="creative" 会自动让 `wySw4Config('creative')` 生效。

---

## 浏览器验证结果

| 检查项 | 结果 | 证据 |
|--------|------|------|
| creative 按钮存在 | ✅ | 7 个按钮从 slide 到 creative 全齐 |
| 点击 creative 切换成功 | ✅ | 旧实例 destroy 后重建，effect='creative' |
| prev 胶片效果 | ✅ | 左移 + 缩小 + 顺时针 5° + 半透明 |
| next 胶片效果 | ✅ | 右移 + 缩小 + 逆时针 -5° + 半透明 |
| active slide 保持 100% | ✅ | 中间一张正常大小、完全不透明，两侧退后缩小 |
| 控制台报错 | ✅ 无 | Console messages: (none) |

---

## 🎯 答辩准备

### Q1：改哪个数值能让卡片转 20°？

> `rotate` 数组第 3 个元素是 Z 轴旋转角度（degrees）。现在写的是 `rotate: [0, 0, 5]`，把那个 `5` 改成 `20` 就是转 20°。`rotate` 的三个值分别是 **X 轴旋转（俯仰）、Y 轴旋转（翻牌）、Z 轴旋转（平面旋转/倾斜）**。胶片风格只用 Z 轴就够了。

### Q2：`translate` 里的 `-15%` 是什么？

> 是 **X 轴方向的位移**。`translate: [x, y, z]`，`x=-15%` 就是向左移当前 slide 宽度的 15%。`y` 设成 `0` 不上下动。`z=-200` 是 Z 轴向后退 200 像素（CSS perspective 下会变小，创造景深——胶片条"远"一点）。Swiper creativeEffect 里 translate 接受**字符串百分比**（如 `'-15%'`）或**数字 px**（如 `-200`）两种形式，所以我混用了。

---

## 💡 自学心得

> 核心突破：creative effect 和 cube / coverflow 不一样——它的参数不是写死的 CSS 预设，而是让你自己给 prev / next 两张 slide 定义**完整的 transform**（translate + rotate + scale + opacity 全覆盖）。所以老师没给固定效果名，而是叫我们读官方示例 `257-effect-creative.html`。我读了 Swiper 14 的 TypeScript 类型定义才搞懂 translate 数组三个值分别代表 X/Y/Z，rotate 同理。
