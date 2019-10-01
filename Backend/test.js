// Aim: We have two process fun() & play() we want to call play() function only when
//      fun() function has completed its execution

function fun() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1);
      resolve(1);
    }, 3000);
  });
}

function play() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2);
    }, 2000);
  });
}
function main() {
  fun().then(()=>play());
  //    play.then(res=>console.log(res));
}

main();

/* if (n == 0)
    process.exit(1);

date = moment().subtract(4, 'd').subtract(1, 'y').add(x, 'w').add(y, 'd').format();
writeToFile();
setTimeout(() => {
    makeCommit();
    console.log(date);
}, 1000); */
