---
title: Velocity.js 動畫引擎 | 前端三十之一
excerpt: ''
coverImage: ''
date: '2020-08-18 08:56:33'
ogImage: 
  url: ''
tags:
---

今天要來介紹的，是一個相當常見的動畫引擎：[Velocity.js](http://velocityjs.org/)。

---

# 簡介
Velocity 是由 Julian Shapiro 開發的簡便動畫引擎，提供順暢且語法簡易的程式碼。目前其授權為 MIT 授權，為開放軟體。


許多人會因為 javascript 動畫的效能比 CSS 慢，而放棄 javascript 的編寫方式。而 Velocity 聲稱其能夠提供媲美 CSS 動畫的流暢度，提倡使用 javascript 以邏輯為導向的編寫方式，以降低複雜動畫在 CSS 上的困難和難以擴充、維護等缺點。


在應用上，包括 Uber、Samsung、WhatsApp、Tumblr、HTC、Windows 等等著名網站的使用者介面，都使用了 Velocity 作為動畫驅動。
 

Velocity 無論 jQuery 存在與否都能夠進行 DOM 控制，其其差異僅在語法上的簡潔程度。

 ---

# 引用

引用 Velocity 有許多方式。主要分成 load as script 或是 load as module。若要以 script 方式引入，可 [從官網下載](http://velocityjs.org/) 或是 [使用 CDN](https://github.com/julianshapiro/velocity#quickstart)。以 module 形式引入的話，可用 npm、Browserify、RequireJS 等方式，官網上皆有詳盡紀載。


要注意的是，在寫這篇文章時，2.0.6 版本的 UI pack 似乎尚不穩定，因此本篇中使用的是 1.5.0版的 Velocity。

 

# 基本語法介紹

沒有引入 jQuery 時，需透過 Velocitiy utility function 進行呼叫：

`Velocity(element, {property:value}, {options: value})`

引入 jQuery 後，語法和 jQuery 自身的 .animate() 使用方式幾乎一致：

`$(query).velocity( {property:value}, {options: value})`

也可以透過 utiliti function 進行呼叫：

`$.Velocity(element, {property:value}, {options: value})`
 

---

# 語法規則

以 jQuery 呼叫方式為例：

`$(query).velocity( {property:value}, {options: value})`

$(query) 即為一般 jQuery object，後面 property 則對應到一系列 CSS 屬性。其 value 可以是一般 CSS value，接受 CSS 內建單位。


同時，也可以透過 +=, -=, *=, /= 等運算指派作為前綴。使用運算指派時，會對屬性值進行運算。

```javascript
$('.box').velocity({
    width: '30px',
    height: '150px',
    left: '+=100px'
}, {options: value})
```

上方例子將一矩形長寬改變後，向右移動 100 pixel。[（CodePen 玩玩看！）](https://codepen.io/_shanpig/pen/GRZqNeO)

 
---

在 Velocity 中設定的每個屬性，一次只能修改一個數值。例如：width, padding-top, margin-left 等等。而由於物件名稱不可出現 dash (-)，所有含 dash 的屬性名稱皆以 camelCase 代替。


另外，針對多數值屬性，比如：box-shadow, transform 等等，Velocity 分別為其製作 [hook](http://velocityjs.org/#hook) 以單獨使用：

```javascript
$(".box").velocity({
    translateX: '+=100px',
    rotateZ: '+=90deg',
})
```

上方例子將一矩形一邊向右移動，一邊旋轉。（CodePen 玩玩看！）


其餘的不同 CSS 和 Velocity 屬性名稱對照，可以參照官網的列表喔！

 

# 動畫串聯 (Chaining)

當一連串的動畫，想要依序播放時，可以以 jQuery 語法串聯，或是用 utility function 寫成多行：

```javascript
$(".box")
  .velocity({ translateX: '+=100px' })
  .velocity({ translateY: '+=100px' })
  .velocity({ translateX: '-=100px' })
  .velocity({ translateY: '-=100px' })
```

上方例子將一矩形進行一連串移動。[（CodePen 玩玩看！）](https://codepen.io/_shanpig/pen/jOqrybR)


utility function 的形式：

```javascript
let box = document.querySelector('.box')
Velocity(box, { translateX: '+=100px'});
Velocity(box, { translateY: '+=100px'});
Velocity(box, { translateX: '-=100px'});
Velocity(box, { translateY: '-=100px'});
```

# 動畫選項 (Options)

在 velocity 的選項中有諸如延遲、循環等各種功能。以下為各選項預設值：

```javascript
duration: 400, // 動畫時長
easing: "swing", // 動畫速度調節函數
queue: "", // 動畫分組
begin: undefined, // 於動畫開始前執行的函數 (只執行一次)
progress: undefined, // 於動畫中持續執行的函數
complete: undefined, // 於動畫結束後執行的函數 (只執行一次)
display: undefined, // 於動畫結束後的 css 屬性 display 改變
visibility: undefined, // 於動畫結束後的 css 屬性 visibility 改變
loop: false, // 循環動畫次數
delay: false, // 動畫前的延遲
mobileHA: true // 手機硬體加速支援
```

這裡針對較特殊的選項作介紹：


- ### queue
  不設定任何值的話，velocity 會以 chaining 規則將動畫串聯。<br>若設為 false，動畫會與前一個動畫同時播放；設定字串，則會為動畫進行分組，並可利用 dequeue 進行播放。

- ### progress
  在動畫過程中，不斷執行的函數。傳入的 callback function，其中第一個參數為 element，其餘則依序是：
    - complete	(完成百分比)
    - remaining	(剩餘時間，毫秒為單位)
    - start			(動畫開始時間，Unix time)
    - tween	  	(自定義進度最小值與最大值)。


在 callback function 中，可使用此四個參數，進行動畫的追蹤或列出進度等。


- ### mobileHA
  由於手機資源較稀缺，故在動畫呈現上需要做硬體上的加速。 Velocity 預設在手機上自動開啟硬體加速，因此一般可以忽略。

 

# 停止動畫的方式

```javascript
$element.velocity("stop"); // 停止所有該元素的動畫
$element.velocity("stop", "myQueue"); // 停止某個分組的動畫
$element.velocity("finish"); // 直接跳到動畫結束狀態
```
 

# [練習專案](https://codepen.io/_shanpig/pen/jOqrBXL)
我利用 Velocity 製作了一個很簡易的，展示細節內容的動畫按鈕，歡迎玩玩看囉！

Velocity 還有很多我並未寫出來的功能，大家可以去官網詳讀 ~

 
# 參考資料

1. [Velocity 官網](http://velocityjs.org/)
2. [Velocity github](https://github.com/julianshapiro/velocity#npm-npm-install-velocity-animatebeta)
3. [How to animate without jQuery](https://www.smashingmagazine.com/2014/09/animating-without-jquery/)