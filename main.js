var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlyr');
var winX = document.getElementById('xWin');
var winO = document.getElementById('oWin');
var reset = document.getElementById('reset');

var winer;
var player = 'x';
var xCount = 0;
var oCount = 0;
var winIndex = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
]

for(var i = 1; i <= 9; i++) {
    area.innerHTML += "<div class='cell' pos=" + i + "></div>";
}

for (var i = 0; i < cell.length; i++) {
    cell[i].addEventListener('click',cellClick, false);
}

currentPlayer.innerHTML = player.toUpperCase();


function cellClick() {

    var data = [];

    if(!this.innerHTML){
        this.innerHTML = player
    }else{
        alert("Ячейка занята, выберите другую");
        return
    }

    for(var i in cell){
        if(cell[i].innerHTML == player){
            data.push(parseInt(cell[i].getAttribute('pos')));
        }
    }

    if(checkWin(data)) {
        console.log(player);
        restart('Выиграл: ' + player);
    }else{
        var draw = true;
        for(var i in cell){
            if(cell[i].innerHTML == '') draw = false;
        }
        if (draw){
            restart('Ничья');
        }
    }
    
    player = player == "x" ? "o" : "x";
    currentPlayer.innerHTML = player.toUpperCase();
}

function checkWin(data) {
     for(var i  in winIndex) {
         var win = true;
         for(var j in winIndex[i]){
             var id = winIndex[i][j];
             var ind = data.indexOf(id);

             if(ind == -1) {
                 win = false
             }
         }

         if(win) return true;
     }
     return false;
}

function restart(text) {
    if(text == 'Ничья'){
        player = "x";
    }
    player = player == "x" ? "o" : "x";
    if(text != 'Ничья'){
        if (player == "x"){
            xCount++
        }else{
            oCount++
        }
    }
    for(var i = 0; i < cell.length; i++){
        cell[i].innerHTML = '';
    }
    winX.innerHTML = oCount.toString();
    winO.innerHTML = xCount.toString();
    alert(text);
}

reset.addEventListener('click',resetClick, false);

function resetClick(){
    alert('Вы уверены, что хотите сбросить данные?')
    player = "x"
    xCount = 0;
    oCount = 0;
    winX.innerHTML = oCount.toString();
    winO.innerHTML = xCount.toString();
    for(var i = 0; i < cell.length; i++){
        cell[i].innerHTML = '';
    }
}