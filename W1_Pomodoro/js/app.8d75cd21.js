(function(e){function t(t){for(var r,a,c=t[0],l=t[1],u=t[2],d=0,f=[];d<c.length;d++)a=c[d],o[a]&&f.push(o[a][0]),o[a]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(e[r]=l[r]);s&&s(t);while(f.length)f.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],r=!0,a=1;a<n.length;a++){var l=n[a];0!==o[l]&&(r=!1)}r&&(i.splice(t--,1),e=c(c.s=n[0]))}return e}var r={},o={app:0},i=[];function a(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-1b89381c":"67aca58e","chunk-6adc50f0":"bee48970"}[e]+".js"}function c(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n=o[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise(function(t,r){n=o[e]=[t,r]});t.push(n[2]=r);var i,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=a(e),i=function(t){l.onerror=l.onload=null,clearTimeout(u);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,a=new Error("Loading chunk "+e+" failed.\n("+r+": "+i+")");a.type=r,a.request=i,n[1](a)}o[e]=void 0}};var u=setTimeout(function(){i({type:"timeout",target:l})},12e4);l.onerror=l.onload=i,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=r,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)c.d(n,r,function(t){return e[t]}.bind(null,r));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/TheF2E2nd/W1_Pomodoro/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var s=u;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"3bc3":function(e,t,n){e.exports=n.p+"media/beep.5bb4855d.mp3"},"43e6":function(e,t,n){e.exports=n.p+"media/digital.9391f1fe.mp3"},"46e5":function(e,t,n){e.exports=n.p+"media/alerm.b84fccdc.mp3"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var r=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},i=[],a=(n("7faf"),n("2877")),c={},l=Object(a["a"])(c,o,i,!1,null,null,null),u=l.exports,d=n("8c4f");r["a"].use(d["a"]);var s=new d["a"]({routes:[{path:"/",name:"work",component:function(){return n.e("chunk-6adc50f0").then(n.bind(null,"f126"))}},{path:"/dashboard",name:"dashboard",component:function(){return n.e("chunk-1b89381c").then(n.bind(null,"7277"))}}]}),f=(n("ac6a"),n("20d6"),n("2f62"));r["a"].use(f["a"]);var p=new f["a"].Store({state:{todoList:[{title:"first todo",completed:!1,work_time:1500,break_time:300,pomodoro:0,date:"2019/08/14",play:!1,id:1,timer:null},{title:"second todo",completed:!1,work_time:1500,break_time:300,pomodoro:0,date:"2019/08/14",play:!1,id:2,timer:null},{title:"third todo",completed:!1,work_time:1500,break_time:300,pomodoro:0,date:"2019/08/14",play:!1,id:3,timer:null},{title:"forth todo",completed:!1,work_time:1500,break_time:300,pomodoro:0,date:"2019/08/14",play:!1,id:4,timer:null}],work_rings:[{title:"none",selected:!0},{title:"alerm",selected:!1},{title:"alert",selected:!1},{title:"beep",selected:!1},{title:"bugle",selected:!1},{title:"digital",selected:!1},{title:"ring",selected:!1},{title:"whistle",selected:!1}],break_rings:[{title:"none",selected:!0},{title:"alerm",selected:!1},{title:"alert",selected:!1},{title:"beep",selected:!1},{title:"bugle",selected:!1},{title:"digital",selected:!1},{title:"ring",selected:!1},{title:"whistle",selected:!1}],speed:1e3,isBreak:!1,boardNow:"",work_ring:"none",break_ring:"none"},mutations:{UPDATETODOLIST:function(e,t){var n=e.todoList.findIndex(function(e){return e.id===t.id});-1===n?e.todoList.push(t):e.todoList[n]=t},CHANGESTATE:function(e){e.isBreak=!e.isBreak},SIWTCHTODO:function(e,t){var n=e.todoList.findIndex(function(e){return!e.completed}),r=e.todoList[n],o=e.todoList.findIndex(function(e){return e.id===t.id});e.todoList[n]=t,e.todoList[o]=r,e.todoList.push({}),e.todoList.pop()},SETBOARD:function(e,t){e.boardNow=t},SETRING:function(e,t){var n=t.type;e[n.slice(0,-1)]=t.ring.title,e[n].forEach(function(e){e.title===t.ring.title?e.selected=!0:e.selected=!1})}},actions:{addTodo:function(e,t){var n=t.target.value;t.target.value="";var r={title:n,completed:!1,work_time:1500,break_time:300,pomodoro:0,date:(new Date).toLocaleDateString("chinese"),play:!1,id:Math.floor(Date.now()/1e3),timer:null};e.commit("UPDATETODOLIST",r)},playTodo:function(e,t){var n=this;t.play=!t.play,e.commit("UPDATETODOLIST",t),t.play?t.timer=setInterval(function(){e.state.isBreak?n.dispatch("break",t):n.dispatch("work",t),e.commit("UPDATETODOLIST",t)},e.state.speed):(clearInterval(t.timer),e.commit("UPDATETODOLIST",t))},work:function(e,t){if(t.work_time--,0===t.work_time){if(clearInterval(t.timer),"none"!==e.state.work_ring){var r=new Audio(n("dd28")("./".concat(e.state.work_ring,".mp3")));r.play(),setTimeout(function(){return r.pause()},2e3)}t.play=!1,t.pomodoro++,t.work_time=1500,document.documentElement.style.setProperty("--primary","#00A7FF"),e.commit("CHANGESTATE")}},break:function(e,t){if(t.break_time--,0===t.break_time){if(clearInterval(t.timer),"none"!==e.state.break_ring){var r=new Audio(n("dd28")("./".concat(e.state.break_ring,".mp3")));r.play(),setTimeout(function(){return r.pause()},2e3)}t.play=!1,t.break_time=300,document.documentElement.style.setProperty("--primary","#FF4384"),e.commit("CHANGESTATE")}}},getters:{AllList:function(e){return e.todoList.filter(function(e){return!e.completed})},TodoList:function(e){var t=e.todoList.filter(function(e){return!e.completed});return t.slice(1,4)},Todo:function(e){return e.todoList.filter(function(e){return!e.completed})[0]},DoneList:function(e){return e.todoList.filter(function(e){return e.completed})},Isbreak:function(e){return e.isBreak},Board:function(e){return e.boardNow},WorkRing:function(e){return e.work_rings},BreakRing:function(e){return e.break_rings}}});r["a"].config.productionTip=!1,new r["a"]({router:s,store:p,render:function(e){return e(u)}}).$mount("#app")},"7faf":function(e,t,n){"use strict";var r=n("8fba"),o=n.n(r);o.a},"8fba":function(e,t,n){},a3cc:function(e,t,n){e.exports=n.p+"media/ring.ebb9f2a9.mp3"},dd28:function(e,t,n){var r={"./alerm.mp3":"46e5","./alert.mp3":"f47c","./beep.mp3":"3bc3","./bugle.mp3":"dff0","./digital.mp3":"43e6","./ring.mp3":"a3cc","./whistle.mp3":"f3a5"};function o(e){var t=i(e);return n(t)}function i(e){var t=r[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}o.keys=function(){return Object.keys(r)},o.resolve=i,e.exports=o,o.id="dd28"},dff0:function(e,t,n){e.exports=n.p+"media/bugle.cfb74f70.mp3"},f3a5:function(e,t,n){e.exports=n.p+"media/whistle.16710de2.mp3"},f47c:function(e,t,n){e.exports=n.p+"media/alert.e75c80b2.mp3"}});
//# sourceMappingURL=app.8d75cd21.js.map