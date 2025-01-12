import { shuffle } from "https://js.sabae.cc/shuffle.js";

const get = (id) => document.getElementById(id);

export const startQuiz = ({ title, quiz, onclear }) => {
	let nq = 0;
	let pnt = 0;
	let uienable = true;

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
							if (onclear) {
								setTimeout(function() {
									onclear(pnt);
								}, 3000);
							}
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
};
