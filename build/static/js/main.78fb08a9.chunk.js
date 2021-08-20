(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{197:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return w}));var a=n(10),r=n(17),c=n(21),s=n.n(c),i=n(32),o=n(5),u=n(0),l=n(20),d=n(33),j=n(198),b=n(31),h=n(90),p=n(50),x=n(94),O=n(120),m=n(46),f=n(22),g=n(2),v=Object(x.a)({page:{padding:"2% 10%"},input_long:{margin:"15px 5px",width:"100%"},button:{margin:"20px 10px",width:"10%"},link:{textDecoration:"underline",cursor:"pointer","&:hover":{color:"purple"}},image:{width:"30%",margin:"10px 0"}});function w(t){var n=t.match,c=t.history,x=Object(d.a)("author_".concat(n.params.id),{}),w=Object(o.a)(x,2),y=w[0],k=w[1],N=Object(d.a)("image_".concat(n.params.id),""),C=Object(o.a)(N,2),A=C[0],S=C[1],_=Object(d.a)("modified_".concat(n.params.id),!1),F=Object(o.a)(_,2),P=F[0],D=F[1],I=Object(u.useState)(""),T=Object(o.a)(I,2),E=T[0],B=T[1],W=Object(u.useState)(!0),H=Object(o.a)(W,2),J=H[0],M=H[1],R=v();Object(u.useEffect)((function(){P||Object(i.a)(s.a.mark((function e(){var t,a;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(f.a,"/authors/").concat(n.params.id),{credentials:"include"});case 2:if(401!==(t=e.sent).status){e.next=6;break}return M(!1),e.abrupt("return");case 6:return 404===t.status&&c.push("/404"),e.next=9,t.json();case 9:a=e.sent,k(a);case 11:case"end":return e.stop()}}),e)})))()}),[n.params.id,P]),Object(u.useEffect)((function(){if(!P)try{var t=new e.from(y.image.data).toString("base64");S("data:image/png;base64,".concat(t))}catch(n){S(j.a)}}),[y.image,P]);var L=function(){localStorage.removeItem("author_".concat(n.params.id)),localStorage.removeItem("image_".concat(n.params.id)),localStorage.removeItem("modified_".concat(n.params.id))},z=function(e){return void 0!==e},U=function(e,t){D(!0),k((function(n){return Object(r.a)(Object(r.a)({},n),{},Object(a.a)({},t,e.target.value))}))},Y=function(){var e=Object(i.a)(s.a.mark((function e(){var t,n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(y.name&&y.bio&&y.category){e.next=3;break}return B("Missing fields!"),e.abrupt("return");case 3:return t=new FormData,console.log(A),A.size&&t.append("image",A),t.append("name",y.name),t.append("bio",y.bio),t.append("category",y.category),e.next=11,fetch("".concat(f.a,"/authors/").concat(y._id),{credentials:"include",method:"PATCH",body:t});case 11:if(401!==(n=e.sent).status){e.next=15;break}return M(!1),e.abrupt("return");case 15:200===n.status?B(Object(g.jsxs)(g.Fragment,{children:["Author successfully edited. ",Object(g.jsx)("span",{className:R.link,onClick:function(){return window.location.reload()},children:"Refresh"})," the page to see."]})):B("An error occurred! API returned with status ".concat(n.status,"."));case 16:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(i.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==window.confirm("Are you sure you want to delete the author ".concat(y.name,"? This cannot be undone."))){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("".concat(f.a,"/authors/").concat(y._id),{credentials:"include",method:"DELETE"});case 5:if(401!==(t=e.sent).status){e.next=9;break}return M(!1),e.abrupt("return");case 9:204===t.status?(B(Object(g.jsxs)(g.Fragment,{children:["Author successfully deleted. Go back to all authors ",Object(g.jsx)(l.b,{className:R.link,to:"/authors",children:"here"}),"."]})),L()):B("An error occurred! API returned with status ".concat(t.status,"."));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(g.jsxs)(g.Fragment,{children:[Object(g.jsx)(b.a,{name:y.name}),Object(g.jsxs)("div",{className:R.page,children:[!J&&Object(g.jsx)(m.a,{}),Object(g.jsx)(l.b,{to:"/authors",children:Object(g.jsx)(p.a,{variant:"outlined",color:"primary",onClick:L,children:"Back to all authors"})}),z(y.name)&&Object(g.jsx)("div",{children:Object(g.jsx)(h.a,{className:R.input_long,label:"Name",value:y.name,onChange:function(e){return U(e,"name")}})}),z(y.bio)&&Object(g.jsx)("div",{children:Object(g.jsx)(h.a,{className:R.input_long,label:"Bio",value:y.bio||"",onChange:function(e){return U(e,"bio")}})}),z(y.category)&&Object(g.jsx)("div",{children:Object(g.jsx)(h.a,{className:R.input_long,label:"Category",value:y.category||"",onChange:function(e){return U(e,"category")}})}),z(A)&&Object(g.jsxs)("div",{children:[Object(g.jsx)("img",{className:R.image,src:A,onError:function(e){e.target.onerror=null,e.target.src=URL.createObjectURL(A)},alt:"avatar"}),Object(g.jsx)("div",{children:Object(g.jsx)("input",{className:R.input_long,type:"file",accept:".png,.jpg,.jpeg,.gif,.webp,.heif",onChange:function(e){D(!0),S(e.target.files[0])}})})]}),Object(g.jsx)(p.a,{className:R.button,variant:"contained",color:"primary",onClick:Y,children:"Save"}),Object(g.jsx)(p.a,{className:R.button,variant:"contained",color:"secondary",onClick:G,children:"Delete"}),Object(g.jsx)(p.a,{className:R.button,variant:"contained",color:"secondary",onClick:function(){D(!1)},children:"Reset"}),Object(g.jsx)(O.a,{children:E})]})]})}}).call(this,n(371).Buffer)},198:function(e,t,n){"use strict";t.a=n.p+"static/media/placeholder.0a8adf32.png"},22:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a="/api",r="https://lselr-blog.herokuapp.com"},231:function(e,t,n){},232:function(e,t,n){},31:function(e,t,n){"use strict";n.d(t,"a",(function(){return x}));var a=n(5),r=(n(0),n(20)),c=n(94),s=n(380),i=n(382),o=n(120),u=n(81),l=n(50),d=n(191),j=n.n(d),b=n(391),h=n(2),p=Object(c.a)((function(e){return{link:{fontSize:"1rem","&:hover":{color:"#CBC3E3"}},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1}}}));function x(e){var t=e.name,n=Object(b.a)(["user"]),c=Object(a.a)(n,3),d=(c[0],c[1],c[2]),x=p();return Object(h.jsx)(s.a,{position:"static",children:Object(h.jsxs)(i.a,{children:[Object(h.jsx)(r.b,{to:"/",className:x.link,children:Object(h.jsx)(u.a,{edge:"start",color:"inherit","aria-label":"menu",className:x.menuButton,children:Object(h.jsx)(j.a,{})})}),Object(h.jsx)(o.a,{variant:"h6",className:x.title,children:t}),Object(h.jsx)(l.a,{color:"inherit",onClick:function(){d("session-token"),window.location.reload()},children:"Log out"})]})})}},33:function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var a=n(5),r=n(0);function c(e,t){var n=Object(r.useState)((function(){try{var n=window.localStorage.getItem(e);return n?JSON.parse(n):t}catch(a){return console.log(a),t}})),c=Object(a.a)(n,2),s=c[0],i=c[1];return[s,function(t){try{var n=t instanceof Function?t(s):t;i(n),window.localStorage.setItem(e,JSON.stringify(n))}catch(a){console.log(a)}}]}},376:function(e,t,n){},377:function(e,t,n){},378:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(18),s=n.n(c),i=(n(231),n(232),n(20)),o=n(23),u=n(31),l=n(94),d=n(427),j=n(428),b=n(120),h=n(432),p=n(2),x=Object(l.a)({page:{padding:"2% 10%"},root:{width:"48%",margin:"2%"},card:{minHeight:"150px","&:hover":{background:"#CBC3E3"}},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});function O(){var e=x();return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"Home"}),Object(p.jsxs)("div",{className:e.page,children:[Object(p.jsx)(b.a,{component:"div",children:Object(p.jsx)(h.a,{fontSize:"h3.fontSize",textAlign:"center",children:"Welcome!"})}),Object(p.jsxs)(h.a,{display:"flex",children:[Object(p.jsx)(i.b,{to:"/posts",className:e.root,children:Object(p.jsx)(d.a,{className:e.card,children:Object(p.jsxs)(j.a,{children:[Object(p.jsx)(b.a,{variant:"h5",component:"h2",children:"Blog Posts"}),Object(p.jsx)("br",{}),Object(p.jsx)(b.a,{variant:"body2",component:"p",children:"Click here to view and edit all posts published to the LSE Law Review Blog."})]})})}),Object(p.jsx)(i.b,{to:"/authors",className:e.root,children:Object(p.jsx)(d.a,{className:e.card,children:Object(p.jsxs)(j.a,{children:[Object(p.jsx)(b.a,{variant:"h5",component:"h2",children:"Blog Authors"}),Object(p.jsx)("br",{}),Object(p.jsx)(b.a,{variant:"body2",component:"p",children:"Click here to view and edit the details of all contributors and editors of the LSE Law Review Blog."})]})})})]})]})]})}var m=n(21),f=n.n(m),g=n(17),v=n(32),w=n(5),y=n(114),k=n(50),N=n(46),C=n(22);window.React=n(0);function A(){var e=Object(a.useState)([]),t=Object(w.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!0),s=Object(w.a)(c,2),o=s[0],l=s[1],d=[{field:"title",headerName:"Title",flex:3,minWidth:150},{field:"_author",headerName:"Author",flex:1.5,minWidth:150,valueFormatter:function(e){return e.value.join(" & ")}},{field:"_categories",headerName:"Categories",flex:1.4,minWidth:150},{field:"date",headerName:"Date",flex:1.4,minWidth:140,valueFormatter:function(e){return function(e){var t=new Date(e),n=t.getDate(),a={0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"}[t.getMonth()],r=t.getFullYear();return"".concat(n," ").concat(a," ").concat(r)}(new Date(e.value))}},{field:"content",headerName:"Content",flex:3,minWidth:180},{field:"_id",sortable:!1,headerName:"\n",flex:.7,minWidth:80,renderCell:function(e){return Object(p.jsx)(i.b,{to:"/post/".concat(e.value),style:{margin:"auto"},children:Object(p.jsx)(k.a,{variant:"contained",color:"secondary",children:"Edit"})})}},{field:"url",sortable:!1,headerName:"\n",flex:1.5,minWidth:150,renderCell:function(e){return Object(p.jsx)("a",{href:e.value,style:{margin:"auto"},rel:"noopener noreferrer",target:"_blank",children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",children:"View on blog"})})}}];return Object(a.useEffect)((function(){Object(v.a)(f.a.mark((function e(){var t,n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(C.a,"/posts"),{credentials:"include"});case 2:if(401!==(t=e.sent).status){e.next=6;break}return l(!1),e.abrupt("return");case 6:return e.next=8,t.json();case 8:n=e.sent,(a=n.map((function(e){var t;t=e.authors.length?e.authors:[e.author];var n=e.categories.join(" & "),a="".concat(C.b,"/").concat(new Date(e.date).getFullYear(),"/").concat(("0"+(new Date(e.date).getMonth()+1)).slice(-2),"/").concat(e.slug),r=e._id;return Object(g.a)(Object(g.a)({},e),{},{_author:t,url:a,id:r,_categories:n})}))).reverse(),r(a);case 12:case"end":return e.stop()}}),e)})))()}),[]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"All Posts"}),!o&&Object(p.jsx)(N.a,{}),Object(p.jsx)("div",{style:{margin:"20px",textAlign:"center"},children:Object(p.jsx)(i.b,{to:"/posts/add",children:Object(p.jsx)(k.a,{variant:"contained",color:"secondary",children:"Add Post"})})}),Object(p.jsx)(y.a,{autoHeight:!0,style:{width:"98%",margin:"auto"},sortingOrder:["asc","desc"],rows:n,columns:d})]})}var S=n(10),_=n(33),F=n(90),P={name:"",category:"",bio:""},D=Object(l.a)({page:{padding:"2% 10%"},input_long:{margin:"15px 5px",width:"100%"},button:{margin:"20px 10px",width:"10%"},link:{textDecoration:"underline",cursor:"pointer","&:hover":{color:"purple"}},image:{width:"30%",margin:"10px 0"}});function I(){var e=Object(_.a)("author",P),t=Object(w.a)(e,2),n=t[0],r=t[1],c=Object(_.a)("image",{}),s=Object(w.a)(c,2),o=s[0],l=s[1],d=Object(a.useState)(""),j=Object(w.a)(d,2),h=j[0],x=j[1],O=Object(a.useState)(!0),m=Object(w.a)(O,2),y=m[0],A=m[1],I=D(),T=function(e){return void 0!==e},E=function(e,t){r((function(n){return Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,e.target.value))}))},B=function(){var e=Object(v.a)(f.a.mark((function e(){var t,a,r,c;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t=new FormData,n.name&&n.bio&&n.category){e.next=4;break}return x("Missing fields!"),e.abrupt("return");case 4:return t.append("image",o),t.append("name",n.name),t.append("bio",n.bio),t.append("category",n.category),e.next=10,fetch("".concat(C.a,"/authors"),{method:"POST",body:t});case 10:if(401!==(a=e.sent).status){e.next=14;break}return A(!1),e.abrupt("return");case 14:if(200!==a.status){e.next=23;break}return e.next=17,a.json();case 17:r=e.sent,c=r._id,x(Object(p.jsxs)(p.Fragment,{children:["Author successfully added. Click ",Object(p.jsx)(i.b,{className:I.link,to:"/author/".concat(c),children:"here"})," to view."]})),W(),e.next=24;break;case 23:x("An error occurred! API returned with status ".concat(a.status,"."));case 24:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),W=function(){r(P),l({})};return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"New Author"}),Object(p.jsxs)("div",{className:I.page,children:[!y&&Object(p.jsx)(N.a,{}),Object(p.jsx)(i.b,{to:"/authors",children:Object(p.jsx)(k.a,{variant:"outlined",color:"primary",children:"Back to all authors"})}),T(n.name)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:I.input_long,label:"Name",value:n.name,onChange:function(e){return E(e,"name")}})}),T(n.bio)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:I.input_long,label:"Bio",value:n.bio,onChange:function(e){return E(e,"bio")}})}),T(n.category)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:I.input_long,label:"Category",value:n.category,onChange:function(e){return E(e,"category")}})}),T(o)&&Object(p.jsxs)("div",{children:[o.size&&Object(p.jsx)("div",{children:Object(p.jsx)("img",{className:I.image,src:URL.createObjectURL(o),alt:"avatar "})}),Object(p.jsx)("div",{children:Object(p.jsx)("input",{className:I.input_long,type:"file",accept:".png,.jpg,.jpeg,.gif,.webp,.heif",onChange:function(e){return l(e.target.files[0])}})})]}),Object(p.jsx)(k.a,{className:I.button,variant:"contained",color:"primary",onClick:B,children:"Save"}),Object(p.jsx)(k.a,{className:I.button,variant:"contained",color:"secondary",onClick:W,children:"Clear"}),Object(p.jsx)(b.a,{children:h})]})]})}function T(){var e=Object(a.useState)([]),t=Object(w.a)(e,2),n=t[0],r=t[1],c=Object(a.useState)(!0),s=Object(w.a)(c,2),o=s[0],l=s[1];Object(a.useEffect)((function(){Object(v.a)(f.a.mark((function e(){var t,n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(C.a,"/authors"),{credentials:"include"});case 2:if(401!==(t=e.sent).status){e.next=6;break}return l(!1),e.abrupt("return");case 6:return e.next=8,t.json();case 8:n=e.sent,a=n.map((function(e){var t=e._id,n="".concat(C.b,"/author/").concat(e.name),a=e.image&&e.image.data?"Yes":"No";return Object(g.a)(Object(g.a)({},e),{},{id:t,url:n,_image:a})})),r(a);case 11:case"end":return e.stop()}}),e)})))()}),[]);var d=[{field:"name",headerName:"Name",flex:1.8,minWidth:150},{field:"category",headerName:"Category",flex:1.4,minWidth:150,valueFormatter:function(e){return e.value.charAt(0).toUpperCase()+e.value.slice(1)}},{field:"bio",headerName:"Bio",flex:5,minWidth:150},{field:"_image",headerName:"Has avatar?",flex:1.3,minWidth:150},{field:"_id",sortable:!1,headerName:"\n",flex:.7,minWidth:80,renderCell:function(e){return Object(p.jsx)(i.b,{style:{margin:"auto"},to:"/author/".concat(e.value),children:Object(p.jsx)(k.a,{variant:"contained",color:"secondary",children:"Edit"})})}},{field:"url",sortable:!1,headerName:"\n",flex:1.5,minWidth:150,renderCell:function(e){return Object(p.jsx)("a",{href:e.value,style:{margin:"auto"},rel:"noopener noreferrer",target:"_blank",children:Object(p.jsx)(k.a,{variant:"contained",color:"primary",children:"View on blog"})})}}];return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"All Authors"}),Object(p.jsxs)("div",{style:{margin:"20px",textAlign:"center"},children:[!o&&Object(p.jsx)(N.a,{}),Object(p.jsx)(i.b,{to:"/authors/add",children:Object(p.jsx)(k.a,{variant:"contained",color:"secondary",children:"Add Author"})})]}),Object(p.jsx)(y.a,{autoHeight:!0,style:{width:"98%",margin:"auto"},sortingOrder:["asc","desc"],rows:n,columns:d})]})}var E=n(14),B=n(193),W=n.n(B),H=n(199),J=n(194),M=n.n(J),R=n(195),L=n.n(R),z=n.p+"static/media/time.416a61b0.svg",U=Object(l.a)({modal:{position:"sticky",top:0,left:0,width:"100vw",backgroundColor:"white",padding:"2% 0",minHeight:"100vh",margin:0,zIndex:999,textAlign:"right"},button:{position:"sticky",top:"15px",right:"20px"}});function Y(e){var t=e.setIsOpen,n=e.isOpen,a=e.post,r=U();return Object(p.jsx)(p.Fragment,{children:n&&Object(p.jsxs)("div",{className:r.modal,children:[Object(p.jsx)(k.a,{className:r.button,variant:"contained",color:"secondary",onClick:function(){return t(!1)},children:"Close"}),Object(p.jsxs)("div",{className:"post-container",children:[0!==a.authors.length&&Object(p.jsx)("span",{className:"post-author",children:a.authors.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)("span",{children:e}),t+1!==a.authors.length&&Object(p.jsx)("span",{children:" & "})]},e)}))}),Object(p.jsx)("span",{children:" - "}),Object(p.jsx)("span",{children:a.categories.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)("span",{children:e}),t+1!==a.categories.length&&Object(p.jsx)("span",{children:" & "})]},e)}))}),Object(p.jsx)("div",{className:"post-title",children:a.title}),Object(p.jsxs)("div",{className:"post-meta",children:[Object(p.jsx)("span",{className:"post-date",children:function(e){var t=new Date(e),n=t.getDate(),a={0:"January",1:"February",2:"March",3:"April",4:"May",5:"June",6:"July",7:"August",8:"September",9:"October",10:"November",11:"December"}[t.getMonth()],r=t.getFullYear();return"".concat(n," ").concat(a," ").concat(r)}(a.date)}),Object(p.jsxs)("span",{className:"post-views",children:[a.visits," ",1===a.visits?"view":"views"]}),Object(p.jsxs)("span",{className:"post-time",children:[Object(p.jsx)("img",{src:z,alt:"time"}),Math.ceil(L()(M()(a.content).split("[1]")[0],{wordsPerMinute:250}).minutes)," min read"]})]}),Object(p.jsx)("div",{className:"page-content",children:Object(p.jsx)(W.a,{rehypePlugins:[H.a],children:a.content})})]})]})})}var G=n(88),V=n.n(G),q=n(89),K=n.n(q),Q={title:"",author:"",authors:[],categories:[],visits:0,content:"",date:Date.now()},X=Object(l.a)({page:{padding:"2% 10%"},input_long:{margin:"15px 5px",width:"100%"},input:{margin:"15px 5px",width:"max(20%,200px)"},icon:{position:"absolute",width:"40px",transform:"translate(-40px,33px)",cursor:"pointer","&:hover":{color:"purple"}},button:{margin:"20px 10px",width:"10%"},textarea:{margin:"5px",width:"100%",maxHeight:"300px",overflow:"scroll","&:hover":{maxHeight:"unset"}},link:{textDecoration:"underline",cursor:"pointer","&:hover":{color:"purple"}}});function Z(){var e=Object(_.a)("post",Q),t=Object(w.a)(e,2),n=t[0],r=t[1],c=Object(_.a)("n-a",""),s=Object(w.a)(c,2),o=s[0],l=s[1],d=Object(_.a)("n-c",""),j=Object(w.a)(d,2),h=j[0],x=j[1],O=Object(a.useState)(""),m=Object(w.a)(O,2),y=m[0],A=m[1],P=Object(a.useState)(!1),D=Object(w.a)(P,2),I=D[0],T=D[1],B=Object(a.useState)(!0),W=Object(w.a)(B,2),H=W[0],J=W[1],M=X(),R=function(e){return void 0!==e},L=function(e,t){r((function(n){return Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,e.target.value))}))},z=function(e,t,n){r((function(a){var r=a[t].map((function(t,a){return a===n?e.target.value:t}));return Object(g.a)(Object(g.a)({},a),{},Object(S.a)({},t,r))}))},U=function(e,t){e&&r((function(n){var a=Object(E.a)(n[t]);return a.push(e),Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,a))}))},G=function(e,t){r((function(n){var a=Object(E.a)(n[t]);return a.splice(e,1),Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,a))}))},q=function(){r(Q),l(""),x("")},Z=function(){var e=Object(v.a)(f.a.mark((function e(){var t,a,r,c,s,o;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.title&&n.date&&n.authors.length&&n.categories.length&&n.content){e.next=3;break}return A("Missing fields!"),e.abrupt("return");case 3:if(!(n.visits<0||n.visits%1)){e.next=6;break}return A("The number of visits must be a non-negative integer!"),e.abrupt("return");case 6:return t=n.authors.length>1?{title:n.title,authors:n.authors,categories:n.categories,date:n.date,content:n.content}:{title:n.title,author:n.authors[0],categories:n.categories,date:n.date,content:n.content},e.next=9,fetch("".concat(C.a,"/posts"),{credentials:"include",method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(t)});case 9:if(401!==(a=e.sent).status){e.next=13;break}return J(!1),e.abrupt("return");case 13:if(200===a.status){e.next=16;break}return A("An error occurred! API returned with status ".concat(a.status)),e.abrupt("return");case 16:return e.next=18,a.json();case 18:return r=e.sent,e.next=21,fetch("".concat(C.a,"/visits/").concat(r.slug),{credentials:"include"});case 21:if(401!==(c=e.sent).status){e.next=25;break}return J(!1),e.abrupt("return");case 25:if(200===c.status){e.next=35;break}return e.next=28,fetch("".concat(C.a,"/visits/").concat(r.slug),{credentials:"include",method:"POST"});case 28:if(401!==(s=e.sent).status){e.next=32;break}return J(!1),e.abrupt("return");case 32:if(200===s.status){e.next=35;break}return A("An error occurred! API returned with status ".concat(s.status)),e.abrupt("return");case 35:return e.next=37,fetch("".concat(C.a,"/visits/").concat(r.slug),{credentials:"include",method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({type:"set",value:n.visits})});case 37:if(401!==(o=e.sent).status){e.next=41;break}return J(!1),e.abrupt("return");case 41:if(200===o.status){e.next=44;break}return A("An error occurred! API returned with status ".concat(o.status)),e.abrupt("return");case 44:A(Object(p.jsxs)(p.Fragment,{children:["Post successfully added. Click ",Object(p.jsx)(i.b,{className:M.link,to:"/post/".concat(r._id),children:"here"})," to view."]})),q();case 46:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"New Post"}),Object(p.jsx)(Y,{setIsOpen:T,isOpen:I,post:n}),Object(p.jsxs)("div",{className:M.page,children:[!H&&Object(p.jsx)(N.a,{}),Object(p.jsx)(i.b,{to:"/posts",children:Object(p.jsx)(k.a,{variant:"outlined",color:"primary",children:"Back to all posts"})}),R(n.title)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:M.input_long,label:"Title",value:n.title,onChange:function(e){return L(e,"title")}})}),R(n.date)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:M.input_long,label:"Date",type:"date",value:new Date(n.date||0).toISOString().substr(0,10),onChange:function(e){return L(e,"date")}})}),R(n.categories)&&Object(p.jsxs)("div",{children:[n.categories.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)(F.a,{className:M.input,label:"Category",value:e,onChange:function(e){return z(e,"categories",t)}}),Object(p.jsx)(V.a,{style:{color:"darkred"},className:M.icon,onClick:function(){return G(t,"categories")}})]},t)})),Object(p.jsx)(F.a,{className:M.input,label:"New Category",value:h,onChange:function(e){return x(e.target.value)}}),Object(p.jsx)(K.a,{style:{color:"green"},className:M.icon,onClick:function(){U(h,"categories"),x("")}})]}),R(n.authors)&&Object(p.jsxs)("div",{children:[n.authors.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)(F.a,{className:M.input,label:"Author",value:e,onChange:function(e){return z(e,"authors",t)}}),Object(p.jsx)(V.a,{style:{color:"darkred"},className:M.icon,onClick:function(){return G(t,"authors")}})]},t)})),Object(p.jsx)(F.a,{className:M.input,label:"New Author",value:o,onChange:function(e){return l(e.target.value)}}),Object(p.jsx)(K.a,{style:{color:"green"},className:M.icon,onClick:function(){U(o,"authors"),l("")}})]}),R(n.visits)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:M.input_long,label:"Views",type:"number",value:n.visits,onChange:function(e){return L(e,"visits")}})}),R(n.content)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:M.textarea,multiline:!0,label:"Content",value:n.content||"",onChange:function(e){return L(e,"content")}})}),Object(p.jsx)(k.a,{className:M.button,variant:"contained",color:"primary",onClick:Z,children:"Save"}),Object(p.jsx)(k.a,{className:M.button,variant:"contained",onClick:function(){T(!0),window.scrollTo(0,0)},children:"Preview"}),Object(p.jsx)(k.a,{className:M.button,variant:"contained",color:"secondary",onClick:q,children:"Clear"}),Object(p.jsx)(b.a,{children:y})]})]})}var $=Object(l.a)({page:{padding:"2% 10%"},input_long:{margin:"15px 5px",width:"100%"},input:{margin:"15px 5px",width:"max(20%,200px)"},icon:{position:"absolute",width:"40px",transform:"translate(-40px,33px)",cursor:"pointer","&:hover":{color:"purple"}},button:{margin:"20px 10px",width:"10%"},textarea:{margin:"5px",width:"100%",maxHeight:"300px",overflow:"scroll","&:hover":{maxHeight:"unset"}},link:{textDecoration:"underline",cursor:"pointer","&:hover":{color:"purple"}}});function ee(e){var t=e.match,n=e.history,r=Object(_.a)("post_".concat(t.params.id),{}),c=Object(w.a)(r,2),s=c[0],o=c[1],l=Object(_.a)("modified_".concat(t.params.id),!1),d=Object(w.a)(l,2),j=d[0],h=d[1],x=Object(_.a)("n-a_".concat(t.params.id),""),O=Object(w.a)(x,2),m=O[0],y=O[1],A=Object(_.a)("n-c_".concat(t.params.id),""),P=Object(w.a)(A,2),D=P[0],I=P[1],T=Object(a.useState)(""),B=Object(w.a)(T,2),W=B[0],H=B[1],J=Object(a.useState)(!1),M=Object(w.a)(J,2),R=M[0],L=M[1],z=Object(a.useState)(!0),U=Object(w.a)(z,2),G=U[0],q=U[1],Q=$();Object(a.useEffect)((function(){j||Object(v.a)(f.a.mark((function e(){var a,r,c,s;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(C.a,"/post/id/").concat(t.params.id),{credentials:"include"});case 2:if(401!==(a=e.sent).status){e.next=6;break}return q(!1),e.abrupt("return");case 6:return 404===a.status&&n.push("/404"),e.next=9,a.json();case 9:return r=e.sent,e.next=12,fetch("".concat(C.a,"/visits/").concat(r.slug),{credentials:"include"});case 12:if(401!==(c=e.sent).status){e.next=16;break}return q(!1),e.abrupt("return");case 16:return e.next=18,c.json();case 18:s=e.sent,r.author&&(r.authors=[r.author]),o(Object(g.a)(Object(g.a)({},r),{},{visits:s.visits}));case 21:case"end":return e.stop()}}),e)})))()}),[t.params.id,j]);var X=function(){localStorage.removeItem("post_".concat(t.params.id)),localStorage.removeItem("modified_".concat(t.params.id)),localStorage.removeItem("n-a_".concat(t.params.id)),localStorage.removeItem("n-c_".concat(t.params.id))},Z=function(e){return void 0!==e},ee=function(e,t){h(!0),o((function(n){return Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,e.target.value))}))},te=function(e,t,n){h(!0),o((function(a){var r=a[t].map((function(t,a){return a===n?e.target.value:t}));return Object(g.a)(Object(g.a)({},a),{},Object(S.a)({},t,r))}))},ne=function(e,t){e&&(h(!0),o((function(n){var a=Object(E.a)(n[t]);return a.push(e),Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,a))})))},ae=function(e,t){h(!0),o((function(n){var a=Object(E.a)(n[t]);return a.splice(e,1),Object(g.a)(Object(g.a)({},n),{},Object(S.a)({},t,a))}))},re=function(){var e=Object(v.a)(f.a.mark((function e(){var t,n,a;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(s.title&&s.date&&s.authors.length&&s.categories.length&&s.content){e.next=3;break}return H("Missing fields!"),e.abrupt("return");case 3:if(!(s.visits<0||s.visits%1)){e.next=6;break}return H("The number of visits must be a non-negative integer!"),e.abrupt("return");case 6:return t=s.authors.length>1?{title:s.title,authors:s.authors,categories:s.categories,date:s.date,content:s.content}:{title:s.title,author:s.authors[0],categories:s.categories,date:s.date,content:s.content},e.next=9,fetch("".concat(C.a,"/posts/").concat(s._id),{credentials:"include",method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify(t)});case 9:if(401!==(n=e.sent).status){e.next=13;break}return q(!1),e.abrupt("return");case 13:if(200===n.status){e.next=16;break}return H("An error occurred! API returned with status ".concat(n.status)),e.abrupt("return");case 16:return e.next=18,fetch("".concat(C.a,"/visits/").concat(s.slug),{credentials:"include",method:"PATCH",headers:{"content-type":"application/json"},body:JSON.stringify({type:"set",value:s.visits})});case 18:if(401!==(a=e.sent).status){e.next=22;break}return q(!1),e.abrupt("return");case 22:if(200===a.status){e.next=25;break}return H("An error occurred! API returned with status ".concat(a.status)),e.abrupt("return");case 25:H(Object(p.jsxs)(p.Fragment,{children:["Post successfully saved. ",Object(p.jsx)("span",{className:Q.link,onClick:function(){return window.location.reload()},children:"Refresh"})," the page to see."]}));case 26:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),ce=function(){var e=Object(v.a)(f.a.mark((function e(){var t;return f.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!1!==window.confirm("Are you sure you want to delete the post ".concat(s.title,"? This cannot be undone."))){e.next=3;break}return e.abrupt("return");case 3:return e.next=5,fetch("".concat(C.a,"/posts/").concat(s._id),{credentials:"include",method:"DELETE"});case 5:if(401!==(t=e.sent).status){e.next=9;break}return q(!1),e.abrupt("return");case 9:204===t.status?(H(Object(p.jsxs)(p.Fragment,{children:["Post successfully deleted. Go back to all posts ",Object(p.jsx)(i.b,{className:Q.link,to:"/posts",children:"here"}),". "]})),X()):H("An error occurred! API returned with status ".concat(t.status,"."));case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:s.title}),Object(p.jsx)(Y,{setIsOpen:L,isOpen:R,post:s}),Object(p.jsxs)("div",{className:Q.page,children:[!G&&Object(p.jsx)(N.a,{}),Object(p.jsx)(i.b,{to:"/posts",children:Object(p.jsx)(k.a,{variant:"outlined",color:"primary",onClick:X,children:"Back to all posts"})}),Z(s.title)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:Q.input_long,label:"Title",value:s.title,onChange:function(e){return ee(e,"title")}})}),Z(s.date)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:Q.input_long,label:"Date",type:"date",value:new Date(s.date||0).toISOString().substr(0,10),onChange:function(e){return ee(e,"date")}})}),Z(s.categories)&&Object(p.jsxs)("div",{children:[s.categories.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)(F.a,{className:Q.input,label:"Category",value:e,onChange:function(e){return te(e,"categories",t)}}),Object(p.jsx)(V.a,{style:{color:"darkred"},className:Q.icon,onClick:function(){return ae(t,"categories")}})]},t)})),Object(p.jsx)(F.a,{className:Q.input,label:"New Category",value:D,onChange:function(e){return I(e.target.value)}}),Object(p.jsx)(K.a,{style:{color:"green"},className:Q.icon,onClick:function(){ne(D,"categories"),I("")}})]}),Z(s.authors)&&Object(p.jsxs)("div",{children:[s.authors.map((function(e,t){return Object(p.jsxs)("span",{children:[Object(p.jsx)(F.a,{className:Q.input,label:"Author",value:e,onChange:function(e){return te(e,"authors",t)}}),Object(p.jsx)(V.a,{style:{color:"darkred"},className:Q.icon,onClick:function(){return ae(t,"authors")}})]},t)})),Object(p.jsx)(F.a,{className:Q.input,label:"New Author",value:m,onChange:function(e){return y(e.target.value)}}),Object(p.jsx)(K.a,{style:{color:"green"},className:Q.icon,onClick:function(){ne(m,"authors"),y("")}})]}),Z(s.visits)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:Q.input_long,label:"Views",type:"number",value:s.visits,onChange:function(e){return ee(e,"visits")}})}),Z(s.content)&&Object(p.jsx)("div",{children:Object(p.jsx)(F.a,{className:Q.textarea,multiline:!0,label:"Content",value:s.content||"",onChange:function(e){return ee(e,"content")}})}),Object(p.jsx)(k.a,{className:Q.button,variant:"contained",color:"primary",onClick:re,children:"Save"}),Object(p.jsx)(k.a,{className:Q.button,variant:"contained",color:"secondary",onClick:ce,children:"Delete"}),Object(p.jsx)(k.a,{className:Q.button,variant:"contained",onClick:function(){L(!0),window.scrollTo(0,0)},children:"Preview"}),Object(p.jsx)(k.a,{className:Q.button,variant:"contained",color:"secondary",onClick:function(){h(!1)},children:"Reset"}),Object(p.jsx)(b.a,{children:W})]})]})}var te=n(197);function ne(e){var t=e.history;return Object(a.useEffect)((function(){setTimeout((function(){t.push("/")}),1500)}),[t]),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)(u.a,{name:"Error 404"}),Object(p.jsx)(b.a,{style:{textAlign:"center",margin:"20px"},variant:"h4",children:"The page that you were looking for does not exist. Redirecting you to the home page..."})]})}var ae=Object(o.f)((function(e){var t=e.history;return Object(a.useEffect)((function(){var e=t.listen((function(){window.scrollTo(0,0)}));return function(){e()}}),[]),null}));var re=function(){return Object(p.jsxs)(i.a,{children:[Object(p.jsx)(ae,{}),Object(p.jsxs)(o.c,{children:[Object(p.jsx)(o.a,{path:"/",exact:!0,component:O}),Object(p.jsx)(o.a,{path:"/posts/add",exact:!0,component:Z}),Object(p.jsx)(o.a,{path:"/posts",exact:!0,component:A}),Object(p.jsx)(o.a,{path:"/authors/add",exact:!0,component:I}),Object(p.jsx)(o.a,{path:"/authors",exact:!0,component:T}),Object(p.jsx)(o.a,{path:"/post/:id",exact:!0,component:ee}),Object(p.jsx)(o.a,{path:"/author/:id",exact:!0,component:te.a}),Object(p.jsx)(o.a,{path:"/",component:ne})]})]})},ce=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,435)).then((function(t){var n=t.getCLS,a=t.getFID,r=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),a(e),r(e),c(e),s(e)}))},se=(n(375),n(376),n(377),n(431));s.a.render(Object(p.jsx)(r.a.StrictMode,{children:Object(p.jsx)(se.a,{children:Object(p.jsx)(re,{})})}),document.getElementById("root")),ce()},46:function(e,t,n){"use strict";n.d(t,"a",(function(){return o}));var a=n(0),r=n(120),c=n(94),s=n(2),i=Object(c.a)({div:{textAlign:"center",margin:"15px 0 15px 0"},link:{textDecoration:"underline",cursor:"pointer","&:hover":{color:"purple"}}});function o(){Object(a.useEffect)((function(){window.scrollTo(0,0)}),[]);var e=i();return Object(s.jsx)("div",{className:e.div,children:Object(s.jsxs)(r.a,{variant:"h5",children:["WARNING: You are not logged in! Click ",Object(s.jsx)("span",{onClick:function(){window.location.reload()},className:e.link,children:"here"})," to log in again."]})})}}},[[378,1,2]]]);
//# sourceMappingURL=main.78fb08a9.chunk.js.map