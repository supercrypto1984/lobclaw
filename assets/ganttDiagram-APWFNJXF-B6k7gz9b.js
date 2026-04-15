import{dA as fe,dB as he,dC as me,dD as ke,dE as We,dF as At,dG as Ve,_ as o,dH as U,n as ut,i as ze,j as Oe,B as Pe,F as Ne,l as Re,k as Be,L as He,z as Ge,x as Dt,v as bt,dI as Xe,dJ as je,dK as qe,y as Ue,a3 as Ze,dL as ee,dM as ne,dN as re,dO as ie,dP as se,dQ as ae,dR as ce,o as Qe,K as Ke,dS as $e,dT as Je,dU as tn,dV as en,dW as nn,dX as rn,dY as sn}from"./index-DVBxPHNz.js";import{g as Bt,c as Ht}from"./react-core-Dfkx_DNu.js";import"./semi-ui-Clo0ReXi.js";import"./i18n-PF1yBoM3.js";import"./tools-Uj3RNI36.js";import"./react-components-DhyuYrS4.js";var ye={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(Ht,function(){return function(n,r){var s=r.prototype,h=s.format;s.format=function(l){var T=this,E=this.$locale();if(!this.isValid())return h.bind(this)(l);var S=this.$utils(),g=(l||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(I){switch(I){case"Q":return Math.ceil((T.$M+1)/3);case"Do":return E.ordinal(T.$D);case"gggg":return T.weekYear();case"GGGG":return T.isoWeekYear();case"wo":return E.ordinal(T.week(),"W");case"w":case"ww":return S.s(T.week(),I==="w"?1:2,"0");case"W":case"WW":return S.s(T.isoWeek(),I==="W"?1:2,"0");case"k":case"kk":return S.s(String(T.$H===0?24:T.$H),I==="k"?1:2,"0");case"X":return Math.floor(T.$d.getTime()/1e3);case"x":return T.$d.getTime();case"z":return"["+T.offsetName()+"]";case"zzz":return"["+T.offsetName("long")+"]";default:return I}});return h.bind(this)(g)}}})})(ye);var an=ye.exports;const cn=Bt(an);var ge={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(Ht,function(){var n={LTS:"h:mm:ss A",LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY h:mm A",LLLL:"dddd, MMMM D, YYYY h:mm A"},r=/(\[[^[]*\])|([-_:/.,()\s]+)|(A|a|Q|YYYY|YY?|ww?|MM?M?M?|Do|DD?|hh?|HH?|mm?|ss?|S{1,3}|z|ZZ?)/g,s=/\d/,h=/\d\d/,l=/\d\d?/,T=/\d*[^-_:/,()\s\d]+/,E={},S=function(v){return(v=+v)+(v>68?1900:2e3)},g=function(v){return function(M){this[v]=+M}},I=[/[+-]\d\d:?(\d\d)?|Z/,function(v){(this.zone||(this.zone={})).offset=function(M){if(!M||M==="Z")return 0;var L=M.match(/([+-]|\d\d)/g),Y=60*L[1]+(+L[2]||0);return Y===0?0:L[0]==="+"?-Y:Y}(v)}],C=function(v){var M=E[v];return M&&(M.indexOf?M:M.s.concat(M.f))},p=function(v,M){var L,Y=E.meridiem;if(Y){for(var R=1;R<=24;R+=1)if(v.indexOf(Y(R,0,M))>-1){L=R>12;break}}else L=v===(M?"pm":"PM");return L},G={A:[T,function(v){this.afternoon=p(v,!1)}],a:[T,function(v){this.afternoon=p(v,!0)}],Q:[s,function(v){this.month=3*(v-1)+1}],S:[s,function(v){this.milliseconds=100*+v}],SS:[h,function(v){this.milliseconds=10*+v}],SSS:[/\d{3}/,function(v){this.milliseconds=+v}],s:[l,g("seconds")],ss:[l,g("seconds")],m:[l,g("minutes")],mm:[l,g("minutes")],H:[l,g("hours")],h:[l,g("hours")],HH:[l,g("hours")],hh:[l,g("hours")],D:[l,g("day")],DD:[h,g("day")],Do:[T,function(v){var M=E.ordinal,L=v.match(/\d+/);if(this.day=L[0],M)for(var Y=1;Y<=31;Y+=1)M(Y).replace(/\[|\]/g,"")===v&&(this.day=Y)}],w:[l,g("week")],ww:[h,g("week")],M:[l,g("month")],MM:[h,g("month")],MMM:[T,function(v){var M=C("months"),L=(C("monthsShort")||M.map(function(Y){return Y.slice(0,3)})).indexOf(v)+1;if(L<1)throw new Error;this.month=L%12||L}],MMMM:[T,function(v){var M=C("months").indexOf(v)+1;if(M<1)throw new Error;this.month=M%12||M}],Y:[/[+-]?\d+/,g("year")],YY:[h,function(v){this.year=S(v)}],YYYY:[/\d{4}/,g("year")],Z:I,ZZ:I};function F(v){var M,L;M=v,L=E&&E.formats;for(var Y=(v=M.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g,function(b,x,k){var _=k&&k.toUpperCase();return x||L[k]||n[k]||L[_].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g,function(c,u,m){return u||m.slice(1)})})).match(r),R=Y.length,N=0;N<R;N+=1){var X=Y[N],O=G[X],y=O&&O[0],w=O&&O[1];Y[N]=w?{regex:y,parser:w}:X.replace(/^\[|\]$/g,"")}return function(b){for(var x={},k=0,_=0;k<R;k+=1){var c=Y[k];if(typeof c=="string")_+=c.length;else{var u=c.regex,m=c.parser,f=b.slice(_),D=u.exec(f)[0];m.call(x,D),b=b.replace(D,"")}}return function(a){var d=a.afternoon;if(d!==void 0){var i=a.hours;d?i<12&&(a.hours+=12):i===12&&(a.hours=0),delete a.afternoon}}(x),x}}return function(v,M,L){L.p.customParseFormat=!0,v&&v.parseTwoDigitYear&&(S=v.parseTwoDigitYear);var Y=M.prototype,R=Y.parse;Y.parse=function(N){var X=N.date,O=N.utc,y=N.args;this.$u=O;var w=y[1];if(typeof w=="string"){var b=y[2]===!0,x=y[3]===!0,k=b||x,_=y[2];x&&(_=y[2]),E=this.$locale(),!b&&_&&(E=L.Ls[_]),this.$d=function(f,D,a,d){try{if(["x","X"].indexOf(D)>-1)return new Date((D==="X"?1e3:1)*f);var i=F(D)(f),W=i.year,A=i.month,V=i.day,j=i.hours,z=i.minutes,P=i.seconds,K=i.milliseconds,ct=i.zone,ot=i.week,mt=new Date,kt=V||(W||A?1:mt.getDate()),lt=W||mt.getFullYear(),B=0;W&&!A||(B=A>0?A-1:mt.getMonth());var Q,q=j||0,st=z||0,$=P||0,it=K||0;return ct?new Date(Date.UTC(lt,B,kt,q,st,$,it+60*ct.offset*1e3)):a?new Date(Date.UTC(lt,B,kt,q,st,$,it)):(Q=new Date(lt,B,kt,q,st,$,it),ot&&(Q=d(Q).week(ot).toDate()),Q)}catch{return new Date("")}}(X,w,O,L),this.init(),_&&_!==!0&&(this.$L=this.locale(_).$L),k&&X!=this.format(w)&&(this.$d=new Date("")),E={}}else if(w instanceof Array)for(var c=w.length,u=1;u<=c;u+=1){y[1]=w[u-1];var m=L.apply(this,y);if(m.isValid()){this.$d=m.$d,this.$L=m.$L,this.init();break}u===c&&(this.$d=new Date(""))}else R.call(this,N)}}})})(ge);var on=ge.exports;const ln=Bt(on);function un(t){return t}var Tt=1,It=2,Vt=3,xt=4,oe=1e-6;function dn(t){return"translate("+t+",0)"}function fn(t){return"translate(0,"+t+")"}function hn(t){return e=>+t(e)}function mn(t,e){return e=Math.max(0,t.bandwidth()-e*2)/2,t.round()&&(e=Math.round(e)),n=>+t(n)+e}function kn(){return!this.__axis}function pe(t,e){var n=[],r=null,s=null,h=6,l=6,T=3,E=typeof window<"u"&&window.devicePixelRatio>1?0:.5,S=t===Tt||t===xt?-1:1,g=t===xt||t===It?"x":"y",I=t===Tt||t===Vt?dn:fn;function C(p){var G=r??(e.ticks?e.ticks.apply(e,n):e.domain()),F=s??(e.tickFormat?e.tickFormat.apply(e,n):un),v=Math.max(h,0)+T,M=e.range(),L=+M[0]+E,Y=+M[M.length-1]+E,R=(e.bandwidth?mn:hn)(e.copy(),E),N=p.selection?p.selection():p,X=N.selectAll(".domain").data([null]),O=N.selectAll(".tick").data(G,e).order(),y=O.exit(),w=O.enter().append("g").attr("class","tick"),b=O.select("line"),x=O.select("text");X=X.merge(X.enter().insert("path",".tick").attr("class","domain").attr("stroke","currentColor")),O=O.merge(w),b=b.merge(w.append("line").attr("stroke","currentColor").attr(g+"2",S*h)),x=x.merge(w.append("text").attr("fill","currentColor").attr(g,S*v).attr("dy",t===Tt?"0em":t===Vt?"0.71em":"0.32em")),p!==N&&(X=X.transition(p),O=O.transition(p),b=b.transition(p),x=x.transition(p),y=y.transition(p).attr("opacity",oe).attr("transform",function(k){return isFinite(k=R(k))?I(k+E):this.getAttribute("transform")}),w.attr("opacity",oe).attr("transform",function(k){var _=this.parentNode.__axis;return I((_&&isFinite(_=_(k))?_:R(k))+E)})),y.remove(),X.attr("d",t===xt||t===It?l?"M"+S*l+","+L+"H"+E+"V"+Y+"H"+S*l:"M"+E+","+L+"V"+Y:l?"M"+L+","+S*l+"V"+E+"H"+Y+"V"+S*l:"M"+L+","+E+"H"+Y),O.attr("opacity",1).attr("transform",function(k){return I(R(k)+E)}),b.attr(g+"2",S*h),x.attr(g,S*v).text(F),N.filter(kn).attr("fill","none").attr("font-size",10).attr("font-family","sans-serif").attr("text-anchor",t===It?"start":t===xt?"end":"middle"),N.each(function(){this.__axis=R})}return C.scale=function(p){return arguments.length?(e=p,C):e},C.ticks=function(){return n=Array.from(arguments),C},C.tickArguments=function(p){return arguments.length?(n=p==null?[]:Array.from(p),C):n.slice()},C.tickValues=function(p){return arguments.length?(r=p==null?null:Array.from(p),C):r&&r.slice()},C.tickFormat=function(p){return arguments.length?(s=p,C):s},C.tickSize=function(p){return arguments.length?(h=l=+p,C):h},C.tickSizeInner=function(p){return arguments.length?(h=+p,C):h},C.tickSizeOuter=function(p){return arguments.length?(l=+p,C):l},C.tickPadding=function(p){return arguments.length?(T=+p,C):T},C.offset=function(p){return arguments.length?(E=+p,C):E},C}function yn(t){return pe(Tt,t)}function gn(t){return pe(Vt,t)}const pn=Math.PI/180,vn=180/Math.PI,Ct=18,ve=.96422,be=1,xe=.82521,Te=4/29,dt=6/29,we=3*dt*dt,bn=dt*dt*dt;function _e(t){if(t instanceof et)return new et(t.l,t.a,t.b,t.opacity);if(t instanceof rt)return De(t);t instanceof me||(t=We(t));var e=Wt(t.r),n=Wt(t.g),r=Wt(t.b),s=Ft((.2225045*e+.7168786*n+.0606169*r)/be),h,l;return e===n&&n===r?h=l=s:(h=Ft((.4360747*e+.3850649*n+.1430804*r)/ve),l=Ft((.0139322*e+.0971045*n+.7141733*r)/xe)),new et(116*s-16,500*(h-s),200*(s-l),t.opacity)}function xn(t,e,n,r){return arguments.length===1?_e(t):new et(t,e,n,r??1)}function et(t,e,n,r){this.l=+t,this.a=+e,this.b=+n,this.opacity=+r}fe(et,xn,he(ke,{brighter(t){return new et(this.l+Ct*(t??1),this.a,this.b,this.opacity)},darker(t){return new et(this.l-Ct*(t??1),this.a,this.b,this.opacity)},rgb(){var t=(this.l+16)/116,e=isNaN(this.a)?t:t+this.a/500,n=isNaN(this.b)?t:t-this.b/200;return e=ve*Lt(e),t=be*Lt(t),n=xe*Lt(n),new me(Yt(3.1338561*e-1.6168667*t-.4906146*n),Yt(-.9787684*e+1.9161415*t+.033454*n),Yt(.0719453*e-.2289914*t+1.4052427*n),this.opacity)}}));function Ft(t){return t>bn?Math.pow(t,1/3):t/we+Te}function Lt(t){return t>dt?t*t*t:we*(t-Te)}function Yt(t){return 255*(t<=.0031308?12.92*t:1.055*Math.pow(t,1/2.4)-.055)}function Wt(t){return(t/=255)<=.04045?t/12.92:Math.pow((t+.055)/1.055,2.4)}function Tn(t){if(t instanceof rt)return new rt(t.h,t.c,t.l,t.opacity);if(t instanceof et||(t=_e(t)),t.a===0&&t.b===0)return new rt(NaN,0<t.l&&t.l<100?0:NaN,t.l,t.opacity);var e=Math.atan2(t.b,t.a)*vn;return new rt(e<0?e+360:e,Math.sqrt(t.a*t.a+t.b*t.b),t.l,t.opacity)}function zt(t,e,n,r){return arguments.length===1?Tn(t):new rt(t,e,n,r??1)}function rt(t,e,n,r){this.h=+t,this.c=+e,this.l=+n,this.opacity=+r}function De(t){if(isNaN(t.h))return new et(t.l,0,0,t.opacity);var e=t.h*pn;return new et(t.l,Math.cos(e)*t.c,Math.sin(e)*t.c,t.opacity)}fe(rt,zt,he(ke,{brighter(t){return new rt(this.h,this.c,this.l+Ct*(t??1),this.opacity)},darker(t){return new rt(this.h,this.c,this.l-Ct*(t??1),this.opacity)},rgb(){return De(this).rgb()}}));function wn(t){return function(e,n){var r=t((e=zt(e)).h,(n=zt(n)).h),s=At(e.c,n.c),h=At(e.l,n.l),l=At(e.opacity,n.opacity);return function(T){return e.h=r(T),e.c=s(T),e.l=h(T),e.opacity=l(T),e+""}}}const _n=wn(Ve);var Ce={exports:{}};(function(t,e){(function(n,r){t.exports=r()})(Ht,function(){var n="day";return function(r,s,h){var l=function(S){return S.add(4-S.isoWeekday(),n)},T=s.prototype;T.isoWeekYear=function(){return l(this).year()},T.isoWeek=function(S){if(!this.$utils().u(S))return this.add(7*(S-this.isoWeek()),n);var g,I,C,p,G=l(this),F=(g=this.isoWeekYear(),I=this.$u,C=(I?h.utc:h)().year(g).startOf("year"),p=4-C.isoWeekday(),C.isoWeekday()>4&&(p+=7),C.add(p,n));return G.diff(F,"week")+1},T.isoWeekday=function(S){return this.$utils().u(S)?this.day()||7:this.day(this.day()%7?S:S-7)};var E=T.startOf;T.startOf=function(S,g){var I=this.$utils(),C=!!I.u(g)||g;return I.p(S)==="isoweek"?C?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):E.bind(this)(S,g)}}})})(Ce);var Dn=Ce.exports;const Cn=Bt(Dn);var Ot=function(){var t=o(function(_,c,u,m){for(u=u||{},m=_.length;m--;u[_[m]]=c);return u},"o"),e=[6,8,10,12,13,14,15,16,17,18,20,21,22,23,24,25,26,27,28,29,30,31,33,35,36,38,40],n=[1,26],r=[1,27],s=[1,28],h=[1,29],l=[1,30],T=[1,31],E=[1,32],S=[1,33],g=[1,34],I=[1,9],C=[1,10],p=[1,11],G=[1,12],F=[1,13],v=[1,14],M=[1,15],L=[1,16],Y=[1,19],R=[1,20],N=[1,21],X=[1,22],O=[1,23],y=[1,25],w=[1,35],b={trace:o(function(){},"trace"),yy:{},symbols_:{error:2,start:3,gantt:4,document:5,EOF:6,line:7,SPACE:8,statement:9,NL:10,weekday:11,weekday_monday:12,weekday_tuesday:13,weekday_wednesday:14,weekday_thursday:15,weekday_friday:16,weekday_saturday:17,weekday_sunday:18,weekend:19,weekend_friday:20,weekend_saturday:21,dateFormat:22,inclusiveEndDates:23,topAxis:24,axisFormat:25,tickInterval:26,excludes:27,includes:28,todayMarker:29,title:30,acc_title:31,acc_title_value:32,acc_descr:33,acc_descr_value:34,acc_descr_multiline_value:35,section:36,clickStatement:37,taskTxt:38,taskData:39,click:40,callbackname:41,callbackargs:42,href:43,clickStatementDebug:44,$accept:0,$end:1},terminals_:{2:"error",4:"gantt",6:"EOF",8:"SPACE",10:"NL",12:"weekday_monday",13:"weekday_tuesday",14:"weekday_wednesday",15:"weekday_thursday",16:"weekday_friday",17:"weekday_saturday",18:"weekday_sunday",20:"weekend_friday",21:"weekend_saturday",22:"dateFormat",23:"inclusiveEndDates",24:"topAxis",25:"axisFormat",26:"tickInterval",27:"excludes",28:"includes",29:"todayMarker",30:"title",31:"acc_title",32:"acc_title_value",33:"acc_descr",34:"acc_descr_value",35:"acc_descr_multiline_value",36:"section",38:"taskTxt",39:"taskData",40:"click",41:"callbackname",42:"callbackargs",43:"href"},productions_:[0,[3,3],[5,0],[5,2],[7,2],[7,1],[7,1],[7,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[11,1],[19,1],[19,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,1],[9,2],[9,2],[9,1],[9,1],[9,1],[9,2],[37,2],[37,3],[37,3],[37,4],[37,3],[37,4],[37,2],[44,2],[44,3],[44,3],[44,4],[44,3],[44,4],[44,2]],performAction:o(function(c,u,m,f,D,a,d){var i=a.length-1;switch(D){case 1:return a[i-1];case 2:this.$=[];break;case 3:a[i-1].push(a[i]),this.$=a[i-1];break;case 4:case 5:this.$=a[i];break;case 6:case 7:this.$=[];break;case 8:f.setWeekday("monday");break;case 9:f.setWeekday("tuesday");break;case 10:f.setWeekday("wednesday");break;case 11:f.setWeekday("thursday");break;case 12:f.setWeekday("friday");break;case 13:f.setWeekday("saturday");break;case 14:f.setWeekday("sunday");break;case 15:f.setWeekend("friday");break;case 16:f.setWeekend("saturday");break;case 17:f.setDateFormat(a[i].substr(11)),this.$=a[i].substr(11);break;case 18:f.enableInclusiveEndDates(),this.$=a[i].substr(18);break;case 19:f.TopAxis(),this.$=a[i].substr(8);break;case 20:f.setAxisFormat(a[i].substr(11)),this.$=a[i].substr(11);break;case 21:f.setTickInterval(a[i].substr(13)),this.$=a[i].substr(13);break;case 22:f.setExcludes(a[i].substr(9)),this.$=a[i].substr(9);break;case 23:f.setIncludes(a[i].substr(9)),this.$=a[i].substr(9);break;case 24:f.setTodayMarker(a[i].substr(12)),this.$=a[i].substr(12);break;case 27:f.setDiagramTitle(a[i].substr(6)),this.$=a[i].substr(6);break;case 28:this.$=a[i].trim(),f.setAccTitle(this.$);break;case 29:case 30:this.$=a[i].trim(),f.setAccDescription(this.$);break;case 31:f.addSection(a[i].substr(8)),this.$=a[i].substr(8);break;case 33:f.addTask(a[i-1],a[i]),this.$="task";break;case 34:this.$=a[i-1],f.setClickEvent(a[i-1],a[i],null);break;case 35:this.$=a[i-2],f.setClickEvent(a[i-2],a[i-1],a[i]);break;case 36:this.$=a[i-2],f.setClickEvent(a[i-2],a[i-1],null),f.setLink(a[i-2],a[i]);break;case 37:this.$=a[i-3],f.setClickEvent(a[i-3],a[i-2],a[i-1]),f.setLink(a[i-3],a[i]);break;case 38:this.$=a[i-2],f.setClickEvent(a[i-2],a[i],null),f.setLink(a[i-2],a[i-1]);break;case 39:this.$=a[i-3],f.setClickEvent(a[i-3],a[i-1],a[i]),f.setLink(a[i-3],a[i-2]);break;case 40:this.$=a[i-1],f.setLink(a[i-1],a[i]);break;case 41:case 47:this.$=a[i-1]+" "+a[i];break;case 42:case 43:case 45:this.$=a[i-2]+" "+a[i-1]+" "+a[i];break;case 44:case 46:this.$=a[i-3]+" "+a[i-2]+" "+a[i-1]+" "+a[i];break}},"anonymous"),table:[{3:1,4:[1,2]},{1:[3]},t(e,[2,2],{5:3}),{6:[1,4],7:5,8:[1,6],9:7,10:[1,8],11:17,12:n,13:r,14:s,15:h,16:l,17:T,18:E,19:18,20:S,21:g,22:I,23:C,24:p,25:G,26:F,27:v,28:M,29:L,30:Y,31:R,33:N,35:X,36:O,37:24,38:y,40:w},t(e,[2,7],{1:[2,1]}),t(e,[2,3]),{9:36,11:17,12:n,13:r,14:s,15:h,16:l,17:T,18:E,19:18,20:S,21:g,22:I,23:C,24:p,25:G,26:F,27:v,28:M,29:L,30:Y,31:R,33:N,35:X,36:O,37:24,38:y,40:w},t(e,[2,5]),t(e,[2,6]),t(e,[2,17]),t(e,[2,18]),t(e,[2,19]),t(e,[2,20]),t(e,[2,21]),t(e,[2,22]),t(e,[2,23]),t(e,[2,24]),t(e,[2,25]),t(e,[2,26]),t(e,[2,27]),{32:[1,37]},{34:[1,38]},t(e,[2,30]),t(e,[2,31]),t(e,[2,32]),{39:[1,39]},t(e,[2,8]),t(e,[2,9]),t(e,[2,10]),t(e,[2,11]),t(e,[2,12]),t(e,[2,13]),t(e,[2,14]),t(e,[2,15]),t(e,[2,16]),{41:[1,40],43:[1,41]},t(e,[2,4]),t(e,[2,28]),t(e,[2,29]),t(e,[2,33]),t(e,[2,34],{42:[1,42],43:[1,43]}),t(e,[2,40],{41:[1,44]}),t(e,[2,35],{43:[1,45]}),t(e,[2,36]),t(e,[2,38],{42:[1,46]}),t(e,[2,37]),t(e,[2,39])],defaultActions:{},parseError:o(function(c,u){if(u.recoverable)this.trace(c);else{var m=new Error(c);throw m.hash=u,m}},"parseError"),parse:o(function(c){var u=this,m=[0],f=[],D=[null],a=[],d=this.table,i="",W=0,A=0,V=2,j=1,z=a.slice.call(arguments,1),P=Object.create(this.lexer),K={yy:{}};for(var ct in this.yy)Object.prototype.hasOwnProperty.call(this.yy,ct)&&(K.yy[ct]=this.yy[ct]);P.setInput(c,K.yy),K.yy.lexer=P,K.yy.parser=this,typeof P.yylloc>"u"&&(P.yylloc={});var ot=P.yylloc;a.push(ot);var mt=P.options&&P.options.ranges;typeof K.yy.parseError=="function"?this.parseError=K.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError;function kt(Z){m.length=m.length-2*Z,D.length=D.length-Z,a.length=a.length-Z}o(kt,"popStack");function lt(){var Z;return Z=f.pop()||P.lex()||j,typeof Z!="number"&&(Z instanceof Array&&(f=Z,Z=f.pop()),Z=u.symbols_[Z]||Z),Z}o(lt,"lex");for(var B,Q,q,st,$={},it,J,te,vt;;){if(Q=m[m.length-1],this.defaultActions[Q]?q=this.defaultActions[Q]:((B===null||typeof B>"u")&&(B=lt()),q=d[Q]&&d[Q][B]),typeof q>"u"||!q.length||!q[0]){var Mt="";vt=[];for(it in d[Q])this.terminals_[it]&&it>V&&vt.push("'"+this.terminals_[it]+"'");P.showPosition?Mt="Parse error on line "+(W+1)+`:
`+P.showPosition()+`
Expecting `+vt.join(", ")+", got '"+(this.terminals_[B]||B)+"'":Mt="Parse error on line "+(W+1)+": Unexpected "+(B==j?"end of input":"'"+(this.terminals_[B]||B)+"'"),this.parseError(Mt,{text:P.match,token:this.terminals_[B]||B,line:P.yylineno,loc:ot,expected:vt})}if(q[0]instanceof Array&&q.length>1)throw new Error("Parse Error: multiple actions possible at state: "+Q+", token: "+B);switch(q[0]){case 1:m.push(B),D.push(P.yytext),a.push(P.yylloc),m.push(q[1]),B=null,A=P.yyleng,i=P.yytext,W=P.yylineno,ot=P.yylloc;break;case 2:if(J=this.productions_[q[1]][1],$.$=D[D.length-J],$._$={first_line:a[a.length-(J||1)].first_line,last_line:a[a.length-1].last_line,first_column:a[a.length-(J||1)].first_column,last_column:a[a.length-1].last_column},mt&&($._$.range=[a[a.length-(J||1)].range[0],a[a.length-1].range[1]]),st=this.performAction.apply($,[i,A,W,K.yy,q[1],D,a].concat(z)),typeof st<"u")return st;J&&(m=m.slice(0,-1*J*2),D=D.slice(0,-1*J),a=a.slice(0,-1*J)),m.push(this.productions_[q[1]][0]),D.push($.$),a.push($._$),te=d[m[m.length-2]][m[m.length-1]],m.push(te);break;case 3:return!0}}return!0},"parse")},x=function(){var _={EOF:1,parseError:o(function(u,m){if(this.yy.parser)this.yy.parser.parseError(u,m);else throw new Error(u)},"parseError"),setInput:o(function(c,u){return this.yy=u||this.yy||{},this._input=c,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},"setInput"),input:o(function(){var c=this._input[0];this.yytext+=c,this.yyleng++,this.offset++,this.match+=c,this.matched+=c;var u=c.match(/(?:\r\n?|\n).*/g);return u?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),c},"input"),unput:o(function(c){var u=c.length,m=c.split(/(?:\r\n?|\n)/g);this._input=c+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-u),this.offset-=u;var f=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),m.length-1&&(this.yylineno-=m.length-1);var D=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:m?(m.length===f.length?this.yylloc.first_column:0)+f[f.length-m.length].length-m[0].length:this.yylloc.first_column-u},this.options.ranges&&(this.yylloc.range=[D[0],D[0]+this.yyleng-u]),this.yyleng=this.yytext.length,this},"unput"),more:o(function(){return this._more=!0,this},"more"),reject:o(function(){if(this.options.backtrack_lexer)this._backtrack=!0;else return this.parseError("Lexical error on line "+(this.yylineno+1)+`. You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).
`+this.showPosition(),{text:"",token:null,line:this.yylineno});return this},"reject"),less:o(function(c){this.unput(this.match.slice(c))},"less"),pastInput:o(function(){var c=this.matched.substr(0,this.matched.length-this.match.length);return(c.length>20?"...":"")+c.substr(-20).replace(/\n/g,"")},"pastInput"),upcomingInput:o(function(){var c=this.match;return c.length<20&&(c+=this._input.substr(0,20-c.length)),(c.substr(0,20)+(c.length>20?"...":"")).replace(/\n/g,"")},"upcomingInput"),showPosition:o(function(){var c=this.pastInput(),u=new Array(c.length+1).join("-");return c+this.upcomingInput()+`
`+u+"^"},"showPosition"),test_match:o(function(c,u){var m,f,D;if(this.options.backtrack_lexer&&(D={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(D.yylloc.range=this.yylloc.range.slice(0))),f=c[0].match(/(?:\r\n?|\n).*/g),f&&(this.yylineno+=f.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:f?f[f.length-1].length-f[f.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+c[0].length},this.yytext+=c[0],this.match+=c[0],this.matches=c,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(c[0].length),this.matched+=c[0],m=this.performAction.call(this,this.yy,this,u,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),m)return m;if(this._backtrack){for(var a in D)this[a]=D[a];return!1}return!1},"test_match"),next:o(function(){if(this.done)return this.EOF;this._input||(this.done=!0);var c,u,m,f;this._more||(this.yytext="",this.match="");for(var D=this._currentRules(),a=0;a<D.length;a++)if(m=this._input.match(this.rules[D[a]]),m&&(!u||m[0].length>u[0].length)){if(u=m,f=a,this.options.backtrack_lexer){if(c=this.test_match(m,D[a]),c!==!1)return c;if(this._backtrack){u=!1;continue}else return!1}else if(!this.options.flex)break}return u?(c=this.test_match(u,D[f]),c!==!1?c:!1):this._input===""?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+`. Unrecognized text.
`+this.showPosition(),{text:"",token:null,line:this.yylineno})},"next"),lex:o(function(){var u=this.next();return u||this.lex()},"lex"),begin:o(function(u){this.conditionStack.push(u)},"begin"),popState:o(function(){var u=this.conditionStack.length-1;return u>0?this.conditionStack.pop():this.conditionStack[0]},"popState"),_currentRules:o(function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},"_currentRules"),topState:o(function(u){return u=this.conditionStack.length-1-Math.abs(u||0),u>=0?this.conditionStack[u]:"INITIAL"},"topState"),pushState:o(function(u){this.begin(u)},"pushState"),stateStackSize:o(function(){return this.conditionStack.length},"stateStackSize"),options:{"case-insensitive":!0},performAction:o(function(u,m,f,D){switch(f){case 0:return this.begin("open_directive"),"open_directive";case 1:return this.begin("acc_title"),31;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),33;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:break;case 9:break;case 10:break;case 11:return 10;case 12:break;case 13:break;case 14:this.begin("href");break;case 15:this.popState();break;case 16:return 43;case 17:this.begin("callbackname");break;case 18:this.popState();break;case 19:this.popState(),this.begin("callbackargs");break;case 20:return 41;case 21:this.popState();break;case 22:return 42;case 23:this.begin("click");break;case 24:this.popState();break;case 25:return 40;case 26:return 4;case 27:return 22;case 28:return 23;case 29:return 24;case 30:return 25;case 31:return 26;case 32:return 28;case 33:return 27;case 34:return 29;case 35:return 12;case 36:return 13;case 37:return 14;case 38:return 15;case 39:return 16;case 40:return 17;case 41:return 18;case 42:return 20;case 43:return 21;case 44:return"date";case 45:return 30;case 46:return"accDescription";case 47:return 36;case 48:return 38;case 49:return 39;case 50:return":";case 51:return 6;case 52:return"INVALID"}},"anonymous"),rules:[/^(?:%%\{)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:%%(?!\{)*[^\n]*)/i,/^(?:[^\}]%%*[^\n]*)/i,/^(?:%%*[^\n]*[\n]*)/i,/^(?:[\n]+)/i,/^(?:\s+)/i,/^(?:%[^\n]*)/i,/^(?:href[\s]+["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:call[\s]+)/i,/^(?:\([\s]*\))/i,/^(?:\()/i,/^(?:[^(]*)/i,/^(?:\))/i,/^(?:[^)]*)/i,/^(?:click[\s]+)/i,/^(?:[\s\n])/i,/^(?:[^\s\n]*)/i,/^(?:gantt\b)/i,/^(?:dateFormat\s[^#\n;]+)/i,/^(?:inclusiveEndDates\b)/i,/^(?:topAxis\b)/i,/^(?:axisFormat\s[^#\n;]+)/i,/^(?:tickInterval\s[^#\n;]+)/i,/^(?:includes\s[^#\n;]+)/i,/^(?:excludes\s[^#\n;]+)/i,/^(?:todayMarker\s[^\n;]+)/i,/^(?:weekday\s+monday\b)/i,/^(?:weekday\s+tuesday\b)/i,/^(?:weekday\s+wednesday\b)/i,/^(?:weekday\s+thursday\b)/i,/^(?:weekday\s+friday\b)/i,/^(?:weekday\s+saturday\b)/i,/^(?:weekday\s+sunday\b)/i,/^(?:weekend\s+friday\b)/i,/^(?:weekend\s+saturday\b)/i,/^(?:\d\d\d\d-\d\d-\d\d\b)/i,/^(?:title\s[^\n]+)/i,/^(?:accDescription\s[^#\n;]+)/i,/^(?:section\s[^\n]+)/i,/^(?:[^:\n]+)/i,/^(?::[^#\n;]+)/i,/^(?::)/i,/^(?:$)/i,/^(?:.)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},callbackargs:{rules:[21,22],inclusive:!1},callbackname:{rules:[18,19,20],inclusive:!1},href:{rules:[15,16],inclusive:!1},click:{rules:[24,25],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,17,23,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52],inclusive:!0}}};return _}();b.lexer=x;function k(){this.yy={}}return o(k,"Parser"),k.prototype=b,b.Parser=k,new k}();Ot.parser=Ot;var Sn=Ot;U.extend(Cn);U.extend(ln);U.extend(cn);var le={friday:5,saturday:6},tt="",Gt="",Xt=void 0,jt="",yt=[],gt=[],qt=new Map,Ut=[],St=[],ht="",Zt="",Se=["active","done","crit","milestone"],Qt=[],pt=!1,Kt=!1,$t="sunday",Et="saturday",Pt=0,En=o(function(){Ut=[],St=[],ht="",Qt=[],wt=0,Rt=void 0,_t=void 0,H=[],tt="",Gt="",Zt="",Xt=void 0,jt="",yt=[],gt=[],pt=!1,Kt=!1,Pt=0,qt=new Map,He(),$t="sunday",Et="saturday"},"clear"),Mn=o(function(t){Gt=t},"setAxisFormat"),An=o(function(){return Gt},"getAxisFormat"),In=o(function(t){Xt=t},"setTickInterval"),Fn=o(function(){return Xt},"getTickInterval"),Ln=o(function(t){jt=t},"setTodayMarker"),Yn=o(function(){return jt},"getTodayMarker"),Wn=o(function(t){tt=t},"setDateFormat"),Vn=o(function(){pt=!0},"enableInclusiveEndDates"),zn=o(function(){return pt},"endDatesAreInclusive"),On=o(function(){Kt=!0},"enableTopAxis"),Pn=o(function(){return Kt},"topAxisEnabled"),Nn=o(function(t){Zt=t},"setDisplayMode"),Rn=o(function(){return Zt},"getDisplayMode"),Bn=o(function(){return tt},"getDateFormat"),Hn=o(function(t){yt=t.toLowerCase().split(/[\s,]+/)},"setIncludes"),Gn=o(function(){return yt},"getIncludes"),Xn=o(function(t){gt=t.toLowerCase().split(/[\s,]+/)},"setExcludes"),jn=o(function(){return gt},"getExcludes"),qn=o(function(){return qt},"getLinks"),Un=o(function(t){ht=t,Ut.push(t)},"addSection"),Zn=o(function(){return Ut},"getSections"),Qn=o(function(){let t=ue();const e=10;let n=0;for(;!t&&n<e;)t=ue(),n++;return St=H,St},"getTasks"),Ee=o(function(t,e,n,r){return r.includes(t.format(e.trim()))?!1:n.includes("weekends")&&(t.isoWeekday()===le[Et]||t.isoWeekday()===le[Et]+1)||n.includes(t.format("dddd").toLowerCase())?!0:n.includes(t.format(e.trim()))},"isInvalidDate"),Kn=o(function(t){$t=t},"setWeekday"),$n=o(function(){return $t},"getWeekday"),Jn=o(function(t){Et=t},"setWeekend"),Me=o(function(t,e,n,r){if(!n.length||t.manualEndTime)return;let s;t.startTime instanceof Date?s=U(t.startTime):s=U(t.startTime,e,!0),s=s.add(1,"d");let h;t.endTime instanceof Date?h=U(t.endTime):h=U(t.endTime,e,!0);const[l,T]=tr(s,h,e,n,r);t.endTime=l.toDate(),t.renderEndTime=T},"checkTaskDates"),tr=o(function(t,e,n,r,s){let h=!1,l=null;for(;t<=e;)h||(l=e.toDate()),h=Ee(t,n,r,s),h&&(e=e.add(1,"d")),t=t.add(1,"d");return[e,l]},"fixTaskDates"),Nt=o(function(t,e,n){n=n.trim();const s=/^after\s+(?<ids>[\d\w- ]+)/.exec(n);if(s!==null){let l=null;for(const E of s.groups.ids.split(" ")){let S=at(E);S!==void 0&&(!l||S.endTime>l.endTime)&&(l=S)}if(l)return l.endTime;const T=new Date;return T.setHours(0,0,0,0),T}let h=U(n,e.trim(),!0);if(h.isValid())return h.toDate();{Dt.debug("Invalid date:"+n),Dt.debug("With date format:"+e.trim());const l=new Date(n);if(l===void 0||isNaN(l.getTime())||l.getFullYear()<-1e4||l.getFullYear()>1e4)throw new Error("Invalid date:"+n);return l}},"getStartDate"),Ae=o(function(t){const e=/^(\d+(?:\.\d+)?)([Mdhmswy]|ms)$/.exec(t.trim());return e!==null?[Number.parseFloat(e[1]),e[2]]:[NaN,"ms"]},"parseDuration"),Ie=o(function(t,e,n,r=!1){n=n.trim();const h=/^until\s+(?<ids>[\d\w- ]+)/.exec(n);if(h!==null){let g=null;for(const C of h.groups.ids.split(" ")){let p=at(C);p!==void 0&&(!g||p.startTime<g.startTime)&&(g=p)}if(g)return g.startTime;const I=new Date;return I.setHours(0,0,0,0),I}let l=U(n,e.trim(),!0);if(l.isValid())return r&&(l=l.add(1,"d")),l.toDate();let T=U(t);const[E,S]=Ae(n);if(!Number.isNaN(E)){const g=T.add(E,S);g.isValid()&&(T=g)}return T.toDate()},"getEndDate"),wt=0,ft=o(function(t){return t===void 0?(wt=wt+1,"task"+wt):t},"parseId"),er=o(function(t,e){let n;e.substr(0,1)===":"?n=e.substr(1,e.length):n=e;const r=n.split(","),s={};Jt(r,s,Se);for(let l=0;l<r.length;l++)r[l]=r[l].trim();let h="";switch(r.length){case 1:s.id=ft(),s.startTime=t.endTime,h=r[0];break;case 2:s.id=ft(),s.startTime=Nt(void 0,tt,r[0]),h=r[1];break;case 3:s.id=ft(r[0]),s.startTime=Nt(void 0,tt,r[1]),h=r[2];break}return h&&(s.endTime=Ie(s.startTime,tt,h,pt),s.manualEndTime=U(h,"YYYY-MM-DD",!0).isValid(),Me(s,tt,gt,yt)),s},"compileData"),nr=o(function(t,e){let n;e.substr(0,1)===":"?n=e.substr(1,e.length):n=e;const r=n.split(","),s={};Jt(r,s,Se);for(let h=0;h<r.length;h++)r[h]=r[h].trim();switch(r.length){case 1:s.id=ft(),s.startTime={type:"prevTaskEnd",id:t},s.endTime={data:r[0]};break;case 2:s.id=ft(),s.startTime={type:"getStartDate",startData:r[0]},s.endTime={data:r[1]};break;case 3:s.id=ft(r[0]),s.startTime={type:"getStartDate",startData:r[1]},s.endTime={data:r[2]};break}return s},"parseData"),Rt,_t,H=[],Fe={},rr=o(function(t,e){const n={section:ht,type:ht,processed:!1,manualEndTime:!1,renderEndTime:null,raw:{data:e},task:t,classes:[]},r=nr(_t,e);n.raw.startTime=r.startTime,n.raw.endTime=r.endTime,n.id=r.id,n.prevTaskId=_t,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,n.order=Pt,Pt++;const s=H.push(n);_t=n.id,Fe[n.id]=s-1},"addTask"),at=o(function(t){const e=Fe[t];return H[e]},"findTaskById"),ir=o(function(t,e){const n={section:ht,type:ht,description:t,task:t,classes:[]},r=er(Rt,e);n.startTime=r.startTime,n.endTime=r.endTime,n.id=r.id,n.active=r.active,n.done=r.done,n.crit=r.crit,n.milestone=r.milestone,Rt=n,St.push(n)},"addTaskOrg"),ue=o(function(){const t=o(function(n){const r=H[n];let s="";switch(H[n].raw.startTime.type){case"prevTaskEnd":{const h=at(r.prevTaskId);r.startTime=h.endTime;break}case"getStartDate":s=Nt(void 0,tt,H[n].raw.startTime.startData),s&&(H[n].startTime=s);break}return H[n].startTime&&(H[n].endTime=Ie(H[n].startTime,tt,H[n].raw.endTime.data,pt),H[n].endTime&&(H[n].processed=!0,H[n].manualEndTime=U(H[n].raw.endTime.data,"YYYY-MM-DD",!0).isValid(),Me(H[n],tt,gt,yt))),H[n].processed},"compileTask");let e=!0;for(const[n,r]of H.entries())t(n),e=e&&r.processed;return e},"compileTasks"),sr=o(function(t,e){let n=e;ut().securityLevel!=="loose"&&(n=Ge(e)),t.split(",").forEach(function(r){at(r)!==void 0&&(Ye(r,()=>{window.open(n,"_self")}),qt.set(r,n))}),Le(t,"clickable")},"setLink"),Le=o(function(t,e){t.split(",").forEach(function(n){let r=at(n);r!==void 0&&r.classes.push(e)})},"setClass"),ar=o(function(t,e,n){if(ut().securityLevel!=="loose"||e===void 0)return;let r=[];if(typeof n=="string"){r=n.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);for(let h=0;h<r.length;h++){let l=r[h].trim();l.startsWith('"')&&l.endsWith('"')&&(l=l.substr(1,l.length-2)),r[h]=l}}r.length===0&&r.push(t),at(t)!==void 0&&Ye(t,()=>{Ke.runFunc(e,...r)})},"setClickFun"),Ye=o(function(t,e){Qt.push(function(){const n=document.querySelector(`[id="${t}"]`);n!==null&&n.addEventListener("click",function(){e()})},function(){const n=document.querySelector(`[id="${t}-text"]`);n!==null&&n.addEventListener("click",function(){e()})})},"pushFun"),cr=o(function(t,e,n){t.split(",").forEach(function(r){ar(r,e,n)}),Le(t,"clickable")},"setClickEvent"),or=o(function(t){Qt.forEach(function(e){e(t)})},"bindFunctions"),lr={getConfig:o(()=>ut().gantt,"getConfig"),clear:En,setDateFormat:Wn,getDateFormat:Bn,enableInclusiveEndDates:Vn,endDatesAreInclusive:zn,enableTopAxis:On,topAxisEnabled:Pn,setAxisFormat:Mn,getAxisFormat:An,setTickInterval:In,getTickInterval:Fn,setTodayMarker:Ln,getTodayMarker:Yn,setAccTitle:ze,getAccTitle:Oe,setDiagramTitle:Pe,getDiagramTitle:Ne,setDisplayMode:Nn,getDisplayMode:Rn,setAccDescription:Re,getAccDescription:Be,addSection:Un,getSections:Zn,getTasks:Qn,addTask:rr,findTaskById:at,addTaskOrg:ir,setIncludes:Hn,getIncludes:Gn,setExcludes:Xn,getExcludes:jn,setClickEvent:cr,setLink:sr,getLinks:qn,bindFunctions:or,parseDuration:Ae,isInvalidDate:Ee,setWeekday:Kn,getWeekday:$n,setWeekend:Jn};function Jt(t,e,n){let r=!0;for(;r;)r=!1,n.forEach(function(s){const h="^\\s*"+s+"\\s*$",l=new RegExp(h);t[0].match(l)&&(e[s]=!0,t.shift(1),r=!0)})}o(Jt,"getTaskTags");var ur=o(function(){Dt.debug("Something is calling, setConf, remove the call")},"setConf"),de={monday:$e,tuesday:Je,wednesday:tn,thursday:en,friday:nn,saturday:rn,sunday:sn},dr=o((t,e)=>{let n=[...t].map(()=>-1/0),r=[...t].sort((h,l)=>h.startTime-l.startTime||h.order-l.order),s=0;for(const h of r)for(let l=0;l<n.length;l++)if(h.startTime>=n[l]){n[l]=h.endTime,h.order=l+e,l>s&&(s=l);break}return s},"getMaxIntersections"),nt,fr=o(function(t,e,n,r){const s=ut().gantt,h=ut().securityLevel;let l;h==="sandbox"&&(l=bt("#i"+e));const T=h==="sandbox"?bt(l.nodes()[0].contentDocument.body):bt("body"),E=h==="sandbox"?l.nodes()[0].contentDocument:document,S=E.getElementById(e);nt=S.parentElement.offsetWidth,nt===void 0&&(nt=1200),s.useWidth!==void 0&&(nt=s.useWidth);const g=r.db.getTasks();let I=[];for(const y of g)I.push(y.type);I=O(I);const C={};let p=2*s.topPadding;if(r.db.getDisplayMode()==="compact"||s.displayMode==="compact"){const y={};for(const b of g)y[b.section]===void 0?y[b.section]=[b]:y[b.section].push(b);let w=0;for(const b of Object.keys(y)){const x=dr(y[b],w)+1;w+=x,p+=x*(s.barHeight+s.barGap),C[b]=x}}else{p+=g.length*(s.barHeight+s.barGap);for(const y of I)C[y]=g.filter(w=>w.type===y).length}S.setAttribute("viewBox","0 0 "+nt+" "+p);const G=T.select(`[id="${e}"]`),F=Xe().domain([je(g,function(y){return y.startTime}),qe(g,function(y){return y.endTime})]).rangeRound([0,nt-s.leftPadding-s.rightPadding]);function v(y,w){const b=y.startTime,x=w.startTime;let k=0;return b>x?k=1:b<x&&(k=-1),k}o(v,"taskCompare"),g.sort(v),M(g,nt,p),Ue(G,p,nt,s.useMaxWidth),G.append("text").text(r.db.getDiagramTitle()).attr("x",nt/2).attr("y",s.titleTopMargin).attr("class","titleText");function M(y,w,b){const x=s.barHeight,k=x+s.barGap,_=s.topPadding,c=s.leftPadding,u=Ze().domain([0,I.length]).range(["#00B9FA","#F95002"]).interpolate(_n);Y(k,_,c,w,b,y,r.db.getExcludes(),r.db.getIncludes()),R(c,_,w,b),L(y,k,_,c,x,u,w),N(k,_),X(c,_,w,b)}o(M,"makeGantt");function L(y,w,b,x,k,_,c){const m=[...new Set(y.map(d=>d.order))].map(d=>y.find(i=>i.order===d));G.append("g").selectAll("rect").data(m).enter().append("rect").attr("x",0).attr("y",function(d,i){return i=d.order,i*w+b-2}).attr("width",function(){return c-s.rightPadding/2}).attr("height",w).attr("class",function(d){for(const[i,W]of I.entries())if(d.type===W)return"section section"+i%s.numberSectionStyles;return"section section0"});const f=G.append("g").selectAll("rect").data(y).enter(),D=r.db.getLinks();if(f.append("rect").attr("id",function(d){return d.id}).attr("rx",3).attr("ry",3).attr("x",function(d){return d.milestone?F(d.startTime)+x+.5*(F(d.endTime)-F(d.startTime))-.5*k:F(d.startTime)+x}).attr("y",function(d,i){return i=d.order,i*w+b}).attr("width",function(d){return d.milestone?k:F(d.renderEndTime||d.endTime)-F(d.startTime)}).attr("height",k).attr("transform-origin",function(d,i){return i=d.order,(F(d.startTime)+x+.5*(F(d.endTime)-F(d.startTime))).toString()+"px "+(i*w+b+.5*k).toString()+"px"}).attr("class",function(d){const i="task";let W="";d.classes.length>0&&(W=d.classes.join(" "));let A=0;for(const[j,z]of I.entries())d.type===z&&(A=j%s.numberSectionStyles);let V="";return d.active?d.crit?V+=" activeCrit":V=" active":d.done?d.crit?V=" doneCrit":V=" done":d.crit&&(V+=" crit"),V.length===0&&(V=" task"),d.milestone&&(V=" milestone "+V),V+=A,V+=" "+W,i+V}),f.append("text").attr("id",function(d){return d.id+"-text"}).text(function(d){return d.task}).attr("font-size",s.fontSize).attr("x",function(d){let i=F(d.startTime),W=F(d.renderEndTime||d.endTime);d.milestone&&(i+=.5*(F(d.endTime)-F(d.startTime))-.5*k),d.milestone&&(W=i+k);const A=this.getBBox().width;return A>W-i?W+A+1.5*s.leftPadding>c?i+x-5:W+x+5:(W-i)/2+i+x}).attr("y",function(d,i){return i=d.order,i*w+s.barHeight/2+(s.fontSize/2-2)+b}).attr("text-height",k).attr("class",function(d){const i=F(d.startTime);let W=F(d.endTime);d.milestone&&(W=i+k);const A=this.getBBox().width;let V="";d.classes.length>0&&(V=d.classes.join(" "));let j=0;for(const[P,K]of I.entries())d.type===K&&(j=P%s.numberSectionStyles);let z="";return d.active&&(d.crit?z="activeCritText"+j:z="activeText"+j),d.done?d.crit?z=z+" doneCritText"+j:z=z+" doneText"+j:d.crit&&(z=z+" critText"+j),d.milestone&&(z+=" milestoneText"),A>W-i?W+A+1.5*s.leftPadding>c?V+" taskTextOutsideLeft taskTextOutside"+j+" "+z:V+" taskTextOutsideRight taskTextOutside"+j+" "+z+" width-"+A:V+" taskText taskText"+j+" "+z+" width-"+A}),ut().securityLevel==="sandbox"){let d;d=bt("#i"+e);const i=d.nodes()[0].contentDocument;f.filter(function(W){return D.has(W.id)}).each(function(W){var A=i.querySelector("#"+W.id),V=i.querySelector("#"+W.id+"-text");const j=A.parentNode;var z=i.createElement("a");z.setAttribute("xlink:href",D.get(W.id)),z.setAttribute("target","_top"),j.appendChild(z),z.appendChild(A),z.appendChild(V)})}}o(L,"drawRects");function Y(y,w,b,x,k,_,c,u){if(c.length===0&&u.length===0)return;let m,f;for(const{startTime:A,endTime:V}of _)(m===void 0||A<m)&&(m=A),(f===void 0||V>f)&&(f=V);if(!m||!f)return;if(U(f).diff(U(m),"year")>5){Dt.warn("The difference between the min and max time is more than 5 years. This will cause performance issues. Skipping drawing exclude days.");return}const D=r.db.getDateFormat(),a=[];let d=null,i=U(m);for(;i.valueOf()<=f;)r.db.isInvalidDate(i,D,c,u)?d?d.end=i:d={start:i,end:i}:d&&(a.push(d),d=null),i=i.add(1,"d");G.append("g").selectAll("rect").data(a).enter().append("rect").attr("id",function(A){return"exclude-"+A.start.format("YYYY-MM-DD")}).attr("x",function(A){return F(A.start)+b}).attr("y",s.gridLineStartPadding).attr("width",function(A){const V=A.end.add(1,"day");return F(V)-F(A.start)}).attr("height",k-w-s.gridLineStartPadding).attr("transform-origin",function(A,V){return(F(A.start)+b+.5*(F(A.end)-F(A.start))).toString()+"px "+(V*y+.5*k).toString()+"px"}).attr("class","exclude-range")}o(Y,"drawExcludeDays");function R(y,w,b,x){let k=gn(F).tickSize(-x+w+s.gridLineStartPadding).tickFormat(ee(r.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));const c=/^([1-9]\d*)(millisecond|second|minute|hour|day|week|month)$/.exec(r.db.getTickInterval()||s.tickInterval);if(c!==null){const u=c[1],m=c[2],f=r.db.getWeekday()||s.weekday;switch(m){case"millisecond":k.ticks(ce.every(u));break;case"second":k.ticks(ae.every(u));break;case"minute":k.ticks(se.every(u));break;case"hour":k.ticks(ie.every(u));break;case"day":k.ticks(re.every(u));break;case"week":k.ticks(de[f].every(u));break;case"month":k.ticks(ne.every(u));break}}if(G.append("g").attr("class","grid").attr("transform","translate("+y+", "+(x-50)+")").call(k).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10).attr("dy","1em"),r.db.topAxisEnabled()||s.topAxis){let u=yn(F).tickSize(-x+w+s.gridLineStartPadding).tickFormat(ee(r.db.getAxisFormat()||s.axisFormat||"%Y-%m-%d"));if(c!==null){const m=c[1],f=c[2],D=r.db.getWeekday()||s.weekday;switch(f){case"millisecond":u.ticks(ce.every(m));break;case"second":u.ticks(ae.every(m));break;case"minute":u.ticks(se.every(m));break;case"hour":u.ticks(ie.every(m));break;case"day":u.ticks(re.every(m));break;case"week":u.ticks(de[D].every(m));break;case"month":u.ticks(ne.every(m));break}}G.append("g").attr("class","grid").attr("transform","translate("+y+", "+w+")").call(u).selectAll("text").style("text-anchor","middle").attr("fill","#000").attr("stroke","none").attr("font-size",10)}}o(R,"makeGrid");function N(y,w){let b=0;const x=Object.keys(C).map(k=>[k,C[k]]);G.append("g").selectAll("text").data(x).enter().append(function(k){const _=k[0].split(Qe.lineBreakRegex),c=-(_.length-1)/2,u=E.createElementNS("http://www.w3.org/2000/svg","text");u.setAttribute("dy",c+"em");for(const[m,f]of _.entries()){const D=E.createElementNS("http://www.w3.org/2000/svg","tspan");D.setAttribute("alignment-baseline","central"),D.setAttribute("x","10"),m>0&&D.setAttribute("dy","1em"),D.textContent=f,u.appendChild(D)}return u}).attr("x",10).attr("y",function(k,_){if(_>0)for(let c=0;c<_;c++)return b+=x[_-1][1],k[1]*y/2+b*y+w;else return k[1]*y/2+w}).attr("font-size",s.sectionFontSize).attr("class",function(k){for(const[_,c]of I.entries())if(k[0]===c)return"sectionTitle sectionTitle"+_%s.numberSectionStyles;return"sectionTitle"})}o(N,"vertLabels");function X(y,w,b,x){const k=r.db.getTodayMarker();if(k==="off")return;const _=G.append("g").attr("class","today"),c=new Date,u=_.append("line");u.attr("x1",F(c)+y).attr("x2",F(c)+y).attr("y1",s.titleTopMargin).attr("y2",x-s.titleTopMargin).attr("class","today"),k!==""&&u.attr("style",k.replace(/,/g,";"))}o(X,"drawToday");function O(y){const w={},b=[];for(let x=0,k=y.length;x<k;++x)Object.prototype.hasOwnProperty.call(w,y[x])||(w[y[x]]=!0,b.push(y[x]));return b}o(O,"checkUnique")},"draw"),hr={setConf:ur,draw:fr},mr=o(t=>`
  .mermaid-main-font {
        font-family: ${t.fontFamily};
  }

  .exclude-range {
    fill: ${t.excludeBkgColor};
  }

  .section {
    stroke: none;
    opacity: 0.2;
  }

  .section0 {
    fill: ${t.sectionBkgColor};
  }

  .section2 {
    fill: ${t.sectionBkgColor2};
  }

  .section1,
  .section3 {
    fill: ${t.altSectionBkgColor};
    opacity: 0.2;
  }

  .sectionTitle0 {
    fill: ${t.titleColor};
  }

  .sectionTitle1 {
    fill: ${t.titleColor};
  }

  .sectionTitle2 {
    fill: ${t.titleColor};
  }

  .sectionTitle3 {
    fill: ${t.titleColor};
  }

  .sectionTitle {
    text-anchor: start;
    font-family: ${t.fontFamily};
  }


  /* Grid and axis */

  .grid .tick {
    stroke: ${t.gridColor};
    opacity: 0.8;
    shape-rendering: crispEdges;
  }

  .grid .tick text {
    font-family: ${t.fontFamily};
    fill: ${t.textColor};
  }

  .grid path {
    stroke-width: 0;
  }


  /* Today line */

  .today {
    fill: none;
    stroke: ${t.todayLineColor};
    stroke-width: 2px;
  }


  /* Task styling */

  /* Default task */

  .task {
    stroke-width: 2;
  }

  .taskText {
    text-anchor: middle;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideRight {
    fill: ${t.taskTextDarkColor};
    text-anchor: start;
    font-family: ${t.fontFamily};
  }

  .taskTextOutsideLeft {
    fill: ${t.taskTextDarkColor};
    text-anchor: end;
  }


  /* Special case clickable */

  .task.clickable {
    cursor: pointer;
  }

  .taskText.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideLeft.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }

  .taskTextOutsideRight.clickable {
    cursor: pointer;
    fill: ${t.taskTextClickableColor} !important;
    font-weight: bold;
  }


  /* Specific task settings for the sections*/

  .taskText0,
  .taskText1,
  .taskText2,
  .taskText3 {
    fill: ${t.taskTextColor};
  }

  .task0,
  .task1,
  .task2,
  .task3 {
    fill: ${t.taskBkgColor};
    stroke: ${t.taskBorderColor};
  }

  .taskTextOutside0,
  .taskTextOutside2
  {
    fill: ${t.taskTextOutsideColor};
  }

  .taskTextOutside1,
  .taskTextOutside3 {
    fill: ${t.taskTextOutsideColor};
  }


  /* Active task */

  .active0,
  .active1,
  .active2,
  .active3 {
    fill: ${t.activeTaskBkgColor};
    stroke: ${t.activeTaskBorderColor};
  }

  .activeText0,
  .activeText1,
  .activeText2,
  .activeText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Completed task */

  .done0,
  .done1,
  .done2,
  .done3 {
    stroke: ${t.doneTaskBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
  }

  .doneText0,
  .doneText1,
  .doneText2,
  .doneText3 {
    fill: ${t.taskTextDarkColor} !important;
  }


  /* Tasks on the critical line */

  .crit0,
  .crit1,
  .crit2,
  .crit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.critBkgColor};
    stroke-width: 2;
  }

  .activeCrit0,
  .activeCrit1,
  .activeCrit2,
  .activeCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.activeTaskBkgColor};
    stroke-width: 2;
  }

  .doneCrit0,
  .doneCrit1,
  .doneCrit2,
  .doneCrit3 {
    stroke: ${t.critBorderColor};
    fill: ${t.doneTaskBkgColor};
    stroke-width: 2;
    cursor: pointer;
    shape-rendering: crispEdges;
  }

  .milestone {
    transform: rotate(45deg) scale(0.8,0.8);
  }

  .milestoneText {
    font-style: italic;
  }
  .doneCritText0,
  .doneCritText1,
  .doneCritText2,
  .doneCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .activeCritText0,
  .activeCritText1,
  .activeCritText2,
  .activeCritText3 {
    fill: ${t.taskTextDarkColor} !important;
  }

  .titleText {
    text-anchor: middle;
    font-size: 18px;
    fill: ${t.titleColor||t.textColor};
    font-family: ${t.fontFamily};
  }
`,"getStyles"),kr=mr,Tr={parser:Sn,db:lr,renderer:hr,styles:kr};export{Tr as diagram};
