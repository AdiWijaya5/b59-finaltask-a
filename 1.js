// memeriksa apakah suatu angka adalah bilangan prima
function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

// menghasilkan deret angka prima
function generatePrimes(limit) {
  let primes = [];
  let num = 2;
  while (primes.length < limit) {
    if (isPrime(num)) {
      primes.push(num);
    }
    num++;
  }
  return primes;
}

// Hitung jumlah total angka prima yang dibutuhkan untuk pola segitiga
const drawSikuSiku = 7;
const totalNumbers = (drawSikuSiku * (drawSikuSiku + 1)) / 2;
const primes = generatePrimes(totalNumbers);
let primeIndex = 0;

// Mencetak segitiga & angka prima
for (let i = 1; i <= drawSikuSiku; i++) {
  let row = "";
  for (let j = 0; j < i; j++) {
    row += primes[primeIndex] + " ";
    primeIndex++;
  }
  console.log(row.trim());
}
