(function () {
    'use strict';

    //---------------------------------------
    // ビンゴの英語
    //---------------------------------------

    let Bingo_panel = ['B', 'I', 'N', 'G', 'O'];

    //---------------------------------------
    // ビンゴの数字を生成 (model)
    //---------------------------------------

    let tmp;

    let Bingo = (function (from, to) {
        for (tmp = []; from <= to; from++) {
            tmp.push(('0' + from).slice(-2));
        }
        return tmp;
    })(1, 75);

    //---------------------------------------
    // 準備
    //---------------------------------------

    let timers = [];
    let results = [];
    let stopCount = 0;
    let isPlaying = false;

    //---------------------------------------
    // 乱数によって選ばれた数字
    //---------------------------------------

    let bingoNum = 0;

    //---------------------------------------
    // bingoNumで選ばれた数字をBingo配列から削除する変数
    //---------------------------------------

    let delArrayNum = 0;

    //---------------------------------------
    // バインド（紐付け）
    //---------------------------------------

    // BINGOの部分
    let panel0 = document.getElementById('panel0');
    // 1の位
    let panel1 = document.getElementById('panel1');
    // 10の位
    let panel10 = document.getElementById('panel10');
    // STOPボタン
    let btn0 = document.getElementById('btn0');
    // STARTボタン
    let spinButton = document.getElementById('spinButton');

    //---------------------------------------
    // ビンゴ結果のレンダリング
    //---------------------------------------

    let render = function () {
        // １つにまとめてから表示
        let fragment = document.createDocumentFragment();

        let divWrapper;
        // ビンゴの１〜７５までを
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

    render();

    //---------------------------------------
    // SPINボタンを押した後の処理①
    //---------------------------------------

    spinButton.addEventListener('click', function () {

        // isPlaying tureだったら(プレイ中だったら)？
        if (isPlaying) return; //わからない

        // サウンド関係（ドラムを鳴らす）
        // soundManager.playDrum();

        isPlaying = true;

        // spinBtnにinactiveというClass名をつける
        this.className = 'inactive';
        this.innerHTML = '';
        btn0.innerHTML = 'STOP';

        // btn0にbtnというClass名をつける
        btn0.className = 'btn';

        // panel1と10にClass名panelをつける
        panel1.className = 'panel';
        panel10.className = 'panel';

        // runSlot(, panel0);
        runSlot(0, panel1);
        runSlot(1, panel10);



    });


    //---------------------------------------
    // SPINボタンを押した後の処理②
    //---------------------------------------



    function runSlot(n, panel) {

        // ビンゴのランダムに出す数字
        let num = Bingo[Math.floor(Math.random() * Bingo.length)];
        // 選ばれたnumをビンゴナンバーに入れる
        bingoNum = num;

        if (num <= 15) {
            panel0.innerHTML = 'B';
        } else if (num <= 30) {
            panel0.innerHTML = 'I';
        } else if (num <= 45) {
            panel0.innerHTML = 'N';
        } else if (num <= 60) {
            panel0.innerHTML = 'G';
        } else {
            panel0.innerHTML = 'O';
        }

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



    }

    // ストップボタンのクリックイベントを準備
    btn0.addEventListener('click', function () {
        stopSlot(0, panel1, panel10, this);

    });

    //---------------------------------------
    // ストップボタンを押した時の処理
    //---------------------------------------

    function stopSlot(n, panel1, panel10, btn) {
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

})();