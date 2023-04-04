import ICalc,{Display} from "./interface/ICalc";

class Calculator implements ICalc{
    display: Display;
    output: HTMLDivElement = document.getElementById('output_display') as HTMLDivElement;
    flag : boolean = false
    factorial : boolean = false
    constructor(){
        this.display = {
            input : ["0"],
            operation : ["0"],
            output : ""
        };
    }

    showOpt(e : any) {
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

    setTrigo(val : string){
        // Normal trigono function
        if(val === 'sin'){
            this.display.input.unshift('sin(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sin(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')
        }
        if(val === 'cos'){
            this.display.input.unshift('cos(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.cos(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')
        }
        if(val === 'tan'){
            this.display.input.unshift('tan(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.tan(Math.PI/180*(')
            this.display.operation.push(')).toFixed()')    
        }
        if(val === 'sec'){
            this.display.input.unshift('sec(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.cos(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')    
        }
        if(val === 'csc'){
            this.display.input.unshift('csc(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.sin(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')    
        }
        if(val === 'cot'){
            this.display.input.unshift('cot(')
            this.display.input.push(')')
            this.display.operation.unshift('1/(Math.tan(Math.PI/180*(')
            this.display.operation.push('))).toFixed()')    
        }

        // hyperbolic trigono function
        if(val === 'sinh'){
            this.display.input.unshift('sinh(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sinh(')
            this.display.operation.push(')')
        }
        if(val === 'cosh'){
            this.display.input.unshift('cosh(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.cosh(')
            this.display.operation.push(')')
        }
    }
    
    setInput(val : string){

        // *************** Validation for numbers ****************
        if(+val >=0 && +val <=9){
            if(this.display.input[0] == "0"){
                this.display.input.pop()
                this.display.operation.pop()
            }
            this.display.input.push(val)
            this.display.operation.push(val)
        }
        
        // *************** Validation for operators ***************
        if(['+','-','*','/','.'].includes(val)){
            
            if(['+','-','*','/','.'].includes(this.display.input[this.display.input.length-1])){
                this.display.operation.pop()
                this.display.input.pop()
                this.display.input.push(val)
                this.display.operation.push(val)
            }
            else{
                this.display.input.push(val)
                this.display.operation.push(val)    
            }
        }

        // ************* Final Output ***************
        if(val === "="){

            try {
                this.output.innerHTML = eval(this.display.operation.join(''))
                this.output.style.opacity = "1";
                this.output.style.top = "0";
            } catch (err) {
                this.output.innerHTML = `<p style="color:red;">Syntax error!</p>`
                this.output.style.opacity = "1";
                this.output.style.top = "0";
            }
            
        }
        
        // ************ Mod ***************
        if(val === 'mod'){
            if(this.display.input[this.display.input.length-1] == " " + val + " "){
                return;
            }
            else{
                this.display.input.push(" " + val + " ")
                this.display.operation.push('%')
            }
        }
        
        // ************* Clear data *******************
        if(val === 'C'){
            this.display.input = ["0"]
            this.display.operation = ["0"]
            this.output.innerHTML = ""
            this.output.style.opacity = "0";
            this.output.style.top = "50px";
        }

        // ************* Remove/pop last *****************
        if(val === 'DE'){
            if(this.display.input.length == 0){
                this.display.input = ["0"]
                this.display.operation = ["0"]
            }else{
                this.display.input.pop()
                this.display.operation.pop()
            }
        }

        // *************** Toggle minus button *****************
        if(val === '+-'){
            if(this.flag){
                this.display.input.shift()
                this.display.operation.shift()
                this.flag = false
            }else{
                this.display.input.unshift("-")
                this.display.operation.unshift("-")
                this.flag = true
            }
        }

        // ************* LN base 2 ****************
        if(val === 'ln'){
            this.display.input.unshift('ln(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.log(')
            this.display.operation.push(')')
        }
        
        // *********** ABS ********************
        if(val === 'abs'){
            this.display.input.unshift('abs(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.abs(')
            this.display.operation.push(')')
        }
        
        // ************* Square root ******************
        if(val === 'sqroot'){
            this.display.input.unshift('√(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.sqrt(')
            this.display.operation.push(')')
        }
        
        // **************** Log10 func ********************
        if(val === 'log10'){
            this.display.input.unshift('log(')
            this.display.input.push(')')
            this.display.operation.unshift('Math.log10(')
            this.display.operation.push(')')            
        }
        
        // ************* 10^x *****************
        if(val === '10^'){
            this.display.input.unshift('10^(')
            this.display.input.push(')')
            this.display.operation.unshift('10**(')
            this.display.operation.push(')')            
        }
        
        // ************ Square of number **********
        if(val === 'sqr'){
            this.display.input.unshift('sqr(')
            this.display.input.push(')')
            this.display.operation.unshift('(')
            this.display.operation.push(')**2')
        }
        
        // ********** 1/ func *************
        if(val ==='1/'){
            this.display.input.unshift('1 / (')
            this.display.input.push(')')
            this.display.operation.unshift('1/(')
            this.display.operation.push(')')    
        }
        
        // Bug : TODO
        // ********** x^y func ************
        if(val === '^'){
            this.display.input.push(' ^ ')
            this.display.operation.push('**')    
        }

        // ********* EXPONENTIAL func **********
        if(val === 'exp'){
            if(['+','-','*','/',' mod '].includes(this.display.input[this.display.input.length-2])){
                this.display.input[this.display.input.length - 1] = "(" + parseInt(this.display.input[this.display.input.length - 1]).toExponential() + ")"
            }
            else{
                // TODO
            }
        }

        // ********** Factorial func ***************
        if(val === 'fact'){
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

    

}

// 2nd option toggle button targer selector
const toggle = document.getElementById('_2nd') as HTMLButtonElement

// Getting which key is clicked by grouping of button using event listener
var keys = document.getElementsByClassName('__keys')[0] as HTMLDivElement;

// Target display screen to input the value
var input = document.querySelector('[name="input"]') as HTMLInputElement;

var trigo_2n = document.getElementById('trigo_2n') as HTMLButtonElement;
var hyper = document.getElementById('hyper') as HTMLButtonElement;
var child = document.getElementsByClassName('child')[0] as HTMLDivElement
var toggleFlag : boolean = true
var toggleFlag1 : boolean = true
// Instance of Calculator Class
const Calc = new Calculator()

toggle.onclick = function(e){
    Calc.showOpt(this)
}

trigo_2n.onclick = function(e){
    e.stopPropagation()
    if(toggleFlag){
        child.children[1].classList.remove('hide')
        child.children[0].classList.add('hide')
        child.children[2].classList.add('hide')
        toggleFlag = false
    }
    else{
        child.children[1].classList.add('hide')
        child.children[2].classList.add('hide')
        child.children[0].classList.remove('hide')
        toggleFlag = true
        
    }
}
hyper.onclick = function(e){
    e.stopPropagation()
    if(toggleFlag1){
        child.children[2].classList.remove('hide')
        child.children[0].classList.add('hide')
        child.children[1].classList.add('hide')
        toggleFlag1 = false
    }
    else{
        child.children[2].classList.add('hide')
        child.children[1].classList.add('hide')
        child.children[0].classList.remove('hide')
        toggleFlag1 = true
        
    }
}

// display to User when they click
input.value = Calc.display.input.join('')

// Normal calculation
Array.from(keys.children).slice(1).forEach((ele : any) => {
    ele.children[0].onclick = function (e : PointerEvent) {
        let val = e.target as HTMLButtonElement
        // set Input
        Calc.setInput(val.value)
        input.value = Calc.display.input.join('')        
    }
})

// Trigonometry Calculator
Array.from(child.children).forEach((ele : any) =>{
    Array.from(ele.children).forEach((e : any)=>{
        e.children[0].onclick = function(e : PointerEvent){
            e.stopPropagation()
            let val = e.target as HTMLButtonElement
            Calc.setTrigo(val.value)
            input.value = Calc.display.input.join('')
        }
        
    })
    
})

// console.log(Calc.display.input);







