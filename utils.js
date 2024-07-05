// utils.js
export function utilsCheckLoad() {
    console.log('utils.js loaded');
};

export function shuffleArray(array) {
    const cloneArray = [...array];
    if (cloneArray.length === 0) return;
    const result = cloneArray.reduce((_, cur, idx) => {
        let rand = Math.floor(Math.random() * (idx + 1));
        cloneArray[idx] = cloneArray[rand]
        cloneArray[rand] = cur;
        return cloneArray
    })
    return result;
};
export function choiceFromArray(array, count) {
    var count = count || 1;
    var cloneArray = [...array];
    var result = [];
    for (var i = 0; i < count; i++) {
        var arrayIndex = Math.floor(Math.random() * cloneArray.length);
        result[i] = cloneArray[arrayIndex];
        cloneArray.splice(arrayIndex, 1);
    }
    return result;
}

function checkContradiction(liar, says){
    const cloneSays = JSON.parse(JSON.stringify(says));
    let condition = true;
    Object.keys(cloneSays).forEach(key => {
        if (cloneSays[key][1] === true && !cloneSays[key][0].includes(liar)) {
        } else if (cloneSays[key][1] === false && cloneSays[key][0].includes(liar)) {
        } else {
            condition = false;
        }
    })
    return condition;
}

export function checkSolvable(says, people) {
    let liars = []
    for (let human of people) {
        // humanを嘘つきと仮定
        let pred_says = JSON.parse(JSON.stringify(says));
        // 仮定から真実の証言を作成
        pred_says[human][1] = !(says[human][1]);
        // それが矛盾しないか確認
        if (checkContradiction(human, pred_says) === false) continue;
        // 矛盾がなかったら容疑者としてカウント
        liars.push(human);
    }
    if (liars.length !== 1) return false;
    return liars[0];
}


export function checkAnswer(Gamehost, ans) {
    if (!Gamehost.onGame) return;
    if (ans.value.length === 0) {
        Swal.fire({
            icon: 'error',
            title: 'どなた？',
            text: '回答を入力してから回答ボタンを押してね！',
        })
        return
    };
    if (!Gamehost.people.includes(ans.value)) {
        Swal.fire({
            icon: 'error',
            title: '誰？',
            text: '登場していない人物だよ！',
        })
        return
    };


    if (ans.value === Gamehost.liar) {
        Swal.fire({ icon: 'success', title: '正解！', text: 'もう一度解いてみよう！', confirmButtonText: 'Retry' })
            .then(
                (result) => {
                    if (result.isConfirmed) {
                        document.location.assign("index.html");
                    }
                }
            )
    } else {
        Swal.fire({
            icon: 'error',
            title: '不正解！',
            text: 'もう一度考えてみよう！',
        })
        return
    };
}