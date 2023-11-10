function on(){


let e = document.querySelector("input[name='ep']").value/1;




let v = document.querySelector("input[name='vp']").value/1;



//Функция для расчёта истинной аномалии (Кеплер)
function TKepler (M, e, v, toch) {
	let D = Date.now();
    // Данные для расчётов !!!!!!!!!!!!!!!!!!!!!!!! i=1
    let per = Math.PI/180;
    let i=1;
    // Угол эксцентрической аномалии 
    let E0 = M*per;
    let E1 = M*per+e*Math.sin(E0);
    let E = M*per;
    // Цикл расчётов!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//    for (;i<toch;i++) {
	for (;Math.abs(E0-E1)>toch;) {
		i++;
		E0=E1;
        E1=E+e*Math.sin(E0);
    }
    E=E1;
    console.log(i);
    // Угол истинной аномалии
    let T = ((2*Math.atan(((e+1)/(1-e))**0.5*Math.tan(E/2)))/per)%360;  
      
    if (T<0) {
    T = T+360;
    } 
    else {
    T = T
    }
    
    let Esr = (2*Math.atan(Math.tan(T*per/2)/((e+1)/(1-e))**0.5))/per;
    
    if (Esr<0){
		Esr=Esr+360;
}    else{ Esr=Esr }
    // Разница долей площадей 
    let rasSKd = Kd(M, e, v, T); 
    E=E/per;  
    D = Date.now()-D;
    return {T:T, M:M, i:i, rasSd:rasSKd.rasSd, D:D, Esr:Esr, E:E}
}
// Функция для расчёта разницы долей площадей от истинной аномалии
function Kd (M, e, v, T) {
    //Данные для расчётов
    let per = Math.PI/180; 
    // Параметры орбиты 
    let q = 0;
    let a = (1.43784*10**8)/((v*2*Math.PI)**(2/3))/1000;
    let b = a*(1-e**2)**0.5;
    let r = (a*(1-e)*(1+e))/(1+e*Math.cos(T*per));
    let f = a*e;
    //Доля в окружности
    const Sel =Math.PI*a*b;  
    const Sod = (Math.PI*a**2*M/360)*100/(Math.PI*a**2);   
    //Координата x
    let dx = Math.cos(T*per)*r;
    let x = f+dx;
    let qwe = a-f;
    //Доля от x
    let SKd = Sx(a, b, e, x, M);
    // Разница долей
    let rasSd = Math.abs(SKd-Sod);
    
    return {rasSd:rasSd, x:x, SKd:SKd}
}
    
let M1 = 0;
let M2 = 0;
let dt = 0;
const toch = (document.querySelector("input[name='toch']").value)/1;
const tochk = 4;
let kt = (document.querySelector("input[name='kt']").value)/1;
const dM = 360/kt;
let sr=[];


//let D1 = Date.now();
for (let i=0;i<kt;i++) {
    let Td1 = Tf(M1, e, v, toch);
    let dann = {Td1:Td1};
    sr.push(dann);
    M1 = M1+dM;   
}
//D1 = Date.now()-D1;


//let D2 = Date.now(); !!!!!!!!!!!!!!!!!!!!! toch
for (let i=0;i<kt;i++) {
    let TK1 = TKepler(M2, e, v, toch);
    let dann = {TK1:TK1};
    sr[i].TK1 = TK1;
    M2 = M2+dM;   
}
//D2 = Date.now()-D2;

let kx = 0;
       

let ky = 0;
        
        
  
let elG = document.getElementById("graphic1");
let optionsG = {
	labels: ["M", "TK1", "Td1"],
	axes: {
            x: {
                ticker: function (min, max, pixels, opts, dygraph, vals) {
                    let arr = [];
                    for (let i = 0; i <= 360; i += 30) {
                        arr.push({
                            v: i,
                            label: "" + i
                        });
                    }
                    return arr;
                }
            }
        }
	};
kx='M';
ky='T';	
	let dataG = [];
	
	for (let i=0; i<sr.length; i++) {
		dataG.push([
		sr[i].Td1[kx],
		sr[i].TK1[ky],
		sr[i].Td1[ky]
		])
	};
	//optionsG.ylabel='Истинная аномалия'
	let graph1 = new Dygraph(elG, dataG, optionsG);

//console.log(sr)

ky = 'rasSd'
let elG2 = document.getElementById("graphic2");
let dataG2 = [];
	
	for (let i=0; i<sr.length; i++) {
		dataG2.push([
		sr[i].Td1[kx],
		sr[i].TK1[ky],
		sr[i].Td1[ky]
		])
	};
	
	let graph2 = new Dygraph(elG2, dataG2, optionsG);

ky = 'i'
let elG3 = document.getElementById("graphic3");
let dataG3 = [];
	
	for (let i=0; i<sr.length; i++) {
		dataG3.push([
		sr[i].Td1[kx],
		sr[i].TK1[ky],
		sr[i].Td1[ky]
		])
	};
	
	let graph3 = new Dygraph(elG3, dataG3, optionsG);	
}
/*

//Функция расшифровки TLE
function rTLE(TLE) {

    let n = `${TLE}`.substring(0, `${TLE}`.indexOf("  "));
    
    function time(TLE){
                let ik = 0;
                let z = 0;
    
                let Y = TLE.substr(-121,2);
    
                let TT = TLE.substr(-119,12);
    
                let days = TT.substring(0, TT.indexOf("."));
    
                if (Y%4==0) {
                    z = 1;
                } else { z = 0;}
    
                let m = [{d:31,m:0},{d:(59+z),m:1},{d:(90+z),m:2},{d:(120+z),m:3},{d:(151+z),m:4},{d:(181+z),m:5},{d:(212+z),m:6},{d:(243+z),m:7},{d:(273+z),m:8},{d:(304+z),m:9},{d:(334+z),m:10},{d:(365+z),m:11}];
    
                for (let y = days-m[ik].d;y>0;y = days-m[ik].d) {
                    ik++;
                }
                let mounth = m[ik].m;
                days = days-m[ik-1].d;
    
                if (Y<90) {
                    Y = 2000+Y/1;
                } else {Y = 1900+Y/1;}
    
                let hours = (`${(TT-(`${TT}`.substring(0, `${TT}`.indexOf("."))))*24}`.substring(0, `${(TT-(`${TT}`.substring(0, `${TT}`.indexOf("."))))*24}`.indexOf(".")))/1;
                let minutes = (`${(TT-days)*24*60%60}`.substring(0, `${(TT-days)*24*60%60}`.indexOf(".")))/1;
                let seconds = ((((TT-days)*24*60%60)-minutes)*60)/1;
    
                let tTLE = new Date(Date.UTC(Y, 3, 25, hours, minutes, seconds));
                return tTLE;
    }
    
    
    
    
    let tTLE = time(TLE);
    let i = TLE.substr(-61,8)/1;
    let q = TLE.substr(-52, 8)/1;
    let e = TLE.substr(-43, 7)/10000000;
    let w = TLE.substr(-35, 8)/1;
    let M = TLE.substr(-26, 8)/1;
    let v = TLE.substr(-17, 7)/1;
    
    
    
    return {Aname:n, tTLE:tTLE, i:i, q:q, e:e, w:w, M:M, v:v};
    }
*/






function onchange1(){
    let file = document.getElementById("TLE").files[0];
            let q = file.text().then(
                function (t){
                    let TLE =rTLE(t);
                    document.querySelector("input[name='ep']").value = TLE.e;
                    document.querySelector("input[name='vp']").value = TLE.v;
                    on();
                });
}







    let elG = document.getElementById("graphic1");
    let optionsG = {
        labels: ["M", "Td1", "Tk1"],
        axes: {
                x: {
                    ticker: function (min, max, pixels, opts, dygraph, vals) {
                        let arr = [];
                        for (let i = 0; i <= 360; i += 30) {
                            arr.push({
                                v: i,
                                label: "" + i
                            });
                        }
                        return arr;
                    }
                }
            }
        };
    kx='M';
    ky='T';	
        let dataG = [];
        
        for (let i=0; i<0; i++) {
            dataG.push([
            ,
            ,
            
            ])
        };
        //optionsG.ylabel='Истинная аномалия'
        let graph1 = new Dygraph(elG, dataG, optionsG);
    
    //console.log(sr)
    
    ky = 'rasSd'
    let elG2 = document.getElementById("graphic2");
    let dataG2 = [];
        
        for (let i=0; i<0; i++) {
            dataG2.push([
            ,
            ,
            
            ])
        };
        
        let graph2 = new Dygraph(elG2, dataG2, optionsG);
    
    ky = 'i'
    let elG3 = document.getElementById("graphic3");
    let dataG3 = [];
        
        for (let i=0; i<0; i++) {
            dataG3.push([
            ,
            ,
            
            ])
        };
        
        let graph3 = new Dygraph(elG3, dataG3, optionsG);
