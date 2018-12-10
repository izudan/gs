(() => {
    'use strict';

    //---------------------------------------
    // 準備
    //---------------------------------------

    const timers = [];
    const results = [];
    let stopCount = 0;
    let isPlaying = false;
    let bingoNum = 0;
    let delArrayNum = 0;


    // プロパティ
    // 英語と１０と１のくらいを表示する
    // １〜７５の数字を表示して、選ばれたら黄色くなる
    // スタートボタンとストップボタンがある


    class BingoView {

        constructor() {
            // this.wrapper = docment.getElementById('')
            this.bindDomElement()
            this.render()
            this.handlEvents()
        }


        //---------------------------------------
        // バインド（紐付け）view
        //---------------------------------------

        bindDomElement() {
            let panel0 = document.getElementById('panel0')
            let panel1 = document.getElementById('panel1')
            let panel10 = document.getElementById('panel10')
            let btn0 = document.getElementById('btn0')
            let spinButton = document.getElementById('spinButton')
        }

        //---------------------------------------
        // ビンゴ結果のレンダリング view
        //---------------------------------------

        render() {

            let fragment = document.createDocumentFragment();
            let divWrapper;
            Bingo.forEach(function (elem, index) {
                if (index % 15 === 0) {
                    divWrapper = fragment.appendChild(document.createElement("div"));
                }
                let numDiv = divWrapper.appendChild(document.createElement("div"));
                numDiv.className = "bingo";
                numDiv.innerHTML = elem;
            });
            let result = document.getElementById('result');
            result.appendChild(fragment);
        };


    }

    class BingoModel {
        constructor(props) {
            this.make_Num()


        }


        //---------------------------------------
        // ビンゴの数字を生成  model
        //---------------------------------------

        make_Num() {

            let tmp
            let Bingo = (function (from, to) {
                for (tmp = []; from <= to; from++) {
                    tmp.push(('0' + from).slice(-2));
                }
                return tmp;
            })(1, 75);

        }


        //---------------------------------------
        // STARTボタンを押した後の処理① 
        //---------------------------------------

        handleEvents() {

            this.spinButton.addEventListener('click', () => {

                if (isPlaying) return;

                isPlaying = true;
                this.className = 'inactive';
                this.innerHTML = '';
                btn0.innerHTML = 'STOP';
                btn0.className = 'btn';
                panel1.className = 'panel';
                panel10.className = 'panel';
                runSlot(0, panel1);
                runSlot(1, panel10);

            })

        }

        //---------------------------------------
        // STARTボタンを押した後の処理② model
        //---------------------------------------

        runSlot(n, panel) {

            let Bingo_panel = ['B', 'I', 'N', 'G', 'O'];

            // ビンゴのランダムに出す数字
            let num = Bingo[Math.floor(Math.random() * Bingo.length)];
            // 選ばれたnumをビンゴナンバーに入れる
            bingoNum = num;

            if (num <= 15) {
                i = 0
            } else if (num <= 30) {
                i = 1
            } else if (num <= 45) {
                i = 2
            } else if (num <= 60) {
                i = 3
            } else {
                i = 4
            }
            panel0.innerHTML = Bingo_panel[i];

            // 選ばれたナンバーを表示用に１桁目、２桁目で分ける
            let num1 = num.substr(0, 1);
            let num10 = num.substr(1, 2); //わからない

            // 分けた位をそれぞれのHTMLに描写
            panel1.innerHTML = num1;
            panel10.innerHTML = num10;

            // runSlot()を0.025秒後に行う
            timers[n] = setTimeout(function () {
                runSlot(n, panel)
            }, 25);


            // bingo_view.insertAdjacentHTML('afterbegin', '<p>' + bingo_arr[n] + '</p>');
            // ストップボタンのクリックイベントを準備
            // make_stopBtn()

        }


        //---------------------------------------
        // STOPボタンを押した後の処理① 
        //---------------------------------------

        make_stopBtn() {

            btn0.addEventListener('click', () => {
                stopSlot(0, panel1, panel10, this)

            })

        }
        //---------------------------------------
        // ストップボタンを押した時の処理
        //---------------------------------------

        stopSlot(n, panel1, panel10, btn) {
            // もしプレイ中じゃなかったら、もしくリザルトがなかったら戻る
            if (!isPlaying || results[n] !== undefined) return;

            // STOPボタンのHTMLを空にする
            btn0.innerHTML = '';

            //  STOPボタンのClassを空にする
            btn0.className = '';

            // タイマーを止めてパネルの動きを止める()
            clearTimeout(timers[n]);
            clearTimeout(timers[n + 1]);

            // bingo配列の中に、選ばれたナンバーがあったら、１を返す
            delArrayNum = Bingo.indexOf(bingoNum);

            // もし、delArrayNumが0以上なら
            if (delArrayNum >= 0) {
                // Bingo配列の中から対象を１つ削除
                Bingo.splice(delArrayNum, 1);
            }

            // ストップカウントが0~1になる。
            stopCount++;

            // もしストップカウントが１なら
            if (stopCount === 1) {

                // ストップカウントを０にして
                stopCount = 0;


                let bingoDiv = document.querySelectorAll(".bingo");


                // カラーチェンジ
                bingoDiv[bingoNum - 1].innerHTML;
                bingoDiv[bingoNum - 1].className = 'bingo unmatched';

                // into
                isPlaying = false;
                // HTMLにSTARTボタンを追加
                spinButton.innerHTML = 'START';
                // STARTボタンのClassにbtnを追加
                spinButton.className = 'btn';

                // タイマーを空にする
                timers = [];
            }
        }

    }

    class BingoController {
        constructor(props) {
            // ここでクイズのモデルをインスタンス化して、bm
            this.bm = new BingoModel()
            this.bindmthod()
            this.init()
        }

    }


    const qc = new BingoController()

})()

// ---------------------------------------------
// ビンゴゲーム
// ---------------------------------------------



// メソッド
// １〜７５までの数字を作れる
// ランダムにその数字を呼び出す
// 数字によって、英語が変わる
// 呼び出された数字を渡す
// １度呼び出された数字を保管と削除