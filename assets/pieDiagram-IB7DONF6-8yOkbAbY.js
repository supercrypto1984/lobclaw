import{p as j}from"./chunk-4BMEZGHF-CoKbcK9V.js";import{aw as S,ao as z,d2 as U,V as X,B as Z,F as q,i as H,j as J,l as K,k as Q,_ as p,x as F,L as Y,n as tt,X as et,a0 as at,aa as rt,d3 as nt,y as it}from"./index-DVBxPHNz.js";import{p as st}from"./radar-MK3ICKWK-Dhbz8cy9.js";import{d as O}from"./arc-BMEt6qP9.js";import"./semi-ui-Clo0ReXi.js";import"./react-core-Dfkx_DNu.js";import"./i18n-PF1yBoM3.js";import"./tools-Uj3RNI36.js";import"./react-components-DhyuYrS4.js";import"./_baseUniq-_GJElOmg.js";import"./_basePickBy-fLTx0M89.js";import"./clone-hD6oUNs_.js";function ot(t,a){return a<t?-1:a>t?1:a>=t?0:NaN}function lt(t){return t}function ct(){var t=lt,a=ot,m=null,o=S(0),u=S(z),x=S(0);function i(e){var r,l=(e=U(e)).length,d,w,h=0,c=new Array(l),n=new Array(l),v=+o.apply(this,arguments),A=Math.min(z,Math.max(-z,u.apply(this,arguments)-v)),f,T=Math.min(Math.abs(A)/l,x.apply(this,arguments)),$=T*(A<0?-1:1),g;for(r=0;r<l;++r)(g=n[c[r]=r]=+t(e[r],r,e))>0&&(h+=g);for(a!=null?c.sort(function(y,C){return a(n[y],n[C])}):m!=null&&c.sort(function(y,C){return m(e[y],e[C])}),r=0,w=h?(A-l*$)/h:0;r<l;++r,v=f)d=c[r],g=n[d],f=v+(g>0?g*w:0)+$,n[d]={data:e[d],index:r,value:g,startAngle:v,endAngle:f,padAngle:T};return n}return i.value=function(e){return arguments.length?(t=typeof e=="function"?e:S(+e),i):t},i.sortValues=function(e){return arguments.length?(a=e,m=null,i):a},i.sort=function(e){return arguments.length?(m=e,a=null,i):m},i.startAngle=function(e){return arguments.length?(o=typeof e=="function"?e:S(+e),i):o},i.endAngle=function(e){return arguments.length?(u=typeof e=="function"?e:S(+e),i):u},i.padAngle=function(e){return arguments.length?(x=typeof e=="function"?e:S(+e),i):x},i}var P=X.pie,G={sections:new Map,showData:!1,config:P},M=G.sections,W=G.showData,pt=structuredClone(P),ut=p(()=>structuredClone(pt),"getConfig"),dt=p(()=>{M=new Map,W=G.showData,Y()},"clear"),gt=p(({label:t,value:a})=>{M.has(t)||(M.set(t,a),F.debug(`added new section: ${t}, with value: ${a}`))},"addSection"),ft=p(()=>M,"getSections"),mt=p(t=>{W=t},"setShowData"),ht=p(()=>W,"getShowData"),R={getConfig:ut,clear:dt,setDiagramTitle:Z,getDiagramTitle:q,setAccTitle:H,getAccTitle:J,setAccDescription:K,getAccDescription:Q,addSection:gt,getSections:ft,setShowData:mt,getShowData:ht},vt=p((t,a)=>{j(t,a),a.setShowData(t.showData),t.sections.map(a.addSection)},"populateDb"),yt={parse:p(async t=>{const a=await st("pie",t);F.debug(a),vt(a,R)},"parse")},St=p(t=>`
  .pieCircle{
    stroke: ${t.pieStrokeColor};
    stroke-width : ${t.pieStrokeWidth};
    opacity : ${t.pieOpacity};
  }
  .pieOuterCircle{
    stroke: ${t.pieOuterStrokeColor};
    stroke-width: ${t.pieOuterStrokeWidth};
    fill: none;
  }
  .pieTitleText {
    text-anchor: middle;
    font-size: ${t.pieTitleTextSize};
    fill: ${t.pieTitleTextColor};
    font-family: ${t.fontFamily};
  }
  .slice {
    font-family: ${t.fontFamily};
    fill: ${t.pieSectionTextColor};
    font-size:${t.pieSectionTextSize};
    // fill: white;
  }
  .legend text {
    fill: ${t.pieLegendTextColor};
    font-family: ${t.fontFamily};
    font-size: ${t.pieLegendTextSize};
  }
`,"getStyles"),xt=St,wt=p(t=>{const a=[...t.entries()].map(o=>({label:o[0],value:o[1]})).sort((o,u)=>u.value-o.value);return ct().value(o=>o.value)(a)},"createPieArcs"),At=p((t,a,m,o)=>{F.debug(`rendering pie chart
`+t);const u=o.db,x=tt(),i=et(u.getConfig(),x.pie),e=40,r=18,l=4,d=450,w=d,h=at(a),c=h.append("g");c.attr("transform","translate("+w/2+","+d/2+")");const{themeVariables:n}=x;let[v]=rt(n.pieOuterStrokeWidth);v??(v=2);const A=i.textPosition,f=Math.min(w,d)/2-e,T=O().innerRadius(0).outerRadius(f),$=O().innerRadius(f*A).outerRadius(f*A);c.append("circle").attr("cx",0).attr("cy",0).attr("r",f+v/2).attr("class","pieOuterCircle");const g=u.getSections(),y=wt(g),C=[n.pie1,n.pie2,n.pie3,n.pie4,n.pie5,n.pie6,n.pie7,n.pie8,n.pie9,n.pie10,n.pie11,n.pie12],D=nt(C);c.selectAll("mySlices").data(y).enter().append("path").attr("d",T).attr("fill",s=>D(s.data.label)).attr("class","pieCircle");let L=0;g.forEach(s=>{L+=s}),c.selectAll("mySlices").data(y).enter().append("text").text(s=>(s.data.value/L*100).toFixed(0)+"%").attr("transform",s=>"translate("+$.centroid(s)+")").style("text-anchor","middle").attr("class","slice"),c.append("text").text(u.getDiagramTitle()).attr("x",0).attr("y",-400/2).attr("class","pieTitleText");const b=c.selectAll(".legend").data(D.domain()).enter().append("g").attr("class","legend").attr("transform",(s,k)=>{const E=r+l,_=E*D.domain().length/2,B=12*r,V=k*E-_;return"translate("+B+","+V+")"});b.append("rect").attr("width",r).attr("height",r).style("fill",D).style("stroke",D),b.data(y).append("text").attr("x",r+l).attr("y",r-l).text(s=>{const{label:k,value:E}=s.data;return u.getShowData()?`${k} [${E}]`:k});const I=Math.max(...b.selectAll("text").nodes().map(s=>(s==null?void 0:s.getBoundingClientRect().width)??0)),N=w+e+r+l+I;h.attr("viewBox",`0 0 ${N} ${d}`),it(h,d,N,i.useMaxWidth)},"draw"),Ct={draw:At},Nt={parser:yt,db:R,renderer:Ct,styles:xt};export{Nt as diagram};
