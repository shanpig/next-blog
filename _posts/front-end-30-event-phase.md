---
title: 'Event phase : 你搞不懂的事件階段與傳遞機制 | 前端三十之三'
excerpt: ''
date: '2022-06-27 23:19:54'
ogImage:
  url: ''
tags:
---

你有沒有曾經在寫程式時，遇過這樣的狀況：在一堆巢狀的元素上加了事件監聽 (eventListener)，但他們卻沒有按照你的想法被觸發？


舉個簡單的例子：學會了 addEventListener 的你，興致勃勃的建了一個 [**簡單**的射飛鏢小遊戲](https://codepen.io/_shanpig/pen/vYGmxOX)，只要使用滑鼠點擊計分板，就算射中靶了 ( 對，就是這麼簡單 )。


根據邏輯，你在每個 div 元素上，都加上了 eventListener，分別紀錄射中之後的計分。理論上，只要點擊不同的部位，就會分別加上 1分、10分、100分。


當你開始玩的時候，悲劇發生了。

<video >
  <source src='/images/event-phase.mp4' type='video/mp4'></source>
</video>

![](./images/event-phase.mp4)

What ??????

 

## 一個簡單的問題 ...


要知道到底出了甚麼問題，首先要從一個問題問起。右邊的圖中，箭頭指的是紅色圓圈、藍色圓圈、還是綠色圓圈呢？


答案是：**全部都是！**


仔細想想看，箭頭所指的地方，是不是同時在三個不同的圓圈內部？那麼這三個圓圈，理所當然的都是箭頭所指的對象！


也就是說，點擊 100 的時候，會加上 100+10+1=111 分，點擊 10 的時候，會加上 10+1=11 分，依此類推。也就是我們小遊戲中遇到的狀況囉！


***我們再想一個進階的問題：***

點擊 100 造成分數加 111，計算加分的先後順序，是先加 100，還是 10，又或是 1呢？

---
 
## addEventListener 簡介

在了解計算加分發生的先後順序之前，我們先來簡單介紹一下 [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) 方法 (這裡介紹的是最常見的用法)。


`eventTarget.addEventListener( type, listener[, useCapture])`

- eventTarget：想要加上事件監聽的元素

- type：事件觸發的條件 (如 click, change, submit 等等)

- listener：事件觸發後要執行的動作 (通常是一個函式)

- useCapture：觸發的事件階段 (冒泡或是捕獲，預設為冒泡)


基本用法：

```javascript
let button = document.querySelector('#a-button');
button.addEventListener( 'click', function(event){
    // 當按下按鈕之後，在 console 中列出 "button clicked" 字樣 
    console.log('button clicked');
};
```

在 addEventListener 的參數中，可以看到一個名為 useCapture 的奇怪參數，他就是程式在判斷事件監聽的觸發順序時的關鍵。因此，下個部分，我們來看一看甚麼叫做事件階段。

--- 

## 事件階段 (Event phase) -- 冒泡、目標、捕獲

來源：A Simple Explanation of Event Delegation in JavaScript

在某一個事件監聽被觸發時，不一定 只有一個事件監聽有反應，而是只要是符合條件的監聽，都會跟著一起觸發 (想想飛標遊戲的靶)。而程式又應該怎麼知道，有哪些符合條件、又要以甚麼順序執行呢？


程式為了要找到 html 裡面，符合事件的監聽，會在你的 DOM tree 中尋找，**一路往下探到 eventListener 所在的位置，找到目標之後，再一路上浮回來。**


上述的這個流程，我們稱作 **事件傳遞 (event propagation)**。而其中，就隱含了 eventListener 的三個事件階段：**捕獲、目標、與冒泡**。


之所以會有這三個階段，其實是剛開始對 eventListener 的規劃中，微軟和網景公司(Netscape) 分別提出了兩種搜尋觸發對象的方式。

---
 

網景提出的 **捕獲** 概念 (event capture)，是

由上而下，從 html 文件最外層向內搜

索，一路到達符合事件觸發的元素後，依序觸發事件。


也就是說，滑鼠點擊 100 之後，計算的過程是先加 1，然後加 10，最後加 100。


最後的分數會是 +111。

---
 

微軟提出的 *冒泡* 概念，則是相反的，由下而上，從最內層一路向外 (向上)，最後到達 html 最外層。


也就是說，點擊 100之後，分數先加 100，之後加 10，最後加 1。


最後的分數會是 +111。

---
 
最後，W3C 將兩種概念結合，統整出事件傳遞的三個事件階段。


**捕獲階段 (capturing phase)**，程式從 html > body > 各個元素，往下遍歷，到了事件發生的元素 (也就是 eventListener 的位置)，進入 **目標階段 (target phase)**，而後開始往回上浮，這個時期稱作 **冒泡階段 (bubbling phase)**。


- 捕獲階段中，無論 eventListener 在程式中的加入順序為何，都以被捕獲的順序做為執行的順序。也就是說，最外層的元素，eventListener 會先被執行。

- 冒泡階段中，則是以冒泡順序作為執行順序，跟捕獲階段相反。

- 在目標階段中，則是沒有先後順序之分，因此以程式中 eventListener 的加入順序，作為事件觸發的執行順序。


addEventListener 的參數中，有一個 useCapture 的布林值，他代表的是，這個事件監聽，想要在捕獲還是冒泡階段執行。預設值為 **冒泡階段執行**。一般而言，我們都會希望設定事件監聽的元素 **首先被觸發**，因此預設在冒泡階段相當合理。

---

## 回到飛鏢小遊戲

現在我們已經知道，飛鏢遊戲的分數之所以出問題，是因為事件傳遞的過程，會遍歷所有的元素來檢查，看有沒有其他符合條件的 eventListener ，並且一同觸發。而在點擊 100 的時候，程式往下捕獲，到達靶心之後往回冒泡，一路發現了 100 分、10 分、1分 三個事件監聽，因此依序把他們都觸發了。


了解了事件階段之後，我們要怎麼修復小遊戲的 bug 呢？

---
 

## 方法一：停止事件傳遞

既然知道是因為事件傳遞造成的問題，最簡單的方式，就是直接把事件停止囉。


```javascript
eventTarget.addEventListener( type, function(event){
    console.log('事件傳遞到我這之後，就不再冒泡上去囉')
    event.stopPropagation()
})
```

像這裡所說的，只要讓事件傳遞到達指定位置之後，就終止傳遞，就可以避免重複計分的狀況了。


[實際飛鏢小遊戲寫法 - codepen](https://codepen.io/_shanpig/pen/rNemYMJ)


特別注意一下，stopPropagation 會阻止該觸發的事件繼續傳遞，但如果目標元素上，還有其他的事件監聽，是不會被阻止的喔！詳情可以看看 [stopPropagation v.s. stopImmediatePropagation](https://www.geeksforgeeks.org/difference-between-stoppropagation-vs-stopimmediatepropagation-in-javascript/) ~

---
 
## 方法二：事件委託 (event delegation) (進階)

第二種方法比較進階，而且 **跟事件傳遞機制無關**。但他卻是一個使用事件監聽的時候，非常實用的概念。


當一個巢狀元素中有一大堆的事件監聽，尤其是大量重複的監聽，比如一整排按鈕時，加入一拖拉庫的事件監聽就顯得非常沒有效率，同時也會造成事件傳遞過於複雜。因此，事件委託的概念就應運而生。

---
 
**事件委託** 可以用一個故事來理解：


老師在開學前突然靈機一動，想要讓寒假出國的學生們，各自拍一個心得短片。但老師不知道誰有出國，只好拿出手機，一個一個詢問，再分別佈置作業。過了一天，老師又想額外請有住宿的同學寫一份如何看房的心得，雖然很煩，但也只能再次拿出手機，一個一個確認，再各自交代作業內容。


下個學期，老師覺得這樣實在太麻煩了，於是想到了一個辦法：選班代！只要有班代在，以後交代作業都可以告訴班代，再由班代轉告其他學生。學生要交作業，也都可以透過班代交給老師。

 ---

從上面的故事可以看出來，觸發事件的條件就是 **"出國"**，觸發後執行的函式就是 **"寫作業"**，學生就是 **"含有事件監聽的元素"**。


那我們的飛鏢小遊戲，又該如何實作事件監聽呢？


我們可以在標靶的外面，套上一個負責監聽事件的 div，也就是 **"班代"**。當他監聽到點擊事件發生後，往下尋找到被點擊的對象，再根據對象所代表的分數，以此計分就可以囉。


在 addEventListener 的執行函式中，有一個引入參數 event，這個參數記載了所有事件的細節，如[觸發事件的對象 (event.target)](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/target)、[事件監聽所在的元素 (event.currentTarget)](https://developer.mozilla.org/zh-TW/docs/Web/API/Event/currentTarget) 等等。其中，event.target 會指向真正觸發事件的對象 (也就是真正滑鼠點到的靶位)。只要根據對象，進行 if else 或是 switch case 的邏輯判斷式，就可以分別進行不同的事件處理了！

```javascript
board.addEventListener('click', function(e){
      // 找到射中的對象是哪個靶位
      let target = e.target.classList
      
      // 用 class name 來確認靶位
      if (target.contains('add1')) score+=1
      else if (target.contains('add10')) score+=10
      else if (target.contains('add100')) score+=100
      
      // 紀錄分數
      total_score.innerText = score
    })
```

[完整程式碼在這裡 - codepen](https://codepen.io/_shanpig/pen/poyPpPQ)


 ---

## 總結

我們今天介紹了 eventListener 的事件傳遞機制，以及三個事件傳遞的階段，了解了 eventListener 事件觸發的流程，並以一個小遊戲的程式貫穿全文。希望可以讓各位讀者讀完後，有茅塞頓開的感受！有任何指教，也歡迎來信一起討論喔！

---
 

## 參考資料

[DOM 的事件傳遞機制：捕獲與冒泡  | TechBridge 技術共筆部落格](https://blog.techbridge.cc/2017/07/15/javascript-event-propagation/)

[[DOM] Event Propagation I : 事件捕捉和冒泡-Event Capture & Bubble](https://medium.com/@hsien.w.wei/dom-event-propagation-i-%E4%BA%8B%E4%BB%B6%E6%8D%95%E6%8D%89%E5%92%8C%E5%86%92%E6%B3%A1-event-capture-bubble-8214bf146b35)

[你真的理解事件冒泡和事件捕獲嗎？](https://juejin.im/post/6844903834075021326)

[A Simple Explanation of Event Delegation in JavaScript](https://dmitripavlutin.com/javascript-event-delegation/)

[Event Delegation — 事件委派介紹 與 觸發委派的回呼函數](https://medium.com/@realdennis/event-delegation-%E4%BA%8B%E4%BB%B6%E5%A7%94%E6%B4%BE%E4%BB%8B%E7%B4%B9-%E8%88%87-%E8%A7%B8%E7%99%BC%E5%A7%94%E6%B4%BE%E7%9A%84%E5%9B%9E%E5%91%BC%E5%87%BD%E6%95%B8-2990921a5ba2)