import{b as x,D as f,q as y,j as e,E as j,F as w,I as C,J as A,r as h,K as N,M as S,y as I,z as L,N as T,O as k}from"./index-G1bMk4i-.js";import{T as P}from"./TableOuterActions-BNMJrKbU.js";import{M as O}from"./PageHeading-CfkJVI-2.js";import{I as R}from"./index-ZkVQgXEW.js";import{T as U,a as v}from"./TableActionsBtns-BOqXms9g.js";import{P as M}from"./PageActionLayout-DToYMNOa.js";import"./Input-Bx2-HF2Y.js";import"./Table-BducaZyD.js";function D(){const a=x(),[s]=f({}),{selectedRows:n,searchQuery:l}=y(c=>c.categoriesUi),o=w,r=()=>{console.log("no columns to be hided")},d=()=>{a(C())},i={left:["search","delete"],right:["create"]};return e.jsx(P,{deleteAction:s,resetSelectedRows:o,handleShowColumns:r,selectedRows:n,actionsOptions:i,createAction:d,where:"Categories",onSearch:j})}function E(){const a=x(),{createFormIsOpen:s}=y(g=>g.categoriesUi),[n,{isLoading:l,error:o}]=A({}),[r,d]=h.useState(""),[i,c]=h.useState(!1),u=()=>{r.length===0?(c(!0),setTimeout(()=>{c(!1)},2e3)):(n(r),setTimeout(()=>{a(C())},500))},p=()=>{a(C())};return e.jsx(O,{title:"Create Category",open:s,onOk:u,onCancel:p,centered:!0,footer:[e.jsx("button",{className:"table_row_action_btn update_modal_btn create_btn_modal",onClick:u,disabled:l,children:l?"Creating ... ":"Create"})],children:e.jsxs("div",{className:"updating_row_form",children:[e.jsx(R,{type:"text",placeholder:"enter new name ... ",name:"newName",value:r,onChange:g=>d(g.target.value),status:i?"error":""}),i?e.jsx("p",{className:"modal_update_error_msg",children:"New Category cannot be empty !"}):""]})})}const F=(a,s,n)=>s==="prev"?e.jsxs("p",{className:"pagination_text",children:[" ",e.jsx(I,{}),e.jsx("span",{children:"Previous"})]}):s==="next"?e.jsxs("p",{className:"pagination_text",children:[" ",e.jsx(L,{}),e.jsx("span",{children:"Next"})]}):n;function Q(){const a=x(),{currentPage:s,pageSize:n,searchQuery:l}=y(t=>t.categoriesUi),{data:o,isLoading:r}=N({currentPage:s,pageSize:n,searchQuery:l}),[d]=f({}),[i,{isLoading:c}]=S({}),u=(o==null?void 0:o.data)||[];h.useEffect(()=>{a(j(""))},[]);const p=[{title:"Id",dataIndex:"id",key:"id",fixed:"left",width:50},{title:"Category",dataIndex:"category",key:"category",width:250,align:"left"},{title:"Date Created",dataIndex:"created_at",key:"created_at",render:t=>new Intl.DateTimeFormat("en-CA").format(new Date(t))},{title:"Actions",key:"actions",width:140,render:t=>e.jsx(v,{id:t.id,deleteAction:d,modalTitle:"Update training : ",defaultValue:t.category,isLoading:c,updateAction:i}),align:"center"}],g=o==null?void 0:o.count,_={onChange:(t,m)=>{a(w(m))},getCheckboxProps:t=>({disabled:t.name==="Disabled User",name:t.name})},b=(t,m)=>{a(T(t)),m&&a(k(m))};return e.jsx("div",{className:"table_container training_table",children:e.jsx(U,{totalData:g,handlePagination:b,currentPage:s,pageSize:n,itemRender:F,columns:p,rowSelection:_,data:u,isLoading:r})})}function W(){return e.jsx(e.Fragment,{children:e.jsxs(M,{title:"Categories",goBack:!0,children:[e.jsx(D,{}),e.jsx(E,{}),e.jsx(Q,{})]})})}export{W as default};
