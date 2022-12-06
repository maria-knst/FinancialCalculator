

const prettierValue = (val) => {
    const re = /,/gi;
    const re1 = /\s/gi;
    let res = val.replace(re, '.');
    res = res.replace(re1,'');
    return res;
}

const checkValue = (val) => {
    return !!val.match(/^\-?\d+(\.|,)?\d*$/) || !!val.match(/^\-?(\d{1}|\d{2}|\d{3})+(\s\d{3})+((\.|\,)\d+)*$/);

}

const makeNSignsAfterComma = (bigNumberObj, n) => {
    let numberOfDigits;
    if(bigNumberObj.e >= 0){
        numberOfDigits = bigNumberObj.c[0].toString().length + n;
    }else {
        numberOfDigits = n + bigNumberObj.e;
    }
    BigNumber.config({ ROUNDING_MODE: BigNumber.ROUND_HALF_UP });
    return bigNumberObj.precision(numberOfDigits);
}

const prerrierResult = (bigNumObj) => {
    let res;
    res = makeNSignsAfterComma(bigNumObj, 6);
    return res.toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ');
}

const checkValues = (arr) =>{
    return arr.filter((item)=> !checkValue(item));
}

const getPriority = (action1, action2) =>{
    const resArr = [null,null]
    switch (action1.value){
        case '+':
            resArr[0] = 0;
            break;
        case '-':
            resArr[0] = 0;
            break;
        case '*':
            resArr[0] = 1;
            break;
        case '/':
            resArr[0] = 1;
            break;
    }

    switch (action2.value){
        case '+':
            resArr[1] = 0;
            break;
        case '-':
            resArr[1] = 0;
            break;
        case '*':
            resArr[1] = 1;
            break;
        case '/':
            resArr[1] = 1;
            break;
    }

    return resArr[0] >= resArr[1];
}


const performOperation = (actionValue, f, s) => {
    let res;
    switch (actionValue){
        case '+':
            res = f.plus(s);
            break;
        case '-':
            res = f.minus(s);
            break;
        case '*':
            res = f.multipliedBy(s);
            break;
        case '/':
            if(s == 0){
                alert('Division by zero :3');
                break;
            }
            res = f.dividedBy(s);
            break;
        default: break;
    }

    res = makeNSignsAfterComma(res, 10);
    return res;
}


const value1 = document.getElementById('input_operator1');
const value2 = document.getElementById('input_operator2');
const value3 = document.getElementById('input_operator3');
const value4 = document.getElementById('input_operator4');
const result = document.getElementById('input_result');
const buttonGetRes = document.getElementById('get_result');

const operators1 = document.querySelectorAll('input[name="operator1"]');
const operators2 = document.querySelectorAll('input[name="operator2"]');
const operators3 = document.querySelectorAll('input[name="operator3"]');

const rounding = document.querySelectorAll('input[name="rounding"]');


buttonGetRes.addEventListener('click', (ev) => {
    ev.preventDefault();
    const check = checkValues([value1.value, value2.value, value3.value, value4.value]);

    if(check.length){
        check.forEach((item)=>alert(`"${item}" its an error value`))
    }else {
        const a = new BigNumber(prettierValue(value1.value));
        const b = new BigNumber(prettierValue(value2.value));
        const c = new BigNumber(prettierValue(value3.value));
        const d = new BigNumber(prettierValue(value4.value));

        let innerResult;

        let action1;
        for (const operator of operators1) {
            if (operator.checked) {
                action1 = operator;
            }
        }
        let action2;
        for (const operator of operators2) {
            if (operator.checked) {
                action2 = operator;
            }
        }
        let action3;
        for (const operator of operators3) {
            if (operator.checked) {
                action3 = operator;
            }
        }

        let round_;
        for (const roundingType of rounding) {
            if (roundingType.checked) {
                round_ = roundingType;
            }
        }

        innerResult = performOperation(action2.value, b, c);


        if(getPriority(action1, action3)){
            innerResult = performOperation(action1.value, a, innerResult);
            result.value = prerrierResult(performOperation(action3.value, innerResult, d));
        }
        else {
            innerResult = performOperation(action3.value, innerResult, d);
            result.value = prerrierResult(performOperation(action1.value, a, innerResult));
        }
    }

    document.getElementById('get_rounding-value').removeAttribute('disabled')

})


document.getElementById('get_rounding-value').addEventListener('click', (ev) => {
    ev.preventDefault()
    const r = new BigNumber(prettierValue(result.value))

    let resultValue;
    let roundType;

    for (const roundType_ of rounding) {
        if (roundType_.checked) {
            roundType = roundType_;
        }
    }


    switch (roundType.value){
        case 'm':
            resultValue = r.dp(0, BigNumber.ROUND_HALF_UP);
            break;
        case 'b':
            resultValue = r.dp(0, BigNumber.ROUND_HALF_EVEN);
            break;
        case 't':
            resultValue = r.decimalPlaces(0, 1);
            break;
        default:
            resultValue = r.dp(0, BigNumber.ROUND_HALF_UP);
            break;
    }

    document.getElementById('rounding-value').value = resultValue;
})

