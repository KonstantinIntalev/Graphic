// TLE decryption function 3 lines are supplied to the input (name, first line, second line) there may be malfunctions, due to the fact that different sites have different numbers of spaces (with Celebrtack it works fine)
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
                let month = m[ik].m;
                days = days-m[ik-1].d;
    
                if (Y<90) {
                    Y = 2000+Y/1;
                } else {Y = 1900+Y/1;}
    
                let hours = (`${(TT-(`${TT}`.substring(0, `${TT}`.indexOf("."))))*24}`.substring(0, `${(TT-(`${TT}`.substring(0, `${TT}`.indexOf("."))))*24}`.indexOf(".")))/1;
                let minutes = (`${(TT-days)*24*60%60}`.substring(0, `${(TT-days)*24*60%60}`.indexOf(".")))/1;
                let seconds = ((((TT-days)*24*60%60)-minutes)*60)/1;
    
                let tTLE = new Date(Date.UTC(Y, month, days, hours, minutes, seconds));
                return tTLE;
    }
    
    
    
    
    let tTLE = time(TLE);
    let i = TLE.substr(-61,8)/1;
    let q = TLE.substr(-52, 8)/1;
    let e = TLE.substr(-43, 7)/10000000;
    let w = TLE.substr(-35, 8)/1;
    let M = TLE.substr(-26, 8)/1;
    let v = TLE.substr(-17, 7)/1;
    // Orbit parameters
    let a = ( (2.9755363405824*10**15)/( 2*Math.PI*v )**2 )**( 1/3 );
    let P = a*( 1 - e );
    let A = a*( 1 + e );   


    return {Aname:n, tTLE:tTLE, i:i, q:q, e:e, w:w, M:M, v:v, a:A, Pe:P, Ap:A};
    } 
// The output is an object with the Name of the apparatus, epoch, inclination, right ascent of the ascending node, eccentricity, perigee argument, average anomaly and average motion    
// The epoch is already in Moscow time!!!!!!!