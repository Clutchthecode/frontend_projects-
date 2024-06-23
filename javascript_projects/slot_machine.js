//1.deposit some money
//2.determine no .of lines to bet on
//3.collect a bet amount
//4.spin the slot machine
//5.check if the user won or lose
//6.if won give their winning else 
//7.play again

const prompt =require("prompt-sync")();

const ROWS=3;
const COL=3;

const SYMBOLS_COUNT={
    "A":2,
    "B":4,
    "C":6,
    "D":8
};
const SYMBOLS_VALUES={
    "A":5,
    "B":4,
    "C":3,
    "D":2
};




const deposit=()=>{
    while(true){
   const depositAmount=prompt("enter the deposit amount: ");

   const numberDepositAmount= parseFloat(depositAmount);
   if(isNaN(numberDepositAmount)||numberDepositAmount<=0){
    console.log("INvalid depsoit,please try again!");
   }
   else{
    return numberDepositAmount;
   }

}
   
};

const getNumberOfLines=()=>{
    while(true){
        const lines= prompt("enter the number of lines to bet on (1-3): ");
        const numberOfLines=parseFloat(lines);

        if(isNaN(numberOfLines)||numberOfLines<=0||numberOfLines>3){
            console.log("Invalis no.of lines,try again!");
        }
        else{
            return numberOfLines;
        }
    }
};

const getBet=(balance,lines)=>{
    while(true){
        const bet= prompt("enter the bet per line: ");
        const numberbet=parseFloat(bet);

        if(isNaN(numberbet)||numberbet > balance/lines||numberbet<=0){
            console.log("Invalid bet,try again!");
        }
        else{
            return numberbet;
        }
    }
    
};

const spin=()=>{
    const symbols=[];
    for(const [symbol,count] of Object.entries(SYMBOLS_COUNT)){
        for(let i=0;i<count;i++){
            symbols.push(symbol);
        }
    }

     const reels=[];
     for(let i=0;i<COL;i++){
        reels.push([]);
        const reelSymbol=[...symbols]
        for(let j=0;j<ROWS;j++){
            const RandomIndex=Math.floor(Math.random()*reelSymbol.length);
            const selectedSymbol=reelSymbol[RandomIndex];
            reels[i].push(selectedSymbol);
            reelSymbol.splice(RandomIndex,1);
        }
     }
     return reels;
};

const transpose=(reels)=>{
    const rows=[];
    for(let i=0;i<ROWS;i++){
        rows.push([]);
        for(let j=0;j<COL;j++){
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};
const printRows=(rows)=>{
    for(const row of rows){
        let rowString=" ";
        for(const[i,symbol] of row.entries()){
            rowString+=symbol
            if(i!=row.length-1){
                rowString+=" | "
            }
        }
    
    console.log(rowString);
}
};

const getWinnings=(rows,bet,lines)=>{
    let winning=0;
    for(let row=0;row<lines;row++){
        const symbols=rows[row];
        let allsame=true;

        for(const symbol of symbols){
            if(symbol!=symbols[0]){
                allsame=false;
                break;
            }
        }
        if(allsame){
            winning+=bet* SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winning;
};

const game=()=>{
    let balance= deposit();

    while(true){
        console.log("balance is $"+balance);
    const numberOfLines=getNumberOfLines();
    const bet=getBet(balance,numberOfLines);
    balance-=bet*numberOfLines;
    const reels=spin();
    console.log(reels);
    const row=transpose(reels);
    console.log(row);
    printRows(row);
    const winning=getWinnings(row,bet,numberOfLines);
    balance+=winning;
    console.log("you won ,$"+winning.toString());

    if(balance<=0){
        console.log("ypu ran out of money");
        break;
    }
    
    const playAgain=prompt("do u want to play again(y/n): ");
    if(playAgain!='y') break;
    }
}
game();