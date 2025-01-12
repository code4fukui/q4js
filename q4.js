import { shuffle } from "https://js.sabae.cc/shuffle.js";

const get = (id) => document.getElementById(id);

const html = `
<!DOCTYPE html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><link rel="icon" href="data:">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<title>q4.js</title>
<link rel="apple-touch-icon" href="https://code4fukui.github.io/q4js/q4js-icon.png">
<meta property="og:image" content="https://code4fukui.github.io/q4js/q4js-ss.png">
<link rel="stylesheet" type="text/css" href="https://code4fukui.github.io/q4js/q4js.css">

<div id=head class=theme>第1問</div>
<div id=main>
	<!--<div id=ind class=indcorrect></div>-->
	<div id=ind class=indcorrect>正解</div>
	<!--<div id=ind class=indincorrect>不正解</div>-->
	<div id=q>魁のよみは？</div>
	<div id=ans>
		<div id=ans1>さきかけ</div>
		<div class=correct id=ans2>さきがけ</div>
		<div id=ans3>ささき</div>
		<div class=disable id=ans4>がけがけ</div>
	</div>
</div>

<div id=credit class=theme>
	App: 4択クイズアプリ framework <a href=https://github.com/code4fukui/q4js>q4.js</a>
</div>
`;

export const startQuiz = async ({ title, quiz, parent = document.body }) => {
	return new Promise(resolve => {
		let nq = 0;
		let pnt = 0;
		let uienable = true;

		parent.innerHTML = html;
		document.title = title;

		const show = function(aquiz) {
			head.textContent = title + " - 第" + (nq + 1) + "問";
			ind.textContent = "";
			const anss = [];
			for (let i = 0; i < aquiz.length - 2; i++) {
				anss[i] = aquiz[i + 2];
			}
			shuffle(anss);
			const anss2 = [];
			for (let i = 0; i < 3; i++) {
				anss2[i] = anss[i];
			}
			anss2[3] = aquiz[1];
			shuffle(anss2);
			let first = true;
			for (let i = 0; i < 4; i++) {
				const div = get("ans" + (i + 1));
				div.className = "";
				div.textContent = anss2[i];
				div.no = i;
				div.onclick = function() {
					if (!uienable) {
						return;
					}
					if (this.textContent == aquiz[1]) {
						ind.textContent = "正解";
						ind.className = "indcorrect";
						this.className = "correct";
						if (first) {
							pnt++;
						}
						uienable = false;
						setTimeout(function() {
							nq++;
							if (nq < quiz.length) {
								show(quiz[nq]);
							} else {
								ind.textContent = "クリア";
								ind.className = "indclear";
								setTimeout(function() {
									resolve(pnt);
								}, 1000);
							}
						}, 1000);
					} else {
						ind.textContent = "不正解";
						ind.className = "indincorrect";
						this.className = "disable";

						uienable = false;
						setTimeout(function() {
							uienable = true;
							ind.textContent = "";
						}, 1000);
					}
					first = false;
				}
			}
			q.textContent = aquiz[0];
			uienable = true;
		}

		show(quiz[nq]);
	});
};
