// model.js
import { utilsCheckLoad, shuffleArray, choiceFromArray ,checkSolvable } from "./utils.js";
utilsCheckLoad();


const PEOPLE = [
    "アサカワ",
    "イトウ",
    "ウエノ",
    "エンドウ",
    "オキモト",
    "カタヤマ",
    "キシダ",
]
const positiveWords = [
    "だ。",
    "だろう。",
    "だと思う。",
    "なのではないか。",
    "に決まっている。"
]
const negativeWords = [
    "ではない。",
    "ではないだろう。",
    "だと思えない。",
    "ではないのではないか。",
]

export function modelCheckLoad() {
    console.log('model.js loaded');
};

export class GameHost {
    constructor(peopleNum, quiz) {
        this.onGame = false;
        this.peopleNum = peopleNum;
        this.quiz = quiz;
        this.people = null;
        this.liar = null;
        this.says = {};
    }
    setpeopleNum(peopleNum) {
        if (this.onGame) return;
        this.peopleNum = peopleNum;
        console.log(`peopleNumを ${peopleNum} に変更`);
    }
    startGame() {
        if (this.onGame) return;
        this.onGame = true;
        this.people = shuffleArray(PEOPLE).slice(0, this.peopleNum);
        this.liar = this.people[0];
        let condition = false;
        while (condition === false){
            let keys = this.makeKeys();
            let says = this.makeSays();
            this.says = Object.assign(keys, says);
            condition = (checkSolvable(this.says, this.people) === this.liar);
        }
        console.log(this.liar);
        console.log(this.says);
        this.showQuiz();
    }
    makeKeys() {
        let keys = new Object();
        keys[this.people[0]] = [[this.people[2]], false];
        keys[this.people[1]] = [[this.people[0]], false];
        keys[this.people[2]] = [[this.people[0], this.people[1]], false];
        return keys
    }
    makeSays() {
        let says = new Object();
        this.people.slice(3).forEach((human) => {
            let mention_count = Math.floor(Math.random() * 3);
            switch (mention_count) {
                case 0:
                    // 自分に言及
                    says[human] = [[human], true];
                    break
                case 1:
                case 2:
                    // mention_count 人に言及
                    var mentions = choiceFromArray(this.people, mention_count);
                    if (human in mentions) {
                        says[human] = [mentions.filter(n => n !== human), (this.liar in mentions.filter(n => n !== human))];
                    } else {
                        says[human] = [mentions, !(this.liar in mentions)];
                    }
                    break;
                default:
                    console.log("Error");  // たぶんない
                    break;
            }
        });
        return says
    }

    showQuiz() {
        let sortedPeople = this.people.concat().sort();
        let quizText = `<br>${sortedPeople.join("、")}の${this.peopleNum}名がいて、<br>正直者が${this.peopleNum - 1}人、残りの1人が嘘つきである。<br>`
        quizText += `ここで、正直者とは常に真実をいう人、嘘つきとは常に真実と反対のことをいう人である。<br>`
        quizText += `このとき、次のような${sortedPeople.join("、")}の証言が得られた。<br><br>`

        // 証言部分
        let people = shuffleArray(this.people.concat());
        for (let i = 0; i < this.peopleNum; i++) {
            let positive = (Math.floor(Math.random() * 2) === 0);
            let mentionSelf = (Math.floor(Math.random() * 2) === 0);
            quizText += people[i] + "　".repeat(4 - people[i].length) + `の証言: `
            let mention_array = this.says[people[i]][0];
            let count = mention_array.length;
            if (count === 2) {
                // 2人について言及
                quizText += `${mention_array[0]}${"　".repeat(4 - mention_array[0].length)} と ${mention_array[1]}${"　".repeat(4 - mention_array[1].length)} は`
                if (this.says[people[i]][1] && positive) {
                    quizText += "ふたりとも正直者" + positiveWords[Math.floor(Math.random() * positiveWords.length)]
                    if (mentionSelf) {
                        quizText += "もちろん、私も正直者だ。"
                    }
                } else if (this.says[people[i]][1] && !positive) {
                    quizText += "どちらも嘘つき" + negativeWords[Math.floor(Math.random() * negativeWords.length)]
                    if (mentionSelf) {
                        quizText += "もちろん、私も嘘つきではない。"
                    }
                } else {//if (!this.says[people[i]][1] && positive) {
                    quizText += "どちらか1人が嘘つき" + positiveWords[Math.floor(Math.random() * positiveWords.length)]
                    if (mentionSelf) {
                        quizText += "もちろん、私は嘘つきではない。"
                    }
                }
                // } else {
                //     quizText += "両方が正直者" + negativeWords[Math.floor(Math.random() * negativeWords.length)]
                //     if (mentionSelf) {
                //         quizText += "もちろん、私は正直者だ。"
                //     }
                // }
            } else {
                var mention = mention_array[0]
                if (people[i] === mention) {
                    quizText += "私　　　 は正直者だ！信じてくれ！"
                } else {
                    quizText += `${mention}${"　".repeat(4 - mention.length)} は`
                    if (this.says[people[i]][1] && positive) {
                        quizText += "正直者" + positiveWords[Math.floor(Math.random() * positiveWords.length)]
                        if (mentionSelf) {
                            quizText += "もちろん、私も正直者だ。"
                        }
                    } else if (this.says[people[i]][1] && !positive) {
                        quizText += "嘘つき" + negativeWords[Math.floor(Math.random() * negativeWords.length)]
                        if (mentionSelf) {
                            quizText += "もちろん、私も嘘つきではない。"
                        }
                    } else if (!this.says[people[i]][1] && positive) {
                        quizText += "嘘つき" + positiveWords[Math.floor(Math.random() * positiveWords.length)]
                        if (mentionSelf) {
                            quizText += "もちろん、私は嘘つきではない。"
                        }
                    } else {
                        quizText += "正直者" + negativeWords[Math.floor(Math.random() * negativeWords.length)]
                        if (mentionSelf) {
                            quizText += "もちろん、私は正直者だ。"
                        }
                    }
                }
            }
            quizText += "<br>"
        }
        quizText += "<br>これらの証言に基づいて、嘘つきを1人探し出し、その名前を答えよ。<br>"
        self.quiz.innerHTML = quizText
    }
}
