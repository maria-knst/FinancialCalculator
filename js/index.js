import BigNumber from "../node_modules/bignumber.js/bignumber.mjs";


const prettierValue = (val) => {
    const re = /,/gi;
    const re1 = /\s/gi;
    let res = val.replace(re, '.');
    res = res.replace(re1,'');
    console.log(res)
    return res;
}

const checkValue = (val) => {
    return !!val.match(/^\-?\d+(\.|,)?\d*$/);

}

const makeSixSignsAfterComma = (bigNumberObj) => {
    console.log(bigNumberObj);
    const numberOfDigits = bigNumberObj.c[0].toString().length + 6;
    return bigNumberObj.precision(numberOfDigits);
}


const prerrierResult = (bigNumObj) => {
    return bigNumObj.toString().replace(/(\d)(?=(\d\d\d)+([^\d]))/g, '$1 ');
}

const operator1 = document.getElementById('input_operator1');
const operator2 = document.getElementById('input_operator2');
const result = document.getElementById('input_result');
const buttonGetRes = document.getElementById('get_result');

const operators = document.querySelectorAll('input[name="operator"]')


buttonGetRes.addEventListener('click', (ev) => {
    ev.preventDefault();

    if(!checkValue(operator1.value)){
        alert(`"${operator1.value}" its an error value`);
    }else if(!checkValue(operator2.value)){
        alert(`"${operator2.value}" its an error value`);
    }else {
        const a = new BigNumber(prettierValue(operator1.value));
        const b = new BigNumber(prettierValue(operator2.value));

        let action;
        for (const operator of operators) {
            if (operator.checked) {
                action = operator;
            }
        }

        switch (action.value){
            case '+':
                result.value = prerrierResult(a.plus(b));
                break;
            case '-':
                result.value = prerrierResult(a.minus(b));
                break;
            case '*':
                result.value = prerrierResult(makeSixSignsAfterComma(a.multipliedBy(b)));
                break;
            case '/':
                if(b == 0){
                    alert('Division by zero :3');
                    break;
                }
                result.value =  prerrierResult(makeSixSignsAfterComma(a.dividedBy(b)));
                break;
            default: break;
        }


    }
})

