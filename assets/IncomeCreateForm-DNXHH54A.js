import{X as E,Y as U,b as v,r as y,Z as m,j as e,V as l}from"./index-G1bMk4i-.js";import{u as A,F as u}from"./FormGenerator-CdnYyCO6.js";import{g as L}from"./incomesTableData-Bez0ag2s.js";import{F as D}from"./FormCreateUpdateBtn-CI6NxxNF.js";import{S as M}from"./PageHeading-CfkJVI-2.js";function X({update:o=!1,disabled:t=!1}){const[p,{isLoading:f}]=E({}),[d,{isLoading:I}]=U({}),n=v(),{register:c,handleSubmit:x,formState:{errors:g},control:i,watch:F}=A(),{isLoading:j,customerFormInputs:S,paymentFormInputs:h,navigate:_,incomeId:b,customerId:N}=L(g,o);async function w(s){const{data:a}=o?await d({id:b,updatedIncome:s,customerId:N}):await p(s);a!=null&&a.error?l.error(o?"Income was not Updated !":"Income was not created !"):(_("/incomes"),l.success(o?"Income updated ! ":"New Income Created !"))}const r=F("total_slices");y.useEffect(()=>{n(r?m(Number(r)):m(0))},[r]);function C(s){console.log(s)}return j?e.jsx(M,{size:"large"}):e.jsx("form",{className:"customer_create_form",onSubmit:x(w,C),children:e.jsx("div",{className:"create_form_container",children:e.jsxs("div",{className:"create_form_box",children:[e.jsx(u,{options:S,register:c,control:i,disableAll:t}),e.jsx(u,{options:h,register:c,control:i,disableAll:t}),t?"":e.jsx(D,{type:"income",isCreating:f,isUpdating:I,update:o})]})})})}export{X as I};
