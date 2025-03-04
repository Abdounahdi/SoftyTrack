import{b as q,q as z,a9 as K,aa as j,ab as J,ac as X,T as Y,ad as Z,a2 as B,ae as ee,af as ae,ag as te,ah as le,ai as ie,a as se}from"./index-G1bMk4i-.js";import{g as ne}from"./IncomesTableColumns-BD0pe6as.js";import{d as de}from"./FormGenerator-CdnYyCO6.js";function pe(){const e=q(),{columnsIncomes:g,pageSizeIncomes:_}=z(a=>a.shared),{currentPage:m,selectedRows:T,showColumnsOptions:h,showFilterOptions:O,filterOptions:s,searchQuery:P}=z(a=>a.incomesUi),{data:n,isFetching:C}=K({currentPage:m,pageSize:_,filterOptions:s,searchQuery:P}),{data:u,isLoading:w}=j({}),{data:d,isLoading:H}=J({}),b=d==null?void 0:d.maxIncome,v=d==null?void 0:d.minIncome,{incomesTableColumns:f}=ne(),S=n==null?void 0:n.count,t=n==null?void 0:n.incomesInfo.map(a=>({dateCreated:new Intl.DateTimeFormat("en-CA").format(new Date(a.date_created)),customerName:a.customer_id.full_name,customerPhone:a.customer_id.phone,customerEmail:a.customer_id.email,paymentMethod:a.payment_method_id.payment_method,slicesTotalCount:a.total_slices,sliceCount:a.paid_slices,slicesPrecentage:` ${a.total_slices}-${a.paid_slices} `,location:a.reception_location_id.location,description:a.description,trainingName:a.training_id.training,employeeName:a.made_by.full_name,price:a.price,key:a.id})),x={onChange:(a,c)=>{console.log(`selectedRowKeys: ${a}`,"selectedRows: ",c),e(Y(c))},getCheckboxProps:a=>({disabled:a.name==="Disabled User",name:a.name})},o=g.length===0?f.map(a=>a.key):g,F=f.map(a=>({...a,hidden:!o.includes(a.key)})),V=(a,c)=>{e(Z(a)),c&&e(B({key:"pageSizeIncomes",value:c}))},N=[{columns:[{label:"Training",type:"select",value:"by_training",placeHolder:"Enter Training ... ",selectOptions:u==null?void 0:u.map(a=>({value:a.id,label:a.training})),defaultValue:s.length!==0?s.by_training:""},{label:"Price Range",type:"slider",value:"by_price_range",sliderMax:b,sliderMin:v,defaultValue:s.length!==0?s.by_price_range:""}]},{columns:[{label:"Date Range ",type:"date-range",value:"by_date_range",defaultValue:s.length!==0?s.by_date_range:""}]}];return{isFetching:C||H||w,data:t,pageSize:_,currentPage:m,showColumnsOptions:h,checkedListOfShownColumns:g,selectedRows:T,totalData:S,rowSelection:x,checkedList:o,handlePagination:V,newColumns:F,showFilterOptions:O,filterFormInputs:N,maxSliderFilter:b,minSliderFilter:v,setFilterOptions:X}}function me(e,g){var a,c,D,G,Q,k,A,M,I,R,U,W,E;const{id:_}=ee(),{data:m,isLoading:T}=j({}),{data:h,isLoading:O}=ae({}),{data:s,isLoading:P}=te({}),{data:n,isLoading:C}=le({}),{data:u,isLoading:w}=ie(_),d=se(),H=T||O||P||C||w,b=m==null?void 0:m.map(l=>({value:l.id,label:l.training})),v=n==null?void 0:n.map(l=>({value:l.id,label:l.payment_method})),f=s==null?void 0:s.map(l=>({value:l.id,label:l.location})),S=h==null?void 0:h.map(l=>({value:l.id,label:l.full_name})),t=(u==null?void 0:u.at(0))||{},x=(a=t==null?void 0:t.customer_id)==null?void 0:a.id,o=[{columns:[{label:"Full Name",type:"text",value:"full_name",placeHolder:"customer full name ... ",error:(c=e==null?void 0:e.full_name)==null?void 0:c.message},{label:"Phone Number",type:"tel",value:"phone",placeHolder:"** *** ***",error:(D=e==null?void 0:e.phone)==null?void 0:D.message,rules:{maxLength:{value:8,message:"This Phone Number is not valid"},minLength:{value:8,message:"This Phone Number is not valid "},validate:l=>{const p=l.toString();return p.startsWith("2")||p.startsWith("5")||p.startsWith("9")||p.startsWith("7")||p.startsWith("4")||"This Phone Number is not valid "}}},{label:"Email",type:"email",value:"email",placeHolder:"customer@example.com",error:(G=e==null?void 0:e.email)==null?void 0:G.message},{label:"Training Chosen",type:"select",selectOptions:b,name:"training_id",value:"training_id",createOption:!0,placeHolder:"Choose Training ... ",error:(Q=e==null?void 0:e.training_id)==null?void 0:Q.message}]},{columns:[{label:"Description",type:"textarea",placeHolder:"any details you want to add ... ",name:"description",value:"description",error:(k=e==null?void 0:e.description)==null?void 0:k.message}]}],F=o==null?void 0:o.map(l=>({columns:l.columns.map(i=>{var y,r;return i.value==="training_id"?{...i,defaultValue:(y=t==null?void 0:t.training_id)==null?void 0:y.id}:i.value==="description"?{...i,defaultValue:t==null?void 0:t.description}:{...i,defaultValue:(r=t==null?void 0:t.customer_id)==null?void 0:r[i.value]}})})),V=g?F:o,L=[{columns:[{label:"Price",type:"number",value:"price",placeHolder:"price to pay ... ",error:(A=e==null?void 0:e.price)==null?void 0:A.message},{label:"Total Slices",type:"number",value:"total_slices",placeHolder:"",error:(M=e==null?void 0:e.total_slices)==null?void 0:M.message,className:"slices_box_width_small"},{label:"Paid Slices",type:"rate",value:"paid_slices",placeHolder:"",error:(I=e==null?void 0:e.paid_slices)==null?void 0:I.message,className:"slices_box_width_rate"},{label:"Payment Method",type:"select",selectOptions:v,name:"payment_method",value:"payment_method",createOption:!0,placeHolder:"Choose Training ... ",error:(R=e==null?void 0:e.payment_method)==null?void 0:R.message}]},{columns:[{label:"Reception Local",type:"select",name:"location",value:"location",selectOptions:f,placeHolder:"select location ... ",error:(U=e==null?void 0:e.location)==null?void 0:U.message},{label:"Receptionist",type:"select",selectOptions:S,name:"receptionist",value:"receptionist",createOption:!1,placeHolder:" ",error:(W=e==null?void 0:e.receptionist)==null?void 0:W.message},{label:"Paid at ",type:"date",value:"date_created",placeHolder:"",error:(E=e==null?void 0:e.date_created)==null?void 0:E.message}]}];return{paymentFormInputs:L==null?void 0:L.map(l=>({columns:l.columns.map(i=>{var y,r,$;return i.value==="payment_method"?{...i,defaultValue:(y=t==null?void 0:t.payment_method_id)==null?void 0:y.id}:i.value==="receptionist"?{...i,defaultValue:(r=t==null?void 0:t.receptionist_id)==null?void 0:r.id}:i.value==="location"?{...i,defaultValue:($=t==null?void 0:t.reception_location_id)==null?void 0:$.id}:i.value==="date_created"?{...i,defaultValue:de(t==null?void 0:t.date_created)}:{...i,defaultValue:t==null?void 0:t[i.value]}})})),customerFormInputs:V,isLoading:H,navigate:d,incomeId:_,customerId:x}}export{me as g,pe as i};
