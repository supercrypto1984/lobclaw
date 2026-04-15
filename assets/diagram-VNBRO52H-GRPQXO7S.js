import{p as w}from"./chunk-4BMEZGHF-CBKutaea.js";import{V as B,i as S,j as F,B as z,F as P,k as W,l as T,_ as n,x,X as v,Y as D,L as _,a0 as A,y as E}from"./index-xLalZ2B7.js";import{p as L}from"./radar-MK3ICKWK-CMH7xIQ5.js";import"./semi-ui-Clo0ReXi.js";import"./react-core-Dfkx_DNu.js";import"./i18n-PF1yBoM3.js";import"./tools-Uj3RNI36.js";import"./react-components-DhyuYrS4.js";import"./_baseUniq-D1B0c7Ow.js";import"./_basePickBy-C_EISlHT.js";import"./clone-2TXNbWSo.js";var C={packet:[]},h=structuredClone(C),N=B.packet,Y=n(()=>{const t=v({...N,...D().packet});return t.showBits&&(t.paddingY+=10),t},"getConfig"),I=n(()=>h.packet,"getPacket"),M=n(t=>{t.length>0&&h.packet.push(t)},"pushWord"),O=n(()=>{_(),h=structuredClone(C)},"clear"),m={pushWord:M,getPacket:I,getConfig:Y,clear:O,setAccTitle:S,getAccTitle:F,setDiagramTitle:z,getDiagramTitle:P,getAccDescription:W,setAccDescription:T},X=1e4,j=n(t=>{w(t,m);let e=-1,o=[],i=1;const{bitsPerRow:s}=m.getConfig();for(let{start:a,end:r,label:p}of t.blocks){if(r&&r<a)throw new Error(`Packet block ${a} - ${r} is invalid. End must be greater than start.`);if(a!==e+1)throw new Error(`Packet block ${a} - ${r??a} is not contiguous. It should start from ${e+1}.`);for(e=r??a,x.debug(`Packet block ${a} - ${e} with label ${p}`);o.length<=s+1&&m.getPacket().length<X;){const[b,c]=G({start:a,end:r,label:p},i,s);if(o.push(b),b.end+1===i*s&&(m.pushWord(o),o=[],i++),!c)break;({start:a,end:r,label:p}=c)}}m.pushWord(o)},"populate"),G=n((t,e,o)=>{if(t.end===void 0&&(t.end=t.start),t.start>t.end)throw new Error(`Block start ${t.start} is greater than block end ${t.end}.`);return t.end+1<=e*o?[t,void 0]:[{start:t.start,end:e*o-1,label:t.label},{start:e*o,end:t.end,label:t.label}]},"getNextFittingBlock"),H={parse:n(async t=>{const e=await L("packet",t);x.debug(e),j(e)},"parse")},K=n((t,e,o,i)=>{const s=i.db,a=s.getConfig(),{rowHeight:r,paddingY:p,bitWidth:b,bitsPerRow:c}=a,u=s.getPacket(),l=s.getDiagramTitle(),g=r+p,d=g*(u.length+1)-(l?0:r),k=b*c+2,f=A(e);f.attr("viewbox",`0 0 ${k} ${d}`),E(f,d,k,a.useMaxWidth);for(const[y,$]of u.entries())R(f,$,y,a);f.append("text").text(l).attr("x",k/2).attr("y",d-g/2).attr("dominant-baseline","middle").attr("text-anchor","middle").attr("class","packetTitle")},"draw"),R=n((t,e,o,{rowHeight:i,paddingX:s,paddingY:a,bitWidth:r,bitsPerRow:p,showBits:b})=>{const c=t.append("g"),u=o*(i+a)+a;for(const l of e){const g=l.start%p*r+1,d=(l.end-l.start+1)*r-s;if(c.append("rect").attr("x",g).attr("y",u).attr("width",d).attr("height",i).attr("class","packetBlock"),c.append("text").attr("x",g+d/2).attr("y",u+i/2).attr("class","packetLabel").attr("dominant-baseline","middle").attr("text-anchor","middle").text(l.label),!b)continue;const k=l.end===l.start,f=u-2;c.append("text").attr("x",g+(k?d/2:0)).attr("y",f).attr("class","packetByte start").attr("dominant-baseline","auto").attr("text-anchor",k?"middle":"start").text(l.start),k||c.append("text").attr("x",g+d).attr("y",f).attr("class","packetByte end").attr("dominant-baseline","auto").attr("text-anchor","end").text(l.end)}},"drawWord"),U={draw:K},V={byteFontSize:"10px",startByteColor:"black",endByteColor:"black",labelColor:"black",labelFontSize:"12px",titleColor:"black",titleFontSize:"14px",blockStrokeColor:"black",blockStrokeWidth:"1",blockFillColor:"#efefef"},q=n(({packet:t}={})=>{const e=v(V,t);return`
	.packetByte {
		font-size: ${e.byteFontSize};
	}
	.packetByte.start {
		fill: ${e.startByteColor};
	}
	.packetByte.end {
		fill: ${e.endByteColor};
	}
	.packetLabel {
		fill: ${e.labelColor};
		font-size: ${e.labelFontSize};
	}
	.packetTitle {
		fill: ${e.titleColor};
		font-size: ${e.titleFontSize};
	}
	.packetBlock {
		stroke: ${e.blockStrokeColor};
		stroke-width: ${e.blockStrokeWidth};
		fill: ${e.blockFillColor};
	}
	`},"styles"),st={parser:H,db:m,renderer:U,styles:q};export{st as diagram};
