---
title: Omnifood 切版練習 | 前端三十之二
excerpt: ''
coverImage: ''
date: '2022-06-12 09:27:55'
tags:
ogImage:
  url: ''

---

身為前端一份子不會切版，就像煮飯用篩網過濾一樣誇張。別鬧了好嘛！

![](./images/rice-in-collandar.png)


切板可以說是學習前端基礎HTML/CSS 之後，第一件要做的事。從網頁的外觀，判斷出各個版面應該有的圖層，透過 HTML 規劃階層架構，再利用 CSS 進行樣式渲染，就能做出一個簡單的靜態網頁。


多進行切版的練習，不只會對前端語言更孰悉，也會讓自己對於不同網頁的架構，有更全面的了解，在看到網頁後，腦中立即浮現解決方案，在未來的網頁開發的效率上，會有積沙成塔的效果！


因此前端三十第二篇，就一起來切個版吧！

---


# 切版對象：[Omnifood](http://www.omnifoodinc.com/)

選擇模仿對象時，可以選擇靜態網頁，或是網頁動態資訊較少的網頁，比較能夠專注在架構和樣式設計上。我選擇的網頁，是一個國外的健康食品外送公司的官網：Omnifood。


網頁的架構是一頁式應用 (SPA, Single Page Application)，對於初學切版的人較為直接，而使用到的動畫也不多，不會有太多版面移動的狀況。另外，網頁還有做響應式設計 (RWD, Responsible Web Design)，在各種螢幕寬度上都有做規劃。


他們的網頁很多人模仿過，也可以去參考看看 ~

---
 
# 切版目標與技術

由於挑戰限制是一週兩篇，鑒於時間壓力，要做 RWD 偏困難，因此我的目標是做出 PC 版的網頁，並且做到 80% 相似。也就是說，不需要做到像素級的完美，但美感、排版、視覺效果都要做到。至少看上去要是一個美美的網頁 ~


使用到的技術並不多，比較特別的，這次切板我學到的 CSS 技術，可以分為 flexbox 排版、background-attachment 滾動背景、還有利用 scale 做出的聚焦效果。


另外，為了寫起來方便、程式碼易讀性、以及一些瀏覽器相容性問題，我第一次使用了 [SCSS](https://zh.wikipedia.org/wiki/Sass) 預處理器來寫 CSS code。沒有聽過 SCSS 的人也可以用 CSS 直接寫，不過就比較麻煩一些就是了。


本篇的主旨在於簡介我的切版過程和想法，以及寫完後的心得整理，因此不會有太多的程式碼，請安心閱讀 XD

 ---

# 網頁架構分析

簡單看過網頁架構後，可以把網站切成幾個大的分區 (section)：

1. 超大橫幅封面 (banner) + 導覽列 (Navbar)
2. 服務內容與特色 (intro)
3. 照片展示畫廊 (gallery)
1. 使用說明 (howTo)
1. 服務地點 (locations)
1. 顧客評價 (reviews)
1. 購買方案 (purchase)
1. 聯絡方式 (contact)
1. 頁尾 (footer)

網頁架構非常完整，在一個頁面內將服務內容、展示、方案、聯絡資訊等，全部完整且不失簡潔的呈現出來，是相當舒服的版面設計。同時，也是相當有挑戰性的設計 XDD


過去我會將導覽列獨立出來，因為網站往往會讓導覽列始終懸浮在視窗最上方。但這個功能需要使用 javascript 的協助，這裡我們不使用 javascript，因此我把它放在第一個分區內。


接下來，我就針對每個分區，說明我觀察到的網頁元素、所使用的技巧、以及注意事項。

---

# 超大橫幅封面 + 導覽列

![](./images/omnifood-mockup-1.png)

導覽列的部分相對簡單，logo 和導覽元素分別是 img 和 unordered list，將其用 float 推到左右兩側，並對 margin、padding 等等微調即可。主標題和按鈕也是類似的方式。

橫幅背景的部分比較特別，在頁面滾動時，背景圖會留在原地，製造一種背景在遠處的立體感。使用的方法是透過一張被遮罩的背景照片，並設定 background-attachment 為 fixed。

```css
background-image: 
    linear-gradient( rgba( 0, 0, 0, 0.7), rgba( 0, 0, 0, 0.7)),       
    url( <照片>.jpg );
background-size: cover;
background-position: center;
background-attachment: fixed;
```

加入 linear-gradient 的目的是讓照片多一層灰色遮罩，以凸顯頁面的主要文字。另外，background-image 無法將單一顏色視為照片，因此透過相同顏色的 linear-gradient 當作遮罩。

編寫起來很簡單，卻為網頁美感大大加分。這也是我這次切版才學到的有趣設計！

---
 
# 服務內容與特色

![](./images/omnifood-mockup-2.png)


服務內容的頁面，可以簡單的分割成直的四行(綠)，與橫的四列(藍)。這樣根據內容而相對應修改長寬，並統一對齊的排版方式，非 CSS3 [flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) 莫屬啦！


flexbox 可以根據盒子內的元素數量，作相對應的寬度調整，還能對齊元素的頭尾等常見對齊方式，是一個相當實用的技巧。想要輕鬆切版一定要學會他！


圖中的小圖示 (icons) 是在 [fontawesome](https://fontawesome.com/) 中引入的，這是一個很常見的圖示資源庫，利用 icon 的 before 偽元素進行 javascript 的繪畫，要引用只要加入幾行程式碼，非常方便。如果網頁中大量使用，可以使用看看。但如果只有使用到極少量的話，建議還是直接以圖片檔會更快喔。

 ---

# 照片展示畫廊

![](./images/omnifood-mockup-3.png)

畫廊的內容是讓我抓頭拍桌想最久的一個部分，別看它小小一個區塊，要真的想到解法還真的不容易 ...... 


整個區塊的大致概念是：八張緊貼的照片，被黑色半透明遮罩罩住，滑鼠移動過去之後，會讓移除遮罩並讓照片略為縮小，製造一個聚焦的效果。聚焦和遮罩效果相對簡單，但想要緊密排列照片而不倒置換行，就有點學問了。


一開始的想法是利用 flexbox 排版，只要排成 4x2 的格式就可以了。但 flexbox 在這裡不太好的地方是，緊密排列的照片，容易因為寬度稍微過大，就引發換行，造成內容過度跳動。


最後我的寫法是透過 unordered list 水平排版 ( float: left ) 之後，再把照片放在固定比例的 div 元素中。這樣的作法可以保證，放在 div 中的照片，不會因為長寬變動而換行、超出格線。


 ---

# 使用說明

![](./images/omnifood-mockup-4.png)

這裡一樣都是透過 flexbox 排版，並在手機照片和步驟說明兩欄，分別設定 40% 和 60% 寬度，讓手機不會過度置中。另外，手機照片可以直接透過 text-align 置右，相對於利用 margin 和 padding 更有效率，在不同畫面寬度上看也更合理。


這裡比較沒有處理好的地方，是右方的步驟說明。因為步驟的圖示並非引入的 icon，而是透過 CSS 直接畫出，再利用 float: right 進行左置。這樣的動作會導致圖示不再受限於父元素的範圍，容易受到頁面寬度影響而大跑版。


我也有找到幾個解決方案，要嘛透過 clearfix 的髒手段繞過去，或是透過大的 margin 避開。這兩種都是治標不治本的方式，而我使用的是後者。 (也許可以透過把圖示和文字，分開看作兩欄，直接避開這個問題？)


 ---

# 服務地點

![](./images/omnifood-mockup-5.png)

服務地點和服務內容頁面排版幾乎一樣，只要對一些細部資料的 margin、padding 等格式稍作修正即可。

 ---

# 顧客評價

![](./images/omnifood-mockup-6.png)

排版也和上一區塊相同，但多了一些小東西。原本看到上方雙引號時，第一個想法就是直接一行 h2 元素，但理論上，它與下面的文字，其實是同一組的內容。


分開成兩個元素來寫，相對較無意義：h2 元素不加 class 處理，容易被全域屬性干擾，為了一個雙引號加一個 class 又顯得多餘。因此，我選擇使用 CSS 的偽元素 ( ::before ) 來處理。


最下方的人物頭像和文字，只是尋常的段落元素和照片，而很多人 (包括我) 常常搞不清楚的照片垂直置中，在這裡是透過 vertical-align: middle 完成的。照片和文字並排時，這個屬性在照片上才會起作用。

 ---

# 購買方案

![](./images/omnifood-mockup-7.png)

排版同上。如同這裡的「資訊卡」類的模板很多，其實可以直接拿來用，但為了練習切版，我仍舊是全部手刻。另外，按鈕的部分也和前面設計相同，因此可以整理成一個元件。

---

# 聯絡方式

![](./images/omnifood-mockup-8.png)

聯絡方式也是麻煩較多的一個區塊，透過全 flexbox 的排版方式很難做到固定比例，因此每一行的 label+input 依舊是 flexbox，但內容則是數個 unordered list，每個 list 中放入兩個 inline-block div，分別固定住 label 和 input 的寬度。


最麻煩的是，下拉清單、勾選方格、一般的 input ，三者格式不同，需要分別修正到一樣的長寬，否則看起來真的會超級亂 ......


 ---

# 頁尾

![](./images/omnifood-mockup-9.png)

頁尾內容不多，只有兩個寬度  inline-block div，分別置左和置右，調整 margin 即可。最後一行置中段落也很簡單。


 ---

# [成果展示](https://shanpig.github.io/mockup/)

最後，讓我們看看我的作品！ 除了較為複雜的動畫和功能以外，大致的網頁外觀、視覺效果、排版，都和原版的相差無幾，只是少了 RWD 的部分，還是有點可惜就是了 (笑)

[這是 Omnifood 的官網](http://www.omnifoodinc.com/)


 ---

# 心得整理

雖然以前也切過一些版，但倒沒有明確給自己時間限制，因此做起來也悠哉悠哉，一旦有壓力在，不把許多小觀念弄清楚，果然還是會大大影響效率。這次學到的知識可以羅列出幾點：

1. background-attachment:fixed可讓背景不隨滾輪捲動，做出靜態背景的效果
1. 各種 flexbox 的靈活運用
1. SCSS 的第一次實作
1. float 真的很討厭 (X
1. gallery 特別實作方法，透過scale和background/opacity做出滑鼠移動上去發亮與放大的聚焦效果
1. 對的工具用在錯的地方，就是錯的工具

可以加強的地方：
1. 數字 icon 的設計不夠通用，字體大小會影響圖形
1. class id 命名的系統化，讓樣式與功能分開
1. 使用說明的文字排版不夠穩定，容易受到頁寬影響
1. CSS可以再簡潔一些，能夠共用的內容不只是存在單一 section。
1. 可以考慮使用 section、article 等功能性元素，增加使用閱讀輔助器的人的便利性


--- 

# 小結

前端的世界就像大海，只有親自下水才知道水有多深。如果有任何問題或指教，歡迎來信跟我說 ~ 也可以和我一起討論喔！


# 參考資料

1. [Omnifood](http://www.omnifoodinc.com/)
1. [background-attachment | MDN](https://developer.mozilla.org/zh-TW/docs/Web/CSS/background-attachment)
1. [A complete guide to flexbox | CSS tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)
1. [SCSS in 20 minutes | Dev Ed - youtube](https://www.youtube.com/watch?v=Zz6eOVaaelI)
