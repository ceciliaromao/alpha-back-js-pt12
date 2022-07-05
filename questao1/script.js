document.getElementById('btn').addEventListener('click', calculate);

function calculate() {
  const resultFat = document.querySelector("#fat-result");
  const resultE = document.querySelector("#e-result");
  const num = parseFloat(document.querySelector("#num").value.replace(',', '.'));

  try {
    verifyNumber(num);
  } catch (errorMsg) {
    resultFat.innerHTML = `${errorMsg}`;
    return;
  }

  const fatorial = calcFatorial(num);
  resultFat.innerHTML = `Fatorial de ${num} é ${fatorial}`;

  let euler = BigInt(1);
  for (let i = 1; i <= num; i++) {
    euler += 10n ** 100n / calcFatorial(i);
  }
  resultE.innerHTML = `Número de Euler com ${num} termos: 2.${euler}`;
}

function calcFatorial(n) {
  if (n === 0) return BigInt(1);
  else return calcFatorial(n-1)*BigInt(n);
}

function verifyNumber(n) {
  if (isNaN(n)) {
    throw new Error(`Não é número! (${n})`);
  }
  if (n < 0 || !Number.isInteger(n)) {
    throw new Error(`Entre com um inteiro positivo! (${n})`);
  }
}