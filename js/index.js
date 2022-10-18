import BigNumber from "../node_modules/bignumber.js/bignumber.mjs";


const prettierValue = (val) => {
    const re = /,/gi;
    return val.replace(re, '.');
}

const checkValue = (val) => {
    return !!val.match(/^\-?\d+(\.|,)?\d*$/);

}


const makeSixSignsAfterComma = (bigNumberObj) => {
    const newBigNumberObj = bigNumberObj;
    const newArrSize = bigNumberObj._f + 6;
    newBigNumberObj._d = bigNumberObj._d.slice(0, newArrSize);
    return newBigNumberObj;
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
                result.value = a.plus(b);
                break;
            case '-':
                result.value = a.minus(b);
                break;
            case '*':
                result.value = a.multipliedBy(b);
                break;
            case '/':
                if(b == 0){
                    alert('Division by zero :3');
                    break;
                }
                result.value = a.dividedBy(b);
                break;
            default: break;
        }


    }
})

