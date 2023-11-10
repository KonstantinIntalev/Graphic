//The function of the area fraction of x
function Sx (a, b, e, x, M) {
    let S = Math.PI*a*b/2-b/a*(x*(a**2-x**2)**0.5+a**2*Math.asin(x/a));
    const f = a*e;
    let treug =(Math.abs(f-x)*((1-(x/a)**2)*b**2)**0.5)/2;
            if (x>f && M<=180) {
                S = S/2+treug;
            }
            else if (x<=f && M<=180) { 
                S = S/2-treug;
            }
            else if (x<=f && M>180) {
                S = (Math.PI*a*b-S)+S/2+treug;
            }
            else {
                S = (Math.PI*a*b-S)+S/2-treug;
            }
            let Sd = S*100/(Math.PI*a*b);
return Sd;
}
//The function of calculating the true anomaly (fraction)
function Tf (M, e, v, toch) {
    let D = Date.now();
    //параметры орбиты
    let a = (1.43784*10**8)/((v*2*Math.PI)**(2/3))/1000;
    let b = a*(1-e**2)**0.5;
    const f = a*e;
    let x = 0;
    let T;
    // доля в окружности
    const Sel =Math.PI*a*b;  
    const Sod = (Math.PI*a**2*M/360)*100/(Math.PI*a**2);  //50   
    //парметры для расчётов                
    const per = Math.PI/180;    
    let d = a;
    let flag = M<180 ? 1 : -1;
    let i = 0;
    // доля от x=0 (первый шаг)    
    let Sd = Sx(a,b,e,x,M);
    // разница     
    let ras = Math.abs(Sd-Sod);
    // Частные случаи
    if (M ==0){
        x = a;
    } else if (M==180){
        x = -a;
    }
    // Цикл расчётов
        for (;ras>toch;) {
        i++
        d/=2
        if(Sd>Sod && M!=180 && M!=0) {
        x+=d*flag;
        } else if (Sd<Sod && M!=180 && M!=0) {
        x-=d*flag;
        }
        Sd = Sx(a,b,e,x,M);
        ras = Math.abs(Sd-Sod);
        }
    // Вычисление угла истинной аномалии     
    if (M<180) {
        T = 90 + Math.atan((f-x)/((1-(x/a)**2)*b**2)**0.5)/per;
    } else {
        T = 270 - Math.atan((f-x)/((1-(x/a)**2)*b**2)**0.5)/per;
    }    
    D = Date.now()-D;
return {T:T, M:M, i:i, rasSd:ras, Sd:Sd, D:D};
}