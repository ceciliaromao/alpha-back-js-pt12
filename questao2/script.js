document.getElementById('btn').addEventListener('click', listPrimes);

function listPrimes() {
  const resultPrimes = document.querySelector("#prime-result");
  const resultList = document.querySelector("#list-result");
  const num = parseFloat(document.querySelector("#num").value.replace(',', '.'));

  try {
    verifyNumber(num);
  } catch (errorMsg) {
    resultPrimes.innerHTML = `${errorMsg}`;
    return;
  }

  const prime = searchPrimes(num);
  resultPrimes.innerHTML = `Número de primos entre 0 e ${num} é ${prime.totalPrimes}`;
  resultList.innerHTML = `Lista de Números Primos: ${prime.list}`;
}

function searchPrimes(n) {
  let list = '';
  let totalPrimes = 0;
  let dividers = 0;
  for (let i = 2; i <= n; i++) {
    dividers = 0;
    for (let j = 2; j <= Math.ceil(i / 2); j++) {
      if (i % j === 0) {
        dividers = 1;
        break;
      }
    }
    if (dividers === 0) {
      totalPrimes += 1;
      if (totalPrimes === 1) {
        list = i;
      } else {
        list += ', ' + i;
      }
    }
  }
  return { totalPrimes, list };
}


function verifyNumber(n) {
  if (isNaN(n)) {
    throw new Error(`Não é número! (${n})`);
  }
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error(`Entre com um inteiro positivo! (${n})`);
  }
}