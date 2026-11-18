# Swiper 任务一 · 提示词工程师 —— 提示词与 AI 回答记录

> 付佳宁 · 24002120623 · 高级网页设计
> 任务要求：把需求"翻译"给 AI，生成 `new Swiper('#wySw4', {...})` 配置：① 无缝循环 ② 3.2 秒自动翻页且手动操作后不停止 ③ 圆点分页器可点击 ④ 初始效果为 cube。至少迭代 2 轮提示词，保留每轮提示词与 AI 回答，粘进页面验证。
> 页面验证：swiper-three-tasks.html（第 1 轮错误代码已原样粘进页面做真机演示）

---

## 第 1 轮 · 我的提示词（朴素版）

```
帮我用 Swiper 写一个轮播，选择器是 #wySw4：要无缝循环播放，3.2 秒自动翻页，带圆点分页器，圆点可以点击跳转，初始效果用 cube 立方体。
```

## 第 1 轮 · AI 回答（有 4 处错误）

```js
var swiper = new Swiper('#wySw4', {
  autoplay: { delay: 3200 },                            // ← 错误② 漏 disableOnInteraction:false
  pagination: { el: "#wyPagination", clickable: true }, // ← 错误③ id 猜错了
  effect: "Cube"                                        // ← 错误④ 大小写错，Swiper 不识别
});                                                     // ← 错误① 压根没写 loop
```

### 粘进页面验证结果（4 项全 FAIL）

| 检查项 | 现象 | 结论 |
|---|---|---|
| ① 无缝循环 | 整个 `loop` 参数没写，拖到最后一张就卡住不回卷 | FAIL |
| ② 3.2 秒自动翻页·手动后不停 | 没写 `disableOnInteraction:false`，配置缺失 —— Swiper 11 默认值恰好也是 false，行为侥幸没露馅，但需求没被显式实现 | FAIL |
| ③ 圆点分页器可点击 | el 写成 `#wyPagination`，页面真实 id 是 `#wyPag4`，圆点不渲染 | FAIL |
| ④ 初始效果 cube | `effect` 写成 `"Cube"`（大写），Swiper 不识别，退回普通 slide，完全没有 3D 立方体 | FAIL |

**一句话结论**：第 1 轮 4 项全 FAIL —— 提示词太笼统，要不要循环、分页器真实 id、效果名大小写全没说清，AI 凭经验猜，错了四处。

---

## 第 2 轮 · 我的提示词（精准版：参数名 + 类型 + 值 + 原因）

```
重新给 #wySw4 写配置，逐条照做：
① loop: true —— 无缝循环要显式写上（上一轮整个漏了）；
② autoplay: { delay: 3200, disableOnInteraction: false } —— 需求"手动操作后不停止"必须显式落地，不能赌库的默认值；
③ pagination: { el: '#wyPag4', clickable: true } —— 页面里分页器容器真实 id 就是 #wyPag4，不要自己编；
④ effect: 'cube'（全小写，Swiper 才识别）+ cubeEffect: { shadow:true, slideShadows:true, shadowOffset:20, shadowScale:0.94 } 显式声明立体阴影；
⑤ speed: 800。除以上内容不要额外发挥。
```

## 第 2 轮 · AI 回答（4 处全部修正）

```js
var wySw4Instance = new Swiper('#wySw4', {
  loop: true,                          // 布尔值，循环生效
  speed: 800,
  autoplay: { delay: 3200, disableOnInteraction: false },  // 拖后不再停
  pagination: { el: '#wyPag4', clickable: true },          // id 对上，可点
  effect: 'cube',                      // 全小写才识别
  cubeEffect: { shadow: true, slideShadows: true, shadowOffset: 20, shadowScale: 0.94 }  // 立体阴影
});
```

### 粘进页面验证结果（4 项全 PASS）

| 检查项 | 实例真实参数（页面 JS 自动读取） | 结论 |
|---|---|---|
| ① 无缝循环 | loop = true（boolean 类型） | PASS |
| ② 3.2 秒自动翻页·手动后不停 | delay = 3200，disableOnInteraction = false | PASS |
| ③ 圆点分页器可点击 | el = '#wyPag4'，clickable = true，实际渲染圆点正常 | PASS |
| ④ 初始效果 cube | effect = 'cube'，.swiper-cube-shadow 存在 | PASS |

---

## 经验总结

第 1 轮把提示词当成"说人话"，AI 只能凭经验猜：id 自己编、效果名大小写随手写、loop 直接漏。
第 2 轮把提示词写成**接口文档**——每条需求都是"参数名 + 类型 + 值 + 原因"四件套，AI 没法再自由发挥，一次到位。
