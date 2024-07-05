// main.js
console.log("main.js実行開始");
// モジュール読み込み
import { modelCheckLoad, GameHost } from "./model.js";
modelCheckLoad();

import { utilsCheckLoad, checkAnswer } from "./utils.js";
utilsCheckLoad();

// 要素取得
var quiz = document.getElementById("quiz");
var button3 = document.getElementById("button3");
var button4 = document.getElementById("button4");
var button5 = document.getElementById("button5");
var button6 = document.getElementById("button6");
var button7 = document.getElementById("button7");
var start_btn = document.getElementById("start-btn");
var ans = document.getElementById("ans");
var ans_btn = document.getElementById("ans_btn");

// Gamehostインスタンス化
let Gamehost = new GameHost(3, quiz);

// 人数設定
button3.addEventListener("click", () => {
    Gamehost.setpeopleNum(3);
});
button4.addEventListener("click", () => {
    Gamehost.setpeopleNum(4);
});
button5.addEventListener("click", () => {
    Gamehost.setpeopleNum(5);
});
button6.addEventListener("click", () => {
    Gamehost.setpeopleNum(6);
});
button7.addEventListener("click", () => {
    Gamehost.setpeopleNum(7);
});
// ゲームスタートボタン
start_btn.addEventListener("click", () => {
    Gamehost.startGame();
});
// 回答ボタン
ans_btn.addEventListener("click", () => {
    checkAnswer(Gamehost, ans);
});



var theme_slider = document.getElementById("slider");
// function to set a given theme/color-scheme
function setTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
    if (localStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-light');
    } else {
        setTheme('theme-dark');
    }
}

// Immediately invoked function to set the theme on initial load
(function () {
    if (localStorage.getItem('theme') === 'theme-light') {
        setTheme('theme-light');
        document.getElementById('slider').checked = false;
    } else {
        setTheme('theme-dark');
        document.getElementById('slider').checked = true;
    }
})();

theme_slider.addEventListener("change", () => {
    toggleTheme();
});
