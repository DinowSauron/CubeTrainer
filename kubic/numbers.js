var numbers = []
var rep = 0;
var multiplyer = 0;

const timesForMultiply = 500000
var numant = [
  2,5,7,8,10,11,13,14,17,18,19,20,22,23,24//,1,4,12,16,21
]

var probability = {
  5: 0, 
  6: 0, 
  7: 0, 
  8: 0, 
  9: 0, 
  10: 0, 
  11: 0, 
  12: 0, 
  13: 0, 
  14: 0, 
  15: 0, 
  16: 0, 
  17: 0, 
  18: 0, 
  19: 0, 
  20: 0, 
}
/*.sort((a,b) => a-b)
console.log(numant)
quit()
/*
-5 real
14, 15, 17, 20,  5, 11,
10, 19,  8,  7, 24, 25,
 6,  3, 18
-x real
4, 13, 10, 15, 14, 23,
16, 11, 22, 21,  7,  3,
1, 24, 17
-x real
  1,  2,  3,  4,  7, 10,
11, 12, 15, 16, 17, 19,
22, 23, 24
*/

console.log("Running...")
while (true){
  var acertos = 0

  while (numbers.length < 15) {
    const r = Math.ceil(Math.random() * 25);
  
    if(!numbers.includes(r)) {
      numbers = [...numbers, r];

      if(numant.includes(r)) {
        acertos++;
      }
    }
  
  }

  //break;
  /*
  console.log(rep)/*
  console.log(acertos)
  console.log("-----")*/
  rep++;

  var a = JSON.stringify(numbers.sort((a,b) => a - b))
  var b = JSON.stringify(numant.sort((a,b) => a - b))
  /*if(a == b) {
    console.log("=====================")
    console.log("Mesmo igual => ",numbers)
    console.log("igual a => ",numant)
    console.log("normal: ",rep)
    console.log("x10k: ",multiplyer)

    break;
  }*/


  
  if(rep >= timesForMultiply) {
    rep = 0;
    multiplyer++;
    // console.log("Running...")
    console.log("x100k:",multiplyer * timesForMultiply);
    var probPercent = probability;
    const count = (rep + (multiplyer * timesForMultiply))
    for(var x = 0; x < numant.length - 4; x++) {

      // probPercent[x+5] = (probPercent[x+5] / 100) * count
      
      console.log(addZero(x+5)," :> ",  addZero(((probPercent[x+5] * 100) / count).toFixed(1)) + "%", "      IN:",probPercent[x+5]);
      // console.log(probPercent);
    }
  }
  function addZero(x){
    return (x < 10?(' '+(x)):(''+(x)));
  }

  probability[acertos]++;
  /*
  if (acertos >= 14) {
    break;
  }*/
  numbers = [];
  acertos = 0;

  
}

console.log(numbers)
console.log("times: ",rep + (multiplyer * timesForMultiply))
/* 

[
  14, 15, 17, 20,  5, 11,
  10, 19,  8,  7, 24, 25,
   6,  3, 18
]

*/