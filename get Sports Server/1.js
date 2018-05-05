const coupnCodeFor3000 = 'you can delivery your food';

class Couponbox{
    constructor(wing,body,leg){
        this.wing = wing;
        this.body =
             body.split('').reverse().join('');
        console.log(${this.body}${this.leg}${this.wing});
        this.leg = leg;
    }
    make(head){
        return '${head}.couponecode:${this.body}${this.leg}${this.wing};'
    }
}

let cpn = new Couponbox('en','hc','ick');
console.log(cpn.make(coupnCodeFor3000));