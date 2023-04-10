import ICalc, { Display } from "./interface/ICalc";

class Calculator implements ICalc {
    display: Display;
    output: HTMLDivElement = document.getElementById('output_display') as HTMLDivElement;
    _sbrac: HTMLSpanElement = document.getElementById('_sbracket') as HTMLSpanElement;
    _ebrac: HTMLButtonElement = document.getElementById('_ebracket') as HTMLButtonElement;
    input = document.querySelector('[name="input"]') as HTMLInputElement;
    bs: HTMLUListElement = document.getElementById('bottom-sheet') as HTMLUListElement
    flag: boolean = false
    factorial: boolean = false
    equal: boolean = false
    cube: boolean = false
    cbrt: boolean = false
    constructor() {
        this.display = {
            input: ["0"],
            operation: ["0"],
            output: ""
        };
    }

    showOpt(e: any) {
        e.classList.toggle('other')
        let check = e.classList.contains('other')
        let current = e.previousElementSibling;
        var tp = 55;
        while (current) {
            if (!check) {
                current.style.top = "0"
                current.style.opacity = 0;
            }
            else {
                current.style.top = tp + "px";
                current.style.opacity = 1;
                tp += 55;
            }
            current = current.previousElementSibling;
        }

    }

    // Logic method for function dropdown
    setFunc(val: string) {
        if (val === 'abs') {
            this.display.input.unshift('abs(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.abs(')
            this.display.operation.push(')')
        }
        if (val === 'rand') {
            if (['+', '*', '/', '-', ' mod '].includes(this.display.input[this.display.input.length - 1])) {
                this.display.input.push(Math.random().toString())
                this.display.operation.push(Math.random().toString())
            }
            else {
                this.display.input = []
                this.display.operation = []
                this.display.input.push(Math.random().toString())
                this.display.operation.push(Math.random().toString())
            }
        }
        if (val === 'ceil') {
            this.display.input.unshift('ceil(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.ceil(')
            this.display.operation.push(')')
        }
        if (val === 'floor') {
            this.display.input.unshift('floor(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.floor(')
            this.display.operation.push(')')
        }
    }

    // Logic for trigonometry all functions
    setTrigo(val: string) {
        // Normal trigono function
        if (val === 'sin' || val === "s") {
            this.display.input.unshift('sin(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sin(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')
        }
        if (val === 'cos' || val === "c") {
            this.display.input.unshift('cos(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.cos(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')
        }
        if (val === 'tan' || val === 't') {
            this.display.input.unshift('tan(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.tan(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')
        }
        if (val === 'sec') {
            this.display.input.unshift('sec(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.cos(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')
        }
        if (val === 'csc') {
            this.display.input.unshift('csc(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.sin(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')
        }
        if (val === 'cot') {
            this.display.input.unshift('cot(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.tan(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')
        }

        // hyperbolic trigono function
        if (val === 'sinh') {
            this.display.input.unshift('sinh(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sinh(')
            this.display.operation.push(')')
        }
        if (val === 'cosh') {
            this.display.input.unshift('cosh(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.cosh(')
            this.display.operation.push(')')
        }
        if (val === 'tanh') {
            this.display.input.unshift('tanh(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.tanh(')
            this.display.operation.push(')')
        }
        if (val === 'sech') {
            this.display.input.unshift('sech(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.cosh(')
            this.display.operation.push('))')
        }
        if (val === 'csch') {
            this.display.input.unshift('csch(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.sinh(')
            this.display.operation.push('))')
        }
        if (val === 'coth') {
            this.display.input.unshift('coth(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.tanh(')
            this.display.operation.push('))')
        }

        // trigonometry inverse
        if (val === 'sin-1') {
            this.display.input.unshift('sin-1(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.asin(')
            this.display.operation.push(')')
        }
        if (val === 'cos-1') {
            this.display.input.unshift('cos-1(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.acos(')
            this.display.operation.push(')')
        }
        if (val === 'tan-1') {
            this.display.input.unshift('tan-1(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.atan(')
            this.display.operation.push(')')
        }
        if (val === 'csc-1') {
            this.display.input.unshift('csc-1(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.asin(')
            this.display.operation.push('))')
        }
        if (val === 'sec-1') {
            this.display.input.unshift('sec-1(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.acos(')
            this.display.operation.push('))')
        }
        if (val === 'cot-1') {
            this.display.input.unshift('cot-1(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.atan(')
            this.display.operation.push('))')
        }
    }

    // logic for other functions
    setInput(val: string) {

        // *************** Validation for numbers ****************
        if (+val >= 0 && +val <= 9) {
            if (this.display.input[0] == "0" && this.display.input.length === 1) {
                this.display.input.pop()
                this.display.operation.pop()
            }
            if(this.display.operation[this.display.operation.length-1] === ')/Math.log('){
                this.display.operation.push(val + ')')
                this.display.input.push(val)
                return;
            }
                this.display.input.push(val)
                this.display.operation.push(val)
            
        }

        // *************** Validation for operators ***************
        if (['+', '-', '*', '/', '.'].includes(val)) {

            if (['+', '-', '*', '/', '.', ' mod '].includes(this.display.input[this.display.input.length - 1])) {
                this.display.operation.pop()
                this.display.input.pop()
                this.display.input.push(val)
                this.display.operation.push(val)
            }
            else {
                this.display.input.push(val)
                this.display.operation.push(val)
            }
        }

        // ************* Final Output ***************
        if (val === "=" || val === 'Enter') {

            if (this.equal) {
                this.display.input = []
                this.display.operation = []
                this.display.input = [this.output.innerHTML]
                this.display.operation = [this.output.innerHTML]
                this.equal = false
            }
            else {
                try {
                    this.output.innerHTML = eval(this.display.operation.join(''))
                    this.output.style.opacity = "1";
                    this.output.style.top = "0";
                } catch (err) {
                    this.output.innerHTML = `<p style="color:red;">Syntax error!</p>`
                    this.output.style.opacity = "1";
                    this.output.style.top = "0";
                }
                this.equal = true
                this.display.input.push('=')
            }

        }

        // ************ Mod ***************
        if (val === 'mod' || val === 'm') {
            if (this.display.input[this.display.input.length - 1] == " " + "mod" + " ") {
                return;
            }
            else {
                this.display.input.push(" " + "mod" + " ")
                this.display.operation.push('%')
            }
        }

        // ************* Clear data *******************
        if (val === 'C' || val === "Delete") {
            this._sbrac.style.display = 'none'
            this._ebrac.setAttribute("disabled","true")
            this.display.input = ["0"]
            this.display.operation = ["0"]
            this.output.innerHTML = "0"
            this.output.style.opacity = "0";
            this.output.style.top = "50px";
        }
        
        // ************* Remove/pop last *****************  /// TODO : BUG : for bracket
        if (val === 'DE' || val === 'Backspace') {
            if (this.display.input.length == 1) {
                this.display.input = ["0"]
                this.display.operation = ["0"]
            } else {
                this.display.input.pop()
                this.display.operation.pop()
                let sb: number = this.display.input.filter(ele => ele === '(').length
                let eb: number = this.display.input.filter(ele => ele === ')').length
                let count: number = sb - eb;

                if (count === 0) {
                    this._ebrac.removeAttribute('disabled')
                }
                else {
                    this._ebrac.removeAttribute('disabled')
                }
                this._sbrac.innerHTML = count.toString()
            }
        }

        // *************** Toggle minus button *****************
        if (val === '+-') {
            if (this.flag) {
                this.display.input.shift()
                this.display.operation.shift()
                this.flag = false
            } else {
                this.display.input.unshift("-")
                this.display.operation.unshift("-")
                this.flag = true
            }
        }

        // ************* LN base 2 ****************
        if (val === 'ln') {
            this.display.input.unshift('ln(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.log(')
            this.display.operation.push(')')
        }

        // *********** ABS ********************
        if (val === 'abs' || val === 'A') {
            this.display.input.unshift('abs(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.abs(')
            this.display.operation.push(')')
        }

        // ************* Square root ******************
        if (val === 'sqroot' || val === "R") {
            this.display.input.unshift('√(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sqrt(')
            this.display.operation.push(')')
        }

        // **************** Log10 func ********************
        if (val === 'log10' || val === "L") {
            this.display.input.unshift('log(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.log10(')
            this.display.operation.push(')')
        }

        // ************* 10^x *****************
        if (val === '10^') {
            this.display.input.unshift('10^(')
            this.display.input.push(')')
            this.display.operation.unshift('10**(')
            this.display.operation.push(')')
        }

        // ************ Square of number **********
        if (val === 'sqr' || val === "q") {
            this.display.input.unshift('sqr(')
            this.display.input.push(')')
            this.display.operation.unshift('(')
            this.display.operation.push(')**2')
        }

        // ********** 1/ func *************
        if (val === '1/') {
            this.display.input.unshift('1 / (')
            this.display.input.push(')')
            this.display.operation.unshift('1/(')
            this.display.operation.push(')')
        }


        // ********** x^y func ************
        if (val === '^') {
            if (this.display.input[this.display.input.length - 1] === ' ^ ') {
                return
            }
            this.display.input.push(' ^ ')
            this.display.operation.push('**')
        }

        // ********* EXPONENTIAL func **********
        if (val === 'exp' || val === "E") {
            let num = parseInt(this.display.input.join(''))
            let exp = num.toExponential()
            this.display.input = [exp]
        }

        // *********** PI and E constants ************
        if (val === 'PI' || val === "P") {
            if (['+', '*', '/', '-', ' mod '].includes(this.display.input[this.display.input.length - 1])) {
                this.display.input.push(Math.PI.toString())
                this.display.operation.push(Math.PI.toString())
            }
            else {
                this.display.input = []
                this.display.operation = []
                this.display.input.push(Math.PI.toString())
                this.display.operation.push(Math.PI.toString())
            }
        }
        if (val === 'e') {
            if (['+', '*', '/', '-', ' mod '].includes(this.display.input[this.display.input.length - 1])) {
                this.display.input.push(Math.E.toString())
                this.display.operation.push(Math.E.toString())
            }
            else {
                this.display.input = []
                this.display.operation = []
                this.display.input.push(Math.E.toString())
                this.display.operation.push(Math.E.toString())
            }
        }

        // logic for bracket
        if (val === '(') {
            this._sbrac.style.display = 'block'
            let sb: number = this.display.input.filter(ele => ele === '(').length
            let eb: number = this.display.input.filter(ele => ele === ')').length
            let count: number = sb - eb;
            if (count === 0) {
                this._ebrac.removeAttribute('disabled')
            }
            if (this.display.input[this.display.input.length - 1] === '0') {
                this.display.input.unshift('(')
                this.display.operation.unshift('(')
            }
            else {
                if (['+', '*', '/', '-', '('].includes(this.display.input[this.display.input.length - 1])) {
                    this.display.input.push('(')
                    this.display.operation.push('(')
                }
                else {
                    this.display.input.push('*')
                    this.display.operation.push('*')
                    this.display.input.push('(')
                    this.display.operation.push('(')
                }
            }
            this._sbrac.innerHTML = this.display.input.filter(ele => ele === '(').length.toString()
        }

        if (val === ')') {
            let sb: number = this.display.input.filter(ele => ele === '(').length
            let eb: number = this.display.input.filter(ele => ele === ')').length
            let count: number = sb - eb
            if (count === 1) {
                this._ebrac.setAttribute('disabled', "true")
                this._sbrac.style.display = 'none'
            }
            if (count == 0) {
                return
            }
            if (['+', '*', '/', '-', ' mod '].includes(this.display.input[this.display.input.length - 1])) {
                return;
            }
            this.display.input.push(')')
            this.display.operation.push(')')
            this._sbrac.innerHTML = String(--count);
        }

        // ********** Factorial func ***************
        if (val === 'fact' || val === 'f') {
            if (this.factorial) {
                let fact = 1;
                input.value = ""
                var num = parseInt(this.output.innerHTML);
                this.display.input.unshift('fact(')
                this.display.input.push(')')
                for (var i = 1; i <= num; i++) {
                    fact *= i;
                }
                this.output.innerHTML = fact.toString();
                this.output.style.opacity = "1";
                this.output.style.top = "0";
            }
            else {
                let fact = 1;
                let num = parseInt(this.display.input[0]);
                for (var i = 1; i <= num; i++) {
                    fact *= i;

                }
                this.display.input.unshift('fact(')
                this.display.input.push(')')
                this.output.innerHTML = fact.toString();
                this.output.style.opacity = "1";
                this.output.style.top = "0";
                this.factorial = true

            }
        }

    }

    setExtraFunc(val: string) {
        if (val === 'cube') {

            this.display.input.unshift('cube(')
            this.display.input.push(')')
            this.display.operation.unshift('(')
            this.display.operation.push(')**3')
            this.output.innerHTML = eval(this.display.operation.join(''))
            this.output.style.opacity = '1';
            this.output.style.top = '0';
        }
        if(val === 'cbrt'){
            this.display.input.unshift('cbrt(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.cbrt(')
            this.display.operation.push(')')
            this.output.innerHTML = eval(this.display.operation.join(''))
            this.output.style.opacity = '1';
            this.output.style.top = '0';
        }
        if(val==='2^'){
            this.display.input.unshift('2^(')
            this.display.input.push(')')
            this.display.operation.unshift('2**(')
            this.display.operation.push(')')
        }
        if(val==='e^'){
            this.display.input.unshift('e^(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.E**(')
            this.display.operation.push(')')
        }
        if(val==='logxy'){
            if(this.display.input[this.display.input.length - 1] === ' log base '){
                return;
            }
            
            this.display.input.push(' log base ')
            this.display.operation.unshift(`Math.log(`)
            this.display.operation.push(')/Math.log(')
            console.log(this.display.operation);
        }
    }

    memoryStore() {

        var ms;
        if (localStorage.getItem('MS') == null) {
            ms = []
        }
        else {
            ms = JSON.parse(localStorage.getItem('MS') as string)
        }

        ms.push(this.display.input.join(''))

        localStorage.setItem('MS', JSON.stringify(ms))
        this.bs.innerHTML = ''
        this.showMemory()
    }

    showMemory() {

        var ms;
        if (localStorage.getItem('MS') == null) {
            ms = []
            this.bs.innerHTML = "There's no history!"
        }
        else {
            ms = JSON.parse(localStorage.getItem('MS') as string)
            ms.reverse().forEach((ele: string) => {
                this.bs.innerHTML += `<li style="padding:4px 8px;display: block;background-color: #d1e6f3;border-radius: 6px;margin-bottom:2px">${ele}</li>`
            })
        }

    }

    clearMemory() {
        localStorage.removeItem('MS')
        this.showMemory()
    }

    addMemory() {
        var ms;
        if (localStorage.getItem('MS') == null) {
            ms = []
        }
        else {
            ms = JSON.parse(localStorage.getItem('MS') as string)
        }

        console.log();
        ms[ms.length - 1] = ms[ms.length - 1] + Number(this.display.input.join(''))
        localStorage.setItem('MS', JSON.stringify(ms))
        this.bs.innerHTML = ''
        this.showMemory()

    }

    subMemory() {
        var ms;
        if (localStorage.getItem('MS') == null) {
            ms = []
        }
        else {
            ms = JSON.parse(localStorage.getItem('MS') as string)
        }

        ms[ms.length - 1] = ms[ms.length - 1] - Number(this.display.input.join(''))
        localStorage.setItem('MS', JSON.stringify(ms))
        this.bs.innerHTML = ''
        this.showMemory()

    }

    readMemory() {
        if (this.bs?.firstElementChild?.innerHTML) {

            this.display.input = this.bs.firstElementChild.innerHTML.split(',');
            this.display.operation = this.bs.firstElementChild.innerHTML.split(',');
        }
    }



}

// 2nd option toggle button targer selector
const toggle = document.getElementById('_2nd') as HTMLButtonElement

// Getting which key is clicked by grouping of button using event listener
var keys = document.getElementsByClassName('__keys')[0] as HTMLDivElement;

var func = document.getElementById('func') as HTMLDivElement;

// Target display screen to input the value
var input = document.querySelector('[name="input"]') as HTMLInputElement;
var extra = document.getElementById('extra_field') as HTMLDivElement;
var trigo_2n = document.getElementById('trigo_2n') as HTMLButtonElement;
var hyper = document.getElementById('hyper') as HTMLButtonElement;
var child = document.getElementsByClassName('child')[0] as HTMLDivElement

var MS = document.getElementById('MS') as HTMLHRElement;
var MR = document.getElementById('MR') as HTMLHRElement;
var MMinus = document.getElementById('M-') as HTMLHRElement;
var MAdd = document.getElementById('M+') as HTMLHRElement;
var MC = document.getElementById('MC') as HTMLHRElement;
var toggleFlag: boolean = true
var toggleFlag1: boolean = true

// Instance of Calculator Class
const Calc = new Calculator()

toggle.onclick = function (e) {
    Calc.showOpt(this)
}

trigo_2n.onclick = function (e) {
    e.stopPropagation()
    hyper.classList.remove('toggleTrigo')
    if (toggleFlag) {
        child.children[1].classList.remove('hide')
        child.children[0].classList.add('hide')
        child.children[2].classList.add('hide')
        trigo_2n.classList.add('toggleTrigo')
        toggleFlag = false
    }
    else {
        child.children[1].classList.add('hide')
        child.children[2].classList.add('hide')
        child.children[0].classList.remove('hide')
        trigo_2n.classList.remove('toggleTrigo')
        toggleFlag = true

    }
}
hyper.onclick = function (e) {
    e.stopPropagation()
    trigo_2n.classList.remove('toggleTrigo')
    if (toggleFlag1) {
        child.children[2].classList.remove('hide')
        child.children[0].classList.add('hide')
        child.children[1].classList.add('hide')
        hyper.classList.add('toggleTrigo')
        toggleFlag1 = false
    }
    else {
        child.children[2].classList.add('hide')
        child.children[1].classList.add('hide')
        child.children[0].classList.remove('hide')
        hyper.classList.remove('toggleTrigo')
        toggleFlag1 = true

    }
}

// display to User when they click
input.value = Calc.display.input.join('')

// Normal calculation
Array.from(keys.children).slice(1).forEach((ele: any) => {

    ele.children[0].onclick = function (e: PointerEvent) {
        let val = e.target as HTMLButtonElement
        // set Input
        Calc.setInput(val.value)
        input.value = Calc.display.input.join('')
        console.log(Calc.display);
        
    }
})

// Trigonometry Calculator
Array.from(child.children).forEach((ele: any) => {
    Array.from(ele.children).forEach((e: any) => {
        e.children[0].onclick = function (e: PointerEvent) {
            e.stopPropagation()
            let val = e.target as HTMLButtonElement
            Calc.setTrigo(val.value)
            input.value = Calc.display.input.join('')
        }

    })

})

// Extra second functions
Array.from(extra.children).slice(0, -1).forEach((ele: any) => {
    ele.onclick = function (e: PointerEvent) {
        e.stopPropagation()
        let val = e.target as HTMLButtonElement
        Calc.setExtraFunc(val.value)
        input.value = Calc.display.input.join('')

    }

})

// Function dropdown feature
Array.from(func.children).forEach((ele: any) => {
    ele.children[0].onclick = function (e: PointerEvent) {
        e.stopPropagation()
        let val = e.target as HTMLButtonElement;
        Calc.setFunc(val.value)
        input.value = Calc.display.input.join('')
    }

})
MS.onclick = function () {
    Calc.memoryStore()
}

Calc.showMemory()

MC.onclick = function () {
    Calc.clearMemory()
}

MAdd.onclick = function () {
    Calc.addMemory()
}

MMinus.onclick = function () {
    Calc.subMemory()
}

MR.onclick = function () {
    Calc.readMemory()
    input.value = Calc.display.input.join('')
}
// console.log(Calc.display.input);
window.onkeydown = function (e: KeyboardEvent) {
    var key = e.key;
    Calc.setInput(key)
    Calc.setTrigo(key)
    input.value = Calc.display.input.join('')

}







