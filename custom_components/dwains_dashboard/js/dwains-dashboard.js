/*! For license information please see dwains-dashboard.js.LICENSE.txt */
(()=>{var e={9165(e,t,i){"use strict";i.d(t,{CZ3:()=>a,Q43:()=>n,TdJ:()=>r,noC:()=>o});var a="M12,15.5A3.5,3.5 0 0,1 8.5,12A3.5,3.5 0 0,1 12,8.5A3.5,3.5 0 0,1 15.5,12A3.5,3.5 0 0,1 12,15.5M19.43,12.97C19.47,12.65 19.5,12.33 19.5,12C19.5,11.67 19.47,11.34 19.43,11L21.54,9.37C21.73,9.22 21.78,8.95 21.66,8.73L19.66,5.27C19.54,5.05 19.27,4.96 19.05,5.05L16.56,6.05C16.04,5.66 15.5,5.32 14.87,5.07L14.5,2.42C14.46,2.18 14.25,2 14,2H10C9.75,2 9.54,2.18 9.5,2.42L9.13,5.07C8.5,5.32 7.96,5.66 7.44,6.05L4.95,5.05C4.73,4.96 4.46,5.05 4.34,5.27L2.34,8.73C2.21,8.95 2.27,9.22 2.46,9.37L4.57,11C4.53,11.34 4.5,11.67 4.5,12C4.5,12.33 4.53,12.65 4.57,12.97L2.46,14.63C2.27,14.78 2.21,15.05 2.34,15.27L4.34,18.73C4.46,18.95 4.73,19.03 4.95,18.95L7.44,17.94C7.96,18.34 8.5,18.68 9.13,18.93L9.5,21.58C9.54,21.82 9.75,22 10,22H14C14.25,22 14.46,21.82 14.5,21.58L14.87,18.93C15.5,18.67 16.04,18.34 16.56,17.94L19.05,18.95C19.27,19.03 19.54,18.95 19.66,18.73L21.66,15.27C21.78,15.05 21.73,14.78 21.54,14.63L19.43,12.97Z",r="M12,16A2,2 0 0,1 14,18A2,2 0 0,1 12,20A2,2 0 0,1 10,18A2,2 0 0,1 12,16M12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12A2,2 0 0,1 12,10M12,4A2,2 0 0,1 14,6A2,2 0 0,1 12,8A2,2 0 0,1 10,6A2,2 0 0,1 12,4Z",o="M19 13C19.7 13 20.37 13.13 21 13.35V9L15 3H5C3.89 3 3 3.89 3 5V19C3 20.11 3.9 21 5 21H13.35C13.13 20.37 13 19.7 13 19C13 15.69 15.69 13 19 13M14 4.5L19.5 10H14V4.5M23 18V20H20V23H18V20H15V18H18V15H20V18H23Z",n="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"},8331(e,t,i){"use strict";function a(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=Array(t);i<t;i++)a[i]=e[i];return a}function r(e,t,i){return(t=function(e){var t=function(e){if("object"!=typeof e||!e)return e;var t=e[Symbol.toPrimitive];if(void 0!==t){var i=t.call(e,"string");if("object"!=typeof i)return i;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:t+""}(t))in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function o(){return o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)({}).hasOwnProperty.call(i,a)&&(e[a]=i[a])}return e},o.apply(null,arguments)}function n(e,t){var i=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),i.push.apply(i,a)}return i}function s(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{};t%2?n(Object(i),!0).forEach(function(t){r(e,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(i)):n(Object(i)).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(i,t))})}return e}function d(e){return d="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},d(e)}function l(e){if("undefined"!=typeof window&&window.navigator)return!!navigator.userAgent.match(e)}var c=l(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),h=l(/Edge/i),p=l(/firefox/i),u=l(/safari/i)&&!l(/chrome/i)&&!l(/android/i),m=l(/iP(ad|od|hone)/i),g=l(/chrome/i)&&l(/android/i),_={capture:!1,passive:!1};function f(e,t,i){e.addEventListener(t,i,!c&&_)}function b(e,t,i){e.removeEventListener(t,i,!c&&_)}function v(e,t){if(t){if(">"===t[0]&&(t=t.substring(1)),e)try{if(e.matches)return e.matches(t);if(e.msMatchesSelector)return e.msMatchesSelector(t);if(e.webkitMatchesSelector)return e.webkitMatchesSelector(t)}catch(e){return!1}return!1}}function y(e){return e.host&&e!==document&&e.host.nodeType&&e.host!==e?e.host:e.parentNode}function w(e,t,i,a){if(e){i=i||document;do{if(null!=t&&(">"===t[0]?e.parentNode===i&&v(e,t):v(e,t))||a&&e===i)return e;if(e===i)break}while(e=y(e))}return null}var x,k=/\s+/g;function $(e,t,i){if(e&&t)if(e.classList)e.classList[i?"add":"remove"](t);else{var a=(" "+e.className+" ").replace(k," ").replace(" "+t+" "," ");e.className=(a+(i?" "+t:"")).replace(k," ")}}function C(e,t,i){var a=e&&e.style;if(a){if(void 0===i)return document.defaultView&&document.defaultView.getComputedStyle?i=document.defaultView.getComputedStyle(e,""):e.currentStyle&&(i=e.currentStyle),void 0===t?i:i[t];t in a||-1!==t.indexOf("webkit")||(t="-webkit-"+t),a[t]=i+("string"==typeof i?"":"px")}}function E(e,t){var i="";if("string"==typeof e)i=e;else do{var a=C(e,"transform");a&&"none"!==a&&(i=a+" "+i)}while(!t&&(e=e.parentNode));var r=window.DOMMatrix||window.WebKitCSSMatrix||window.CSSMatrix||window.MSCSSMatrix;return r&&new r(i)}function A(e,t,i){if(e){var a=e.getElementsByTagName(t),r=0,o=a.length;if(i)for(;r<o;r++)i(a[r],r);return a}return[]}function S(){return document.scrollingElement||document.documentElement}function D(e,t,i,a,r){if(e.getBoundingClientRect||e===window){var o,n,s,d,l,h,p;if(e!==window&&e.parentNode&&e!==S()?(n=(o=e.getBoundingClientRect()).top,s=o.left,d=o.bottom,l=o.right,h=o.height,p=o.width):(n=0,s=0,d=window.innerHeight,l=window.innerWidth,h=window.innerHeight,p=window.innerWidth),(t||i)&&e!==window&&(r=r||e.parentNode,!c))do{if(r&&r.getBoundingClientRect&&("none"!==C(r,"transform")||i&&"static"!==C(r,"position"))){var u=r.getBoundingClientRect();n-=u.top+parseInt(C(r,"border-top-width")),s-=u.left+parseInt(C(r,"border-left-width")),d=n+o.height,l=s+o.width;break}}while(r=r.parentNode);if(a&&e!==window){var m=E(r||e),g=m&&m.a,_=m&&m.d;m&&(d=(n/=_)+(h/=_),l=(s/=g)+(p/=g))}return{top:n,left:s,bottom:d,right:l,width:p,height:h}}}function z(e,t,i){for(var a=P(e,!0),r=D(e)[t];a;){var o=D(a)[i];if(!("top"===i||"left"===i?r>=o:r<=o))return a;if(a===S())break;a=P(a,!1)}return!1}function T(e,t,i,a){for(var r=0,o=0,n=e.children;o<n.length;){if("none"!==n[o].style.display&&n[o]!==He.ghost&&(a||n[o]!==He.dragged)&&w(n[o],i.draggable,e,!1)){if(r===t)return n[o];r++}o++}return null}function M(e,t){for(var i=e.lastElementChild;i&&(i===He.ghost||"none"===C(i,"display")||t&&!v(i,t));)i=i.previousElementSibling;return i||null}function q(e,t){var i=0;if(!e||!e.parentNode)return-1;for(;e=e.previousElementSibling;)"TEMPLATE"===e.nodeName.toUpperCase()||e===He.clone||t&&!v(e,t)||i++;return i}function O(e){var t=0,i=0,a=S();if(e)do{var r=E(e),o=r.a,n=r.d;t+=e.scrollLeft*o,i+=e.scrollTop*n}while(e!==a&&(e=e.parentNode));return[t,i]}function P(e,t){if(!e||!e.getBoundingClientRect)return S();var i=e,a=!1;do{if(i.clientWidth<i.scrollWidth||i.clientHeight<i.scrollHeight){var r=C(i);if(i.clientWidth<i.scrollWidth&&("auto"==r.overflowX||"scroll"==r.overflowX)||i.clientHeight<i.scrollHeight&&("auto"==r.overflowY||"scroll"==r.overflowY)){if(!i.getBoundingClientRect||i===document.body)return S();if(a||t)return i;a=!0}}}while(i=i.parentNode);return S()}function B(e,t){return Math.round(e.top)===Math.round(t.top)&&Math.round(e.left)===Math.round(t.left)&&Math.round(e.height)===Math.round(t.height)&&Math.round(e.width)===Math.round(t.width)}function I(e,t){return function(){if(!x){var i=arguments;1===i.length?e.call(this,i[0]):e.apply(this,i),x=setTimeout(function(){x=void 0},t)}}}function j(e,t,i){e.scrollLeft+=t,e.scrollTop+=i}function R(e){var t=window.Polymer,i=window.jQuery||window.Zepto;return t&&t.dom?t.dom(e).cloneNode(!0):i?i(e).clone(!0)[0]:e.cloneNode(!0)}function L(e,t){C(e,"position","absolute"),C(e,"top",t.top),C(e,"left",t.left),C(e,"width",t.width),C(e,"height",t.height)}function H(e){C(e,"position",""),C(e,"top",""),C(e,"left",""),C(e,"width",""),C(e,"height","")}function N(e,t,i){var a={};return Array.from(e.children).forEach(function(r){var o,n,s,d;if(w(r,t.draggable,e,!1)&&!r.animated&&r!==i){var l=D(r);a.left=Math.min(null!==(o=a.left)&&void 0!==o?o:1/0,l.left),a.top=Math.min(null!==(n=a.top)&&void 0!==n?n:1/0,l.top),a.right=Math.max(null!==(s=a.right)&&void 0!==s?s:-1/0,l.right),a.bottom=Math.max(null!==(d=a.bottom)&&void 0!==d?d:-1/0,l.bottom)}}),a.width=a.right-a.left,a.height=a.bottom-a.top,a.x=a.left,a.y=a.top,a}var V="Sortable"+(new Date).getTime();var F=[],U={initializeByDefault:!0},G={mount:function(e){for(var t in U)U.hasOwnProperty(t)&&!(t in e)&&(e[t]=U[t]);F.forEach(function(t){if(t.pluginName===e.pluginName)throw"Sortable: Cannot mount plugin ".concat(e.pluginName," more than once")}),F.push(e)},pluginEvent:function(e,t,i){var a=this;this.eventCanceled=!1,i.cancel=function(){a.eventCanceled=!0};var r=e+"Global";F.forEach(function(a){t[a.pluginName]&&(t[a.pluginName][r]&&t[a.pluginName][r](s({sortable:t},i)),t.options[a.pluginName]&&t[a.pluginName][e]&&t[a.pluginName][e](s({sortable:t},i)))})},initializePlugins:function(e,t,i,a){for(var r in F.forEach(function(a){var r=a.pluginName;if(e.options[r]||a.initializeByDefault){var n=new a(e,t,e.options);n.sortable=e,n.options=e.options,e[r]=n,o(i,n.defaults)}}),e.options)if(e.options.hasOwnProperty(r)){var n=this.modifyOption(e,r,e.options[r]);void 0!==n&&(e.options[r]=n)}},getEventProperties:function(e,t){var i={};return F.forEach(function(a){"function"==typeof a.eventProperties&&o(i,a.eventProperties.call(t[a.pluginName],e))}),i},modifyOption:function(e,t,i){var a;return F.forEach(function(r){e[r.pluginName]&&r.optionListeners&&"function"==typeof r.optionListeners[t]&&(a=r.optionListeners[t].call(e[r.pluginName],i))}),a}};function W(e){var t=e.sortable,i=e.rootEl,a=e.name,r=e.targetEl,o=e.cloneEl,n=e.toEl,d=e.fromEl,l=e.oldIndex,p=e.newIndex,u=e.oldDraggableIndex,m=e.newDraggableIndex,g=e.originalEvent,_=e.putSortable,f=e.extraEventProperties;if(t=t||i&&i[V]){var b,v=t.options,y="on"+a.charAt(0).toUpperCase()+a.substr(1);!window.CustomEvent||c||h?(b=document.createEvent("Event")).initEvent(a,!0,!0):b=new CustomEvent(a,{bubbles:!0,cancelable:!0}),b.to=n||i,b.from=d||i,b.item=r||i,b.clone=o,b.oldIndex=l,b.newIndex=p,b.oldDraggableIndex=u,b.newDraggableIndex=m,b.originalEvent=g,b.pullMode=_?_.lastPutMode:void 0;var w=s(s({},f),G.getEventProperties(a,t));for(var x in w)b[x]=w[x];i&&i.dispatchEvent(b),v[y]&&v[y].call(t,b)}}var X=["evt"],Y=function(e,t){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},a=i.evt,r=function(e,t){if(null==e)return{};var i,a,r=function(e,t){if(null==e)return{};var i={};for(var a in e)if({}.hasOwnProperty.call(e,a)){if(-1!==t.indexOf(a))continue;i[a]=e[a]}return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)i=o[a],-1===t.indexOf(i)&&{}.propertyIsEnumerable.call(e,i)&&(r[i]=e[i])}return r}(i,X);G.pluginEvent.bind(He)(e,t,s({dragEl:J,parentEl:Z,ghostEl:Q,rootEl:ee,nextEl:te,lastDownEl:ie,cloneEl:ae,cloneHidden:re,dragStarted:fe,putSortable:ce,activeSortable:He.active,originalEvent:a,oldIndex:oe,oldDraggableIndex:se,newIndex:ne,newDraggableIndex:de,hideGhostForTarget:Ie,unhideGhostForTarget:je,cloneNowHidden:function(){re=!0},cloneNowShown:function(){re=!1},dispatchSortableEvent:function(e){K({sortable:t,name:e,originalEvent:a})}},r))};function K(e){W(s({putSortable:ce,cloneEl:ae,targetEl:J,rootEl:ee,oldIndex:oe,oldDraggableIndex:se,newIndex:ne,newDraggableIndex:de},e))}var J,Z,Q,ee,te,ie,ae,re,oe,ne,se,de,le,ce,he,pe,ue,me,ge,_e,fe,be,ve,ye,we,xe=!1,ke=!1,$e=[],Ce=!1,Ee=!1,Ae=[],Se=!1,De=[],ze="undefined"!=typeof document,Te=m,Me=h||c?"cssFloat":"float",qe=ze&&!g&&!m&&"draggable"in document.createElement("div"),Oe=function(){if(ze){if(c)return!1;var e=document.createElement("x");return e.style.cssText="pointer-events:auto","auto"===e.style.pointerEvents}}(),Pe=function(e,t){var i=C(e),a=parseInt(i.width)-parseInt(i.paddingLeft)-parseInt(i.paddingRight)-parseInt(i.borderLeftWidth)-parseInt(i.borderRightWidth),r=T(e,0,t),o=T(e,1,t),n=r&&C(r),s=o&&C(o),d=n&&parseInt(n.marginLeft)+parseInt(n.marginRight)+D(r).width,l=s&&parseInt(s.marginLeft)+parseInt(s.marginRight)+D(o).width;if("flex"===i.display)return"column"===i.flexDirection||"column-reverse"===i.flexDirection?"vertical":"horizontal";if("grid"===i.display)return i.gridTemplateColumns.split(" ").length<=1?"vertical":"horizontal";if(r&&n.float&&"none"!==n.float){var c="left"===n.float?"left":"right";return!o||"both"!==s.clear&&s.clear!==c?"horizontal":"vertical"}return r&&("block"===n.display||"flex"===n.display||"table"===n.display||"grid"===n.display||d>=a&&"none"===i[Me]||o&&"none"===i[Me]&&d+l>a)?"vertical":"horizontal"},Be=function(e){function t(e,i){return function(a,r,o,n){var s=a.options.group.name&&r.options.group.name&&a.options.group.name===r.options.group.name;if(null==e&&(i||s))return!0;if(null==e||!1===e)return!1;if(i&&"clone"===e)return e;if("function"==typeof e)return t(e(a,r,o,n),i)(a,r,o,n);var d=(i?a:r).options.group.name;return!0===e||"string"==typeof e&&e===d||e.join&&e.indexOf(d)>-1}}var i={},a=e.group;a&&"object"==d(a)||(a={name:a}),i.name=a.name,i.checkPull=t(a.pull,!0),i.checkPut=t(a.put),i.revertClone=a.revertClone,e.group=i},Ie=function(){!Oe&&Q&&C(Q,"display","none")},je=function(){!Oe&&Q&&C(Q,"display","")};ze&&!g&&document.addEventListener("click",function(e){if(ke)return e.preventDefault(),e.stopPropagation&&e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation(),ke=!1,!1},!0);var Re=function(e){if(J){e=e.touches?e.touches[0]:e;var t=(r=e.clientX,o=e.clientY,$e.some(function(e){var t=e[V].options.emptyInsertThreshold;if(t&&!M(e)){var i=D(e),a=r>=i.left-t&&r<=i.right+t,s=o>=i.top-t&&o<=i.bottom+t;return a&&s?n=e:void 0}}),n);if(t){var i={};for(var a in e)e.hasOwnProperty(a)&&(i[a]=e[a]);i.target=i.rootEl=t,i.preventDefault=void 0,i.stopPropagation=void 0,t[V]._onDragOver(i)}}var r,o,n},Le=function(e){J&&J.parentNode[V]._isOutsideThisEl(e.target)};function He(e,t){if(!e||!e.nodeType||1!==e.nodeType)throw"Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));this.el=e,this.options=t=o({},t),e[V]=this;var i,a,r={group:null,sort:!0,disabled:!1,store:null,handle:null,draggable:/^[uo]l$/i.test(e.nodeName)?">li":">*",swapThreshold:1,invertSwap:!1,invertedSwapThreshold:null,removeCloneOnHide:!0,direction:function(){return Pe(e,this.options)},ghostClass:"sortable-ghost",chosenClass:"sortable-chosen",dragClass:"sortable-drag",ignore:"a, img",filter:null,preventOnFilter:!0,animation:0,easing:null,setData:function(e,t){e.setData("Text",t.textContent)},dropBubble:!1,dragoverBubble:!1,dataIdAttr:"data-id",delay:0,delayOnTouchOnly:!1,touchStartThreshold:(Number.parseInt?Number:window).parseInt(window.devicePixelRatio,10)||1,forceFallback:!1,fallbackClass:"sortable-fallback",fallbackOnBody:!1,fallbackTolerance:0,fallbackOffset:{x:0,y:0},supportPointer:!1!==He.supportPointer&&"PointerEvent"in window&&(!u||m),emptyInsertThreshold:5};for(var n in G.initializePlugins(this,e,r),r)!(n in t)&&(t[n]=r[n]);for(var d in Be(t),this)"_"===d.charAt(0)&&"function"==typeof this[d]&&(this[d]=this[d].bind(this));this.nativeDraggable=!t.forceFallback&&qe,this.nativeDraggable&&(this.options.touchStartThreshold=1),t.supportPointer?f(e,"pointerdown",this._onTapStart):(f(e,"mousedown",this._onTapStart),f(e,"touchstart",this._onTapStart)),this.nativeDraggable&&(f(e,"dragover",this),f(e,"dragenter",this)),$e.push(this.el),t.store&&t.store.get&&this.sort(t.store.get(this)||[]),o(this,(a=[],{captureAnimationState:function(){a=[],this.options.animation&&[].slice.call(this.el.children).forEach(function(e){if("none"!==C(e,"display")&&e!==He.ghost){a.push({target:e,rect:D(e)});var t=s({},a[a.length-1].rect);if(e.thisAnimationDuration){var i=E(e,!0);i&&(t.top-=i.f,t.left-=i.e)}e.fromRect=t}})},addAnimationState:function(e){a.push(e)},removeAnimationState:function(e){a.splice(function(e,t){for(var i in e)if(e.hasOwnProperty(i))for(var a in t)if(t.hasOwnProperty(a)&&t[a]===e[i][a])return Number(i);return-1}(a,{target:e}),1)},animateAll:function(e){var t=this;if(!this.options.animation)return clearTimeout(i),void("function"==typeof e&&e());var r=!1,o=0;a.forEach(function(e){var i=0,a=e.target,n=a.fromRect,s=D(a),d=a.prevFromRect,l=a.prevToRect,c=e.rect,h=E(a,!0);h&&(s.top-=h.f,s.left-=h.e),a.toRect=s,a.thisAnimationDuration&&B(d,s)&&!B(n,s)&&(c.top-s.top)/(c.left-s.left)===(n.top-s.top)/(n.left-s.left)&&(i=function(e,t,i,a){return Math.sqrt(Math.pow(t.top-e.top,2)+Math.pow(t.left-e.left,2))/Math.sqrt(Math.pow(t.top-i.top,2)+Math.pow(t.left-i.left,2))*a.animation}(c,d,l,t.options)),B(s,n)||(a.prevFromRect=n,a.prevToRect=s,i||(i=t.options.animation),t.animate(a,c,s,i)),i&&(r=!0,o=Math.max(o,i),clearTimeout(a.animationResetTimer),a.animationResetTimer=setTimeout(function(){a.animationTime=0,a.prevFromRect=null,a.fromRect=null,a.prevToRect=null,a.thisAnimationDuration=null},i),a.thisAnimationDuration=i)}),clearTimeout(i),r?i=setTimeout(function(){"function"==typeof e&&e()},o):"function"==typeof e&&e(),a=[]},animate:function(e,t,i,a){if(a){C(e,"transition",""),C(e,"transform","");var r=E(this.el),o=r&&r.a,n=r&&r.d,s=(t.left-i.left)/(o||1),d=(t.top-i.top)/(n||1);e.animatingX=!!s,e.animatingY=!!d,C(e,"transform","translate3d("+s+"px,"+d+"px,0)"),this.forRepaintDummy=function(e){return e.offsetWidth}(e),C(e,"transition","transform "+a+"ms"+(this.options.easing?" "+this.options.easing:"")),C(e,"transform","translate3d(0,0,0)"),"number"==typeof e.animated&&clearTimeout(e.animated),e.animated=setTimeout(function(){C(e,"transition",""),C(e,"transform",""),e.animated=!1,e.animatingX=!1,e.animatingY=!1},a)}}}))}function Ne(e,t,i,a,r,o,n,s){var d,l,p=e[V],u=p.options.onMove;return!window.CustomEvent||c||h?(d=document.createEvent("Event")).initEvent("move",!0,!0):d=new CustomEvent("move",{bubbles:!0,cancelable:!0}),d.to=t,d.from=e,d.dragged=i,d.draggedRect=a,d.related=r||t,d.relatedRect=o||D(t),d.willInsertAfter=s,d.originalEvent=n,e.dispatchEvent(d),u&&(l=u.call(p,d,n)),l}function Ve(e){e.draggable=!1}function Fe(){Se=!1}function Ue(e){for(var t=e.tagName+e.className+e.src+e.href+e.textContent,i=t.length,a=0;i--;)a+=t.charCodeAt(i);return a.toString(36)}function Ge(e){return setTimeout(e,0)}function We(e){return clearTimeout(e)}He.prototype={constructor:He,_isOutsideThisEl:function(e){this.el.contains(e)||e===this.el||(be=null)},_getDirection:function(e,t){return"function"==typeof this.options.direction?this.options.direction.call(this,e,t,J):this.options.direction},_onTapStart:function(e){if(e.cancelable){var t=this,i=this.el,a=this.options,r=a.preventOnFilter,o=e.type,n=e.touches&&e.touches[0]||e.pointerType&&"touch"===e.pointerType&&e,s=(n||e).target,d=e.target.shadowRoot&&(e.path&&e.path[0]||e.composedPath&&e.composedPath()[0])||s,l=a.filter;if(function(e){De.length=0;for(var t=e.getElementsByTagName("input"),i=t.length;i--;){var a=t[i];a.checked&&De.push(a)}}(i),!J&&!(/mousedown|pointerdown/.test(o)&&0!==e.button||a.disabled)&&!d.isContentEditable&&(this.nativeDraggable||!u||!s||"SELECT"!==s.tagName.toUpperCase())&&!((s=w(s,a.draggable,i,!1))&&s.animated||ie===s)){if(oe=q(s),se=q(s,a.draggable),"function"==typeof l){if(l.call(this,e,s,this))return K({sortable:t,rootEl:d,name:"filter",targetEl:s,toEl:i,fromEl:i}),Y("filter",t,{evt:e}),void(r&&e.preventDefault())}else if(l&&(l=l.split(",").some(function(a){if(a=w(d,a.trim(),i,!1))return K({sortable:t,rootEl:a,name:"filter",targetEl:s,fromEl:i,toEl:i}),Y("filter",t,{evt:e}),!0})))return void(r&&e.preventDefault());a.handle&&!w(d,a.handle,i,!1)||this._prepareDragStart(e,n,s)}}},_prepareDragStart:function(e,t,i){var a,r=this,o=r.el,n=r.options,s=o.ownerDocument;if(i&&!J&&i.parentNode===o){var d=D(i);if(ee=o,Z=(J=i).parentNode,te=J.nextSibling,ie=i,le=n.group,He.dragged=J,he={target:J,clientX:(t||e).clientX,clientY:(t||e).clientY},ge=he.clientX-d.left,_e=he.clientY-d.top,this._lastX=(t||e).clientX,this._lastY=(t||e).clientY,J.style["will-change"]="all",a=function(){Y("delayEnded",r,{evt:e}),He.eventCanceled?r._onDrop():(r._disableDelayedDragEvents(),!p&&r.nativeDraggable&&(J.draggable=!0),r._triggerDragStart(e,t),K({sortable:r,name:"choose",originalEvent:e}),$(J,n.chosenClass,!0))},n.ignore.split(",").forEach(function(e){A(J,e.trim(),Ve)}),f(s,"dragover",Re),f(s,"mousemove",Re),f(s,"touchmove",Re),n.supportPointer?(f(s,"pointerup",r._onDrop),!this.nativeDraggable&&f(s,"pointercancel",r._onDrop)):(f(s,"mouseup",r._onDrop),f(s,"touchend",r._onDrop),f(s,"touchcancel",r._onDrop)),p&&this.nativeDraggable&&(this.options.touchStartThreshold=4,J.draggable=!0),Y("delayStart",this,{evt:e}),!n.delay||n.delayOnTouchOnly&&!t||this.nativeDraggable&&(h||c))a();else{if(He.eventCanceled)return void this._onDrop();n.supportPointer?(f(s,"pointerup",r._disableDelayedDrag),f(s,"pointercancel",r._disableDelayedDrag)):(f(s,"mouseup",r._disableDelayedDrag),f(s,"touchend",r._disableDelayedDrag),f(s,"touchcancel",r._disableDelayedDrag)),f(s,"mousemove",r._delayedDragTouchMoveHandler),f(s,"touchmove",r._delayedDragTouchMoveHandler),n.supportPointer&&f(s,"pointermove",r._delayedDragTouchMoveHandler),r._dragStartTimer=setTimeout(a,n.delay)}}},_delayedDragTouchMoveHandler:function(e){var t=e.touches?e.touches[0]:e;Math.max(Math.abs(t.clientX-this._lastX),Math.abs(t.clientY-this._lastY))>=Math.floor(this.options.touchStartThreshold/(this.nativeDraggable&&window.devicePixelRatio||1))&&this._disableDelayedDrag()},_disableDelayedDrag:function(){J&&Ve(J),clearTimeout(this._dragStartTimer),this._disableDelayedDragEvents()},_disableDelayedDragEvents:function(){var e=this.el.ownerDocument;b(e,"mouseup",this._disableDelayedDrag),b(e,"touchend",this._disableDelayedDrag),b(e,"touchcancel",this._disableDelayedDrag),b(e,"pointerup",this._disableDelayedDrag),b(e,"pointercancel",this._disableDelayedDrag),b(e,"mousemove",this._delayedDragTouchMoveHandler),b(e,"touchmove",this._delayedDragTouchMoveHandler),b(e,"pointermove",this._delayedDragTouchMoveHandler)},_triggerDragStart:function(e,t){t=t||"touch"==e.pointerType&&e,!this.nativeDraggable||t?this.options.supportPointer?f(document,"pointermove",this._onTouchMove):f(document,t?"touchmove":"mousemove",this._onTouchMove):(f(J,"dragend",this),f(ee,"dragstart",this._onDragStart));try{document.selection?Ge(function(){document.selection.empty()}):window.getSelection().removeAllRanges()}catch(e){}},_dragStarted:function(e,t){if(xe=!1,ee&&J){Y("dragStarted",this,{evt:t}),this.nativeDraggable&&f(document,"dragover",Le);var i=this.options;!e&&$(J,i.dragClass,!1),$(J,i.ghostClass,!0),He.active=this,e&&this._appendGhost(),K({sortable:this,name:"start",originalEvent:t})}else this._nulling()},_emulateDragOver:function(){if(pe){this._lastX=pe.clientX,this._lastY=pe.clientY,Ie();for(var e=document.elementFromPoint(pe.clientX,pe.clientY),t=e;e&&e.shadowRoot&&(e=e.shadowRoot.elementFromPoint(pe.clientX,pe.clientY))!==t;)t=e;if(J.parentNode[V]._isOutsideThisEl(e),t)do{if(t[V]&&t[V]._onDragOver({clientX:pe.clientX,clientY:pe.clientY,target:e,rootEl:t})&&!this.options.dragoverBubble)break;e=t}while(t=y(t));je()}},_onTouchMove:function(e){if(he){var t=this.options,i=t.fallbackTolerance,a=t.fallbackOffset,r=e.touches?e.touches[0]:e,o=Q&&E(Q,!0),n=Q&&o&&o.a,s=Q&&o&&o.d,d=Te&&we&&O(we),l=(r.clientX-he.clientX+a.x)/(n||1)+(d?d[0]-Ae[0]:0)/(n||1),c=(r.clientY-he.clientY+a.y)/(s||1)+(d?d[1]-Ae[1]:0)/(s||1);if(!He.active&&!xe){if(i&&Math.max(Math.abs(r.clientX-this._lastX),Math.abs(r.clientY-this._lastY))<i)return;this._onDragStart(e,!0)}if(Q){o?(o.e+=l-(ue||0),o.f+=c-(me||0)):o={a:1,b:0,c:0,d:1,e:l,f:c};var h="matrix(".concat(o.a,",").concat(o.b,",").concat(o.c,",").concat(o.d,",").concat(o.e,",").concat(o.f,")");C(Q,"webkitTransform",h),C(Q,"mozTransform",h),C(Q,"msTransform",h),C(Q,"transform",h),ue=l,me=c,pe=r}e.cancelable&&e.preventDefault()}},_appendGhost:function(){if(!Q){var e=this.options.fallbackOnBody?document.body:ee,t=D(J,!0,Te,!0,e),i=this.options;if(Te){for(we=e;"static"===C(we,"position")&&"none"===C(we,"transform")&&we!==document;)we=we.parentNode;we!==document.body&&we!==document.documentElement?(we===document&&(we=S()),t.top+=we.scrollTop,t.left+=we.scrollLeft):we=S(),Ae=O(we)}$(Q=J.cloneNode(!0),i.ghostClass,!1),$(Q,i.fallbackClass,!0),$(Q,i.dragClass,!0),C(Q,"transition",""),C(Q,"transform",""),C(Q,"box-sizing","border-box"),C(Q,"margin",0),C(Q,"top",t.top),C(Q,"left",t.left),C(Q,"width",t.width),C(Q,"height",t.height),C(Q,"opacity","0.8"),C(Q,"position",Te?"absolute":"fixed"),C(Q,"zIndex","100000"),C(Q,"pointerEvents","none"),He.ghost=Q,e.appendChild(Q),C(Q,"transform-origin",ge/parseInt(Q.style.width)*100+"% "+_e/parseInt(Q.style.height)*100+"%")}},_onDragStart:function(e,t){var i=this,a=e.dataTransfer,r=i.options;Y("dragStart",this,{evt:e}),He.eventCanceled?this._onDrop():(Y("setupClone",this),He.eventCanceled||((ae=R(J)).removeAttribute("id"),ae.draggable=!1,ae.style["will-change"]="",this._hideClone(),$(ae,this.options.chosenClass,!1),He.clone=ae),i.cloneId=Ge(function(){Y("clone",i),He.eventCanceled||(i.options.removeCloneOnHide||ee.insertBefore(ae,J),i._hideClone(),K({sortable:i,name:"clone"}))}),!t&&$(J,r.dragClass,!0),t?(ke=!0,i._loopId=setInterval(i._emulateDragOver,50)):(b(document,"mouseup",i._onDrop),b(document,"touchend",i._onDrop),b(document,"touchcancel",i._onDrop),a&&(a.effectAllowed="move",r.setData&&r.setData.call(i,a,J)),f(document,"drop",i),C(J,"transform","translateZ(0)")),xe=!0,i._dragStartId=Ge(i._dragStarted.bind(i,t,e)),f(document,"selectstart",i),fe=!0,window.getSelection().removeAllRanges(),u&&C(document.body,"user-select","none"))},_onDragOver:function(e){var t,i,a,r,o=this.el,n=e.target,d=this.options,l=d.group,c=He.active,h=le===l,p=d.sort,u=ce||c,m=this,g=!1;if(!Se){if(void 0!==e.preventDefault&&e.cancelable&&e.preventDefault(),n=w(n,d.draggable,o,!0),R("dragOver"),He.eventCanceled)return g;if(J.contains(e.target)||n.animated&&n.animatingX&&n.animatingY||m._ignoreWhileAnimating===n)return H(!1);if(ke=!1,c&&!d.disabled&&(h?p||(a=Z!==ee):ce===this||(this.lastPutMode=le.checkPull(this,c,J,e))&&l.checkPut(this,c,J,e))){if(r="vertical"===this._getDirection(e,n),t=D(J),R("dragOverValid"),He.eventCanceled)return g;if(a)return Z=ee,L(),this._hideClone(),R("revert"),He.eventCanceled||(te?ee.insertBefore(J,te):ee.appendChild(J)),H(!0);var _=M(o,d.draggable);if(!_||function(e,t,i){var a=D(M(i.el,i.options.draggable)),r=N(i.el,i.options,Q);return t?e.clientX>r.right+10||e.clientY>a.bottom&&e.clientX>a.left:e.clientY>r.bottom+10||e.clientX>a.right&&e.clientY>a.top}(e,r,this)&&!_.animated){if(_===J)return H(!1);if(_&&o===e.target&&(n=_),n&&(i=D(n)),!1!==Ne(ee,o,J,t,n,i,e,!!n))return L(),_&&_.nextSibling?o.insertBefore(J,_.nextSibling):o.appendChild(J),Z=o,F(),H(!0)}else if(_&&function(e,t,i){var a=D(T(i.el,0,i.options,!0)),r=N(i.el,i.options,Q);return t?e.clientX<r.left-10||e.clientY<a.top&&e.clientX<a.right:e.clientY<r.top-10||e.clientY<a.bottom&&e.clientX<a.left}(e,r,this)){var f=T(o,0,d,!0);if(f===J)return H(!1);if(i=D(n=f),!1!==Ne(ee,o,J,t,n,i,e,!1))return L(),o.insertBefore(J,f),Z=o,F(),H(!0)}else if(n.parentNode===o){i=D(n);var b,v,y,x=J.parentNode!==o,k=!function(e,t,i){var a=i?e.left:e.top,r=i?e.right:e.bottom,o=i?e.width:e.height,n=i?t.left:t.top,s=i?t.right:t.bottom,d=i?t.width:t.height;return a===n||r===s||a+o/2===n+d/2}(J.animated&&J.toRect||t,n.animated&&n.toRect||i,r),E=r?"top":"left",A=z(n,"top","top")||z(J,"top","top"),S=A?A.scrollTop:void 0;if(be!==n&&(v=i[E],Ce=!1,Ee=!k&&d.invertSwap||x),b=function(e,t,i,a,r,o,n,s){var d=a?e.clientY:e.clientX,l=a?i.height:i.width,c=a?i.top:i.left,h=a?i.bottom:i.right,p=!1;if(!n)if(s&&ye<l*r){if(!Ce&&(1===ve?d>c+l*o/2:d<h-l*o/2)&&(Ce=!0),Ce)p=!0;else if(1===ve?d<c+ye:d>h-ye)return-ve}else if(d>c+l*(1-r)/2&&d<h-l*(1-r)/2)return function(e){return q(J)<q(e)?1:-1}(t);return(p=p||n)&&(d<c+l*o/2||d>h-l*o/2)?d>c+l/2?1:-1:0}(e,n,i,r,k?1:d.swapThreshold,null==d.invertedSwapThreshold?d.swapThreshold:d.invertedSwapThreshold,Ee,be===n),0!==b){var O=q(J);do{O-=b,y=Z.children[O]}while(y&&("none"===C(y,"display")||y===Q))}if(0===b||y===n)return H(!1);be=n,ve=b;var P=n.nextElementSibling,B=!1,I=Ne(ee,o,J,t,n,i,e,B=1===b);if(!1!==I)return 1!==I&&-1!==I||(B=1===I),Se=!0,setTimeout(Fe,30),L(),B&&!P?o.appendChild(J):n.parentNode.insertBefore(J,B?P:n),A&&j(A,0,S-A.scrollTop),Z=J.parentNode,void 0===v||Ee||(ye=Math.abs(v-D(n)[E])),F(),H(!0)}if(o.contains(J))return H(!1)}return!1}function R(d,l){Y(d,m,s({evt:e,isOwner:h,axis:r?"vertical":"horizontal",revert:a,dragRect:t,targetRect:i,canSort:p,fromSortable:u,target:n,completed:H,onMove:function(i,a){return Ne(ee,o,J,t,i,D(i),e,a)},changed:F},l))}function L(){R("dragOverAnimationCapture"),m.captureAnimationState(),m!==u&&u.captureAnimationState()}function H(t){return R("dragOverCompleted",{insertion:t}),t&&(h?c._hideClone():c._showClone(m),m!==u&&($(J,ce?ce.options.ghostClass:c.options.ghostClass,!1),$(J,d.ghostClass,!0)),ce!==m&&m!==He.active?ce=m:m===He.active&&ce&&(ce=null),u===m&&(m._ignoreWhileAnimating=n),m.animateAll(function(){R("dragOverAnimationComplete"),m._ignoreWhileAnimating=null}),m!==u&&(u.animateAll(),u._ignoreWhileAnimating=null)),(n===J&&!J.animated||n===o&&!n.animated)&&(be=null),d.dragoverBubble||e.rootEl||n===document||(J.parentNode[V]._isOutsideThisEl(e.target),!t&&Re(e)),!d.dragoverBubble&&e.stopPropagation&&e.stopPropagation(),g=!0}function F(){ne=q(J),de=q(J,d.draggable),K({sortable:m,name:"change",toEl:o,newIndex:ne,newDraggableIndex:de,originalEvent:e})}},_ignoreWhileAnimating:null,_offMoveEvents:function(){b(document,"mousemove",this._onTouchMove),b(document,"touchmove",this._onTouchMove),b(document,"pointermove",this._onTouchMove),b(document,"dragover",Re),b(document,"mousemove",Re),b(document,"touchmove",Re)},_offUpEvents:function(){var e=this.el.ownerDocument;b(e,"mouseup",this._onDrop),b(e,"touchend",this._onDrop),b(e,"pointerup",this._onDrop),b(e,"pointercancel",this._onDrop),b(e,"touchcancel",this._onDrop),b(document,"selectstart",this)},_onDrop:function(e){var t=this.el,i=this.options;ne=q(J),de=q(J,i.draggable),Y("drop",this,{evt:e}),Z=J&&J.parentNode,ne=q(J),de=q(J,i.draggable),He.eventCanceled||(xe=!1,Ee=!1,Ce=!1,clearInterval(this._loopId),clearTimeout(this._dragStartTimer),We(this.cloneId),We(this._dragStartId),this.nativeDraggable&&(b(document,"drop",this),b(t,"dragstart",this._onDragStart)),this._offMoveEvents(),this._offUpEvents(),u&&C(document.body,"user-select",""),C(J,"transform",""),e&&(fe&&(e.cancelable&&e.preventDefault(),!i.dropBubble&&e.stopPropagation()),Q&&Q.parentNode&&Q.parentNode.removeChild(Q),(ee===Z||ce&&"clone"!==ce.lastPutMode)&&ae&&ae.parentNode&&ae.parentNode.removeChild(ae),J&&(this.nativeDraggable&&b(J,"dragend",this),Ve(J),J.style["will-change"]="",fe&&!xe&&$(J,ce?ce.options.ghostClass:this.options.ghostClass,!1),$(J,this.options.chosenClass,!1),K({sortable:this,name:"unchoose",toEl:Z,newIndex:null,newDraggableIndex:null,originalEvent:e}),ee!==Z?(ne>=0&&(K({rootEl:Z,name:"add",toEl:Z,fromEl:ee,originalEvent:e}),K({sortable:this,name:"remove",toEl:Z,originalEvent:e}),K({rootEl:Z,name:"sort",toEl:Z,fromEl:ee,originalEvent:e}),K({sortable:this,name:"sort",toEl:Z,originalEvent:e})),ce&&ce.save()):ne!==oe&&ne>=0&&(K({sortable:this,name:"update",toEl:Z,originalEvent:e}),K({sortable:this,name:"sort",toEl:Z,originalEvent:e})),He.active&&(null!=ne&&-1!==ne||(ne=oe,de=se),K({sortable:this,name:"end",toEl:Z,originalEvent:e}),this.save())))),this._nulling()},_nulling:function(){Y("nulling",this),ee=J=Z=Q=te=ae=ie=re=he=pe=fe=ne=de=oe=se=be=ve=ce=le=He.dragged=He.ghost=He.clone=He.active=null;var e=this.el;De.forEach(function(t){e.contains(t)&&(t.checked=!0)}),De.length=ue=me=0},handleEvent:function(e){switch(e.type){case"drop":case"dragend":this._onDrop(e);break;case"dragenter":case"dragover":J&&(this._onDragOver(e),function(e){e.dataTransfer&&(e.dataTransfer.dropEffect="move"),e.cancelable&&e.preventDefault()}(e));break;case"selectstart":e.preventDefault()}},toArray:function(){for(var e,t=[],i=this.el.children,a=0,r=i.length,o=this.options;a<r;a++)w(e=i[a],o.draggable,this.el,!1)&&t.push(e.getAttribute(o.dataIdAttr)||Ue(e));return t},sort:function(e,t){var i={},a=this.el;this.toArray().forEach(function(e,t){var r=a.children[t];w(r,this.options.draggable,a,!1)&&(i[e]=r)},this),t&&this.captureAnimationState(),e.forEach(function(e){i[e]&&(a.removeChild(i[e]),a.appendChild(i[e]))}),t&&this.animateAll()},save:function(){var e=this.options.store;e&&e.set&&e.set(this)},closest:function(e,t){return w(e,t||this.options.draggable,this.el,!1)},option:function(e,t){var i=this.options;if(void 0===t)return i[e];var a=G.modifyOption(this,e,t);i[e]=void 0!==a?a:t,"group"===e&&Be(i)},destroy:function(){Y("destroy",this);var e=this.el;e[V]=null,b(e,"mousedown",this._onTapStart),b(e,"touchstart",this._onTapStart),b(e,"pointerdown",this._onTapStart),this.nativeDraggable&&(b(e,"dragover",this),b(e,"dragenter",this)),Array.prototype.forEach.call(e.querySelectorAll("[draggable]"),function(e){e.removeAttribute("draggable")}),this._onDrop(),this._disableDelayedDragEvents(),$e.splice($e.indexOf(this.el),1),this.el=e=null},_hideClone:function(){if(!re){if(Y("hideClone",this),He.eventCanceled)return;C(ae,"display","none"),this.options.removeCloneOnHide&&ae.parentNode&&ae.parentNode.removeChild(ae),re=!0}},_showClone:function(e){if("clone"===e.lastPutMode){if(re){if(Y("showClone",this),He.eventCanceled)return;J.parentNode!=ee||this.options.group.revertClone?te?ee.insertBefore(ae,te):ee.appendChild(ae):ee.insertBefore(ae,J),this.options.group.revertClone&&this.animate(J,ae),C(ae,"display",""),re=!1}}else this._hideClone()}},ze&&f(document,"touchmove",function(e){(He.active||xe)&&e.cancelable&&e.preventDefault()}),He.utils={on:f,off:b,css:C,find:A,is:function(e,t){return!!w(e,t,e,!1)},extend:function(e,t){if(e&&t)for(var i in t)t.hasOwnProperty(i)&&(e[i]=t[i]);return e},throttle:I,closest:w,toggleClass:$,clone:R,index:q,nextTick:Ge,cancelNextTick:We,detectDirection:Pe,getChild:T,expando:V},He.get=function(e){return e[V]},He.mount=function(){for(var e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];t[0].constructor===Array&&(t=t[0]),t.forEach(function(e){if(!e.prototype||!e.prototype.constructor)throw"Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(e));e.utils&&(He.utils=s(s({},He.utils),e.utils)),G.mount(e)})},He.create=function(e,t){return new He(e,t)},He.version="1.15.7";var Xe,Ye,Ke,Je,Ze,Qe,et=[],tt=!1;function it(){et.forEach(function(e){clearInterval(e.pid)}),et=[]}function at(){clearInterval(Qe)}var rt,ot=I(function(e,t,i,a){if(t.scroll){var r,o=(e.touches?e.touches[0]:e).clientX,n=(e.touches?e.touches[0]:e).clientY,s=t.scrollSensitivity,d=t.scrollSpeed,l=S(),c=!1;Ye!==i&&(Ye=i,it(),Xe=t.scroll,r=t.scrollFn,!0===Xe&&(Xe=P(i,!0)));var h=0,p=Xe;do{var u=p,m=D(u),g=m.top,_=m.bottom,f=m.left,b=m.right,v=m.width,y=m.height,w=void 0,x=void 0,k=u.scrollWidth,$=u.scrollHeight,E=C(u),A=u.scrollLeft,z=u.scrollTop;u===l?(w=v<k&&("auto"===E.overflowX||"scroll"===E.overflowX||"visible"===E.overflowX),x=y<$&&("auto"===E.overflowY||"scroll"===E.overflowY||"visible"===E.overflowY)):(w=v<k&&("auto"===E.overflowX||"scroll"===E.overflowX),x=y<$&&("auto"===E.overflowY||"scroll"===E.overflowY));var T=w&&(Math.abs(b-o)<=s&&A+v<k)-(Math.abs(f-o)<=s&&!!A),M=x&&(Math.abs(_-n)<=s&&z+y<$)-(Math.abs(g-n)<=s&&!!z);if(!et[h])for(var q=0;q<=h;q++)et[q]||(et[q]={});et[h].vx==T&&et[h].vy==M&&et[h].el===u||(et[h].el=u,et[h].vx=T,et[h].vy=M,clearInterval(et[h].pid),0==T&&0==M||(c=!0,et[h].pid=setInterval(function(){a&&0===this.layer&&He.active._onTouchMove(Ze);var t=et[this.layer].vy?et[this.layer].vy*d:0,i=et[this.layer].vx?et[this.layer].vx*d:0;"function"==typeof r&&"continue"!==r.call(He.dragged.parentNode[V],i,t,e,Ze,et[this.layer].el)||j(et[this.layer].el,i,t)}.bind({layer:h}),24))),h++}while(t.bubbleScroll&&p!==l&&(p=P(p,!1)));tt=c}},30),nt=function(e){var t=e.originalEvent,i=e.putSortable,a=e.dragEl,r=e.activeSortable,o=e.dispatchSortableEvent,n=e.hideGhostForTarget,s=e.unhideGhostForTarget;if(t){var d=i||r;n();var l=t.changedTouches&&t.changedTouches.length?t.changedTouches[0]:t,c=document.elementFromPoint(l.clientX,l.clientY);s(),d&&!d.el.contains(c)&&(o("spill"),this.onSpill({dragEl:a,putSortable:i}))}};function st(){}function dt(){}st.prototype={startIndex:null,dragStart:function(e){var t=e.oldDraggableIndex;this.startIndex=t},onSpill:function(e){var t=e.dragEl,i=e.putSortable;this.sortable.captureAnimationState(),i&&i.captureAnimationState();var a=T(this.sortable.el,this.startIndex,this.options);a?this.sortable.el.insertBefore(t,a):this.sortable.el.appendChild(t),this.sortable.animateAll(),i&&i.animateAll()},drop:nt},o(st,{pluginName:"revertOnSpill"}),dt.prototype={onSpill:function(e){var t=e.dragEl,i=e.putSortable||this.sortable;i.captureAnimationState(),t.parentNode&&t.parentNode.removeChild(t),i.animateAll()},drop:nt},o(dt,{pluginName:"removeOnSpill"});var lt,ct,ht,pt,ut,mt=[],gt=[],_t=!1,ft=!1,bt=!1;function vt(e,t){gt.forEach(function(i,a){var r=t.children[i.sortableIndex+(e?Number(a):0)];r?t.insertBefore(i,r):t.appendChild(i)})}function yt(){mt.forEach(function(e){e!==ht&&e.parentNode&&e.parentNode.removeChild(e)})}He.mount(new function(){function e(){for(var e in this.defaults={scroll:!0,forceAutoScrollFallback:!1,scrollSensitivity:30,scrollSpeed:10,bubbleScroll:!0},this)"_"===e.charAt(0)&&"function"==typeof this[e]&&(this[e]=this[e].bind(this))}return e.prototype={dragStarted:function(e){var t=e.originalEvent;this.sortable.nativeDraggable?f(document,"dragover",this._handleAutoScroll):this.options.supportPointer?f(document,"pointermove",this._handleFallbackAutoScroll):t.touches?f(document,"touchmove",this._handleFallbackAutoScroll):f(document,"mousemove",this._handleFallbackAutoScroll)},dragOverCompleted:function(e){var t=e.originalEvent;this.options.dragOverBubble||t.rootEl||this._handleAutoScroll(t)},drop:function(){this.sortable.nativeDraggable?b(document,"dragover",this._handleAutoScroll):(b(document,"pointermove",this._handleFallbackAutoScroll),b(document,"touchmove",this._handleFallbackAutoScroll),b(document,"mousemove",this._handleFallbackAutoScroll)),at(),it(),clearTimeout(x),x=void 0},nulling:function(){Ze=Ye=Xe=tt=Qe=Ke=Je=null,et.length=0},_handleFallbackAutoScroll:function(e){this._handleAutoScroll(e,!0)},_handleAutoScroll:function(e,t){var i=this,a=(e.touches?e.touches[0]:e).clientX,r=(e.touches?e.touches[0]:e).clientY,o=document.elementFromPoint(a,r);if(Ze=e,t||this.options.forceAutoScrollFallback||h||c||u){ot(e,this.options,o,t);var n=P(o,!0);!tt||Qe&&a===Ke&&r===Je||(Qe&&at(),Qe=setInterval(function(){var o=P(document.elementFromPoint(a,r),!0);o!==n&&(n=o,it()),ot(e,i.options,o,t)},10),Ke=a,Je=r)}else{if(!this.options.bubbleScroll||P(o,!0)===S())return void it();ot(e,this.options,P(o,!1),!1)}}},o(e,{pluginName:"scroll",initializeByDefault:!0})}),He.mount(dt,st),He.mount(new function(){function e(){this.defaults={swapClass:"sortable-swap-highlight"}}return e.prototype={dragStart:function(e){var t=e.dragEl;rt=t},dragOverValid:function(e){var t=e.completed,i=e.target,a=e.onMove,r=e.activeSortable,o=e.changed,n=e.cancel;if(r.options.swap){var s=this.sortable.el,d=this.options;if(i&&i!==s){var l=rt;!1!==a(i)?($(i,d.swapClass,!0),rt=i):rt=null,l&&l!==rt&&$(l,d.swapClass,!1)}o(),t(!0),n()}},drop:function(e){var t,i,a,r,o,n,s=e.activeSortable,d=e.putSortable,l=e.dragEl,c=d||this.sortable,h=this.options;rt&&$(rt,h.swapClass,!1),rt&&(h.swap||d&&d.options.swap)&&l!==rt&&(c.captureAnimationState(),c!==s&&s.captureAnimationState(),i=rt,o=(t=l).parentNode,n=i.parentNode,o&&n&&!o.isEqualNode(i)&&!n.isEqualNode(t)&&(a=q(t),r=q(i),o.isEqualNode(n)&&a<r&&r++,o.insertBefore(i,o.children[a]),n.insertBefore(t,n.children[r])),c.animateAll(),c!==s&&s.animateAll())},nulling:function(){rt=null}},o(e,{pluginName:"swap",eventProperties:function(){return{swapItem:rt}}})}),He.mount(new function(){function e(e){for(var t in this)"_"===t.charAt(0)&&"function"==typeof this[t]&&(this[t]=this[t].bind(this));e.options.avoidImplicitDeselect||(e.options.supportPointer?f(document,"pointerup",this._deselectMultiDrag):(f(document,"mouseup",this._deselectMultiDrag),f(document,"touchend",this._deselectMultiDrag))),f(document,"keydown",this._checkKeyDown),f(document,"keyup",this._checkKeyUp),this.defaults={selectedClass:"sortable-selected",multiDragKey:null,avoidImplicitDeselect:!1,setData:function(t,i){var a="";mt.length&&ct===e?mt.forEach(function(e,t){a+=(t?", ":"")+e.textContent}):a=i.textContent,t.setData("Text",a)}}}return e.prototype={multiDragKeyDown:!1,isMultiDrag:!1,delayStartGlobal:function(e){var t=e.dragEl;ht=t},delayEnded:function(){this.isMultiDrag=~mt.indexOf(ht)},setupClone:function(e){var t=e.sortable,i=e.cancel;if(this.isMultiDrag){for(var a=0;a<mt.length;a++)gt.push(R(mt[a])),gt[a].sortableIndex=mt[a].sortableIndex,gt[a].draggable=!1,gt[a].style["will-change"]="",$(gt[a],this.options.selectedClass,!1),mt[a]===ht&&$(gt[a],this.options.chosenClass,!1);t._hideClone(),i()}},clone:function(e){var t=e.sortable,i=e.rootEl,a=e.dispatchSortableEvent,r=e.cancel;this.isMultiDrag&&(this.options.removeCloneOnHide||mt.length&&ct===t&&(vt(!0,i),a("clone"),r()))},showClone:function(e){var t=e.cloneNowShown,i=e.rootEl,a=e.cancel;this.isMultiDrag&&(vt(!1,i),gt.forEach(function(e){C(e,"display","")}),t(),ut=!1,a())},hideClone:function(e){var t=this,i=(e.sortable,e.cloneNowHidden),a=e.cancel;this.isMultiDrag&&(gt.forEach(function(e){C(e,"display","none"),t.options.removeCloneOnHide&&e.parentNode&&e.parentNode.removeChild(e)}),i(),ut=!0,a())},dragStartGlobal:function(e){e.sortable,!this.isMultiDrag&&ct&&ct.multiDrag._deselectMultiDrag(),mt.forEach(function(e){e.sortableIndex=q(e)}),mt=mt.sort(function(e,t){return e.sortableIndex-t.sortableIndex}),bt=!0},dragStarted:function(e){var t=this,i=e.sortable;if(this.isMultiDrag){if(this.options.sort&&(i.captureAnimationState(),this.options.animation)){mt.forEach(function(e){e!==ht&&C(e,"position","absolute")});var a=D(ht,!1,!0,!0);mt.forEach(function(e){e!==ht&&L(e,a)}),ft=!0,_t=!0}i.animateAll(function(){ft=!1,_t=!1,t.options.animation&&mt.forEach(function(e){H(e)}),t.options.sort&&yt()})}},dragOver:function(e){var t=e.target,i=e.completed,a=e.cancel;ft&&~mt.indexOf(t)&&(i(!1),a())},revert:function(e){var t=e.fromSortable,i=e.rootEl,a=e.sortable,r=e.dragRect;mt.length>1&&(mt.forEach(function(e){a.addAnimationState({target:e,rect:ft?D(e):r}),H(e),e.fromRect=r,t.removeAnimationState(e)}),ft=!1,function(e,t){mt.forEach(function(i,a){var r=t.children[i.sortableIndex+(e?Number(a):0)];r?t.insertBefore(i,r):t.appendChild(i)})}(!this.options.removeCloneOnHide,i))},dragOverCompleted:function(e){var t=e.sortable,i=e.isOwner,a=e.insertion,r=e.activeSortable,o=e.parentEl,n=e.putSortable,s=this.options;if(a){if(i&&r._hideClone(),_t=!1,s.animation&&mt.length>1&&(ft||!i&&!r.options.sort&&!n)){var d=D(ht,!1,!0,!0);mt.forEach(function(e){e!==ht&&(L(e,d),o.appendChild(e))}),ft=!0}if(!i)if(ft||yt(),mt.length>1){var l=ut;r._showClone(t),r.options.animation&&!ut&&l&&gt.forEach(function(e){r.addAnimationState({target:e,rect:pt}),e.fromRect=pt,e.thisAnimationDuration=null})}else r._showClone(t)}},dragOverAnimationCapture:function(e){var t=e.dragRect,i=e.isOwner,a=e.activeSortable;if(mt.forEach(function(e){e.thisAnimationDuration=null}),a.options.animation&&!i&&a.multiDrag.isMultiDrag){pt=o({},t);var r=E(ht,!0);pt.top-=r.f,pt.left-=r.e}},dragOverAnimationComplete:function(){ft&&(ft=!1,yt())},drop:function(e){var t=e.originalEvent,i=e.rootEl,a=e.parentEl,r=e.sortable,o=e.dispatchSortableEvent,n=e.oldIndex,s=e.putSortable,d=s||this.sortable;if(t){var l=this.options,c=a.children;if(!bt)if(l.multiDragKey&&!this.multiDragKeyDown&&this._deselectMultiDrag(),$(ht,l.selectedClass,!~mt.indexOf(ht)),~mt.indexOf(ht))mt.splice(mt.indexOf(ht),1),lt=null,W({sortable:r,rootEl:i,name:"deselect",targetEl:ht,originalEvent:t});else{if(mt.push(ht),W({sortable:r,rootEl:i,name:"select",targetEl:ht,originalEvent:t}),t.shiftKey&&lt&&r.el.contains(lt)){var h=q(lt),p=q(ht);~h&&~p&&h!==p&&function(){var e,o;p>h?(o=h,e=p):(o=p,e=h+1);for(var n=l.filter;o<e;o++)~mt.indexOf(c[o])||w(c[o],l.draggable,a,!1)&&(n&&("function"==typeof n?n.call(r,t,c[o],r):n.split(",").some(function(e){return w(c[o],e.trim(),a,!1)}))||($(c[o],l.selectedClass,!0),mt.push(c[o]),W({sortable:r,rootEl:i,name:"select",targetEl:c[o],originalEvent:t})))}()}else lt=ht;ct=d}if(bt&&this.isMultiDrag){if(ft=!1,(a[V].options.sort||a!==i)&&mt.length>1){var u=D(ht),m=q(ht,":not(."+this.options.selectedClass+")");if(!_t&&l.animation&&(ht.thisAnimationDuration=null),d.captureAnimationState(),!_t&&(l.animation&&(ht.fromRect=u,mt.forEach(function(e){if(e.thisAnimationDuration=null,e!==ht){var t=ft?D(e):u;e.fromRect=t,d.addAnimationState({target:e,rect:t})}})),yt(),mt.forEach(function(e){c[m]?a.insertBefore(e,c[m]):a.appendChild(e),m++}),n===q(ht))){var g=!1;mt.forEach(function(e){e.sortableIndex===q(e)||(g=!0)}),g&&(o("update"),o("sort"))}mt.forEach(function(e){H(e)}),d.animateAll()}ct=d}(i===a||s&&"clone"!==s.lastPutMode)&&gt.forEach(function(e){e.parentNode&&e.parentNode.removeChild(e)})}},nullingGlobal:function(){this.isMultiDrag=bt=!1,gt.length=0},destroyGlobal:function(){this._deselectMultiDrag(),b(document,"pointerup",this._deselectMultiDrag),b(document,"mouseup",this._deselectMultiDrag),b(document,"touchend",this._deselectMultiDrag),b(document,"keydown",this._checkKeyDown),b(document,"keyup",this._checkKeyUp)},_deselectMultiDrag:function(e){if(!(void 0!==bt&&bt||ct!==this.sortable||e&&w(e.target,this.options.draggable,this.sortable.el,!1)||e&&0!==e.button))for(;mt.length;){var t=mt[0];$(t,this.options.selectedClass,!1),mt.shift(),W({sortable:this.sortable,rootEl:this.sortable.el,name:"deselect",targetEl:t,originalEvent:e})}},_checkKeyDown:function(e){e.key===this.options.multiDragKey&&(this.multiDragKeyDown=!0)},_checkKeyUp:function(e){e.key===this.options.multiDragKey&&(this.multiDragKeyDown=!1)}},o(e,{pluginName:"multiDrag",utils:{select:function(e){var t=e.parentNode[V];t&&t.options.multiDrag&&!~mt.indexOf(e)&&(ct&&ct!==t&&(ct.multiDrag._deselectMultiDrag(),ct=t),$(e,t.options.selectedClass,!0),mt.push(e))},deselect:function(e){var t=e.parentNode[V],i=mt.indexOf(e);t&&t.options.multiDrag&&~i&&($(e,t.options.selectedClass,!1),mt.splice(i,1))}},eventProperties:function(){var e,t=this,i=[],r=[];return mt.forEach(function(e){var a;i.push({multiDragElement:e,index:e.sortableIndex}),a=ft&&e!==ht?-1:ft?q(e,":not(."+t.options.selectedClass+")"):q(e),r.push({multiDragElement:e,index:a})}),{items:(e=mt,function(e){if(Array.isArray(e))return a(e)}(e)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(e)||function(e,t){if(e){if("string"==typeof e)return a(e,t);var i={}.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?a(e,t):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),clones:[].concat(gt),oldIndicies:i,newIndicies:r}},optionListeners:{multiDragKey:function(e){return"ctrl"===(e=e.toLowerCase())?e="Control":e.length>1&&(e=e.charAt(0).toUpperCase()+e.substr(1)),e}}})});const wt=He;i.d(t,["A",0,wt])},8455(e){"use strict";const t=Object.freeze({cold:"cold",door:"door",garage_door:"garage_door",lock:"lock",moisture:"moisture",motion:"motion",safety:"safety",smoke:"smoke",sound:"sound",vibration:"vibration",window:"window"});e.exports={collectAreaBinarySensorValues:function({areaId:e,areaEntityIds:t,states:i,deviceClasses:a,explicitEntityIds:r,unavailableStates:o,offStates:n,belongsToArea:s,summary:d,displayName:l,stateLabel:c}){const h=t.map(e=>i[e]).filter(e=>e?.entity_id?.startsWith("binary_sensor.")),p=[];for(const e of a){const t=h.filter(t=>t.attributes.device_class===e&&!o.includes(t.state));if(!t.length)continue;const i=t.filter(e=>!n.includes(e.state)).length;p.push(d(e,i))}for(const t of r){if(!s(t,e))continue;const a=i[t];a&&!o.includes(a.state)&&p.push(`${l(t)}: ${c(a)}`)}return p},entityBelongsToArea:function(e,t,{entitiesById:i,entities:a=[],devicesById:r}){const o=i?.get(e)||a.find(t=>t.entity_id===e);return!!o&&(o.area_id?o.area_id===t:!!o.device_id&&r?.get(o.device_id)?.area_id===t)},summaryTranslationKey:function(e,i){const a=t[e],r=0===i?"zero":1===i?"one":"many";return a?`area_binary_sensor.summary.${a}.${r}`:`area_binary_sensor.summary.fallback.${r}`}}},3931(e){"use strict";e.exports={CardBuildOwner:class{constructor({loadHelpers:e,createCard:t,reportError:i=(e,t)=>console.error(e,t)}){if("function"!=typeof e||"function"!=typeof t)throw new TypeError("CardBuildOwner requires helper and card factories");this._loadHelpers=e,this._createCard=t,this._reportError=i,this._generation=0}async build(e,t){const i=++this._generation;try{const a=await this._loadHelpers(),r=await this._createCard(a,e,t);if(i!==this._generation)return;return r&&(r.hass=t),r}catch(e){return void this._reportError("Failed to create popup card",e)}}invalidate(){this._generation+=1}}}},3301(e){"use strict";e.exports={isInvalidDwainsCardElement:function(e,t){return Boolean(t&&(!e||"function"!=typeof e.setConfig||"hui-error-card"===e.localName))}}},3266(e){"use strict";class t{constructor({windowObject:e=("undefined"!=typeof window?window:void 0),delay:t=e=>new Promise(t=>setTimeout(t,e))}={}){this._window=e,this._delay=t,this._helpers=void 0,this._pending=void 0,this._configElementLoads=new Map}preloadConfigElement(e="button"){if("string"!=typeof e||0===e.length)return Promise.reject(new TypeError("Card type must be a non-empty string"));const t=this._configElementLoads.get(e);if(t)return t;const i=this.load().then(async t=>{const i=await t.createCardElement({type:e}),a=i?.constructor?.getConfigElement;if("function"!=typeof a)throw new TypeError(`Card type ${e} does not provide getConfigElement()`);await a.call(i.constructor)});return this._configElementLoads.set(e,i),i.then(void 0,t=>(this._configElementLoads.get(e)===i&&this._configElementLoads.delete(e),t)),i}load(e=20){return this._helpers?.createCardElement?Promise.resolve(this._helpers):(this._pending||(this._pending=this._load(e).then(e=>(this._helpers=e,this._pending=void 0,e),e=>{throw this._pending=void 0,e})),this._pending)}async _load(e){let t;for(let a=0;a<e;a+=1){try{const e=this._window?.loadCardHelpers;if("function"==typeof e){const i=await e.call(this._window);if(i?.createCardElement)return i;t=new TypeError("loadCardHelpers returned an invalid helper object")}else t=new TypeError("window.loadCardHelpers is not available")}catch(i){t=i}await this._delay(a<5?100:300)}const i=new Error(`Card helpers not loaded after ${e} attempts`);throw i.cause=t,i}}const i=new t;e.exports={CardHelpersLoader:t,cardHelpersLoader:i,loadCardHelpers:e=>i.load(e),preloadCardConfigElement:e=>i.preloadConfigElement(e)}},6205(e,t,i){"use strict";const{findHcMain:a,findHomeAssistantHost:r}=i(2708);function o(e,t,i){const o=new Event(e,{bubbles:!0,cancelable:!1,composed:!0});o.detail=t||{};const n=i||a()||r();return n?.dispatchEvent(o),o}async function n(e,t,i){const a="string"==typeof t?t.split(/(\$| )/):[...t];""===a.at(-1)&&a.pop();let r=e;for(const[e,t]of a.entries())if(t.trim()){if(!r)return null;r.localName?.includes("-")&&await customElements.whenDefined(r.localName),r.updateComplete&&await r.updateComplete,r="$"===t?i&&e===a.length-1?[r.shadowRoot]:r.shadowRoot:i&&e===a.length-1?r.querySelectorAll(t):r.querySelector(t)}return r}async function s(e,t,i=!1,a=1e4){let r;const o=Symbol("select-tree-timeout");try{const s=await Promise.race([n(e,t,i),new Promise(e=>{r=setTimeout(()=>e(o),a)})]);return s===o?null:s}finally{void 0!==r&&clearTimeout(r)}}e.exports={fireEvent:o,moreInfo:async function(e,t=!1){const i=a()||r();if(!i)return null;o("hass-more-info",{entityId:e},i);const n=await s(i,"$ ha-more-info-dialog");return n&&(n.large=t),n},selectTree:s}},3118(e){"use strict";e.exports={ConnectedLoadOwner:class{constructor(e,{reportError:t,errorMessage:i="Connected load failed"}={}){if("function"!=typeof e)throw new TypeError("ConnectedLoadOwner requires a load function");this._load=e,this._reportError=t,this._errorMessage=i,this._connected=!1,this._ready=!1,this._loaded=!1,this._pending=void 0,this._generation=0,this._abortController=void 0}connect(){return this._connected=!0,this._start()}ready(){return this._ready=!0,this._start()}reload(){return this._abortController?.abort("reload"),this._abortController=void 0,this._loaded=!1,this._pending=void 0,this._generation+=1,this._start()}disconnect(){this._abortController?.abort("disconnect"),this._abortController=void 0,this._connected=!1,this._loaded=!1,this._pending=void 0,this._generation+=1}_start(){if(!this._connected||!this._ready||this._loaded)return;if(this._pending)return this._pending;const e=++this._generation,t=new AbortController;this._abortController=t;const i=()=>this._connected&&e===this._generation,a=Promise.resolve().then(()=>this._load({isCurrent:i,signal:t.signal})).then(e=>(i()&&(this._loaded=!0),e),e=>{throw e}).finally(()=>{this._pending===a&&(this._pending=void 0),this._abortController===t&&(this._abortController=void 0)});return this._pending=a,"function"==typeof this._reportError&&a.catch(e=>this._reportError(this._errorMessage,e)),a}}}},572(e,t,i){"use strict";const{getDwainsRuntimeState:a}=i(624);function r(e){if("string"!=typeof e)return!1;const t=e.endsWith("-ddfix")?e.slice(0,-6):e;return t.startsWith("dwains-")||"homepage-card"===t||"devices-card"===t||"more-page-card"===t||"more-pages-card"===t||"dwainsboard-navigation-card"===t}function o(e,t,{registry:i=("undefined"==typeof customElements?void 0:customElements),reportError:a=(...e)=>console.error(...e)}={}){if("string"!=typeof e||!e.includes("-"))throw new TypeError(`Invalid custom-element name: ${e}`);if(!i||"function"!=typeof i.define)throw new TypeError("A CustomElementRegistry is required");if(!i.get(e))try{return i.define(e,t)}catch(t){return void a("[dwains] define failed:",e,t)}}e.exports={defineDwainsElement:function(e,t,i={}){if(!r(e))throw new TypeError(`Not a Dwains custom-element name: ${e}`);const{windowObject:n=("undefined"==typeof window?void 0:window),reportError:s=(...e)=>console.error(...e)}=i;return function(e,t,i,r){try{const r=a(i);(r.constructors||={})[e]=t;const o=r.originalConstructors||={};o[e]||(o[e]=t)}catch(t){r("[dwains] failed to capture constructor:",e,t)}}(e,t,n,s),o(e,t,{...i,reportError:s})},defineOwnedElement:o,isDwainsElementName:r}},7465(e,t,i){"use strict";const{TimerOwner:a}=i(6687);e.exports={DashboardBootstrapOwner:class{constructor({target:e,findMain:t,createDashboard:i,retryDelay:r=150,timers:o=new a,reportError:n=(e,t)=>console.error(e,t)}){this._target=e,this._findMain=t,this._createDashboard=i,this._retryDelay=r,this._timers=o,this._reportError=n,this._start=this._start.bind(this)}connect(){return this._timers.connect(),this._start()}disconnect(){this._timers.disconnect()}_start(){if(this._target.dwains_dashboard)return this.disconnect(),this._target.dwains_dashboard;let e;try{e=this._findMain()}catch(e){return this.disconnect(),void this._reportError("Failed to initialize Dwains Dashboard",e)}if(e&&e.shadowRoot){this.disconnect();try{const e=this._createDashboard();return this._target.dwains_dashboard=e,e}catch(e){return void this._reportError("Failed to initialize Dwains Dashboard",e)}}else this._timers.schedule("dashboard-bootstrap",this._start,this._retryDelay,{replace:!1})}}}},8355(e,t,i){"use strict";const{websocketReadStore:a}=i(9012),{buildRegistryIndexes:r}=i(9632),{READ_MESSAGES:o}=i(2805);async function n(e,{optionalRegistries:t=!1,readStore:i=a}={}){const n=t?t=>i.readOptional(e,t,[]):t=>i.read(e,t),[s,d,l]=await Promise.all([n(o.devices),n(o.entities),i.read(e,o.configuration)]);return{devices:s,entities:d,configuration:l,...r(s,d)}}e.exports={loadDashboardCoreSnapshot:n,loadDashboardRegistrySnapshot:async function(e,{includeFloors:t=!1,readStore:i=a}={}){const r=[i.read(e,o.areas),n(e,{readStore:i})];t&&r.push(i.readOptional(e,o.floors,[]));const[s,d,l]=await Promise.all(r);return{areas:s,...d,...t?{floors:l,floorsById:new Map((l||[]).map(e=>[e.floor_id,e]))}:{}}}}},5704(e){"use strict";function t(e){return"/dwains-dashboard"===e||e?.startsWith("/dwains-dashboard/")}class i{constructor({windowObject:e=("undefined"!=typeof window?window:void 0),reportError:t=(e,t)=>console.error(e,t),createLocationChangedEvent:i=(e=!0)=>new CustomEvent("location-changed",{detail:{replace:e}})}={}){this._window=e,this._reportError=t,this._createLocationChangedEvent=i}navigate(e,{replace:t=!1}={}){const i=this._validDwainsUrl(e);if(!i)return!1;try{const e=`${i.pathname}${i.search}${i.hash}`,a=this._window.location;return`${a.pathname}${a.search}${a.hash}`!==e&&(t?this._window.history.replaceState(this._window.history.state||null,"",e):this._window.history.pushState(null,"",e),this._window.dispatchEvent(this._createLocationChangedEvent(t))),!0}catch(e){return this._reportError("Failed to navigate within Dwains Dashboard",e),!1}}navigateToDevices(e){const t=this._window?.location?.pathname;if(!t)return!1;const i=t.substring(0,t.lastIndexOf("/"));return this.navigate(`${i}/devices#${e}`)}_validDwainsUrl(e){if(e)try{const i=new URL(e,this._window.location.origin);return i.origin===this._window.location.origin&&t(i.pathname)?i:void 0}catch(e){return void this._reportError("Failed to validate a Dwains Dashboard route",e)}}}const a=new i;e.exports={DashboardRouteState:i,dashboardRouteState:a,isDwainsRoute:t}},1656(e){"use strict";e.exports={attachDeferredCard:function(e,t){if(!e||"function"!=typeof t)throw new TypeError("Deferred cards require an item and a card factory");let i;return e.cardFactory=()=>e.card?Promise.resolve(e.card):(i||(i=Promise.resolve().then(t).then(t=>(e.card=t,i=void 0,t)).catch(e=>{throw i=void 0,e})),i),e}}},8276(e){"use strict";e.exports={closeParentDropdown:function(e,{reportError:t=(e,t)=>console.error(e,t)}={}){try{const t="function"==typeof e?.composedPath?e.composedPath():[];let i=Array.isArray(t)?t.find(e=>"ha-dropdown"===e?.localName):void 0;return i||"function"!=typeof e?.currentTarget?.closest||(i=e.currentTarget.closest("ha-dropdown")),i||"function"!=typeof e?.target?.closest||(i=e.target.closest("ha-dropdown")),!!i&&("function"==typeof i.close?i.close():"open"in i?i.open=!1:i.removeAttribute("open"),!0)}catch(e){return t("Failed to close the parent Home Assistant dropdown",e),!1}}}},6659(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(8089);const{loadCardHelpers:n}=i(3266),{websocketReadStore:s}=i(9012),{defineDwainsElement:d}=i(572),l=n();class c extends r.WF{static get properties(){return{card:{},_hass:{}}}static getConfigElement(){return document.createElement("dwains-blueprint-card-editor")}set hass(e){this._hass=e,null!=this.card&&0!==this.card.length&&(this.card.hass=e)}async setConfig(e){const t=(this._configGeneration||0)+1;this._configGeneration=t,this._hass||(this._hass=(0,a.mo)());const i=e.data,r=e.input_entity?e.input_entity:"Error";let n;e.input_entity&&(n=e.input_name||(0,o.Hg)(this._hass,void 0,e.input_entity)),this.cardConfig=e.card;const s=JSON.stringify(e.card).replace(/\$([0-9]|[aA-zZ])*\$/g,function(t,a){const o=t.slice(1,-1);return"replace_with_input_entity"==o?r:"replace_with_input_name"==o?n:e.data?i[o]:void 0}).replaceAll('"false"',"false").replaceAll('"true"',"true"),d=await this.createCardElement2(JSON.parse(s));t===this._configGeneration&&(this.card=d)}disconnectedCallback(){super.disconnectedCallback(),this._configGeneration=(this._configGeneration||0)+1}async createCardElement2(e){const t=await l;return(0,o.Kq)(t,e,this._hass)}render(){return r.qy`
              ${this.card}
            `}static get styles(){return r.AH`
          `}}d("dwains-blueprint-card",c);class h extends r.WF{static get styles(){return[r.AH`
            ha-formfield, ha-textfield,.formfield {
              width: 100%;
            }
            .formfield {
              margin-bottom: 10px;
            }
            `]}static get properties(){return{inputs:{},blueprint:{}}}connectedCallback(){super.connectedCallback(),this._loadBlueprintsIfReady()}_loadBlueprintsIfReady(){this.isConnected&&this.hass&&this._config&&this._loadBlueprints().catch(e=>{console.error("Failed to load blueprint editor data",e)})}async _loadBlueprints(){this.blueprints=await s.read(this.hass,{type:"dwains_dashboard/get_blueprints"});const e=this.blueprints?.blueprints?.[this._config.blueprint];if(e){if(this.blueprint=e,e.blueprint?.input&&(this.inputs=e.blueprint.input,!this._config.data||0===this._config.data.length)){const e={};Object.entries(this.inputs).map(([t,i])=>e[t]=t),this._config.data=e}this._config.card=e.card;const t=new Event("config-changed",{bubbles:!0,composed:!0});t.detail={config:this._config},this.dispatchEvent(t)}}setConfig(e){this._config=e,this.hass||(this.hass=(0,a.mo)()),this._loadBlueprintsIfReady()}_inputChanged(e){const t=e.target.key,i=e.target.value,a=this._config;a.data[t]=i;const r=new Event("config-changed",{bubbles:!0,composed:!0});r.detail={config:a},this.dispatchEvent(r)}_checkboxChanged(e){const t=e.target.key,i=e.target.checked,a=this._config;a.data[t]=i;const r=new Event("config-changed",{bubbles:!0,composed:!0});r.detail={config:a},this.dispatchEvent(r)}_renderInput(e,t){let i,a="";return this._config.data&&this._config.data[e]&&this._config.data[e]!=e&&(a=this._config.data[e]),t.type&&"entity-picker"==t.type?i=r.qy`
            <ha-entity-picker
                label=${t.name}
                .value=${a}
                .key=${e}
                .hass=${this.hass}
                @value-changed=${this._inputChanged}
            ></ha-entity-picker>`:t.type&&"icon-picker"==t.type?i=r.qy`
            <ha-icon-picker
              label=${t.name}
              .value=${a}
              .key=${e}
              .name=${t.name}
              @value-changed=${this._inputChanged}
            ></ha-icon-picker>
            `:t.type&&"checkbox"==t.type?(a=!(a||!t.default_value)&&t.default_value,i=r.qy`
            <ha-formfield
                  style="display: block;"
                  label=${t.name}
                >
                <ha-checkbox
                    @change=${this._checkboxChanged}
                    .checked=${a}
                    .key=${e}
                    .name=${t.name}
                  ></ha-checkbox>
            </ha-formfield>
            `):i=r.qy`
            <ha-textfield
                label=${t.name}
                .value=${a}
                .key=${e}
                @input=${this._inputChanged}
            ></ha-textfield>
            `,r.qy`
          <div class="formfield">
            <strong>${t.description}</strong>
            ${i}
          </div>
          `}render(){return null==this.blueprints||0===this.blueprints.length?r.qy``:this.blueprint?this.inputs&&0!==this.inputs.length?r.qy`
            ${Object.entries(this.inputs).map(([e,t])=>r.qy`${this._renderInput(e,t)}`)}
          `:r.qy``:r.qy`Blueprint not found!`}}d("dwains-blueprint-card-editor",h)},5535(e,t,i){"use strict";var a=i(6684);const{loadCardHelpers:r}=i(3266),{defineDwainsElement:o}=i(572),n=Object.freeze([["alarm-panel","Alarm panel"],["area","Area"],["button","Button"],["calendar","Calendar"],["conditional","Conditional"],["entities","Entities"],["entity","Entity"],["entity-filter","Entity filter"],["gauge","Gauge"],["glance","Glance"],["grid","Grid"],["heading","Heading"],["history-graph","History graph"],["horizontal-stack","Horizontal stack"],["humidifier","Humidifier"],["iframe","Web page"],["light","Light"],["logbook","Logbook"],["map","Map"],["markdown","Markdown"],["media-control","Media control"],["picture","Picture"],["picture-elements","Picture elements"],["picture-entity","Picture entity"],["plant-status","Plant status"],["sensor","Sensor"],["shopping-list","Shopping list"],["statistic","Statistic"],["statistics-graph","Statistics graph"],["thermostat","Thermostat"],["tile","Tile"],["todo-list","To-do list"],["vertical-stack","Vertical stack"],["weather-forecast","Weather forecast"]]);function s(e,t){e.dispatchEvent(new CustomEvent("config-changed",{detail:{config:t},bubbles:!0,composed:!0}))}function d(e=window){const t=Array.isArray(e.customCards)?e.customCards:[],i=new Set;return t.map(e=>{const t="string"==typeof e?.type?e.type.trim():"";if(!t)return;const a=t.startsWith("custom:")?t:`custom:${t}`;return i.has(a)?void 0:(i.add(a),[a,e.name||t])}).filter(Boolean).sort((e,t)=>e[1].localeCompare(t[1]))}function l(e,t,i=customElements){const a=i?.get?.(function(e){return e.startsWith("custom:")?e.slice(7):`hui-${e}-card`}(e));return a||t?.constructor}class c extends a.WF{static properties={hass:{attribute:!1},_filter:{state:!0},_manualType:{state:!0},_selecting:{state:!0},_error:{state:!0}};constructor(){super(),this._filter="",this._manualType="",this._selecting=!1}_cards(){return[...n,...d()]}async _selectType(e){if(!this._selecting&&e){this._selecting=!0,this._error=void 0;try{s(this,await async function(e,t){const i={type:t},a=await r();let o;try{o=await a.createCardElement(i)}catch(e){console.warn(`Unable to instantiate ${t} while loading its defaults`,e)}const n=l(t,o),s=n?.getStubConfig;if("function"!=typeof s)return i;try{const a=Object.keys(e?.states||{}),r=await s.call(n,e,a,[]);return r&&"object"==typeof r?{type:t,...r}:i}catch(e){return console.warn(`Unable to create a default configuration for ${t}`,e),i}}(this.hass,e))}catch(t){this._error=t instanceof Error?t.message:String(t),console.error(`Unable to select Lovelace card ${e}`,t)}finally{this._selecting=!1}}}_cardClicked(e){this._selectType(e.currentTarget.dataset.type)}_manualSubmit(){let e=this._manualType.trim();e&&!e.includes(":")&&(e=`custom:${e}`),this._selectType(e)}render(){const e=this._filter.trim().toLowerCase(),t=this._cards().filter(([t,i])=>!e||t.toLowerCase().includes(e)||i.toLowerCase().includes(e));return a.qy`
      <div class="controls">
        <input
          type="search"
          placeholder="${this.hass?.localize?.("ui.common.search")||"Search"}"
          .value=${this._filter}
          @input=${e=>{this._filter=e.target.value}}
        />
      </div>
      <div class="cards">
        ${t.map(([e,t])=>a.qy`
          <button data-type=${e} @click=${this._cardClicked} ?disabled=${this._selecting}>
            <span>${t}</span><small>${e}</small>
          </button>
        `)}
      </div>
      <div class="manual">
        <input
          placeholder="custom:my-card"
          .value=${this._manualType}
          @input=${e=>{this._manualType=e.target.value}}
          @keydown=${e=>{"Enter"===e.key&&this._manualSubmit()}}
        />
        <ha-button @click=${this._manualSubmit} ?disabled=${this._selecting||!this._manualType.trim()}>
          ${this.hass?.localize?.("ui.common.add")||"Add"}
        </ha-button>
      </div>
      ${this._selecting?a.qy`<p class="status">Loading card editor…</p>`:""}
      ${this._error?a.qy`<p class="error">${this._error}</p>`:""}
    `}static styles=a.AH`
    :host { display: block; color: var(--primary-text-color); }
    input {
      box-sizing: border-box; width: 100%; min-height: 44px; padding: 10px 12px;
      border: 1px solid var(--divider-color); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
      font: inherit;
    }
    .cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(145px, 1fr)); gap: 8px; margin-top: 12px; }
    button {
      min-height: 62px; padding: 10px; border: 1px solid var(--divider-color); border-radius: 10px;
      color: var(--primary-text-color); background: var(--card-background-color); text-align: left; cursor: pointer;
    }
    button:hover { border-color: var(--primary-color); }
    button span, button small { display: block; overflow-wrap: anywhere; }
    button small { margin-top: 4px; color: var(--secondary-text-color); }
    .manual { display: grid; grid-template-columns: 1fr auto; gap: 8px; margin-top: 16px; }
    .status { color: var(--secondary-text-color); }
    .error { color: var(--error-color); overflow-wrap: anywhere; }
  `}class h extends a.WF{static properties={hass:{attribute:!1},lovelace:{attribute:!1},value:{attribute:!1},_fallbackText:{state:!0},_error:{state:!0},_loading:{state:!0}};constructor(){super(),this._generation=0,this._loading=!1,this._editor=void 0,this._loadedType=void 0,this._lastEmittedValue=void 0}disconnectedCallback(){super.disconnectedCallback(),this._generation+=1,this._editor=void 0,this._loadedType=void 0}updated(e){e.has("hass")&&this._editor&&(this._editor.hass=this.hass),e.has("lovelace")&&this._editor&&(this._editor.lovelace=this.lovelace||{views:[]}),(e.has("value")||e.has("hass"))&&(this.value!==this._lastEmittedValue?this._editor&&this._loadedType===this.value?.type?this._editor.setConfig(this.value):this._loadEditor():this._lastEmittedValue=void 0)}async _loadEditor(){if(!this.isConnected||!this.hass||!this.value?.type)return;const e=++this._generation;this._loading=!0,this._error=void 0,this._fallbackText=void 0;try{const t=await r();let i,a;try{i=await t.createCardElement(this.value)}catch(e){a=e}const o=l(this.value.type,i);if(!o&&a)throw a;const n=o?.getConfigElement,d="function"==typeof n?await n.call(o):void 0;if(!this.isConnected||e!==this._generation)return;if(!d||"function"!=typeof d.setConfig)return void(this._fallbackText=JSON.stringify(this.value,null,2));if(await this.updateComplete,!this.isConnected||e!==this._generation)return;d.hass=this.hass,d.lovelace=this.lovelace||{views:[]},d.setConfig(this.value),d.addEventListener("config-changed",e=>{e.stopPropagation(),e.detail?.config&&(this._lastEmittedValue=e.detail.config,s(this,e.detail.config))}),this.renderRoot.querySelector("#editor")?.replaceChildren(d),this._editor=d,this._loadedType=this.value.type}catch(t){if(!this.isConnected||e!==this._generation)return;this._error=t instanceof Error?t.message:String(t),this._fallbackText=JSON.stringify(this.value,null,2),console.error(`Unable to load the editor for ${this.value.type}`,t)}finally{e===this._generation&&(this._loading=!1)}}_fallbackChanged(e){this._fallbackText=e.target.value;try{const e=JSON.parse(this._fallbackText);this._error=void 0,this._lastEmittedValue=e,s(this,e)}catch(e){this._error=e instanceof Error?e.message:String(e)}}render(){return a.qy`
      <div id="editor"></div>
      ${this._loading?a.qy`<p class="status">Loading card editor…</p>`:""}
      ${void 0!==this._fallbackText?a.qy`
        <p>This card has no visual editor. Edit its JSON configuration:</p>
        <textarea .value=${this._fallbackText} @input=${this._fallbackChanged}></textarea>
      `:""}
      ${this._error?a.qy`<p class="error">${this._error}</p>`:""}
    `}static styles=a.AH`
    :host, #editor { display: block; width: 100%; }
    textarea {
      box-sizing: border-box; width: 100%; min-height: 220px; padding: 12px;
      border: 1px solid var(--divider-color); border-radius: 8px;
      color: var(--primary-text-color); background: var(--card-background-color);
      font: 13px/1.45 monospace; resize: vertical;
    }
    .status { color: var(--secondary-text-color); }
    .error { color: var(--error-color); overflow-wrap: anywhere; }
  `}class p extends a.WF{static properties={hass:{attribute:!1},config:{attribute:!1},_error:{state:!0}};constructor(){super(),this._generation=0}connectedCallback(){super.connectedCallback(),this.updateComplete.then(()=>this._loadPreview())}disconnectedCallback(){super.disconnectedCallback(),this._generation+=1}updated(e){(e.has("hass")||e.has("config"))&&this._loadPreview()}async _loadPreview(){if(!this.isConnected||!this.hass||!this.config?.type)return;const e=++this._generation;this._error=void 0;try{const t=await r(),i=await t.createCardElement(this.config);if(!this.isConnected||e!==this._generation)return;if(await this.updateComplete,!this.isConnected||e!==this._generation)return;i.hass=this.hass,this.renderRoot.querySelector("#preview")?.replaceChildren(i)}catch(t){if(!this.isConnected||e!==this._generation)return;this._error=t instanceof Error?t.message:String(t),console.error(`Unable to preview ${this.config.type}`,t)}}render(){return a.qy`<div id="preview"></div>${this._error?a.qy`<p>${this._error}</p>`:""}`}static styles=a.AH`
    :host { display: block; width: 100%; margin-top: 16px; }
    p { color: var(--error-color); overflow-wrap: anywhere; }
  `}o("dwains-card-picker",c),o("dwains-card-config-editor",h),o("dwains-card-preview",p)},3825(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{readSelectEvent:s}=i(151),{websocketReadStore:d}=i(9012),{ConnectedLoadOwner:l}=i(3118),{hassConnectionIdentity:c,hasHassConnectionChanged:h}=i(4776),{defineDwainsElement:p}=i(572);class u extends r.WF{constructor(){super(),this._connectedLoadOwner=new l(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load custom-card editor data"}),this._configReady=!1}set hass(e){const t=h(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}get hass(){return this._hass}static get styles(){return[r.AH`
        .edit-element {
          padding: 20px;
        }
        .add-button {
          font-size: 16px;
          border: 2px solid #4591B8;
          padding: 5px;
          margin-bottom: 50px;
          background: #459CEE;
          border-radius: 20px;
          color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .grid {
          display: grid;
          gap: 2rem;
        }
        @media (min-width: 768px){
          .grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }
        }
        .pre-select {
          padding: 2.5rem;
        }
        .pre-select-option {
          padding: 2.5rem;
          border: 1px solid #4591B8;
          text-align: center;
          cursor: pointer;
        }
        .pre-selected-option:hover {
          border: 2px solid #4591B8;
        }
        .seperator {
          background-color: var(--secondary-background-color);
          width: 100%;
          height: 3px;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
        }
        .bg-gray-50 {
          background-color: var(--secondary-background-color);
        }
        .tracking-wider {
            letter-spacing: .05em;
        }
        .text-sm {
          font-size: .875rem;
          line-height: 1.25rem;
        }
        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .font-medium {
            font-weight: 500;
        }
        .text-xs {
            font-size: .75rem;
            line-height: 1rem;
        }
        .text-left {
            text-align: left;
        }
        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        .card-dd-settings {
          padding: 0.75rem;
          border: 2px solid grey;
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 1rem;
        }
        ha-select, ha-textfield, ha-formfield {
          width: 100%;
        }
        h2,h3 {
          margin: 0;
          font-size: 1rem;
        }
        `]}static get properties(){return{mode:{},blueprints:{}}}setConfig(e){if(this.hass||(this.hass=(0,a.mo)()),this.mode=e.mode?e.mode:"pre-select",this.area_id=e.area?e.area:"",this.domain=e.domain?e.domain:"",this.position=e.position,this.page=e.page,e.cardConfig){const t=e.cardConfig;delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.filename=e.filename?e.filename.replace(".yaml",""):"",this.name=e.name?e.name:"Dwains Dashboard",this.rowSpan=e.rowSpan?e.rowSpan:"1",this.colSpan=e.colSpan?e.colSpan:"1",this.rowSpanLg=e.rowSpanLg?e.rowSpanLg:"1",this.colSpanLg=e.colSpanLg?e.colSpanLg:"1",this.rowSpanXl=e.rowSpanXl?e.rowSpanXl:"1",this.colSpanXl=e.colSpanXl?e.colSpanXl:"1",this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=c(t),a=await d.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&c(this._hass)===i&&(this.blueprints=a)}_loadBlueprints(){return this._connectedLoadOwner.reload()}magicStuff(e){this.cardConfig=e.detail.config,this.mode="editor-element",this.requestUpdate()}magicStuffSecond(e){}_sendCard(){this.shadowRoot?.querySelectorAll("ha-select").forEach(e=>{const t=e.name||e.type;t&&void 0!==e.value&&(this[t]=`${e.value}`)});const e=JSON.stringify(this.cardConfig);this.hass.callWS({type:"dwains_dashboard/add_card",card_data:e,area_id:this.area_id,domain:this.domain,position:this.position,filename:this.filename,page:this.page,rowSpan:this.rowSpan,colSpan:this.colSpan,rowSpanLg:this.rowSpanLg,colSpanLg:this.colSpanLg,rowSpanXl:this.rowSpanXl,colSpanXl:this.colSpanXl}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_removeCard(){this.hass.callWS({type:"dwains_dashboard/remove_card",area_id:this.area_id,domain:this.domain,filename:this.filename,page:this.page}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this.hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint;this.mode="editor-element",this.name=this.blueprints.blueprints[t].blueprint.name,this.cardConfig={type:"custom:dwains-blueprint-card",blueprint:t,card:this.blueprints.blueprints[t].card}}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.installBlueprintYaml||alert("No YAML code entered!"),this.hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this.hass.localize("ui.common.successfully_saved")),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_haSelectChanged(e){e.stopPropagation();const{field:t,value:i}=s(e);t&&void 0!==i&&(this[t]=`${i}`,this.requestUpdate())}_stopPropagation(e){e.stopPropagation()}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
        <div>
          ${t?r.qy`
            <ha-icon
              style="color: green;"
              .icon=${"mdi:check-bold"}
            ></ha-icon>`:r.qy`
            <ha-icon
              style="color: red;"
              .icon=${"mdi:close-thick"}
            ></ha-icon>
            `}
          ${e}
          ${t?r.qy`(${(0,o.A)(this.hass,"blueprint.installed")})`:r.qy`(${(0,o.A)(this.hass,"blueprint.not_installed")})`}
        </div>
      `}render(){if(null==this.blueprints||0===this.blueprints.length)return r.qy`Loading...`;if("pre-select"==this.mode)return r.qy`
          <ha-md-list>
            <ha-list-item twoline .mode=${"hui-card-picker"} @click=${this._switchMode}>
              ${(0,o.A)(this.hass,"editor.lovelace_card")}
              <span slot="secondary">
                ${(0,o.A)(this.hass,"editor.create_lovelace_card")}
              </span>
            </ha-list-item>
            <li divider role="separator"></li>
            <ha-list-item hasmeta twoline .mode=${"dwains-dashboard-blueprint-select"} @click=${this._switchMode}>
              ${(0,o.A)(this.hass,"editor.dwains_dashboard_blueprint")}
              <span slot="secondary">
                ${(0,o.A)(this.hass,"editor.use_dwains_dashboard_blueprint")}
              </span>
              <ha-icon-next slot="meta"></ha-icon-next
            ></ha-list-item>
          </ha-md-list>
        `;if("dwains-dashboard-blueprint-select"==this.mode){const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
        <div class="edit-element">

          <div style="margin-bottom: 20px;">
            <ha-button .mode=${"pre-select"} @click=${this._switchMode}>< ${this.hass.localize("ui.common.previous")}</ha-button>
          </div>

          <strong>${(0,o.A)(this.hass,"blueprint.installed_blueprints")}:</strong>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.title")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"global.version")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.type")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.used_custom_cards")}</th>
                <th scope="col" class="relative px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              ${0==Object.values(e).length?r.qy`
                <tr>
                  <td  class="px-6 py-4" colspan="5">${(0,o.A)(this.hass,"blueprint.no_blueprints_installed")}</td>
                </tr>`:r.qy`
                ${Object.entries(e).map(([e,t])=>r.qy`
                        <tr class="bg-white">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <h3>${t[1].blueprint.name}</h3>
                            ${t[1].blueprint.description}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.version}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.type}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                                ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                              `:"None"}
                          </td>
                          <td>
                            ${"card"==t[1].blueprint.type?r.qy`
                              <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                ${(0,o.A)(this.hass,"blueprint.use")}
                              </ha-button>
                            `:""}
                            <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                              <ha-icon
                                .icon=${"mdi:delete"}
                              ></ha-icon>
                            </ha-button>
                          </td>
                        </tr>
                      `)}
                `}
            </tbody>
          </table>
          <div class="seperator"></div>
          <strong>${(0,o.A)(this.hass,"blueprint.install")}</strong>
          <p>${(0,o.A)(this.hass,"blueprint.instruction")}</p>
          <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
          <ha-yaml-editor
            label=${(0,o.A)(this.hass,"blueprint.yaml_code")}
            name="description"
            @value-changed=${this._installBlueprintYamlChanged}
          ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
          <div style="margin-top: 15px; margin-bottom: 20px;">
            <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
              ${(0,o.A)(this.hass,"blueprint.install")}
            </ha-button>
          </div>
        </div>`}return"hui-card-picker"==this.mode?r.qy`
          <div class="edit-element">
            <h1 style="font-size: 17px; font-weight: bold;">Select the card you want to add to ${this.name}</h1>
            <dwains-card-picker
              @config-changed=${this.magicStuff}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-picker>
            <div class="card-footer">
              <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
                ${this.hass.localize("ui.common.cancel")}
              </ha-button>
            </div>
          </div>
        `:"editor-element"==this.mode?r.qy`
          <div class="edit-element">
            <div class="card-dd-settings">

            <h2>${(0,o.A)(this.hass,"editor.default_col_row")}</h2>
            <div class="grid-2">
              <ha-select
                label=${(0,o.A)(this.hass,"editor.row_span")}
                .value=${this.rowSpan}
                .type=${"rowSpan"}
                name="rowSpan"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.row")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
              </ha-select>
              <ha-select
                label=${(0,o.A)(this.hass,"editor.col_span")}
                .value=${this.colSpan}
                .type=${"colSpan"}
                name="colSpan"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.column")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
              </ha-select>
            </div>

            <h2>${(0,o.A)(this.hass,"editor.large_col_row")}</h2>
            <div class="grid-2">
              <ha-select
                label=${(0,o.A)(this.hass,"editor.row_span")}
                .value=${this.rowSpanLg}
                .type=${"rowSpanLg"}
                name="rowSpanLg"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.row")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
                <ha-dropdown-item value="3">3 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
              </ha-select>
              <ha-select
                label=${(0,o.A)(this.hass,"editor.col_span")}
                .value=${this.colSpanLg}
                .type=${"colSpanLg"}
                name="colSpanLg"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.column")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
                <ha-dropdown-item value="3">3 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
              </ha-select>
            </div>

            <h2>${(0,o.A)(this.hass,"editor.extra_large_col_row")}</h2>
            <div class="grid-2">
              <ha-select
                label=${(0,o.A)(this.hass,"editor.row_span")}
                .value=${this.rowSpanXl}
                .type=${"rowSpanXl"}
                name="rowSpanXl"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.row")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
                <ha-dropdown-item value="3">3 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
                <ha-dropdown-item value="4">4 ${(0,o.A)(this.hass,"editor.rows")}</ha-dropdown-item>
              </ha-select>
              <ha-select
                label=${(0,o.A)(this.hass,"editor.col_span")}
                .value=${this.colSpanXl}
                .type=${"colSpanXl"}
                name="colSpanXl"
                @selected=${this._haSelectChanged}
                @closed=${this._stopPropagation}
              >
                <ha-dropdown-item value="1">1 ${(0,o.A)(this.hass,"editor.column")}</ha-dropdown-item>
                <ha-dropdown-item value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
                <ha-dropdown-item value="3">3 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
                <ha-dropdown-item value="4">4 ${(0,o.A)(this.hass,"editor.columns")}</ha-dropdown-item>
              </ha-select>
            </div>
            </div>
            <dwains-card-config-editor
              @save-config=${this.magicStuffSecond}
              @config-changed=${this.magicStuff}
              .value=${this.cardConfig}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-config-editor>
            <dwains-card-preview
              .hass=${this.hass}
              .config=${this.cardConfig}
            ></dwains-card-preview>
            <div class="card-footer">
              ${this.filename?r.qy`<ha-button @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>`:""}
              <ha-button @click=${this._sendCard}>${this.hass.localize("ui.common.submit")}</ha-button>
            </div>
          </div>
        `:void 0}}p("dwains-create-custom-card-card",u)},5142(e,t,i){"use strict";var a=i(6684);const{defineDwainsElement:r}=i(572),{LovelaceHeaderOwner:o}=i(2313);class n extends a.WF{constructor(){super(),this._headerOwner=new o}connectedCallback(){super.connectedCallback(),this._headerOwner.connect(this)}disconnectedCallback(){super.disconnectedCallback(),this._headerOwner.disconnect()}setConfig(e){}static get properties(){return{hass:{attribute:!1},cards:{type:Array}}}static get styles(){return a.AH`
      :host {
        display: block;
        margin-top: calc(-1 * var(--dd-lovelace-header-offset, 0px));
      }
      #dwains_dashboard {
        margin: 0 auto;
        font-family: "Open Sans", sans-serif;
        padding-top: 10px;
        padding-bottom: 50px;
      }
      #dwains_navigation {
        position: sticky;
        top: 0;
        z-index: 8;
      }

      @media only screen and (max-width: 768px) {
        #dwains_dashboard {
          padding-top: 1px;
          padding-bottom: calc(5rem + env(safe-area-inset-bottom));
        }
        :host {
          display: block;
        }
        #dwains_navigation {
          position: fixed;
          left: 0;
          right: 0;
          top: auto;
          bottom: 0;
          z-index: 30;
        }
      }
    `}render(){return a.qy`
      <div id="dwains_navigation">
        <dwainsboard-navigation-card .hass=${this.hass}></dwainsboard-navigation-card>
      </div>
      <div id="dwains_dashboard">
        ${this.cards?this.cards.map(e=>a.qy`${e}`):""}
      </div>
    `}}customElements.get("dwains-dashboard-layout")||(r("dwains-dashboard-layout",n),console.info("%c DWAINS-DASHBOARD-JS \n%c Version 3.9.4","color: #2fbae5; font-weight: bold; background: black","color: white; font-weight: bold; background: dimgray"))},8919(e,t,i){"use strict";var a=i(7377),r=i(6205),o=i(9774),n=i(8089);const{EventSubscriptionOwner:s}=i(7450),{EventListenerOwner:d}=i(1991),{TimerOwner:l}=i(6687),{DashboardBootstrapOwner:c}=i(7465),{PopupOpenScheduler:h}=i(4615),{ReloadableLoadOwner:p}=i(1786),{websocketReadStore:u}=i(9012),{resolveHass:m}=i(4525),{hassConnectionIdentity:g}=i(4776),{loadDashboardCoreSnapshot:_}=i(8355),{isDwainsRoute:f}=i(5704),{findHomeAssistantHost:b,findHomeAssistantMain:v,findLovelaceConfig:y,findLovelaceRoot:w,findLovelaceShell:x}=i(2708);function k(){return m()}class ${constructor(){this._subscriptions=new s,this._subscriptions.connect(),this._listeners=new d,this._timers=new l,this._timers.connect(),this._popupOpens=new h(this._timers,{delay:10}),this._loads=new p(e=>this._loadData(e)),this._destroyed=!1,this._locationUpdater=this.locationChanged.bind(this),this._visibilityChangeHandler=()=>{"visible"===document.visibilityState&&(this.locationChanged(),this._subscribeReload())},this._popupCardHandler=this.popupCard.bind(this),this.startDwainsDashboard().catch(e=>{console.error("Failed to start Dwains Dashboard",e)}),this._listeners.listen("location-changed",window,"location-changed",this._locationUpdater),this._listeners.listen("popstate",window,"popstate",this._locationUpdater),this._listeners.listen("visibilitychange",document,"visibilitychange",this._visibilityChangeHandler),this._listeners.connect(),this._subscribeReload()}_subscribeReload(){if(this._destroyed)return;const e=k();if(e&&e.connection){const t=g(e);Boolean(this._subscriptionConnection&&this._subscriptionConnection!==t)&&(this._subscriptions.disconnect(),this._subscriptions.connect(),this.reloadData().catch(e=>{console.error("Failed to refresh Dwains Dashboard after reconnect",e)})),this._subscriptionConnection=t,this._clearSubscriptionRetry(),Promise.all([this._subscriptions.subscribeEvent("dashboard-reload",e,"dwains_dashboard_reload",()=>{u.invalidate(e),this.reload().catch(e=>{console.error("Failed to process Dwains Dashboard reload",e)})}),this._subscriptions.subscribeEvent("dashboard-config-reload",e,"dwains_dashboard_config_reload",()=>{u.invalidate(e),this.reloadData().catch(e=>{console.error("Failed to reload Dwains Dashboard configuration",e)})})]).then(()=>{this.__ddSubscribeRetries=0,this.__ddSubscribeRetryExhausted=!1}).catch(e=>{console.error("Failed to subscribe to Dwains Dashboard reload events",e),this._scheduleSubscriptionRetry()})}else this._scheduleSubscriptionRetry()}_scheduleSubscriptionRetry(){if(this._destroyed||this._timers.has("subscription-retry"))return;const e=(this.__ddSubscribeRetries||0)+1;e>30?this.__ddSubscribeRetryExhausted||(console.error("Unable to subscribe to Dwains Dashboard reload events after 30 retries"),this.__ddSubscribeRetryExhausted=!0):(this.__ddSubscribeRetries=e,this._timers.schedule("subscription-retry",()=>{this._subscribeReload()},200,{replace:!1}))}_clearSubscriptionRetry(){this._timers.clear("subscription-retry")}_ensurePopupListener(){if(this._destroyed)return;const e=b();e&&e!==this._popupHost&&(this._listeners.listen("hass-more-info",e,"hass-more-info",this._popupCardHandler),this._popupHost=e)}destroy(){this._destroyed||(this._destroyed=!0,this._loads.invalidate(),this._clearSubscriptionRetry(),this._timers.disconnect(),this._subscriptions.disconnect(),this._listeners.disconnect(),this._subscriptionConnection=void 0,this._popupHost=void 0)}loadData(){return this._loads.load()}reloadData(){return this._loads.reload()}async _loadData({isCurrent:e=()=>!0}={}){const t=k(),i=g(t),a=await _(t,{optionalRegistries:!0});e()&&!this._destroyed&&g(k())===i&&Object.assign(this,a)}_entityDisplayName(e){const t=this.entitiesById?.get(e),i=t?.device_id?this.devicesById?.get(t.device_id):void 0;return(0,n.Hg)(k(),this.configuration,e,t,i)}locationChanged(){if(this._destroyed)return;let e=window.location.pathname;f(e)&&(this.applyDwainsTheme(),this._ensurePopupListener())}popupCard(e){if(!e.detail||!e.detail.entityId||!this.configuration)return;const t=(0,o.computeDomain)(e.detail.entityId),i=e.currentTarget||this._popupHost;if(this.configuration.entities_popup&&this.configuration.entities_popup[e.detail.entityId])if(this.configuration.entities[e.detail.entityId]&&!this.configuration.entities[e.detail.entityId].custom_popup)console.log("Please enable custom popup for this entity");else{const t=this._entityDisplayName(e.detail.entityId);this._popupOpens.schedule(()=>{this._closeMoreInfo(i),(0,a.d)(t,{input_entity:e.detail.entityId,...this.configuration.entities_popup[e.detail.entityId]},!1,"")})}else if(this.configuration.devices_popup&&this.configuration.devices_popup[t]){const r=this._entityDisplayName(e.detail.entityId);this._popupOpens.schedule(()=>{this._closeMoreInfo(i),(0,a.d)(r,{input_entity:e.detail.entityId,...this.configuration.devices_popup[t]},!1,"")})}}_closeMoreInfo(e){return e?((0,r.fireEvent)("hass-more-info",{entityId:""},e),!0):(console.error("Unable to close Home Assistant more-info: host is unavailable"),!1)}async startDwainsDashboard(){console.log("Starting Dwains Dashboard");const e=await this.getLovelace();if(!this._destroyed&&e&&e.config.dwains_dashboard){if(await this.loadData(),this._destroyed)return;this._ensurePopupListener(),console.log("Dwains Dashboard Started"),this.applyDwainsTheme()}}applyDwainsTheme(e){e||(this.__ddThemeRetries=0);const t=this.getRoot(),i=x(t);i?(this.__ddThemeRetries=0,(0,o.applyThemesOnElement)(i.view,{themes:{"dwains-theme":{"ha-card-border-radius":"0.75rem"}}},"dwains-theme",!0)):(this.__ddThemeRetries=(this.__ddThemeRetries||0)+1)<=20&&this._timers.schedule("apply-theme",()=>this.applyDwainsTheme(!0),150)}async reload(){if(this.__ddReloading)this.__ddReloadAgain=!0;else{this.__ddReloading=!0;try{do{this.__ddReloadAgain=!1,await this._softReload()}while(this.__ddReloadAgain)}finally{this.__ddReloading=!1}}}async _softReload(){try{await this.reloadData()}catch(e){console.error("Failed to reload Dwains Dashboard data",e)}this.applyDwainsTheme()}async getLovelace(){let e;for(;!e&&!this._destroyed;)if(!(e=y(),e||await this._timers.delay("lovelace-poll",500)))return;return e}getRoot(){return w()}}new c({target:window,findMain:v,createDashboard:()=>new $}).connect()},5462(e,t,i){"use strict";var a=i(7377),r=i(6205),o=i(8987),n=i(7969),s=i(9774),d=i(9165),l=i(6684),c=i(8331),h=i(9177),p=i(8089),u=i(3601);const{EventSubscriptionOwner:m}=i(7450),{EventListenerOwner:g}=i(1991),{TimerOwner:_}=i(6687),{PopupOpenScheduler:f}=i(4615),{ReloadableLoadOwner:b}=i(1786),{hassConnectionIdentity:v,hasHassConnectionChanged:y}=i(4776),{websocketReadStore:w}=i(9012),{loadDashboardRegistrySnapshot:x}=i(8355),{registryOrderedEntityUnion:k}=i(9632),{resolveHass:$}=i(4525),{loadCardHelpers:C}=i(3266),{closeParentDropdown:E}=i(8276),{defineDwainsElement:A}=i(572),{attachDeferredCard:S}=i(1656),D=new Set(["person","weather","alarm_control_panel"]);class z extends l.WF{static get properties(){return{data:{},selectedDevice:{},deviceEditMode:{},deviceViewDisplayGrouped:{},deviceViewEditMode:{}}}constructor(){super(),this._subscriptions=new m,this._listeners=new g,this._timers=new _,this._popupOpens=new f(this._timers),this._loads=new b(e=>this._loadConfiguration(e)),this._locationChangedHandler=()=>this._syncSelectedDeviceFromLocation(),this._listeners.listen("location-changed",window,"location-changed",this._locationChangedHandler),this._startedHass=void 0}async loadHelpers(){return C()}_entityDisplayName(e,t){const i=t||this.entitiesById?.get(e),a=i?.device_id?this.devicesById?.get(i.device_id):void 0;return(0,p.Hg)(this._hass,this.configuration,e,i,a)}set hass(e){const t=y(this._hass,e);this._hass=e,this.startedUp&&this._update_hass(e),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect()),this._startIfReady(t)}_update_hass(e){this._hass=e,null!=this.data&&0!==this.data.length&&(Object.values(this.data).map(t=>{t.domain==this.selectedDevice&&(t.cards.forEach(t=>{t.card&&(t.card.hass=e)}),t.customCardsTop.forEach(t=>{t.card&&(t.card.hass=e)}),t.customCardsBottom.forEach(t=>{t.card&&(t.card.hass=e)}))}),this.timeout?this._pendingHassUpdate=!0:(this.timeout=!0,this._pendingHassUpdate=!1,void 0===this._timers.schedule("hass-update-throttle",()=>{this.timeout=!1,this._pendingHassUpdate&&(this._pendingHassUpdate=!1,this.requestUpdate())},100)&&(this.timeout=!1,this._pendingHassUpdate=!1),this.requestUpdate()))}async setConfig(e){this.startedUp=!1,this.timeout=!1,this._pendingHassUpdate=!1,this._hass||(this._hass=$()),this.selectedDevice=window.location.hash.substring(1),this.deviceEditMode=!1,this.deviceViewEditMode=!1,this.deviceViewDisplayGrouped=!!o.A.get("dwains_dashboard_deviceViewDisplayGrouped")&&"false"!=o.A.get("dwains_dashboard_deviceViewDisplayGrouped"),this._config=e,this.notificationCard,this.weatherCard,this._cardHelpersReady=this.loadHelpers(),this.cardHelpers=await this._cardHelpersReady,await this._startIfReady()}updated(e){e.has("state")||this._syncSelectedDeviceFromLocation()}_syncSelectedDeviceFromLocation(){const e=window.location.hash.substring(1);e?this.selectedDevice=e:null!=this.data&&0!=Object.keys(this.data).length&&(this.selectedDevice=Object.values(this.data)[0].domain)}async connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._timers.connect(),this._listeners.connect(),await this._startIfReady()}async _startIfReady(e=!1){const t=v(this._hass);if(this.isConnected&&this._hass&&this._config&&this._startedHass!==t){this._hass,this._startedHass=t;try{this._cardHelpersReady&&(this.cardHelpers=await this._cardHelpersReady),e?await this._reloadCard():await this._loadData(),this.isConnected&&v(this._hass)===t&&this._startedHass===t&&await this._subscribeReload()}catch(e){this._startedHass===t&&(this._startedHass=void 0),console.error("Error starting devices page card:",e)}}}disconnectedCallback(){super.disconnectedCallback(),this._subscriptions.disconnect(),this._timers.disconnect(),this._listeners.disconnect(),this._startedHass=void 0,this._loads.invalidate(),this.timeout=!1,this._pendingHassUpdate=!1}_subscribeReload(){return this._subscriptions.subscribeEvent("devices-page",this._hass,"dwains_dashboard_devicespage_card_reload",()=>{w.invalidate(this._hass),this._reloadCard().catch(e=>{console.error("Error reloading devices page card:",e)})})}async _reloadCard(){await this._loads.reload(),this.requestUpdate()}_loadData(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){this.selectedArea=this.selectedArea||"",this.startedUp=!1;const t=await x(this._hass);if(e())if(Object.assign(this,t),null==this.areas||0===this.areas.length||null==this.devices||0===this.devices.length||null==this.entities||0===this.entities.length||null==this.configuration||0===this.configuration.length);else{const t=[],i=[],a=new Set,r=this.entities.filter(e=>D.has((0,s.computeDomain)(e.entity_id)));for(const e of this.areas)if(!this.configuration.areas[e.area_id]||!this.configuration.areas[e.area_id].disabled){const o=new Set((this.devicesByAreaId.get(e.area_id)||[]).map(e=>e.id)),n=k([this.entitiesByAreaId.get(e.area_id),r.filter(e=>!a.has(e.entity_id))],this.entityOrderById);for(const r of n)if(r.area_id?r.area_id===e.area_id:o.has(r.device_id)||"person"==(0,s.computeDomain)(r.entity_id)&&!a.has(r.entity_id)||"weather"==(0,s.computeDomain)(r.entity_id)&&!a.has(r.entity_id)||"alarm_control_panel"==(0,s.computeDomain)(r.entity_id)&&!a.has(r.entity_id)){if(r.hidden_by)continue;const o=(0,s.computeDomain)(r.entity_id),n=this._hass.states[r.entity_id];if(this.configuration.devices[o]&&this.configuration.devices[o].hidden){i.includes(o)||i.push(o);continue}if(!(o in t)){const e=[],i=[];0!==this.configuration.device_cards.length&&this.configuration.device_cards[o]&&Object.entries(this.configuration.device_cards[o]).forEach(([t,a])=>{const r=a.row_span?a.row_span:"1",n=a.col_span?a.col_span:"1",s=a.row_span_lg?a.row_span_lg:"1",d=a.col_span_lg?a.col_span_lg:"1",l=a.row_span_xl?a.row_span_xl:"1",c=a.col_span_xl?a.col_span_xl:"1";"bottom"==a.position?i.push(S({filename:t,domain:o,rowSpan:r,colSpan:n,rowSpanLg:s,colSpanLg:d,rowSpanXl:l,colSpanXl:c},()=>this.createCardElement2(a))):e.push(S({filename:t,domain:o,rowSpan:r,colSpan:n,rowSpanLg:s,colSpanLg:d,rowSpanXl:l,colSpanXl:c},()=>this.createCardElement2(a)))}),t[o]={domain:o,cards:[],entitiesNoState:[],entitiesHidden:[],entitiesDisabled:[],customCardsTop:e,customCardsBottom:i,sort_order:this.configuration.devices[o]&&this.configuration.devices[o].sort_order?this.configuration.devices[o].sort_order:99}}if(this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].disabled){t[o].entitiesDisabled.push(r.entity_id),a.add(r.entity_id);continue}if(!n){t[o].entitiesNoState.push(r.entity_id),a.add(r.entity_id);continue}{const i=!!this.configuration.entities[r.entity_id]&&!!this.configuration.entities[r.entity_id].hidden,n=!!this.configuration.entities[r.entity_id]&&!!this.configuration.entities[r.entity_id].excluded,s=this.configuration.entities[r.entity_id]?this.configuration.entities[r.entity_id].friendly_name:"",d=this._entityDisplayName(r.entity_id,r),l=!(!this.configuration.entities[r.entity_id]||!this.configuration.entities[r.entity_id].custom_card)&&this.configuration.entities[r.entity_id].custom_card,c=!(!this.configuration.entities[r.entity_id]||!this.configuration.entities[r.entity_id].custom_popup)&&this.configuration.entities[r.entity_id].custom_popup;if(i){t[o].entitiesHidden.includes(r.entity_id)||t[o].entitiesHidden.push(r.entity_id);continue}let h={},p="1",u="1",m="1",g="1",_="1",f="1";if(l&&this.configuration.entity_cards&&this.configuration.entity_cards[r.entity_id])h={input_name:d,input_entity:r.entity_id,...this.configuration.entity_cards[r.entity_id]};else if(this.configuration.devices_card[o])h={input_name:d,input_entity:r.entity_id,...this.configuration.devices_card[o]};else if("sensor"===o&&this._hass&&this._hass.states[r.entity_id].attributes.unit_of_measurement)h={graph:"line",type:"sensor",hours_to_show:24,detail:1,entity:r.entity_id,...d?{name:d}:{}};else{switch(o){default:h=d?{type:"tile",name:d}:{type:"tile"};break;case"camera":h={type:"picture-entity",camera_view:"auto"},p="2",u="2",m="2",g="2",_="2",f="2";break;case"climate":h=d?{type:"thermostat",name:d,features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]}:{type:"thermostat",features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]};break;case"cover":h=d?{type:"tile",name:d,features:[{type:"cover-open-close"},{type:"cover-position"}]}:{type:"tile",features:[{type:"cover-open-close"},{type:"cover-position"}]};break;case"light":h=d?{type:"tile",name:d,features:[{type:"light-brightness"}]}:{type:"tile",features:[{type:"light-brightness"}]}}h={entity:r.entity_id,...h}}this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].row_span&&(p=this.configuration.entities[r.entity_id].row_span),this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].col_span&&(u=this.configuration.entities[r.entity_id].col_span),this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].row_span_lg&&(m=this.configuration.entities[r.entity_id].row_span_lg),this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].col_span_lg&&(g=this.configuration.entities[r.entity_id].col_span_lg),this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].row_span_xl&&(_=this.configuration.entities[r.entity_id].row_span_xl),this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].col_span_xl&&(f=this.configuration.entities[r.entity_id].col_span_xl),a.add(r.entity_id),t[o].cards.push(S({area:e,entity:r.entity_id,rowSpan:p,colSpan:u,rowSpanLg:m,colSpanLg:g,rowSpanXl:_,colSpanXl:f,friendlyName:s,hideEntity:i,excludeEntity:n,customCard:l,customPopup:c,sort_order:this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].devices_sort_order?this.configuration.entities[r.entity_id].devices_sort_order:99,grouped_sort_order:this.configuration.entities[r.entity_id]&&this.configuration.entities[r.entity_id].devices_grouped_sort_order?this.configuration.entities[r.entity_id].devices_grouped_sort_order:99},()=>this.createCardElement2(h)))}}}const o=Object.keys(t).sort(function(e,i){return t[e].sort_order-t[i].sort_order}).map(function(e){return t[e]});if(!e())return;this.data=o,this.disabledDevices=i,this.startedUp=!0,0===this.selectedDevice.length&&(this.selectedDevice=Object.values(o)[0].domain)}}_handleDeviceClick(e){const t=e.currentTarget.dataset.device;window.location.hash=t,this.selectedDevice=t,window.scrollTo(0,0),this._update_hass(this._hass)}_backButtonClick(){window.location.hash="",this._update_hass(this._hass)}async createCardElement(e){const t={type:"grid",columns:6,cards:e},i=await cardHelpers;return await(0,p.Kq)(i,t,this._hass)}async createCardElement2(e){if(this.cardHelpers)return(0,p.Kq)(this.cardHelpers,e,this._hass);console.error("Card helpers zijn niet geladen.")}shouldUpdate(e){return!e.has("_hass")}_iconPickerChange(e){console.log(e)}_toggle(e){E(e),e.stopPropagation();const t=e.currentTarget.domain;TOGGLE_DOMAINS.includes(t)&&this._hass.callService(t,e.currentTarget.state?"turn_off":"turn_on",void 0,{area_id:e.currentTarget.area_id})}_addLovelaceCard(e){E(e),e.stopPropagation();const t=e.currentTarget.domain,i=e.currentTarget.position;this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"device.add_card_to")+t,{type:"custom:dwains-create-custom-card-card",domain:t,position:i,page:"devices"},!0,"")})}_handleEntityEditClick(e){E(e),e.stopPropagation();const t=e.currentTarget.entity,i=e.currentTarget.friendlyName,o=e.currentTarget.hideEntity,n=!!this.configuration?.entities?.[t]?.hidden_in_area,s=e.currentTarget.excludeEntity,d=e.currentTarget.disableEntity,l=e.currentTarget.colSpan,c=e.currentTarget.rowSpan,p=e.currentTarget.colSpanLg,u=e.currentTarget.rowSpanLg,m=e.currentTarget.colSpanXl,g=e.currentTarget.rowSpanXl,_=e.currentTarget.customCard,f=e.currentTarget.customPopup;this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"entity.edit_entity"),{type:"custom:dwains-edit-entity-card",entity:t,friendlyName:i,hideEntity:o,hideEntityInArea:n,excludeEntity:s,disableEntity:d,colSpan:l,rowSpan:c,colSpanLg:p,rowSpanLg:u,colSpanXl:m,rowSpanXl:g,customCard:_,customPopup:f},!1,"")})}_handleEntityEditCardClick(e){E(e),e.stopPropagation();const t=e.currentTarget.entity;let i,o;if(this.configuration.entity_cards&&this.configuration.entity_cards[t]){const e=this._entityDisplayName(t);i={input_name:e,input_entity:t,...this.configuration.entity_cards[t]},o="editor-element"}this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"entity.edit_entity_card"),{type:"custom:dwains-edit-entity-card-card",entity_id:t,cardConfig:i,mode:o,existingCardEdit:!!i},!0,"")})}_handleEntityEditPopupClick(e){E(e),e.stopPropagation();const t=e.currentTarget.entity;let i,o;if(this.configuration.entities_popup&&this.configuration.entities_popup[t]){const e=this._entityDisplayName(t);i={input_name:e,input_entity:t,...this.configuration.entities_popup[t]},o="editor-element"}console.log(i),this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"entity.edit_entity_popup_card"),{type:"custom:dwains-edit-entity-popup-card",entity_id:t,cardConfig:i,mode:o,existingCardEdit:!!i},!0,"")})}_handleDeviceEditClick(e){E(e),e.stopPropagation();const t=e.currentTarget.device,i=e.currentTarget.device_icon,o=e.currentTarget.showInNavbar;this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"device.edit_device_button"),{type:"custom:dwains-edit-device-button-card",device:t,icon:i,showInNavbar:o},!1,"")})}_handleCustomCardEditClick(e){E(e),e.stopPropagation();const t=e.currentTarget.domain,i=e.currentTarget.filename,o=e.currentTarget.colSpan,n=e.currentTarget.rowSpan,s=e.currentTarget.colSpanLg,d=e.currentTarget.rowSpanLg,l=e.currentTarget.colSpanXl,c=e.currentTarget.rowSpanXl,h=this.configuration.device_cards[t][i];let p="top";h.position&&(p=h.position,delete h.position),delete h.col_span,delete h.row_span,delete h.col_span_lg,delete h.row_span_lg,delete h.col_span_xl,delete h.row_span_xl,this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)(this._hass.localize("ui.components.entity.entity-picker.edit"),{type:"custom:dwains-create-custom-card-card",domain:t,page:"devices",mode:"editor-element",cardConfig:h,position:p,filename:i,colSpan:o,rowSpan:n,colSpanLg:s,rowSpanLg:d,colSpanXl:l,rowSpanXl:c},!0,"")})}_saveEntityBoolValue(e,t,i){return this._hass.callWS({type:"dwains_dashboard/edit_entity_bool_value",entityId:e,key:t,value:i}).catch(e=>{console.error("Failed to update entity setting:",e)})}_handleEntityEditBoolValueClick(e){E(e),e.stopPropagation(),this._saveEntityBoolValue(e.currentTarget.entity,e.currentTarget.key,e.currentTarget.value)}_handleEntityAreaVisibilityClick(e,t,i){E(e),e.stopPropagation(),this._saveEntityBoolValue(t,"hidden_in_area",i)}_handleDeviceEditBoolValueClick(e){E(e),e.stopPropagation();const t=e.currentTarget.device,i=e.currentTarget.key,a=e.currentTarget.value;this._hass.callWS({type:"dwains_dashboard/edit_device_bool_value",device:t,key:i,value:a}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleDeviceEditCardClick(e){E(e),e.stopPropagation();const t=e.currentTarget.domain;let i,o;this.configuration.devices_card&&this.configuration.devices_card[t]&&(i=this.configuration.devices_card[t],o="current-selected-blueprint"),this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"device.edit_device_card")+(0,h.A)(this._hass,"device."+t),{type:"custom:dwains-edit-device-card-card",domain:t,cardConfig:i,existingCardEdit:!!i,mode:o},!0,"")})}_handleDeviceEditPopupClick(e){E(e),e.stopPropagation();const t=e.currentTarget.domain;let i,o;this.configuration.devices_popup&&this.configuration.devices_popup[t]&&(i=this.configuration.devices_popup[t],o="current-selected-blueprint"),this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)((0,h.A)(this._hass,"device.edit_device_popup")+(0,h.A)(this._hass,"device."+t),{type:"custom:dwains-edit-device-popup-card",domain:t,cardConfig:i,existingCardEdit:!!i,mode:o},!0,"")})}_deviceButtonMoved(e){this._hass.callWS({type:"dwains_dashboard/sort_device_button",sortData:JSON.stringify(this._sortable.toArray())}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleDeviceEditModeClicked(e){E(e),e.stopPropagation();const t=e.currentTarget.value;t?this.shadowRoot.getElementById("sortable")&&(this._sortable=new c.A(this.shadowRoot.getElementById("sortable"),{forceFallback:!0,animation:150,dataIdAttr:"data-device",handle:".sortable-move",onEnd:async e=>this._deviceButtonMoved(e)})):(this._sortable.destroy(),this._sortable=void 0),this.deviceEditMode=t}_handleDeviceViewEditModeClicked(e){E(e),e.stopPropagation();const t=e.currentTarget.value;if(t){this._sortable=[];const e=this.shadowRoot.querySelectorAll(".sortable"),t=this._hass;for(let i=0;i<e.length;i++){const a=this.deviceViewDisplayGrouped?"devices_grouped_sort_order":"devices_sort_order";this._sortable[i]=new c.A(e[i],{forceFallback:!0,animation:150,dataIdAttr:"data-entity",handle:".sortable-move",onEnd:function(e){t.callWS({type:"dwains_dashboard/sort_entity",sortData:JSON.stringify(this.toArray()),sortType:a}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}})}}else this._sortable.forEach(e=>e.destroy()),this._sortable=void 0;this.deviceViewEditMode=t}_renderDeviceButtonCard(e,t){return l.qy`
            <div>
              <ha-card class="p-2">
                <span class="break-words">
                ${(0,h.A)(this._hass,"device."+e)}
                </span>
              </ha-card>
              <ha-card>
                <div class="card-actions">
                  <ha-button
                    .device="${e}"
                    .key=${"hidden"}
                    .value=${!1}
                    @click=${this._handleDeviceEditBoolValueClick}
                  >
                    ${(0,h.A)(this._hass,"device.unhide")}
                  </ha-button>
                </div>
              </ha-card>
            </div>
          `}_renderDeviceButton(e){const t=e.domain||"unknown",i=this.configuration.devices[t]&&this.configuration.devices[t].icon?this.configuration.devices[t].icon:n.Su[t]?n.Su[t]:n.Su.unknown;return l.qy`
        <div class="relative" data-device='${t}'>
          <div
            class="flex justify-between h-44 p-3 device-button ${this.selectedDevice!=t||this.configuration.homepage_header.v2_mode?"":"current"}"
            data-device=${t}
            @click=${this._handleDeviceClick}
          >
            <div class="h-full flex flex-wrap content-between">
              <div class="w-full ha-icon">
                ${i?l.qy`
                  <ha-icon
                    class="h-14 w-14"
                    style="color: var(--primary-color);"
                    .icon=${i}
                  ></ha-icon>`:""}
              </div>
              <div class="w-full">
                <h3 class="font-semibold text-lg capitalize">${(0,h.A)(this._hass,"device."+t)}</h3>
              </div>
            </div>
                <div class="row-span-2 text-right space-y-0.5 info">

                </div>
              </div>
              ${this.deviceEditMode?l.qy`
                <ha-card>
                  <div class="card-actions-multiple">
                    <div class="sortable-move">
                      <ha-icon
                        .icon=${"mdi:cursor-move"}
                      >
                      </ha-icon>
                    </div>
                    <ha-dropdown
                      class="ha-icon-overflow-menu-overflow"
                      corner="BOTTOM_START"
                      absolute
                    >
                      <ha-icon-button
                        label=${this._hass.localize("ui.common.overflow_menu")}
                        .path=${d.TdJ}
                        slot="trigger"
                      ></ha-icon-button>
                        <ha-list-item
                          graphic="icon"
                      .device=${t}
                      .device_icon=${i}
                      .showInNavbar=${this.configuration.devices[t]&&this.configuration.devices[t].show_in_navbar?this.configuration.devices[t].show_in_navbar:""}
                      @click=${this._handleDeviceEditClick}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:cog"}></ha-icon>
                          </div>
                          ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                        </ha-list-item>

                        <ha-list-item
                          graphic="icon"
                      .domain=${t}
                      @click="${this._handleDeviceEditCardClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                          </div>
                          ${(0,h.A)(this._hass,"entity.entity_card")}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                      .domain=${t}
                      @click="${this._handleDeviceEditPopupClick}"
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                          </div>
                          ${(0,h.A)(this._hass,"entity.popup_card")}
                        </ha-list-item>
                        <ha-list-item
                          graphic="icon"
                      .device=${t}
                      .key=${"hidden"}
                          .value=${!0}
                          @click=${this._handleDeviceEditBoolValueClick}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:eye-off"}></ha-icon>
                          </div>
                          ${(0,h.A)(this._hass,"device.hide")}
                        </ha-list-item>
                    </ha-dropdown>
                  </div>
                </ha-card>
                `:""}
            </div>
          `}_hideUnavailableEntitiesEnabled(){return!!(this.configuration&&this.configuration.homepage_header&&this.configuration.homepage_header.hide_unavailable_entities)}_filterUnavailableCards(e){return this.deviceViewEditMode||!this._hideUnavailableEntitiesEnabled()?e:e.filter(e=>{const t=this._hass.states[e.entity];return!(t&&"unavailable"===t.state)})}_renderDeviceViewCards(e){const t=this._filterUnavailableCards(e.cards);if(this.deviceViewDisplayGrouped&&"person"!=e.domain&&"weather"!=e.domain&&"alarm_control_panel"!=e.domain){t.sort(function(e,t){let i=e.grouped_sort_order,a=t.grouped_sort_order;return i==a?0:i>a?1:-1});let e=t.reduce((e,t)=>(e[t.area.area_id]=[...e[t.area.area_id]||[],t],e),{}),i=Object.keys(e).sort((e,t)=>{let i=this.configuration.areas[e]&&this.configuration.areas[e].sort_order?this.configuration.areas[e]:1,a=this.configuration.areas[t]&&this.configuration.areas[t].sort_order?this.configuration.areas[t]:1;return i==a?0:i>a?1:-1});return l.qy`
            <div>
            ${i.map(t=>l.qy`
                <div class="mb-5">
                  <h3 class="font-semibold capitalize text-gray">${e[t][0].area.name}</h3>
                  <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
                  ${Object.entries(e[t]).map(([e,t])=>l.qy`${this._renderDeviceViewCard(t)}`)}
                  </div>
                </div>
              `)}
            </div>
            `}return t.sort(function(e,t){let i=e.sort_order,a=t.sort_order;return i==a?0:i>a?1:-1}),l.qy`
	            <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
	              ${t.map(e=>l.qy`${this._renderDeviceViewCard(e)}`)}
	            </div>
	            `}_renderEntityAreaVisibilityAction(e){const t=!0===this.configuration?.entities?.[e]?.hidden_in_area;return l.qy`
            <ha-list-item
              graphic="icon"
              @click=${i=>this._handleEntityAreaVisibilityClick(i,e,!t)}
            >
              <div slot="graphic">
                <ha-icon .icon=${t?"mdi:eye":"mdi:eye-off"}></ha-icon>
              </div>
              ${(0,h.A)(this._hass,t?"entity.unhide_in_area":"entity.hide_in_area")}
            </ha-list-item>
          `}_renderDeviceViewCard(e){return l.qy`
          <div
            data-entity='${e.entity}'
            class="col-span-${e.colSpan} row-span-${e.rowSpan} lg-col-span-${e.colSpanLg} lg-row-span-${e.rowSpanLg} xl-col-span-${e.colSpanXl} xl-row-span-${e.rowSpanXl} relative"
          >
	            <div>
	              <span class="hidden">${(0,h.A)(this._hass,"device."+e.domain)}<br></span>
	              <dd-lazy-card .card=${e.card} .cardFactory=${e.cardFactory} .hass=${this._hass}></dd-lazy-card>
	            </div>
            ${this.deviceViewEditMode?l.qy`
            <ha-card>
              <div class="card-actions-multiple">
                <div class="sortable-move">
                  <ha-icon
                    .icon=${"mdi:cursor-move"}
                  >
                  </ha-icon>
                </div>
                <ha-dropdown
                  class="ha-icon-overflow-menu-overflow"
                  corner="BOTTOM_START"
                  absolute
                >
                  <ha-icon-button
                    label=${this._hass.localize("ui.common.overflow_menu")}
                    .path=${d.TdJ}
                    slot="trigger"
                  ></ha-icon-button>
                    <ha-list-item
                      graphic="icon"
                      .entity="${e.entity}"
                      .friendlyName="${e.friendlyName}"
                      .disableEntity=${e.disableEntity}
                      .hideEntity=${e.hideEntity}
                      .excludeEntity=${e.excludeEntity}
                      .rowSpan=${e.rowSpan}
                      .colSpan=${e.colSpan}
                      .rowSpanLg=${e.rowSpanLg}
                      .colSpanLg=${e.colSpanLg}
                      .rowSpanXl=${e.rowSpanXl}
                      .colSpanXl=${e.colSpanXl}
                      .customCard=${e.customCard}
                      .customPopup=${e.customPopup}
                      @click=${this._handleEntityEditClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:cog"}></ha-icon>
                      </div>
                      ${(0,h.A)(this._hass,"entity.settings")}
                    </ha-list-item>
                    ${"t"!=e.entity?l.qy`
                      <ha-list-item
                        graphic="icon"
                        .entity="${e.entity}"
                        @click="${this._handleEntityEditCardClick}"
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                        </div>
                        ${(0,h.A)(this._hass,"entity.entity_card")}
                      </ha-list-item>`:""}
                    ${"t"!=e.entity?l.qy`
                      <ha-list-item
                        graphic="icon"
                        .entity="${e.entity}"
                        @click="${this._handleEntityEditPopupClick}"
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                        </div>
                        ${(0,h.A)(this._hass,"entity.popup_card")}
                      </ha-list-item>`:""}
                    <ha-list-item
                      graphic="icon"
                      .entity="${e.entity}"
                      .key=${"excluded"}
                      .value=${!0}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:table-eye-off"}></ha-icon>
                      </div>
                      ${(0,h.A)(this._hass,"entity.exclude")}
                    </ha-list-item>
                    <ha-list-item
                      graphic="icon"
                      .entity="${e.entity}"
                      .key=${"hidden"}
                      .value=${!0}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:eye-off"}></ha-icon>
                      </div>
                      ${(0,h.A)(this._hass,"entity.hide")}
                    </ha-list-item>
                    ${this._renderEntityAreaVisibilityAction(e.entity)}
                    <ha-list-item
                      graphic="icon"
                      .entity="${e.entity}"
                      .key=${"disabled"}
                      .value=${!0}
                      @click=${this._handleEntityEditBoolValueClick}
                    >
                      <div slot="graphic">
                        <ha-icon .icon=${"mdi:tray-remove"}></ha-icon>
                      </div>
                      ${(0,h.A)(this._hass,"entity.disable")}
                    </ha-list-item>
                </ha-dropdown>
              </div>
            </ha-card>`:""}
          </div>
          `}_renderDeviceViewCustomCards(e,t){return l.qy`
          <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 my-4">
            ${"bottom"==t?e.customCardsBottom.map(e=>l.qy`${this._renderDeviceViewCustomCard(e)}`):e.customCardsTop.map(e=>l.qy`${this._renderDeviceViewCustomCard(e)}`)}
          </div>
          `}_renderDeviceViewCustomCard(e){return l.qy`
	          <div class="col-span-${e.colSpan} row-span-${e.rowSpan} lg-col-span-${e.colSpanLg} lg-row-span-${e.rowSpanLg} xl-col-span-${e.colSpanXl} xl-row-span-${e.rowSpanXl} relative">
	            <div>
	              <dd-lazy-card .card=${e.card} .cardFactory=${e.cardFactory} .hass=${this._hass}></dd-lazy-card>
	            </div>
            ${this.deviceViewEditMode?l.qy`
            <ha-card>
              <div class="card-actions">
                <ha-button
                  @click=${this._handleCustomCardEditClick}
                  .domain=${e.domain}
                  .filename=${e.filename}
                  .rowSpan=${e.rowSpan}
                  .colSpan=${e.colSpan}
                  .rowSpanLg=${e.rowSpanLg}
                  .colSpanLg=${e.colSpanLg}
                  .rowSpanXl=${e.rowSpanXl}
                  .colSpanXl=${e.colSpanXl}
                >
                  ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                </ha-button>
              </div>
            </ha-card>`:""}
          </div>
          `}_handleDeviceViewDisplayGroupedClicked(e){E(e),e.stopPropagation();const t=e.currentTarget.value;this.deviceViewDisplayGrouped=t,o.A.set("dwains_dashboard_deviceViewDisplayGrouped",t,{expires:365})}_renderAreaViewEntityCard(e,t){return l.qy`
            <div>
              <ha-card class="p-2">
                ${(0,h.A)(this._hass,"entity.title")}:<br>
                <span class="break-words">
                ${e}
                </span>
              </ha-card>
              <ha-card>
                <div class="card-actions">
                  ${"hidden"==t?l.qy`
                  <ha-button
                    .entity="${e}"
                    .key=${"hidden"}
                    .value=${!1}
                    @click=${this._handleEntityEditBoolValueClick}
                  >
                    ${(0,h.A)(this._hass,"entity.unhide")}
                  </ha-button>`:""}
                  ${"disabled"==t?l.qy`
                  <ha-button
                    .entity="${e}"
                    .key=${"disabled"}
                    .value=${!1}
                    @click=${this._handleEntityEditBoolValueClick}
                  >
                    ${(0,h.A)(this._hass,"entity.enable")}
                  </ha-button>`:""}
                </div>
              </ha-card>
            </div>
          `}_renderDeviceView(e){if(this.selectedDevice!=e.domain)return l.qy``;const t=this.selectedDevice==e.domain?"block":"hidden";return l.qy`
              <div class="w-full mb-12 ${t}" id="${e.domain}">
                <div class="dd-detail-view-header flex justify-between">
                  <div class="dd-detail-view-title">
                    <h2 class="font-semibold text-lg capitalize">
                      ${(0,h.A)(this._hass,"device."+e.domain)}
                    </h2>
                    <span class="text-gray">
                      ${e.cards.length} ${(0,h.A)(this._hass,"entity.title_plural")}
                    </span>
                  </div>
                  <div>
                    <ha-dropdown
                      class="ha-icon-overflow-menu-overflow"
                      corner="BOTTOM_START"
                      absolute
                    >
                      <ha-icon-button
                        label=${this._hass.localize("ui.common.overflow_menu")}
                        .path=${d.TdJ}
                        slot="trigger"
                      ></ha-icon-button>
                        ${this.deviceViewDisplayGrouped?l.qy`
                          <ha-list-item
                            graphic="icon"
                            .value=${!1}
                            .key=${"deviceViewDisplayGrouped"}
                            @click="${this._handleDeviceViewDisplayGroupedClicked}"
                          >
                            <div slot="graphic">
                            <ha-icon .icon=${"mdi:grid"}></ha-icon>
                            </div>
                            ${(0,h.A)(this._hass,"device.ungroup")}
                          </ha-list-item>
                          `:l.qy`
                          <ha-list-item
                            graphic="icon"
                            .value=${!0}
                            .key=${"deviceViewDisplayGrouped"}
                            @click="${this._handleDeviceViewDisplayGroupedClicked}"
                          >
                            <div slot="graphic">
                              <ha-icon .icon=${"mdi:format-list-group"}></ha-icon>
                            </div>
                            ${(0,h.A)(this._hass,"device.group")}
                          </ha-list-item>`}
                        ${this._hass.user.is_admin?l.qy`
                          ${this.deviceViewEditMode?l.qy`
                            <ha-list-item
                              graphic="icon"
                              .value=${!1}
                              @click=${this._handleDeviceViewEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${d.CZ3}></ha-svg-icon>
                              </div>
                              ${(0,h.A)(this._hass,"global.disable_edit_mode")}
                            </ha-list-item>`:l.qy`
                            <ha-list-item
                              graphic="icon"
                              .value=${!0}
                              @click=${this._handleDeviceViewEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${d.CZ3}></ha-svg-icon>
                              </div>
                              ${(0,h.A)(this._hass,"global.enable_edit_mode")}
                            </ha-list-item>
                            `}
                        `:""}
                    </ha-dropdown>
                  </div>
                </div>
                ${this.deviceViewEditMode?l.qy`
                <button type="button"
                  @click=${this._addLovelaceCard}
                  .domain=${e.domain}
                  .position=${"top"}
                  class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  <span class="mt-2 block text-sm font-medium text-gray">
                    ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
                  </span>
                </button>`:""}

                ${this._renderDeviceViewCustomCards(e,"top")}

                ${this._renderDeviceViewCards(e)}

                ${this._renderDeviceViewCustomCards(e,"bottom")}

                ${this.deviceViewEditMode?l.qy`
                  ${e.entitiesNoState.length?l.qy`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.unavailable")}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${e.entitiesNoState.map(e=>l.qy`${this._renderAreaViewEntityCard(e,"noState")}`)}
                      </div>
                    </div>`:""}
                  ${e.entitiesHidden.length?l.qy`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.hidden")}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${e.entitiesHidden.map(e=>l.qy`${this._renderAreaViewEntityCard(e,"hidden")}`)}
                      </div>
                    </div>`:""}
                  ${e.entitiesDisabled.length?l.qy`
                    <div class="mb-5">
                      <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.disabled")}</h3>
                      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                      ${e.entitiesDisabled.map(e=>l.qy`${this._renderAreaViewEntityCard(e,"disabled")}`)}
                      </div>
                    </div>`:""}
                `:""}

                ${this.deviceViewEditMode?l.qy`
                <button type="button"
                  @click=${this._addLovelaceCard}
                  .domain=${e.domain}
                  .position=${"bottom"}
                  class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
                  </svg>
                  <span class="mt-2 block text-sm font-medium text-gray">
                    ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
                  </span>
                </button>`:""}
              </div>`}render(){return null==this.data||0===Object.keys(this.data).length?l.qy``:l.qy`
                <div class="flex flex-wrap dd-dashboard-style-refresh">
                  <div class="w-full ${this.configuration.homepage_header.v2_mode?"":"lg-w-1-2 xl-w-1-3"} ${window.location.hash?this.configuration.homepage_header.v2_mode?"hidden":"hidden lg-block":""} p-4">
                    <div id="devices">
                      <div class="flex justify-between mb-2">
                        <div>
                          <h2 class="font-semibold text-lg capitalize">
                            ${(0,h.A)(this._hass,"device.title_plural")}
                          </h2>
                          <span class="text-gray">
                            ${Object.keys(this.data).length} ${(0,h.A)(this._hass,"device.title_plural")}
                          </span>
                        </div>
                        <div>
                          ${this._hass.user.is_admin?l.qy`
                          <ha-dropdown
                            class="ha-icon-overflow-menu-overflow"
                            corner="BOTTOM_END"
                            absolute
                          >
                            <ha-icon-button
                              label=${this._hass.localize("ui.common.overflow_menu")}
                              .path=${d.TdJ}
                              slot="trigger"
                            ></ha-icon-button>
                              ${this.deviceEditMode?l.qy`
                                <ha-list-item
                                  graphic="icon"
                                  .value=${!1}
                                  @click=${this._handleDeviceEditModeClicked}
                                >
                                  <div slot="graphic">
                                    <ha-svg-icon .path=${d.CZ3}></ha-svg-icon>
                                  </div>
                                  ${(0,h.A)(this._hass,"global.disable_edit_mode")}
                                </ha-list-item>`:l.qy`
                                <ha-list-item
                                  graphic="icon"
                                  .value=${!0}
                                  @click=${this._handleDeviceEditModeClicked}
                                >
                                  <div slot="graphic">
                                    <ha-svg-icon .path=${d.CZ3}></ha-svg-icon>
                                  </div>
                                  ${(0,h.A)(this._hass,"global.enable_edit_mode")}
                                </ha-list-item>
                                `}
                          </ha-dropdown>
                          `:""}
                        </div>
                      </div>

                      <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 ${this.configuration.homepage_header.v2_mode?"lg-grid-cols-4 xl-grid-cols-5":""} gap-4" id="sortable">
                        ${Object.values(this.data).map(e=>this._renderDeviceButton(e))}
                      </div>

                      ${this.deviceEditMode?l.qy`
                        ${this.disabledDevices.length?l.qy`
                          <div class="mb-5">
                            <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"device.hidden")}</h3>
                            <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                            ${this.disabledDevices.map(e=>l.qy`${this._renderDeviceButtonCard(e,"disabled")}`)}
                            </div>
                          </div>`:""}
                      `:""}
                    </div>
                  </div>
                  <div class="w-full ${this.configuration.homepage_header.v2_mode?"":"lg-w-1-2 xl-w-2-3"} ${window.location.hash?"":this.configuration.homepage_header.v2_mode?"hidden":"hidden lg-block"} p-4">
                    ${Object.values(this.data).map(e=>this._renderDeviceView(e))}
                  </div>
                </div>
                <div class="sticky z-30 bottom-0 ${window.location.hash?"":"hidden"} ${this.configuration.homepage_header.v2_mode?"":"lg-hidden"} text-right">
                <div @click=${this._backButtonClick} class="back-button">
                    <div class="button">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                      </svg>
                    </div>
                </div>
                </div>
            `}static get styles(){return[l.AH`
            :host {
              display: block;
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .dd-overview-grid {
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            @media (max-width: 599px) {
              .w-full {
                box-sizing: border-box;
                max-width: 100%;
              }
              .grid.dd-overview-grid > * {
                min-width: 0;
                max-width: 100%;
              }
            }
            .card-actions {
              text-align: right;
            }
            .card-actions-multiple {
              display: flex;
              justify-content: space-between;
              padding: 0.25rem 0.5rem;
            }
            .sortable-move {
              cursor: -webkit-grabbing;
              cursor: grab;
              margin: auto 0;
            }
            .device-button .info ha-icon, .ha-icon ha-icon {
              display: inline-block;
              margin: auto;
              --mdc-icon-size: 100% !important;
              --iron-icon-width: 100% !important;
              --iron-icon-height: 100% !important;
            }
            #badges {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            .break-words {
              overflow-wrap: break-word;
            }
            .device-button {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              border-radius: var(--ha-card-border-radius, 4px);
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            @media (min-width: 1024px) {
              .device-button.current {
                background: transparent;
                z-index: 1;
                position: relative;
              }
              .device-button.current::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                opacity: .12;
                z-index: -1;
                background: var(--sidebar-selected-icon-color);
                border-radius: var(--ha-card-border-radius, 4px);
              }
            }
            /*styling tailwind dwains version*/
            *, ::after, ::before {
              box-sizing: border-box;
            }
            h1,h2,h3 {
              margin: 0;
            }
            h3 {
              font-size: 1em;
            }
            .absolute {
              position: absolute
            }
            .relative {
                position: relative
            }
            .sticky {
                position: -webkit-sticky;
                position: sticky
            }
            .top-0 {
                top: 0px
            }
            .bottom-0 {
                bottom: 0px
            }
            .z-30 {
                z-index: 7;
            }
            .col-span-1 {
                grid-column: span 1 / span 1
            }
            .col-span-2 {
                grid-column: span 2 / span 2
            }
            .row-span-1 {
                grid-row: span 1 / span 1
            }
            .row-span-2 {
                grid-row: span 2 / span 2
            }
            .my-4 {
                margin-top: 1rem;
                margin-bottom: 1rem
            }
            .mx-auto {
              margin-left: auto;
              margin-right: auto
            }
            .mb-2 {
                margin-bottom: 0.5rem
            }
            .mb-4 {
                margin-bottom: 1rem
            }
            .mt-4 {
                margin-top: 1rem
            }
            .mr-0\.5 {
                margin-right: 0.125rem
            }
            .mr-0 {
                margin-right: 0px
            }
            .mb-12 {
                margin-bottom: 3rem
            }
            .mb-5 {
                margin-bottom: 1.25rem
            }
            .mb-16 {
                margin-bottom: 4rem
            }
            .ml-4 {
                margin-left: 1rem
            }
            .block {
                display: block
            }
            .inline-block {
                display: inline-block
            }
            .flex {
                display: flex
            }
            .inline-flex {
                display: inline-flex
            }
            .grid {
                display: grid
            }
            .hidden {
                display: none
            }
            .h-6 {
                height: 1.5rem
            }
            .h-44 {
                height: 11rem
            }
            .h-full {
                height: 100%
            }
            .h-14 {
                height: 3.5rem
            }
            .h-8 {
                height: 2rem
            }
            .w-full {
                width: 100%
            }
            .w-6 {
                width: 1.5rem
            }
            .w-14 {
                width: 3.5rem
            }
            .w-8 {
                width: 2rem
            }
            .w-12 {
              width: 3rem
            }
            .cursor-pointer {
                cursor: pointer
            }
            .grid-flow-row-dense {
                grid-auto-flow: row dense
            }
            .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr))
            }
            .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
            .flex-wrap {
                flex-wrap: wrap
            }
            .content-between {
                align-content: space-between
            }
            .items-center {
                align-items: center
            }
            .justify-between {
                justify-content: space-between
            }
            .gap-4 {
                gap: 1rem
            }
            .space-y-0.5 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0.125rem * var(--tw-space-y-reverse))
            }
            .space-y-0 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0px * var(--tw-space-y-reverse))
            }
            .rounded {
                border-radius: 0.25rem
            }
            .rounded-md {
                border-radius: 0.375rem
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .rounded-lg {
              border-radius: 0.5rem
            }
            .border-2 {
                border-width: 2px
            }
            .border-dashed {
                border-style: dashed
            }
            .border-gray-300 {
                --tw-border-opacity: 1;
                border-color: rgb(209 213 219 / var(--tw-border-opacity))
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .bg-opacity-50 {
                --tw-bg-opacity: 0.5
            }
            .p-2 {
              padding: 0.5rem;
            }
            .p-4 {
                padding: 1rem
            }
            .p-1 {
                padding: 0.25rem
            }
            .p-3 {
                padding: 0.75rem
            }
            .px-1 {
                padding-left: 0.25rem;
                padding-right: 0.25rem
            }
            .p-12 {
              padding: 3rem
            }
            .py-0\.5 {
                padding-top: 0.125rem;
                padding-bottom: 0.125rem
            }
            .py-0 {
                padding-top: 0px;
                padding-bottom: 0px
            }
            .text-center {
              text-align: center
            }
            .text-right {
                text-align: right
            }
            .text-xl {
                font-size: 1.5rem;
                line-height: 2rem
            }
            .text-lg {
                font-size: 1.125rem;
                line-height: 1.75rem
            }
            .text-sm {
                font-size: 0.875rem;
                line-height: 1.25rem
            }
            .text-xs {
                font-size: 0.75rem;
                line-height: 1rem
            }
            .font-semibold {
                font-weight: 600
            }
            .font-medium {
                font-weight: 500
            }
            .capitalize {
                text-transform: capitalize
            }
            .text-gray {
              color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
            }
            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity))
            }
            @media (min-width: 768px) {
                .md-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1024px) {
                .lg-col-span-1 {
                    grid-column: span 1 / span 1
                }
                .lg-col-span-3 {
                    grid-column: span 3 / span 3
                }
                .lg-col-span-2 {
                    grid-column: span 2 / span 2
                }
                .lg-row-span-1 {
                    grid-row: span 1 / span 1
                }
                .lg-row-span-3 {
                    grid-row: span 3 / span 3
                }
                .lg-row-span-2 {
                    grid-row: span 2 / span 2
                }
                .lg-block {
                    display: block
                }
                .lg-hidden {
                    display: none
                }
                .lg-w-1-2 {
                    width: 50%
                }
                .lg-grid-cols-2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr))
                }
                .lg-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
                .lg-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
                }
            }
            @media (min-width: 1536px) {
              .xl-col-span-1 {
                  grid-column: span 1 / span 1
              }
              .xl-col-span-4 {
                  grid-column: span 4 / span 4
              }
              .xl-col-span-2 {
                  grid-column: span 2 / span 2
              }
              .xl-row-span-1 {
                  grid-row: span 1 / span 1
              }
              .xl-row-span-4 {
                  grid-row: span 4 / span 4
              }
              .xl-row-span-2 {
                  grid-row: span 2 / span 2
              }
              .xl-w-1-3 {
                  width: 33.333333%
              }
              .xl-w-2-3 {
                  width: 66.666667%
              }
              .xl-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
              }
              .xl-grid-cols-5 {
                grid-template-columns: repeat(5, minmax(0, 1fr))
              }
          }
          `,(0,u.Ve)(l.AH),(0,u.md)(l.AH),(0,u.ww)(l.AH)]}}A("devices-card",z)},8973(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{closeParentDropdown:s}=i(8276),{defineDwainsElement:d}=i(572);class l extends r.WF{static get styles(){return[r.AH`
        .edit-element {
          padding: 20px;
          max-width: 460px;
          margin-right: auto;
          margin-left: auto;
        }
        .edit-element ha-icon-picker, .edit-element ha-select, .edit-element ha-entity-picker {
          display: block;
          margin: .8rem 0;
        }
        .edit-element ha-formfield {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin: .9rem 0;
          padding-inline-start: .25rem;
        }
        .add-button {
          font-size: 16px;
          border: 2px solid #4591B8;
          padding: 5px;
          margin-bottom: 50px;
          background: #459CEE;
          border-radius: 20px;
          color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        `]}setConfig(e){this.hass||(this.hass=(0,a.mo)()),this.areaId=e.areaId,this.icon=e.icon?e.icon:"",this.disableArea=!!e.disableArea&&e.disableArea,this.hideIcon=!!e.hideIcon&&e.hideIcon}connectedCallback(){super.connectedCallback()}_iconPickerChange(e){this.icon=e.detail.value}_disableValueChanged(e){this.disableArea=e.target.checked}_hideIconValueChanged(e){this.hideIcon=e.target.checked,this.requestUpdate()}_saveButton(e){s(e),e.stopPropagation(),this.hass.callWS({type:"dwains_dashboard/edit_area_button",icon:this.icon,areaId:this.areaId,disableArea:this.disableArea,hideIcon:this.hideIcon}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}render(){return r.qy`
      <div class="edit-element">
          <ha-icon-picker
            label=${(0,o.A)(this.hass,"area.icon")}
            .value=${this.icon}
            .name=${(0,o.A)(this.hass,"area.icon")}
            .disabled=${this.hideIcon}
            @value-changed=${this._iconPickerChange}
          ></ha-icon-picker>
          <ha-formfield>
            <ha-checkbox
              @change=${this._hideIconValueChanged}
              .checked=${this.hideIcon}
            ></ha-checkbox>
            <span slot="label">${(0,o.A)(this.hass,"area.hide_icon")}</span>
          </ha-formfield>
          <ha-formfield>
            <ha-checkbox
              @change=${this._disableValueChanged}
              .checked=${this.disableArea}
            ></ha-checkbox>
            <span slot="label">${(0,o.A)(this.hass,"area.disable")}</span>
          </ha-formfield>
          <div class="card-footer">
            <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
              ${this.hass.localize("ui.common.cancel")}
            </ha-button>
            <ha-button slot="primaryAction" @click=${this._saveButton}>
              ${this.hass.localize("ui.common.submit")}
            </ha-button>
          </div>
      </div>
      `}}d("dwains-edit-area-button-card",l)},6166(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{closeParentDropdown:s}=i(8276),{defineDwainsElement:d}=i(572);class l extends r.WF{static get styles(){return[r.AH`
        .edit-element {
          padding: 20px;
          max-width: 460px;
          margin-right: auto;
          margin-left: auto;
        }
        .edit-element ha-icon-picker, .edit-element ha-textfield, .edit-element ha-select, .edit-element ha-entity-picker {
          display: block;
          margin: .8rem 0;
        }
        .edit-element ha-formfield {
          display: flex;
          align-items: center;
          gap: .6rem;
          margin: .9rem 0;
          padding-inline-start: .25rem;
        }
          .add-button {
            font-size: 16px;
            border: 2px solid #4591B8;
            padding: 5px;
            margin-bottom: 50px;
            background: #459CEE;
            border-radius: 20px;
            color: white;
          }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          ha-formfield {
            padding: 16px 6px;
          }
          `]}setConfig(e){this.hass||(this.hass=(0,a.mo)()),this.device=e.device,this.icon=e.icon?e.icon:"",this.showInNavbar=!!e.showInNavbar&&e.showInNavbar}connectedCallback(){super.connectedCallback()}_iconPickerChange(e){this.icon=e.detail.value}_showInMainNavbarValueChanged(e){this.showInNavbar=e.target.checked}_saveButton(e){s(e),e.stopPropagation(),!this.showInNavbar||this.icon?this.hass.callWS({type:"dwains_dashboard/edit_device_button",icon:this.icon,device:this.device,showInNavbar:this.showInNavbar}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)}):alert((0,o.A)(this.hass,"device.icon_required"))}render(){return r.qy`
        <div class="edit-element">
            <ha-icon-picker
              label=${(0,o.A)(this.hass,"device.icon")}
              .value=${this.icon}
              @value-changed=${this._iconPickerChange}
            ></ha-icon-picker>

          <ha-formfield>
              <ha-switch
                @change=${this._showInMainNavbarValueChanged}
                .checked=${this.showInNavbar}
              ></ha-switch>
            <span slot="label">${(0,o.A)(this.hass,"device.show_in_navbar")}</span>
          </ha-formfield>

            <div class="card-footer">
              <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
                ${this.hass.localize("ui.common.cancel")}
              </ha-button>
              <ha-button slot="primaryAction" @click=${this._saveButton}>
                ${this.hass.localize("ui.common.submit")}
              </ha-button>
            </div>
        </div>
        `}}d("dwains-edit-device-button-card",l)},9640(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{websocketReadStore:s}=i(9012),{ConnectedLoadOwner:d}=i(3118),{hassConnectionIdentity:l,hasHassConnectionChanged:c}=i(4776),{defineDwainsElement:h}=i(572);class p extends r.WF{constructor(){super(),this._connectedLoadOwner=new d(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load device-card editor data"}),this._configReady=!1}set hass(e){const t=c(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}get hass(){return this._hass}static get styles(){return[r.AH`
          .edit-element {
            padding: 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
          }
          blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
            margin: 0;
          }
          .add-button {
            font-size: 16px;
            border: 2px solid #4591B8;
            padding: 5px;
            margin-bottom: 50px;
            background: #459CEE;
            border-radius: 20px;
            color: white;
          }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          .grid {
            display: grid;
            gap: 2rem;
          }
          @media (min-width: 768px){
            .grid-cols-2 {
              grid-template-columns: repeat(2,minmax(0,1fr));
            }
          }
          .pre-select {
            padding: 2.5rem;
          }
          .pre-select-option {
            padding: 2.5rem;
            border: 1px solid #4591B8;
            text-align: center;
            cursor: pointer;
          }
          .pre-selected-option:hover {
            border: 2px solid #4591B8;
          }
          .more-page-settings {
            padding: 0.75rem;
            border: 2px solid grey;
          }
          .seperator {
            background-color: var(--secondary-background-color);
            width: 100%;
            height: 3px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
          table {
              text-indent: 0;
              border-color: inherit;
              border-collapse: collapse;
          }
          .bg-gray-50 {
            background-color: var(--secondary-background-color);
          }
          .tracking-wider {
              letter-spacing: .05em;
          }
          .text-sm {
            font-size: .875rem;
            line-height: 1.25rem;
          }
          .py-4 {
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
          .uppercase {
              text-transform: uppercase;
          }
          .font-medium {
              font-weight: 500;
          }
          .text-xs {
              font-size: .75rem;
              line-height: 1rem;
          }
          .text-left {
              text-align: left;
          }
          .px-6 {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
          }
          .py-3 {
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
          }
          .card-footer-multiple {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          `]}static get properties(){return{mode:{},blueprints:{}}}setConfig(e){if(this.hass||(this.hass=(0,a.mo)()),this.mode=e.mode?e.mode:"dwains-dashboard-blueprint-select",this.domain=e.domain,e.cardConfig){const t=e.cardConfig;delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.existingCardEdit=!!e.existingCardEdit&&e.existingCardEdit,this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=l(t),a=await s.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&l(this._hass)===i&&(this.blueprints=a)}_loadBlueprints(){return this._connectedLoadOwner.reload()}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_removeCard(){this.hass.callWS({type:"dwains_dashboard/remove_device_card",domain:this.domain}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this.hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),s.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint,i=JSON.stringify({type:"custom:dwains-blueprint-card",blueprint:t,card:this.blueprints.blueprints[t].card});this.hass.callWS({type:"dwains_dashboard/edit_device_card",cardData:i,domain:this.domain}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this.hass.localize("ui.common.successfully_saved")),s.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
          <div>
            ${t?r.qy`
              <ha-icon
                style="color: green;"
                .icon=${"mdi:check-bold"}
              ></ha-icon>`:r.qy`
              <ha-icon
                style="color: red;"
                .icon=${"mdi:close-thick"}
              ></ha-icon>
              `}
            ${e}
            ${t?r.qy`(${(0,o.A)(this.hass,"blueprint.installed")})`:r.qy`(${(0,o.A)(this.hass,"blueprint.not_installed")})`}
          </div>
        `}render(){if(null==this.blueprints||0===this.blueprints.length)return r.qy`Loading...`;if("dwains-dashboard-blueprint-select"==this.mode){const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
          <div class="edit-element">
            <strong>${(0,o.A)(this.hass,"blueprint.installed_blueprints")}:</strong>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.title")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"global.version")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.type")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.used_custom_cards")}</th>
                  <th scope="col" class="relative px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody>
                ${0==Object.values(this.blueprints.blueprints).length?r.qy`
                  <tr>
                    <td  class="px-6 py-4" colspan="5">${(0,o.A)(this.hass,"blueprint.no_blueprints_installed")}</td>
                  </tr>`:r.qy`
                  ${Object.entries(e).map(([e,t])=>r.qy`
                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <h3>${t[1].blueprint.name}</h3>
                              ${t[1].blueprint.description}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.version}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.type}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                                  ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                                `:"None"}
                            </td>
                            <td>
                              ${"replace-card"==t[1].blueprint.type?r.qy`
                                <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                  ${(0,o.A)(this.hass,"blueprint.use")}
                                </ha-button>
                              `:""}
                              <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                                <ha-icon
                                  .icon=${"mdi:delete"}
                                ></ha-icon>
                              </ha-button>
                            </td>
                          </tr>
                        `)}
                  `}
              </tbody>
            </table>
            <div class="seperator"></div>
            <strong>${(0,o.A)(this.hass,"blueprint.install")}</strong>
            <p>${(0,o.A)(this.hass,"blueprint.instruction")}</p>
            <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
            <ha-yaml-editor
              label=${(0,o.A)(this.hass,"blueprint.yaml_code")}
              name="description"
              @value-changed=${this._installBlueprintYamlChanged}
            ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
            <div style="margin-top: 15px; margin-bottom: 20px;">
              <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
                ${(0,o.A)(this.hass,"blueprint.install")}
              </ha-button>
            </div>
          </div>`}return"current-selected-blueprint"==this.mode?r.qy`
            <div class="edit-element">
              <p>
              ${(0,o.A)(this.hass,"device.current_blueprint_card")} ${(0,o.A)(this.hass,"device."+this.domain)}:<br>
                <strong>${this.blueprints.blueprints[this.cardConfig.blueprint].blueprint.name}</strong><br>
                ${this.blueprints.blueprints[this.cardConfig.blueprint].blueprint.description}
              </p>

              <div class="card-footer-multiple">
                ${this.existingCardEdit?r.qy`
                    <div>
                      <ha-button class="warning" @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>
                      <ha-button class="warning" @click=${e=>this.mode="dwains-dashboard-blueprint-select"}}>${this.hass.localize("ui.common.previous")}</ha-button>
                    </div>
                  `:r.qy`<div></div>`}
                <div>
                  <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
                    ${this.hass.localize("ui.common.cancel")}
                  </ha-button>
                  <ha-button slot="primaryAction" .blueprint=${this.cardConfig.blueprint} @click=${this._handleUseBlueprintClicked}>
                    ${this.hass.localize("ui.common.submit")}
                  </ha-button>
                </div>
              </div>
            </div>
          `:void 0}}h("dwains-edit-device-card-card",p)},3468(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{websocketReadStore:s}=i(9012),{ConnectedLoadOwner:d}=i(3118),{hassConnectionIdentity:l,hasHassConnectionChanged:c}=i(4776),{defineDwainsElement:h}=i(572);class p extends r.WF{constructor(){super(),this._connectedLoadOwner=new d(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load device-popup editor data"}),this._configReady=!1}set hass(e){const t=c(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}get hass(){return this._hass}static get styles(){return[r.AH`
          .edit-element {
            padding: 20px;
          }
          h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
          }
          blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
            margin: 0;
          }
          .add-button {
            font-size: 16px;
            border: 2px solid #4591B8;
            padding: 5px;
            margin-bottom: 50px;
            background: #459CEE;
            border-radius: 20px;
            color: white;
          }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          .grid {
            display: grid;
            gap: 2rem;
          }
          @media (min-width: 768px){
            .grid-cols-2 {
              grid-template-columns: repeat(2,minmax(0,1fr));
            }
          }
          .pre-select {
            padding: 2.5rem;
          }
          .pre-select-option {
            padding: 2.5rem;
            border: 1px solid #4591B8;
            text-align: center;
            cursor: pointer;
          }
          .pre-selected-option:hover {
            border: 2px solid #4591B8;
          }
          .more-page-settings {
            padding: 0.75rem;
            border: 2px solid grey;
          }
          .seperator {
            background-color: var(--secondary-background-color);
            width: 100%;
            height: 3px;
            margin-top: 15px;
            margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
          table {
              text-indent: 0;
              border-color: inherit;
              border-collapse: collapse;
          }
          .bg-gray-50 {
            background-color: var(--secondary-background-color);
          }
          .tracking-wider {
              letter-spacing: .05em;
          }
          .text-sm {
            font-size: .875rem;
            line-height: 1.25rem;
          }
          .py-4 {
              padding-top: 1rem;
              padding-bottom: 1rem;
          }
          .uppercase {
              text-transform: uppercase;
          }
          .font-medium {
              font-weight: 500;
          }
          .text-xs {
              font-size: .75rem;
              line-height: 1rem;
          }
          .text-left {
              text-align: left;
          }
          .px-6 {
              padding-left: 1.5rem;
              padding-right: 1.5rem;
          }
          .py-3 {
              padding-top: 0.75rem;
              padding-bottom: 0.75rem;
          }
          .card-footer-multiple {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            border-top: 1px solid var(--divider-color);
          }
          `]}static get properties(){return{mode:{},blueprints:{}}}setConfig(e){if(this.hass||(this.hass=(0,a.mo)()),this.mode=e.mode?e.mode:"dwains-dashboard-blueprint-select",this.domain=e.domain,e.cardConfig){const t=e.cardConfig;delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.existingCardEdit=!!e.existingCardEdit&&e.existingCardEdit,this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=l(t),a=await s.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&l(this._hass)===i&&(this.blueprints=a)}_loadBlueprints(){return this._connectedLoadOwner.reload()}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_removeCard(){this.hass.callWS({type:"dwains_dashboard/remove_device_popup",domain:this.domain}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this.hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),s.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint,i=JSON.stringify({type:"custom:dwains-blueprint-card",blueprint:t,card:this.blueprints.blueprints[t].card});this.hass.callWS({type:"dwains_dashboard/edit_device_popup",cardData:i,domain:this.domain}).then(e=>{console.log(e),(0,n.fs)()},e=>{console.error("Message failed!",e)})}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this.hass.localize("ui.common.successfully_saved")),s.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
          <div>
            ${t?r.qy`
              <ha-icon
                style="color: green;"
                .icon=${"mdi:check-bold"}
              ></ha-icon>`:r.qy`
              <ha-icon
                style="color: red;"
                .icon=${"mdi:close-thick"}
              ></ha-icon>
              `}
            ${e}
            ${t?r.qy`(${(0,o.A)(this.hass,"blueprint.installed")})`:r.qy`(${(0,o.A)(this.hass,"blueprint.not_installed")})`}
          </div>
        `}render(){if("dwains-dashboard-blueprint-select"==this.mode){const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
          <div class="edit-element">
            <strong>${(0,o.A)(this.hass,"blueprint.installed_blueprints")}:</strong>
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.title")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"global.version")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.type")}</th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this.hass,"blueprint.used_custom_cards")}</th>
                  <th scope="col" class="relative px-6 py-3">
                  </th>
                </tr>
              </thead>
              <tbody>
              ${Object.entries(e).map(([e,t])=>r.qy`
                      <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          <h3>${t[1].blueprint.name}</h3>
                          ${t[1].blueprint.description}
                        </td>
                        <td class="px-6 py-4">
                          ${t[1].blueprint.version}
                        </td>
                        <td class="px-6 py-4">
                          ${t[1].blueprint.type}
                        </td>
                        <td class="px-6 py-4">
                          ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                              ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                            `:"None"}
                        </td>
                        <td>
                          ${"replace-card"==t[1].blueprint.type?r.qy`
                            <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                              ${(0,o.A)(this.hass,"blueprint.use")}
                            </ha-button>
                          `:""}
                          <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                            <ha-icon
                              .icon=${"mdi:delete"}
                            ></ha-icon>
                          </ha-button>
                        </td>
                      </tr>
                    `)}
              </tbody>
            </table>
            <div class="seperator"></div>
            <strong>${(0,o.A)(this.hass,"blueprint.install")}</strong>
            <p>${(0,o.A)(this.hass,"blueprint.instruction")}</p>
            <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
            <ha-yaml-editor
              label=${(0,o.A)(this.hass,"blueprint.yaml_code")}
              name="description"
              @value-changed=${this._installBlueprintYamlChanged}
            ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
            <div style="margin-top: 15px; margin-bottom: 20px;">
              <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
                ${(0,o.A)(this.hass,"blueprint.install")}
              </ha-button>
            </div>
          </div>`}if("current-selected-blueprint"==this.mode)return r.qy`
            <div class="edit-element">
              <p>
                ${(0,o.A)(this.hass,"device.current_blueprint_popup")} ${(0,o.A)(this.hass,"device."+this.domain)}:<br>
                <strong>${this.blueprints.blueprints[this.cardConfig.blueprint].blueprint.name}</strong><br>
                ${this.blueprints.blueprints[this.cardConfig.blueprint].blueprint.description}
              </p>
              <div class="card-footer-multiple">
                ${this.existingCardEdit?r.qy`
                    <div>
                      <ha-button class="warning" @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>
                      <ha-button class="warning" @click=${e=>this.mode="dwains-dashboard-blueprint-select"}}>${this.hass.localize("ui.common.previous")}</ha-button>
                    </div>
                  `:r.qy`<div></div>`}
                <div>
                  <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
                    ${this.hass.localize("ui.common.cancel")}
                  </ha-button>
                  <ha-button slot="primaryAction" .blueprint=${this.cardConfig.blueprint} @click=${this._handleUseBlueprintClicked}>
                    ${this.hass.localize("ui.common.submit")}
                  </ha-button>
                </div>
              </div>
            </div>
          `}}h("dwains-edit-device-popup-card",p)},7237(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(7969),n=i(9177),s=i(8089);const{websocketReadStore:d}=i(9012),{ConnectedLoadOwner:l}=i(3118),{hassConnectionIdentity:c,hasHassConnectionChanged:h}=i(4776),{defineDwainsElement:p}=i(572);class u extends r.WF{constructor(){super(),this._connectedLoadOwner=new l(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load entity-card editor data"}),this._configReady=!1}set hass(e){const t=h(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}get hass(){return this._hass}static get styles(){return[r.AH`
        .edit-element {
          padding: 20px;
        }
        h1, h2, h3, h4, h5, h6 {
          font-size: inherit;
        }
        blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
          margin: 0;
        }
        .add-button {
          font-size: 16px;
          border: 2px solid #4591B8;
          padding: 5px;
          margin-bottom: 50px;
          background: #459CEE;
          border-radius: 20px;
          color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .grid {
          display: grid;
          gap: 2rem;
        }
        @media (min-width: 768px){
          .grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }
        }
        .pre-select {
          padding: 2.5rem;
        }
        .pre-select-option {
          padding: 2.5rem;
          border: 1px solid #4591B8;
          text-align: center;
          cursor: pointer;
        }
        .pre-selected-option:hover {
          border: 2px solid #4591B8;
        }
        .more-page-settings {
          padding: 0.75rem;
          border: 2px solid grey;
        }
        .seperator {
          background-color: var(--secondary-background-color);
          width: 100%;
          height: 3px;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
        }
        .bg-gray-50 {
          background-color: var(--secondary-background-color);
        }
        .tracking-wider {
            letter-spacing: .05em;
        }
        .text-sm {
          font-size: .875rem;
          line-height: 1.25rem;
        }
        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .font-medium {
            font-weight: 500;
        }
        .text-xs {
            font-size: .75rem;
            line-height: 1rem;
        }
        .text-left {
            text-align: left;
        }
        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        .card-footer-multiple {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        `]}static get properties(){return{mode:{},blueprints:{}}}setConfig(e){if(this.hass||(this.hass=(0,a.mo)()),this.mode=e.mode?e.mode:"pre-select",this.entity_id=e.entity_id,e.cardConfig){const t=e.cardConfig;delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.existingCardEdit=!!e.existingCardEdit&&e.existingCardEdit,this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=c(t),a=await d.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&c(this._hass)===i&&(this.blueprints=a)}_loadBlueprints(){return this._connectedLoadOwner.reload()}magicStuff(e){const t=e.detail.config.type;o.SG.includes(t)?this.cardConfig={...e.detail.config,entity:this.entity_id}:this.cardConfig=e.detail.config,this.mode="editor-element",this.requestUpdate()}magicStuffSecond(e){}_sendCard(){const e=JSON.stringify(this.cardConfig);this.hass.callWS({type:"dwains_dashboard/edit_entity_card",cardData:e,entityId:this.entity_id}).then(e=>{console.log(e),(0,s.fs)()},e=>{console.error("Message failed!",e)})}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_removeCard(){this.hass.callWS({type:"dwains_dashboard/remove_entity_card",entityId:this.entity_id}).then(e=>{console.log(e),(0,s.fs)()},e=>{console.error("Message failed!",e)})}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this.hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint;this.mode="editor-element",this.name=this.blueprints.blueprints[t].blueprint.name,this.cardConfig={type:"custom:dwains-blueprint-card",blueprint:t,input_entity:this.entity_id,card:this.blueprints.blueprints[t].card}}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this.hass.localize("ui.common.successfully_saved")),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
        <div>
          ${t?r.qy`
            <ha-icon
              style="color: green;"
              .icon=${"mdi:check-bold"}
            ></ha-icon>`:r.qy`
            <ha-icon
              style="color: red;"
              .icon=${"mdi:close-thick"}
            ></ha-icon>
            `}
          ${e}
          ${t?r.qy`(${(0,n.A)(this.hass,"blueprint.installed")})`:r.qy`(${(0,n.A)(this.hass,"blueprint.not_installed")})`}
        </div>
      `}render(){if(null==this.blueprints||0===this.blueprints.length)return r.qy`Loading...`;if("pre-select"==this.mode)return r.qy`
          <ha-md-list>
            <ha-list-item twoline .mode=${"hui-card-picker"} @click=${this._switchMode}>
              ${(0,n.A)(this.hass,"editor.lovelace_card")}
              <span slot="secondary">
                ${(0,n.A)(this.hass,"editor.create_lovelace_card")}
              </span>
            </ha-list-item>
            <li divider role="separator"></li>
            <ha-list-item hasmeta twoline .mode=${"dwains-dashboard-blueprint-select"} @click=${this._switchMode}>
              ${(0,n.A)(this.hass,"editor.dwains_dashboard_blueprint")}
              <span slot="secondary">
                ${(0,n.A)(this.hass,"editor.use_dwains_dashboard_blueprint")}
              </span>
              <ha-icon-next slot="meta"></ha-icon-next
            ></ha-list-item>
          </ha-md-list>
        `;if("dwains-dashboard-blueprint-select"==this.mode){const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
        <div class="edit-element">

          <div style="margin-bottom: 20px;">
            <ha-button .mode=${"pre-select"} @click=${this._switchMode}>< ${this.hass.localize("ui.common.previous")}</ha-button>
          </div>

          <strong>${(0,n.A)(this.hass,"blueprint.installed_blueprints")}:</strong>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.title")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"global.version")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.type")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.used_custom_cards")}</th>
                <th scope="col" class="relative px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              ${0==Object.values(this.blueprints.blueprints).length?r.qy`
                <tr>
                  <td  class="px-6 py-4" colspan="5">${(0,n.A)(this.hass,"blueprint.no_blueprints_installed")}</td>
                </tr>`:r.qy`
                  ${Object.entries(e).map(([e,t])=>r.qy`
                          <tr class="bg-white">
                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              <h3>${t[1].blueprint.name}</h3>
                              ${t[1].blueprint.description}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.version}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.type}
                            </td>
                            <td class="px-6 py-4">
                              ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                                  ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                                `:"None"}
                            </td>
                            <td>
                              ${"card"==t[1].blueprint.type||"replace-card"==t[1].blueprint.type?r.qy`
                                <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                  ${(0,n.A)(this.hass,"blueprint.use")}
                                </ha-button>
                              `:""}
                              <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                                <ha-icon
                                  .icon=${"mdi:delete"}
                                ></ha-icon>
                              </ha-button>
                            </td>
                          </tr>
                        `)}
                `}
            </tbody>
          </table>
          <div class="seperator"></div>
          <strong>${(0,n.A)(this.hass,"blueprint.install")}</strong>
          <p>${(0,n.A)(this.hass,"blueprint.instruction")}</p>
          <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
          <ha-yaml-editor
            label=${(0,n.A)(this.hass,"blueprint.yaml_code")}
            name="description"
            @value-changed=${this._installBlueprintYamlChanged}
          ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
          <div style="margin-top: 15px; margin-bottom: 20px;">
            <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
              ${(0,n.A)(this.hass,"blueprint.install")}
            </ha-button>
          </div>
        </div>`}return"hui-card-picker"==this.mode?r.qy`
          <div class="edit-element">
            <h1 style="font-size: 17px; font-weight: bold;">Select the card you want to use for ${this.entity_id}</h1>
            <dwains-card-picker
              @config-changed=${this.magicStuff}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-picker>
            <div class="card-footer">
              <ha-button slot="secondaryAction" @click=${e=>(0,s.fs)()}>
                ${this.hass.localize("ui.common.cancel")}
              </ha-button>
            </div>
          </div>
        `:r.qy`
          <div class="edit-element">
            <dwains-card-config-editor
              @save-config=${this.magicStuffSecond}
              @config-changed=${this.magicStuff}
              .value=${this.cardConfig}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-config-editor>
            <dwains-card-preview
              .hass=${this.hass}
              .config=${this.cardConfig}
            ></dwains-card-preview>
            <div class="card-footer-multiple">
              ${this.existingCardEdit?r.qy`
                  <div>
                    <ha-button class="warning" @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>
                    <ha-button class="warning" @click=${e=>this.mode="hui-card-picker"}}>${this.hass.localize("ui.common.previous")}</ha-button>
                  </div>
                `:r.qy`<div></div>`}
              <div>
                <ha-button slot="secondaryAction" @click=${e=>(0,s.fs)()}>
                  ${this.hass.localize("ui.common.cancel")}
                </ha-button>
                <ha-button slot="primaryAction" @click=${this._sendCard}>
                  ${this.hass.localize("ui.common.submit")}
                </ha-button>
              </div>
            </div>
          </div>
        `}}p("dwains-edit-entity-card-card",u)},4826(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(9177),n=i(8089);const{closeParentDropdown:s}=i(8276),{defineDwainsElement:d}=i(572);class l extends r.WF{static get styles(){return[r.AH`
        h2 {
          margin: 0;
          font-size: 1rem;
        }
        .edit-element {
          padding: 20px;
        }
        .add-button {
          font-size: 16px;
          border: 2px solid #4591B8;
          padding: 5px;
          margin-bottom: 50px;
          background: #459CEE;
          border-radius: 20px;
          color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .grid-2 {
          display: grid;
          grid-template-columns: repeat(2,minmax(0,1fr));
          gap: 1rem;
        }
        ha-select, select, ha-input, ha-formfield {
          width: 100%;
        }
        select {
          min-height: 56px;
          padding: 0 40px 0 14px;
          color: var(--primary-text-color);
          background: var(--ha-color-surface-high, var(--ha-color-form-background, var(--ha-color-surface-default, var(--card-background-color))));
          border: 1px solid var(--divider-color);
          border-radius: var(--ha-card-border-radius, 12px);
        }
        select:focus, select:focus-visible {
          outline: none;
          border-color: var(--accent-color);
        }
        `]}setConfig(e){this.hass||(this.hass=(0,a.mo)()),this.entity=e.entity,this.friendlyName=e.friendlyName?e.friendlyName:"",this.hideEntity=!!e.hideEntity&&e.hideEntity,this.hideEntityInArea=e.hideEntityInArea??!1,this.disableEntity=!!e.disableEntity&&e.disableEntity,this.excludeEntity=!!e.excludeEntity&&e.excludeEntity,this.rowSpan=e.rowSpan?e.rowSpan:"1",this.colSpan=e.colSpan?e.colSpan:"1",this.rowSpanLg=e.rowSpanLg?e.rowSpanLg:"1",this.colSpanLg=e.colSpanLg?e.colSpanLg:"1",this.rowSpanXl=e.rowSpanXl?e.rowSpanXl:"1",this.colSpanXl=e.colSpanXl?e.colSpanXl:"1",this.customCard=!!e.customCard&&e.customCard,this.customPopup=!!e.customPopup&&e.customPopup}async _saveButton(e){s(e),e.stopPropagation();try{await this.hass.callWS({type:"dwains_dashboard/edit_entity",entity:this.entity,friendlyName:this.friendlyName,disableEntity:this.disableEntity,hideEntity:this.hideEntity,excludeEntity:this.excludeEntity,rowSpan:this.rowSpan,colSpan:this.colSpan,rowSpanLg:this.rowSpanLg,colSpanLg:this.colSpanLg,rowSpanXl:this.rowSpanXl,colSpanXl:this.colSpanXl,customCard:this.customCard,customPopup:this.customPopup}),await this.hass.callWS({type:"dwains_dashboard/edit_entity_bool_value",entityId:this.entity,key:"hidden_in_area",value:this.hideEntityInArea}),(0,n.fs)()}catch(e){console.error("Failed to save entity settings:",e)}}_friendlyNameChanged(e){this.friendlyName=e.target.value}_disableValueChanged(e){this.disableEntity=e.target.checked}_hideValueChanged(e){this.hideEntity=e.target.checked}_hideInAreaValueChanged(e){this.hideEntityInArea=e.target.checked}_excludeValueChanged(e){this.excludeEntity=e.target.checked}_customCardValueChanged(e){this.customCard=e.target.checked}_customPopupValueChanged(e){this.customPopup=e.target.checked}_haSelectChanged(e){s(e),e.stopPropagation();const t=e.currentTarget||e.target,i=t.name||t.type||t.getAttribute?.("type"),a=e.detail?.value??e.detail?.item?.value??t.selectedItem?.value??t.value;i&&void 0!==a&&(this[i]=a),this.requestUpdate()}_stopPropagation(e){e.stopPropagation()}render(){return r.qy`
        <div class="edit-element">
            <h1 style="font-size: 15px; font-weight: bold;">${(0,o.A)(this.hass,"entity.edit_entity")} "${this.entity}"</h1>

            <ha-input
              label=${(0,o.A)(this.hass,"entity.friendly_name")}
              .value=${this.friendlyName}
              @input=${this._friendlyNameChanged}
            ></ha-input>

            <h2>${(0,o.A)(this.hass,"editor.default_col_row")}</h2>
            <div class="grid-2">
              <select name="rowSpan" .value=${this.rowSpan} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.row")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</option>
              </select>
              <select name="colSpan" .value=${this.colSpan} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.column")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</option>
              </select>
            </div>

            <h2>${(0,o.A)(this.hass,"editor.large_col_row")}</h2>
            <div class="grid-2">
              <select name="rowSpanLg" .value=${this.rowSpanLg} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.row")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</option>
                <option value="3">3 ${(0,o.A)(this.hass,"editor.rows")}</option>
              </select>
              <select name="colSpanLg" .value=${this.colSpanLg} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.column")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</option>
                <option value="3">3 ${(0,o.A)(this.hass,"editor.columns")}</option>
              </select>
            </div>

            <h2>${(0,o.A)(this.hass,"editor.extra_large_col_row")}</h2>
            <div class="grid-2">
              <select name="rowSpanXl" .value=${this.rowSpanXl} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.row")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.rows")}</option>
                <option value="3">3 ${(0,o.A)(this.hass,"editor.rows")}</option>
                <option value="4">4 ${(0,o.A)(this.hass,"editor.rows")}</option>
              </select>
              <select name="colSpanXl" .value=${this.colSpanXl} @change=${this._haSelectChanged} @click=${this._stopPropagation}>
                <option value="1">1 ${(0,o.A)(this.hass,"editor.column")}</option>
                <option value="2">2 ${(0,o.A)(this.hass,"editor.columns")}</option>
                <option value="3">3 ${(0,o.A)(this.hass,"editor.columns")}</option>
                <option value="4">4 ${(0,o.A)(this.hass,"editor.columns")}</option>
              </select>
            </div>

            <ha-formfield label=${(0,o.A)(this.hass,"entity.disable")}>
              <ha-checkbox
                @change=${this._disableValueChanged}
                .checked=${this.disableEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${(0,o.A)(this.hass,"entity.hide")}>
              <ha-checkbox
                @change=${this._hideValueChanged}
                .checked=${this.hideEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${(0,o.A)(this.hass,"entity.hide_in_area")}>
              <ha-checkbox
                @change=${this._hideInAreaValueChanged}
                .checked=${this.hideEntityInArea}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${(0,o.A)(this.hass,"entity.exclude")}>
              <ha-checkbox
                @change=${this._excludeValueChanged}
                .checked=${this.excludeEntity}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${(0,o.A)(this.hass,"entity.use_entity_card")}>
              <ha-checkbox
                @change=${this._customCardValueChanged}
                .checked=${this.customCard}
              ></ha-checkbox>
            </ha-formfield>
            <ha-formfield label=${(0,o.A)(this.hass,"entity.use_popup_card")}>
              <ha-checkbox
                @change=${this._customPopupValueChanged}
                .checked=${this.customPopup}
              ></ha-checkbox>
            </ha-formfield>

            <div class="card-footer">
              <ha-button slot="secondaryAction" @click=${e=>(0,n.fs)()}>
                ${this.hass.localize("ui.common.cancel")}
              </ha-button>
              <ha-button slot="primaryAction" @click=${this._saveButton}>
                ${this.hass.localize("ui.common.submit")}
              </ha-button>
            </div>
        </div>
      `}}d("dwains-edit-entity-card",l)},3003(e,t,i){"use strict";var a=i(7382),r=i(6684),o=i(7969),n=i(9177),s=i(8089);const{websocketReadStore:d}=i(9012),{ConnectedLoadOwner:l}=i(3118),{hassConnectionIdentity:c,hasHassConnectionChanged:h}=i(4776),{defineDwainsElement:p}=i(572);class u extends r.WF{constructor(){super(),this._connectedLoadOwner=new l(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load entity-popup editor data"}),this._configReady=!1}set hass(e){const t=h(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}get hass(){return this._hass}static get styles(){return[r.AH`
        .edit-element {
          padding: 20px;
        }
        h1, h2, h3, h4, h5, h6 {
          font-size: inherit;
        }
        blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
          margin: 0;
        }
        .add-button {
          font-size: 16px;
          border: 2px solid #4591B8;
          padding: 5px;
          margin-bottom: 50px;
          background: #459CEE;
          border-radius: 20px;
          color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        .grid {
          display: grid;
          gap: 2rem;
        }
        @media (min-width: 768px){
          .grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }
        }
        .pre-select {
          padding: 2.5rem;
        }
        .pre-select-option {
          padding: 2.5rem;
          border: 1px solid #4591B8;
          text-align: center;
          cursor: pointer;
        }
        .pre-selected-option:hover {
          border: 2px solid #4591B8;
        }
        .more-page-settings {
          padding: 0.75rem;
          border: 2px solid grey;
        }
        .seperator {
          background-color: var(--secondary-background-color);
          width: 100%;
          height: 3px;
          margin-top: 15px;
          margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
        }
        .bg-gray-50 {
          background-color: var(--secondary-background-color);
        }
        .tracking-wider {
            letter-spacing: .05em;
        }
        .text-sm {
          font-size: .875rem;
          line-height: 1.25rem;
        }
        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .font-medium {
            font-weight: 500;
        }
        .text-xs {
            font-size: .75rem;
            line-height: 1rem;
        }
        .text-left {
            text-align: left;
        }
        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        .card-footer-multiple {
          display: flex;
          justify-content: space-between;
          padding: 8px;
          border-top: 1px solid var(--divider-color);
        }
        `]}static get properties(){return{mode:{},blueprints:{}}}setConfig(e){if(this.hass||(this.hass=(0,a.mo)()),this.mode=e.mode?e.mode:"pre-select",this.entity_id=e.entity_id,e.cardConfig){const t=e.cardConfig;delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.existingCardEdit=!!e.existingCardEdit&&e.existingCardEdit,this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=c(t),a=await d.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&c(this._hass)===i&&(this.blueprints=a)}_loadBlueprints(){return this._connectedLoadOwner.reload()}magicStuff(e){const t=e.detail.config.type;o.SG.includes(t)?this.cardConfig={...e.detail.config,entity:this.entity_id}:this.cardConfig=e.detail.config,this.mode="editor-element",this.requestUpdate()}magicStuffSecond(e){}_sendCard(){const e=JSON.stringify(this.cardConfig);this.hass.callWS({type:"dwains_dashboard/edit_entity_popup",cardData:e,entityId:this.entity_id}).then(e=>{console.log(e),(0,s.fs)()},e=>{console.error("Message failed!",e)})}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_removeCard(){this.hass.callWS({type:"dwains_dashboard/remove_entity_popup",entityId:this.entity_id}).then(e=>{console.log(e),(0,s.fs)()},e=>{console.error("Message failed!",e)})}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this.hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint;this.mode="editor-element",this.name=this.blueprints.blueprints[t].blueprint.name,this.cardConfig={type:"custom:dwains-blueprint-card",blueprint:t,input_entity:this.entity_id,card:this.blueprints.blueprints[t].card}}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this.hass.localize("ui.common.successfully_saved")),d.invalidate(this.hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
        <div>
          ${t?r.qy`
            <ha-icon
              style="color: green;"
              .icon=${"mdi:check-bold"}
            ></ha-icon>`:r.qy`
            <ha-icon
              style="color: red;"
              .icon=${"mdi:close-thick"}
            ></ha-icon>
            `}
          ${e}
          ${t?r.qy`(${(0,n.A)(this.hass,"blueprint.installed")})`:r.qy`(${(0,n.A)(this.hass,"blueprint.not_installed")})`}
        </div>
      `}render(){if(null==this.blueprints||0===this.blueprints.length)return r.qy`Loading...`;if("pre-select"==this.mode)return r.qy`
          <ha-md-list>
            <ha-list-item twoline .mode=${"hui-card-picker"} @click=${this._switchMode}>
              ${(0,n.A)(this.hass,"editor.lovelace_card")}
              <span slot="secondary">
                ${(0,n.A)(this.hass,"editor.create_lovelace_card")}
              </span>
            </ha-list-item>
            <li divider role="separator"></li>
            <ha-list-item hasmeta twoline .mode=${"dwains-dashboard-blueprint-select"} @click=${this._switchMode}>
              ${(0,n.A)(this.hass,"editor.dwains_dashboard_blueprint")}
              <span slot="secondary">
                ${(0,n.A)(this.hass,"editor.use_dwains_dashboard_blueprint")}
              </span>
              <ha-icon-next slot="meta"></ha-icon-next
            ></ha-list-item>
          </ha-md-list>
        `;if("dwains-dashboard-blueprint-select"==this.mode){const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
        <div class="edit-element">

          <div style="margin-bottom: 20px;">
            <ha-button .mode=${"pre-select"} @click=${this._switchMode}>< ${this.hass.localize("ui.common.previous")}</ha-button>
          </div>

          <strong>${(0,n.A)(this.hass,"blueprint.installed_blueprints")}:</strong>
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.title")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"global.version")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.type")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,n.A)(this.hass,"blueprint.used_custom_cards")}</th>
                <th scope="col" class="relative px-6 py-3">
                </th>
              </tr>
            </thead>
            <tbody>
              ${0==Object.values(this.blueprints.blueprints).length?r.qy`
                <tr>
                  <td  class="px-6 py-4" colspan="5">${(0,n.A)(this.hass,"blueprint.no_blueprints_installed")}</td>
                </tr>`:r.qy`
                ${Object.entries(e).map(([e,t])=>r.qy`
                        <tr class="bg-white">
                          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <h3>${t[1].blueprint.name}</h3>
                            ${t[1].blueprint.description}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.version}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.type}
                          </td>
                          <td class="px-6 py-4">
                            ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                                ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                              `:"None"}
                          </td>
                          <td>
                            ${"card"==t[1].blueprint.type||"replace-card"==t[1].blueprint.type?r.qy`
                              <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                ${(0,n.A)(this.hass,"blueprint.use")}
                              </ha-button>
                            `:""}
                            <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                              <ha-icon
                                .icon=${"mdi:delete"}
                              ></ha-icon>
                            </ha-button>
                          </td>
                        </tr>
                      `)}
                `}
            </tbody>
          </table>
          <div class="seperator"></div>
          <strong>${(0,n.A)(this.hass,"blueprint.install")}</strong>
          <p>${(0,n.A)(this.hass,"blueprint.instruction")}</p>
          <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
          <ha-yaml-editor
            label=${(0,n.A)(this.hass,"blueprint.yaml_code")}
            name="description"
            @value-changed=${this._installBlueprintYamlChanged}
          ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
          <div style="margin-top: 15px; margin-bottom: 20px;">
            <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
              ${(0,n.A)(this.hass,"blueprint.install")}
            </ha-button>
          </div>
        </div>`}return"hui-card-picker"==this.mode?r.qy`
          <div class="edit-element">
            <h1 style="font-size: 17px; font-weight: bold;">Select the popup card you want to use for ${this.entity_id}</h1>
            <dwains-card-picker
              @config-changed=${this.magicStuff}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-picker>
            <div class="card-footer">
              <ha-button slot="secondaryAction" @click=${e=>(0,s.fs)()}>
                ${this.hass.localize("ui.common.cancel")}
              </ha-button>
            </div>
          </div>
        `:r.qy`
          <div class="edit-element">
            <dwains-card-config-editor
              @save-config=${this.magicStuffSecond}
              @config-changed=${this.magicStuff}
              .value=${this.cardConfig}
              .hass=${this.hass}
              .lovelace=${{views:[]}}
            ></dwains-card-config-editor>
            <dwains-card-preview
              .hass=${this.hass}
              .config=${this.cardConfig}
            ></dwains-card-preview>
            <div class="card-footer-multiple">
              ${this.existingCardEdit?r.qy`
                  <div>
                    <ha-button class="warning" @click=${this._removeCard}>${this.hass.localize("ui.common.remove")}</ha-button>
                    <ha-button class="warning" @click=${e=>this.mode="hui-card-picker"}}>${this.hass.localize("ui.common.previous")}</ha-button>
                  </div>
                `:r.qy`<div></div>`}
              <div>
                <ha-button slot="secondaryAction" @click=${e=>(0,s.fs)()}>
                  ${this.hass.localize("ui.common.cancel")}
                </ha-button>
                <ha-button slot="primaryAction" @click=${this._sendCard}>
                  ${this.hass.localize("ui.common.submit")}
                </ha-button>
              </div>
            </div>
          </div>
        `}}p("dwains-edit-entity-popup-card",u)},5848(e,t,i){"use strict";var a=i(9774),r=i(6684),o=i(9177),n=i(8089);const{websocketReadStore:s}=i(9012),{ConnectedLoadOwner:d}=i(3118),{hassConnectionIdentity:l,hasHassConnectionChanged:c}=i(4776),{defineDwainsElement:h}=i(572),{refreshLovelaceConfig:p}=i(9978),{dispatchMorePageSaved:u}=i(9661);class m extends r.WF{constructor(){super(),this._connectedLoadOwner=new d(e=>this._loadEditor(e),{reportError:(e,t)=>console.error(e,t),errorMessage:"Failed to load more-page editor data"}),this._configReady=!1,this.blueprints={blueprints:{}},this._blueprintsLoading=!0}static get styles(){return[r.AH`
        .edit-element {
          box-sizing: border-box;
          width: min(100%, 560px);
          max-width: 560px;
          padding: 20px;
          margin-right: auto;
          margin-left: auto;
          overflow: visible;
        }
        .edit-element ha-icon-picker,
        .edit-element ha-textfield,
        .edit-element ha-select,
        .edit-element ha-entity-picker {
          display: block;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          margin: .8rem 0;
        }
        .edit-element ha-formfield {
        display: flex;
        align-items: center;
        gap: .6rem;
        margin: .9rem 0;
        padding-inline-start: .25rem;
        }
        h1, h2, h3, h4, h5, h6 {
        font-size: inherit;
        }
        blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
        margin: 0;
        }
        .add-button {
        font-size: 16px;
        border: 2px solid #4591B8;
        padding: 5px;
        margin-bottom: 50px;
        background: #459CEE;
        border-radius: 20px;
        color: white;
        }
        .card-footer {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: .75rem;
        padding: 8px;
        border-top: 1px solid var(--divider-color);
        }
        .save-error {
          margin: 0.75rem 0;
          padding: 0.75rem;
          border-radius: 4px;
          color: var(--error-color);
          background: color-mix(in srgb, var(--error-color) 10%, transparent);
        }
        .grid {
        display: grid;
        gap: 2rem;
        }
        @media (min-width: 768px){
        .grid-cols-2 {
            grid-template-columns: repeat(2,minmax(0,1fr));
        }
        }
        .pre-select {
        padding: 2.5rem;
        }
        .pre-select-option {
        padding: 2.5rem;
        border: 1px solid #4591B8;
        text-align: center;
        cursor: pointer;
        }
        .pre-selected-option:hover {
        border: 2px solid #4591B8;
        }
        .more-page-settings {
          box-sizing: border-box;
          width: 100%;
          padding: 0.75rem;
          border: 2px solid grey;
          overflow: visible;
        }
        .more-page-name-field {
          box-sizing: border-box;
          width: 100%;
          margin: 0 0 0.9rem;
        }
        .more-page-name-label {
          display: block;
          margin: 0 0 0.25rem;
          color: var(--primary-color);
          font-size: 12px;
          line-height: 1.2;
        }
        .more-page-name-input {
          box-sizing: border-box;
          width: 100%;
          min-height: 56px;
          padding: 18px 12px 6px;
          border: 0;
          border-bottom: 1px solid var(--secondary-text-color);
          border-radius: 4px 4px 0 0;
          outline: none;
          color: var(--primary-text-color);
          background: var(--secondary-background-color);
          font-family: inherit;
          font-size: 16px;
        }
        .more-page-name-input:focus {
          border-bottom-color: var(--primary-color);
          box-shadow: inset 0 -1px 0 var(--primary-color);
        }
        .more-page-settings ha-textfield,
        .more-page-settings ha-icon-picker {
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
        }
        .more-page-settings-title {
          margin: 0 0 0.75rem;
          color: var(--primary-text-color);
          font-size: 0.95rem;
          font-weight: 600;
        }
        .edit-element dwains-card-picker,
        .edit-element dwains-card-config-editor,
        .edit-element dwains-card-preview,
        .edit-element ha-yaml-editor,
        .edit-element ha-code-editor {
          display: block;
          box-sizing: border-box;
          width: 100%;
          max-width: 100%;
          overflow: visible;
        }
        .seperator {
        background-color: var(--secondary-background-color);
        width: 100%;
        height: 3px;
        margin-top: 15px;
        margin-bottom: 15px;
        }
        /*Start blueprint table*/
        /* Blueprint table responsive fix */
        table.min-w-full {
          width: 100%;
          table-layout: fixed;
        }
        table.min-w-full th,
        table.min-w-full td {
          overflow-wrap: anywhere;
          word-break: break-word;
          vertical-align: top;
        }
        table.min-w-full .px-6 {
          padding-left: 0.5rem;
          padding-right: 0.5rem;
        }
        table.min-w-full .whitespace-nowrap {
          white-space: normal;
        }
        table.min-w-full th:last-child,
        table.min-w-full td:last-child {
          width: 6.5rem;
          min-width: 6.5rem;
        }
        table.min-w-full td:last-child ha-button {
          display: block;
          margin: 0.125rem 0;
        }
        @media (max-width: 640px) {
          table.min-w-full .px-6 {
            padding-left: 0.25rem;
            padding-right: 0.25rem;
          }
          table.min-w-full .py-4 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
          }
          table.min-w-full th,
          table.min-w-full td {
            font-size: 0.75rem;
            line-height: 1rem;
          }
          table.min-w-full th:last-child,
          table.min-w-full td:last-child {
            width: 5.75rem;
            min-width: 5.75rem;
          }
        }
        .min-w-full {
          min-width: 100%;
        }
        table {
            text-indent: 0;
            border-color: inherit;
            border-collapse: collapse;
        }
        .bg-gray-50 {
        background-color: var(--secondary-background-color);
        }
        .tracking-wider {
            letter-spacing: .05em;
        }
        .text-sm {
        font-size: .875rem;
        line-height: 1.25rem;
        }
        .py-4 {
            padding-top: 1rem;
            padding-bottom: 1rem;
        }
        .uppercase {
            text-transform: uppercase;
        }
        .font-medium {
            font-weight: 500;
        }
        .text-xs {
            font-size: .75rem;
            line-height: 1rem;
        }
        .text-left {
            text-align: left;
        }
        .px-6 {
            padding-left: 1.5rem;
            padding-right: 1.5rem;
        }
        .py-3 {
            padding-top: 0.75rem;
            padding-bottom: 0.75rem;
        }
        `]}static get properties(){return{mode:{},blueprints:{},_hass:{},_saving:{state:!0},_saveError:{state:!0}}}set hass(e){const t=c(this._hass,e);this._hass=e,t&&(this._connectedLoadOwner.disconnect(),this.isConnected&&this._connectedLoadOwner.connect()),this._startEditorIfReady()}setConfig(e){if(console.log("DwainsEditMorePageCard..."),this.mode=e.mode?e.mode:"pre-select",this.foldername=e.foldername?e.foldername:"",e.cardConfig){const t=structuredClone(e.cardConfig);delete t.input_entity,delete t.input_name,this.cardConfig=t}else this.cardConfig="";this.name=e.name?e.name:"",this._nameTouched=!!this.name,this._nameAutoGenerated=!1,this.icon=e.icon?e.icon:"",this.showInNavbar=!!e.showInNavbar&&e.showInNavbar,this._saving=!1,this._saveError=void 0,this._configReady=!0,this._startEditorIfReady()}connectedCallback(){super.connectedCallback(),this._connectedLoadOwner.connect(),this._startEditorIfReady()}disconnectedCallback(){super.disconnectedCallback(),this._connectedLoadOwner.disconnect()}_startEditorIfReady(){this._configReady&&this._hass&&this._connectedLoadOwner.ready()}async _loadEditor({isCurrent:e}){const t=this._hass,i=l(t),a=await s.read(t,{type:"dwains_dashboard/get_blueprints"});e()&&l(this._hass)===i&&(this.blueprints=a?.blueprints?a:{blueprints:{}},this._blueprintsLoading=!1)}_loadBlueprints(){return this._connectedLoadOwner.reload()}magicStuff(e){this.cardConfig=e.detail.config,this._applyDefaultMorePageName(),this.mode="editor-element",this.requestUpdate()}magicStuffSecond(e){}async _sendCard(){if(this._saving)return;if(this._syncMorePageSettingsFromDom(),this._applyDefaultMorePageName(),!this.name)return void alert((0,o.A)(this._hass,"more.name_required"));if(this.showInNavbar&&!this.icon)return void alert((0,o.A)(this._hass,"more.icon_required"));if(!this.cardConfig||"object"!=typeof this.cardConfig)return void(this._saveError=new Error("No valid Lovelace card is configured."));const e=!this.foldername;this._saving=!0,this._saveError=void 0;try{const t=await this._hass.callWS({type:"dwains_dashboard/edit_more_page",card_data:JSON.stringify(this.cardConfig),foldername:this.foldername,name:this.name,icon:this.icon,showInNavbar:this.showInNavbar});if(!t?.foldername)throw new Error("The backend did not return the saved page name.");this.foldername=t.foldername,s.invalidate(this._hass);const i=t.view_path||`more_page_${t.foldername}`,r=t.page||{foldername:t.foldername,name:this.name,icon:this.icon,show_in_navbar:this.showInNavbar,card:structuredClone(this.cardConfig)};u(window,r),e?(await p({viewPath:i}),(0,n.fs)(),(0,a.navigate)(window,`/dwains-dashboard/${i}`)):(0,n.fs)()}catch(e){this._saveError=e,console.error("Failed to save and refresh more page:",e)}finally{this._saving=!1}}_switchMode(e){const t=e.currentTarget.mode;this.mode=t,this.requestUpdate()}_deriveDefaultMorePageName(e=this.cardConfig){if(!e||"object"!=typeof e)return"";const t=[e.title,e.name,e.heading,e.card&&e.card.title,e.card&&e.card.name].find(e=>"string"==typeof e&&e.trim());return t?t.trim():""}_applyDefaultMorePageName(){if(this._nameTouched&&!this._nameAutoGenerated)return;const e=this._deriveDefaultMorePageName();e&&e!==this.name&&(this.name=e,this._nameAutoGenerated=!0)}_syncMorePageSettingsFromDom(){const e=this.shadowRoot?.querySelector("#more-page-name");e&&(this.name=e.value.trim());const t=this.shadowRoot?.querySelector(".more-page-settings ha-icon-picker");t&&void 0!==t.value&&(this.icon=t.value);const i=this.shadowRoot?.querySelector(".more-page-settings ha-checkbox");i&&(this.showInNavbar=i.checked)}_iconPickerChange(e){this.icon=e.detail.value}_showInMainNavbarValueChanged(e){this.showInNavbar=e.target.checked}_nameChanged(e){this.name=e.target.value,this._nameTouched=!0,this._nameAutoGenerated=!1}async _removeMorePage(){if(!this._saving){this._saving=!0,this._saveError=void 0;try{await this._hass.callWS({type:"dwains_dashboard/remove_more_page",foldername:this.foldername}),s.invalidate(this._hass),await p(),(0,n.fs)(),(0,a.navigate)(window,"/dwains-dashboard/more_page")}catch(e){this._saveError=e,console.error("Failed to remove and refresh more page:",e)}finally{this._saving=!1}}}_handleDeleteBlueprintClicked(e){const t=e.currentTarget.blueprint;this._hass.callWS({type:"dwains_dashboard/delete_blueprint",blueprint:t}).then(e=>{console.log(e),s.invalidate(this._hass),this._loadBlueprints(),this.requestUpdate()},e=>{console.error("Message failed!",e)})}_handleUseBlueprintClicked(e){const t=e.currentTarget.blueprint;this.mode="editor-element",this.name=this.blueprints.blueprints[t].blueprint.name,this.cardConfig={type:"custom:dwains-blueprint-card",blueprint:t,card:this.blueprints.blueprints[t].card}}_installBlueprintYamlChanged(e){this.installBlueprintYaml=e.target.value}_handleInstallBlueprintClicked(e){this.installBlueprintYaml||alert((0,o.A)(this._hass,"blueprint.yaml_required")),this._hass.callWS({type:"dwains_dashboard/install_blueprint",yamlCode:JSON.stringify(this.installBlueprintYaml)}).then(e=>{console.log(e),e.succesfull?(alert(this._hass.localize("ui.common.successfully_saved")),s.invalidate(this._hass),this._loadBlueprints(),this.requestUpdate()):alert(e.error)},e=>{console.error("Message failed!",e)})}_checkCustomCard(e){const t=customElements.get(e);return r.qy`
        <div>
        ${t?r.qy`
            <ha-icon
            style="color: green;"
            .icon=${"mdi:check-bold"}
            ></ha-icon>`:r.qy`
            <ha-icon
            style="color: red;"
            .icon=${"mdi:close-thick"}
            ></ha-icon>
            `}
        ${e}
        ${t?r.qy`(${(0,o.A)(this._hass,"blueprint.installed")})`:r.qy`(${(0,o.A)(this._hass,"blueprint.not_installed")})`}
        </div>
    `}render(){if("pre-select"==this.mode)return r.qy`
        <ha-md-list>
            <ha-list-item twoline .mode=${"hui-card-picker"} @click=${this._switchMode}>
            ${(0,o.A)(this._hass,"editor.lovelace_card")}
            <span slot="secondary">
                ${(0,o.A)(this._hass,"editor.create_lovelace_card")}
            </span>
            </ha-list-item>
            <li divider role="separator"></li>
            <ha-list-item hasmeta twoline .mode=${"dwains-dashboard-blueprint-select"} @click=${this._switchMode}>
            ${(0,o.A)(this._hass,"editor.dwains_dashboard_blueprint")}
            <span slot="secondary">
                ${(0,o.A)(this._hass,"editor.use_dwains_dashboard_blueprint")}
            </span>
            <ha-icon-next slot="meta"></ha-icon-next
            ></ha-list-item>
        </ha-md-list>
        `;if("dwains-dashboard-blueprint-select"==this.mode){if(this._blueprintsLoading)return r.qy`<div class="edit-element"><ha-circular-progress active></ha-circular-progress></div>`;const e=Object.entries(this.blueprints.blueprints).sort(function(e,t){let i=e[1].blueprint.type,a=t[1].blueprint.type;return i==a?0:i>a?1:-1});return r.qy`
        <div class="edit-element">

        <div style="margin-bottom: 20px;">
            <ha-button .mode=${"pre-select"} @click=${this._switchMode}>< ${this._hass.localize("ui.common.previous")}</ha-button>
        </div>

        <strong>${(0,o.A)(this._hass,"blueprint.installed_blueprints")}:</strong>
        <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
            <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this._hass,"blueprint.title")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this._hass,"global.version")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this._hass,"blueprint.type")}</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">${(0,o.A)(this._hass,"blueprint.used_custom_cards")}</th>
                <th scope="col" class="relative px-6 py-3">
                </th>
            </tr>
            </thead>
            <tbody>
            ${0==Object.values(this.blueprints.blueprints).length?r.qy`
                <tr>
                <td  class="px-6 py-4" colspan="5">${(0,o.A)(this._hass,"blueprint.no_blueprints_installed")}</td>
                </tr>`:r.qy`
                ${Object.entries(e).map(([e,t])=>r.qy`
                        <tr class="bg-white">
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            <h3>${t[1].blueprint.name}</h3>
                            ${t[1].blueprint.description}
                        </td>
                        <td class="px-6 py-4">
                            ${t[1].blueprint.version}
                        </td>
                        <td class="px-6 py-4">
                            ${t[1].blueprint.type}
                        </td>
                        <td class="px-6 py-4">
                            ${t[1].blueprint.custom_cards&&0!==t[1].blueprint.custom_cards.length?r.qy`
                                ${t[1].blueprint.custom_cards.map(e=>this._checkCustomCard(e))}
                            `:"None"}
                        </td>
                        <td>
                            ${"page"==t[1].blueprint.type?r.qy`
                            <ha-button .blueprint=${t[0]} @click=${this._handleUseBlueprintClicked} unelevated>
                                ${(0,o.A)(this._hass,"blueprint.use")}
                            </ha-button>
                            `:""}
                            <ha-button .blueprint=${t[0]} @click=${this._handleDeleteBlueprintClicked} unelevated>
                            <ha-icon
                                .icon=${"mdi:delete"}
                            ></ha-icon>
                            </ha-button>
                        </td>
                        </tr>
                    `)}
                `}
            </tbody>
        </table>
        <div class="seperator"></div>
        <strong>${(0,o.A)(this._hass,"blueprint.install")}</strong>
        <p>${(0,o.A)(this._hass,"blueprint.instruction")}</p>
        <a href="https://github.com/dwainscheeren/dwains-dashboard-blueprints" target="_blank">Dwains Dashboard Blueprints Github</a>
        <ha-yaml-editor
            label=${(0,o.A)(this._hass,"blueprint.yaml_code")}
            name="description"
            @value-changed=${this._installBlueprintYamlChanged}
        ><ha-code-editor mode="yaml" autocomplete-entities="" autocomplete-icons="" dir="ltr"></ha-code-editor></ha-yaml-editor>
        <div style="margin-top: 15px; margin-bottom: 20px;">
            <ha-button @click=${this._handleInstallBlueprintClicked} unelevated>
            ${(0,o.A)(this._hass,"blueprint.install")}
            </ha-button>
        </div>
        </div>`}return"hui-card-picker"==this.mode?r.qy`
        <div class="edit-element">
            <h1 style="font-size: 17px; font-weight: bold;"></h1>
            <dwains-card-picker
            @config-changed=${this.magicStuff}
            .hass=${this._hass}
            .lovelace=${{views:[]}}
            ></dwains-card-picker>
        </div>
        `:"editor-element"==this.mode?r.qy`
        <div class="edit-element">
            <div class="more-page-settings-title">${(0,o.A)(this._hass,"more.edit")}</div>
            <div class="more-page-name-field">
            <label class="more-page-name-label" for="more-page-name">${(0,o.A)(this._hass,"more.name")}</label>
            <input
                id="more-page-name"
                class="more-page-name-input"
                type="text"
                .value=${this.name}
                placeholder=${(0,o.A)(this._hass,"more.name")}
                @input=${this._nameChanged}
            />
            </div>
            <div class="more-page-settings">
            <ha-icon-picker
                label=${(0,o.A)(this._hass,"more.icon")}
                .value=${this.icon}
                @value-changed=${this._iconPickerChange}
            ></ha-icon-picker>
            <ha-formfield>
                <ha-checkbox
                @change=${this._showInMainNavbarValueChanged}
                .checked=${this.showInNavbar}
                ></ha-checkbox>
              <span slot="label">${(0,o.A)(this._hass,"more.add_navbar")}</span>
            </ha-formfield>
            </div>

            <dwains-card-config-editor
            @save-config=${this.magicStuffSecond}
            @config-changed=${this.magicStuff}
            .value=${this.cardConfig}
            .hass=${this._hass}
            .lovelace=${{views:[]}}
            ></dwains-card-config-editor>
            <dwains-card-preview
            .hass=${this._hass}
            .config=${this.cardConfig}
            ></dwains-card-preview>
            ${this._saveError?r.qy`<div class="save-error" role="alert">${this._saveError.message||this._saveError}</div>`:""}
            <div class="card-footer">
            ${this.foldername?r.qy`<ha-button @click=${this._removeMorePage}>${this._hass.localize("ui.common.remove")}</ha-button>`:""}
            <ha-button .disabled=${this._saving} @click=${this._sendCard}>
              ${this._saving?r.qy`<ha-circular-progress size="small" active></ha-circular-progress>`:this._hass.localize("ui.common.submit")}
            </ha-button>
            </div>
        </div>
        `:void 0}}h("dwains-edit-more-page-card",m)},8054(e,t,i){"use strict";var a=i(8089),r=i(6684);const{loadCardHelpers:o}=i(3266),{defineDwainsElement:n}=i(572),s=o(),d=async(e,t)=>{const i=await s;if(i)return(0,a.Kq)(i,t);const r=document.createElement(e);try{r.setConfig(t)}catch(i){return console.error(e,i),((e,t)=>d("hui-error-card",{type:"error",error:e,config:t}))(i.message,t)}return r};class l extends r.WF{constructor(){super(),this._renderGeneration=0}static get properties(){return{_config:{},_refCards:{}}}set hass(e){this._hass=e,!this._refCards&&this._config&&this.renderCard(),this._refCards&&this._refCards.forEach(t=>{t.hass=e})}setConfig(e){const t=Array.isArray(e?.cards),i=Array.isArray(e?.entities);if(!t&&!i)throw new Error("Card config incorrect");this._config=e,this._hass&&this.renderCard()}renderCard(){const e=this._config.entities||this._config.cards,t=++this._renderGeneration,i=e.map(e=>this.createCardElement(e));Promise.all(i).then(e=>{t===this._renderGeneration&&(this._refCards=e)}).catch(e=>{console.error("Failed to render dwains-flexbox-card children",e)})}disconnectedCallback(){super.disconnectedCallback(),this._renderGeneration+=1}async createCardElement(e){let t=e.type;t=t.startsWith("divider")?"hui-divider-row":t.startsWith("custom:")?t.slice(7):`hui-${t}-card`;const i=await d(t,e);return e.item_classes?i.className="item "+e.item_classes:this._config.items_classes?i.className="item "+this._config.items_classes:i.className="item",i.hass=this._hass,i.addEventListener("ll-rebuild",e=>{e.stopPropagation(),this.renderCard()},{once:!0}),i}render(){if(!this._config||!this._hass||!this._refCards)return r.qy``;let e;return this._config.padding&&(e="padding"),r.qy`
      <div style="${this._config.css}">
        <div class="wrapper ${e}">
          <div class="row">
            ${this._refCards}
          </div>
        </div>
      </div>
      `}static get styles(){return[r.AH`
          /* I used flexbox grid (http://flexboxgrid.com/) for now, not sure if it's good for all browsers */
          .container,
          .container-fluid {
            margin-right: auto;
            margin-left: auto;
          }
          .container-fluid {
            padding-right: 2rem;
            padding-left: 2rem;
          }
          .row {
            box-sizing: border-box;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-flex: 0;
            -ms-flex: 0 1 auto;
            flex: 0 1 auto;
            -webkit-box-orient: horizontal;
            -webkit-box-direction: normal;
            -ms-flex-direction: row;
            flex-direction: row;
            -ms-flex-wrap: wrap;
            flex-wrap: wrap;
            margin-right: -0.25rem;
            margin-left: -0.25rem;
          }
          .row.reverse {
            -webkit-box-orient: horizontal;
            -webkit-box-direction: reverse;
            -ms-flex-direction: row-reverse;
            flex-direction: row-reverse;
          }
          .col.reverse {
            -webkit-box-orient: vertical;
            -webkit-box-direction: reverse;
            -ms-flex-direction: column-reverse;
            flex-direction: column-reverse;
          }
          .col-xs,
          .col-xs-1,
          .col-xs-10,
          .col-xs-11,
          .col-xs-12,
          .col-xs-2,
          .col-xs-3,
          .col-xs-4,
          .col-xs-5,
          .col-xs-6,
          .col-xs-7,
          .col-xs-8,
          .col-xs-9,
          .col-xs-offset-0,
          .col-xs-offset-1,
          .col-xs-offset-10,
          .col-xs-offset-11,
          .col-xs-offset-12,
          .col-xs-offset-2,
          .col-xs-offset-3,
          .col-xs-offset-4,
          .col-xs-offset-5,
          .col-xs-offset-6,
          .col-xs-offset-7,
          .col-xs-offset-8,
          .col-xs-offset-9 {
            box-sizing: border-box;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 auto;
            flex: 0 0 auto;
            padding-right: 0.25rem;
            padding-left: 0.25rem;
          }
          .col-xs {
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -ms-flex-preferred-size: 0;
            flex-basis: 0;
            max-width: 100%;
          }
          .col-xs-1 {
            -ms-flex-preferred-size: 8.33333333%;
            flex-basis: 8.33333333%;
            max-width: 8.33333333%;
          }
          .col-xs-2 {
            -ms-flex-preferred-size: 16.66666667%;
            flex-basis: 16.66666667%;
            max-width: 16.66666667%;
          }
          .col-xs-3 {
            -ms-flex-preferred-size: 25%;
            flex-basis: 25%;
            max-width: 25%;
          }
          .col-xs-4 {
            -ms-flex-preferred-size: 33.33333333%;
            flex-basis: 33.33333333%;
            max-width: 33.33333333%;
          }
          .col-xs-5 {
            -ms-flex-preferred-size: 41.66666667%;
            flex-basis: 41.66666667%;
            max-width: 41.66666667%;
          }
          .col-xs-6 {
            -ms-flex-preferred-size: 50%;
            flex-basis: 50%;
            max-width: 50%;
          }
          .col-xs-7 {
            -ms-flex-preferred-size: 58.33333333%;
            flex-basis: 58.33333333%;
            max-width: 58.33333333%;
          }
          .col-xs-8 {
            -ms-flex-preferred-size: 66.66666667%;
            flex-basis: 66.66666667%;
            max-width: 66.66666667%;
          }
          .col-xs-9 {
            -ms-flex-preferred-size: 75%;
            flex-basis: 75%;
            max-width: 75%;
          }
          .col-xs-10 {
            -ms-flex-preferred-size: 83.33333333%;
            flex-basis: 83.33333333%;
            max-width: 83.33333333%;
          }
          .col-xs-11 {
            -ms-flex-preferred-size: 91.66666667%;
            flex-basis: 91.66666667%;
            max-width: 91.66666667%;
          }
          .col-xs-12 {
            -ms-flex-preferred-size: 100%;
            flex-basis: 100%;
            max-width: 100%;
          }
          .col-xs-offset-0 {
            margin-left: 0;
          }
          .col-xs-offset-1 {
            margin-left: 8.33333333%;
          }
          .col-xs-offset-2 {
            margin-left: 16.66666667%;
          }
          .col-xs-offset-3 {
            margin-left: 25%;
          }
          .col-xs-offset-4 {
            margin-left: 33.33333333%;
          }
          .col-xs-offset-5 {
            margin-left: 41.66666667%;
          }
          .col-xs-offset-6 {
            margin-left: 50%;
          }
          .col-xs-offset-7 {
            margin-left: 58.33333333%;
          }
          .col-xs-offset-8 {
            margin-left: 66.66666667%;
          }
          .col-xs-offset-9 {
            margin-left: 75%;
          }
          .col-xs-offset-10 {
            margin-left: 83.33333333%;
          }
          .col-xs-offset-11 {
            margin-left: 91.66666667%;
          }
          .start-xs {
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
            text-align: start;
          }
          .center-xs {
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            text-align: center;
          }
          .end-xs {
            -webkit-box-pack: end;
            -ms-flex-pack: end;
            justify-content: flex-end;
            text-align: end;
          }
          .top-xs {
            -webkit-box-align: start;
            -ms-flex-align: start;
            align-items: flex-start;
          }
          .middle-xs {
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
          }
          .bottom-xs {
            -webkit-box-align: end;
            -ms-flex-align: end;
            align-items: flex-end;
          }
          .around-xs {
            -ms-flex-pack: distribute;
            justify-content: space-around;
          }
          .between-xs {
            -webkit-box-pack: justify;
            -ms-flex-pack: justify;
            justify-content: space-between;
          }
          .first-xs {
            -webkit-box-ordinal-group: 0;
            -ms-flex-order: -1;
            order: -1;
          }
          .last-xs {
            -webkit-box-ordinal-group: 2;
            -ms-flex-order: 1;
            order: 1;
          }
          @media only screen and (min-width: 48em) {
            .container {
              width: 49rem;
            }
            .col-sm,
            .col-sm-1,
            .col-sm-10,
            .col-sm-11,
            .col-sm-12,
            .col-sm-2,
            .col-sm-3,
            .col-sm-4,
            .col-sm-5,
            .col-sm-6,
            .col-sm-7,
            .col-sm-8,
            .col-sm-9,
            .col-sm-offset-0,
            .col-sm-offset-1,
            .col-sm-offset-10,
            .col-sm-offset-11,
            .col-sm-offset-12,
            .col-sm-offset-2,
            .col-sm-offset-3,
            .col-sm-offset-4,
            .col-sm-offset-5,
            .col-sm-offset-6,
            .col-sm-offset-7,
            .col-sm-offset-8,
            .col-sm-offset-9 {
              box-sizing: border-box;
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              padding-right: 0.25rem;
              padding-left: 0.25rem;
            }
            .col-sm {
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              max-width: 100%;
            }
            .col-sm-1 {
              -ms-flex-preferred-size: 8.33333333%;
              flex-basis: 8.33333333%;
              max-width: 8.33333333%;
            }
            .col-sm-2 {
              -ms-flex-preferred-size: 16.66666667%;
              flex-basis: 16.66666667%;
              max-width: 16.66666667%;
            }
            .col-sm-3 {
              -ms-flex-preferred-size: 25%;
              flex-basis: 25%;
              max-width: 25%;
            }
            .col-sm-4 {
              -ms-flex-preferred-size: 33.33333333%;
              flex-basis: 33.33333333%;
              max-width: 33.33333333%;
            }
            .col-sm-5 {
              -ms-flex-preferred-size: 41.66666667%;
              flex-basis: 41.66666667%;
              max-width: 41.66666667%;
            }
            .col-sm-6 {
              -ms-flex-preferred-size: 50%;
              flex-basis: 50%;
              max-width: 50%;
            }
            .col-sm-7 {
              -ms-flex-preferred-size: 58.33333333%;
              flex-basis: 58.33333333%;
              max-width: 58.33333333%;
            }
            .col-sm-8 {
              -ms-flex-preferred-size: 66.66666667%;
              flex-basis: 66.66666667%;
              max-width: 66.66666667%;
            }
            .col-sm-9 {
              -ms-flex-preferred-size: 75%;
              flex-basis: 75%;
              max-width: 75%;
            }
            .col-sm-10 {
              -ms-flex-preferred-size: 83.33333333%;
              flex-basis: 83.33333333%;
              max-width: 83.33333333%;
            }
            .col-sm-11 {
              -ms-flex-preferred-size: 91.66666667%;
              flex-basis: 91.66666667%;
              max-width: 91.66666667%;
            }
            .col-sm-12 {
              -ms-flex-preferred-size: 100%;
              flex-basis: 100%;
              max-width: 100%;
            }
            .col-sm-offset-0 {
              margin-left: 0;
            }
            .col-sm-offset-1 {
              margin-left: 8.33333333%;
            }
            .col-sm-offset-2 {
              margin-left: 16.66666667%;
            }
            .col-sm-offset-3 {
              margin-left: 25%;
            }
            .col-sm-offset-4 {
              margin-left: 33.33333333%;
            }
            .col-sm-offset-5 {
              margin-left: 41.66666667%;
            }
            .col-sm-offset-6 {
              margin-left: 50%;
            }
            .col-sm-offset-7 {
              margin-left: 58.33333333%;
            }
            .col-sm-offset-8 {
              margin-left: 66.66666667%;
            }
            .col-sm-offset-9 {
              margin-left: 75%;
            }
            .col-sm-offset-10 {
              margin-left: 83.33333333%;
            }
            .col-sm-offset-11 {
              margin-left: 91.66666667%;
            }
            .start-sm {
              -webkit-box-pack: start;
              -ms-flex-pack: start;
              justify-content: flex-start;
              text-align: start;
            }
            .center-sm {
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              text-align: center;
            }
            .end-sm {
              -webkit-box-pack: end;
              -ms-flex-pack: end;
              justify-content: flex-end;
              text-align: end;
            }
            .top-sm {
              -webkit-box-align: start;
              -ms-flex-align: start;
              align-items: flex-start;
            }
            .middle-sm {
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
            }
            .bottom-sm {
              -webkit-box-align: end;
              -ms-flex-align: end;
              align-items: flex-end;
            }
            .around-sm {
              -ms-flex-pack: distribute;
              justify-content: space-around;
            }
            .between-sm {
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
            }
            .first-sm {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .last-sm {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
          }
          @media only screen and (min-width: 64em) {
            .container {
              width: 65rem;
            }
            .col-md,
            .col-md-1,
            .col-md-10,
            .col-md-11,
            .col-md-12,
            .col-md-2,
            .col-md-3,
            .col-md-4,
            .col-md-5,
            .col-md-6,
            .col-md-7,
            .col-md-8,
            .col-md-9,
            .col-md-offset-0,
            .col-md-offset-1,
            .col-md-offset-10,
            .col-md-offset-11,
            .col-md-offset-12,
            .col-md-offset-2,
            .col-md-offset-3,
            .col-md-offset-4,
            .col-md-offset-5,
            .col-md-offset-6,
            .col-md-offset-7,
            .col-md-offset-8,
            .col-md-offset-9 {
              box-sizing: border-box;
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              padding-right: 0.25rem;
              padding-left: 0.25rem;
            }
            .col-md {
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              max-width: 100%;
            }
            .col-md-1 {
              -ms-flex-preferred-size: 8.33333333%;
              flex-basis: 8.33333333%;
              max-width: 8.33333333%;
            }
            .col-md-2 {
              -ms-flex-preferred-size: 16.66666667%;
              flex-basis: 16.66666667%;
              max-width: 16.66666667%;
            }
            .col-md-3 {
              -ms-flex-preferred-size: 25%;
              flex-basis: 25%;
              max-width: 25%;
            }
            .col-md-4 {
              -ms-flex-preferred-size: 33.33333333%;
              flex-basis: 33.33333333%;
              max-width: 33.33333333%;
            }
            .col-md-5 {
              -ms-flex-preferred-size: 41.66666667%;
              flex-basis: 41.66666667%;
              max-width: 41.66666667%;
            }
            .col-md-6 {
              -ms-flex-preferred-size: 50%;
              flex-basis: 50%;
              max-width: 50%;
            }
            .col-md-7 {
              -ms-flex-preferred-size: 58.33333333%;
              flex-basis: 58.33333333%;
              max-width: 58.33333333%;
            }
            .col-md-8 {
              -ms-flex-preferred-size: 66.66666667%;
              flex-basis: 66.66666667%;
              max-width: 66.66666667%;
            }
            .col-md-9 {
              -ms-flex-preferred-size: 75%;
              flex-basis: 75%;
              max-width: 75%;
            }
            .col-md-10 {
              -ms-flex-preferred-size: 83.33333333%;
              flex-basis: 83.33333333%;
              max-width: 83.33333333%;
            }
            .col-md-11 {
              -ms-flex-preferred-size: 91.66666667%;
              flex-basis: 91.66666667%;
              max-width: 91.66666667%;
            }
            .col-md-12 {
              -ms-flex-preferred-size: 100%;
              flex-basis: 100%;
              max-width: 100%;
            }
            .col-md-offset-0 {
              margin-left: 0;
            }
            .col-md-offset-1 {
              margin-left: 8.33333333%;
            }
            .col-md-offset-2 {
              margin-left: 16.66666667%;
            }
            .col-md-offset-3 {
              margin-left: 25%;
            }
            .col-md-offset-4 {
              margin-left: 33.33333333%;
            }
            .col-md-offset-5 {
              margin-left: 41.66666667%;
            }
            .col-md-offset-6 {
              margin-left: 50%;
            }
            .col-md-offset-7 {
              margin-left: 58.33333333%;
            }
            .col-md-offset-8 {
              margin-left: 66.66666667%;
            }
            .col-md-offset-9 {
              margin-left: 75%;
            }
            .col-md-offset-10 {
              margin-left: 83.33333333%;
            }
            .col-md-offset-11 {
              margin-left: 91.66666667%;
            }
            .start-md {
              -webkit-box-pack: start;
              -ms-flex-pack: start;
              justify-content: flex-start;
              text-align: start;
            }
            .center-md {
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              text-align: center;
            }
            .end-md {
              -webkit-box-pack: end;
              -ms-flex-pack: end;
              justify-content: flex-end;
              text-align: end;
            }
            .top-md {
              -webkit-box-align: start;
              -ms-flex-align: start;
              align-items: flex-start;
            }
            .middle-md {
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
            }
            .bottom-md {
              -webkit-box-align: end;
              -ms-flex-align: end;
              align-items: flex-end;
            }
            .around-md {
              -ms-flex-pack: distribute;
              justify-content: space-around;
            }
            .between-md {
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
            }
            .first-md {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .last-md {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
          }
          @media only screen and (min-width: 75em) {
            .container {
              width: 76rem;
            }
            .col-lg,
            .col-lg-1,
            .col-lg-10,
            .col-lg-11,
            .col-lg-12,
            .col-lg-2,
            .col-lg-3,
            .col-lg-4,
            .col-lg-5,
            .col-lg-6,
            .col-lg-7,
            .col-lg-8,
            .col-lg-9,
            .col-lg-offset-0,
            .col-lg-offset-1,
            .col-lg-offset-10,
            .col-lg-offset-11,
            .col-lg-offset-12,
            .col-lg-offset-2,
            .col-lg-offset-3,
            .col-lg-offset-4,
            .col-lg-offset-5,
            .col-lg-offset-6,
            .col-lg-offset-7,
            .col-lg-offset-8,
            .col-lg-offset-9 {
              box-sizing: border-box;
              -webkit-box-flex: 0;
              -ms-flex: 0 0 auto;
              flex: 0 0 auto;
              padding-right: 0.25rem;
              padding-left: 0.25rem;
            }
            .col-lg {
              -webkit-box-flex: 1;
              -ms-flex-positive: 1;
              flex-grow: 1;
              -ms-flex-preferred-size: 0;
              flex-basis: 0;
              max-width: 100%;
            }
            .col-lg-1 {
              -ms-flex-preferred-size: 8.33333333%;
              flex-basis: 8.33333333%;
              max-width: 8.33333333%;
            }
            .col-lg-2 {
              -ms-flex-preferred-size: 16.66666667%;
              flex-basis: 16.66666667%;
              max-width: 16.66666667%;
            }
            .col-lg-3 {
              -ms-flex-preferred-size: 25%;
              flex-basis: 25%;
              max-width: 25%;
            }
            .col-lg-4 {
              -ms-flex-preferred-size: 33.33333333%;
              flex-basis: 33.33333333%;
              max-width: 33.33333333%;
            }
            .col-lg-5 {
              -ms-flex-preferred-size: 41.66666667%;
              flex-basis: 41.66666667%;
              max-width: 41.66666667%;
            }
            .col-lg-6 {
              -ms-flex-preferred-size: 50%;
              flex-basis: 50%;
              max-width: 50%;
            }
            .col-lg-7 {
              -ms-flex-preferred-size: 58.33333333%;
              flex-basis: 58.33333333%;
              max-width: 58.33333333%;
            }
            .col-lg-8 {
              -ms-flex-preferred-size: 66.66666667%;
              flex-basis: 66.66666667%;
              max-width: 66.66666667%;
            }
            .col-lg-9 {
              -ms-flex-preferred-size: 75%;
              flex-basis: 75%;
              max-width: 75%;
            }
            .col-lg-10 {
              -ms-flex-preferred-size: 83.33333333%;
              flex-basis: 83.33333333%;
              max-width: 83.33333333%;
            }
            .col-lg-11 {
              -ms-flex-preferred-size: 91.66666667%;
              flex-basis: 91.66666667%;
              max-width: 91.66666667%;
            }
            .col-lg-12 {
              -ms-flex-preferred-size: 100%;
              flex-basis: 100%;
              max-width: 100%;
            }
            .col-lg-offset-0 {
              margin-left: 0;
            }
            .col-lg-offset-1 {
              margin-left: 8.33333333%;
            }
            .col-lg-offset-2 {
              margin-left: 16.66666667%;
            }
            .col-lg-offset-3 {
              margin-left: 25%;
            }
            .col-lg-offset-4 {
              margin-left: 33.33333333%;
            }
            .col-lg-offset-5 {
              margin-left: 41.66666667%;
            }
            .col-lg-offset-6 {
              margin-left: 50%;
            }
            .col-lg-offset-7 {
              margin-left: 58.33333333%;
            }
            .col-lg-offset-8 {
              margin-left: 66.66666667%;
            }
            .col-lg-offset-9 {
              margin-left: 75%;
            }
            .col-lg-offset-10 {
              margin-left: 83.33333333%;
            }
            .col-lg-offset-11 {
              margin-left: 91.66666667%;
            }
            .start-lg {
              -webkit-box-pack: start;
              -ms-flex-pack: start;
              justify-content: flex-start;
              text-align: start;
            }
            .center-lg {
              -webkit-box-pack: center;
              -ms-flex-pack: center;
              justify-content: center;
              text-align: center;
            }
            .end-lg {
              -webkit-box-pack: end;
              -ms-flex-pack: end;
              justify-content: flex-end;
              text-align: end;
            }
            .top-lg {
              -webkit-box-align: start;
              -ms-flex-align: start;
              align-items: flex-start;
            }
            .middle-lg {
              -webkit-box-align: center;
              -ms-flex-align: center;
              align-items: center;
            }
            .bottom-lg {
              -webkit-box-align: end;
              -ms-flex-align: end;
              align-items: flex-end;
            }
            .around-lg {
              -ms-flex-pack: distribute;
              justify-content: space-around;
            }
            .between-lg {
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
            }
            .first-lg {
              -webkit-box-ordinal-group: 0;
              -ms-flex-order: -1;
              order: -1;
            }
            .last-lg {
              -webkit-box-ordinal-group: 2;
              -ms-flex-order: 1;
              order: 1;
            }
          }

          .item {
            margin-bottom: 0.5rem;
          }

          .wrapper {
            overflow: hidden;
            padding: 0px;
          }
          .wrapper.padding {
            padding: 11px;
          }
          .row {
            overflow: hidden;
            width: auto;
          }

          .d-none {
            display: none !important;
          }
          .d-inline {
            display: inline !important;
          }
          .d-inline-block {
            display: inline-block !important;
          }
          .d-block {
            display: block !important;
          }
          .d-table {
            display: table !important;
          }
          .d-table-row {
            display: table-row !important;
          }
          .d-table-cell {
            display: table-cell !important;
          }
          .d-flex {
            display: -webkit-box !important;
            display: -ms-flexbox !important;
            display: flex !important;
          }
          .d-inline-flex {
            display: -webkit-inline-box !important;
            display: -ms-inline-flexbox !important;
            display: inline-flex !important;
          }

          @media (min-width: 576px) {
            .d-sm-none {
              display: none !important;
            }
            .d-sm-inline {
              display: inline !important;
            }
            .d-sm-inline-block {
              display: inline-block !important;
            }
            .d-sm-block {
              display: block !important;
            }
            .d-sm-table {
              display: table !important;
            }
            .d-sm-table-row {
              display: table-row !important;
            }
            .d-sm-table-cell {
              display: table-cell !important;
            }
            .d-sm-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-sm-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 768px) {
            .d-md-none {
              display: none !important;
            }
            .d-md-inline {
              display: inline !important;
            }
            .d-md-inline-block {
              display: inline-block !important;
            }
            .d-md-block {
              display: block !important;
            }
            .d-md-table {
              display: table !important;
            }
            .d-md-table-row {
              display: table-row !important;
            }
            .d-md-table-cell {
              display: table-cell !important;
            }
            .d-md-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-md-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 992px) {
            .d-lg-none {
              display: none !important;
            }
            .d-lg-inline {
              display: inline !important;
            }
            .d-lg-inline-block {
              display: inline-block !important;
            }
            .d-lg-block {
              display: block !important;
            }
            .d-lg-table {
              display: table !important;
            }
            .d-lg-table-row {
              display: table-row !important;
            }
            .d-lg-table-cell {
              display: table-cell !important;
            }
            .d-lg-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-lg-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }

          @media (min-width: 1200px) {
            .d-xl-none {
              display: none !important;
            }
            .d-xl-inline {
              display: inline !important;
            }
            .d-xl-inline-block {
              display: inline-block !important;
            }
            .d-xl-block {
              display: block !important;
            }
            .d-xl-table {
              display: table !important;
            }
            .d-xl-table-row {
              display: table-row !important;
            }
            .d-xl-table-cell {
              display: table-cell !important;
            }
            .d-xl-flex {
              display: -webkit-box !important;
              display: -ms-flexbox !important;
              display: flex !important;
            }
            .d-xl-inline-flex {
              display: -webkit-inline-box !important;
              display: -ms-inline-flexbox !important;
              display: inline-flex !important;
            }
          }
        `]}}customElements.get("dwains-flexbox-card")||n("dwains-flexbox-card",l)},1100(e,t,i){"use strict";var a=i(6684);const{defineDwainsElement:r}=i(572);class o extends a.WF{static get properties(){return{_config:{}}}static styles=a.AH`
    ha-card {
      box-shadow: none;
      background: none;
      padding: 0 16px 0 0;
      font-weight: bold;
      font-size: 14px;
    }
  `;setConfig(e){if(!e||!e.title)throw new Error("Title configuration required");this._config={...e}}render(){return a.qy`
      <ha-card>
        ${this._config.title}
      </ha-card>
    `}getCardSize(){return 1}}customElements.get("dwains-heading-card")||r("dwains-heading-card",o)},9506(e,t,i){"use strict";var a=i(6205),r=i(7377),o=i(9165),n=i(6684),s=i(8987),d=i(7969),l=i(9774),c=i(8331),h=i(9177),p=i(8089),u=i(3601);const{EventSubscriptionOwner:m}=i(7450),{averageEntityStates:g,countActiveEntities:_,groupEntityStatesByDomain:f,isEntityHiddenInArea:b,localizedClimateState:v}=i(2546),{TimerOwner:y}=i(6687),{PopupOpenScheduler:w}=i(4615),{ReloadableLoadOwner:x}=i(1786),{hassConnectionIdentity:k,hasHassConnectionChanged:$}=i(4776),{websocketReadStore:C}=i(9012),{loadDashboardRegistrySnapshot:E}=i(8355),{resolveHass:A}=i(4525),{loadCardHelpers:S}=i(3266),{closeParentDropdown:D}=i(8276),{defineDwainsElement:z}=i(572),{attachDeferredCard:T}=i(1656),{createHomepageCardElement:M,propagateHomepageHass:q}=i(7584),{areaBinarySensorDeviceClasses:O,areaBinarySensorEntities:P,areaSensorDeviceClasses:B,groupingMode:I,readBooleanCookie:j,resolveGroupingPreference:R}=i(8705),{collectAreaBinarySensorValues:L,entityBelongsToArea:H,summaryTranslationKey:N}=i(8455);class V extends n.WF{static get properties(){return{data:{},favorites:{},favoriteEditMode:{},selectedArea:{},areaEditMode:{},areaViewEditMode:{},areaViewDisplayGrouped:{},areaDisplayGrouped:{}}}constructor(){super(),this._subscriptions=new m,this._timers=new y,this._popupOpens=new w(this._timers),this._loads=new x(e=>this._loadConfiguration(e)),this._startedHass=void 0}async loadHelpers(){return S()}_entityDisplayName(e,t){const i=t||this.entitiesById?.get(e),a=i?.device_id?this.devicesById?.get(i.device_id):void 0;return(0,p.Hg)(this._hass,this.configuration,e,i,a)}set hass(e){const t=$(this._hass,e);this._hass=e,q(this,e),this.startedUp&&this._update_hass(e),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect()),this._startIfReady(t)}_update_hass(e){if(this._hass=e,q(this,e),null==this.data||0===this.data.length)return;if(this.data.forEach(t=>{t.area.area_id==this.selectedArea&&(t.cards.forEach(t=>{t.card&&(t.card.hass=e)}),t.customCardsTop.forEach(t=>{t.card&&(t.card.hass=e)}),t.customCardsBottom.forEach(t=>{t.card&&(t.card.hass=e)}))}),0!=this.favorites.length&&this.favorites.forEach(t=>{t.card&&(t.card.hass=e)}),this.badgesCard&&(this.badgesCard.hass=e),this.timeout)return void(this._pendingHassUpdate=!0);this.timeout=!0,this._pendingHassUpdate=!1;const t=this.areaEditMode||this.favoriteEditMode||this.areaViewEditMode?1e3:100;void 0===this._timers.schedule("hass-update-throttle",()=>{this.timeout=!1,this._pendingHassUpdate&&(this._pendingHassUpdate=!1,this.requestUpdate())},t)&&(this.timeout=!1,this._pendingHassUpdate=!1),this.requestUpdate()}async setConfig(e){this.startedUp=!1,this.timeout=!1,this._pendingHassUpdate=!1,this._hass||(this._hass=A()),this.selectedArea=window.location.hash.substring(1),this.areaEditMode=!1,this.favoriteEditMode=!1,this.areaViewEditMode=!1,this.areaViewDisplayGrouped=this._areaViewDisplayGroupedFromClient(),this.areaDisplayGrouped=this._areaDisplayGroupedFromClient(),this._config=e,this._cardHelpersReady=this.loadHelpers(),this.cardHelpers=await this._cardHelpersReady,await this._startIfReady()}_areaViewDisplayGroupedFromClient(){return j(s.A,"dwains_dashboard_areaViewDisplayGrouped")}_areaViewGroupingMode(){return I(this.configuration,"area_view_grouping_mode")}_areaViewDisplayGroupedFromPreference(){return R(this.configuration,"area_view_grouping_mode",this._areaViewDisplayGroupedFromClient())}_applyAreaViewGroupingPreference(){this.areaViewDisplayGrouped=this._areaViewDisplayGroupedFromPreference()}_areaDisplayGroupedFromClient(){return j(s.A,"dwains_dashboard_areaDisplayGrouped")}_areaFloorGroupingMode(){return I(this.configuration,"area_floor_grouping_mode")}_areaDisplayGroupedFromPreference(){return R(this.configuration,"area_floor_grouping_mode",this._areaDisplayGroupedFromClient())}_applyAreaDisplayGroupingPreference(){this.areaDisplayGrouped=this._areaDisplayGroupedFromPreference()}async connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._timers.connect(),await this._startIfReady()}async _startIfReady(e=!1){const t=k(this._hass);if(this.isConnected&&this._hass&&this._config&&this._startedHass!==t){this._hass,this._startedHass=t;try{this._cardHelpersReady&&(this.cardHelpers=await this._cardHelpersReady),e?await this._reloadCard():await this._loadData(),this.isConnected&&k(this._hass)===t&&this._startedHass===t&&(await this._subscribeReload(),this._scheduleIconRepoke())}catch(e){this._startedHass===t&&(this._startedHass=void 0),console.error("Error starting homepage card:",e)}}}disconnectedCallback(){super.disconnectedCallback(),this._subscriptions.disconnect(),this._timers.disconnect(),this._startedHass=void 0,this._loads.invalidate(),this.timeout=!1,this._pendingHassUpdate=!1,this.__iconRepokeScheduled=!1,this.__masonryRO&&(this.__masonryRO.disconnect(),this.__masonryRO=void 0),this.__masonryRaf&&(cancelAnimationFrame(this.__masonryRaf),this.__masonryRaf=0)}_subscribeReload(){return this._subscriptions.subscribeEvent("homepage",this._hass,"dwains_dashboard_homepage_card_reload",()=>{C.invalidate(this._hass),this._reloadCard().catch(e=>{console.error("Error reloading homepage card:",e)})})}updated(){this._scheduleIconRepoke(),this._layoutMasonry()}_repokeIcons(){try{if(!this.shadowRoot)return;this.shadowRoot.querySelectorAll(".area-button ha-icon").forEach(e=>{const t=e.icon;if(!t||t.indexOf(":")<1)return;const i=e.shadowRoot,a=i&&i.querySelector("ha-svg-icon");if(a&&a.path)return;const r=i&&i.querySelector("svg path");r&&(r.getAttribute("d")||"").length||(e.icon="",e.icon=t)})}catch(e){console.error("Failed to repoke homepage icons",e)}}_scheduleIconRepoke(){if(this.__iconRepokeScheduled)return;this.__iconRepokeScheduled=!0;const e=[60,300,900,2e3,4e3,8e3,12e3];e.map((t,i)=>this._timers.schedule(`icon-repoke-${i}`,()=>{i===e.length-1&&(this.__iconRepokeScheduled=!1),this._repokeIcons()},t)).every(e=>void 0===e)&&(this.__iconRepokeScheduled=!1)}_layoutMasonry(){try{if(!this.shadowRoot)return;const e=this.shadowRoot.querySelectorAll(this.areaViewEditMode?".dd-masonry, .area-view-entity-sortable":".dd-masonry");if(!e.length)return;!this.__masonryRO&&"ResizeObserver"in window&&(this.__masonryRO=new ResizeObserver(()=>{this.__masonryRaf||(this.__masonryRaf=requestAnimationFrame(()=>{this.__masonryRaf=0,this._applyMasonrySpans()}))})),e.forEach(e=>{Array.from(e.children).forEach(e=>{try{this.__masonryRO&&this.__masonryRO.observe(e)}catch(e){console.error("Failed to observe a homepage masonry item",e)}})}),this._applyMasonrySpans()}catch(e){console.error("Failed to update homepage masonry observers",e)}}_currentMasonryRowSpan(e){const t=window.innerWidth||0,i=Array.from(e.classList||[]);let a;a=t>=1536?i.find(e=>e.startsWith("xl-row-span-")):t>=1024?i.find(e=>e.startsWith("lg-row-span-")):i.find(e=>e.startsWith("row-span-"));const r=a?Number(a.split("-").pop()):1;return Number.isFinite(r)&&r>0?r:1}_applyMasonrySpans(){try{if(!this.shadowRoot)return;const e=this.areaViewEditMode||this.favoriteEditMode;this.shadowRoot.querySelectorAll(e?".dd-masonry, .area-view-entity-sortable":".dd-masonry").forEach(t=>{e?(t.style.gridAutoRows="auto",t.style.alignItems="stretch",t.style.rowGap="1rem",Array.from(t.children).forEach(e=>e.style.gridRowEnd="")):(t.style.gridAutoRows="",t.style.alignItems="",t.style.rowGap="",Array.from(t.children).forEach(e=>{if(this._currentMasonryRowSpan(e)>1)return void(e.style.gridRowEnd="");const t=e.getBoundingClientRect().height;t>0&&(e.style.gridRowEnd="span "+(Math.ceil(t)+16))}))})}catch(e){console.error("Failed to apply homepage masonry spans",e)}}async _reloadCard(){await this._loads.reload(),this.requestUpdate()}_loadData(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){this.startedUp=!1;const t=await E(this._hass,{includeFloors:!0});if(!e())return;Object.assign(this,t),this._applyAreaViewGroupingPreference(),this._applyAreaDisplayGroupingPreference();const i=[],a=[];if(null==this.areas||0===this.areas.length||null==this.devices||0===this.devices.length||null==this.entities||0===this.entities.length||null==this.configuration||0===this.configuration.length);else{const[t,r]=await Promise.all([this.createCardElement2({type:"custom:dwains-notification-card",hass:this._hass}),this.createCardElement2({type:"custom:dwains-house-information-card",hass:this._hass})]);if(!e())return;if(this.notificationCard=t,this.badgesCard=r,this.configuration.entities){const e=[];await Promise.all(Object.entries(this.configuration.entities).map(async([t,i])=>{if(i.favorite){const i=(0,l.computeDomain)(t),a=!!this.configuration.entities[t]&&!!this.configuration.entities[t].hidden,r=!!this.configuration.entities[t]&&!!this.configuration.entities[t].excluded,o=this.configuration.entities[t]?this.configuration.entities[t].friendly_name:"",n=this._entityDisplayName(t),s=!(!this.configuration.entities[t]||!this.configuration.entities[t].custom_card)&&this.configuration.entities[t].custom_card,d=!(!this.configuration.entities[t]||!this.configuration.entities[t].custom_popup)&&this.configuration.entities[t].custom_popup,c=!(!this.configuration.entities[t]||!this.configuration.entities[t].favorite)&&this.configuration.entities[t].favorite;let h={},p="1",u="1",m="1",g="1",_="1",f="1";if(s&&this.configuration.entity_cards&&this.configuration.entity_cards[t])h={input_name:n,input_entity:t,...this.configuration.entity_cards[t]};else if(this.configuration.devices_card[i])h={input_name:n,input_entity:t,...this.configuration.devices_card[i]};else if("sensor"===i&&this._hass&&this._hass.states[t].attributes.unit_of_measurement&&!this.configuration.homepage_header.disable_sensor_graph)h={graph:"line",type:"sensor",hours_to_show:24,detail:1,entity:t,...n?{name:n}:{}};else{switch(i){default:h=n?{type:"tile",name:n}:{type:"tile"};break;case"camera":h={type:"picture-entity",camera_view:"auto"},p="2",u="2",m="2",g="2",_="2",f="2";break;case"climate":h=n?{type:"thermostat",name:n,features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]}:{type:"thermostat",features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]};break;case"cover":h=n?{type:"tile",name:n,features:[{type:"cover-open-close"},{type:"cover-position"}]}:{type:"tile",features:[{type:"cover-open-close"},{type:"cover-position"}]};break;case"light":h=n?{type:"tile",name:n,features:[{type:"light-brightness"}]}:{type:"tile",features:[{type:"light-brightness"}]}}h={entity:t,...h}}this.configuration.entities[t]&&this.configuration.entities[t].row_span&&(p=this.configuration.entities[t].row_span),this.configuration.entities[t]&&this.configuration.entities[t].col_span&&(u=this.configuration.entities[t].col_span),this.configuration.entities[t]&&this.configuration.entities[t].row_span_lg&&(m=this.configuration.entities[t].row_span_lg),this.configuration.entities[t]&&this.configuration.entities[t].col_span_lg&&(g=this.configuration.entities[t].col_span_lg),this.configuration.entities[t]&&this.configuration.entities[t].row_span_xl&&(_=this.configuration.entities[t].row_span_xl),this.configuration.entities[t]&&this.configuration.entities[t].col_span_xl&&(f=this.configuration.entities[t].col_span_xl),e.push(T({domain:i,entity:t,rowSpan:p,colSpan:u,rowSpanLg:m,colSpanLg:g,rowSpanXl:_,colSpanXl:f,friendlyName:o,hideEntity:a,excludeEntity:r,customCard:s,customPopup:d,isFavorite:c,favorite_sort_order:this.configuration.entities[t]&&this.configuration.entities[t].favorite_sort_order?this.configuration.entities[t].favorite_sort_order:99},()=>this.createCardElement2(h)))}})),this.favorites=e}for(const e of this.areas)if(this.configuration.areas[e.area_id]&&this.configuration.areas[e.area_id].disabled)a.push(e);else{const t=new Set,a=[],r=[],o=[],n=[],s=[],d=[];for(const i of this.entitiesByAreaId.get(e.area_id)||[]){if(i.hidden_by)continue;const e=this.configuration.entities?.[i.entity_id];if(b(e))continue;if(this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].disabled){n.push(i.entity_id);continue}const s=i.entity_id.slice(0,i.entity_id.indexOf("."));if(this._hass.states[i.entity_id]){const e=!!this.configuration.entities[i.entity_id]&&!!this.configuration.entities[i.entity_id].hidden,r=!!this.configuration.entities[i.entity_id]&&!!this.configuration.entities[i.entity_id].excluded,n=this.configuration.entities[i.entity_id]?this.configuration.entities[i.entity_id].friendly_name:"",d=this._entityDisplayName(i.entity_id,i),l=!(!this.configuration.entities[i.entity_id]||!this.configuration.entities[i.entity_id].custom_card)&&this.configuration.entities[i.entity_id].custom_card,c=!(!this.configuration.entities[i.entity_id]||!this.configuration.entities[i.entity_id].custom_popup)&&this.configuration.entities[i.entity_id].custom_popup,h=!(!this.configuration.entities[i.entity_id]||!this.configuration.entities[i.entity_id].favorite)&&this.configuration.entities[i.entity_id].favorite;if(e)o.push(i.entity_id),t.add(i.entity_id);else{let o={},p="1",u="1",m="1",g="1",_="1",f="1";if(l&&this.configuration.entity_cards&&this.configuration.entity_cards[i.entity_id])o={input_name:d,input_entity:i.entity_id,...this.configuration.entity_cards[i.entity_id]};else if(this.configuration.devices_card[s])o={input_name:d,input_entity:i.entity_id,...this.configuration.devices_card[s]};else if("sensor"===s&&this._hass&&this._hass.states[i.entity_id].attributes.unit_of_measurement&&!this.configuration.homepage_header.disable_sensor_graph)o={graph:"line",type:"sensor",hours_to_show:24,detail:1,entity:i.entity_id,...d?{name:d}:{}};else{switch(s){default:o=d?{type:"tile",name:d}:{type:"tile"};break;case"camera":o={type:"picture-entity",camera_view:"auto"},p="2",u="2",m="2",g="2",_="2",f="2";break;case"climate":o=d?{type:"thermostat",name:d,features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]}:{type:"thermostat",features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]};break;case"cover":o=d?{type:"tile",name:d,features:[{type:"cover-open-close"},{type:"cover-position"}]}:{type:"tile",features:[{type:"cover-open-close"},{type:"cover-position"}]};break;case"light":o=d?{type:"tile",name:d,features:[{type:"light-brightness"}]}:{type:"tile",features:[{type:"light-brightness"}]}}o={entity:i.entity_id,...o}}this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].row_span&&(p=this.configuration.entities[i.entity_id].row_span),this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].col_span&&(u=this.configuration.entities[i.entity_id].col_span),this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].row_span_lg&&(m=this.configuration.entities[i.entity_id].row_span_lg),this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].col_span_lg&&(g=this.configuration.entities[i.entity_id].col_span_lg),this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].row_span_xl&&(_=this.configuration.entities[i.entity_id].row_span_xl),this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].col_span_xl&&(f=this.configuration.entities[i.entity_id].col_span_xl),a.push(T({domain:s,entity:i.entity_id,rowSpan:p,colSpan:u,rowSpanLg:m,colSpanLg:g,rowSpanXl:_,colSpanXl:f,friendlyName:n,hideEntity:e,excludeEntity:r,customCard:l,customPopup:c,isFavorite:h,sort_order:this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].sort_order?this.configuration.entities[i.entity_id].sort_order:99,grouped_sort_order:this.configuration.entities[i.entity_id]&&this.configuration.entities[i.entity_id].grouped_sort_order?this.configuration.entities[i.entity_id].grouped_sort_order:99},()=>this.createCardElement2(o))),t.add(i.entity_id)}}else r.push(i.entity_id)}0!==this.configuration.area_cards.length&&this.configuration.area_cards[e.area_id]&&Object.entries(this.configuration.area_cards[e.area_id]).forEach(([t,i])=>{const a=i.row_span?i.row_span:"1",r=i.col_span?i.col_span:"1",o=i.row_span_lg?i.row_span_lg:"1",n=i.col_span_lg?i.col_span_lg:"1",l=i.row_span_xl?i.row_span_xl:"1",c=i.col_span_xl?i.col_span_xl:"1";"bottom"==i.position?d.push(T({filename:t,area_id:e.area_id,rowSpan:a,colSpan:r,rowSpanLg:o,colSpanLg:n,rowSpanXl:l,colSpanXl:c},()=>this.createCardElement2(i))):s.push(T({filename:t,area_id:e.area_id,rowSpan:a,colSpan:r,rowSpanLg:o,colSpanLg:n,rowSpanXl:l,colSpanXl:c},()=>this.createCardElement2(i)))});const l=this.floorsById.get(e.floor_id);i.push({entitiesNoState:r,entitiesHidden:o,entitiesDisabled:n,entities:t,area:e,cards:a,customCardsTop:s,customCardsBottom:d,floor:l?.name||(0,h.A)(this._hass,"area.no_floor"),floorLevel:l?.level??9999,sort_order:this.configuration.areas[e.area_id]&&this.configuration.areas[e.area_id].sort_order?this.configuration.areas[e.area_id].sort_order:99,grouped_sort_order:this.configuration.areas[e.area_id]&&this.configuration.areas[e.area_id].grouped_sort_order?this.configuration.areas[e.area_id].grouped_sort_order:99})}if(!e())return;if(i.sort(function(e,t){let i=e.sort_order,a=t.sort_order;return i==a?0:i>a?1:-1}),!e())return;0===this.selectedArea.length&&(this.selectedArea=i[0].area.area_id),this.data=i,this.disabledAreas=a,this.startedUp=!0}}_average(e,t,i){return g(e,t,i,{isAvailable:e=>this._isAvailableEntity(e)})}_isOn(e,t,i){return _(e,t,i,{unavailableStates:d.s7,statesOff:d.jj})}_coverOpenCount(e,t){const i=e.cover;if(!i)return;const a=!!(this.configuration&&this.configuration.homepage_header&&this.configuration.homepage_header.invert_cover);return i.filter(e=>!t||e.attributes.device_class===t).filter(e=>!d.s7.includes(e.state)).filter(e=>{const t=Number(e.attributes.current_position);return Number.isNaN(t)?a?d.jj.includes(e.state):!d.jj.includes(e.state):a?0===t:t>0}).length}_climateState(e,t){return v(e,t,{hass:this._hass,unavailableStates:d.s7,statesOff:d.jj})}_handleAreaDisableAllEntitiesClicked(e){const t=e.currentTarget.area,i=this.data.find(e=>e.area.area_id==t),a=e.currentTarget.key,r=e.currentTarget.value;this._hass.callWS({type:"dwains_dashboard/edit_entities_bool_value",entities:JSON.stringify([...i.entities]),key:a,value:r}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleAreaClick(e){const t=e.currentTarget.dataset.areaId;window.location.hash=t,this.selectedArea=t,window.scrollTo(0,0),this._update_hass(this._hass)}_handleAreaDoubleClick(e){const t=e.currentTarget.dataset.areaId,i=e.currentTarget.lightState;this._hass.callService("light",i?"turn_off":"turn_on",void 0,{area_id:t})}_backButtonClick(){window.location.hash="",this._update_hass(this._hass)}_handleMoreInfo(e){(0,a.moreInfo)(e.currentTarget.entity)}_entitiesByDomain(e){return f(e,{states:this._hass.states,excludedEntities:this.configuration.entities,domainGroups:{toggle:d.Zz,sensor:d.Xt,alert:d.Ti,cover:d.K5,climate:d.ge,other:d.R9},deviceClasses:d.gJ,sensorDeviceClasses:this._areaSensorDeviceClasses()})}async createCardElement2(e){return this.cardHelpers||(this.cardHelpers=await S()),M({helpers:this.cardHelpers,config:e,hass:this._hass,createCardElement:p.Kq})}_toggle(e){D(e),e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation&&e.stopImmediatePropagation();const t=e.currentTarget.domain;d.Zz.includes(t)&&this._hass.callService(t,e.currentTarget.state?"turn_off":"turn_on",void 0,{area_id:e.currentTarget.area_id})}_addLovelaceCard(e){D(e),e.stopPropagation();const t=e.currentTarget.area,i=e.currentTarget.areaName,a=e.currentTarget.position;this._popupOpens.schedule(()=>{(0,r.d)((0,h.A)(this._hass,"entity.add_card_to")+i,{type:"custom:dwains-create-custom-card-card",area:t,position:a,page:"areas",name:i},!0,"")})}_handleAreaEditClick(e){D(e),e.stopPropagation();const t=e.currentTarget.area_id,i=e.currentTarget.area_icon,a=e.currentTarget.disable_area,o=e.currentTarget.hide_icon;this._popupOpens.schedule(()=>{(0,r.d)((0,h.A)(this._hass,"area.edit_area_button"),{type:"custom:dwains-edit-area-button-card",areaId:t,icon:i,disableArea:a,hideIcon:o},!1,"")})}_handleEntityEditClick(e){D(e),e.stopPropagation();const t=e.currentTarget.entity,i=e.currentTarget.friendlyName,a=e.currentTarget.hideEntity,o=!!this.configuration?.entities?.[t]?.hidden_in_area,n=e.currentTarget.disableEntity,s=e.currentTarget.excludeEntity,d=e.currentTarget.colSpan,l=e.currentTarget.rowSpan,c=e.currentTarget.colSpanLg,p=e.currentTarget.rowSpanLg,u=e.currentTarget.colSpanXl,m=e.currentTarget.rowSpanXl,g=e.currentTarget.customCard,_=e.currentTarget.customPopup;this._popupOpens.schedule(()=>{(0,r.d)((0,h.A)(this._hass,"entity.edit_entity"),{type:"custom:dwains-edit-entity-card",entity:t,friendlyName:i,hideEntity:a,hideEntityInArea:o,disableEntity:n,excludeEntity:s,colSpan:d,rowSpan:l,colSpanLg:c,rowSpanLg:p,colSpanXl:u,rowSpanXl:m,customCard:g,customPopup:_},!1,"")})}_saveEntityBoolValue(e,t,i){return this._hass.callWS({type:"dwains_dashboard/edit_entity_bool_value",entityId:e,key:t,value:i}).catch(e=>{console.error("Failed to update entity setting:",e)})}_handleEntityEditBoolValueClick(e){D(e),e.stopPropagation(),this._saveEntityBoolValue(e.currentTarget.entity,e.currentTarget.key,e.currentTarget.value)}_handleEntityAreaVisibilityClick(e,t,i){D(e),e.stopPropagation(),this._saveEntityBoolValue(t,"hidden_in_area",i)}_handleAreaEditBoolValueClick(e){D(e),e.stopPropagation();const t=e.currentTarget.areaId,i=e.currentTarget.key,a=e.currentTarget.value;this._hass.callWS({type:"dwains_dashboard/edit_area_bool_value",areaId:t,key:i,value:a}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleEntityEditCardClick(e){D(e),e.stopPropagation();const t=e.currentTarget.entity;let i,a;if(this.configuration.entity_cards&&this.configuration.entity_cards[t]){const e=this._entityDisplayName(t);i={input_name:e,input_entity:t,...this.configuration.entity_cards[t]},a="editor-element"}this._popupOpens.schedule(()=>{(0,r.d)((0,h.A)(this._hass,"entity.edit_entity_card"),{type:"custom:dwains-edit-entity-card-card",entity_id:t,cardConfig:i,mode:a,existingCardEdit:!!i},!0,"")})}_handleEntityEditPopupClick(e){D(e),e.stopPropagation();const t=e.currentTarget.entity;let i,a;if(this.configuration.entities_popup&&this.configuration.entities_popup[t]){const e=this._entityDisplayName(t);i={input_name:e,input_entity:t,...this.configuration.entities_popup[t]},a="editor-element"}this._popupOpens.schedule(()=>{(0,r.d)((0,h.A)(this._hass,"entity.edit_entity_popup_card"),{type:"custom:dwains-edit-entity-popup-card",entity_id:t,cardConfig:i,mode:a,existingCardEdit:!!i},!0,"")})}_handleEntityAddToFavoritesClick(e){D(e),e.stopPropagation();const t=e.currentTarget.entity;this._hass.callWS({type:"dwains_dashboard/edit_entity_favorite",entityId:t,favorite:!0}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleEntityRemoveFromFavoritesClick(e){D(e),e.stopPropagation();const t=e.currentTarget.entity;this._hass.callWS({type:"dwains_dashboard/edit_entity_favorite",entityId:t,favorite:!1}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}_handleAreaViewDisplayGroupedClicked(e){D(e),e.stopPropagation();const t=e.currentTarget.value,i=this._areaViewGroupingMode();if("client"!=i)return this.areaViewDisplayGrouped="enabled"==i,void(this.areaViewEditMode&&this._requestAreaViewSortableRebuild());this.areaViewDisplayGrouped=t,s.A.set("dwains_dashboard_areaViewDisplayGrouped",t,{expires:365}),this.areaViewEditMode&&this._requestAreaViewSortableRebuild()}_handleAreaDisplayGroupedClicked(e){D(e),e.stopPropagation();const t=e.currentTarget.value,i=this._areaFloorGroupingMode();"client"==i?(this.areaDisplayGrouped=t,s.A.set("dwains_dashboard_areaDisplayGrouped",t,{expires:365})):this.areaDisplayGrouped="enabled"==i}_handleFavoriteEditModeClicked(e){D(e),e.stopPropagation();const t=e.currentTarget.value;if(t){this._sortable=[];const e=this.shadowRoot.querySelectorAll(".sortable"),t=this._hass;for(let i=0;i<e.length;i++)this._sortable[i]=new c.A(e[i],{forceFallback:!0,animation:150,dataIdAttr:"data-entity",handle:".sortable-move",onEnd:function(e){console.log(e),t.callWS({type:"dwains_dashboard/sort_entity",sortData:JSON.stringify(this.toArray()),sortType:"favorite_sort_order"}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}})}else this._sortable.forEach(e=>e.destroy()),this._sortable=void 0;this.favoriteEditMode=t}_handleAreaEditModeClicked(e){D(e),e.stopPropagation();const t=e.currentTarget.value;if(t){this._sortable=[];const e=this.shadowRoot.querySelectorAll(".sortable"),t=this._hass;for(let i=0;i<e.length;i++){const a=this.areaDisplayGrouped?"grouped_sort_order":"sort_order";this._sortable[i]=new c.A(e[i],{forceFallback:!0,animation:150,dataIdAttr:"data-area-id",handle:".sortable-move",onEnd:function(e){console.log(e),t.callWS({type:"dwains_dashboard/sort_area_button",sortData:JSON.stringify(this.toArray()),sortType:a}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}})}}else this._sortable.forEach(e=>e.destroy()),this._sortable=void 0;this.areaEditMode=t}_destroySortables(){this._sortable&&(this._sortable.forEach(e=>e.destroy()),this._sortable=void 0)}_initAreaViewSortables(){this._sortable=[];const e=this.shadowRoot.querySelectorAll(".area-view-entity-sortable"),t=this._hass;for(let i=0;i<e.length;i++){const a=this.areaViewDisplayGrouped?"grouped_sort_order":"sort_order";this._sortable[i]=new c.A(e[i],{forceFallback:!0,animation:150,dataIdAttr:"data-entity",handle:".sortable-move",onEnd:function(e){t.callWS({type:"dwains_dashboard/sort_entity",sortData:JSON.stringify(this.toArray()),sortType:a}).then(e=>{console.log(e)},e=>{console.error("Message failed!",e)})}})}}_requestAreaViewSortableRebuild(){this._destroySortables(),this.updateComplete.then(()=>{this.areaViewEditMode&&this._initAreaViewSortables()})}_handleAreaViewEditModeClicked(e){D(e),e.stopPropagation();const t=e.currentTarget.value;this.areaViewEditMode=t,t?this._requestAreaViewSortableRebuild():this._destroySortables()}_handleCustomCardEditClick(e){D(e),e.stopPropagation();const t=e.currentTarget.area_id,i=e.currentTarget.filename,a=e.currentTarget.colSpan,o=e.currentTarget.rowSpan,n=e.currentTarget.colSpanLg,s=e.currentTarget.rowSpanLg,d=e.currentTarget.colSpanXl,l=e.currentTarget.rowSpanXl,c=this.configuration.area_cards[t][i];let h="top";c.position&&(h=c.position,delete c.position),delete c.col_span,delete c.row_span,delete c.col_span_lg,delete c.row_span_lg,delete c.col_span_xl,delete c.row_span_xl,this._popupOpens.schedule(()=>{(0,r.d)(this._hass.localize("ui.components.entity.entity-picker.edit"),{type:"custom:dwains-create-custom-card-card",area:t,mode:"editor-element",page:"areas",cardConfig:c,position:h,filename:i,colSpan:a,rowSpan:o,colSpanLg:n,rowSpanLg:s,colSpanXl:d,rowSpanXl:l},!0,"")})}_renderAreaButtons(e){if(this.areaDisplayGrouped){e.sort(function(e,t){let i=e.floor,a=t.floor;return i==a?0:i>a?1:-1}),e.sort(function(e,t){let i=e.grouped_sort_order,a=t.grouped_sort_order;return i==a?0:i>a?1:-1});let t=e.reduce((e,t)=>(e[t.floor]=[...e[t.floor]||[],t],e),{});return n.qy`
        <div>
        ${Object.keys(t).map(e=>n.qy`
            <div class="mb-5">
              <h3 class="font-semibold capitalize text-gray">${e.replace(/_/g," ")}</h3>
              <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 ${this.configuration.homepage_header.v2_mode?"lg-grid-cols-4 xl-grid-cols-5":""} gap-4 sortable">
              ${Object.entries(t[e]).map(([e,t])=>n.qy`${this._renderAreaButton(t)}`)}
              </div>
            </div>
          `)}
        </div>
        `}return n.qy`
          <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 ${this.configuration.homepage_header.v2_mode?"lg-grid-cols-4 xl-grid-cols-5":""} gap-4 sortable">
            ${e.map(e=>this._renderAreaButton(e))}
          </div>`}_renderAreaButtonCard(e,t){return n.qy`
        <div>
          <ha-card class="p-2">
            ${(0,h.A)(this._hass,"area.title")}:<br>
            <span class="break-words">
            ${e.name}
            </span>
          </ha-card>
          <ha-card>
            <div class="card-actions">
              <ha-button
                .areaId="${e.area_id}"
                .key=${"disabled"}
                .value=${!1}
                @click=${this._handleAreaEditBoolValueClick}
              >
                ${(0,h.A)(this._hass,"area.enable")}
              </ha-button>
            </div>
          </ha-card>
        </div>
      `}_areaSensorDeviceClasses(){return B(this.configuration)}_areaBinarySensorDeviceClasses(){return O(this.configuration)}_areaBinarySensorEntities(){return P(this.configuration)}_areaBinarySensorLabel(e){return(0,h.A)(this._hass,`device.${e}`,void 0,e.replace(/_/g," "))}_translateAreaBinarySensorText(e,t={}){let i=(0,h.A)(this._hass,e,void 0,e);return Object.entries(t).forEach(([e,t])=>{i=i.replace(new RegExp(`\\{${e}\\}`,"g"),t)}),i}_isAvailableEntity(e){return e&&!d.s7.includes(e.state)}_areaBinarySensorSummary(e,t){const i=this._areaBinarySensorLabel(e);return this._translateAreaBinarySensorText(N(e,t),{count:t,label:i})}_entityBelongsToArea(e,t){return H(e,t,{entitiesById:this.entitiesById,entities:this.entities,devicesById:this.devicesById})}_areaEntityIdsForArea(e){return(this.entitiesByAreaId?.get(e)||[]).filter(e=>!e.hidden_by).filter(e=>!(this.configuration.entities[e.entity_id]&&this.configuration.entities[e.entity_id].disabled)).filter(e=>this._hass.states[e.entity_id]).map(e=>e.entity_id)}_binarySensorStateLabel(e){if(!e)return"";const t=e.attributes.device_class||"_";return this._hass.localize(`component.binary_sensor.entity_component.${t}.state.${e.state}`)||this._hass.localize(`component.binary_sensor.entity_component._.state.${e.state}`)||e.state}_areaBinarySensorValues(e){const t=e.area_id;return L({areaId:t,areaEntityIds:this._areaEntityIdsForArea(t),states:this._hass.states,deviceClasses:this._areaBinarySensorDeviceClasses(),explicitEntityIds:this._areaBinarySensorEntities(),unavailableStates:d.s7,offStates:d.jj,belongsToArea:(e,t)=>this._entityBelongsToArea(e,t),summary:(e,t)=>this._areaBinarySensorSummary(e,t),displayName:e=>this._entityDisplayName(e),stateLabel:e=>this._binarySensorStateLabel(e)})}_renderAreaButton(e){const t=this._entitiesByDomain(e.entities),i=[];d.Xt.forEach(e=>{e in t&&this._areaSensorDeviceClasses().forEach(a=>{if(t[e].some(e=>e.attributes.device_class===a)){const r=this._average(t,e,a);r&&i.push(r)}})}),i.push(...this._areaBinarySensorValues(e.area));const a=this.configuration.areas?this.configuration.areas[e.area.area_id]:void 0,r=a&&a.hide_icon?"":a&&a.icon||e.area.icon||"mdi:texture-box";return n.qy`
        <div class="relative" data-area-id='${e.area.area_id}'>
          <div
            class="flex justify-between h-44 p-3 area-button ${this.selectedArea!=e.area.area_id||this.configuration.homepage_header.v2_mode?"":"current"}"
            data-area-id='${e.area.area_id}'
            @click=${this._handleAreaClick}
            .lightState=${this._isOn(t,"light")}
            @dblclick="${this._handleAreaDoubleClick}"
          >
            <div class="h-full flex flex-wrap content-between">
              <div class="w-full ha-icon">
                ${r?n.qy`
                  <ha-icon
                    class="h-14 w-14"
                    style="color: var(--primary-color);"
                    .hass=${this._hass}
                    .icon=${r}
                  ></ha-icon>
                `:""}
              </div>
              <div class="w-full">
                <h3 class="font-semibold text-lg">${e.area.name}</h3>
                ${i.length?n.qy`
                    <div
                      class="sensors text-gray"
                      title="${i.join(" - ")}"
                    >
                      ${i.map((e,t)=>n.qy`
                        <span class="sensor-chip">${e}</span>${t<i.length-1?n.qy`<span class="sensor-separator"> - </span>`:""}
                      `)}
                    </div>`:""}
                <span class="text-gray text-sm capitalize">${this._climateState(t,"climate")}</span>
              </div>
            </div>
            <div class="row-span-2 text-right space-y-0.5 info">
              ${d.Zz.map(i=>{if(!(i in t))return"";const a=this._isOn(t,i);return"light"==i||"light"!=i&&a?d.Zz.includes(i)?n.qy`
                      <span
                        class="info-badge toggle-badge inline-flex items-center px-1 py-0.5 rounded text-xs font-medium"
                        .domain=${i}
                        .area_id=${e.area.area_id}
                        .state=${a}
                        @click=${this._toggle}
                      >
                        <ha-icon
                          class="${a?"on":"off"} w-6 h-6 mr-0.5"
                          .icon=${d.qJ[i][a?"on":"off"]}
                        >
                        </ha-icon>
                        ${a}
                      </span><br>
                      `:"":void 0})}
              ${d.Ti.map(e=>e in t?d.gJ[e].map(i=>{const a=this._isOn(t,e,i);if(a)return n.qy`
                      ${d.qJ[e][i]?n.qy`
                          <span class="info-badge inline-flex items-center px-1 py-0.5 rounded text-xs font-medium">
                            <ha-icon
                              class="w-6 h-6 mr-0.5"
                              .icon=${d.qJ[e][i]}
                            ></ha-icon> ${a}
                          </span><br>`:""}
                    `}):"")}
              ${d.K5.map(e=>e in t?d.gJ[e].map(i=>{const a=this._coverOpenCount(t,i);if(a)return n.qy`
                      ${d.qJ[e][i]?n.qy`
                          <span class="info-badge inline-flex items-center px-1 py-0.5 rounded text-xs font-medium">
                            <ha-icon
                              class="w-6 h-6 mr-0.5"
                              .icon=${d.qJ[e][i]}
                            ></ha-icon> ${a}
                          </span><br>`:""}
                    `}):"")}
              ${d.R9.map(e=>{if(!(e in t))return"";const i=this._isOn(t,e);return i?d.R9.includes(e)?n.qy`
                      <span class="info-badge inline-flex items-center px-1 py-0.5 rounded text-xs font-medium">
                        <ha-icon
                          class="${i?"on":"off"} w-6 h-6 mr-0.5"
                          .icon=${d.qJ[e][i?"on":"off"]}
                        >
                        </ha-icon>
                        ${i}
                      </span><br>
                      `:"":void 0})}
            </div>
          </div>
          ${this.areaEditMode?n.qy`
            <ha-card>
              <div class="card-actions-multiple">
                <div class="sortable-move">
                  <ha-icon
                    .icon=${"mdi:cursor-move"}
                  >
                  </ha-icon>
                </div>
                <ha-button
                  .area_id=${e.area.area_id}
                  .area_icon=${this.configuration.areas[e.area.area_id]&&this.configuration.areas[e.area.area_id].icon?this.configuration.areas[e.area.area_id].icon:""}
                  .disable_area=${!(!this.configuration.areas[e.area.area_id]||!this.configuration.areas[e.area.area_id].disabled)&&this.configuration.areas[e.area.area_id].disabled}
                  .hide_icon=${!(!this.configuration.areas[e.area.area_id]||!this.configuration.areas[e.area.area_id].hide_icon)&&this.configuration.areas[e.area.area_id].hide_icon}

                  @click=${this._handleAreaEditClick}
                >
                  ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                </ha-button>
              </div>
            </ha-card>
            `:""}
        </div>
      `}_renderAreaViewCustomCards(e,t){return n.qy`
      <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 my-4">
        ${"bottom"==t?e.customCardsBottom.map(e=>n.qy`${this._renderAreaViewCustomCard(e)}`):e.customCardsTop.map(e=>n.qy`${this._renderAreaViewCustomCard(e)}`)}
      </div>
      `}_renderAreaViewCustomCard(e){return n.qy`
	      <div class="col-span-${e.colSpan} row-span-${e.rowSpan} lg-col-span-${e.colSpanLg} lg-row-span-${e.rowSpanLg} xl-col-span-${e.colSpanXl} xl-row-span-${e.rowSpanXl} relative">
	        <div>
	          <dd-lazy-card .card=${e.card} .cardFactory=${e.cardFactory} .hass=${this._hass}></dd-lazy-card>
	        </div>
        ${this.areaViewEditMode?n.qy`
        <ha-card>
          <div class="card-actions">
            <ha-button
              @click=${this._handleCustomCardEditClick}
              .area_id=${e.area_id}
              .filename=${e.filename}
              .rowSpan=${e.rowSpan}
              .colSpan=${e.colSpan}
              .rowSpanLg=${e.rowSpanLg}
              .colSpanLg=${e.colSpanLg}
              .rowSpanXl=${e.rowSpanXl}
              .colSpanXl=${e.colSpanXl}
            >
            ${this._hass.localize("ui.components.entity.entity-picker.edit")}
            </ha-button>
          </div>
        </ha-card>`:""}
      </div>
      `}_hideUnavailableEntitiesEnabled(){return!!(this.configuration&&this.configuration.homepage_header&&this.configuration.homepage_header.hide_unavailable_entities)}_filterUnavailableCards(e){return this.areaViewEditMode||this.favoriteEditMode||!this._hideUnavailableEntitiesEnabled()?e:e.filter(e=>{const t=this._hass.states[e.entity];return!(t&&"unavailable"===t.state)})}_renderAreaViewCards(e){const t=this._filterUnavailableCards(e.cards);if(this.areaViewDisplayGrouped){t.sort(function(e,t){let i=e.grouped_sort_order,a=t.grouped_sort_order;return i==a?0:i>a?1:-1});let e=t.reduce((e,t)=>(e[t.domain]=[...e[t.domain]||[],t],e),{}),i=Object.keys(e).sort((e,t)=>{let i=this.configuration.devices[e]&&this.configuration.devices[e].sort_order?this.configuration.devices[e].sort_order:99,a=this.configuration.devices[t]&&this.configuration.devices[t].sort_order?this.configuration.devices[t].sort_order:99;return i==a?0:i>a?1:-1});return n.qy`
        <div>
        ${i.map(t=>n.qy`
            <div class="mb-5">
              <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"device."+t)}</h3>
              <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable area-view-entity-sortable">
                ${Object.entries(e[t]).map(([e,t])=>n.qy`${this._renderAreaViewCard(t)}`)}
              </div>
            </div>
          `)}
        </div>
        `}return t.sort(function(e,t){let i=e.sort_order,a=t.sort_order;return i==a?0:i>a?1:-1}),n.qy`
	        <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 xl-grid-cols-4 gap-4 sortable area-view-entity-sortable ${this.areaViewEditMode?"":"dd-masonry"}">
	          ${t.map(e=>n.qy`${this._renderAreaViewCard(e)}`)}
	        </div>
	        `}_renderEntityAreaVisibilityAction(e){const t=!0===this.configuration?.entities?.[e]?.hidden_in_area;return n.qy`
        <ha-list-item
          graphic="icon"
          @click=${i=>this._handleEntityAreaVisibilityClick(i,e,!t)}
        >
          <div slot="graphic">
            <ha-icon .icon=${t?"mdi:eye":"mdi:eye-off"}></ha-icon>
          </div>
          ${(0,h.A)(this._hass,t?"entity.unhide_in_area":"entity.hide_in_area")}
        </ha-list-item>
      `}_renderAreaViewCard(e){return n.qy`
	      <div
	        data-entity='${e.entity}'
	        class="col-span-${e.colSpan} row-span-${e.rowSpan} lg-col-span-${e.colSpanLg} lg-row-span-${e.rowSpanLg} xl-col-span-${e.colSpanXl} xl-row-span-${e.rowSpanXl} relative"
	      >
	        <div>
	          <dd-lazy-card .card=${e.card} .cardFactory=${e.cardFactory} .hass=${this._hass}></dd-lazy-card>
	        </div>
        ${this.areaViewEditMode?n.qy`
        <ha-card>
          <div class="card-actions-multiple">
            <div class="sortable-move">
              <ha-icon
                .icon=${"mdi:cursor-move"}
              >
              </ha-icon>
            </div>
            <ha-dropdown
              class="ha-icon-overflow-menu-overflow"
              corner="BOTTOM_START"
              absolute
            >
              <ha-icon-button
                label=${this._hass.localize("ui.common.overflow_menu")}
                .path=${o.TdJ}
                slot="trigger"
              ></ha-icon-button>
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  .friendlyName="${e.friendlyName}"
                  .disableEntity=${e.disableEntity}
                  .hideEntity=${e.hideEntity}
                  .excludeEntity=${e.excludeEntity}
                  .rowSpan=${e.rowSpan}
                  .colSpan=${e.colSpan}
                  .rowSpanLg=${e.rowSpanLg}
                  .colSpanLg=${e.colSpanLg}
                  .rowSpanXl=${e.rowSpanXl}
                  .colSpanXl=${e.colSpanXl}
                  .customCard=${e.customCard}
                  .customPopup=${e.customPopup}
                  @click=${this._handleEntityEditClick}
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:cog"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.settings")}
                </ha-list-item>
                ${"t"!=e.entity?n.qy`
                  <ha-list-item
                    graphic="icon"
                    .entity="${e.entity}"
                    @click="${this._handleEntityEditCardClick}"
                  >
                    <div slot="graphic">
                      <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                    </div>
                    ${(0,h.A)(this._hass,"entity.entity_card")}
                  </ha-list-item>`:""}
                ${"t"!=e.entity?n.qy`
                  <ha-list-item
                    graphic="icon"
                    .entity="${e.entity}"
                    @click="${this._handleEntityEditPopupClick}"
                  >
                    <div slot="graphic">
                      <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                    </div>
                    ${(0,h.A)(this._hass,"entity.popup_card")}
                  </ha-list-item>`:""}
                ${e.isFavorite?"":n.qy`
                  <ha-list-item
                    graphic="icon"
                    .entity="${e.entity}"
                    @click="${this._handleEntityAddToFavoritesClick}"
                  >
                    <div slot="graphic">
                      <ha-icon .icon=${"mdi:tag-heart"}></ha-icon>
                    </div>
                    ${(0,h.A)(this._hass,"entity.add_to_favorites")}
                  </ha-list-item>`}
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  .key=${"excluded"}
                  .value=${!0}
                  @click=${this._handleEntityEditBoolValueClick}
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:table-eye-off"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.exclude")}
                </ha-list-item>
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  .key=${"hidden"}
                  .value=${!0}
                  @click=${this._handleEntityEditBoolValueClick}
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:eye-off"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.hide")}
                </ha-list-item>
                ${this._renderEntityAreaVisibilityAction(e.entity)}
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  .key=${"disabled"}
                  .value=${!0}
                  @click=${this._handleEntityEditBoolValueClick}
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:tray-remove"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.disable")}
                </ha-list-item>
            </ha-dropdown>
          </div>
        </ha-card>`:""}
      </div>
      `}_renderAreaViewEntityCard(e,t){return n.qy`
        <div>
          <ha-card class="p-2">
            ${(0,h.A)(this._hass,"entity.title")}:<br>
            <span class="break-words">
            ${e}
            </span>
          </ha-card>
          <ha-card>
            <div class="card-actions">
              ${"hidden"==t?n.qy`
              <ha-button
                .entity="${e}"
                .key=${"hidden"}
                .value=${!1}
                @click=${this._handleEntityEditBoolValueClick}
              >
                ${(0,h.A)(this._hass,"entity.unhide")}
              </ha-button>`:""}
              ${"disabled"==t?n.qy`
              <ha-button
                .entity="${e}"
                .key=${"disabled"}
                .value=${!1}
                @click=${this._handleEntityEditBoolValueClick}
              >
                ${(0,h.A)(this._hass,"entity.enable")}
              </ha-button>`:""}
            </div>
          </ha-card>
        </div>
      `}_renderAreaView(e){if(this.__ddVisited=this.__ddVisited||{},this.selectedArea==e.area.area_id&&(this.__ddVisited[e.area.area_id]=!0),!this.__ddVisited[e.area.area_id])return n.qy``;const t=this.selectedArea==e.area.area_id?"block":"hidden";return e.cards.sort(function(e,t){let i=e.domain,a=t.domain;return i==a?0:i>a?1:-1}),n.qy`
          <div class="dd-area-view w-full mb-12 ${t}" id="${e.area.area_id}">
            <div class="dd-area-view-header dd-detail-view-header flex justify-between">
              <div class="dd-area-view-title dd-detail-view-title sticky top-0">
                <h2 class="font-semibold text-lg">
                  ${e.area.name}
                </h2>
                <span class="text-gray">
                  ${e.cards.length} ${(0,h.A)(this._hass,"entity.title_plural")}
                </span>
              </div>
              <div>
                <ha-dropdown
                  class="ha-icon-overflow-menu-overflow"
                  corner="BOTTOM_START"
                  absolute
                >
                  <ha-icon-button
                    label=${this._hass.localize("ui.common.overflow_menu")}
                    .path=${o.TdJ}
                    slot="trigger"
                  ></ha-icon-button>
                    ${"client"==this._areaViewGroupingMode()?n.qy`
                      ${this.areaViewDisplayGrouped?n.qy`
                        <ha-list-item
                          graphic="icon"
                          .value=${!1}
                          @click=${this._handleAreaViewDisplayGroupedClicked}
                        >
                          <div slot="graphic">
                          <ha-icon .icon=${"mdi:grid"}></ha-icon>
                          </div>
                          ${(0,h.A)(this._hass,"entity.ungroup")}
                        </ha-list-item>
                        `:n.qy`
                        <ha-list-item
                          graphic="icon"
                          .value=${!0}
                          @click=${this._handleAreaViewDisplayGroupedClicked}
                        >
                          <div slot="graphic">
                            <ha-icon .icon=${"mdi:format-list-group"}></ha-icon>
                          </div>
                          ${(0,h.A)(this._hass,"entity.group")}
                        </ha-list-item>`}
                    `:""}
                    ${this._hass.user.is_admin?n.qy`
                      ${this.areaViewEditMode?n.qy`
                        <ha-list-item
                          graphic="icon"
                          .value=${!1}
                          @click=${this._handleAreaViewEditModeClicked}
                        >
                          <div slot="graphic">
                            <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                          </div>
                          ${(0,h.A)(this._hass,"global.disable_edit_mode")}
                        </ha-list-item>`:n.qy`
                        <ha-list-item
                          graphic="icon"
                          .value=${!0}
                          @click=${this._handleAreaViewEditModeClicked}
                        >
                          <div slot="graphic">
                            <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                          </div>
                          ${(0,h.A)(this._hass,"global.enable_edit_mode")}
                        </ha-list-item>
                        `}
                    `:""}
                </ha-dropdown>
              </div>
            </div>

            ${this.areaViewEditMode?n.qy`
            <ha-card class="card-actions-centered">
              <ha-button
                .area=${e.area.area_id}
                .key=${"disabled"}
                .value=${!0}
                @click=${this._handleAreaDisableAllEntitiesClicked}
              >
                ${(0,h.A)(this._hass,"entity.disable_all")}
              </ha-button>
              <ha-button
                .area=${e.area.area_id}
                .key=${"hidden"}
                .value=${!0}
                @click=${this._handleAreaDisableAllEntitiesClicked}
              >
                ${(0,h.A)(this._hass,"entity.hide_all")}
              </ha-button>
            </ha-card>

            <button type="button"
              @click=${this._addLovelaceCard}
              .area=${e.area.area_id}
              .areaName=${e.area.name}
              .position=${"top"}
              class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray">
                ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
              </span>
            </button>`:""}

            ${this._renderAreaViewCustomCards(e,"top")}

            ${this._renderAreaViewCards(e)}

            ${this._renderAreaViewCustomCards(e,"bottom")}

            ${this.areaViewEditMode?n.qy`
              ${e.entitiesNoState.length?n.qy`
                <div class="mb-5">
                  <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.unavailable")}</h3>
                  <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                  ${e.entitiesNoState.map(e=>n.qy`${this._renderAreaViewEntityCard(e,"noState")}`)}
                  </div>
                </div>`:""}
              ${e.entitiesHidden.length?n.qy`
                <div class="mb-5">
                  <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.hidden")}</h3>
                  <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                  ${e.entitiesHidden.map(e=>n.qy`${this._renderAreaViewEntityCard(e,"hidden")}`)}
                  </div>
                </div>`:""}
              ${e.entitiesDisabled.length?n.qy`
                <div class="mb-5">
                  <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"entity.disabled")}</h3>
                  <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                  ${e.entitiesDisabled.map(e=>n.qy`${this._renderAreaViewEntityCard(e,"disabled")}`)}
                  </div>
                </div>`:""}
            `:""}

            ${this.areaViewEditMode?n.qy`
            <button type="button"
              @click=${this._addLovelaceCard}
              .area=${e.area.area_id}
              .areaName=${e.area.name}
              .position=${"bottom"}
              class="cursor-pointer my-4 relative block w-full border-2 border-gray-300 border-dashed rounded-lg p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <svg class="mx-auto h-12 w-12 text-gray" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
              </svg>
              <span class="mt-2 block text-sm font-medium text-gray">
                ${this._hass.localize("ui.panel.lovelace.editor.edit_card.add")}
              </span>
            </button>`:""}
          </div>`}_renderFavoriteViewCard(e){return n.qy`
	      <div data-entity='${e.entity}' class="col-span-${e.colSpan} row-span-${e.rowSpan} lg-col-span-${e.colSpanLg} lg-row-span-${e.rowSpanLg}  relative">
	        <div>
	          <dd-lazy-card .card=${e.card} .cardFactory=${e.cardFactory} .hass=${this._hass}></dd-lazy-card>
	        </div>
        ${this.favoriteEditMode?n.qy`
        <ha-card>
          <div class="card-actions-multiple">
            <div class="sortable-move">
              <ha-icon
                .icon=${"mdi:cursor-move"}
              >
              </ha-icon>
            </div>
            <ha-dropdown
              class="ha-icon-overflow-menu-overflow"
              corner="BOTTOM_START"
              absolute
            >
              <ha-icon-button
                label=${this._hass.localize("ui.common.overflow_menu")}
                .path=${o.TdJ}
                slot="trigger"
              ></ha-icon-button>
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  .friendlyName="${e.friendlyName}"
                  .disableEntity=${e.disableEntity}
                  .hideEntity=${e.hideEntity}
                  .excludeEntity=${e.excludeEntity}
                  .rowSpan=${e.rowSpan}
                  .colSpan=${e.colSpan}
                  .rowSpanLg=${e.rowSpanLg}
                  .colSpanLg=${e.colSpanLg}
                  .rowSpanXl=${e.rowSpanXl}
                  .colSpanXl=${e.colSpanXl}
                  .customCard=${e.customCard}
                  .customPopup=${e.customPopup}
                  @click=${this._handleEntityEditClick}
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:cog"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.settings")}
                </ha-list-item>
                ${"t"!=e.entity?n.qy`
                  <ha-list-item
                    graphic="icon"
                    .entity="${e.entity}"
                    @click="${this._handleEntityEditCardClick}"
                  >
                    <div slot="graphic">
                      <ha-icon .icon=${"mdi:pencil"}></ha-icon>
                    </div>
                    ${(0,h.A)(this._hass,"entity.entity_card")}
                  </ha-list-item>`:""}
                ${"t"!=e.entity?n.qy`
                  <ha-list-item
                    graphic="icon"
                    .entity="${e.entity}"
                    @click="${this._handleEntityEditPopupClick}"
                  >
                    <div slot="graphic">
                      <ha-icon .icon=${"mdi:pencil-box-multiple"}></ha-icon>
                    </div>
                    ${(0,h.A)(this._hass,"entity.popup_card")}
                  </ha-list-item>`:""}
                <ha-list-item
                  graphic="icon"
                  .entity="${e.entity}"
                  @click="${this._handleEntityRemoveFromFavoritesClick}"
                >
                  <div slot="graphic">
                    <ha-icon .icon=${"mdi:tag-heart"}></ha-icon>
                  </div>
                  ${(0,h.A)(this._hass,"entity.remove_from_favorites")}
                </ha-list-item>
                ${this._renderEntityAreaVisibilityAction(e.entity)}
            </ha-dropdown>
          </div>
        </ha-card>`:""}
      </div>
      `}_renderFavorites(){return 0==this.favorites.length?n.qy``:(this.favorites.sort(function(e,t){let i=e.favorite_sort_order,a=t.favorite_sort_order;return i==a?0:i>a?1:-1}),n.qy`
        <div id="favorites" class="mt-4">
          <div class="flex justify-between mb-2">
            <div>
              <h2 class="font-semibold text-lg">
                ${(0,h.A)(this._hass,"favorite.title_plural")}
              </h2>
              <span class="text-gray">
                ${(0,h.A)(this._hass,"favorite.all_favorites")}
              </span>
            </div>
            <div>
              ${this._hass.user.is_admin?n.qy`
              <ha-dropdown
                class="ha-icon-overflow-menu-overflow"
                corner="BOTTOM_END"
                absolute
              >
                <ha-icon-button
                  label=${this._hass.localize("ui.common.overflow_menu")}
                  .path=${o.TdJ}
                  slot="trigger"
                ></ha-icon-button>
                  ${this.favoriteEditMode?n.qy`
                    <ha-list-item
                      graphic="icon"
                      .value=${!1}
                      @click=${this._handleFavoriteEditModeClicked}
                    >
                      <div slot="graphic">
                        <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                      </div>
                      ${(0,h.A)(this._hass,"global.disable_edit_mode")}
                    </ha-list-item>`:n.qy`
                    <ha-list-item
                      graphic="icon"
                      .value=${!0}
                      @click=${this._handleFavoriteEditModeClicked}
                    >
                      <div slot="graphic">
                        <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                      </div>
                      ${(0,h.A)(this._hass,"global.enable_edit_mode")}
                    </ha-list-item>
                    `}
              </ha-dropdown>
              `:""}
            </div>
          </div>
          <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4 sortable">
            ${this.favorites.map(e=>n.qy`${this._renderFavoriteViewCard(e)}`)}
          </div>
        </div>
        `)}render(){if(null==this.data||0===this.data.length)return n.qy``;{const e=new Date,t=(e.getHours()<10?"0":"")+e.getHours(),i=(e.getMinutes()<10?"0":"")+e.getMinutes(),a=e.toLocaleDateString(this._hass.locale.language,{weekday:"long",month:"short",day:"numeric"}),r=t>=12?`${t-12}:${i} pm`:`${t}:${i} am`;let s,l,c,p,u,m,g,_,f,b;if(s=e.getHours()<12?(0,h.A)(this._hass,"global.greeting_morning"):e.getHours()<18?(0,h.A)(this._hass,"global.greeting_afternoon"):(0,h.A)(this._hass,"global.greeting_evening"),this.configuration.homepage_header.weather_entity&&(l=this.configuration.homepage_header.weather_entity,c=this._hass.states[l],c)){p=d.My[c.state];const e=this._hass.selectedLanguage||this._hass.language;u=(this._hass.resources&&this._hass.resources[e]?this._hass.resources[e]:{})["component.weather.entity_component._.state."+c.state]||this._hass.localize(`component.weather.entity_component._.state.${c.state}`)||c.state,m=c.attributes.temperature+this._hass.config.unit_system.temperature}return this.configuration.homepage_header.alarm_entity&&(g=this.configuration.homepage_header.alarm_entity,_=this._hass.states[g].state,_&&(b=d.TC[_],f=this._hass.localize(`component.alarm_control_panel.state._.${_}`))),n.qy`
            <div class="dd-homepage-horizontal-scroll dd-dashboard-style-refresh">
            <div class="dd-homepage-columns flex flex-wrap">
              <div class="w-full ${this.configuration.homepage_header.v2_mode?"":"lg-w-1-2 xl-w-1-3"} ${window.location.hash?this.configuration.homepage_header.v2_mode?"hidden":"hidden lg-block":""} p-4">
                <div class="dd-homepage-status mb-2">
                  <div>
                    ${this.configuration.homepage_header.alarm_entity?n.qy`
                      <div class="area-button py-1 px-2" .entity=${this.configuration.homepage_header.alarm_entity} @click=${this._handleMoreInfo}>
                        <ha-icon icon="${b}"></ha-icon> ${f}
                      </div>`:""}
                  </div>

                  <div id="weather">
                    ${this.configuration.homepage_header.weather_entity?n.qy`
                      <div class="area-button py-1 px-2" .entity=${this.configuration.homepage_header.weather_entity} @click=${this._handleMoreInfo}>
                        <ha-icon icon="${p}"></ha-icon> ${u}, ${m}
                      </div>`:""}
                  </div>

                </div>
                <div class="mb-4 grid grid-cols-1 lg-grid-cols-2">
                  <div>
                    ${this.configuration.homepage_header.disable_welcome_message?"":n.qy`<h1 class="font-semibold text-xl">${s}, ${this._hass.user.name}</h1>`}
                    ${this.notificationCard}
                  </div>
                  ${this.configuration.homepage_header.disable_clock?"":n.qy`
                    <div class="text-right">
                      <div id="clock" class="mb-2 hidden lg-block">
                        <h2 class="font-semibold text-xl">${this.configuration.homepage_header.am_pm_clock?n.qy`${r}`:n.qy`${t}:${i}`}</h2>
                        <span class="text-gray capitalize">${a}</span>
                      </div>
                    </div>`}
                </div>

                ${this.badgesCard}

                ${this._renderFavorites()}

                <div id="areas" class="mt-4">
                  <div class="flex justify-between mb-2">
                    <div>
                      <h2 class="font-semibold text-lg capitalize">
                        ${(0,h.A)(this._hass,"area.title_plural")}
                      </h2>
                      <span class="text-gray">
                        ${this.data.length} ${(0,h.A)(this._hass,"area.title_plural")}
                      </span>
                    </div>
                    <div>
                      <ha-dropdown
                        class="ha-icon-overflow-menu-overflow"
                        corner="BOTTOM_END"
                        absolute
                      >
                        <ha-icon-button
                          label=${this._hass.localize("ui.common.overflow_menu")}
                          .path=${o.TdJ}
                          slot="trigger"
                        ></ha-icon-button>
                          ${"client"==this._areaFloorGroupingMode()?n.qy`
                            ${this.areaDisplayGrouped?n.qy`
                              <ha-list-item
                                graphic="icon"
                                .value=${!1}
                                @click=${this._handleAreaDisplayGroupedClicked}
                              >
                                <div slot="graphic">
                                <ha-icon .icon=${"mdi:grid"}></ha-icon>
                                </div>
                                ${(0,h.A)(this._hass,"area.ungroup_by_floor")}
                              </ha-list-item>
                              `:n.qy`
                              <ha-list-item
                                graphic="icon"
                                .value=${!0}
                                @click=${this._handleAreaDisplayGroupedClicked}
                              >
                                <div slot="graphic">
                                  <ha-icon .icon=${"mdi:format-list-group"}></ha-icon>
                                </div>
                                ${(0,h.A)(this._hass,"area.group_by_floor")}
                              </ha-list-item>`}
                          `:""}
                          ${this._hass.user.is_admin?n.qy`
                            ${this.areaEditMode?n.qy`
                              <ha-list-item
                                graphic="icon"
                                .value=${!1}
                                @click=${this._handleAreaEditModeClicked}
                              >
                                <div slot="graphic">
                                  <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                                </div>
                                ${(0,h.A)(this._hass,"global.disable_edit_mode")}
                              </ha-list-item>
                              `:n.qy`
                              <ha-list-item
                                graphic="icon"
                                .value=${!0}
                                @click=${this._handleAreaEditModeClicked}
                              >
                                <div slot="graphic">
                                  <ha-svg-icon .path=${o.CZ3}></ha-svg-icon>
                                </div>
                                ${(0,h.A)(this._hass,"global.enable_edit_mode")}
                              </ha-list-item>`}
                          `:""}
                      </ha-dropdown>
                    </div>
                  </div>

                  ${this._renderAreaButtons(this.data)}

                  ${this.areaEditMode?n.qy`
                    ${this.disabledAreas.length?n.qy`
                      <div class="mb-5">
                        <h3 class="font-semibold capitalize text-gray">${(0,h.A)(this._hass,"area.disabled")}</h3>
                        <div class="grid grid-flow-row-dense grid-cols-2 lg-grid-cols-3 gap-4">
                        ${this.disabledAreas.map(e=>n.qy`${this._renderAreaButtonCard(e,"disabled")}`)}
                        </div>
                      </div>`:""}
                  `:""}
                </div>
              </div>
              <div class="w-full ${this.configuration.homepage_header.v2_mode?"":"lg-w-1-2 xl-w-2-3"} ${window.location.hash?"":this.configuration.homepage_header.v2_mode?"hidden":"hidden lg-block"} p-4">
                ${this.data.map(e=>this._renderAreaView(e))}
              </div>
            </div>
            </div>
            <div class="sticky z-30 bottom-0 ${window.location.hash?"":"hidden"} ${this.configuration.homepage_header.v2_mode?"":"lg-hidden"} text-right">
              <div @click=${this._backButtonClick} class="back-button">
                  <div class="button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                  </div>
              </div>
            </div>
        `}}static get styles(){return[n.AH`
        :host {
          display: block;
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          max-width: 100%;
        }
        .dd-overview-grid {
          box-sizing: border-box;
          width: 100%;
          min-width: 0;
          max-width: 100%;
        }
        @media (max-width: 599px) {
          .w-full {
            box-sizing: border-box;
            max-width: 100%;
          }
          .grid.dd-overview-grid > * {
            min-width: 0;
            max-width: 100%;
          }
        }
        .back-button {
          margin-right: 1rem;
          margin-bottom: 3.4rem;
          display: inline-block;
        }
        .back-button .button {
          background-color: var(--secondary-background-color);
          padding: 0.75rem;
          border-radius: 9999px;
          margin-bottom: env(safe-area-inset-bottom);
        }
        .card-actions {
          text-align: right;
        }
        .card-actions-centered {
          display: flex;
          justify-content: space-around;
          padding: 0.25rem 0.5rem;
        }
        .card-actions-multiple {
          display: flex;
          justify-content: space-between;
          padding: 0.25rem 0.5rem;
        }
        .sortable-move {
          cursor: -webkit-grabbing;
          cursor: grab;
          margin: auto 0;
        }
        .area-button .info ha-icon, .ha-icon ha-icon {
          display: inline-block;
          margin: auto;
          --mdc-icon-size: 100% !important;
          --iron-icon-width: 100% !important;
          --iron-icon-height: 100% !important;
        }
        .area-button .info {
          position: absolute;
          top: 0.75rem;
          right: 0.75rem;
          left: 0.75rem;
          bottom: 4.25rem;
          z-index: 3;
          display: flex;
          flex-direction: column;
          flex-wrap: wrap-reverse;
          justify-content: flex-start;
          align-content: flex-start;
          align-items: flex-end;
          height: auto;
          max-height: calc(100% - 5rem);
          gap: 0 0.125rem;
          overflow: hidden;
          pointer-events: none;
        }
        .area-button .info br {
          display: none;
        }
        .area-button .sensors {
          display: -webkit-box;
          box-sizing: border-box;
          width: 100%;
          white-space: normal;
          overflow: hidden;
          line-height: 1.18;
          max-height: 2.36em;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        @media (max-width: 640px) {
          .area-button .sensors {
            font-size: 1rem;
            line-height: 1.15;
            max-height: 2.3em;
          }
        }
        #badges {
          cursor: pointer;
          background: var( --ha-card-background, var(--card-background-color, white) );
          box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
          color: var(--primary-text-color);
        }
        .area-button {
          position: relative;
          cursor: pointer;
          background: var( --ha-card-background, var(--card-background-color, white) );
          border-radius: var(--ha-card-border-radius, 4px);
          box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
          color: var(--test-primary-text-color, var(--primary-text-color));
        }
        .info-badge {
          /*background-color: var(--sidebar-icon-color); */
          color: var( --dwains-info-badge-color, var(--primary-text-color) );
          background-color: var(--dwains-info-badge-background, var(--secondary-background-color));
        }
        .area-button .info .toggle-badge {
          cursor: pointer;
          pointer-events: auto;
        }
        @media (min-width: 1024px) {
          .area-button.current {
            background: transparent;
            z-index: 1;
            position: relative;
          }
          .area-button.current::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: .12;
            z-index: -1;
            background: var(--sidebar-selected-icon-color);
            border-radius: var(--ha-card-border-radius, 4px);
          }
        }
        /*styling tailwind dwains version*/
        *, ::after, ::before {
          box-sizing: border-box;
        }
        h1,h2,h3 {
          margin: 0;
        }
        h3 {
          font-size: 1em;
        }
        .absolute {
          position: absolute
        }
        .break-words {
          overflow-wrap: break-word;
        }
        .relative {
            position: relative
        }
        .sticky {
            position: -webkit-sticky;
            position: sticky
        }
        .top-0 {
            top: 0px
        }
        .bottom-0 {
            bottom: 0px
        }
        .z-30 {
            z-index: 7;
        }
        .col-span-1 {
            grid-column: span 1 / span 1
        }
        .col-span-2 {
            grid-column: span 2 / span 2
        }
        .row-span-1 {
            grid-row: span 1 / span 1
        }
        .row-span-2 {
            grid-row: span 2 / span 2
        }
        .my-4 {
            margin-top: 1rem;
            margin-bottom: 1rem
        }
        .mx-auto {
          margin-left: auto;
          margin-right: auto
        }
        .mb-2 {
            margin-bottom: 0.5rem
        }
        .mb-4 {
            margin-bottom: 1rem
        }
        .mt-4 {
            margin-top: 1rem
        }
        .mr-0\.5 {
            margin-right: 0.125rem
        }
        .mr-0 {
            margin-right: 0px
        }
        .mb-12 {
            margin-bottom: 3rem
        }
        .mb-5 {
            margin-bottom: 1.25rem
        }
        .mb-16 {
            margin-bottom: 4rem
        }
        .ml-4 {
            margin-left: 1rem
        }
        .block {
            display: block
        }
        .inline-block {
            display: inline-block
        }
        .flex {
            display: flex
        }
        .inline-flex {
            display: inline-flex
        }
        .grid {
            display: grid
        }
        .hidden {
            display: none
        }
        .h-6 {
            height: 1.5rem
        }
        .h-44 {
            height: 11rem
        }
        .h-full {
            height: 100%
        }
        .h-14 {
            height: 3.5rem
        }
        .h-8 {
            height: 2rem
        }
        .w-full {
            width: 100%
        }
        .w-6 {
            width: 1.5rem
        }
        .w-14 {
            width: 3.5rem
        }
        .w-8 {
            width: 2rem
        }
        .w-12 {
          width: 3rem
        }
        .cursor-pointer {
            cursor: pointer
        }
        .grid-flow-row-dense {
            grid-auto-flow: row dense
        }
        .dd-masonry > div > div,
        .dd-masonry > div > div > dd-lazy-card {
            display: block;
            height: 100%;
            min-height: 100%;
        }
        .grid-cols-1 {
            grid-template-columns: repeat(1, minmax(0, 1fr))
        }
        .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr))
        }
        .flex-wrap {
            flex-wrap: wrap
        }
        .content-between {
            align-content: space-between
        }
        .items-center {
            align-items: center
        }
        .justify-between {
            justify-content: space-between
        }
        .dd-homepage-status {
            display: grid;
            grid-template-columns: minmax(0, 1fr) auto minmax(0, 1fr);
            align-items: start;
            gap: .5rem;
        }
        .dd-homepage-status > :first-child {
            justify-self: start;
            min-width: 0;
        }
        .dd-homepage-status #weather {
            justify-self: center;
        }
        .dd-homepage-horizontal-scroll {
            max-width: 100%;
            overflow-x: auto;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .dd-homepage-horizontal-scroll::-webkit-scrollbar {
            display: none;
            width: 0;
            height: 0;
        }
        .gap-4 {
            gap: 1rem
        }
        .space-y-0.5 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0.125rem * var(--tw-space-y-reverse))
        }
        .space-y-0 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-y-reverse: 0;
            margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
            margin-bottom: calc(0px * var(--tw-space-y-reverse))
        }
        .rounded {
            border-radius: 0.25rem
        }
        .rounded-md {
            border-radius: 0.375rem
        }
        .bg-gray-800 {
            --tw-bg-opacity: 1;
            background-color: rgb(31 41 55 / var(--tw-bg-opacity))
        }
        .rounded-lg {
          border-radius: 0.5rem
        }
        .border-2 {
            border-width: 2px
        }
        .border-dashed {
            border-style: dashed
        }
        .border-gray-300 {
            --tw-border-opacity: 1;
            border-color: rgb(209 213 219 / var(--tw-border-opacity))
        }
        .bg-gray-800 {
            --tw-bg-opacity: 1;
            background-color: rgb(31 41 55 / var(--tw-bg-opacity))
        }
        .bg-opacity-50 {
            --tw-bg-opacity: 0.5
        }
        .p-2 {
          padding: 0.5rem;
        }
        .p-4 {
            padding: 1rem
        }
        .p-1 {
            padding: 0.25rem
        }
        .p-3 {
            padding: 0.75rem
        }
        .px-1 {
            padding-left: 0.25rem;
            padding-right: 0.25rem
        }
        .p-12 {
          padding: 3rem
        }
        .py-0\.5 {
            padding-top: 0.125rem;
            padding-bottom: 0.125rem
        }
        .py-0 {
            padding-top: 0px;
            padding-bottom: 0px
        }
        .py-1 {
          padding-top: 0.25rem;
          padding-bottom: 0.25rem
        }
        .px-2 {
          padding-left: 0.5rem;
          padding-right: 0.5rem
        }
        .text-center {
          text-align: center
        }
        .text-right {
            text-align: right
        }
        .text-xl {
            font-size: 1.5rem;
            line-height: 2rem
        }
        .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem
        }
        .text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem
        }
        .text-xs {
            font-size: 0.75rem;
            line-height: 1rem
        }
        .font-semibold {
            font-weight: 600
        }
        .font-medium {
            font-weight: 500
        }
        .capitalize {
            text-transform: capitalize
        }
        .text-gray {
            color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
        }
        .text-white {
            --tw-text-opacity: 1;
            color: rgb(255 255 255 / var(--tw-text-opacity))
        }
        @media (min-width: 768px) {
            .md-grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr))
            }
        }
        @media (min-width: 1024px) {
            .lg-col-span-1 {
                grid-column: span 1 / span 1
            }
            .lg-col-span-3 {
                grid-column: span 3 / span 3
            }
            .lg-col-span-2 {
                grid-column: span 2 / span 2
            }
            .lg-row-span-1 {
                grid-row: span 1 / span 1
            }
            .lg-row-span-3 {
                grid-row: span 3 / span 3
            }
            .lg-row-span-2 {
                grid-row: span 2 / span 2
            }
            .lg-block {
                display: block
            }
            .lg-hidden {
                display: none
            }
            .lg-w-1-2 {
                width: 50%
            }
            .lg-grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
            .lg-grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr))
            }
            .lg-grid-cols-4 {
              grid-template-columns: repeat(4, minmax(0, 1fr))
            }
        }
        @media (min-width: 1536px) {
          .xl-col-span-1 {
              grid-column: span 1 / span 1
          }
          .xl-col-span-4 {
              grid-column: span 4 / span 4
          }
          .xl-col-span-2 {
              grid-column: span 2 / span 2
          }
          .xl-row-span-1 {
              grid-row: span 1 / span 1
          }
          .xl-row-span-4 {
              grid-row: span 4 / span 4
          }
          .xl-row-span-2 {
              grid-row: span 2 / span 2
          }
          .xl-w-1-3 {
              width: 33.333333%
          }
          .xl-w-2-3 {
              width: 66.666667%
          }
          .xl-grid-cols-4 {
              grid-template-columns: repeat(4, minmax(0, 1fr))
          }
          .xl-grid-cols-5 {
            grid-template-columns: repeat(5, minmax(0, 1fr))
          }
      }
        `,(0,u.Cn)(n.AH),(0,u.ww)(n.AH)]}}z("homepage-card",V)},9831(e,t,i){"use strict";var a=i(6684),r=i(6205),o=i(7377),n=i(9774),s=i(7969),d=i(9177),l=i(8089),c=i(3601);const{defineDwainsElement:h}=i(572),{loadDashboardRegistrySnapshot:p}=i(8355),{loadCardHelpers:u}=i(3266),{TimerOwner:m}=i(6687),{PopupOpenScheduler:g}=i(4615),{ReloadableLoadOwner:_}=i(1786),{hassConnectionIdentity:f,hasHassConnectionChanged:b}=i(4776),{isEntityHiddenInArea:v}=i(2546);class y extends a.WF{constructor(){super(),this._timers=new m,this._popupOpens=new g(this._timers),this._loads=new _(e=>this._loadConfiguration(e))}static get styles(){return[a.AH`
      ha-card {
        overflow: hidden;
      }
      .flex {
        display: flex;
      }
      .justify-center {
        justify-content: center;
      }
      .items-center {
        align-items: center;
      }
      .font-semibold {
        font-weight: 600;
      }
      h1, h2, h3, h4, h5, h6 {
        font-size: inherit;
      }
      blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
        margin: 0;
      }
      .p-2 {
        padding: 0.5rem;
      }
      .cursor-pointer {
        cursor: pointer;
      }
      .w-8 {
        width: 1.5rem;
      }
      .h-8 {
        height: 1.5rem;
      }
      .space-x-2>:not([hidden])~:not([hidden]) {
        --tw-space-x-reverse: 0;
        margin-right: calc(0.5rem * var(--tw-space-x-reverse));
        margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
      }
      .text-gray-500 {
        --tw-text-opacity: 1;
        color: rgba(107,114,128,var(--tw-text-opacity));
      }
      .capitalize {
          text-transform: capitalize;
      }
      .ha-icon ha-icon {
        display: inline-block;
        margin: auto;
        --mdc-icon-size: 100% !important;
        --iron-icon-width: 100% !important;
        --iron-icon-height: 100% !important;
      }
      .text-center {
        text-align: center;
      }
      .rounded-full {
        border-radius: 9999px;
      }
      .not_home {
        filter: grayscale(100%);
      }
      .domain-badge-card h3 {
        margin-top: 0.4rem;
      }
      .m-auto {
        margin: 0 auto;
      }
      .round-badge {
        background-color: var(--dwains-house-information-badge-background, var(--sidebar-icon-color));
      }
      .badge-icon {
        color: var(--dwains-house-information-badge-color, var(--ha-card-background, var(--card-background-color, white) ) );
      }
      .dd-header-tabs {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;
        height: 110px;
        padding: 4px 8px;
        margin: 0 .25rem;
        overflow-x: auto;
        overscroll-behavior-x: contain;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: none;
        background: rgba(var(--rgb-card-background-color), .08);
        border-radius: 12px;
      }
      .dd-header-tabs::-webkit-scrollbar {
        display: none;
      }
      .dd-header-tab {
        display: flex;
        flex: 1 1 0;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-width: 60px;
        max-width: 88px;
        padding: 0 4px;
      }
      .dd-header-tabs h3 {
        max-width: 100%;
        margin: 10px 0 2px;
        overflow: hidden;
        font-size: 1rem;
        font-weight: 500;
        line-height: 1.3;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .dd-header-tabs span {
        font-size: .92rem;
        line-height: 1.25;
      }
      @media (max-width: 600px) {
        .dd-header-tabs {
          gap: 6px;
          padding-inline: 6px;
        }
        .dd-header-tab {
          flex: 0 0 auto;
          min-width: 68px;
        }
      }

      .loading-component {
        height: 110px;
      }
    `,(0,c.MP)(a.AH)]}static get properties(){return{_hass:{type:Object},configuration:{type:Object},domains:{type:Object},persons:{type:Array}}}setConfig(e){this.configuration=e}set hass(e){const t=b(this._hass,e);this._hass=e,this.requestUpdate(),this._startIfReady(t)}_entityDisplayName(e,t){const i=t||this.entitiesById?.get(e),a=i?.device_id?this.devicesById?.get(i.device_id):void 0;return(0,l.Hg)(this._hass,this.configuration,e,i,a)}async connectedCallback(){super.connectedCallback(),this._timers.connect(),await this._startIfReady()}async _startIfReady(e=!1){const t=f(this._hass);if(this.isConnected&&this._hass&&this._startedHass!==t){this._hass,this._startedHass=t;try{e?await this._loads.reload():await this._loadData()}catch(e){this._startedHass===t&&(this._startedHass=void 0),console.error("Error starting house information card:",e)}}}disconnectedCallback(){super.disconnectedCallback(),this._startedHass=void 0,this._loads.invalidate(),this._timers.disconnect()}async _reloadCard(){await this._loads.reload(),this.requestUpdate()}_loadData(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){const t=await p(this._hass);if(e())if(Object.assign(this,t),u().catch(e=>{console.error("Failed to preload house-information card helpers",e)}),null==this.areas||0===this.areas.length||null==this.devices||0===this.devices.length||null==this.entities||0===this.entities.length||null==this.configuration||0===this.configuration.length);else{const e=[],t=[];for(const e of this.entities)if("person"==(0,n.computeDomain)(e.entity_id)){const i=this.configuration.entities&&this.configuration.entities[e.entity_id]||{};e.hidden_by||i.disabled||i.excluded||i.hidden||t.push(e.entity_id)}for(const t of this.areas)if(!this.configuration.areas[t.area_id]||!this.configuration.areas[t.area_id].disabled){new Set;for(const i of this.entitiesByAreaId.get(t.area_id)||[])if(!i.hidden_by){const a=!!this.configuration.entities[i.entity_id]&&!!this.configuration.entities[i.entity_id].disabled,r=!!this.configuration.entities[i.entity_id]&&!!this.configuration.entities[i.entity_id].excluded,o=!!this.configuration.entities[i.entity_id]&&!!this.configuration.entities[i.entity_id].hidden,d=v(this.configuration.entities?.[i.entity_id]);if(!(a||r||o||d)){const a=this._entityDisplayName(i.entity_id,i),r=(0,n.computeDomain)(i.entity_id);if(!(s.Zz.includes(r)||s.Ti.includes(r)||s.K5.includes(r)||s.ge.includes(r)||s.R9.includes(r)))continue;r in e||(e[r]={domain:r,entities:[]}),e[r].entities.push({entity_id:i.entity_id,area:t,friendlyName:a})}}}this.domains=e,this.persons=t}}_handleMoreInfo(e){if(e.currentTarget.entity)(0,r.moreInfo)(e.currentTarget.entity);else{const t=e.currentTarget.domain,i=e.currentTarget.deviceClass,a=this.domains?.[t]?.entities,n="climate"!==t||a&&0!==a.length?a||[]:Object.keys(this._hass.states).filter(e=>e.startsWith("climate.")&&!v(this.configuration?.entities?.[e])).map(e=>({entity_id:e,area:{},friendlyName:this._entityDisplayName(e)}));this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,o.d)((0,d.A)(this._hass,"device."+t),{type:"custom:dwains-house-information-more-info-card",domain:t,entities:n,deviceClass:"climate"===t?"":i,configuration:this.configuration},!0,"")})}}_isOn(e,t,i){if(e)return(i?e.filter(e=>e.attributes.device_class===i):e).filter(e=>{const t=this.configuration?.entities?.[e.entity_id];return!(e.hidden_by||t?.disabled||t?.excluded||t?.hidden||t?.hidden_in_area||s.s7.includes(e.state)||s.jj.includes(e.state))}).length}_isOnCover(e,t,i){if(e)return(i?e.filter(e=>e.attributes.device_class===i):e).filter(e=>!s.s7.includes(e.state)&&!s.jj.includes(e.state)&&!this.configuration.homepage_header.invert_cover).length}_isOffCover(e,t,i){if(e)return(i?e.filter(e=>e.attributes.device_class===i):e).filter(e=>!s.s7.includes(e.state)&&s.jj.includes(e.state)&&this.configuration.homepage_header.invert_cover).length}_isOnClimate(e,t){if(!e)return;const i=[];for(const t of e)t.attributes.hvac_action&&"idle"!=t.attributes.hvac_action?s.s7.includes(t.attributes.hvac_action)||s.jj.includes(t.attributes.hvac_action)||i.push(t.entity_id):t.attributes.hvac_action||s.s7.includes(t.state)||s.jj.includes(t.state)||i.push(t.entity_id);return i.length}_renderDomain(e){const t=[];for(const i of e.entities){const e=this._hass.states[i.entity_id];e&&t.push(e)}if(s.Zz.includes(e.domain)){const i=this._isOn(t,e);if(i)return this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+e.domain),s.qJ[e.domain][i?"on":"off"],i,"")}else{if(s.Ti.includes(e.domain))return s.gJ[e.domain].map(i=>{const a=this._isOn(t,e.domain,i);if(a)return this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+i),s.qJ[e.domain][i],a,i)});if(s.K5.includes(e.domain))return s.gJ[e.domain].map(i=>{const a=this._isOnCover(t,e.domain,i),r=this._isOffCover(t,e.domain,i);return a?this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+i),s.qJ[e.domain][i],a,i):r?this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+i),s.qJ[e.domain][i],r,i):void 0});if(s.ge.includes(e.domain)){const i=this._isOnClimate(t,e.domain);if(i)return this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+e.domain),s.qJ[e.domain][i?"on":"off"],i,"")}else if(s.R9.includes(e.domain)){const i=this._isOn(t,e);if(i)return this._renderDomainBadgeCard(e.domain,(0,d.A)(this._hass,"device."+e.domain),s.qJ[e.domain][i?"on":"off"],i,"")}}}_renderDomainBadgeCard(e,t,i,r,o){let n;return n="window"!=o&&"door"!=o&&"cover"!=e&&"lock"!=e||this.configuration.homepage_header.invert_cover?this.configuration.homepage_header.invert_cover&&"cover"==e?(0,d.A)(this._hass,"device.closed"):(0,d.A)(this._hass,"device.on"):(0,d.A)(this._hass,"device.open"),a.qy`
      <div class="dd-header-tab">
        <div class="text-center cursor-pointer domain-badge-card" .domain=${e} .deviceClass=${o} @click=${this._handleMoreInfo}>
          <div class="rounded-full flex items-center justify-center m-auto round-badge" style="width: 50px; height: 50px;">
            <div class="">
              <ha-icon
                class="w-8 h-8 badge-icon"
                .icon=${this.configuration.devices[e]&&this.configuration.devices[e].icon?this.configuration.devices[e].icon:i}
              ></ha-icon>
            </div>
          </div>
          <h3 class="capitalize">${t}</h3>
          <span class="text-gray-500">
          ${r} ${n}
          </span>
        </div>
      </div>
      `}_renderPersonCard(e){const t=this._hass.states[e];if(t&&t.attributes){let i=t.attributes.entity_picture_local||t.attributes.entity_picture;i&&this._hass&&(i=this._hass.hassUrl(i));const r=this._entityDisplayName(e);return a.qy`
                <div class="dd-header-tab">
                <div class="text-center cursor-pointer" .entity=${e} @click=${this._handleMoreInfo}>
                    ${i?a.qy`
                    <img src="${i}" width="50" class="rounded-full m-auto ${t.state}">
                    `:a.qy`
                    <div class="rounded-full flex items-center justify-center m-auto round-badge" style="width: 50px; height: 50px; margin-bottom: 6px;">
                    <div class="">
                        <ha-icon
                        class="w-8 h-8 badge-icon"
                        .icon=${"mdi:account"}
                        ></ha-icon>
                    </div>
                    </div>
                    `}
                    <h3 class="capitalize">${r.split(" ")[0]}</h3>
                    <span class="text-gray-500">
                    ${(0,l.FI)(this._hass.localize,t,this._hass.locale)}
                    </span>
                </div>
                </div>`}}render(){return this._hass?null==this.domains||0===Object.keys(this.domains).length?a.qy``:a.qy`
                <ha-card>
                <div class="dd-header-tabs">
                    ${this.persons.map(e=>this._renderPersonCard(e))}
                    ${Object.values(this.domains).map(e=>this._renderDomain(e))}
                </div>
                </ha-card>
            `:a.qy``}}h("dwains-house-information-card",y)},6780(e,t,i){"use strict";var a=i(6684),r=i(8089),o=i(9177),n=i(7969),s=i(9774);const{websocketReadStore:d}=i(9012),{loadCardHelpers:l}=i(3266),{TimerOwner:c}=i(6687),{dashboardRouteState:h}=i(5704),{defineDwainsElement:p}=i(572);class u extends a.WF{static get styles(){return a.AH`
        .p-20px {
            padding: 20px;
        }
        .flex {
            display: flex;
        }
        .grid-flow-row-dense {
            grid-auto-flow: row dense

        }
        .grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr))
        }
        .grid {
            display: grid;
            gap: 1rem;
        }
        .cards.single-card-section > * {
            grid-column: 1 / -1;
        }
        @media (min-width: 1024px) {
            .lg-grid-cols-3 {
                grid-template-columns: repeat(3, minmax(0, 1fr))
            }
        }
        @media (min-width: 1536px) {
            .xl-col-span-4 {
                grid-column: span 4 / span 4
            }
        }
        .font-semibold {
            font-weight: 600;
        }
        h1, h2, h3, h4, h5, h6 {
            font-size: inherit;
        }
        h3 {
            font-size: 1.5rem;
            padding-bottom: 0.5rem;
        }
        blockquote, dd, dl, figure, h1, h2, h3, h4, h5, h6, hr, p, pre {
            margin: 0;
        }
        .p-2 {
            padding: 0.5rem;
        }
        .cursor-pointer {
            cursor: pointer;
        }
        .space-x-2>:not([hidden])~:not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(0.5rem * var(--tw-space-x-reverse));
            margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
        }
        .capitalize {
            text-transform: capitalize;
        }
        .icon ha-state-icon {
            display: inline-block;
            margin: auto;
            --mdc-icon-size: 100% !important;
            --iron-icon-width: 100% !important;
            --iron-icon-height: 100% !important;

            width: 1.5rem;
            height: 1.5rem;
        }
        .icon {
            padding: 0.75rem;
            background-color: var(--secondary-background-color);
            border-radius: 999px;
        }
        .information {
            line-height: 1.10;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }
        .information .state {
            font-size: 0.9rem;
            line-height: 1.25rem;
            color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
        }
        .handle-button {
            background-color: var(--secondary-background-color);
            border-radius: var(--ha-card-border-radius, 4px);
            color: var(--primary-text-color);
            display: block;
            text-align: center;
            padding: 0.75rem;
            font-weight: 600;
            cursor: pointer;
            margin-top: 1rem;
        }
        .single-button {

        }
        .two-buttons {
            display: grid;
            gap: 1rem;
            grid-template-columns: repeat(2,minmax(0,1fr));
        }
        .mb-5 {
            margin-bottom: 1.5rem;
        }
        `}static get properties(){return{_hass:{},configuration:{},areas:{type:Object}}}constructor(){super(),this.areas={},this._timers=new c,this._loadGeneration=0,this._lifecycleActive=!1}connectedCallback(){super.connectedCallback(),this._lifecycleActive=!0,this._timers.connect(),this._debounceLoadCards()}disconnectedCallback(){super.disconnectedCallback(),this._lifecycleActive=!1,this._loadGeneration+=1,this._timers.disconnect()}set hass(e){this._hass=e,this._debounceLoadCards()}async _debounceLoadCards(){this._hass&&this._config&&this._timers.schedule("load-cards",async()=>{await this.loadCards(),this._lifecycleActive&&this.requestUpdate()},0)}async _loadCardHelpers(){return l()}async setConfig(e){if(!e.entities)throw new Error("Specify entities list");this._config=e,this.entities=e.entities,this.domain=e.domain,this.deviceClass=e.deviceClass,this.configuration=e.configuration,this.cardHelpers=await this._loadCardHelpers(),this._debounceLoadCards()}async loadCards(){const e=++this._loadGeneration;if(this.configuration||(this.configuration=await d.read(this._hass,{type:"dwains_dashboard/configuration/get"})),this.cardHelpers||(this.cardHelpers=await this._loadCardHelpers()),e!==this._loadGeneration)return;this.areas={};const t=await Promise.all(this.entities.map(async e=>{const t=this._hass.states[e.entity_id];let i=!1;if(t){t.entity_id.startsWith("cover.")&&(n.s7.includes(t.state)||n.jj.includes(t.state)||this.configuration.homepage_header.invert_cover?!n.s7.includes(t.state)&&n.jj.includes(t.state)&&this.configuration.homepage_header.invert_cover&&(i=!0):i=!0),n.s7.includes(t.state)||n.jj.includes(t.state)||t.entity_id.startsWith("cover.")||(i=!0);const a=!this.deviceClass||t.attributes.device_class===this.deviceClass;if(i&&a){const t=await this.createEntityCard(e.entity_id,e.friendlyName);if(t)return{areaId:e.area.area_id||"default",areaName:e.area.name||"Default",card:t}}}return null}));if(e===this._loadGeneration)for(const e of t)e&&(this.areas[e.areaId]||(this.areas[e.areaId]={cards:[],name:e.areaName}),this.areas[e.areaId].cards.push(e.card))}async createEntityCard(e,t){const i=this._hass.states[e],a=e.slice(0,e.indexOf("."));if(!i)return null;const o=t||(0,r.Hg)(this._hass,this.configuration,e);let n={};switch(a){default:n={type:"tile",name:o};break;case"camera":n={type:"picture-entity",camera_view:"auto"},rowSpan="2",colSpan="2",rowSpanLg="2",colSpanLg="2",rowSpanXl="2",colSpanXl="2";break;case"climate":n={type:"thermostat",name:o,features:[{type:"climate-fan-modes",fan_modes:["quiet","low","medium","high"]},{type:"climate-hvac-modes",hvac_modes:["heat_cool","heat","dry","fan_only","cool","off"]}]};break;case"cover":n={type:"tile",name:o,features:[{type:"cover-open-close"},{type:"cover-position"}]};break;case"light":n={type:"tile",name:o,features:[{type:"light-brightness"}]}}return n={entity:e,...n},(0,r.Kq)(this.cardHelpers,n,this._hass)}_navigateToDevices(e){const t=e.currentTarget.domain;(0,r.fs)(),h.navigateToDevices(t)}_currentOn(){const e=[],t=this.deviceClass;for(const t of this.entities){const i=this._hass.states[t.entity_id];i&&e.push({area:t.area,stateObj:i})}if(e){if("climate"==this.domain){const t=[];for(const i of e)i.stateObj.attributes.hvac_action&&"idle"!=i.stateObj.attributes.hvac_action?n.s7.includes(i.stateObj.attributes.hvac_action)||n.jj.includes(i.stateObj.attributes.hvac_action)||t.push({area:i.area,stateObj:i.stateObj}):i.stateObj.attributes.hvac_action||n.s7.includes(i.stateObj.state)||n.jj.includes(i.stateObj.state)||t.push({area:i.area,stateObj:i.stateObj});return t}return(t?e.filter(e=>e.stateObj.attributes.device_class===t):e).filter(e=>!n.s7.includes(e.stateObj.state)&&!n.jj.includes(e.stateObj.state))}}_handleTurnAllOffClicked(e){const t=this._currentOn();0==t.length&&(0,r.fs)(),t.map(e=>{const t=e.stateObj.entity_id,i=(0,s.computeDomain)(t),a="group"===i?"homeassistant":i;let r;switch(i){case"lock":r="lock";break;case"cover":r="close_cover";break;default:r="turn_off"}this._hass.callService(a,r,{entity_id:t})})}render(){if(!this._hass||!this._config||0===Object.keys(this.areas).length)return a.qy``;let e=!1;return"light"!=this.domain&&"switch"!=this.domain&&"cover"!=this.domain||(e=!0),a.qy`
            <div class="p-20px">
                ${Object.entries(this.areas).map(([e,t])=>a.qy`
                    <div class="area mb-5" id="area-${e}">
                        <h3 class="font-semibold capitalize text-gray">${t.name}</h3>
                        <div class="cards grid grid-flow-row-dense grid-cols-2 ${1===t.cards.length?"single-card-section":""} gap-4">
                            ${t.cards.map(e=>a.qy`${e}`)}
                        </div>
                    </div>
                `)}
                <div class="${e?"two-buttons":"single-button"}">
                    ${e?a.qy`
                    <div class="handle-button" @click=${this._handleTurnAllOffClicked}>
                        ${(0,o.A)(this._hass,"device.turn_all_off")}
                    </div>
                    `:""}
                    <div class="handle-button" @click=${this._navigateToDevices} .domain=${this.domain}>
                        ${(0,o.A)(this._hass,"device.see_all")}
                        <ha-icon
                        .icon=${"mdi:chevron-right"}
                        ></ha-icon>
                    </div>
                </div>
            </div>
        `}}p("dwains-house-information-more-info-card",u)},6087(e,t,i){"use strict";var a=i(7377),r=i(6205),o=i(9165),n=i(9774),s=i(6684),d=i(8089),l=i(9177),c=i(3601);const{EventSubscriptionOwner:h}=i(7450),{EventListenerOwner:p}=i(1991),{TimerOwner:u}=i(6687),{PopupOpenScheduler:m}=i(4615),{ReloadableLoadOwner:g}=i(1786),{hassConnectionIdentity:_,hasHassConnectionChanged:f}=i(4776),{websocketReadStore:b}=i(9012),{loadCardHelpers:v}=i(3266),{defineDwainsElement:y}=i(572),{MORE_PAGE_SAVED_EVENT:w}=i(9661),{closeParentDropdown:x}=i(8276);class k extends s.WF{static get styles(){return[s.AH`
        #more-page {
          padding: 1rem;
        }
        .justify-between {
          justify-content: space-between;
        }
        .flex {
            display: flex;
        }
        .mb-2 {
            margin-bottom: 0.5rem;
        }
        .font-semibold {
          font-weight: 600;
        }
        .text-lg {
            font-size: 1.125rem;
            line-height: 1.75rem;
        }
        .capitalize {
          text-transform: capitalize;
        }
        .sticky {
          position: sticky;
        }
        .z-30 {
          z-index: 30;
        }
        .bottom-0 {
          bottom: 0;
        }
        .text-right {
          text-align: right;
        }
        .h-8 {
          height: 2rem;
        }
        .w-8 {
          width: 2rem;
        }
        .page-actions {
          display: flex;
          align-items: center;
        }
        .page-state {
          display: flex;
          min-height: 8rem;
          align-items: center;
          justify-content: center;
          color: var(--secondary-text-color);
        }
        .page-error {
          color: var(--error-color);
        }
      `,(0,c.Ve)(s.AH),(0,c.ww)(s.AH)]}static get properties(){return{card:{},_hass:{},configuration:{},_cardLoading:{state:!0},_cardError:{state:!0},_configurationError:{state:!0}}}async loadHelpers(){return this.cardHelpers=await v(),this.cardHelpers}constructor(){super(),this._subscriptions=new h,this._listeners=new p,this._timers=new u,this._popupOpens=new m(this._timers),this._loads=new g(e=>this._loadConfiguration(e)),this._configReady=!1,this._forcePageRead=!1,this._savedPageChanged=e=>{const t=e.detail?.page;t&&t.foldername===this.foldername&&(this._pendingPage=t,this._loads.reload().catch(e=>{console.error("Failed to render the saved More Page:",e)}))}}set hass(e){const t=f(this._hass,e);this._hass=e,null!=this.card&&0!==this.card.length&&(this.card.hass=e),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect(),this._startedHass=void 0),this._startIfReady(t)}setConfig(e){this.name=e.name,this.foldername=e.foldername,this.icon=e.icon,this.showInNavbar=e.show_in_navbar??e.showInNavbar,this.cardConfig=e.card,this.card=void 0,this._cardError=void 0,this._cardLoading=!0,this._configReady=!0,this._startIfReady()}async connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._listeners.listen("saved-more-page",window,w,this._savedPageChanged),this._listeners.connect(),this._timers.connect(),await this._startIfReady()}async _startIfReady(e=!1){const t=_(this._hass);if(this.isConnected&&this._hass&&this._configReady&&this.foldername&&this._startedHass!==t){this._hass,this._startedHass=t;try{e?await this._loads.reload():await this._loadData(),this.isConnected&&_(this._hass)===t&&await this._subscribeReload()}catch(e){this._configurationError=e,this._cardError=e,this._cardLoading=!1,this.requestUpdate(),console.error("Error starting more page card:",e)}}}disconnectedCallback(){super.disconnectedCallback(),this._startedHass=void 0,this._loads.invalidate(),this._subscriptions.disconnect(),this._listeners.disconnect(),this._timers.disconnect()}_subscribeReload(){return this._subscriptions.subscribeEvent("more-page",this._hass,"dwains_dashboard_more_pages_reload",()=>{b.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),b.invalidate(this._hass,{type:"dwains_dashboard/more_page/get",foldername:this.foldername}),this._reloadCard().catch(e=>{console.error("Error reloading more page card:",e)})})}async _reloadCard(){this._forcePageRead=!0;try{await this._loads.reload(),this.requestUpdate()}finally{this._forcePageRead=!1}}_loadData(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){const t=this._pendingPage,i=this.cardConfig&&"object"==typeof this.cardConfig?{foldername:this.foldername,name:this.name,icon:this.icon,show_in_navbar:this.showInNavbar,card:this.cardConfig}:void 0,a=t||(!this._forcePageRead&&i?i:await b.readPreferred(this._hass,{type:"dwains_dashboard/more_page/get",foldername:this.foldername},{type:"dwains_dashboard/configuration/get"},{capability:"dashboard-read-slices",selectFallback:e=>e?.more_pages?.[this.foldername]}));if(!a)throw new Error(`More page "${this.foldername}" has no card configuration`);if(!e())return;if(this.cardHelpers=await this.loadHelpers(),!e())return;const r=Array.isArray(a.card)?{type:"vertical-stack",cards:a.card}:a.card,o=await this.createCardElement2(r);e()&&(this.name=a.name,this.icon=a.icon,this.showInNavbar=a.show_in_navbar,this.cardConfig=a.card,this.configuration={more_pages:{[a.foldername]:a}},this.card=o,this._cardError=void 0,this._configurationError=void 0,this._cardLoading=!1,this._pendingPage===t&&(this._pendingPage=void 0))}async createCardElement2(e){const t=await(0,d.Kq)(this.cardHelpers,e,this._hass);return t.hass=this._hass,t}_handleEditMorePageClicked(e){x(e);const t=this.foldername,i=this.configuration?.more_pages?.[t]||{},o=i.name||this.name||"",n=i.icon||this.icon||"",s=i.show_in_navbar??!!this.showInNavbar;this._popupOpens.schedule(()=>{(0,r.fireEvent)("hass-more-info",{entityId:""},this),(0,a.d)(this._hass.localize("ui.components.entity.entity-picker.edit"),{type:"custom:dwains-edit-more-page-card",more_page:t,name:o,icon:n,showInNavbar:s,foldername:t,mode:"editor-element",cardConfig:this.cardConfig},!0,"")})}_backButtonClick(){(0,n.navigate)(window,"/dwains-dashboard/more_page")}render(){return s.qy`
          <div id="more-page" class="dd-dashboard-style-refresh">
            <div class="dd-detail-view-header flex justify-between">
              <div class="dd-detail-view-title">
                <h2 class="font-semibold text-lg capitalize">
                  ${this.name}
                </h2>
                <span class="text-gray">
                  ${(0,l.A)(this._hass,"more.title_plural")}
                </span>
              </div>
              <div class="page-actions">
                ${this._hass?.user?.is_admin?s.qy`
                <ha-dropdown
                  class="ha-icon-overflow-menu-overflow"
                  corner="BOTTOM_END"
                  absolute
                >
                  <ha-icon-button
                    label=${this._hass.localize("ui.common.overflow_menu")}
                    .path=${o.TdJ}
                    slot="trigger"
                  ></ha-icon-button>
                  <ha-list-item
                    graphic="icon"
                    @click=${this._handleEditMorePageClicked}
                  >
                    <div slot="graphic">
                      <ha-svg-icon .path=${o.Q43}></ha-svg-icon>
                    </div>
                    ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                  </ha-list-item>
                </ha-dropdown>
                `:""}
              </div>
            </div>

            ${this._cardLoading?s.qy`
              <div class="page-state"><ha-circular-progress active></ha-circular-progress></div>
            `:this._cardError?s.qy`
              <div class="page-state page-error">${this._cardError.message||this._cardError}</div>
            `:this.card||s.qy`
              <div class="page-state">No page content is configured.</div>
            `}

            <div class="sticky z-30 bottom-0 text-right">
              <div @click=${this._backButtonClick} class="back-button">
                <div class="button">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        `}}y("more-page-card",k)},297(e,t,i){"use strict";var a=i(7382),r=i(9774),o=i(7377),n=i(6205),s=i(9165),d=i(6684),l=i(6752);class c{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,t,i){this._$Ct=e,this._$AM=t,this._$Ci=i}_$AS(e,t){return this.update(e,t)}update(e,t){return this.render(...t)}}const{I:h}=l.ge,p={},u=(m=class extends c{constructor(){super(...arguments),this.key=l.s6}render(e,t){return this.key=e,t}update(e,[t,i]){return t!==this.key&&(((e,t=p)=>{e._$AH=t})(e),this.key=t),i}},(...e)=>({_$litDirective$:m,values:e}));var m,g=i(9177),_=i(8331),f=i(3601);const{EventSubscriptionOwner:b}=i(7450),{TimerOwner:v}=i(6687),{PopupOpenScheduler:y}=i(4615),{ReloadableLoadOwner:w}=i(1786),{hassConnectionIdentity:x,hasHassConnectionChanged:k}=i(4776),{websocketReadStore:$}=i(9012),{closeParentDropdown:C}=i(8276),{defineDwainsElement:E}=i(572),{dispatchMorePageMetadataChanged:A}=i(9661),S=new WeakMap;function D(e){const t=e?.connection||e;return!t||"object"!=typeof t&&"function"!=typeof t?void 0:t}class z extends d.WF{static get properties(){return{configuration:{},editMode:{},_loading:{state:!0},_loadError:{state:!0},_actionError:{state:!0},_sortError:{state:!0}}}constructor(){super(),this._subscriptions=new b,this._timers=new v,this._popupOpens=new y(this._timers),this._loads=new w(e=>this._loadConfiguration(e)),this._startedHass=void 0,this._configReady=!1,this._loading=!0,this.editMode=!1,this._sortGeneration=0,this._gridRevision=0,this._pendingSortOrder=void 0,this._dragActive=!1,this._reloadAfterSort=!1,this._confirmedVisibility=new Map}set hass(e){const t=k(this._hass,e);this._hass=e;const i=D(e);this.editMode=!!i&&(S.get(i)??!1),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect()),this._startIfReady(t)}setConfig(e){this._hass||(this._hass=(0,a.mo)());const t=D(this._hass);this.editMode=!!t&&(S.get(t)??!1),this._configReady=!0,this._startIfReady()}async connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._timers.connect(),await this._startIfReady()}async _startIfReady(e=!1){const t=x(this._hass);if(this.isConnected&&this._hass&&this._configReady&&this._startedHass!==t){this._hass,this._startedHass=t;try{e?await this._reloadCard():await this._loadData(),this.isConnected&&x(this._hass)===t&&this._startedHass===t&&await this._subscribeReload()}catch(e){this._startedHass===t&&(this._startedHass=void 0),this._loading=!1,this._loadError=e,console.error("Error starting more pages card:",e)}}}disconnectedCallback(){super.disconnectedCallback(),this._subscriptions.disconnect(),this._timers.disconnect(),this._startedHass=void 0,this._sortGeneration+=1,this._pendingSortOrder=void 0,this._dragActive=!1,this._reloadAfterSort=!1,this._loads.invalidate(),this._destroySortable()}updated(e){(e.has("editMode")||this.editMode&&e.has("configuration"))&&this._syncSortable()}_subscribeReload(){return this._subscriptions.subscribeEvent("more-pages",this._hass,"dwains_dashboard_more_pages_reload",()=>{$.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),$.invalidate(this._hass,{type:"dwains_dashboard/more_pages/get"}),this._dragActive||this._pendingSortOrder?this._reloadAfterSort=!0:this._reloadCard().catch(e=>{console.error("Error reloading more pages card:",e)})})}async _reloadCard(){await this._loads.reload(),this.requestUpdate()}_loadData(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){let t=await $.readPreferred(this._hass,{type:"dwains_dashboard/more_pages/get"},{type:"dwains_dashboard/configuration/get"},{capability:"dashboard-read-slices"});if(e()){for(const[e,i]of this._confirmedVisibility){const a=t.more_pages?.[e]||{};a.show_in_navbar===i?this._confirmedVisibility.delete(e):t={...t,more_pages:{...t.more_pages||{},[e]:{...a,foldername:e,show_in_navbar:i}}}}this._pendingSortOrder&&(t=this._configurationWithMorePageOrder(t,this._pendingSortOrder)),this.configuration=t,this._loading=!1,this._loadError=void 0}}_handleMorePageClick(e){const t=e.currentTarget.path;(0,r.navigate)(window,"/dwains-dashboard/more_page_"+t),this.requestUpdate()}_handleCreateMorePageClicked(e){C(e),e.stopPropagation(),this._popupOpens.schedule(()=>{(0,n.fireEvent)("hass-more-info",{entityId:""},this),(0,o.d)((0,g.A)(this._hass,"more.create"),{type:"custom:dwains-edit-more-page-card"},!0,"")})}_handleRemoveMorePageClicked(e){C(e),e.stopPropagation();const t=e.currentTarget.more_page;this._hass.callWS({type:"dwains_dashboard/remove_more_page",foldername:t}).then(async e=>{if(console.log(e),this.configuration&&this.configuration.more_pages&&this.configuration.more_pages[t]){const e={...this.configuration.more_pages};delete e[t],this.configuration={...this.configuration,more_pages:e},this.requestUpdate()}$.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),$.invalidate(this._hass,{type:"dwains_dashboard/more_pages/get"}),await this._reloadCard()},e=>{console.error("Message failed!",e)})}async _handleNavbarVisibilityClick(e){C(e),e.stopPropagation();const t=e.currentTarget.more_page,i=Boolean(e.currentTarget.show_in_navbar),a=this.configuration?.more_pages?.[t]||{};this._actionError=void 0;try{const e=await this._hass.callWS(i?{type:"dwains_dashboard/add_more_page_to_navbar",more_page:t}:{type:"dwains_dashboard/edit_more_page_button",more_page:t,name:a.name||t,icon:a.icon||"mdi:puzzle",showInNavbar:!1}),r={...a,...e?.page||{},foldername:e?.foldername||t,show_in_navbar:i};this.configuration={...this.configuration,more_pages:{...this.configuration?.more_pages||{},[t]:r}},this._confirmedVisibility.set(t,i),A(window,r),$.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),$.invalidate(this._hass,{type:"dwains_dashboard/more_pages/get"}),this._actionError=void 0,this.requestUpdate()}catch(e){this._actionError=e,console.error("Failed to change More Page navigation visibility:",e)}}async _handleEditMorePageClicked(e){C(e),e.stopPropagation();const t=e.currentTarget.more_page;try{const e=await $.readPreferred(this._hass,{type:"dwains_dashboard/more_page/get",foldername:t},{type:"dwains_dashboard/configuration/get"},{capability:"dashboard-read-slices",selectFallback:e=>e?.more_pages?.[t]});if(!e?.card)throw new Error(`More page "${t}" has no card configuration`);const i=this._confirmedVisibility.get(t);this._popupOpens.schedule(()=>{(0,n.fireEvent)("hass-more-info",{entityId:""},this),(0,o.d)((0,g.A)(this._hass,"more.edit"),{type:"custom:dwains-edit-more-page-card",foldername:e.foldername||t,name:e.name,icon:e.icon,showInNavbar:i??e.show_in_navbar,cardConfig:e.card,mode:"editor-element"},!0,"")})}catch(e){console.error("Failed to load more page for editing:",e),this._loadError=e}}_handleEditModeClicked(e){C(e),e.stopPropagation();const t=!0===e.currentTarget.value;this.editMode=t;const i=D(this._hass);i&&S.set(i,t)}_syncSortable(){if(this._destroySortable(),!this.editMode||!this.isConnected)return;const e=this.shadowRoot?.querySelector(".sortable");if(!e)return;const t=this;this._sortable=[new _.A(e,{forceFallback:!0,animation:150,dataIdAttr:"data-more_page",handle:".sortable-move",onStart(){t._dragActive=!0},onEnd(){const e=this.toArray();t._dragActive=!1,t._reloadAfterSort=!1,t._saveMorePageOrder(e)}})]}_configurationWithMorePageOrder(e,t){const i={...e?.more_pages||{}};return t.forEach((e,t)=>{i[e]&&(i[e]={...i[e],sort_order:t+1})}),{...e||{},more_pages:i}}async _saveMorePageOrder(e){if(!Array.isArray(e)||0===e.length)return;const t=++this._sortGeneration;this._pendingSortOrder=[...e],this._gridRevision+=1,this._sortError=void 0,this.configuration=this._configurationWithMorePageOrder(this.configuration,e),this.requestUpdate();try{const i=await this._hass.callWS({type:"dwains_dashboard/sort_more_page",sortData:JSON.stringify(e)});if(t!==this._sortGeneration)return;const a=Array.isArray(i?.order)?i.order:e;if(this._pendingSortOrder=[...a],this.configuration=this._configurationWithMorePageOrder(this.configuration,a),$.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),$.invalidate(this._hass,{type:"dwains_dashboard/more_pages/get"}),this._reloadAfterSort=!1,await this._reloadCard(),t!==this._sortGeneration)return;this._pendingSortOrder=void 0,this._reloadAfterSort=!1,this.requestUpdate()}catch(e){if(t!==this._sortGeneration)return;this._pendingSortOrder=void 0,this._reloadAfterSort=!1,this._sortError=e,console.error("Failed to save More Page order:",e),$.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),$.invalidate(this._hass,{type:"dwains_dashboard/more_pages/get"}),await this._reloadCard().catch(e=>{console.error("Failed to restore More Page order:",e)})}}_destroySortable(){this._sortable?.forEach(e=>e.destroy()),this._sortable=void 0}_renderPageButton(e,t){return t.name?d.qy`
            <div class="relative" data-more_page="${e}">
              <div class="flex justify-between h-44 p-3 more-page-button" .path=${e} @click=${this._handleMorePageClick}>
                <div class="h-full flex flex-wrap content-between">
                  <div class="w-full ha-icon">
                    ${this.configuration.more_pages[e]&&this.configuration.more_pages[e].icon?d.qy`
                      <ha-icon
                        class="h-14 w-14"
                        style="color: var(--primary-color);"
                        .icon=${this.configuration.more_pages[e].icon}
                      ></ha-icon>`:""}
                  </div>
                  <div class="w-full">
                    <h3 class="font-semibold text-lg capitalize">${t.name.replace(/_/g," ")}</h3>
                  </div>
                </div>
              </div>
            ${this.editMode?d.qy`
              <ha-card>
                <div class="card-actions-multiple">
                  <div class="sortable-move">
                    <ha-icon
                      .icon=${"mdi:cursor-move"}
                    >
                    </ha-icon>
                  </div>
                  <ha-dropdown
                    class="ha-icon-overflow-menu-overflow"
                    corner="BOTTOM_START"
                    absolute
                  >
                    <ha-icon-button
                      label=${this._hass.localize("ui.common.overflow_menu")}
                      .path=${s.TdJ}
                      slot="trigger"
                    ></ha-icon-button>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${e}
                        @click=${this._handleEditMorePageClicked}
                      >
                        <div slot="graphic">
                          <ha-svg-icon .path=${s.Q43}></ha-svg-icon>
                        </div>
                        ${this._hass.localize("ui.components.entity.entity-picker.edit")}
                      </ha-list-item>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${e}
                        @click=${this._handleRemoveMorePageClicked}
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${"mdi:trash-can"}></ha-icon>
                        </div>
                        ${this._hass.localize("ui.common.remove")}
                      </ha-list-item>
                      <ha-list-item
                        graphic="icon"
                        .more_page=${e}
                        .show_in_navbar=${!t.show_in_navbar}
                        @click=${this._handleNavbarVisibilityClick}
                      >
                        <div slot="graphic">
                          <ha-icon .icon=${t.show_in_navbar?"mdi:tag-minus":"mdi:tag-plus"}></ha-icon>
                        </div>
                        ${(0,g.A)(this._hass,t.show_in_navbar?"more.remove_navbar":"more.add_navbar")}
                      </ha-list-item>
                  </ha-dropdown>
                </div>
              </ha-card>`:""}
            </div>
          `:d.qy``}render(){if(this._loading)return d.qy`<div class="overview-state"><ha-circular-progress active></ha-circular-progress></div>`;if(this._loadError)return d.qy`<div class="overview-state overview-error">${this._loadError.message||this._loadError}</div>`;const e=this.configuration?.more_pages||{},t=Object.entries(e).sort(function(e,t){let i=e[1].sort_order??99,a=t[1].sort_order??99;return i==a?0:i>a?1:-1});return d.qy`
                <div id="more_pages" class="p-4 dd-dashboard-style-refresh">
                    ${this._actionError?d.qy`
                      <div class="overview-state overview-error">
                        ${this._actionError.message||this._actionError}
                      </div>
                    `:""}
                    <div class="flex justify-between mb-2">
                    <div>
                        <h2 class="font-semibold text-lg capitalize">
                        ${(0,g.A)(this._hass,"more.title_plural")}
                        </h2>
                        <span class="text-gray-700">
                        ${t.length} ${(0,g.A)(this._hass,"more.pages")}
                        </span>
                    </div>
                    <div>
                      ${this._hass.user.is_admin?d.qy`
                        <ha-dropdown
                        class="ha-icon-overflow-menu-overflow"
                        corner="BOTTOM_END"
                        absolute
                        >
                          <ha-icon-button
                              label=${this._hass.localize("ui.common.overflow_menu")}
                              .path=${s.TdJ}
                              slot="trigger"
                          ></ha-icon-button>
                            <ha-list-item
                                graphic="icon"
                                @click=${this._handleCreateMorePageClicked}
                            >
                                <div slot="graphic">
                                  <ha-svg-icon .path=${s.noC}></ha-svg-icon>
                                </div>
                                ${(0,g.A)(this._hass,"more.create")}
                            </ha-list-item>
                            ${this.editMode?d.qy`
                            <ha-list-item
                              graphic="icon"
                              .value=${!1}
                              @click=${this._handleEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${s.CZ3}></ha-svg-icon>
                              </div>
                              ${(0,g.A)(this._hass,"global.disable_edit_mode")}
                            </ha-list-item>`:d.qy`
                            <ha-list-item
                              graphic="icon"
                              .value=${!0}
                              @click=${this._handleEditModeClicked}
                            >
                              <div slot="graphic">
                                <ha-svg-icon .path=${s.CZ3}></ha-svg-icon>
                              </div>
                              ${(0,g.A)(this._hass,"global.enable_edit_mode")}
                            </ha-list-item>
                            `}
                        </ha-dropdown>
                        `:""}
                    </div>
                    </div>

                    ${this._sortError?d.qy`
                      <div class="sort-error" role="alert">
                        ${this._sortError.message||this._sortError}
                      </div>
                    `:""}
                    ${u(this._gridRevision,d.qy`
                      <div class="grid grid-cols-2 dd-overview-grid md-grid-cols-3 xl-grid-cols-4 gap-4 sortable">
                        ${t.map(([e,t])=>this._renderPageButton(e,t))}
                      </div>
                    `)}
                </div>
            `}static get styles(){return[d.AH`
            :host {
              display: block;
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .dd-overview-grid {
              box-sizing: border-box;
              width: 100%;
              min-width: 0;
              max-width: 100%;
            }
            .sort-error {
              margin: 0 0 1rem;
              padding: .75rem;
              border-radius: .25rem;
              color: var(--error-color);
              background: color-mix(in srgb, var(--error-color) 10%, transparent);
            }
            @media (max-width: 599px) {
              #more_pages {
                box-sizing: border-box;
                max-width: 100%;
              }
              .grid.dd-overview-grid > * {
                min-width: 0;
                max-width: 100%;
              }
            }
            .sortable-move {
              cursor: -webkit-grabbing;
              cursor: grab;
              margin: auto 0;
            }
            .overview-state {
              display: flex;
              min-height: 10rem;
              align-items: center;
              justify-content: center;
              color: var(--secondary-text-color);
            }
            .overview-error {
              color: var(--error-color);
            }
            .card-actions-multiple {
              display: flex;
              justify-content: space-between;
              padding: 0.25rem 0.5rem;
            }
            .more-page-button .info ha-icon, .ha-icon ha-icon {
              display: inline-block;
              margin: auto;
              --mdc-icon-size: 100% !important;
              --iron-icon-width: 100% !important;
              --iron-icon-height: 100% !important;
            }
            #badges {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--primary-text-color);
            }
            .more-page-button {
              cursor: pointer;
              background: var( --ha-card-background, var(--card-background-color, white) );
              border-radius: var(--ha-card-border-radius, 4px);
              box-shadow: var( --ha-card-box-shadow, 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12) );
              color: var(--test-primary-text-color, var(--primary-text-color));
            }
            .info-badge {
              /*background-color: var(--sidebar-icon-color);
              color: var( --ha-card-background, var(--card-background-color, white) );*/
              background-color: var(--secondary-background-color);
            }
            /*styling tailwind dwains version*/
            *, ::after, ::before {
              box-sizing: border-box;
            }
            h1,h2,h3 {
              margin: 0;
            }
            h3 {
              font-size: 1em;
            }
            .absolute {
              position: absolute
            }
            .break-words {
              overflow-wrap: break-word;
            }
            .relative {
                position: relative
            }
            .sticky {
                position: -webkit-sticky;
                position: sticky
            }
            .top-0 {
                top: 0px
            }
            .bottom-0 {
                bottom: 0px
            }
            .z-30 {
                z-index: 30
            }
            .col-span-1 {
                grid-column: span 1 / span 1
            }
            .col-span-2 {
                grid-column: span 2 / span 2
            }
            .row-span-1 {
                grid-row: span 1 / span 1
            }
            .row-span-2 {
                grid-row: span 2 / span 2
            }
            .my-4 {
                margin-top: 1rem;
                margin-bottom: 1rem
            }
            .mx-auto {
              margin-left: auto;
              margin-right: auto
            }
            .mb-2 {
                margin-bottom: 0.5rem
            }
            .mb-4 {
                margin-bottom: 1rem
            }
            .mt-4 {
                margin-top: 1rem
            }
            .mr-0\.5 {
                margin-right: 0.125rem
            }
            .mr-0 {
                margin-right: 0px
            }
            .mb-12 {
                margin-bottom: 3rem
            }
            .mb-5 {
                margin-bottom: 1.25rem
            }
            .mb-16 {
                margin-bottom: 4rem
            }
            .ml-4 {
                margin-left: 1rem
            }
            .block {
                display: block
            }
            .inline-block {
                display: inline-block
            }
            .flex {
                display: flex
            }
            .inline-flex {
                display: inline-flex
            }
            .grid {
                display: grid
            }
            .hidden {
                display: none
            }
            .h-6 {
                height: 1.5rem
            }
            .h-44 {
                height: 11rem
            }
            .h-full {
                height: 100%
            }
            .h-14 {
                height: 3.5rem
            }
            .h-8 {
                height: 2rem
            }
            .w-full {
                width: 100%
            }
            .w-6 {
                width: 1.5rem
            }
            .w-14 {
                width: 3.5rem
            }
            .w-8 {
                width: 2rem
            }
            .w-12 {
              width: 3rem
            }
            .cursor-pointer {
                cursor: pointer
            }
            .grid-flow-row-dense {
                grid-auto-flow: row dense
            }
            .grid-cols-1 {
                grid-template-columns: repeat(1, minmax(0, 1fr))
            }
            .grid-cols-2 {
                grid-template-columns: repeat(2, minmax(0, 1fr))
            }
            .flex-wrap {
                flex-wrap: wrap
            }
            .content-between {
                align-content: space-between
            }
            .items-center {
                align-items: center
            }
            .justify-between {
                justify-content: space-between
            }
            .gap-4 {
                gap: 1rem
            }
            .space-y-0.5 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0.125rem * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0.125rem * var(--tw-space-y-reverse))
            }
            .space-y-0 > :not([hidden]) ~ :not([hidden]) {
                --tw-space-y-reverse: 0;
                margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
                margin-bottom: calc(0px * var(--tw-space-y-reverse))
            }
            .rounded {
                border-radius: 0.25rem
            }
            .rounded-md {
                border-radius: 0.375rem
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .rounded-lg {
              border-radius: 0.5rem
            }
            .border-2 {
                border-width: 2px
            }
            .border-dashed {
                border-style: dashed
            }
            .border-gray-300 {
                --tw-border-opacity: 1;
                border-color: rgb(209 213 219 / var(--tw-border-opacity))
            }
            .bg-gray-800 {
                --tw-bg-opacity: 1;
                background-color: rgb(31 41 55 / var(--tw-bg-opacity))
            }
            .bg-opacity-50 {
                --tw-bg-opacity: 0.5
            }
            .p-2 {
              padding: 0.5rem;
            }
            .p-4 {
                padding: 1rem
            }
            .p-1 {
                padding: 0.25rem
            }
            .p-3 {
                padding: 0.75rem
            }
            .px-1 {
                padding-left: 0.25rem;
                padding-right: 0.25rem
            }
            .p-12 {
              padding: 3rem
            }
            .py-0\.5 {
                padding-top: 0.125rem;
                padding-bottom: 0.125rem
            }
            .py-0 {
                padding-top: 0px;
                padding-bottom: 0px
            }
            .py-1 {
              padding-top: 0.25rem;
              padding-bottom: 0.25rem
            }
            .px-2 {
              padding-left: 0.5rem;
              padding-right: 0.5rem
            }
            .text-center {
              text-align: center
            }
            .text-right {
                text-align: right
            }
            .text-xl {
                font-size: 1.5rem;
                line-height: 2rem
            }
            .text-lg {
                font-size: 1.125rem;
                line-height: 1.75rem
            }
            .text-sm {
                font-size: 0.875rem;
                line-height: 1.25rem
            }
            .text-xs {
                font-size: 0.75rem;
                line-height: 1rem
            }
            .font-semibold {
                font-weight: 600
            }
            .font-medium {
                font-weight: 500
            }
            .capitalize {
                text-transform: capitalize
            }
            .text-gray {
                color: var(--paper-item-body-secondary-color, var(--secondary-text-color));
            }
            .text-white {
                --tw-text-opacity: 1;
                color: rgb(255 255 255 / var(--tw-text-opacity))
            }
            @media (min-width: 768px) {
                .md-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1024px) {
                .lg-col-span-1 {
                    grid-column: span 1 / span 1
                }
                .lg-col-span-3 {
                    grid-column: span 3 / span 3
                }
                .lg-col-span-2 {
                    grid-column: span 2 / span 2
                }
                .lg-row-span-1 {
                    grid-row: span 1 / span 1
                }
                .lg-row-span-3 {
                    grid-row: span 3 / span 3
                }
                .lg-row-span-2 {
                    grid-row: span 2 / span 2
                }
                .lg-block {
                    display: block
                }
                .lg-hidden {
                    display: none
                }
                .lg-w-1-2 {
                    width: 50%
                }
                .lg-grid-cols-2 {
                    grid-template-columns: repeat(2, minmax(0, 1fr))
                }
                .lg-grid-cols-3 {
                    grid-template-columns: repeat(3, minmax(0, 1fr))
                }
            }
            @media (min-width: 1536px) {
              .xl-col-span-1 {
                  grid-column: span 1 / span 1
              }
              .xl-col-span-4 {
                  grid-column: span 4 / span 4
              }
              .xl-col-span-2 {
                  grid-column: span 2 / span 2
              }
              .xl-row-span-1 {
                  grid-row: span 1 / span 1
              }
              .xl-row-span-4 {
                  grid-row: span 4 / span 4
              }
              .xl-row-span-2 {
                  grid-row: span 2 / span 2
              }
              .xl-w-1-3 {
                  width: 33.333333%
              }
              .xl-w-2-3 {
                  width: 66.666667%
              }
              .xl-grid-cols-4 {
                  grid-template-columns: repeat(4, minmax(0, 1fr))
              }
          }
          `,(0,f.X5)(d.AH)]}}E("more-pages-card",z)},5216(e,t,i){"use strict";var a=i(6684),r=i(9774),o=i(6205),n=i(9177),s=i(3601);const{EventSubscriptionOwner:d}=i(7450),{EventListenerOwner:l}=i(1991),{ReloadableLoadOwner:c}=i(1786),{hassConnectionIdentity:h,hasHassConnectionChanged:p}=i(4776),{websocketReadStore:u}=i(9012),{defineDwainsElement:m}=i(572),{MORE_PAGE_METADATA_CHANGED_EVENT:g,MORE_PAGE_SAVED_EVENT:_}=i(9661),f=new WeakMap,b=new WeakMap;function v(e){const t=e?.connection||e;return!t||"object"!=typeof t&&"function"!=typeof t?void 0:t}class y extends a.WF{static get styles(){return[a.AH`
        :host {
            width: -webkit-fill-available;
            display: flex;
            flex-direction: column;
            background-color: var( --ha-card-background, var(--card-background-color, white) );
            height: auto;
            top: 0;
            z-index: 8;
            position: sticky;
        }
        .mainNavItems {
            flex-grow: 1;
            display: flex;
            align-items: stretch;
            padding: 0.25rem;
            justify-content: space-between;
            overflow-x: scroll;
            scrollbar-width: none;
        }
        .mainNavItems::-webkit-scrollbar {
            height: 0px;
        }
        .mainNavItems::before, .mainNavItems::after {
            content: ''; /* Insert space before the first item and after the last one */
        }
        .mainNavItems div {
            padding: 0.5rem;
            color: var(--primary-text-color);
            position: relative;
            text-align: center;
            display: grid;
            cursor: pointer;
        }
        .mainNavItems div span {
            text-transform: capitalize;
        }
        .mainNavItems div.active {
            color: var(--sidebar-selected-icon-color);
        }

        .dwains-dashboard-nav {
            display: flex;
        }
        .toggle-sidebar {
            padding: 1.35rem;
            background: var(--secondary-background-color);
            display: none;
            cursor: pointer;
        }
        .sidebar-always_hidden {
            /* User has the sidebar hidden so always show the button */
            display: block !important;
        }
        @media only screen and (max-width: 768px) {
            :host {
                position: relative;
                bottom: auto;
                top: auto;
                padding: 0 env(safe-area-inset-right) env(safe-area-inset-bottom) env(safe-area-inset-left);
            }
        }
        @media (max-width: 871px) {
            .mainNavItems div span {
                display: none;
            }
            .toggle-sidebar {
                display: block;
                padding: 0.75rem;
            }
        }
        `,(0,s.YV)(a.AH)]}static get properties(){return{_hass:{type:Object},config:{type:Object},currentPath:{type:String},configuration:{type:Object},isLoading:{type:Boolean}}}set hass(e){const t=p(this._hass,e);this._hass=e;const i=f.get(v(e));i&&(this.configuration=i,this.isLoading=!1),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect(),this.isLoading=!0),this.isConnected&&(this.isLoading||t)&&this._startNavigation(t)}constructor(){super(),this.currentPath=document.location.pathname,this.isLoading=!0,this._subscriptions=new d,this._listeners=new l,this._loads=new c(e=>this._loadConfiguration(e)),this._navigationGeneration=0,this._morePageMetadataChanged=e=>{const t=e.detail?.page;if(!t?.foldername)return;const i=v(this._hass);if(i&&"boolean"==typeof t.show_in_navbar){let e=b.get(i);e||(e=new Map,b.set(i,e)),e.set(t.foldername,t.show_in_navbar)}const a=this.configuration||{devices:{},more_pages:{}};this.configuration={...a,more_pages:{...a.more_pages||{},[t.foldername]:{...a.more_pages?.[t.foldername]||{},...t}}},i&&f.set(i,this.configuration),this.isLoading=!1,this.requestUpdate()},this._routeChanged=()=>{this.currentPath=`${document.location.pathname}${window.location.hash||""}`,this.requestUpdate()}}connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._listeners.listen("location-changed",window,"location-changed",this._routeChanged),this._listeners.listen("popstate",window,"popstate",this._routeChanged),this._listeners.listen("more-page-metadata",window,g,this._morePageMetadataChanged),this._listeners.listen("more-page-saved",window,_,this._morePageMetadataChanged),this._listeners.connect(),this._hass&&this._startNavigation()}disconnectedCallback(){super.disconnectedCallback(),this._subscriptions.disconnect(),this._listeners.disconnect(),this._navigationGeneration+=1,this._loads.invalidate(),this._navigationPromise=void 0,this._navigationConnection=void 0,this.isLoading=!0}_startNavigation(e=!1){const t=h(this._hass);if(this._navigationConnection===t&&this._navigationPromise)return this._navigationPromise;const i=++this._navigationGeneration;this._navigationConnection=t;const a=(e?this._loads.reload():this.loadConfig()).then(()=>{if(this.isConnected&&i===this._navigationGeneration&&h(this._hass)===t)return this._subscribeNavigation()}).catch(e=>{console.error("Error loading navigation:",e),i===this._navigationGeneration&&(this.isLoading=!1)}).finally(()=>{this._navigationPromise===a&&(this._navigationPromise=void 0)});return this._navigationPromise=a,a}loadConfig(){return this._loads.load()}async _loadConfiguration({isCurrent:e=()=>!0}={}){const t=this._hass,i=h(t),a=await u.readPreferred(t,{type:"dwains_dashboard/navigation/get"},{type:"dwains_dashboard/configuration/get"},{capability:"dashboard-read-slices"});if(!e()||h(this._hass)!==i)return;let r=a;const o=v(t),n=o&&b.get(o);for(const[e,t]of n||[]){const i=r.more_pages?.[e]||{};i.show_in_navbar===t?n.delete(e):r={...r,more_pages:{...r.more_pages||{},[e]:{...i,foldername:e,show_in_navbar:t}}}}n&&!n.size&&b.delete(o),this.configuration=r,o&&f.set(o,r),this.isLoading=!1,this.requestUpdate()}_subscribeNavigation(){return this._subscriptions.subscribeEvent("navigation",this._hass,"dwains_dashboard_navigation_card_reload",()=>{u.invalidate(this._hass,{type:"dwains_dashboard/configuration/get"}),u.invalidate(this._hass,{type:"dwains_dashboard/navigation/get"}),this._reloadCard().catch(e=>{console.error("Error reloading navigation:",e)})})}async _reloadCard(){console.log("Reloading navigation card"),await this._loads.reload(),this.requestUpdate()}_menuClick(e){const t=e.currentTarget.path;(0,r.navigate)(window,t),this.currentPath=t,this.requestUpdate()}_toggleSidebarClick(){(0,o.fireEvent)("hass-toggle-menu",{open:!0},this)}render(){const e=this.configuration||{devices:{},more_pages:{}},t=Object.entries(e.more_pages||{}).sort(function(e,t){let i=e[1]&&e[1].sort_order?e[1].sort_order:99,a=t[1]&&t[1].sort_order?t[1].sort_order:99;return i==a?0:i>a?1:-1});return a.qy`
            <div class="dwains-dashboard-nav">
                <div
                    @click=${this._toggleSidebarClick}
                    class="toggle-sidebar sidebar-${this._hass.dockedSidebar}"
                >
                    <ha-icon icon="${"mdi:menu"}"></ha-icon>
                </div>
                <div class="mainNavItems">
                    <div
                        class="${"/dwains-dashboard/home"==document.location.pathname?"active":""}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/home"}
                    >
                        <ha-icon icon="${"mdi:home"}"></ha-icon>
                        <span>${(0,n.A)(this._hass,"home.title")}</span>
                    </div>
                    <div
                        class="${"/dwains-dashboard/devices"!=document.location.pathname||window.location.hash?"":"active"}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/devices"}
                    >
                        <ha-icon icon="${"mdi:format-list-bulleted-type"}"></ha-icon>
                        <span>${(0,n.A)(this._hass,"device.title_plural")}</span>
                    </div>
                    ${Object.entries(e.devices||{}).map(([e,t])=>a.qy`
                            ${t.show_in_navbar?a.qy`
                                <div
                                    class="${"/dwains-dashboard/devices"==document.location.pathname&&window.location.hash=="#"+e?"active":""}"
                                    @click=${this._menuClick}
                                    .path=${"/dwains-dashboard/devices#"+e}
                                >
                                    <ha-icon icon="${t.icon}"></ha-icon>
                                    <span>${(0,n.A)(this._hass,"device."+e)}</span>
                                </div>`:""}
                        `)}
                    ${t.map(([e,t])=>a.qy`
                            ${t.show_in_navbar?a.qy`
                                <div
                                    class="${document.location.pathname=="/dwains-dashboard/more_page_"+e?"active":""}"
                                    @click=${this._menuClick}
                                    .path=${"/dwains-dashboard/more_page_"+e}
                                >
                                    <ha-icon icon="${t.icon}"></ha-icon>
                                    <span>${t.name}</span>
                                </div>`:""}
                        `)}
                    <div
                        class="${"/dwains-dashboard/more_page"==document.location.pathname?"active":""}"
                        @click=${this._menuClick}
                        .path=${"/dwains-dashboard/more_page"}
                    >
                        <ha-icon icon="${"mdi:view-grid-outline"}"></ha-icon>
                        <span>${(0,n.A)(this._hass,"more.title")}</span>
                    </div>
                </div>
            </div>
        `}}m("dwainsboard-navigation-card",y),window.dispatchEvent(new CustomEvent("dwains-dashboard-runtime-ready"))},7863(e,t,i){"use strict";var a=i(6684);const{EventSubscriptionOwner:r}=i(7450),{ReloadableLoadOwner:o}=i(1786),{hassConnectionIdentity:n,hasHassConnectionChanged:s}=i(4776),{defineDwainsElement:d}=i(572),{websocketReadStore:l}=i(9012),c=Object.freeze({type:"dwains_dashboard_notification/get"});class h extends a.WF{static styles=a.AH`
    ha-card {
      box-shadow: none;
      background: transparent;
      color: var(--primary-text-color);
    }
    .notification-button ha-icon {
      display: inline-block;
      margin: auto;
      --mdc-icon-size: 100% !important;
      --iron-icon-width: 100% !important;
      --iron-icon-height: 100% !important;
      cursor: pointer;
      opacity: 0.8;
    }
    .notification-button ha-icon:hover {
      opacity: 1.0;
    }
    .w-6 {
      width: 1.5rem;
    }
    .h-6 {
      height: 1.5rem;
    }
    .notification-button {
      background: var(--ha-card-background, var(--card-background-color, white));
      border-radius: var(--ha-card-border-radius, 4px);
      box-shadow: var(--ha-card-box-shadow, 0 2px 1px -1px rgba(0,0,0,0.2), 0 1px 1px 0 rgba(0,0,0,0.14), 0 1px 3px 0 rgba(0,0,0,0.12));
      color: var(--primary-text-color);
      padding: 1rem;
      line-height: 1.25rem;
      margin: 0.25rem 0;
    }
    .sub {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .text {
      font-size: 0.875rem;
      line-height: 1.25rem;
      flex: 1 1 0%;
      width: 0px;
      font-weight: 500;
      text-transform: capitalize;
    }
    .close {
      flex-shrink: 0;
    }
  `;static get properties(){return{_hass:{},_config:{},notifications:{type:Array}}}setConfig(e){this.config=e}set hass(e){const t=s(this._hass,e);this._hass=e,this.requestUpdate(),t&&this.isConnected&&(this._subscriptions.disconnect(),this._subscriptions.connect(),this._notificationHass=void 0),this._startNotifications(t)}constructor(){super(),this.notifications=[],this._subscriptions=new r,this._loads=new o(e=>this._loadNotifications(e))}connectedCallback(){super.connectedCallback(),this._subscriptions.connect(),this._startNotifications()}_startNotifications(e=!1){const t=n(this._hass);this.isConnected&&this._hass&&this._notificationHass!==t&&(this._hass,this._notificationHass=t,this._subscribeNotifications().catch(e=>{this._notificationHass===t&&(this._notificationHass=void 0),console.error("Failed to subscribe to notification updates",e)}),(e?this._loads.reload():this._loads.load()).catch(e=>{console.error("Failed to load notifications",e)}))}async _subscribeNotifications(){await this._subscriptions.subscribeEvent("notifications",this._hass,"dwains_dashboard_notifications_updated",()=>{this._notificationsUpdated().catch(e=>{console.error("Failed to refresh notifications",e)})})}disconnectedCallback(){super.disconnectedCallback(),this._notificationHass=void 0,l.invalidate(this._hass,c),this._loads.invalidate(),this._subscriptions.disconnect()}_notificationsUpdated(){return l.invalidate(this._hass,c),this._loads.reload()}async _loadNotifications({isCurrent:e=()=>!0}={}){const t=this._hass,i=n(t),a=await l.read(t,c)||[];e()&&this.isConnected&&n(this._hass)===i&&(this.notifications=a,this.requestUpdate())}_handleDismiss(e){const t=this._hass.callService("dwains_dashboard","notification_dismiss",{notification_id:e});Promise.resolve(t).catch(e=>{console.error("Failed to dismiss Dwains Dashboard notification",e)}),this._notificationsUpdated().catch(e=>{console.error("Failed to refresh notifications after dismiss",e)})}_renderNotification(e){return a.qy`
      <div class="notification-button">
        <div class="sub">
          <div class="text">${e.message}</div>
          <ha-icon
            class="h-6 w-6 close"
            icon="mdi:close"
            @click=${()=>this._handleDismiss(e.notification_id)}>
          </ha-icon>
        </div>
      </div>
    `}render(){return this.notifications.length?a.qy`
      <ha-card>
        <div id="notifications">
          ${this.notifications.map(e=>this._renderNotification(e))}
        </div>
      </ha-card>
    `:a.qy``}}d("dwains-notification-card",h)},7377(e,t,i){"use strict";i.d(t,{d:()=>_});var a=i(7382),r=i(6205),o=i(6684),n=i(8089),s=i(3601);const{loadCardHelpers:d}=i(3266),{CardBuildOwner:l}=i(3931),{popupHistoryController:c}=i(1316),{defineOwnedElement:h}=i(572),{closeCardToolsPopup:p,findCardToolsPopup:u,findPopupRoot:m,mountCardToolsPopup:g}=i(3377);async function _(e,t,i=!1,p={},f=!1,b=!0){if(!customElements.get("card-tools-popup")){class e extends o.WF{constructor(){super(),this._cardBuilds=new l({loadHelpers:d,createCard:n.Kq})}static get properties(){return{open:{},large:{reflect:!0,type:Boolean},hass:{}}}updated(e){e.has("hass")&&this.card&&(this.card.hass=this.hass)}closeDialog(){this._cardBuilds.invalidate(),this.open=!1,c.markClosed()}async _makeCard(){this.card=null;const e=await this._cardBuilds.build(this._card,this.hass);e&&(this.card=e,this.requestUpdate())}disconnectedCallback(){super.disconnectedCallback(),this._cardBuilds.invalidate()}async _applyStyles(){let e=await(0,r.selectTree)(this,"$ ha-dialog");customElements.whenDefined("card-mod").then(async()=>{if(!e)return;const t=window.cardMod||customElements.get("card-mod");t&&"function"==typeof t.applyToElement&&(t.applyToElement.length<=3?t.applyToElement(e,this._style,{config:this._card,tag:"more-info"}):t.applyToElement(e,"more-info",this._style,{config:this._card},[],!1))})}async showDialog(e,t,i=!1,a={},r=!1){this.title=e,this._card=t,this.large=i,this._style=a,this.fullscreen=!!r,this._makeCard(),await this.updateComplete,this.open=!0,await this._applyStyles()}_enlarge(){this.large=!this.large}render(){return this.open?o.qy`
            <ha-dialog
              open
              @closed=${this.closeDialog}
              .heading=${!0}
              hideActions
              @ll-rebuild=${this._makeCard}
            >
            ${this.fullscreen?o.qy`<div slot="heading"></div>`:o.qy`
                <app-toolbar slot="heading">
                  <ha-icon-button
                    label=${"dismiss"}
                    dialogAction="cancel"
                  >
                    <ha-icon
                      .icon=${"mdi:close"}
                    ></ha-icon>
                  </ha-icon-button>
                  <div class="main-title" @click=${this._enlarge}>
                    ${this.title}
                  </div>
                </app-toolbar>
              `}
              <div class="content">
                ${this.card}
              </div>
            </ha-dialog>
          `:o.qy``}static get styles(){return[o.AH`
          ha-dialog {
            --mdc-dialog-min-width: 400px;
            --mdc-dialog-max-width: min(95vw, 960px);
            --mdc-dialog-heading-ink-color: var(--primary-text-color);
            --mdc-dialog-content-ink-color: var(--primary-text-color);
            --justify-action-buttons: space-between;
          }
          @media all and (max-width: 450px), all and (max-height: 500px) {
            ha-dialog {
              --mdc-dialog-min-width: 100vw;
              --mdc-dialog-max-width: 100vw;
              --mdc-dialog-min-height: 100%;
              --mdc-dialog-max-height: 100%;
              --mdc-shape-medium: 0px;
              --vertial-align-dialog: flex-end;
            }
          }

          app-toolbar {
            flex-shrink: 0;
            color: var(--primary-text-color);
            // background-color: var(--secondary-background-color);
            display: flex;
            flex-direction: row;
            align-items: flex-start;
          }

          .main-title {
            flex: 1;
            font-size: 22px;
            line-height: 28px;
            font-weight: 400;
            padding: 14px 4px 10px 4px;
            min-width: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .content {
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            min-width: 0;
            margin: 0;
            overflow-x: hidden;
          }

          .content > * {
            display: block;
            box-sizing: border-box;
            width: 100%;
            max-width: 100%;
            min-width: 0;
          }

          @media all and (max-width: 450px), all and (max-height: 500px) {
            app-toolbar {
              background-color: var(--app-header-background-color);
              color: var(--app-header-text-color, white);
            }
          }

          @media all and (min-width: 451px) and (min-height: 501px) {
            ha-dialog {
              --mdc-dialog-max-width: 90vw;
            }

            .content {
              width: min(600px, calc(90vw - 48px));
            }
            :host([large]) .content {
              width: calc(90vw - 48px);
            }

            :host([large]) app-toolbar {
              max-width: calc(90vw - 32px);
            }
          }
          `,(0,s.yw)(o.AH)]}}h("card-tools-popup",e)}const v=m();if(!v)return;let y=await u({root:v,selectTree:r.selectTree});(y||(y=document.createElement("card-tools-popup"),g({root:v,popup:y,provideHass:a.zo})))&&(c.connect(y,e=>{if(!e)return;const{title:t,card:i,large:a,style:r,fullscreen:o}=e;return _(t,i,a,r,o,!1)}),b&&c.recordOpen({title:e,card:t,large:i,style:p,fullscreen:f}),y.showDialog(e,t,i,p,f))}},4853(e,t,i){const{reportRuntimeWindowError:a,reportUnhandledRejection:r}=i(6653),{iconDbRecovery:o}=i(5420),{registerLazyCard:n}=i(6391),{getDwainsRuntimeState:s}=i(624);!function(){"use strict";const e=s();e.bundleLoaded?console.info("Dwains bundle already loaded; skipping second init"):(e.bundleLoaded=!0,o.start(),n(),window.addEventListener("error",a,!0),window.addEventListener("unhandledrejection",r),console.log("Dwains runtime support loaded"))}()},2546(e){"use strict";e.exports={averageEntityStates:function(e,t,i,{isAvailable:a=()=>!0}={}){const r=e?.[t];if(!r)return;let o;const n=r.filter(e=>!i||e.attributes.device_class===i).filter(e=>!(!a(e)||!e.attributes.unit_of_measurement||Number.isNaN(Number(e.state))||(o?e.attributes.unit_of_measurement!==o:(o=e.attributes.unit_of_measurement,0))));if(!n.length)return;const s=n.reduce((e,t)=>e+Number(t.state),0);return`${Math.round(s/n.length*10)/10}${o}`},countActiveEntities:function(e,t,i,{unavailableStates:a,statesOff:r}){const o=e?.[t];if(o)return o.filter(e=>!i||e.attributes.device_class===i).filter(e=>!a.includes(e.state)&&!r.includes(e.state)).length},groupEntityStatesByDomain:function(e,{states:t,excludedEntities:i={},domainGroups:a,deviceClasses:r,sensorDeviceClasses:o}){const n={},s=new Set(Object.values(a).flat());for(const d of e){if(i[d]?.excluded||i[d]?.hidden_in_area)continue;const e=d.indexOf(".");if(-1===e)continue;const l=d.slice(0,e);if(!s.has(l))continue;const c=t[d];if(!c)continue;const h=a.sensor.includes(l)||a.alert.includes(l)||a.cover.includes(l),p=a.sensor.includes(l)?o:r[l];h&&!p.includes(c.attributes.device_class||"")||(n[l]||=[]).push(c)}return n},isEntityHiddenInArea:function(e){return!0===e?.hidden_in_area},localizedClimateState:function(e,t,{hass:i,unavailableStates:a,statesOff:r}){const o=e?.[t];if(!o)return;const n=[];for(const e of o){const t=e.attributes.hvac_action,o=e.attributes.temperature,s=o?` (${o}${i.config.unit_system.temperature})`:"";t&&"idle"!==t?n.push(i.localize(`state_attributes.climate.hvac_action.${t}`)+s):t||a.includes(e.state)||r.includes(e.state)||n.push(i.localize(`component.climate.state._.${e.state}`)+s)}return n.join(", ")}}},1991(e){"use strict";e.exports={EventListenerOwner:class{constructor(){this._connected=!1,this._entries=new Map}listen(e,t,i,a,r){if(!e)throw new TypeError("An event-listener key is required");if(!t||"function"!=typeof t.addEventListener||"function"!=typeof t.removeEventListener)throw new TypeError("An EventTarget-compatible listener host is required");if("function"!=typeof a)throw new TypeError("An event-listener callback is required");const o=this._entries.get(e);if(o&&o.target===t&&o.type===i&&o.listener===a&&o.options===r)return!1;o?.attached&&this._detach(o);const n={target:t,type:i,listener:a,options:r,attached:!1};return this._connected&&this._attach(n),this._entries.set(e,n),!0}connect(){if(this._connected)return;const e=[];try{for(const t of this._entries.values())this._attach(t),e.push(t)}catch(t){const i=[t];for(const t of e.reverse())try{this._detach(t)}catch(e){i.push(e)}if(i.length>1)throw new AggregateError(i,"Failed to attach event listeners");throw t}this._connected=!0}disconnect(){if(!this._connected)return;const e=[];for(const t of this._entries.values())try{this._detach(t)}catch(t){e.push(t)}if(this._connected=!1,1===e.length)throw e[0];if(e.length>1)throw new AggregateError(e,"Failed to detach event listeners")}_attach(e){e.attached||(e.target.addEventListener(e.type,e.listener,e.options),e.attached=!0)}_detach(e){e.attached&&(e.target.removeEventListener(e.type,e.listener,e.options),e.attached=!1)}}}},7450(e){"use strict";e.exports={EventSubscriptionOwner:class{constructor(e=(e,t)=>console.error(e,t)){this._reportError=e,this._connected=!1,this._entries=new Map}connect(){this._connected=!0}subscribe(e,t){const i=this._entries.get(e);if(i)return i.ready;const a={};return a.ready=Promise.resolve().then(()=>t()).then(t=>{if("function"!=typeof t)throw new TypeError(`Subscription ${e} did not return an unsubscribe function`);return this._connected&&this._entries.get(e)===a?(a.unsubscribe=t,t):this._unsubscribe(e,t).then(()=>{})}).catch(t=>{throw this._entries.get(e)===a&&this._entries.delete(e),t}),this._entries.set(e,a),a.ready}subscribeEvent(e,t,i,a){return this.subscribe(e,()=>{const r=t?.connection?.subscribeEvents;if("function"!=typeof r)throw new TypeError(`Subscription ${e} requires a Home Assistant event connection`);if("function"!=typeof a)throw new TypeError(`Subscription ${e} requires an event listener`);return r.call(t.connection,a,i)})}disconnect(){this._connected=!1;const e=[...this._entries.entries()];this._entries.clear();for(const[t,i]of e)i.unsubscribe&&this._unsubscribe(t,i.unsubscribe)}_unsubscribe(e,t){return Promise.resolve().then(()=>t()).catch(t=>{this._reportError(`Failed to unsubscribe ${e}`,t)})}}}},9774(e,t,i){"use strict";const{dashboardRouteState:a}=i(5704),r=new WeakMap;e.exports={applyThemesOnElement:function(e,t,i,a=!1){if(!e?.style||!t?.themes)return!1;let o=t.default_theme;("default"===i||i&&t.themes[i])&&(o=i);const n="default"===o?{}:t.themes[o]||{},s=r.get(e)||new Set,d=new Set;for(const t of Object.keys(n)){const i=t.startsWith("--")?t:`--${t}`;e.style.setProperty(i,n[t]),d.add(i)}for(const t of s)d.has(t)||e.style.removeProperty(t);if(r.set(e,d),a&&"undefined"!=typeof document){const e=document.querySelector('meta[name="theme-color"]');if(e){e.hasAttribute("default-content")||e.setAttribute("default-content",e.getAttribute("content"));const t=n["primary-color"]||n["--primary-color"]||e.getAttribute("default-content");t&&e.setAttribute("content",t)}}return!0},computeDomain:function(e){const t=e.indexOf(".");return-1===t?"":e.slice(0,t)},navigate:function(e,t,i=!1){return a.navigate(t,{replace:i})}}},7382(e,t,i){"use strict";i.d(t,{mo:()=>d,zo:()=>l});const{resolveHass:a}=i(4525),{ensureLovelaceLoaded:r}=i(3865),{findHcMain:o,findHomeAssistantHost:n,findLovelaceView:s}=i(2708);function d(){return a()}function l(e){const t=o(),i=n(),a=t||i;if(a&&"function"==typeof a.provideHass)return a.provideHass(e);const r=d();return e&&r&&(e.hass=r),e}},4776(e){"use strict";function t(e){return e?.connection??e}e.exports={hassConnectionIdentity:t,hasHassConnectionChanged:function(e,i){return Boolean(e&&t(e)!==t(i))}}},4525(e,t,i){"use strict";const{findHcMain:a,findHomeAssistantHost:r}=i(2708);e.exports={resolveHass:function({windowObject:e=window,documentObject:t=document,reportError:i=(e,t)=>console.error(e,t)}={}){try{const i={rethrow:!0},o=r(t,i);if(o?.hass)return o.hass;const n=a(t,i);return n?.hass?n.hass:o?.__hass||e.hass}catch(e){return void i("Failed to resolve the Home Assistant client",e)}}}},8089(e,t,i){"use strict";i.d(t,{Hg:()=>m,Kq:()=>h,fs:()=>p});var a=i(6205),r=i(9774);const{isInvalidDwainsCardElement:o}=i(3301),{defineDwainsElement:n}=i(572),{closeCardToolsPopup:s}=i(3377),{getDwainsRuntimeState:d}=i(624),l=e=>{const t=d(),i=e=>Boolean(e?.prototype&&"function"==typeof e.prototype.setConfig);return i(t.originalConstructors?.[e])&&t.originalConstructors[e]||i(t.constructors?.[e])&&t.constructors[e]||i(customElements.get(e))&&customElements.get(e)},c=async(e,t,i)=>{const a=`${e}-ddfix`;customElements.get(a)||n(a,class extends t{});const r=document.createElement(a);if(customElements.upgrade&&customElements.upgrade(r),"function"!=typeof r.setConfig)throw new TypeError(`${a}.setConfig is not a function`);return await r.setConfig(i),r};async function h(e,t,i){const a="string"==typeof t?.type?t.type.replace(/^custom:/,""):"",r=a.startsWith("dwains-")||["homepage-card","devices-card","more-page-card","more-pages-card"].includes(a);let n,s;if(r){const e=await(async e=>{let t=l(e);for(let i=0;!t&&i<100;i++)await new Promise(e=>setTimeout(e,20)),t=l(e);return t})(a);if(e)try{const r=await c(a,e,t);return i&&(r.hass=i),r}catch(e){n=e}}try{s=await e.createCardElement(t)}catch(e){n=n||e}if(o(s,r)){const e=l(a);e&&(s=await c(a,e,t))}if(!s)throw n||new Error(`Unable to create card: ${t?.type||"unknown"}`);return i&&(s.hass=i),s}async function p(){return s({selectTree:a.selectTree})}const u=e=>"string"==typeof e?e.trim():"";function m(e,t,i,a,r){const o=u(t?.entities?.[i]?.friendly_name),n=u(a?.name),s=u(r?.name_by_user),d=u(r?.name),l=u(e?.states?.[i]?.attributes?.friendly_name),c=u(a?.original_name);return o||n||s||d||l||c||i?.split(".").pop()?.replace(/_/g," ")||i}i.d(t,["FI",0,(e,t,i)=>{if("unknown"===t.state||"unavailable"===t.state)return e(`state.default.${t.state}`);if(t.attributes.unit_of_measurement)return`${t.state} ${t.attributes.unit_of_measurement}`;const a=(0,r.computeDomain)(t.entity_id);if("input_datetime"===a){let e;if(!t.attributes.has_time)return e=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day),formatDate(e,i);if(!t.attributes.has_date){const a=new Date;return e=new Date(a.getFullYear(),a.getMonth(),a.getDay(),t.attributes.hour,t.attributes.minute),formatTime(e,i)}return e=new Date(t.attributes.year,t.attributes.month-1,t.attributes.day,t.attributes.hour,t.attributes.minute),formatDateTime(e,i)}return t?.translation_key&&e(`component.${t.platform}.entity.${a}.${t.translation_key}.state.${t.state}`)||t.attributes.device_class&&e(`component.${a}.entity_component.${t.attributes.device_class}.state.${t.state}`)||e(`component.${a}.entity_component._.state.${t.state}`)||t.state}])},7584(e){"use strict";const t=["card","badgesCard","roomsCard","favoritesCard","personsCard","houseInfoCard","devicesCard","areasCard","headerCard","footerCard","header","bodyCard","servicesCard","shortcutsCard","chipsCard"];function i(e,t,i){if(e)try{e.hass=t}catch(e){i("Failed to propagate Home Assistant to a homepage child",e)}}function a(e){return e?.entity?{type:"entities",entities:[e.entity]}:Array.isArray(e?.entities)&&e.entities.length?{type:"entities",entities:e.entities}:e?.card?.entity?{type:"entities",entities:[e.card.entity]}:Array.isArray(e?.card?.entities)&&e.card.entities.length?{type:"entities",entities:e.card.entities}:{type:"entities",entities:[]}}e.exports={HOMEPAGE_CARD_KEYS:t,createHomepageCardElement:async function({helpers:e,config:t,hass:r,createCardElement:o,reportError:n=(e,t)=>console.error(e,t)}){let s;try{s=await o(e,t,r)}catch(i){n("Failed to create homepage card; using entities fallback",i),s=await o(e,a(t),r)}return r&&i(s,r,n),s},fallbackCardConfig:a,propagateHomepageHass:function(e,a,{reportError:r=(e,t)=>console.error(e,t)}={}){const o=new Set,n=e=>{e&&!o.has(e)&&(o.add(e),i(e,a,r))};for(const i of t){const t=e[i];Array.isArray(t)?t.forEach(n):n(t)}for(const t of Object.values(e)){const e=Array.isArray(t)?t:[t];for(const t of e)t&&"object"==typeof t&&("hass"in t&&n(t),n(t.card),n(t.badgesCard))}}}},8705(e){"use strict";const t=new Set(["client","enabled","disabled"]);function i(e){return e?.homepage_header||{}}function a(e,a){const r=i(e)[a]||"client";return t.has(r)?r:"client"}function r(e,t=[]){return void 0===e?[...t]:Array.isArray(e)?e:e?[e]:[]}e.exports={areaBinarySensorDeviceClasses:function(e){return r(i(e).area_binary_sensor_device_classes)},areaBinarySensorEntities:function(e){return r(i(e).area_binary_sensor_entities)},areaSensorDeviceClasses:function(e){const t=i(e);return Object.prototype.hasOwnProperty.call(t,"area_sensor_device_classes")?Array.isArray(t.area_sensor_device_classes)?t.area_sensor_device_classes:[]:["temperature","humidity"]},groupingMode:a,normalizeStringList:r,readBooleanCookie:function(e,t,i=!1){const a=e.get(t);return void 0===a?i:"false"!==a},resolveGroupingPreference:function(e,t,i){const r=a(e,t);return"enabled"===r||"disabled"!==r&&i}}},5420(e,t,i){"use strict";const{EventListenerOwner:a}=i(1991);class r{constructor({windowObject:e=("undefined"!=typeof window?window:void 0),reportError:t=(e,t)=>console.error(e,t)}={}){this._window=e,this._indexedDb=e?.indexedDB,this._reportError=t,this._listeners=new a,this._started=!1,this._reset=!1,this._rejectionHandler=e=>this._handleRejection(e)}start(){if(!this._started){this._started=!0;try{this._window&&(this._listeners.listen("unhandledrejection",this._window,"unhandledrejection",this._rejectionHandler),this._listeners.connect())}catch(e){this._reportError("Failed to install icon database recovery listener",e)}this._inspect().catch(e=>{this._reportError("Failed to inspect the Home Assistant icon database",e)})}}stop(){if(this._started){this._started=!1;try{this._listeners.disconnect()}catch(e){this._reportError("Failed to remove icon database recovery listener",e)}}}_handleRejection(e){try{const t=e?.reason;(t?.message||String(t||"")).includes("mdi-icon-store")&&this._resetDatabase()}catch(e){this._reportError("Failed to inspect an icon database rejection",e)}}_resetDatabase(){if(!this._reset){this._reset=!0;try{this._indexedDb?.deleteDatabase("hass-icon-db")}catch(e){this._reportError("Failed to reset the Home Assistant icon database",e)}}}async _inspect(){if("function"!=typeof this._indexedDb?.databases)return;const e=await this._indexedDb.databases();if(!e?.some(e=>"hass-icon-db"===e?.name))return;const t=this._indexedDb.open("hass-icon-db");t.onerror=()=>{this._reportError("Failed to open the Home Assistant icon database",t.error||new Error("IndexedDB open failed"))},t.onsuccess=()=>{try{const e=t.result,i=!e.objectStoreNames.contains("mdi-icon-store");e.close(),i&&this._resetDatabase()}catch(e){this._reportError("Failed to validate the Home Assistant icon database",e),this._resetDatabase()}}}}const o=new r;e.exports={IconDbRecovery:r,iconDbRecovery:o}},6391(e){"use strict";function t({HTMLElementBase:e,IntersectionObserverClass:t,reportError:i=(e,t)=>console.error(e,t)}){return class extends e{set eager(e){this.__eager=Boolean(e),this.__eager&&this.isConnected&&this._mount()}get eager(){return Boolean(this.__eager)}set hass(e){if(this.__latestHass=e,this.__c)try{this.__c.hass=e}catch(e){i("Failed to update the mounted lazy card",e)}}get hass(){return this.__latestHass}set cardFactory(e){this.__cardFactory!==e&&(this.__cardFactory="function"==typeof e?e:void 0,this.__mounted&&!this.__c&&this._createCard())}get cardFactory(){return this.__cardFactory}set card(e){if(this.__c!==e){if(this.__c=e,e&&void 0!==this.__latestHass)try{e.hass=this.__latestHass}catch(e){i("Failed to initialize the mounted lazy card",e)}this.__mounted&&this.isConnected&&this._replaceCard(e)}}_replaceCard(e){try{for(;this.firstChild;)this.removeChild(this.firstChild)}catch(e){i("Failed to remove the previous mounted lazy card",e)}if(e)try{this.appendChild(e)}catch(e){i("Failed to append the replacement lazy card",e)}}get card(){return this.__c}connectedCallback(){this.style.display="block",this.__mounted?this.__c?this._replaceCard(this.__c):this._createCard():this.__eager||this.hasAttribute("eager")?this._mount():(this.style.minHeight||(this.style.minHeight="48px"),!this.__io&&t&&(this.__io=new t(e=>{e.some(e=>e.isIntersecting)&&this._mount()},{rootMargin:"400px 0px"})),this.__io?this.__io.observe(this):this._mount())}disconnectedCallback(){this.__io?.disconnect()}_mount(){this.__mounted||(this.__mounted=!0,this.__io?.disconnect(),this.style.minHeight="",this.__c?this._replaceCard(this.__c):this._createCard())}async _createCard(){if(this.__c||this.__cardCreation||!this.__cardFactory)return;let e;try{e=Promise.resolve(this.__cardFactory())}catch(e){return void i("Failed to create lazy card",e)}this.__cardCreation=e;try{const t=await e;if(this.__cardCreation!==e)return;if(this.__cardCreation=void 0,this.__c)return;this.card=t}catch(t){this.__cardCreation===e&&(this.__cardCreation=void 0),i("Failed to create lazy card",t)}}}}e.exports={createLazyCardClass:t,registerLazyCard:function({registry:e=("undefined"!=typeof customElements?customElements:void 0),HTMLElementBase:i=("undefined"!=typeof HTMLElement?HTMLElement:void 0),IntersectionObserverClass:a=("undefined"!=typeof IntersectionObserver?IntersectionObserver:void 0),reportError:r=(e,t)=>console.error(e,t)}={}){if(!e||!i||e.get("dd-lazy-card"))return;const o=t({HTMLElementBase:i,IntersectionObserverClass:a,reportError:r});try{return e.define("dd-lazy-card",o),o}catch(e){return void r("Failed to register dd-lazy-card",e)}}}},9978(e,t,i){"use strict";const{fireEvent:a}=i(6205),{findLovelaceRoot:r}=i(2708);function o(e,t){return e?.config?.views?.some(e=>e?.path===t)||!1}function n(e,t=setTimeout){return new Promise(i=>t(i,e))}e.exports={hasView:o,refreshLovelaceConfig:async function({documentObject:e=("undefined"!=typeof document?document:void 0),viewPath:t,timeout:i=1e4,interval:s=100,now:d=()=>Date.now(),setTimer:l,resolveRoot:c=r,dispatchRefresh:h=e=>a("config-refresh",{},e)}={}){const p=c(e);if(!p)throw new Error("The Lovelace root is not available");const u=p.lovelace?.config;h(p);const m=d()+i;do{const e=p.lovelace;if(e?.config!==u&&(!t||o(e,t)))return e;await n(s,l)}while(d()<m);throw new Error(t?`Lovelace did not load the new view "${t}" in time`:"Lovelace did not refresh its configuration in time")}}},2708(e){"use strict";function t(e,t,{reportError:i=(e,t)=>console.error(e,t),rethrow:a=!1}={}){try{return t()}catch(t){if(a)throw t;return i(`Failed to resolve ${e}`,t),null}}function i(e){return e?.querySelector("home-assistant")||null}function a(e){return i(e)?.shadowRoot?.querySelector("home-assistant-main")||null}function r(e){return e?.querySelector("hc-main")||null}const o=[["ha-drawer partial-panel-resolver","ha-drawer"],["app-drawer-layout partial-panel-resolver","app-drawer-layout"],["partial-panel-resolver","direct-resolver"],["ha-panel-lovelace","direct-panel"]];function n(e){const t=a(e)?.shadowRoot;if(!t)return{root:null,variant:"unresolved"};for(const[e,i]of o){const a=t.querySelector(e);if(!a)continue;const r="ha-panel-lovelace"===e?a:(a.shadowRoot||a).querySelector("ha-panel-lovelace"),o=r?.shadowRoot||r,n=o?.querySelector("hui-root")||null;if(n)return{root:n,variant:i}}return{root:null,variant:"unresolved"}}function s(e){return n(e).root}e.exports={findHomeAssistantHost:function(e=("undefined"!=typeof document?document:void 0),a){return t("the Home Assistant host",()=>i(e),a)},findHomeAssistantMain:function(e=("undefined"!=typeof document?document:void 0),i){return t("Home Assistant main",()=>a(e),i)},findHcMain:function(e=("undefined"!=typeof document?document:void 0),i){return t("hc-main",()=>r(e),i)},findLovelaceConfig:function(e,i){return t("the Lovelace configuration",()=>s(e)?.lovelace||null,i)},findLovelaceRoot:function(e=("undefined"!=typeof document?document:void 0),i){return t("the Lovelace root",()=>s(e),i)},findLovelaceRootDetails:function(e=("undefined"!=typeof document?document:void 0),i){return t("the Lovelace root details",()=>n(e),i)},findLovelaceShell:function(e,{reportError:t=(e,t)=>console.error(e,t)}={}){try{const t=e?.shadowRoot;if(!t)return;return{header:t.querySelector(".header"),view:t.querySelector("#view")}}catch(e){return void t("Failed to resolve the Lovelace shell",e)}},findLovelaceView:function(e=("undefined"!=typeof document?document:void 0),i){return t("the Lovelace view",()=>{const t=r(e);if(t){const e=t.shadowRoot?.querySelector("hc-lovelace")?.shadowRoot;return e?.querySelector("hui-view")||e?.querySelector("hui-panel-view")||null}const i=s(e);let a=i?.shadowRoot;return a=a?.querySelector("ha-app-layout")||a,a=a?.querySelector("#view")||a,a?.querySelector("hui-view")||a?.querySelector("hui-panel-view")||a?.querySelector("hui-unused-entities")||a?.firstElementChild||null},i)}}},2313(e,t,i){"use strict";const{TimerOwner:a}=i(6687);e.exports={LovelaceHeaderOwner:class{constructor({timers:e=new a,maxAttempts:t=40,retryDelay:i=100,MutationObserverClass:r=("undefined"!=typeof MutationObserver?MutationObserver:void 0),reportError:o=(e,t)=>console.error(e,t)}={}){this._timers=e,this._maxAttempts=t,this._retryDelay=i,this._MutationObserver=r,this._reportError=o}connect(e){this._owner=e,this._attempts=0,this._timers.connect(),this._sync()}disconnect(){this._timers.disconnect(),this._observer?.disconnect(),this._observer=void 0,this._observedRoot=void 0,"none"===this._header?.style?.display&&(this._header.style.display=this._previousDisplay??""),this._header=void 0,this._owner=void 0}_findLovelaceRoot(){let e=this._owner;for(let t=0;e&&t<40;t+=1){if("hui-root"===e.localName)return e;const t=e.getRootNode?.();e=e.parentNode||t?.host||null}}_sync(){try{const e=this._findLovelaceRoot();e?.shadowRoot&&e!==this._observedRoot&&this._MutationObserver&&(this._observer?.disconnect(),this._observer=new this._MutationObserver(()=>this._sync()),this._observer.observe(e.shadowRoot,{childList:!0,subtree:!0}),this._observedRoot=e);const t=e?.shadowRoot?.querySelector(".header");if(t){t!==this._header&&(this._header=t,this._previousDisplay=t.style.display);const e=t.getBoundingClientRect?.(),i=e?.height||t.offsetHeight||0;return i>0&&this._owner?.style?.setProperty?.("--dd-lovelace-header-offset",`${i}px`),t.style.display="none",void(this._attempts=0)}}catch(e){this._reportError("Failed to synchronize the Lovelace header",e)}this._attempts+=1,this._owner?.isConnected&&this._attempts<=this._maxAttempts&&this._timers.schedule("lovelace-header",()=>this._sync(),this._retryDelay)}}}},3865(e,t,i){"use strict";const{loadCardHelpers:a}=i(3266);e.exports={ensureLovelaceLoaded:async function({registry:e=("undefined"!=typeof customElements?customElements:void 0),helperLoader:t=a,reportError:i=(e,t)=>console.error(e,t)}={}){if(e?.get("hui-view"))return!0;try{return await t(),!0}catch(e){return i("Failed to load the supported Home Assistant card helpers",e),!1}}}},9661(e){"use strict";const t="dwains-dashboard-more-page-saved",i="dwains-dashboard-more-page-metadata-changed";e.exports={MORE_PAGE_METADATA_CHANGED_EVENT:i,MORE_PAGE_SAVED_EVENT:t,dispatchMorePageMetadataChanged:function(e,t){if(!e||"function"!=typeof e.dispatchEvent)throw new TypeError("A More Page event target is required");if(!t||"object"!=typeof t||!t.foldername)throw new TypeError("More Page metadata with a folder name is required");e.dispatchEvent(new CustomEvent(i,{detail:{page:t}}))},dispatchMorePageSaved:function(e,i){if(!e||"function"!=typeof e.dispatchEvent)throw new TypeError("A More Page event target is required");if(!i||"object"!=typeof i||!i.foldername||!i.card)throw new TypeError("A complete saved More Page is required");e.dispatchEvent(new CustomEvent(t,{detail:{page:i}}))}}},1316(e,t,i){"use strict";const{EventListenerOwner:a}=i(1991);class r{constructor({windowObject:e=("undefined"!=typeof window?window:void 0),reportError:t=(e,t)=>console.error(e,t)}={}){this._window=e,this._history=e?.history,this._reportError=t,this._listeners=new a,this._popup=void 0,this._reopen=void 0,this._started=!1,this._popstateHandler=e=>this._handlePopstate(e)}connect(e,t){this._popup=e,this._reopen=t,!this._started&&this._window&&(this._listeners.listen("popstate",this._window,"popstate",this._popstateHandler),this._listeners.connect(),this._started=!0)}recordOpen(e){const t=this._stateWith({cardToolsPopup:!1},this._history?.state),i=this._stateWith({cardToolsPopup:!0,params:e},this._history?.state);try{this._history?.replaceState(t,""),this._history?.pushState(i,"")}catch(e){throw this._reportError("Failed to record popup navigation state",e),e}}markClosed(){if(this._history?.state?.cardToolsPopup)try{this._history.replaceState(this._stateWith({cardToolsPopup:!1},this._history.state),"")}catch(e){this._reportError("Failed to close popup navigation state",e)}}destroy(){this._started&&this._listeners.disconnect(),this._started=!1,this._popup=void 0,this._reopen=void 0}_stateWith(e,t){return{...t&&"object"==typeof t?t:{},...e}}_handlePopstate(e){e?.state&&"cardToolsPopup"in e.state&&(e.state.cardToolsPopup?Promise.resolve(this._reopen?.(e.state.params)).catch(e=>{this._reportError("Failed to restore popup navigation state",e)}):this._popup?.closeDialog())}}const o=new r;e.exports={PopupHistoryController:r,popupHistoryController:o}},3377(e,t,i){"use strict";const{findHomeAssistantHost:a}=i(2708);function r({documentObject:e=("undefined"==typeof document?void 0:document),reportError:t=(e,t)=>console.error(e,t)}={}){try{return a(e,{rethrow:!0})||e?.querySelector("hc-root")||void 0}catch(e){return void t("Failed to resolve the Home Assistant popup root",e)}}async function o({root:e,documentObject:t,selectTree:i,reportError:a=(e,t)=>console.error(e,t)}={}){const o=e||r({documentObject:t,reportError:a});if(o)if("function"==typeof i)try{return await i(o,"$ card-tools-popup")}catch(e){return void a("Failed to resolve card-tools-popup",e)}else a("Failed to resolve card-tools-popup",new TypeError("A selectTree function is required"))}e.exports={closeCardToolsPopup:async function({reportError:e=(e,t)=>console.error(e,t),...t}={}){const i=await o({...t,reportError:e});if(!i)return!1;if("function"!=typeof i.closeDialog)return e("Failed to close card-tools-popup",new TypeError("card-tools-popup.closeDialog is not available")),!1;try{return i.closeDialog(),!0}catch(t){return e("Failed to close card-tools-popup",t),!1}},findCardToolsPopup:o,findPopupRoot:r,mountCardToolsPopup:function({root:e,popup:t,provideHass:i,reportError:a=(e,t)=>console.error(e,t)}={}){const r=e?.shadowRoot;if(!r||!t)return a("Failed to mount card-tools-popup",new TypeError("A popup and Home Assistant shadow root are required")),!1;try{const e=r.querySelector("ha-more-info-dialog");return e?r.insertBefore(t,e):r.appendChild(t),i?.(t),!0}catch(e){return a("Failed to mount card-tools-popup",e),!1}}}},4615(e){"use strict";e.exports={PopupOpenScheduler:class{constructor(e,{delay:t=50,keyPrefix:i="popup-open"}={}){if(!e?.schedule)throw new Error("PopupOpenScheduler requires a TimerOwner");this._timers=e,this._delay=t,this._keyPrefix=i,this._sequence=0}schedule(e){if("function"!=typeof e)throw new TypeError("PopupOpenScheduler callback must be a function");const t=`${this._keyPrefix}-${++this._sequence}`;return this._timers.schedule(t,e,this._delay)}}}},9632(e){"use strict";function t(e,t,i){if(null==t)return;const a=e.get(t);a?a.push(i):e.set(t,[i])}e.exports={buildRegistryIndexes:function(e,i){const a=new Map,r=new Map,o=new Map,n=new Map,s=new Map,d=new Map;for(const i of e||[])if(a.set(i.id,i),t(n,i.area_id,i),null!=i.area_id){const e=s.get(i.id);e?e.add(i.area_id):s.set(i.id,new Set([i.area_id]))}for(const[e,a]of(i||[]).entries())if(r.set(a.entity_id,a),o.set(a.entity_id,e),a.area_id)t(d,a.area_id,a);else for(const e of s.get(a.device_id)||[])t(d,e,a);return{devicesById:a,entitiesById:r,devicesByAreaId:n,entitiesByAreaId:d,entityOrderById:o}},registryOrderedEntityUnion:function(e,t){const i=new Map;for(const t of e||[])for(const e of t||[])i.has(e.entity_id)||i.set(e.entity_id,e);return[...i.values()].sort((e,i)=>(t?.get(e.entity_id)??Number.MAX_SAFE_INTEGER)-(t?.get(i.entity_id)??Number.MAX_SAFE_INTEGER))}}},1786(e){"use strict";e.exports={ReloadableLoadOwner:class{constructor(e){if("function"!=typeof e)throw new TypeError("ReloadableLoadOwner requires a load function");this._load=e,this._generation=0,this._abortController=void 0}load(){if(this._current)return this._current;let e;const t=++this._generation,i=new AbortController;this._abortController=i;try{e=this._load({isCurrent:()=>this._generation===t,signal:i.signal})}catch(t){e=Promise.reject(t)}let a;return a=Promise.resolve(e).then(e=>(this._current===a&&(this._current=void 0),this._abortController===i&&(this._abortController=void 0),e),e=>{throw this._current===a&&(this._current=void 0),this._abortController===i&&(this._abortController=void 0),e}),this._current=a,a}reload(){if(!this._current)return this.load();if(this._queued)return this._queued;this._generation+=1,this._abortController?.abort("reload");const e=this._current;let t;return t=e.then(()=>{if(this._queued===t)return this._queued=void 0,this.load()},()=>{if(this._queued===t)return this._queued=void 0,this.load()}),this._queued=t,t}invalidate(){this._generation+=1,this._abortController?.abort("invalidate"),this._abortController=void 0,this._current=void 0,this._queued=void 0}}}},6653(e){"use strict";e.exports={reportRuntimeWindowError:function(e,{logError:t=(...e)=>console.error(...e)}={}){return!!e?.message?.includes("Illegal constructor")&&(t("[dwains] Illegal constructor (NOT suppressed):",e.message,`${e.filename||""}:${e.lineno||""}`),!0)},reportUnhandledRejection:function(e,{logError:t=(...e)=>console.error(...e)}={}){try{const i=e?.reason;t("[dwains] unhandledrejection (NOT suppressed):",i?.message||i||"Unknown promise rejection")}catch(e){t("[dwains] failed to inspect unhandled rejection:",e)}}}},624(e){"use strict";const t=Symbol.for("dwains-dashboard.runtime");e.exports={getDwainsRuntimeState:function(e=("undefined"==typeof window?void 0:window)){if(!e)throw new TypeError("A Window object is required for Dwains runtime state");return e[t]||={}},RUNTIME_STATE_KEY:t}},151(e){"use strict";e.exports={readSelectEvent:function(e){const t=e?.currentTarget||e?.target,i=t?.name||t?.dataset?.field||t?.type;let a=e?.detail?.value;if(void 0===a&&void 0!==e?.detail?.index){const i=e.detail.index;a=t?.children?.[i]?.value??t?.items?.[i]?.value}return void 0===a&&e?.target!==t&&(a=e?.target?.value),a??=t?.value??t?.selectedValue,{field:i,value:a}}}},3601(e,t,i){"use strict";const a=e=>e`
  --dd-subtle-surface: var(--ha-card-background, var(--card-background-color, white));
  --dd-subtle-page-background: color-mix(in srgb, var(--primary-background-color) 82%, var(--dd-subtle-surface) 18%);
  --dd-subtle-muted: rgba(127, 127, 127, 0.055);
  --dd-subtle-muted-hover: rgba(127, 127, 127, 0.085);
  --dd-subtle-divider: rgba(127, 127, 127, 0.085);
  --dd-subtle-radius: 16px;
  --dd-subtle-radius-small: 12px;
  --dd-subtle-shadow: 0 3px 14px rgba(0, 0, 0, 0.052);
  --dd-subtle-shadow-hover: 0 7px 22px rgba(0, 0, 0, 0.078);
`,r=e=>e`
  .back-button,
  .dd-dashboard-style-refresh .back-button {
    margin-right: 1.25rem;
    margin-bottom: 4rem;
    display: inline-block;
    cursor: pointer;
  }

  .back-button .button,
  .dd-dashboard-style-refresh .back-button .button {
    box-sizing: border-box;
    width: 3.5rem;
    height: 3.5rem;
    min-width: 3.5rem;
    min-height: 3.5rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.75rem !important;
    border-radius: 9999px !important;
    border: 0 !important;
    outline: 0 !important;
    background: var(--primary-color) !important;
    background-color: var(--primary-color) !important;
    color: var(--text-primary-color, #fff) !important;
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.18) !important;
    transition: background-color 150ms ease, box-shadow 150ms ease;
    margin-bottom: env(safe-area-inset-bottom);
  }

  .back-button .button:hover,
  .dd-dashboard-style-refresh .back-button .button:hover {
    background: color-mix(in srgb, var(--primary-color) 88%, var(--primary-text-color) 12%) !important;
    background-color: color-mix(in srgb, var(--primary-color) 88%, var(--primary-text-color) 12%) !important;
    box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22) !important;
  }
`;i.d(t,["Cn",0,e=>e`
  .dd-dashboard-style-refresh {
    ${a(e)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    color: var(--primary-text-color);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting {
    align-items: center;
    gap: 0.75rem;
    padding: 0.25rem 0 0.4rem;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting h1,
  .dd-dashboard-style-refresh h2,
  .dd-dashboard-style-refresh h3 {
    letter-spacing: -0.015em;
  }

  .dd-dashboard-style-refresh .dd-homepage-greeting #clock {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.45rem 0.7rem;
    border-radius: var(--dd-subtle-radius-small);
    background: var(--dd-subtle-surface);
    box-shadow: var(--dd-subtle-shadow);
    border: 0;
    color: var(--primary-text-color);
    font-weight: 650;
    line-height: 1.18;
    letter-spacing: -0.01em;
    text-shadow: none;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
  }

  .dd-dashboard-style-refresh #badges,
  .dd-dashboard-style-refresh .area-button {
    background: var(--dd-subtle-surface);
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    color: var(--primary-text-color);
  }

.dd-dashboard-style-refresh .area-button {
  overflow: hidden;
  transition: box-shadow 150ms ease, background-color 150ms ease;
}

.dd-dashboard-style-refresh .area-button.h-44:hover {
  box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
}

  .dd-dashboard-style-refresh .area-button h3 {
    font-weight: 720;
    line-height: 1.16;
  }

  .dd-dashboard-style-refresh .area-button .sensors {
    display: block;
    color: var(--secondary-text-color);
    font-weight: 500;
    line-height: 1.28;
    max-height: 2.7em;
    overflow: hidden;
  }

  .dd-dashboard-style-refresh .area-button .sensor-separator {
    display: inline;
    color: var(--secondary-text-color);
    opacity: 0.55;
  }

  .dd-dashboard-style-refresh .area-button .sensor-chip {
    display: inline;
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--secondary-text-color);
    white-space: normal;
  }

  .dd-dashboard-style-refresh .area-button.current {
    box-shadow: var(--dd-subtle-shadow-hover);
  }

  ${r(e)}

  .dd-dashboard-style-refresh .dd-area-view > h3,
  .dd-dashboard-style-refresh .dd-area-view .font-semibold.capitalize {
    margin: 1.1rem 0 0.55rem;
    color: var(--secondary-text-color);
    font-size: 0.92rem;
    font-weight: 720;
    letter-spacing: 0.005em;
  }

  .dd-dashboard-style-refresh .text-gray,
  .dd-dashboard-style-refresh .text-gray-500,
  .dd-dashboard-style-refresh .text-gray-600,
  .dd-dashboard-style-refresh .text-gray-700 {
    color: var(--secondary-text-color);
  }

  .dd-dashboard-style-refresh .relative > ha-card,
  .dd-dashboard-style-refresh .dd-masonry > div > div,
  .dd-dashboard-style-refresh .area-view-entity-sortable > div > div {
    border-radius: var(--dd-subtle-radius);
    overflow: hidden;
  }

  .dd-dashboard-style-refresh hui-card,
  .dd-dashboard-style-refresh ha-card {
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
  }

  .dd-dashboard-style-refresh .card-actions-centered,
  .dd-dashboard-style-refresh .card-actions-multiple {
    border-top: 1px solid var(--dd-subtle-divider);
    background: var(--dd-subtle-surface);
    border-radius: 0 0 var(--dd-subtle-radius) var(--dd-subtle-radius);
    padding: 0.45rem 0.55rem;
  }

  .dd-dashboard-style-refresh button.border-dashed {
    border-color: var(--dd-subtle-divider);
    background: var(--dd-subtle-muted);
    border-radius: var(--dd-subtle-radius);
  }

  .dd-dashboard-style-refresh .sortable-move {
    color: var(--secondary-text-color);
    background: transparent;
    border-radius: 10px;
    padding: 0.35rem;
  }

  .dd-dashboard-style-refresh .sortable-move:hover {
    color: var(--primary-text-color);
    background: var(--dd-subtle-muted);
  }
`,"MP",0,e=>e`
  ha-card {
    ${a(e)}
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    color: var(--primary-text-color);
  }

  ha-card .dd-header-tabs {
    gap: 0.45rem;
    padding: 0.7rem;
  }

  ha-card .dd-header-tab {
    padding: 0;
    border-radius: var(--dd-subtle-radius-small);
  }

  ha-card .dd-header-tab:hover {
    background: transparent;
  }

  ha-card .dd-header-tab > div {
    box-sizing: border-box;
    padding: 0.35rem 0.55rem;
    border: 0;
    border-radius: var(--dd-subtle-radius-small);
    background: transparent;
    transition: background-color 150ms ease, color 150ms ease;
  }

  ha-card .dd-header-tab > div:hover {
    background: var(--dd-subtle-muted-hover);
  }

  ha-card .round-badge {
    background: transparent !important;
    background-color: transparent !important;
    box-shadow: none !important;
  }

  ha-card .badge-icon {
    color: var(--primary-color);
    filter: none;
  }

  ha-card .domain-badge-card h3,
  ha-card .dd-header-tab h3 {
    margin-top: 0.42rem;
    font-weight: 650;
    letter-spacing: -0.01em;
    color: var(--primary-text-color);
  }

  ha-card .dd-header-tabs span {
    color: var(--secondary-text-color);
    font-weight: 500;
  }

  ha-card img.rounded-full {
    box-shadow: none;
  }
`,"Ve",0,r,"X5",0,e=>e`
  .dd-dashboard-style-refresh {
    ${a(e)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh > .flex:first-child {
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

  .dd-dashboard-style-refresh .more-page-button {
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    transition: box-shadow 150ms ease, background-color 150ms ease;
  }

  .dd-dashboard-style-refresh .more-page-button:hover {
    box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
  }

  .dd-dashboard-style-refresh .more-page-button .ha-icon {
    width: 3.25rem;
    height: 3.25rem;
    display: grid;
    place-items: center;
    border-radius: 0;
    background: transparent;
    margin: 0 auto;
  }

  .dd-dashboard-style-refresh .more-page-button .ha-icon ha-icon {
    width: 2.15rem !important;
    height: 2.15rem !important;
    color: var(--primary-color) !important;
    filter: none;
  }

  .dd-dashboard-style-refresh .more-page-button > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 0.85rem;
  }

  .dd-dashboard-style-refresh .more-page-button > div:first-child > .w-full {
    display: flex;
    justify-content: center;
  }

  .dd-dashboard-style-refresh .more-page-button h3 {
    width: 100%;
    text-align: center;
    font-weight: 720;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }
`,"YV",0,e=>e`
  :host {
    ${a(e)}
    border: 0;
    box-shadow: 0 1px 14px rgba(0, 0, 0, 0.055);
    background: var(--dd-subtle-surface);
  }

  :host .mainNavItems div {
    padding: 0.52rem 0.78rem;
    border-radius: var(--dd-subtle-radius-small);
    color: var(--secondary-text-color);
    transition: background-color 150ms ease, color 150ms ease;
  }

  :host .mainNavItems div.active {
    color: var(--primary-color);
    background: var(--dd-subtle-muted);
    box-shadow: none;
  }

  :host .mainNavItems div:hover {
    background: var(--dd-subtle-muted-hover);
    color: var(--primary-text-color);
  }

  @media all and (max-width: 768px) {
    :host {
      box-shadow: 0 -1px 14px rgba(0, 0, 0, 0.065);
    }
  }

`,"md",0,e=>e`
  .dd-dashboard-style-refresh {
    ${a(e)}
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-page-background);
    min-height: 100%;
  }

  .dd-dashboard-style-refresh #devices > .flex:first-child {
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

.dd-dashboard-style-refresh .device-button {
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
    background: var(--dd-subtle-surface);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 1rem;
  transition: box-shadow 150ms ease, background-color 150ms ease;
}

.dd-dashboard-style-refresh .device-button:hover {
  box-shadow: var(--dd-subtle-shadow), 0 0 0 1px var(--dd-subtle-divider), 0 5px 18px rgba(0, 0, 0, 0.058);
}

.dd-dashboard-style-refresh .device-button .ha-icon {
  width: 3.25rem;
  height: 3.25rem;
  display: grid;
  place-items: center;
  border-radius: 0;
  background: transparent;
  margin: 0 auto;
}

  .dd-dashboard-style-refresh .device-button .ha-icon ha-icon {
    width: 2.15rem !important;
    height: 2.15rem !important;
    color: var(--primary-color) !important;
    filter: none;
  }

  .dd-dashboard-style-refresh .device-button > div:first-child {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 0.85rem;
  }

  .dd-dashboard-style-refresh .device-button > div:first-child > .w-full {
    display: flex;
    justify-content: center;
  }

  .dd-dashboard-style-refresh .device-button h3 {
    width: 100%;
    text-align: center;
    font-weight: 720;
    letter-spacing: -0.01em;
    line-height: 1.15;
  }

  .dd-dashboard-style-refresh hui-card,
  .dd-dashboard-style-refresh ha-card {
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
    --ha-card-border-width: 0;
    --ha-card-border-color: transparent;
  }
`,"ww",0,e=>e`
  .dd-dashboard-style-refresh {
    ${a(e)}
    color: var(--primary-text-color);
  }

  .dd-dashboard-style-refresh .dd-detail-view-header {
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding: 0.9rem 1rem;
    background: var(--dd-subtle-surface);
    border: 0;
    border-radius: var(--dd-subtle-radius);
    box-shadow: var(--dd-subtle-shadow);
  }

  .dd-dashboard-style-refresh .dd-detail-view-title {
    position: sticky;
    top: 0;
    min-width: 0;
  }

  .dd-dashboard-style-refresh .dd-detail-view-title h1,
  .dd-dashboard-style-refresh .dd-detail-view-title h2,
  .dd-dashboard-style-refresh .dd-detail-view-title h3 {
    margin: 0;
    font-weight: 760;
    letter-spacing: -0.02em;
  }

  .dd-dashboard-style-refresh .dd-detail-view-title .text-gray {
    color: var(--secondary-text-color);
  }
`,"yw",0,e=>e`
  :host {
    ${a(e)}
  }

  :host ha-dialog {
    --mdc-shape-medium: 18px;
    --ha-card-border-radius: var(--dd-subtle-radius);
    --ha-card-box-shadow: var(--dd-subtle-shadow);
  }

  :host app-toolbar {
    border-bottom: 1px solid var(--dd-subtle-divider);
    background: var(--dd-subtle-surface);
  }

  :host .main-title {
    font-weight: 700;
    letter-spacing: -0.015em;
  }
`])},6687(e){"use strict";e.exports={TimerOwner:class{constructor({setTimer:e=(e,t)=>setTimeout(e,t),clearTimer:t=e=>clearTimeout(e),reportError:i=(e,t)=>console.error(e,t)}={}){this._setTimer=e,this._clearTimer=t,this._reportError=i,this._connected=!1,this._timers=new Map}connect(){this._connected=!0}has(e){return this._timers.has(e)}schedule(e,t,i,{replace:a=!0}={}){if(!this._connected)return;const r=this._timers.get(e);if(r&&!a)return r.timer;r&&this.clear(e);const o={};return o.timer=this._setTimer(()=>{this._timers.get(e)===o&&this._timers.delete(e);try{Promise.resolve(t()).catch(t=>{this._reportError(`Timer ${e} failed`,t)})}catch(t){this._reportError(`Timer ${e} failed`,t)}},i),this._timers.set(e,o),o.timer}delay(e,t,{replace:i=!0}={}){if(!this._connected)return Promise.resolve(!1);const a=this._timers.get(e);if(a?.promise&&!i)return a.promise;a&&this.clear(e);const r={};return r.promise=new Promise(i=>{r.cancel=()=>i(!1),r.timer=this._setTimer(()=>{this._timers.get(e)===r&&this._timers.delete(e),r.cancel=void 0,i(!0)},t)}),this._timers.set(e,r),r.promise}clear(e){const t=this._timers.get(e);if(t){this._timers.delete(e);try{this._clearTimer(t.timer)}catch(t){this._reportError(`Failed to clear timer ${e}`,t)}finally{t.cancel?.()}}}disconnect(){this._connected=!1;for(const e of[...this._timers.keys()])this.clear(e)}}}},9177(e,t,i){"use strict";i.d(t,{A:()=>o});const a={en:{global:{enable_edit_mode:"Enable edit mode",disable_edit_mode:"Disable edit mode",version:"Version",disable_clock:"Disable clock",am_pm_clock:"AM/PM clock",disable_welcome_message:"Disable Welcome message",settings:"Global settings",dashboard_information:"Dashboard information",alarm_entity:"Alarm entity",weather_entity:"Weather entity",greeting_morning:"Good morning",greeting_afternoon:"Good afternoon",greeting_evening:"Good evening",v2_mode:"Enable Dwains Dashboard v2 mode (layout)",disable_sensor_graph:"Disable show sensor as graph",invert_cover:"Invert Cover"},editor:{lovelace_card:"Lovelace Card",create_lovelace_card:"Create a new lovelace card from scratch",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Use a Dwain Dashboard Blueprint to create a card",row_span:"Row span",row:"Row",rows:"Rows",col_span:"Col span",column:"Column",columns:"Columns",default_col_row:"Default col and row size",large_col_row:"Large screen col and row size",extra_large_col_row:"Extra large screen col and row size"},entity:{title:"Entity",title_plural:"entities",add_card_to:"Add card to ",edit_entity:"Edit entity",edit_entity_card:"Edit entity card",edit_entity_popup_card:"Edit entity popup card",add_to_favorites:"Add to favorites",remove_from_favorites:"Remove from favorites",popup_card:"Popup card",entity_card:"Entity card",settings:"Entity settings",group:"Group by devices",ungroup:"Ungroup by devices",enable:"Enable entity",disable:"Disable entity in DD",disable_all:"Disable all entities",hide_all:"Hide all entities",exclude:"Exclude entity in DD",hide:"Hide entity in DD",hide_in_area:"Hide entity from area views",unhide_in_area:"Show entity in area views",unhide:"Unhide entity",use_popup_card:"Use own popup card",use_entity_card:"Use own entity card",friendly_name:"Rename for DD",hidden:"The following entities are hidden:",disabled:"The following entities are disabled:",unavailable:"The following entities are unavailable:"},favorite:{title:"Favorite",title_plural:"Favorites",all_favorites:"All favorites"},home:{title:"Home"},area:{title:"Area",title_plural:"Areas",edit_area_button:"Edit area button",group_by_floor:"Group by floor",ungroup_by_floor:"Ungroup by floor",icon:"Area icon",hide_icon:"Hide icon",floor:"Area floor",no_floor:"No floor",disable:"Disable area in DD",disabled:"The following areas are disabled:",enable:"Enable area"},area_binary_sensor:{summary:{cold:{zero:"No cold detected",one:"Cold detected",many:"Cold detected"},door:{zero:"Doors closed",one:"1 door open",many:"{count} doors open"},fallback:{zero:"{label}: off",one:"{label}: active",many:"{label}: {count} active"},garage_door:{zero:"Garage door closed",one:"1 garage door open",many:"{count} garage doors open"},lock:{zero:"Locks secured",one:"1 lock unlocked",many:"{count} locks unlocked"},moisture:{zero:"Dry",one:"Moisture detected",many:"Moisture detected"},motion:{zero:"No motion",one:"Motion detected",many:"Motion detected"},safety:{zero:"Safe",one:"Unsafe",many:"Unsafe"},smoke:{zero:"No smoke",one:"Smoke detected",many:"Smoke detected"},sound:{zero:"No sound",one:"Sound detected",many:"Sound detected"},vibration:{zero:"No vibration",one:"Vibration detected",many:"Vibration detected"},window:{zero:"Windows closed",one:"1 window open",many:"{count} windows open"}}},device:{title:"Device",title_plural:"devices",edit_device_button:"Edit device button",edit_device_card:"Set custom entities card for domain ",edit_device_popup:"Set custom entities popup for domain ",current_blueprint_card:"You are currently using the following blueprint for all entities cards in the domain ",current_blueprint_popup:"You are currently using the following blueprint for all entities popups in the domain ",icon_required:"If you want to add it to navbar you must select an icon!",icon:"Device icon",show_in_navbar:"Add device page in main navbar",hide:"Hide device overview",unhide:"Unhide device overview",hidden:"The following device overviews are hidden",see_all:"See all",turn_all_off:"Turn all off",on:"on",open:"open",closed:"closed",cover:"Cover",light:"Light",climate:"Climate",sensor:"Sensor",binary_sensor:"Binary Sensor",media_player:"Media player",garage:"Garage",shutter:"Shutter",running:"Running",remote:"Remote",scene:"Scene",number:"Number",switch:"Switch",button:"Button",water_heater:"Water heater",camera:"Camera",select:"Select",vacuum:"Vacuum",fan:"Fan",door:"Door",window:"Window",vibration:"Vibration",motion:"Motion",occupancy:"Occupancy",presence:"Presence",device_tracker:"Device tracker",lock:"Lock",siren:"Siren",input_boolean:"Input boolean",weather:"Weather",moisture:"Moisture",input_select:"Input select",carbon_monoxide:"Carbon monoxide",gas:"Gas",problem:"Problem",safety:"Safety",smoke:"Smoke",tamper:"Tamper",update:"Update",person:"Person",alarm_control_panel:"Alarm control panel",automation:"Automation",group:"Group by areas",ungroup:"Ungroup by areas",update:"Update",script:"Script",time:"Time",event:"Event",text:"Text"},more:{title:"More",title_plural:"More pages",pages:"pages",create:"Create new more page",edit:"Edit more page",name_required:"You must specify a name for the page",icon_required:"If you want to add it to navbar you must select an icon!",add_navbar:"Add this more page in main navbar",remove_navbar:"Remove this more page from main navbar",name:"More page name",icon:"More page icon"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"No YAML code entered!",installed:"Installed",no_blueprints_installed:"No blueprints installed",not_installed:"Not installed",installed_blueprints:"Installed blueprints",type:"Type blueprint",used_custom_cards:"Used custom cards",use:"Use this blueprint",install:"Install blueprint",yaml_code:"Blueprint YAML code",instruction:"Look for the blueprint you want to install in the Dwains Dashboard Community Blueprints Github and paste the blueprint yaml code below. After succesfull installation lovelace and this page will reload. Then you can use the installed blueprint."}},nl:{global:{enable_edit_mode:"Bewerkingsmodus inschakelen",disable_edit_mode:"Bewerkingsmodus uitschakelen",version:"Versie",disable_clock:"Klok uitzetten",am_pm_clock:"AM/PM klok",disable_welcome_message:"Welkom bericht uitzetten",settings:"Globale instellingen",dashboard_information:"Dashboard informatie",alarm_entity:"Alarm entiteit",weather_entity:"Weer entiteit",greeting_morning:"Goedemorgen",greeting_afternoon:"Goedemiddag",greeting_evening:"Goedenavond",v2_mode:"Dwains Dashboard v2-modus inschakelen (lay-out)",disable_sensor_graph:"Toon sensor als grafiek uitschakelen"},editor:{lovelace_card:"Lovelace Kaart",create_lovelace_card:"Maak een nieuwe lovelace-kaart vanaf het begin",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Een Dwain Dashboard Blueprint gebruiken om een kaart te maken",row_span:"Rij span",row:"Rij",rows:"Rijen",col_span:"Kolom span",column:"Kolom",columns:"Kolommen",default_col_row:"Standaard col en rijgrootte",large_col_row:"Groot scherm kleur en rijgrootte",extra_large_col_row:"Extra grote schermkleur en rijgrootte"},entity:{title:"Entiteit",title_plural:"entiteiten",add_card_to:"Kaart toevoegen aan ",edit_entity:"Bewerk entiteit",edit_entity_card:"Bewerk entiteit kaart",edit_entity_popup_card:"Bewerk entiteit popup kaart",add_to_favorites:"Toevoegen aan favorieten",remove_from_favorites:"Verwijderen van favorieten",popup_card:"Popup kaart",entity_card:"Entiteit kaart",settings:"Entiteit instellingen",group:"Groep entiteiten",ungroup:"Groep entiteiten opheffen",enable:"Entiteit aanzetten",disable:"Entiteit uitschakelen in DD",disable_all:"Alle entiteiten uitschakelen",hide_all:"Alle entiteiten verbergen",exclude:"Entiteit uitsluiten in DD",hide:"Verberg entiteit in DD",unhide:"Entiteit zichtbaar maken",use_popup_card:"Eigen pop-upkaart gebruiken",use_entity_card:"Eigen entiteitskaart gebruiken",friendly_name:"Naam wijzigen voor DD",hidden:"De volgende entiteiten zijn verborgen:",disabled:"De volgende entiteiten zijn uitgeschakeld:",unavailable:"De volgende entiteiten zijn niet beschikbaar:"},favorite:{title:"Favoriet",title_plural:"Favorieten",all_favorites:"Alle favorieten"},home:{title:"Home"},area:{title:"Gebied",title_plural:"Gebieden",edit_area_button:"Bewerk gebied knop",group_by_floor:"Groeperen op verdieping",ungroup_by_floor:"Groepering opheffen op verdieping",icon:"Gebied icoon",hide_icon:"Pictogram verbergen",floor:"Gebied verdieping",no_floor:"Geen verdieping",disable:"Schakel gebied uit in DD",disabled:"De volgende gebieden zijn uitgeschakeld:",enable:"Gebied inschakelen"},device:{title:"Apparaat",title_plural:"apparaten",edit_device_button:"Apparaatknop bewerken",edit_device_card:"Stel een custom entititeit kaart in voor domein ",edit_device_popup:"Stel een custom popup entiteiten in voor domein ",current_blueprint_card:"U gebruikt momenteel de volgende blueprint voor alle entiteitskaarten in het domein: ",current_blueprint_popup:"U gebruikt momenteel de volgende blueprint voor alle pop-ups van entiteiten in het domein: ",icon_required:"Als u het aan de navigatiebalk wilt toevoegen, moet u een icon selecteren!",icon:"Apparaat icon",show_in_navbar:"Apparaatpagina toevoegen in hoofdnavigatiebalk",hide:"Apparaatoverzicht verbergen",unhide:"Apparaatoverzicht zichtbaar maken",hidden:"De volgende apparaatoverzichten zijn verborgen",see_all:"Bekijk alle",turn_all_off:"Zet alle uit",on:"aan",open:"open",cover:"Rolluik",light:"Lamp",climate:"Thermostaat",sensor:"Sensor",binary_sensor:"Binaire sensor",media_player:"Media player",remote:"Afstandsbediening",scene:"Scène",number:"Nummer",switch:"Schakelaar",button:"Knop",water_heater:"Water verwarmer",camera:"Camera",select:"Selecteer",vacuum:"Stofzuiger",fan:"Ventilator",door:"Deur",window:"Raam",vibration:"Vibratie",motion:"Beweging",device_tracker:"Device tracker",lock:"Slot",siren:"Siren",input_boolean:"Input boolean",weather:"Weer",moisture:"Vochtigheid",input_select:"Input select",carbon_monoxide:"Koolmonoxide",gas:"Gas",problem:"Probleem",safety:"Veiligheid",smoke:"Rook",tamper:"Geknoeid",update:"Update",person:"Persoon",alarm_control_panel:"Alarm bedieningspaneel",automation:"Automatisering",group:"Groeperen op gebied",ungroup:"Groepering opheffen op gebied"},more:{title:"Meer",title_plural:"Meer pagina's",pages:"pagina's",create:"Nieuwe meer pagina maken",edit:"Meer pagina bewerken",name_required:"U moet een naam voor de pagina opgeven",icon_required:"Als u het aan de navigatiebalk wilt toevoegen, moet u een icoon selecteren!",add_navbar:"Voeg deze meer pagina toe in de hoofdnavigatiebalk",name:"Meer pagina naam",icon:"Meer pagina icoon"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"Geen YAML-code ingevoerd!",installed:"Geïnstalleerd",no_blueprints_installed:"Geen blueprints geïnstalleerd",not_installed:"Niet geïnstalleerd",installed_blueprints:"Installeer blueprints",type:"Type blueprint",used_custom_cards:"Gebruikte custom cards",use:"Gebruik deze blueprint",install:"Installeer blueprint",yaml_code:"Blueprint YAML-code",instruction:"Zoek de blueprint die u wilt installeren in de Dwains Dashboard Community Blueprints Github en plak de blueprint yaml-code hieronder. Na succesvolle installatie worden lovelace en deze pagina opnieuw geladen. Dan kunt u de geïnstalleerde blueprint gebruiken."}},fr:{global:{enable_edit_mode:"Activer le mode d'édition",disable_edit_mode:"Désactiver le mode d'édition",version:"Version",disable_clock:"Masquer l'horloge",am_pm_clock:"AM/PM l'horloge",disable_welcome_message:"Masquer le message de bienvenue",settings:"Paramètres globaux",dashboard_information:"Informations",alarm_entity:"Entité pour l'Alarme",weather_entity:"Entité pour la Météo",greeting_morning:"Bonjour",greeting_afternoon:"Bonne après-midi",greeting_evening:"Bonsoir",v2_mode:"Activer le mode Dwains Dashboard v2 (mise en page)",disable_sensor_graph:"Désactiver l'affichage du capteur sous forme de graphique"},editor:{lovelace_card:"Carte Lovelace",create_lovelace_card:"Créer une nouvelle carte Lovelace",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Utiliser un Blueprint pour créer une carte",row_span:"Nombre de rangée",row:"Rangée",rows:"Rangées",col_span:"Nombre de colonne",column:"Colonne",columns:"Colonnes",default_col_row:"Default : nombre de colonne et rangée",large_col_row:"Grand écran : nombre de colonne et rangée",extra_large_col_row:"Très grande écran : nombre de colonne et rangée"},entity:{title:"Entité",title_plural:"Entités",add_card_to:"Ajouter la carte à ",edit_entity:"Éditer l'entité",edit_entity_card:"Éditer une carte d'entité",edit_entity_popup_card:"Éditer une carte Pop-up",add_to_favorites:"Ajouter aux favoris",remove_from_favorites:"Retirer des favoris",popup_card:"Carte Pop-up",entity_card:"Carte de l'entité",settings:"Paramètres de l'entité",group:"Regrouper par entités",ungroup:"Dégrouper par entités",enable:"Activer l'entité",disable:"Désactiver l'entité dans DD",disable_all:"Désactiver toutes les entités",hide_all:"Masquer toutes les entités",exclude:"Exclure l'entité dans DD",hide:"Masquer l'entité dans DD",unhide:"Afficher l'entité",use_popup_card:"Utiliser une carte Pop-up",use_entity_card:"Utiliser une carte d'entité",friendly_name:"Renommer dans DD",hidden:"Les entités suivantes sont masqués:",disabled:"Les entités suivantes sont désactivés:",unavailable:"Les entités suivantes sont indisponibles:"},favorite:{title:"Favori",title_plural:"Favoris",all_favorites:"Tous les Favoris"},home:{title:"Accueil"},area:{title:"Pièce",title_plural:"Pièces",edit_area_button:"Édition d'une Pièce",group_by_floor:"Regrouper par étage",ungroup_by_floor:"Dégrouper par étage",icon:"Icône",hide_icon:"Masquer l'icône",floor:"Étage",no_floor:"Aucun n'étage",disable:"Désactiver l'aréa dans DD",disabled:"Les aréas suivantes sont désactivées:",enable:"Activer l'aréa"},device:{title:"Appareil",title_plural:"Appareils",edit_device_button:"Édition d'un appareil",edit_device_card:"Définir une carte d'entités personnalisées pour le domaine ",edit_device_popup:"Définir une carte Pop-up d'entités personnalisées pour le domaine ",current_blueprint_card:"Vous utilisez actuellement le Blueprint suivant pour toutes les cartes d'entités du domaine ",current_blueprint_popup:"Vous utilisez actuellement le Blueprint suivant pour tout les Pop-up d'entités du domaine ",icon_required:"Si vous voulez l'ajouter à la barre de navigation, vous devez choisir une icône!",icon:"icône de l'appareil",show_in_navbar:"Ajouter la page d'appareils à la barre de navigation",hide:"Masquer l'aperçu de l'appareil",unhide:"Afficher l'aperçu de l'appareil",see_all:"Voir tout",turn_all_off:"Tout désactiver",on:"Allumé",open:"Ouvert",cover:"Rideau",light:"Lumière",climate:"Thermostat",sensor:"Capteur",binary_sensor:"Binaire",media_player:"Multimédia",remote:"Télécommande",scene:"Scène",number:"Nombre",switch:"Interrupteur",button:"Bouton",water_heater:"Chauffe-eau",camera:"Caméra",select:"Sélection",vacuum:"Aspirateur",fan:"Ventilateur",door:"Porte",window:"Fenêtre",vibration:"Vibration",motion:"Mouvement",device_tracker:"Traqueur",lock:"Serrure",siren:"Siren",input_boolean:"Booléen",weather:"Temps",moisture:"Humidité",input_select:"Sélection",carbon_monoxide:"Monoxyde de carbone",gas:"Gaz",problem:"Problème",safety:"Sécurité",smoke:"Fumée",tamper:"Altérer",update:"Mise à jour",person:"Personne",alarm_control_panel:"Alarme",automation:"Automatisation",group:"Regrouper par aréas",ungroup:"Dégrouper par aréas"},more:{title:"Ajouter",title_plural:"Ajouter une page",pages:"Pages",create:"Créer une nouvelle page",edit:"Éditer une page",name_required:"Vous devez indiquer le nom de la page",icon_required:"Si vous voulez l'ajouter à la barre de navigation, vous devez choisir une icône!",add_navbar:"Ajouter à la barre de navigation",name:"Nom de la page",icon:"icône de la page"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"Pas de code YAML entré!",installed:"Installé",no_blueprints_installed:"Pas de Blueprints installés",not_installed:"N'est pas installé",installed_blueprints:"Blueprints installés",type:"Type de Blueprint",used_custom_cards:"Cartes personnalisées installées",use:"Ajouter",install:"Installer un Blueprint",yaml_code:"Code YAML du Blueprint",instruction:"Trouver le code du Blueprint que vous voulez installer dans le GitHub de la communauté de Dwains et collé le dans la section Code YAML du Blueprint plus basse. Après l’installation réussie, le tableau de bord va se recharger. Alors, vous pourrez utiliser le Blueprint."}},de:{global:{enable_edit_mode:"Aktiviere Bearbeitungsmodus",disable_edit_mode:"Deaktiviere Bearbeitungsmodus",version:"Version",disable_clock:"Deaktiviere Uhr",am_pm_clock:"AM/PM Uhr",disable_welcome_message:"Deaktiviere Willkommensnachricht",settings:"Globale Einstellungen",dashboard_information:"Dashboard Informationen",alarm_entity:"Alarm Entität",weather_entity:"Wetter Entität",greeting_morning:"Guten Morgen",greeting_afternoon:"Guten Tag",greeting_evening:"Guten Abend",v2_mode:"Aktiviere Dwains Dashboard v2 Layout",disable_sensor_graph:"Sensordarstellung als Grafik deaktivieren"},editor:{lovelace_card:"Lovelace Karte",create_lovelace_card:"Erstelle eine neue Lovelace Karte",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Nutze Dwains Dashboard Blueprint um eine Karte zu erstellen",row_span:"Anzahl Zeilen",row:"Zeile",rows:"Zeilen",col_span:"Anzahl Spalten",column:"Spalte",columns:"Spalten",default_col_row:"Standardgröße von Zeilen und Spalten",large_col_row:"Zeilen und Spaltengröße für große Bildschirme",extra_large_col_row:"Zeilen und Spaltengröße für extra große Bildschirme"},entity:{title:"Entität",title_plural:"Entitäten",add_card_to:"Füge Karte hinzu ",edit_entity:"Bearbeite Entität",edit_entity_card:"Bearbeite Entität-Karte",edit_entity_popup_card:"Bearbeite Pop-up-Karte",add_to_favorites:"Zu Favoriten hinzufügen",remove_from_favorites:"Entferne von Favoriten",popup_card:"Pop-up Karte",entity_card:"Enität-Karte",settings:"Entität Einstellungen",group:"Gruppierung nach Entitäten",ungroup:"Gruppierung nach Entitäten aufheben",enable:"Aktiviere Entität",disable:"Deaktiviere Entität in DD",disable_all:"Deaktiviere alle Entitäten",hide_all:"Blende alle Entitäten aus",exclude:"Schließe Entität in DD aus",hide:"Blende Entität in DD aus",hide_in_area:"Blende Entität in Area aus",unhide_in_area:"Blende Entität in Area ein",unhide:"Blende Entität in DD ein",use_popup_card:"Nutze eigene Pop-up Karte",use_entity_card:"Nutze eigene Entität-Karte",friendly_name:"Nenne in DD um",hidden:"Folgende Entitäten sind ausgeblendet:",disabled:"Folgende Entitäten sind deaktiviert:",unavailable:"Folgende Entitäten sind nicht verfügbar:"},favorite:{title:"Favorit",title_plural:"Favoriten",all_favorites:"Alle Favoriten"},home:{title:"Home"},area:{title:"Bereich",title_plural:"Bereiche",edit_area_button:"Schaltfläche Bearbeite Bereiche",group_by_floor:"Gruppierung nach Etage",ungroup_by_floor:"Gruppierung nach Etage aufheben",icon:"Icon des Bereichs",hide_icon:"Icon ausblenden",floor:"Etage",no_floor:"Keine Etagen",disable:"Deaktiviere Bereich in DD",disabled:"Folgende Bereiche sind deaktiviert:",enable:"Aktiviere Bereich"},area_binary_sensor:{summary:{cold:{zero:"Keine Kälte",one:"Kälte erkannt",many:"Kälte erkannt"},door:{zero:"Türen geschlossen",one:"1 Tür offen",many:"{count} Türen offen"},fallback:{zero:"{label}: aus",one:"{label}: aktiv",many:"{label}: {count} aktiv"},garage_door:{zero:"Garagentor geschlossen",one:"1 Garagentor offen",many:"{count} Garagentore offen"},lock:{zero:"Schlösser verriegelt",one:"1 Schloss entriegelt",many:"{count} Schlösser entriegelt"},moisture:{zero:"Trocken",one:"Feuchtigkeit erkannt",many:"Feuchtigkeit erkannt"},motion:{zero:"Keine Bewegung",one:"Bewegung erkannt",many:"Bewegung erkannt"},safety:{zero:"Sicher",one:"Unsicher",many:"Unsicher"},smoke:{zero:"Kein Rauch",one:"Rauch erkannt",many:"Rauch erkannt"},sound:{zero:"Kein Geräusch",one:"Geräusch erkannt",many:"Geräusch erkannt"},vibration:{zero:"Keine Vibration",one:"Vibration erkannt",many:"Vibration erkannt"},window:{zero:"Fenster geschlossen",one:"1 Fenster offen",many:"{count} Fenster offen"}}},device:{title:"Gerät",title_plural:"Geräte",edit_device_button:"Schaltfläche Geräte bearbeiten",edit_device_card:"Nutze benutzerdefinierte Entität-Karte für Domäne ",edit_device_popup:"Nutze benutzerdefinierte Pop-Up-Karte der Domäne ",current_blueprint_card:"Derzeitige Nutzung des Blueprints für alle Entität-Karten der Domäne ",current_blueprint_popup:"Derzeitige Nutzung des Blueprints für alle Entität-Pop-Up-Karten der Domäne ",icon_required:"Es muss ein Icon gewählt werden, um dies der Navigationsleiste hinzuzufügen!",icon:"Icon des Geräts",show_in_navbar:"Füge Geräte Seite der Navigationsleiste hinzu.",hide:"Blende Geräteübersicht aus",unhide:"Blende Geräteübersicht ein",hidden:"Folgende Geräteübersichten sind ausgeblendet",see_all:"Zeige Alle",turn_all_off:"Schalte alle aus",on:"an",open:"offen",cover:"Beschattung",light:"Licht",climate:"Klimageräte",sensor:"Sensor",binary_sensor:"Binärer Sensor",media_player:"Medien",remote:"Fernbedienung",scene:"Szene",number:"Nummer",switch:"Schalter",button:"Schaltfläche",water_heater:"Warmwassererzeuger",camera:"Kamera",select:"Auswahl",vacuum:"Staubsauger",fan:"Lüfter",door:"Tür",window:"Fenster",vibration:"Vibration",motion:"Bewegung",device_tracker:"Geräte-Tracker",lock:"Schloss",siren:"Alarm",input_boolean:"Input Boolean",weather:"Wetter",moisture:"Feuchtigkeit",input_select:"Input Select",carbon_monoxide:"Kohlenstoffmonoxid",gas:"Gas",problem:"Problem",safety:"Sicherheit",smoke:"Rauch",tamper:"Manipulation",update:"Update",person:"Person",alarm_control_panel:"Alarmanlage",automation:"Automation",group:"Gruppierung nach Bereichen",ungroup:"Gruppierung nach Bereichen aufheben"},more:{title:"Weitere",title_plural:"Weitere Seiten",pages:"Seiten",create:"Erstelle neue Weitere Seite",edit:"Bearbeite Weitere Seite",name_required:"Wähle einen Namen für die Seite",icon_required:"Es muss ein Icon gewählt werden, um dies der Navigationsleiste hinzuzufügen!",add_navbar:"Füge die Weitere Seite zu Navigationsleiste hinzu",remove_navbar:"Entferne die Weitere Seite aus der Navigationsleiste",name:"Name der Weiteren Seite",icon:"Icon der Weiteren Seite"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"Kein YAML Code eingegeben!",installed:"Installiert",no_blueprints_installed:"Keine Blueprints installiert",not_installed:"Nicht installiert",installed_blueprints:"Installierte Blueprints",type:"Typ des Blueprints",used_custom_cards:"Verwendete benutzerdefinierte Karten",use:"Verwende diesen Blueprint",install:"Installiere Blueprint",yaml_code:"Blueprint YAML Code",instruction:"Suche im Dwains Dashboard Community Blueprints Github nach dem Blueprint die installiert werden soll und füge den   YAML Code unten ein. Nach erfolgreicher Installation wird die Seite neugeladen. Danach kann der Blueprint genutzt werden."}},pt:{global:{enable_edit_mode:"Ativar o modo de edição",disable_edit_mode:"Desabilitar o modo de edição",version:"Versão",disable_clock:"Desativar relógio",am_pm_clock:"AM/PM clock",disable_welcome_message:"Desativar mensagem de boas vindas",settings:"Configurações globais",dashboard_information:"Informações do painel",alarm_entity:"Entidade de alarme",weather_entity:"Entidade meteorológica",greeting_morning:"Bom dia",greeting_afternoon:"Boa tarde",greeting_evening:"Boa noite",v2_mode:"Enable Dwains Dashboard v2 mode (layout)",disable_sensor_graph:"Desativar a exibição do sensor como gráfico"},editor:{lovelace_card:"Cartão Lovelace",create_lovelace_card:"Crie um novo cartão lovelace do zero",dwains_dashboard_blueprint:"Planta do painel Dwains ",use_dwains_dashboard_blueprint:"Use uma planta do painel Dwains para criar um cartão",row_span:"Expansão de linha",row:"Linha",rows:"Linhas",col_span:"Extensão da coluna",column:"Coluna",columns:"Colunas",default_col_row:"Tamanho padrão de coluna e linha",large_col_row:"Tamanho de coluna e linha de tela grande",extra_large_col_row:"Tamanho de coluna e linha de tela extra grande"},entity:{title:"Entidade",title_plural:"Entidades",add_card_to:"Adicionar cartão a ",edit_entity:"Editar entidade",edit_entity_card:"Editar cartão de entidade",edit_entity_popup_card:"Editar cartão pop-up de entidade",add_to_favorites:"Adicionar aos favoritos",remove_from_favorites:"Remover dos favoritos",popup_card:"Cartão pop-up",entity_card:"Cartão de entidade",settings:"Configurações da entidade",group:"Agrupar por dispositivos",ungroup:"Desagrupar por dispositivos",enable:"Ativar entidade",disable:"Desativar entidade no DD",disable_all:"Disable all entities",hide_all:"Hide all entities",exclude:"Exclude entity in DD",hide:"Ocultar entidade no DD",unhide:"Reexibir entidade",use_popup_card:"Use o próprio cartão pop-up",use_entity_card:"Use o próprio cartão de entidade",friendly_name:"Renomear para DD",hidden:"As seguintes entidades estão ocultas:",disabled:"As seguintes entidades estão desabilitadas:",unavailable:"As seguintes entidades estão indisponíveis:"},favorite:{title:"Favorito",title_plural:"Favoritos",all_favorites:"Todos os favoritos"},home:{title:"Inicio"},area:{title:"Divisão",title_plural:"Divisões",edit_area_button:"Botão Editar divisão",group_by_floor:"Agrupar por andar",ungroup_by_floor:"Desagrupar por andar",icon:"Ícone da divisão",hide_icon:"Ocultar ícone",floor:"Piso da divisão",no_floor:"Sem piso",disable:"Disable area in DD",disabled:"The following areas are disabled:",enable:"Enable area"},device:{title:"Dispositivo",title_plural:"Dispositivos",edit_device_button:"Botão Editar dispositivo",edit_device_card:"Definir cartão de entidades personalizadas para domínio ",edit_device_popup:"Definir pop-up de entidades personalizadas para o domínio",current_blueprint_card:"Você está usando o seguinte esquema para todos os cartões de entidades no domínio",current_blueprint_popup:"Você está usando o seguinte esquema para todos os pop-ups de entidades no domínio",icon_required:"Se você quiser adicioná-lo à barra de navegação, você deve selecionar um ícone!",icon:"Ícone do dispositivo",show_in_navbar:"Adicionar página do dispositivo na barra de navegação principal",hide:"Hide device overview",unhide:"Unhide device overview",hidden:"The following device overviews are hidden",see_all:"Ver tudo",turn_all_off:"Turn all off",on:"ligado",open:"aberto",cover:"Persiana",light:"Luz",climate:"Clima",sensor:"Sensor",binary_sensor:"Sensor binário",media_player:"Reprodutor de mídia",remote:"Controlo remoto",scene:"Cena",number:"Número",switch:"Interruptor",button:"Botão",water_heater:"Aquecedor de água",camera:"Camera",select:"Select",vacuum:"Aspirador",fan:"Ventoinha",door:"Porta",window:"Janela",vibration:"Vibração",motion:"Movimento",device_tracker:"Rastreador de dispositivo",lock:"Fechadura",siren:"Siren",input_boolean:"Booleano de entrada",weather:"Clima",moisture:"Umidade",input_select:"Seleção de entrada",carbon_monoxide:"Monóxido de carbono",gas:"Gás",problem:"Problema",safety:"Segurança",smoke:"Fumo",tamper:"Adulterar",update:"Update"},more:{title:"Mais",title_plural:"Páginas adicionais",pages:"Páginas",create:"Criar mais uma página",edit:"Editar página adicional",name_required:"Você deve especificar um nome para a página",icon_required:"Se você quiser adicioná-lo à barra de navegação, você deve selecionar um ícone!",add_navbar:"Adicione mais esta página na barra de navegação principal",name:"Nome da página adicional",icon:"Ícone da página adicional"},blueprint:{title:"Esquema",title_plural:"Esquemas",yaml_required:"Nenhum código YAML inserido!",installed:"Instalado",no_blueprints_installed:"Nenhum esquema instalada",not_installed:"Não instalado",installed_blueprints:"Esquemas instalados",type:"Tipo de esquema",used_custom_cards:"Cartões personalizados usados",use:"Use este esquema",install:"Instalar esquema",yaml_code:"Código YAML do esquema",instruction:"Procure o esquema que deseja instalar em Dwains Dashboard Community Blueprints Github e cole o código yaml do mesmo abaixo. Após a instalação bem sucedida, o lovelace e esta página serão recarregadas. Então você pode usar o esquema instalado."}},sv:{global:{enable_edit_mode:"Aktivera redigeringsläge",disable_edit_mode:"Inaktivera redigeringsläge",version:"Version",disable_clock:"Inaktivera klocka",am_pm_clock:"AM/PM clock",disable_welcome_message:"Inaktivera välkomstmeddelande",settings:"Globala inställningar",dashboard_information:"Dashboardinformation",alarm_entity:"Larmentitet",weather_entity:"Väderentitet",greeting_morning:"God morgon",greeting_afternoon:"God middag",greeting_evening:"God kväll",v2_mode:"Aktivera Dwains Dashboard v2-läge (layout)",disable_sensor_graph:"Inaktivera visning av sensor som graf"},editor:{lovelace_card:"Lovelacekort",create_lovelace_card:"Skapa ett nytt lovelacekort från början",dwains_dashboard_blueprint:"Dwains Dashboard-blueprint",use_dwains_dashboard_blueprint:"Använd en Dwains Dashboard-blueprint för att skapa ett kort",row_span:"Radspann",row:"Rad",rows:"Rader",col_span:"Kolumnspann",column:"Kolumn",columns:"Kolumner",default_col_row:"Standardkolumn- och radstorlek",large_col_row:"Kolumn- och radstorlek för stora skärmar",extra_large_col_row:"Kolumn- och radstorlek för extra stora skärmar"},entity:{title:"Entitet",title_plural:"entiteter",add_card_to:"Lägg till kort till ",edit_entity:"Redigera entitet",edit_entity_card:"Redigera entitetskort",edit_entity_popup_card:"Redigera entitets-pop up-kort",add_to_favorites:"Lägg till i favoriter",remove_from_favorites:"Ta bort från favoriter",popup_card:"Pop up-kort",entity_card:"Entitetskort",settings:"Entitetsinställningar",group:"Gruppera efter enheter",ungroup:"Avgruppera efter enheter",enable:"Aktivera entitet",disable:"Inaktivera entitet i DD",disable_all:"Inaktivera alla entiteter",hide_all:"Göm alla entiteter",exclude:"Exkludera entitet i DD",hide:"Dölj entitet i DD",unhide:"Ta fram entitet",use_popup_card:"Använd eget pop up-kort",use_entity_card:"Använd eget entitetskort",friendly_name:"Byt namn för DD",hidden:"Följande entiteter är dolda:",disabled:"Följande entiteter är inaktiverade:",unavailable:"Följande entiteter är otillgängliga:"},favorite:{title:"Favorit",title_plural:"Favoriter",all_favorites:"Alla favoriter"},home:{title:"Hem"},area:{title:"Område",title_plural:"Områden",edit_area_button:"Redigera områdesknapp",group_by_floor:"Gruppera efter våningsplan",ungroup_by_floor:"Avgruppera efter våningsplan",icon:"Områdesikon",hide_icon:"Dölj ikon",floor:"Våningsplan",no_floor:"Inget våningsplan",disable:"Inaktivera område i DD",disabled:"Följande områden är inaktiverade:",enable:"Aktivera område"},device:{title:"Enhet",title_plural:"enheter",edit_device_button:"Redigera enhetsknapp",edit_device_card:"Ställ in anpassade entitetskort för domän ",edit_device_popup:"Ställ in anpassade entitetspopups för domän ",current_blueprint_card:"Du använder för närvarande följande blueprint för alla entitetskort i domänen ",current_blueprint_popup:"Du använder för närvarande följande blueprint för alla entitetspopups i domänen ",icon_required:"Om du vill lägga till den till navigationslisten måste du välja en ikon!",icon:"Enhetsikon",show_in_navbar:"Lägg till enhetssida till huvudnavigationslisten",hide:"Dölj enhetsöversikt",unhide:"Ta fram enhetsöversikt",hidden:"Följande enhetsöversikter är dolda",see_all:"Se alla",turn_all_off:"Stäng av alla",on:"på",open:"öppen",cover:"Skydd",light:"Belysning",climate:"Klimat",sensor:"Sensorer",binary_sensor:"Binära sensorer",media_player:"Mediaspelare",remote:"Fjärrkontroll",scene:"Scener",number:"Nivåer",switch:"Kontakter",button:"Knappar",water_heater:"Varmvattenberedare",camera:"Kameror",select:"Flervalslistor",vacuum:"Dammsugare",fan:"Fläktar",door:"Dörr",window:"Fönster",vibration:"Vibration",motion:"Rörelse",device_tracker:"Enhetsspårare",lock:"Lås",siren:"Siren",input_boolean:"Växlare",weather:"Väder",moisture:"Fuktighet",input_select:"Inmatningsval",carbon_monoxide:"Kolmonoxid",gas:"Gas",problem:"Problem",safety:"Säkerhet",smoke:"Rök",tamper:"Manipulation",update:"Uppdatera",person:"Person",alarm_control_panel:"Larmkontrollpanel",automation:"Automation",group:"Gruppera efter områden",ungroup:"Avgruppera efter områden"},more:{title:"Mer",title_plural:"Mersidor",pages:"sidor",create:"Skapa ny mersida",edit:"Redigera mersida",name_required:"Du måste ange ett namn för sidan",icon_required:"Om du vill lägga till den till navigationslisten måste du välja en ikon!",add_navbar:"Lägg till denna mersida till huvudnavigationslisten",name:"Namn på mersida",icon:"Ikon för mersida"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"Ingen YAML-kod inmatad!",installed:"Installerad",no_blueprints_installed:"Inga blueprints installerade",not_installed:"Inte installerad",installed_blueprints:"Installerade blueprints",type:"Typ av blueprint",used_custom_cards:"Använda skräddarsydda kort",use:"Använd denna blueprint",install:"Installera blueprint",yaml_code:"Blueprint YAML-kod",instruction:"Leta upp den blueprint du vill installera på Dwains Dashboard Community Blueprints Github och klistra in blueprintens YAML-kod nedanför. Efter en lyckad installation kommer lovelace och denna sida att laddas om. Du kan sedan använda den installerade blueprinten."}},it:{global:{enable_edit_mode:"Abilita la modalità di modifica",disable_edit_mode:"Disabilita la modalità di modifica",version:"Versione",disable_clock:"Disattiva orologio",am_pm_clock:"AM/PM clock",disable_welcome_message:"Disabilita il messaggio di Benvenuto",settings:"Impostazioni Globali",dashboard_information:"Inpostazioni Dashboard",alarm_entity:"Entità di allarme",weather_entity:"Entità meteorologica",greeting_morning:"Buon giorno",greeting_afternoon:"Buon pomeriggio",greeting_evening:"Buona serata",v2_mode:"Enable Dwains Dashboard v2 mode (layout)",disable_sensor_graph:"Disattiva la visualizzazione del sensore come grafico"},editor:{lovelace_card:"Lovelace Card",create_lovelace_card:"Crea una nuova card lovelace da zero",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Usa Dwain Dashboard Blueprint per creare una carta",row_span:"Intervallo di riga",row:"Riga",rows:"Righe",col_span:"Col span",column:"Colonna",columns:"Colonne",default_col_row:"Colore predefinito e dimensione della riga",large_col_row:"Dimensione colonna e riga a schermo grande",extra_large_col_row:"Dimensione colonna e riga a schermo intero"},entity:{title:"Entità",title_plural:"entità",add_card_to:"Aggiungi carta a",edit_entity:"Modifica entità",edit_entity_card:"Modifica scheda entità",edit_entity_popup_card:"Modifica scheda popup entità",add_to_favorites:"Aggiungi ai preferiti",remove_from_favorites:"Rimuovi dai preferiti",popup_card:"Scheda popup",entity_card:"Entità card",settings:"Entità Impostazioni",group:"Raggruppa per dispositivi",ungroup:"Separa per dispositivi",enable:"Abilita entità",disable:"Disabilita entità in DD",disable_all:"Disable all entities",hide_all:"Hide all entities",exclude:"Exclude entity in DD",hide:"Nascondi entità in DD",unhide:"Mostra entità",use_popup_card:"Usa la tua scheda popup",use_entity_card:"Usa la entity card",friendly_name:"Rinomina per DD",hidden:"Le seguenti entità sono nascoste:",disabled:"Le seguenti entità sono disabilitate:",unavailable:"Le seguenti entità non sono disponibili:"},favorite:{title:"Preferito",title_plural:"Preferiti",all_favorites:"Tutti i preferiti"},home:{title:"Home"},area:{title:"Zona",title_plural:"Zone",edit_area_button:"Modifica pulsante area",group_by_floor:"Raggruppa per piano",ungroup_by_floor:"Separa per piano",icon:"Icona della zona",hide_icon:"Nascondi icona",floor:"Piano della zona",no_floor:"Nessun pavimento",disable:"Disable area in DD",disabled:"The following areas are disabled:",enable:"Enable area"},device:{title:"Dispositivo",title_plural:"Dispositivi",edit_device_button:"Pulsante Modifica dispositivo",edit_device_card:"Imposta la scheda entità personalizzate per il dominio ",edit_device_popup:"Imposta il popup di entità personalizzate per il dominio ",current_blueprint_card:"Attualmente stai utilizzando il seguente progetto per tutte le schede entità nel dominio ",current_blueprint_popup:"Attualmente stai utilizzando il seguente blueprint per tutti i popup di entità nel dominio ",icon_required:"Se vuoi aggiungerlo alla barra di navigazione devi selezionare una icona!",icon:"Icona del dispositivo",show_in_navbar:"Aggiungi la pagina del dispositivo nella barra di navigazione principale",hide:"Hide device overview",unhide:"Unhide device overview",hidden:"The following device overviews are hidden",see_all:"Vedi tutto",turn_all_off:"Turn all off",on:"su",open:"aprire",cover:"Coperchio",light:"Luce",climate:"Clima",sensor:"Sensore",binary_sensor:"Sensore binario",media_player:"Media player",remote:"A Distanza",scene:"Scena",number:"Numero",switch:"Interruttore",button:"Bottone",water_heater:"Scaldabagno",camera:"Camera",select:"Selezionato",vacuum:"Aspirapolvere",fan:"Ventilatore",door:"Porta",window:"Finestra",vibration:"Vibrazione",motion:"Movimento",device_tracker:"Localizzatore di dispositivi",lock:"Serratura",siren:"Siren",input_boolean:"Input booleano",weather:"Condizioni meteo",moisture:"Umidità",input_select:"Seleziona input",carbon_monoxide:"Monossido di carbonio",gas:"Gas",problem:"Problema",safety:"Sicurezza",smoke:"Fumo",tamper:"Manomettere",update:"Aggiornare",person:"Persona",alarm_control_panel:"Pannello di controllo allarme",automation:"Automation",group:"Group by areas",ungroup:"Ungroup by areas"},more:{title:"Di più",title_plural:"Più pagine",pages:"pagine",create:"Crea una nuova pagina",edit:"Modifica più pagina",name_required:"È necessario specificare un nome per la pagina",icon_required:"Se vuoi aggiungerlo alla barra di navigazione devi selezionare una icona!",add_navbar:"Aggiungi questa pagina in più nella barra di navigazione principale",name:"Altro nome di pagina",icon:"Icona della pagina più"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"Nessun codice YAML inserito!",installed:"Installato",no_blueprints_installed:"Nessun blueprints installato",not_installed:"Non installato",installed_blueprints:"Blueprints Installati",type:"Tipo blueprint",used_custom_cards:"Carte personalizzate usate",use:"Usa questo blueprint",install:"installa blueprint",yaml_code:"Blueprint YAML code",instruction:"Cerca il progetto che desideri installare in Dwains Dashboard Community Blueprints Github e incolla il codice yaml del progetto di seguito. Dopo una corretta installazione, lovelace e questa pagina si ricaricherà. Quindi puoi utilizzare il progetto installato."}},es:{global:{enable_edit_mode:"Habilitar modo edición",disable_edit_mode:"Deshabilitar modo edición",version:"Version",disable_clock:"Desactivar reloj",am_pm_clock:"AM/PM clock",disable_welcome_message:"Desabilitar mensaje de bienvenida",settings:"Configuración global",dashboard_information:"información del Dashboard",alarm_entity:"Entidad alarma",weather_entity:"Entidad tiempo",greeting_morning:"Buenos días",greeting_afternoon:"Buenas tardes",greeting_evening:"Buenas noches",v2_mode:"Enable Dwains Dashboard v2 mode (layout)",disable_sensor_graph:"Desactivar la visualización del sensor como gráfico"},editor:{lovelace_card:"Lovelace Card",create_lovelace_card:"Crea una nueva lovelace card desde cero",dwains_dashboard_blueprint:"Dwains Dashboard Blueprint",use_dwains_dashboard_blueprint:"Usar un Blueprint de Dwain Dashboard para crear una tarjeta",row_span:"Intervalo de filas",row:"Fila",rows:"Filas",col_span:"Intervalo de Columnas",column:"Columna",columns:"Columnas",default_col_row:"Tamaño predeterminado de columna y fila",large_col_row:"Tamaño de columna y fila grande",extra_large_col_row:"Tamaño de columna y fila extra grande"},entity:{title:"Entidad",title_plural:"Entidades",add_card_to:"Agregar tarjeta a ",edit_entity:"Editar entidad",edit_entity_card:"Editar tarjeta de entidad",edit_entity_popup_card:"Editar tarjeta emergente de entidad",add_to_favorites:"Agregar a favoritos",remove_from_favorites:"Quitar de favoritos",popup_card:"Tarjeta emergente",entity_card:"Tarjeta de entidad",settings:"Configuración de entidad",group:"Agrupar por dispositivos",ungroup:"Desagrupar por dispositivos",enable:"Habilitar entidad",disable:"Deshabilitar entidad en DD",disable_all:"Disable all entities",hide_all:"Hide all entities",exclude:"Exclude entity in DD",hide:"Ocultar entidad en DD",unhide:"Mostrar entidad",use_popup_card:"Utilizar su propia tarjeta emergente",use_entity_card:"Utilice su propia tarjeta de entidad",friendly_name:"Renombrar en DD",hidden:"Las siguientes entidades están ocultas:",disabled:"Las siguientes entidades estan deshabilitadas:",unavailable:"Las siguientes entidades no están disponibles:"},favorite:{title:"Favorito",title_plural:"Favoritos",all_favorites:"Todos los favoritos"},home:{title:"Home"},area:{title:"Habitación",title_plural:"Habitaciónes",edit_area_button:"Editar Habitación",group_by_floor:"Agrupar por piso",ungroup_by_floor:"Desagrupar por piso",icon:"Icono de Habitación",hide_icon:"Ocultar icono",floor:"Piso de Habitación",no_floor:"Sin piso",disable:"Disable area in DD",disabled:"The following areas are disabled:",enable:"Enable area"},device:{title:"Dispositivo",title_plural:"Dispositivos",edit_device_button:"Editar dispositivo",edit_device_card:"Establecer tarjeta de entidades personalizadas para el dominio ",edit_device_popup:"Establecer una ventana emergente de entidades personalizadas para el dominio",current_blueprint_card:"Actualmente está utilizando el siguiente modelo para todas las tarjetas de entidades en el dominio",current_blueprint_popup:"Actualmente está utilizando el siguiente modelo para todas las ventanas emergentes de entidades en el dominio",icon_required:"Si desea agregarlo a la barra de navegación, debe seleccionar un icono.",icon:"Icono de dispositivo",show_in_navbar:"Agregar página de dispositivo en la barra de navegación principal",hide:"Hide device overview",unhide:"Unhide device overview",hidden:"The following device overviews are hidden",see_all:"Ver todos",turn_all_off:"Turn all off",on:"on",open:"Abierto",cover:"Cover",light:"Luz",climate:"Clima",sensor:"Sensor",binary_sensor:"Sensor binario",media_player:"Reproductor multimedia",remote:"Control remoto",scene:"Escena",number:"Número",switch:"Interruptor",button:"Botón",water_heater:"Calentador de agua",camera:"Cámara",select:"seleccione",vacuum:"Aspiradora",fan:"Ventilador",door:"Puerta",window:"Ventana",vibration:"Vibración",motion:"Movimiento",device_tracker:"Rastreador de dispositivo",lock:"Bloquear",siren:"Siren",input_boolean:"Entrada booleana",weather:"Clima",moisture:"Humedad",input_select:"Selección de entrada",carbon_monoxide:"Monoxido de carbono",gas:"Gas",problem:"Problema",safety:"Seguridad",smoke:"Humo",tamper:"Manipular",update:"Actualizar",person:"Persona",alarm_control_panel:"Panel de control de Alarma",automation:"Automation",group:"Group by areas",ungroup:"Ungroup by areas"},more:{title:"Más",title_plural:"Páginas extra ",pages:"páginas",create:"Crear nueva página extra",edit:"Editar página extra",name_required:"Debe especificar un nombre para la página.",icon_required:"Si desea agregarla a la barra de navegación, debe seleccionar un icono.",add_navbar:"Agregar esta página extra en la barra de navegación principal",name:"Nombre de la página extra",icon:"Icono de la página extra"},blueprint:{title:"Blueprint",title_plural:"Blueprints",yaml_required:"¡No se ingresó ningún código YAML!",installed:"Instalado",no_blueprints_installed:"No hay blueprints instalados",not_installed:"No instalado",installed_blueprints:"Blueprints instalados",type:"Tipo de blueprint",used_custom_cards:"Tarjetas personalizadas usadas",use:"Usar este blueprint",install:"Instalar blueprint",yaml_code:"Blueprint código YAML",instruction:"Busque el blueprint que desea instalar en Dwains Dashboard Community Blueprints Github y pegue el código yaml del blueprint a continuación. Después de una instalación exitosa, lovelace y esta página se volverá a cargar. Entonces podrás usar el plano instalado."}},pl:{global:{enable_edit_mode:"Edytuj",disable_edit_mode:"Wyłącz edycję",version:"Wersja",disable_clock:"Wyłącz zegar",am_pm_clock:"AM/PM clock",disable_welcome_message:"Wyłącz wiadomość powitalną",settings:"Ustawienia ogólne",dashboard_information:"Informacje o Dashboard",alarm_entity:"Encja alarmu",weather_entity:"Encja pogody",greeting_morning:"Dzień Dobry",greeting_afternoon:"Miłego popołudnia",greeting_evening:"Dobry wieczór",v2_mode:"Włącz tryb Dwains Dashboard v2 (wygląd)",disable_sensor_graph:"Wyłącz wyświetlanie czujnika jako wykresu"},editor:{lovelace_card:"Karta Lovelace",create_lovelace_card:"Utwórz nową kartę Lovelace",dwains_dashboard_blueprint:"Schemat Dwains Dashboard",use_dwains_dashboard_blueprint:"Użyj schematu Dwains Dashboard do stworzenia karty",row_span:"Szerokość wierszy",row:"Wiersz",rows:"Wiersze",col_span:"Szerokość kolumn",column:"Kolumna",columns:"Kolumny",default_col_row:"Domyślna szerokość kolumn i wierszy",large_col_row:"Duży ekran - szerokość kolumn i wierszy",extra_large_col_row:"Wielki ekran - szerokość kolumn i wierszy"},entity:{title:"Encja",title_plural:"Encje",add_card_to:"Dodaj kartę do: ",edit_entity:"Edytuj encję",edit_entity_card:"Edytuj kartę encji",edit_entity_popup_card:"Edytuj wyskakującą kartę",add_to_favorites:"Dodaj do Ulubionych",remove_from_favorites:"Usuń z Ulubionych",popup_card:"Wyskakująca karta",entity_card:"Karta encji",settings:"Ustawienia encji",group:"Grupuj według urządzeń",ungroup:"Rozgrupuj według urządzeń",enable:"Włącz encję",disable:"Wyłącz encję w DD",disable_all:"Wyłącz wszystkie encje",hide_all:"Ukryj wszystkie encje",exclude:"Wyłącz encje w DD",hide:"Ukryj encje w DD",unhide:"Odkryj encje",use_popup_card:"Użyj własnej wyskakującej karty",use_entity_card:"Użyj własnej karty encji",friendly_name:"Przyjazna nazwa DD:",hidden:"Ukryte encje:",disabled:"Wyłączone encje:",unavailable:"Niedostępne encje:"},favorite:{title:"Ulubione",title_plural:"Ulubione",all_favorites:"Wszystkie Ulubione"},home:{title:"Strona główna"},area:{title:"Obszar",title_plural:"Obszary",edit_area_button:"Edytuj przycisk obszaru",group_by_floor:"Grupuj według pięter",ungroup_by_floor:"Rozgrupuj według pięter",icon:"Ikony obszarów",hide_icon:"Ukryj ikonę",floor:"Obszar pięter",no_floor:"Brak pięter",disable:"Wyłącz obszar",disabled:"Obszary wyłączone:",enable:"Włącz obszar"},device:{title:"Urządzenie",title_plural:"Urządzenia",edit_device_button:"Edytuj przycisk urządzenia",edit_device_card:"Edytuj własną encję karty dla domeny",edit_device_popup:"Edytuj własną wyskakującą encję dla domeny",current_blueprint_card:"Obecnie używany schemat dla wszystkich encji w domenie: ",current_blueprint_popup:"Obecnie używany schemat dla wszystkich wyskakujących encji w domenie: ",icon_required:"Jeśli chcesz dodać urządzenie do paska nawigacyjnego, wybierz jego ikonę!",icon:"Ikony urządzeń:",show_in_navbar:"Pokaż urządzenie w pasku nawigacyjnym",hide:"Ukryj przegląd urządzeń",unhide:"Pokaż przegląd urządzeń",hidden:"Urządzenia ukryte:",see_all:"Zobacz wszystkie",turn_all_off:"Wyłącz wszystkie",on:"Włączony",open:"Otwarty",cover:"Roleta",light:"Światło",climate:"Termostat",sensor:"Sensor",binary_sensor:"Sensor binarny",media_player:"Odtwarzacz multimediów",remote:"Zdalny",scene:"Scena",number:"Liczba",switch:"Przełącznik",button:"Przycisk",water_heater:"Podgrzewacz wody",camera:"Kamera",select:"Wybierz",vacuum:"Odkurzacz",fan:"Wentylator",door:"Drzwi",window:"Okno",vibration:"Wibracja",motion:"Ruch",device_tracker:"Śledzenie urządzeń",lock:"Zamek",siren:"Siren",input_boolean:"Wybór przełącznika",weather:"Pogoda",moisture:"Wilgoć",input_select:"Wybór wejścia",carbon_monoxide:"Tlenek węgla",gas:"Gaz",problem:"Problem",safety:"Bezpieczeństwo",smoke:"Dym",tamper:"Sabotaż",update:"Aktualizacja",person:"Osoba",alarm_control_panel:"Panel alarmu",automation:"Automatyka",group:"Grupuj wg obszarów",ungroup:"Rozgrupuj wg obszarów"},more:{title:"Więcej",title_plural:"Więcej stron",pages:"Strony",create:"Utwórz więcej nowych stron",edit:"Edytuj więcej stron",name_required:"Podaj nazwę strony:",icon_required:"Jeśli chcesz dodać stronę do paska nawigacyjnego, wybierz jej ikonę!",add_navbar:"Dodaj tę stronę do paska nawigacyjnego",name:"Więcej nazw stron",icon:"Więcej ikon strony"},blueprint:{title:"Schemat",title_plural:"Schematy",yaml_required:"Nie wprowadzono kodu YAML!",installed:"Zainstalowane",no_blueprints_installed:"Brak zainstalowanego schematu",not_installed:"Nie zainstalowano",installed_blueprints:"Zainstalowane schematy:",type:"Typ schematu",used_custom_cards:"Używane karty niestandardowe:",use:"Użyj tego schematu",install:"Zainstaluj schemat",yaml_code:"Kod YAML schematu",instruction:"Odszukaj żądany schemat na Dwains Dashboard Community Blueprints Github i wklej kod YAML. Po instalacji lovelace strona zostanie ponownie załadowana abyś mógł użyć zainstalowanego schematu. "}},zh:{global:{enable_edit_mode:"启用编辑模式",disable_edit_mode:"禁用编辑模式",version:"版本",disable_clock:"禁用时钟",am_pm_clock:"AM/PM 时钟",disable_welcome_message:"禁用欢迎消息",settings:"全局设置",dashboard_information:"仪表板信息",alarm_entity:"警报实体",weather_entity:"天气实体",greeting_morning:"早上好",greeting_afternoon:"下午好",greeting_evening:"晚上好",v2_mode:"启用 Dwains 仪表板 v2 模式（布局）",disable_sensor_graph:"禁用将传感器显示为图表"},editor:{lovelace_card:"Lovelace 卡片",create_lovelace_card:"从头开始创建新的 Lovelace 卡片",dwains_dashboard_blueprint:"Dwains 仪表板蓝图",use_dwains_dashboard_blueprint:"使用 Dwain 仪表板蓝图创建卡片",row_span:"行跨度",row:"行",rows:"行",col_span:"列跨度",column:"列",columns:"列",default_col_row:"默认列和行大小",large_col_row:"大屏幕列和行大小",extra_large_col_row:"特大屏幕列和行大小"},entity:{title:"实体",title_plural:"实体",add_card_to:"将卡片添加到",edit_entity:"编辑实体",edit_entity_card:"编辑实体卡片",edit_entity_popup_card:"编辑实体弹出卡片",add_to_favorites:"添加到收藏夹",remove_from_favorites:"从收藏夹中删除",popup_card:"弹出卡片",entity_card:"实体卡片",settings:"实体设置",group:"按设备分组",ungroup:"取消按设备分组",enable:"启用实体",disable:"在 DD 中禁用实体",disable_all:"禁用所有实体",hide_all:"隐藏所有实体",exclude:"在 DD 中排除实体",hide:"在 DD 中隐藏实体",unhide:"取消隐藏实体",use_popup_card:"使用自己的弹出卡片",use_entity_card:"使用自己的实体卡片",friendly_name:"为 DD 重命名",hidden:"以下实体已隐藏：",disabled:"以下实体已禁用：",unavailable:"以下实体不可用："},favorite:{title:"收藏夹",title_plural:"收藏夹",all_favorites:"所有收藏夹"},home:{title:"首页"},area:{title:"区域",title_plural:"区域",edit_area_button:"编辑区域按钮",group_by_floor:"按楼层分组",ungroup_by_floor:"取消按楼层分组",icon:"区域图标",hide_icon:"隐藏图标",floor:"区域楼层",no_floor:"没有楼层",disable:"在 DD 中禁用区域",disabled:"以下区域已禁用：",enable:"启用区域"},device:{title:"设备",title_plural:"设备",edit_device_button:"编辑设备按钮",edit_device_card:"为领域设置自定义实体卡片",edit_device_popup:"为领域设置自定义弹出实体",current_blueprint_card:"您当前正在使用以下蓝图为领域中所有实体卡片：",current_blueprint_popup:"您当前正在使用以下蓝图为领域中所有弹出实体：",icon_required:"如果要将其添加到导航栏，必须选择一个图标！",icon:"设备图标",show_in_navbar:"在主导航栏中添加设备页面",hide:"隐藏设备概述",unhide:"取消隐藏设备概述",hidden:"以下设备概述已隐藏",see_all:"查看全部",turn_all_off:"全部关闭",on:"开",open:"打开",cover:"盖",light:"灯",climate:"气候",sensor:"传感器",binary_sensor:"二进制传感器",media_player:"媒体播放器",remote:"遥控器",scene:"场景",number:"数字",switch:"开关",button:"按钮",water_heater:"热水器",camera:"摄像头",select:"选择",vacuum:"吸尘器",fan:"风扇",door:"门",window:"窗户",vibration:"振动",motion:"运动",device_tracker:"设备追踪器",lock:"锁",siren:"Siren",input_boolean:"输入布尔值",weather:"天气",moisture:"湿度",input_select:"输入选择",carbon_monoxide:"一氧化碳",gas:"气体",problem:"问题",safety:"安全",smoke:"烟雾",tamper:"篡改",update:"更新",person:"人员",alarm_control_panel:"报警控制面板",automation:"自动化",group:"按区域分组",ungroup:"取消按区域分组",update:"更新",script:"脚本",time:"时间",event:"事件",text:"文本"},more:{title:"更多",title_plural:"更多页面",pages:"页",create:"创建新的更多页面",edit:"编辑更多页面",name_required:"您必须为页面指定名称",icon_required:"如果要添加到导航栏，必须选择一个图标！",add_navbar:"将此更多页面添加到主导航栏",name:"更多页面名称",icon:"更多页面图标"},blueprint:{title:"蓝图",title_plural:"蓝图",yaml_required:"未输入 YAML 代码！",installed:"已安装",no_blueprints_installed:"未安装蓝图",not_installed:"未安装",installed_blueprints:"已安装蓝图",type:"类型蓝图",used_custom_cards:"已使用自定义卡片",use:"使用此蓝图",install:"安装蓝图",yaml_code:"蓝图 YAML 代码",instruction:"在 Dwains Dashboard Community Blueprints Github 中查找要安装的蓝图，并将蓝图 YAML 代码粘贴到下面。安装成功后，Lovelace 和此页面将重新加载。然后，您可以使用已安装的蓝图。"}}},r=(e,t)=>t.split(".").reduce((e,t)=>e&&e[t]||null,e),o=(e,t,i=void 0,o="unknown")=>{const n=e.selectedLanguage||e.language||e.locale&&e.locale.language||"en",s=n.split("-")[0];return a[n]&&r(a[n],t)||e&&e.resources&&e.resources[n]&&e.resources[n][i]||a[s]&&r(a[s],t)||r(a.en,t)||o}},7969(e,t,i){"use strict";i.d(t,["K5",0,["cover"],"My",0,{"clear-night":"mdi:weather-night",cloudy:"mdi:weather-cloudy",overcast:"mdi:weather-cloudy-arrow-right",fog:"mdi:weather-fog",hail:"mdi:weather-hail",lightning:"mdi:weather-lightning","lightning-rainy":"mdi:weather-lightning-rainy",partlycloudy:"mdi:weather-partly-cloudy",pouring:"mdi:weather-pouring",rainy:"mdi:weather-rainy",snowy:"mdi:weather-snowy","snowy-rainy":"mdi:weather-snowy-rainy",sunny:"mdi:weather-sunny",windy:"mdi:weather-windy","windy-variant":"mdi:weather-windy-variant"},"R9",0,["vacuum","media_player","lock"],"SG",0,["button","calendar","entity","gauge","history-graph","light","media-control","picture-entity","sensor","thermostat","weather-forecast","custom:button-card","custom:mushroom-fan-card","custom:mushroom-cover-card","custom:mushroom-entity-card","custom:mushroom-light-card"],"Su",0,{light:"mdi:lightbulb",climate:"mdi:thermostat",switch:"mdi:power-plug",fan:"mdi:fan",sensor:"mdi:eye",humidity:"mdi:water-percent",temperature:"mdi:thermometer",binary_sensor:"mdi:radiobox-blank",motion:"mdi:motion-sensor",occupancy:"mdi:home-account",presence:"mdi:motion-sensor",door:"mdi:door-open",window:"mdi:window-open-variant",vibration:"mdi:vibrate",moisture:"mdi:water-alert",vacuum:"mdi:robot-vacuum",media_player:"mdi:cast-connected",camera:"mdi:video",cover:"mdi:window-shutter",remote:"mdi:remote",scene:"mdi:palette",number:"mdi:ray-vertex",button:"mdi:gesture-tap-button",water_heater:"mdi:thermometer",select:"mdi:format-list-bulleted",lock:"mdi:lock",device_tracker:"mdi:radar",person:"mdi:account-multiple",weather:"mdi:weather-cloudy",automation:"mdi:robot-outline",alarm_control_panel:"mdi:shield-home",siren:"mdi:alarm-light-outline",unknown:"mdi:help-circle-outline",text:"mdi:format-text",event:"mdi:calendar-clock",update:"mdi:cloud-upload",script:"mdi:file-document-outline",time:"mdi:clock-outline",input_boolean:"mdi:toggle-switch",group:"mdi:account-group",input_datetime:"mdi:calendar-clock",tts:"mdi:volume-high",zone:"mdi:map-marker-radius"},"TC",0,{armed_away:"mdi:shield-lock",armed_vacation:"mdi:shield-airplane",armed_home:"mdi:shield-home",armed_night:"mdi:shield-moon",armed_custom_bypass:"mdi:security",pending:"mdi:shield-outline",triggered:"mdi:bell-ring",disarmed:"mdi:shield-off"},"Ti",0,["binary_sensor"],"Xt",0,["sensor"],"Zz",0,["light","switch","fan"],"gJ",0,{sensor:["temperature","humidity"],binary_sensor:["motion","occupancy","presence","door","window","vibration","moisture","smoke","running"],cover:["garage","shutter"]},"ge",0,["climate"],"jj",0,["closed","locked","off","docked","idle","standby","paused","auto"],"qJ",0,{light:{on:"mdi:lightbulb",off:"mdi:lightbulb-outline"},switch:{on:"mdi:power-plug",off:"mdi:power-plug"},fan:{on:"mdi:fan",off:"mdi:fan-off"},sensor:{humidity:"mdi:water-percent",temperature:"mdi:thermometer"},binary_sensor:{motion:"mdi:motion-sensor",occupancy:"mdi:home-account",presence:"mdi:motion-sensor",door:"mdi:door-open",window:"mdi:window-open-variant",vibration:"mdi:vibrate",moisture:"mdi:water-alert",smoke:"mdi:smoke-detector-variant-alert",running:"mdi:smoke-detector-outline"},cover:{garage:"mdi:garage",shutter:"mdi:window-shutter"},vacuum:{on:"mdi:robot-vacuum"},media_player:{on:"mdi:cast-connected"},lock:{on:"mdi:lock-open"},climate:{on:"mdi:thermostat"}},"s7",0,["unavailable","unknown"]])},2805(e){"use strict";const t=Object.freeze({configuration:"dwains_dashboard/configuration/get",navigation:"dwains_dashboard/navigation/get",morePages:"dwains_dashboard/more_pages/get",morePage:"dwains_dashboard/more_page/get",blueprints:"dwains_dashboard/get_blueprints",notifications:"dwains_dashboard_notification/get",areas:"config/area_registry/list",devices:"config/device_registry/list",entities:"config/entity_registry/list",floors:"config/floor_registry/list"}),i=Object.freeze(Object.fromEntries(Object.entries(t).map(([e,t])=>[e,Object.freeze({type:t})])));e.exports={READ_MESSAGES:i,READ_TYPES:t}},9012(e,t,i){"use strict";const{READ_TYPES:a}=i(2805),r=new Set(Object.values(a));class o{constructor({ttl:e=3e3,now:t=()=>Date.now(),reportError:i=(e,t)=>console.error(e,t),reportCompatibility:a=e=>console.info(e)}={}){this._ttl=e,this._now=t,this._reportError=i,this._reportCompatibility=a,this._connections=new WeakMap,this._unsupportedCapabilities=new WeakMap}readPreferred(e,t,i,{capability:a=t?.type,selectFallback:r=e=>e}={}){const o=e?.connection||e;if("object"!=typeof o&&"function"!=typeof o||null===o)return Promise.reject(new TypeError("A stable Home Assistant connection is required"));let n=this._unsupportedCapabilities.get(o);n||(n=new Set,this._unsupportedCapabilities.set(o,n));const s=()=>this.read(e,i).then(r);return n.has(a)?s():this.read(e,t).catch(e=>{if("unknown_command"!==e?.code)throw e;return n.add(a),this._reportCompatibility(`Home Assistant does not expose ${t.type}; using the compatible configuration read.`),s()})}read(e,t){if(!e||"function"!=typeof e.callWS)return Promise.reject(new TypeError("A Home Assistant callWS client is required"));if(!t||!r.has(t.type))return Promise.reject(new TypeError("Only registered read-only messages may be cached"));const i=e.connection||e;if("object"!=typeof i&&"function"!=typeof i||null===i)return Promise.reject(new TypeError("A stable Home Assistant connection is required"));let a,o=this._connections.get(i);o||(o={cache:new Map,inflight:new Map,generations:new Map,invalidated:!1},this._connections.set(i,o));try{a=JSON.stringify(t)}catch(e){return Promise.reject(e)}const n=o.generations.get(a)||0,s=o.cache.get(a);if(s&&this._now()-s.storedAt<this._ttl)return Promise.resolve(s.value);const d=o.inflight.get(a);if(d&&d.generation===n)return d.promise;let l;return l=Promise.resolve().then(()=>e.callWS({...t})).then(i=>(o.inflight.get(a)?.promise===l&&o.inflight.delete(a),o.invalidated||(o.generations.get(a)||0)!==n?this.read(e,t):(o.cache.set(a,{storedAt:this._now(),value:i}),i)),i=>{if(o.inflight.get(a)?.promise===l&&o.inflight.delete(a),o.invalidated||(o.generations.get(a)||0)!==n)return this.read(e,t);throw i}),o.inflight.set(a,{generation:n,promise:l}),l}readOptional(e,t,i){return this.read(e,t).catch(e=>(this._reportError(`Optional WebSocket read failed: ${t?.type||"unknown"}`,e),i))}invalidate(e,t){if(!e)return;const i=e.connection||e;if(("object"==typeof i||"function"==typeof i)&&null!==i){const e=this._connections.get(i);if(!e)return;if(t){let i;try{i=JSON.stringify(t)}catch(e){return void this._reportError("Unable to invalidate WebSocket read",e)}return e.generations.set(i,(e.generations.get(i)||0)+1),e.cache.delete(i),void e.inflight.delete(i)}e.invalidated=!0,this._connections.delete(i)}}}const n=new o;e.exports={CACHEABLE_READ_TYPES:r,WebSocketReadStore:o,websocketReadStore:n}},8987(e,t,i){"use strict";function a(e){for(var t=1;t<arguments.length;t++){var i=arguments[t];for(var a in i)"__proto__"!==a&&(e[a]=i[a])}return e}i.d(t,{A:()=>r});var r=function e(t,i){function r(e,r,o){if("undefined"!=typeof document){"number"==typeof(o=a({},i,o)).expires&&(o.expires=new Date(Date.now()+864e5*o.expires)),o.expires&&(o.expires=o.expires.toUTCString()),e=encodeURIComponent(e).replace(/%(2[346B]|5E|60|7C)/g,decodeURIComponent).replace(/[()]/g,escape);var n="";for(var s in o)o[s]&&(n+="; "+s,!0!==o[s]&&(n+="="+o[s].split(";")[0]));return document.cookie=e+"="+t.write(r,e)+n}}return Object.create({set:r,get:function(e){if("undefined"!=typeof document&&(!arguments.length||e)){for(var i=document.cookie?document.cookie.split("; "):[],a={},r=0;r<i.length;r++){var o=i[r].split("="),n=o.slice(1).join("=");try{var s=decodeURIComponent(o[0]);if(s in a||(a[s]=t.read(n,s)),e===s)break}catch(e){}}return e?a[e]:a}},remove:function(e,t){r(e,"",a({},t,{expires:-1}))},withAttributes:function(t){return e(this.converter,a({},this.attributes,t))},withConverter:function(t){return e(a({},this.converter,t),this.attributes)}},{attributes:{value:Object.freeze(i)},converter:{value:Object.freeze(t)}})}({read:function(e){return'"'===e[0]&&(e=e.slice(1,-1)),e.replace(/(%[\dA-F]{2})+/gi,decodeURIComponent)},write:function(e){return encodeURIComponent(e).replace(/%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,decodeURIComponent)}},{path:"/"})},6752(e,t,i){"use strict";const a=globalThis,r=e=>e,o=a.trustedTypes,n=o?o.createPolicy("lit-html",{createHTML:e=>e}):void 0,s="$lit$",d=`lit$${Math.random().toFixed(9).slice(2)}$`,l="?"+d,c=`<${l}>`,h=document,p=()=>h.createComment(""),u=e=>null===e||"object"!=typeof e&&"function"!=typeof e,m=Array.isArray,g=e=>m(e)||"function"==typeof e?.[Symbol.iterator],_="[ \t\n\f\r]",f=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,b=/-->/g,v=/>/g,y=RegExp(`>|${_}(?:([^\\s"'>=/]+)(${_}*=${_}*(?:[^ \t\n\f\r"'\`<>=]|("|')|))|$)`,"g"),w=/'/g,x=/"/g,k=/^(?:script|style|textarea|title)$/i,$=e=>(t,...i)=>({_$litType$:e,strings:t,values:i}),C=$(1),E=($(2),$(3),Symbol.for("lit-noChange")),A=Symbol.for("lit-nothing"),S=new WeakMap,D=h.createTreeWalker(h,129);function z(e,t){if(!m(e)||!e.hasOwnProperty("raw"))throw Error("invalid template strings array");return void 0!==n?n.createHTML(t):t}const T=(e,t)=>{const i=e.length-1,a=[];let r,o=2===t?"<svg>":3===t?"<math>":"",n=f;for(let t=0;t<i;t++){const i=e[t];let l,h,p=-1,u=0;for(;u<i.length&&(n.lastIndex=u,h=n.exec(i),null!==h);)u=n.lastIndex,n===f?"!--"===h[1]?n=b:void 0!==h[1]?n=v:void 0!==h[2]?(k.test(h[2])&&(r=RegExp("</"+h[2],"g")),n=y):void 0!==h[3]&&(n=y):n===y?">"===h[0]?(n=r??f,p=-1):void 0===h[1]?p=-2:(p=n.lastIndex-h[2].length,l=h[1],n=void 0===h[3]?y:'"'===h[3]?x:w):n===x||n===w?n=y:n===b||n===v?n=f:(n=y,r=void 0);const m=n===y&&e[t+1].startsWith("/>")?" ":"";o+=n===f?i+c:p>=0?(a.push(l),i.slice(0,p)+s+i.slice(p)+d+m):i+d+(-2===p?t:m)}return[z(e,o+(e[i]||"<?>")+(2===t?"</svg>":3===t?"</math>":"")),a]};class M{constructor({strings:e,_$litType$:t},i){let a;this.parts=[];let r=0,n=0;const c=e.length-1,h=this.parts,[u,m]=T(e,t);if(this.el=M.createElement(u,i),D.currentNode=this.el.content,2===t||3===t){const e=this.el.content.firstChild;e.replaceWith(...e.childNodes)}for(;null!==(a=D.nextNode())&&h.length<c;){if(1===a.nodeType){if(a.hasAttributes())for(const e of a.getAttributeNames())if(e.endsWith(s)){const t=m[n++],i=a.getAttribute(e).split(d),o=/([.?@])?(.*)/.exec(t);h.push({type:1,index:r,name:o[2],strings:i,ctor:"."===o[1]?I:"?"===o[1]?j:"@"===o[1]?R:B}),a.removeAttribute(e)}else e.startsWith(d)&&(h.push({type:6,index:r}),a.removeAttribute(e));if(k.test(a.tagName)){const e=a.textContent.split(d),t=e.length-1;if(t>0){a.textContent=o?o.emptyScript:"";for(let i=0;i<t;i++)a.append(e[i],p()),D.nextNode(),h.push({type:2,index:++r});a.append(e[t],p())}}}else if(8===a.nodeType)if(a.data===l)h.push({type:2,index:r});else{let e=-1;for(;-1!==(e=a.data.indexOf(d,e+1));)h.push({type:7,index:r}),e+=d.length-1}r++}}static createElement(e,t){const i=h.createElement("template");return i.innerHTML=e,i}}function q(e,t,i=e,a){if(t===E)return t;let r=void 0!==a?i._$Co?.[a]:i._$Cl;const o=u(t)?void 0:t._$litDirective$;return r?.constructor!==o&&(r?._$AO?.(!1),void 0===o?r=void 0:(r=new o(e),r._$AT(e,i,a)),void 0!==a?(i._$Co??=[])[a]=r:i._$Cl=r),void 0!==r&&(t=q(e,r._$AS(e,t.values),r,a)),t}class O{constructor(e,t){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=t}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:t},parts:i}=this._$AD,a=(e?.creationScope??h).importNode(t,!0);D.currentNode=a;let r=D.nextNode(),o=0,n=0,s=i[0];for(;void 0!==s;){if(o===s.index){let t;2===s.type?t=new P(r,r.nextSibling,this,e):1===s.type?t=new s.ctor(r,s.name,s.strings,this,e):6===s.type&&(t=new L(r,this,e)),this._$AV.push(t),s=i[++n]}o!==s?.index&&(r=D.nextNode(),o++)}return D.currentNode=h,a}p(e){let t=0;for(const i of this._$AV)void 0!==i&&(void 0!==i.strings?(i._$AI(e,i,t),t+=i.strings.length-2):i._$AI(e[t])),t++}}class P{get _$AU(){return this._$AM?._$AU??this._$Cv}constructor(e,t,i,a){this.type=2,this._$AH=A,this._$AN=void 0,this._$AA=e,this._$AB=t,this._$AM=i,this.options=a,this._$Cv=a?.isConnected??!0}get parentNode(){let e=this._$AA.parentNode;const t=this._$AM;return void 0!==t&&11===e?.nodeType&&(e=t.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,t=this){e=q(this,e,t),u(e)?e===A||null==e||""===e?(this._$AH!==A&&this._$AR(),this._$AH=A):e!==this._$AH&&e!==E&&this._(e):void 0!==e._$litType$?this.$(e):void 0!==e.nodeType?this.T(e):g(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==A&&u(this._$AH)?this._$AA.nextSibling.data=e:this.T(h.createTextNode(e)),this._$AH=e}$(e){const{values:t,_$litType$:i}=e,a="number"==typeof i?this._$AC(e):(void 0===i.el&&(i.el=M.createElement(z(i.h,i.h[0]),this.options)),i);if(this._$AH?._$AD===a)this._$AH.p(t);else{const e=new O(a,this),i=e.u(this.options);e.p(t),this.T(i),this._$AH=e}}_$AC(e){let t=S.get(e.strings);return void 0===t&&S.set(e.strings,t=new M(e)),t}k(e){m(this._$AH)||(this._$AH=[],this._$AR());const t=this._$AH;let i,a=0;for(const r of e)a===t.length?t.push(i=new P(this.O(p()),this.O(p()),this,this.options)):i=t[a],i._$AI(r),a++;a<t.length&&(this._$AR(i&&i._$AB.nextSibling,a),t.length=a)}_$AR(e=this._$AA.nextSibling,t){for(this._$AP?.(!1,!0,t);e!==this._$AB;){const t=r(e).nextSibling;r(e).remove(),e=t}}setConnected(e){void 0===this._$AM&&(this._$Cv=e,this._$AP?.(e))}}class B{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,t,i,a,r){this.type=1,this._$AH=A,this._$AN=void 0,this.element=e,this.name=t,this._$AM=a,this.options=r,i.length>2||""!==i[0]||""!==i[1]?(this._$AH=Array(i.length-1).fill(new String),this.strings=i):this._$AH=A}_$AI(e,t=this,i,a){const r=this.strings;let o=!1;if(void 0===r)e=q(this,e,t,0),o=!u(e)||e!==this._$AH&&e!==E,o&&(this._$AH=e);else{const a=e;let n,s;for(e=r[0],n=0;n<r.length-1;n++)s=q(this,a[i+n],t,n),s===E&&(s=this._$AH[n]),o||=!u(s)||s!==this._$AH[n],s===A?e=A:e!==A&&(e+=(s??"")+r[n+1]),this._$AH[n]=s}o&&!a&&this.j(e)}j(e){e===A?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class I extends B{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===A?void 0:e}}class j extends B{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==A)}}class R extends B{constructor(e,t,i,a,r){super(e,t,i,a,r),this.type=5}_$AI(e,t=this){if((e=q(this,e,t,0)??A)===E)return;const i=this._$AH,a=e===A&&i!==A||e.capture!==i.capture||e.once!==i.once||e.passive!==i.passive,r=e!==A&&(i===A||a);a&&this.element.removeEventListener(this.name,this,i),r&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){"function"==typeof this._$AH?this._$AH.call(this.options?.host??this.element,e):this._$AH.handleEvent(e)}}class L{constructor(e,t,i){this.element=e,this.type=6,this._$AN=void 0,this._$AM=t,this.options=i}get _$AU(){return this._$AM._$AU}_$AI(e){q(this,e)}}const H={M:s,P:d,A:l,C:1,L:T,R:O,D:g,V:q,I:P,H:B,N:j,U:R,B:I,F:L},N=a.litHtmlPolyfillSupport;N?.(M,P),(a.litHtmlVersions??=[]).push("3.3.3"),i.d(t,["XX",0,(e,t,i)=>{const a=i?.renderBefore??t;let r=a._$litPart$;if(void 0===r){const e=i?.renderBefore??null;a._$litPart$=r=new P(t.insertBefore(p(),e),e,void 0,i??{})}return r._$AI(e),r},"c0",0,E,"ge",0,H,"qy",0,C,"s6",0,A])},6684(e,t,i){"use strict";i.d(t,{WF:()=>S,AH:()=>d,qy:()=>E.qy});const a=globalThis,r=a.ShadowRoot&&(void 0===a.ShadyCSS||a.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,o=Symbol(),n=new WeakMap;class s{constructor(e,t,i){if(this._$cssResult$=!0,i!==o)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=t}get styleSheet(){let e=this.o;const t=this.t;if(r&&void 0===e){const i=void 0!==t&&1===t.length;i&&(e=n.get(t)),void 0===e&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),i&&n.set(t,e))}return e}toString(){return this.cssText}}const d=(e,...t)=>{const i=1===e.length?e[0]:t.reduce((t,i,a)=>t+(e=>{if(!0===e._$cssResult$)return e.cssText;if("number"==typeof e)return e;throw Error("Value passed to 'css' function must be a 'css' function result: "+e+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(i)+e[a+1],e[0]);return new s(i,e,o)},l=(e,t)=>{if(r)e.adoptedStyleSheets=t.map(e=>e instanceof CSSStyleSheet?e:e.styleSheet);else for(const i of t){const t=document.createElement("style"),r=a.litNonce;void 0!==r&&t.setAttribute("nonce",r),t.textContent=i.cssText,e.appendChild(t)}},c=r?e=>e:e=>e instanceof CSSStyleSheet?(e=>{let t="";for(const i of e.cssRules)t+=i.cssText;return(e=>new s("string"==typeof e?e:e+"",void 0,o))(t)})(e):e,{is:h,defineProperty:p,getOwnPropertyDescriptor:u,getOwnPropertyNames:m,getOwnPropertySymbols:g,getPrototypeOf:_}=Object,f=globalThis,b=f.trustedTypes,v=b?b.emptyScript:"",y=f.reactiveElementPolyfillSupport,w=(e,t)=>e,x={toAttribute(e,t){switch(t){case Boolean:e=e?v:null;break;case Object:case Array:e=null==e?e:JSON.stringify(e)}return e},fromAttribute(e,t){let i=e;switch(t){case Boolean:i=null!==e;break;case Number:i=null===e?null:Number(e);break;case Object:case Array:try{i=JSON.parse(e)}catch(e){i=null}}return i}},k=(e,t)=>!h(e,t),$={attribute:!0,type:String,converter:x,reflect:!1,useDefault:!1,hasChanged:k};Symbol.metadata??=Symbol("metadata"),f.litPropertyMetadata??=new WeakMap;class C extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??=[]).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,t=$){if(t.state&&(t.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((t=Object.create(t)).wrapped=!0),this.elementProperties.set(e,t),!t.noAccessor){const i=Symbol(),a=this.getPropertyDescriptor(e,i,t);void 0!==a&&p(this.prototype,e,a)}}static getPropertyDescriptor(e,t,i){const{get:a,set:r}=u(this.prototype,e)??{get(){return this[t]},set(e){this[t]=e}};return{get:a,set(t){const o=a?.call(this);r?.call(this,t),this.requestUpdate(e,o,i)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??$}static _$Ei(){if(this.hasOwnProperty(w("elementProperties")))return;const e=_(this);e.finalize(),void 0!==e.l&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(w("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(w("properties"))){const e=this.properties,t=[...m(e),...g(e)];for(const i of t)this.createProperty(i,e[i])}const e=this[Symbol.metadata];if(null!==e){const t=litPropertyMetadata.get(e);if(void 0!==t)for(const[e,i]of t)this.elementProperties.set(e,i)}this._$Eh=new Map;for(const[e,t]of this.elementProperties){const i=this._$Eu(e,t);void 0!==i&&this._$Eh.set(i,e)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const t=[];if(Array.isArray(e)){const i=new Set(e.flat(1/0).reverse());for(const e of i)t.unshift(c(e))}else void 0!==e&&t.push(c(e));return t}static _$Eu(e,t){const i=t.attribute;return!1===i?void 0:"string"==typeof i?i:"string"==typeof e?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){this._$ES=new Promise(e=>this.enableUpdating=e),this._$AL=new Map,this._$E_(),this.requestUpdate(),this.constructor.l?.forEach(e=>e(this))}addController(e){(this._$EO??=new Set).add(e),void 0!==this.renderRoot&&this.isConnected&&e.hostConnected?.()}removeController(e){this._$EO?.delete(e)}_$E_(){const e=new Map,t=this.constructor.elementProperties;for(const i of t.keys())this.hasOwnProperty(i)&&(e.set(i,this[i]),delete this[i]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return l(e,this.constructor.elementStyles),e}connectedCallback(){this.renderRoot??=this.createRenderRoot(),this.enableUpdating(!0),this._$EO?.forEach(e=>e.hostConnected?.())}enableUpdating(e){}disconnectedCallback(){this._$EO?.forEach(e=>e.hostDisconnected?.())}attributeChangedCallback(e,t,i){this._$AK(e,i)}_$ET(e,t){const i=this.constructor.elementProperties.get(e),a=this.constructor._$Eu(e,i);if(void 0!==a&&!0===i.reflect){const r=(void 0!==i.converter?.toAttribute?i.converter:x).toAttribute(t,i.type);this._$Em=e,null==r?this.removeAttribute(a):this.setAttribute(a,r),this._$Em=null}}_$AK(e,t){const i=this.constructor,a=i._$Eh.get(e);if(void 0!==a&&this._$Em!==a){const e=i.getPropertyOptions(a),r="function"==typeof e.converter?{fromAttribute:e.converter}:void 0!==e.converter?.fromAttribute?e.converter:x;this._$Em=a;const o=r.fromAttribute(t,e.type);this[a]=o??this._$Ej?.get(a)??o,this._$Em=null}}requestUpdate(e,t,i,a=!1,r){if(void 0!==e){const o=this.constructor;if(!1===a&&(r=this[e]),i??=o.getPropertyOptions(e),!((i.hasChanged??k)(r,t)||i.useDefault&&i.reflect&&r===this._$Ej?.get(e)&&!this.hasAttribute(o._$Eu(e,i))))return;this.C(e,t,i)}!1===this.isUpdatePending&&(this._$ES=this._$EP())}C(e,t,{useDefault:i,reflect:a,wrapped:r},o){i&&!(this._$Ej??=new Map).has(e)&&(this._$Ej.set(e,o??t??this[e]),!0!==r||void 0!==o)||(this._$AL.has(e)||(this.hasUpdated||i||(t=void 0),this._$AL.set(e,t)),!0===a&&this._$Em!==e&&(this._$Eq??=new Set).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(e){Promise.reject(e)}const e=this.scheduleUpdate();return null!=e&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??=this.createRenderRoot(),this._$Ep){for(const[e,t]of this._$Ep)this[e]=t;this._$Ep=void 0}const e=this.constructor.elementProperties;if(e.size>0)for(const[t,i]of e){const{wrapped:e}=i,a=this[t];!0!==e||this._$AL.has(t)||void 0===a||this.C(t,void 0,i,a)}}let e=!1;const t=this._$AL;try{e=this.shouldUpdate(t),e?(this.willUpdate(t),this._$EO?.forEach(e=>e.hostUpdate?.()),this.update(t)):this._$EM()}catch(t){throw e=!1,this._$EM(),t}e&&this._$AE(t)}willUpdate(e){}_$AE(e){this._$EO?.forEach(e=>e.hostUpdated?.()),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&=this._$Eq.forEach(e=>this._$ET(e,this[e])),this._$EM()}updated(e){}firstUpdated(e){}}C.elementStyles=[],C.shadowRootOptions={mode:"open"},C[w("elementProperties")]=new Map,C[w("finalized")]=new Map,y?.({ReactiveElement:C}),(f.reactiveElementVersions??=[]).push("2.1.2");var E=i(6752);const A=globalThis;class S extends C{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){const e=super.createRenderRoot();return this.renderOptions.renderBefore??=e.firstChild,e}update(e){const t=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=(0,E.XX)(t,this.renderRoot,this.renderOptions)}connectedCallback(){super.connectedCallback(),this._$Do?.setConnected(!0)}disconnectedCallback(){super.disconnectedCallback(),this._$Do?.setConnected(!1)}render(){return E.c0}}S._$litElement$=!0,S.finalized=!0,A.litElementHydrateSupport?.({LitElement:S});const D=A.litElementPolyfillSupport;D?.({LitElement:S}),(A.litElementVersions??=[]).push("4.2.2")}};const t={};function i(a){const r=t[a];if(void 0!==r)return r.exports;const o=t[a]={exports:{}};return e[a](o,o.exports,i),o.exports}i.n=e=>{const t=e&&e.__esModule?()=>e.default:()=>e;return i.d(t,{a:t}),t},i.d=(e,t)=>{if(Array.isArray(t))for(var a=0;a<t.length;){var r=t[a++],o=t[a++];i.o(e,r)?0===o&&a++:0===o?Object.defineProperty(e,r,{enumerable:!0,value:t[a++]}):Object.defineProperty(e,r,{enumerable:!0,get:o})}else for(var r in t)i.o(t,r)&&!i.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},i.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),i(4853),i(5535),i(5216),i(8919),i(5142),i(9506),i(297),i(6087),i(5848),i(7863),i(9831),i(6780),i(6659),i(5462),i(8054),i(1100),i(3825),i(8973),i(7237),i(4826),i(3003),i(9640),i(3468),i(6166),i(7377)})();
//# sourceMappingURL=dwains-dashboard.js.map