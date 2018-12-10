<?php










class Bingoview {

    // 使っている変数分プロパティを用意する
    public $temp;
      

    // インスタンス化した時に実行
    public function __construct(){
        $this->render();
      }
    
  
    public function render(){

        $temp = '<!-- 写真を表示させるところ -->
        <div class="container">
            <div class="row" style="height:250px; background-color: black;">
                <div class="col-12">
                    <img class="img-fluid" src="img/we04.jpg" alt="">
                </div>
            </div>
            <div class="row" style="height:250px; background-color: black;">
                <!-- 英語の表示BINGO -->
                <div class="col-6">
                    <h1>BINGO</h1>
                </div>
                <!-- 数字の表示（１〜７５） -->
                <div class="col-6">
                    <h1>1~75</h1>
                </div>
            
            </div>
        </div>';


    }




  }
  
  $dbset = new DbSet();
  $user_stmt    = $dbset->pdo->prepare("SELECT * FROM $table01 WHERE id = $current_id ");
  $user_status  = $user_stmt->execute();
  



?>