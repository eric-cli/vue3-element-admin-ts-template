import{a as C,r as f,o as _,j as m,l as E,h as b,w as N,M as S,O as y,V as M,F as O,v as V,b as z,Y as I,Z as L}from"./vendor.a1ba0c3f.js";import{r as R,u as h}from"./xlsx.5331d5b0.js";import{_ as $,f as A}from"./index.a4f62dd8.js";const H=S(" Drop excel file here or "),K=S(" Browse "),W=C({props:{beforeUpload:{type:Function,default(){return()=>{}}},onSuccess:{type:Function,default(){return()=>{}}}},setup(D){const r=D,s=f(null),n=f(!1),p=f({header:null,results:null}),l=({header:e,results:t})=>{p.value.header=e,p.value.results=t,r.onSuccess&&r.onSuccess(p.value)},c=e=>{e.stopPropagation(),e.preventDefault(),e.dataTransfer.dropEffect="copy"},v=()=>{s.value.click()},g=e=>{const t=[],a=h.decode_range(e["!ref"]);let o;const x=a.s.r;for(o=a.s.c;o<=a.e.c;o+=1){const d=e[h.encode_cell({c:o,r:x})];let i=`UNKNOWN ${o}`;d&&d.t&&(i=h.format_cell(d)),t.push(i)}return t},u=e=>(n.value=!0,new Promise((t,a)=>{const o=new FileReader;o.onload=x=>{var U;const d=(U=x.target)==null?void 0:U.result,i=R(d,{type:"array"}),F=i.SheetNames[0],w=i.Sheets[F],P=g(w),T=h.sheet_to_json(w);l({header:P,results:T}),n.value=!1,t(!0)},o.readAsArrayBuffer(e)})),k=e=>{if(s.value=null,!r.beforeUpload){u(e);return}r.beforeUpload(e)&&u(e)},B=e=>{if(e.stopPropagation(),e.preventDefault(),n.value)return;const{files:t}=e.dataTransfer;if(t.length!==1)return y.error("Only support uploading one file!"),!1;const a=t[0];if(!A(a))return y.error("Only supports upload .xlsx, .xls, .csv suffix files"),!1;k(a),e.stopPropagation(),e.preventDefault()},j=e=>{const{files:t}=e.target,a=t[0];!a||k(a)};return(e,t)=>{const a=M;return _(),m("div",null,[E("input",{ref_key:"excelUploadInput",ref:s,class:"excel-upload-input",type:"file",accept:".xlsx, .xls",onChange:j},null,544),E("div",{class:"drop",onDrop:B,onDragover:c,onDragenter:c},[H,b(a,{loading:n.value,style:{"margin-left":"16px"},size:"small",type:"primary",onClick:v},{default:N(()=>[K]),_:1},8,["loading"])],32)])}}});var Y=$(W,[["__scopeId","data-v-375a569e"]]);const Z={class:"app-container"},Q=C({setup(D){const r=f([]),s=f([]),n=l=>l.size/1024/1024<1?!0:(y({message:"Please do not upload files larger than 1m in size.",type:"warning"}),!1),p=({results:l,header:c})=>{r.value=l,s.value=c};return(l,c)=>{const v=I,g=L;return _(),m("div",Z,[b(Y,{"on-success":p,"before-upload":n}),b(g,{data:r.value,border:"","highlight-current-row":"",style:{width:"100%","margin-top":"20px"}},{default:N(()=>[(_(!0),m(O,null,V(s.value,u=>(_(),z(v,{key:u,prop:u,label:u},null,8,["prop","label"]))),128))]),_:1},8,["data"])])}}});export{Q as default};
