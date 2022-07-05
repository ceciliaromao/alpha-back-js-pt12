document.getElementById('btn1').addEventListener('click', () => { calculate('nilakantha') });
document.getElementById('btn2').addEventListener('click', () => { calculate('taylor') });

function calculate(serie) {
  const resultPi = document.querySelector("#pi-result");
  const num = parseFloat(document.querySelector("#num").value.replace(',', '.'));

  try {
    verifyNumber(num);
  } catch (errorMsg) {
    resultFatorial.innerHTML = `${errorMsg}`;
    return;
  }

  const initial = Date.now();
  const dIni = new Date(initial);
  let pi = 0n;
  const pi100 = BigInt('31415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679');

  document.querySelector("#init-result").innerHTML = `Início: ${dIni.toLocaleDateString()} - ${dIni.toLocaleTimeString()}`;

  serie === 'nilakantha' ? pi = calcPi(num) : pi = calcPi2(num);
  resultPi.innerHTML = `Pi com ${num} termos é 3.${pi}`;

  const piCalc = BigInt('3' + pi);
  const precisao = 10n ** 100n - (pi100 - piCalc);
  const final = Date.now();
  const dFim = new Date(final);
  const processTime = final - initial;

  document.querySelector("#final-result").innerHTML = `Fim: ${dFim.toLocaleDateString()} - ${dFim.toLocaleTimeString()}`;

  document.querySelector("#time-result").innerHTML = `Tempo de processamento (segundos): ${processTime / 1000}`;
  
  document.querySelector("#diff-result").innerHTML = `Precisão: ${precisao}`;
}

function calcPi(num) {
  let pi = BigInt(0);
  let tmp = BigInt(0);
  if (num === 0) {
    return 3;
  } else {
    for (let i = 1; i <= num; i++) {
      tmp = 1n;
      for (let j = i + i; j <= i + i + 2; j++) {
        tmp = tmp * BigInt(j);
      }
      tmp = 4n * (10n ** 100n / tmp);
      if (i % 2 === 0) {
        pi -= tmp;
      } else {
        pi += tmp;
      }
    }
    return pi;
  }
}

function calcPi2(num) {
  let i = 1n;
  let x = 3n * (10n ** 120n);
  let pi = x;
  while (x > 0) {
    x = x * i / ((i + 1n) * 4n);
    pi += x / (i + 2n);
    i += 2n;
  }
  return pi / (10n ** 20n) - (3n * (10n ** 100n));
}

function verifyNumber(n) {
  if (isNaN(n)) {
    throw new Error(`Não é número! (${n})`);
  }
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error(`Entre com um inteiro positivo! (${n})`);
  }
}

