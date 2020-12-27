var area = document.getElementById('area');
var cell = document.getElementsByClassName('cell');
var currentPlayer = document.getElementById('curPlyr');

var player = 'x';
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
        restart('Выиграл: ' + player);
    }else{
        var draw = true;
        for(var i in cell){
            if(cell[i].innerHTML == '') draw = false;
        }
        if (draw){
            player = "x";
            restart('Ничья');
        }
    }
    
    if (player == "x"){
        currentPlayer.innerHTML = player.toUpperCase();
        player = "o"
        document.getElementsByClassName("cell").classList.add('green');
        document.getElementsByClassName("cell").classList.remove('red');
    }else{
        currentPlayer.innerHTML = player.toUpperCase();
        player = "x"
        document.getElementsByClassName("cell").classList.add('red');
        document.getElementsByClassName("cell").classList.remove('green')
    }
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
    alert(text);
    for(var i = 0; i < cell.length; i++){
        cell[i].innerHTML = '';
    }
}