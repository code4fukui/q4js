# 4択クイズフレームワーク - q4js

- [DEMO](https://code4fukui.github.io/q4js/)

## Usage

```html
<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
<script type="module">
import { startQuiz } from "https://code4fukui.github.io/q4js/q4.js";

const point = await startQuiz({
  quiz: [
    [ "IchigoJamでLEDをつけるには？", "LED1", "LED0", "PRINT1", "CLS", "LED" ],
    [ "IchigoJamの誕生日は？", "4/1", "1/5", "10/15", "10/10", "1/1", "12/31" ],
  ],
});
console.log("正答数: " + point);
</script>
```

## options

- title タイトル
- quiz 「問題文、正答、誤答1、誤答2、誤答3、誤答4」の配列
- parent クイズ画面の親エレメント

## history

- 2019-01-02 [スマホ・タブレット・PC対応、シンプルな4択クイズフレームワーク「q4js」と「クイズ Ichigo Q」](https://fukuno.jig.jp/2355)
- 2025-01-12 [さくらのクラウド検定オンライン教材のIT用語集を使ったIT4択クイズ powered by q4js](https://fukuno.jig.jp/4554)
