import{u as f,g as m}from"./useECharts.944a9ac5.js";import{a as l,r as c,D as p,G as y,o as d,j as h,n as _,ah as x,h as g}from"./vendor.25bcfe43.js";import{_ as w}from"./index.df665f3f.js";const b=["id"],S=l({props:{className:{type:String,default:"chart"},width:{type:String,default:"200px"},height:{type:String,default:"200px"}},setup(e){const t=c(null),{setOptions:o}=f(t),n=c(""),s=[],i=[],r=[];for(let a=0;a<50;a+=1)s.push(a),i.push((Math.sin(a/5)*(a/5-10)+a/6)*5),r.push((Math.sin(a/5)*(a/5+10)+a/6)*3);const u={backgroundColor:"#08263a",grid:{left:"5%",right:"5%"},xAxis:[{show:!1,data:s},{show:!1,data:s}],visualMap:{show:!1,min:0,max:50,dimension:0,inRange:{color:["#4a657a","#308e92","#b1cfa5","#f5d69f","#f5898b","#ef5055"]}},yAxis:{axisLine:{show:!1},axisLabel:{color:"#4a657a"},splitLine:{show:!0,lineStyle:{color:"#08263f"}},axisTick:{show:!1}},series:[{name:"back",type:"bar",data:r,z:1,itemStyle:{opacity:.4,borderRadius:5,shadowBlur:3,shadowColor:"#111"}},{name:"Simulate Shadow",type:"line",data:i,z:2,showSymbol:!1,animationDelay:0,animationEasing:"linear",animationDuration:1200,lineStyle:{color:"transparent"},areaStyle:{color:"#08263a",shadowBlur:50,shadowColor:"#000"}},{name:"front",type:"bar",data:i,xAxisIndex:1,z:3,itemStyle:{borderRadius:5}}],animationEasing:"elasticOut",animationEasingUpdate:"elasticOut",animationDelay(a){return a*20},animationDelayUpdate(a){return a*20}};return p(()=>{n.value=m(5,4),y(()=>{o(u)})}),(a,C)=>(d(),h("div",{id:n.value,ref_key:"chartRef",ref:t,class:_(e.className),style:x({height:e.height,width:e.width})},null,14,b))}});const v={class:"chart-container"},k=l({setup(e){return(t,o)=>(d(),h("div",v,[g(S,{height:"100%",width:"100%"})]))}});var M=w(k,[["__scopeId","data-v-1d0e1896"]]);export{M as default};