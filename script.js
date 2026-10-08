
function maxSon(a, b) {
    return a > b ? a : b;
}

console.log(maxSon(10, 7)); // 10


function engKatta(a, b, c) {
    return Math.max(a, b, c);
}

console.log(engKatta(10, 25, 15)); 



function engKichik(a, b, c) {
    return Math.min(a, b, c);
}

console.log(engKichik(10, 5, 15)); 


function modul(son) {
    return Math.abs(son);
}

console.log(modul(-15)); 
console.log(modul(8));  



function yigindi(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

console.log(yigindi(5)); 



function juftYigindi(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        if (i % 2 === 0) {
            sum += i;
        }
    }

    return sum;
}

console.log(juftYigindi(10)); 


function faktorial(n) {
    let result = 1;

    for (let i = 1; i <= n; i++) {
        result *= i;
    }

    return result;
}

console.log(faktorial(5)); 


function jadval(son) {
    for (let i = 1; i <= 10; i++) {
        console.log(son + " × " + i + " = " + (son * i));
    }
}

jadval(5);


function raqamlarSoni(son) {
    return Math.abs(son).toString().length;
}

console.log(raqamlarSoni(12345)); 


function raqamlarYigindisi(son) {
    son = Math.abs(son);

    let sum = 0;

    while (son > 0) {
        sum += son % 10;
        son = Math.floor(son / 10);
    }

    return sum;
}

console.log(raqamlarYigindisi(12345)); 


function ismUzunligi(ism) {
    return ism.length;
}

console.log(ismUzunligi("Ali")); 

function kattaHarf(matn) {
    return matn.toUpperCase();
}

console.log(kattaHarf("salom dunyo"));



function kichikHarf(matn) {
    return matn.toLowerCase();
}

console.log(kichikHarf("SALOM DUNYO"));



function birinchiHarf(ism) {
    return ism[0].toUpperCase() + ism.slice(1);
}

console.log(birinchiHarf("ali")); 


function unlilarSoni(matn) {
    let unli = "aeiouo‘oʻuAEIOUO‘OʻU";
    let count = 0;

    for (let harf of matn) {
        if (unli.includes(harf)) {
            count++;
        }
    }

   
}

console.log(unlilarSoni("salom dunyo")); 
