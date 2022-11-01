

const prettierValue = (val) => {
    const re = /,/gi;
    const re1 = /\s/gi;
    let res = val.replace(re, '.');
    res = res.replace(re1,'');
    return res;
}

const checkValue = (val) => {
    return !!val.match(/^\-?\d+(\.|,)?\d*$/);

}

const makeSixSignsAfterComma = (bigNumberObj) => {
    const numberOfDigits = bigNumberObj.c[0].toString().length + 6;
    return bigNumberObj.precision(numberOfDigits);
}

const prerrierResult = (bigNumObj) => {
    const res = makeSixSignsAfterComma(bigNumObj);
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

    console.log(res);
    return res;
}


const value1 = document.getElementById('input_operator1');
const value2 = document.getElementById('input_operator2');
const value3 = document.getElementById('input_operator3');
const value4 = document.getElementById('input_operator4');
const result = document.getElementById('input_result');
const buttonGetRes = document.getElementById('get_result');

const operators1 = document.querySelectorAll('input[name="operator1"]')
const operators2 = document.querySelectorAll('input[name="operator2"]')
const operators3 = document.querySelectorAll('input[name="operator3"]')


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


        innerResult = performOperation(action2.value, b, c);
        console.log('1',innerResult)

        if(getPriority(action1, action3)){
            innerResult = performOperation(action1.value, a, innerResult);
            result.value = prerrierResult(performOperation(action3.value, innerResult, d));
        }
        else {
            innerResult = performOperation(action3.value, innerResult, d);
            result.value = prerrierResult(performOperation(action1.value, a, innerResult));
        }

    }
})

