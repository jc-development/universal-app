exports.ids=[8],exports.modules={139:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var s=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),u=r(3),c=o(u),p=r(174),m=o(p),d=r(117),f=o(d),h=function(e){function t(e){n(this,t);var r=i(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return r.overviewHeaderRef=null,r.bowSizeCompareRef=null,r.dualVideoRef=null,r.performanceRef=null,r.drawCycleChartRef=null,r.aboutCamRef=null,r.accessoriesImageRef=null,r.imageGalleryRef=null,r.state={BowSizeCompareComponent:null,DualVideoComponent:null,PerformanceComponent:null,DrawCycleChartComponent:null,AboutCamComponent:null,AccessoriesImageComponent:null,ImageGalleryComponent:null,bowSizeCompareCounter:0,performanceCounter:0,drawCycleChartCounter:0,aboutCamCounter:0,accessoriesImageCounter:0,imageGalleryCounter:0},r.timeline=new f.default,r.setOverviewRef=r.setOverviewRef.bind(r),r.setBowSizeCompareRef=r.setBowSizeCompareRef.bind(r),r.setPerformanceRef=r.setPerformanceRef.bind(r),r.setDrawCycleChartRef=r.setDrawCycleChartRef.bind(r),r.setAboutCamRef=r.setAboutCamRef.bind(r),r.setAccessoriesImageRef=r.setAccessoriesImageRef.bind(r),r.setImageGalleryRef=r.setImageGalleryRef.bind(r),r.handleScroll=r.handleScroll.bind(r),r.handleActivateComponent=r.handleActivateComponent.bind(r),r.importFactory=r.importFactory.bind(r),r.activateTimeline=r.activateTimeline.bind(r),r}return l(t,e),s(t,[{key:"componentDidMount",value:function(){window.addEventListener("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("scroll",this.handleScroll),this.overviewHeaderRef=null,this.bowSizeCompareRef=null,this.dualVideoRef=null,this.performanceRef=null,this.drawCycleChartRef=null,this.aboutCamRef=null,this.accessoriesImageRef=null,this.imageGalleryRef=null,this.timeline=null}},{key:"activateTimeline",value:function(e){this.timeline.fromTo(this[e+"Ref"],1,{autoAlpha:0},{autoAlpha:1,onComplete:this.setState(a({},e+"Counter",1))})}},{key:"handleActivateComponent",value:function(e){this[e+"Ref"]&&0===this.state[e+"Counter"]&&this.activateTimeline(e)}},{key:"importFactory",value:function(e,t,o){var n=this;this[e+"Ref"].getBoundingClientRect().bottom<=window.innerHeight/1.25&&new Promise(function(e){r.e(26).then(function(o){e(r(307)("./"+t))}.bind(null,r)).catch(r.oe)}).then(function(e){n.setState(a({},t+"Component",e),function(){0===n.state[o+"Counter"]&&n.handleActivateComponent(""+o)})})}},{key:"handleScroll",value:function(){this.overviewHeaderRef&&this.importFactory("overviewHeader","BowSizeCompare","bowSizeCompare"),this.bowSizeCompareRef&&this.importFactory("bowSizeCompare","Performance","performance"),this.performanceRef&&this.importFactory("performance","DrawCycleChart","drawCycleChart"),this.drawCycleChartRef&&this.importFactory("drawCycleChart","AboutCam","aboutCam"),this.aboutCamRef&&this.importFactory("aboutCam","AccessoriesImage","accessoriesImage"),this.accessoriesImageRef&&this.importFactory("accessoriesImage","ImageGallery","imageGallery")}},{key:"setOverviewRef",value:function(e){this.overviewHeaderRef=e}},{key:"setBowSizeCompareRef",value:function(e){this.bowSizeCompareRef=e}},{key:"setPerformanceRef",value:function(e){this.performanceRef=e}},{key:"setDrawCycleChartRef",value:function(e){this.drawCycleChartRef=e}},{key:"setAboutCamRef",value:function(e){this.aboutCamRef=e}},{key:"setAccessoriesImageRef",value:function(e){this.accessoriesImageRef=e}},{key:"setImageGalleryRef",value:function(e){this.imageGalleryRef=e}},{key:"render",value:function(){var e=this,t=function(t,r,o){if(e.state[t]&&null!==e.state[t]){var a=e.state[t].default;return c.default.createElement(a,r)}return null};return null!==this.props.bowFamily?c.default.createElement("section",null,this.props.bowFamily.name?c.default.createElement(m.default,{bowFamilyName:this.props.bowFamily.name,overviewRef:this.setOverviewRef,overview:this.props.bowFamily.overview,headerVideo:this.props.bowFamily.headerVideo,headerVideoPoster:this.props.bowFamily.headerVideoPoster,highlights:this.props.bowFamily.highlights,msrp:this.props.bowFamily.bows[0].msrp}):null,t("BowSizeCompareComponent",{bowSizeCompareRef:this.setBowSizeCompareRef,familyName:this.props.bowFamily.name,compareModels:this.props.bowFamily.compareModels}),t("PerformanceComponent",{performanceRef:this.setPerformanceRef,performance:this.props.bowFamily.performance,seriesSlider:this.props.bowFamily.seriesSlider,useTypes:this.props.bowFamily.bows[0].techSpecs.useTypes}),t("DrawCycleChartComponent",{drawCycleChartRef:this.setDrawCycleChartRef}),t("AboutCamComponent",{aboutCamRef:this.setAboutCamRef,aboutCam:this.props.bowFamily.aboutCam}),t("AccessoriesImageComponent",{accessoriesImageRef:this.setAccessoriesImageRef,bowFamilyName:this.props.bowFamily.name,accessoriesImage:this.props.bowFamily.shopAccessoriesImage}),t("ImageGalleryComponent",{imageGalleryRef:this.setImageGalleryRef,imageGallery:this.props.bowFamily.beautyImageGallery})):c.default.createElement("section",null,c.default.createElement("h1",null,"Only The Design Tab works"),c.default.createElement("p",null,"This bow model is under development check back soon for full data set."))}}]),t}(u.Component);t.default=h},168:function(e,t,r){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function n(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),l=r(3),s=function(e){return e&&e.__esModule?e:{default:e}}(l);r(169);var u=function(e){function t(){o(this,t);var e=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.state={currentId:null,currentPrice:null,updating:!1},e.handleSettingData=e.handleSettingData.bind(e),e.handleTotalPricePlusAccessories=e.handleTotalPricePlusAccessories.bind(e),e}return n(t,e),i(t,[{key:"componentDidMount",value:function(){this.handleSettingData()}},{key:"componentDidUpdate",value:function(e){e.id===this.props.id&&e.accessories===this.props.accessories||this.handleSettingData()}},{key:"handleSettingData",value:function(){var e=this,t=this.props.accessories?this.handleTotalPricePlusAccessories():this.props.amount;this.setState({currentId:this.props.id,currentPrice:t,updating:!0},function(){e.setState({updating:!1},function(){void 0!==window.KlarnaUpstream&&window.KlarnaUpstream.load("#"+e.state.currentId,e.state.currentPrice)})})}},{key:"handleTotalPricePlusAccessories",value:function(){var e=parseFloat(this.props.amount/100);e.toFixed(2);var t=function(e){if(e.length>0){return e.map(function(e){return parseFloat(e.node.price)}).reduce(function(e,t){return e+t})}return 0},r=t(this.props.accessories.arrowRests),o=t(this.props.accessories.arrows),a=t(this.props.accessories.bowCases),n=t(this.props.accessories.quivers),i=t(this.props.accessories.slings),l=t(this.props.accessories.stabilizers),s=e+r+o+a+n+i+l;return parseInt(s.toFixed(2).replace(".",""),10)}},{key:"render",value:function(){return null===this.state.currentId||this.state.updating?null:s.default.createElement("div",{className:this.props.className},s.default.createElement("a",{className:"klarna-upstream",id:this.state.currentId,href:"javascript:void(0)","data-merchant-id":"N100242","data-snippet":"StandardMonthlyPrice","data-amount":this.state.currentPrice}))}}]),t}(l.Component);t.default=u},169:function(e,t,r){t=e.exports=r(4)(!1),t.push([e.i,".klarna-heading-wrapper{margin:0 0 1rem;border-top:1px solid;padding:.5rem 0;border-bottom:1px solid}.klarna-heading-wrapper #klarna-upstream-text{font-size:1.3rem!important}.klarna-heading-wrapper p{margin:.2rem 0 0}.bow-model-link .klarna-heading-wrapper{border-color:#ccc}.bow-model-link .klarna-heading-wrapper #klarna-upstream-text{font-size:1rem!important}.bow-model-link .klarna-heading-wrapper p{color:#000;font-size:.9rem}@media screen and (max-width:767px){.klarna-heading-wrapper{margin:2rem 0}.klarna-heading-wrapper #klarna-upstream-text{font-size:1.5rem!important}.klarna-heading-wrapper p{font-size:1rem!important}.bow-model-link .klarna-heading-wrapper{margin:0}}article.enlist .klarna-upstream a{color:#fff!important}.klarna-cart,.klarna-wrapper{margin:0 0 1rem}article.ritual>h5{margin-top:0;padding:1rem;background:hsla(0,0%,100%,.9);box-shadow:1px 4px 17px #000}article.ritual>h5 #klarna-upstream-text{font-size:2rem!important}article.ritual>h5 #klarna-upstream-learnmore{font-size:1.5rem!important}article.ritual>h5 #klarna-upstream-logo>img{width:75px!important;margin-bottom:-1px!important;margin-left:4px!important;margin-right:5px!important;vertical-align:baseline!important}@media screen and (max-width:500px){article.ritual>h5 #klarna-upstream-learnmore{display:block}}#bows-list-page .bow-list-row div .klarna-heading-wrapper{width:80%;border-bottom:1px solid #ccc;border-top:1px solid #ccc}#bows-list-page .bow-list-row div .klarna-heading-wrapper #klarna-upstream-text{font-size:1.6rem!important}#bows-list-page .bow-list-row div .klarna-heading-wrapper>p{color:#000;font-size:1.4rem!important}#bows-list-page .bow-list-row div .klarna-heading-wrapper #klarna-upstream-logo>img{width:52px!important;margin-bottom:-1px!important;margin-left:1px!important;vertical-align:baseline!important;line-height:.5!important}@media screen and (max-width:1300px){#bows-list-page .bow-list-row div .klarna-heading-wrapper,#bows-list-page .bow-list-row div h5{width:90%}}@media screen and (max-width:800px){#bows-list-page .bow-list-row div .klarna-heading-wrapper,#bows-list-page .bow-list-row div h5{width:100%}}",""])},173:function(e,t,r){t=e.exports=r(4)(!1),t.push([e.i,".fullscreen-video{height:auto;width:100%}",""])},174:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),s=r(3),u=o(s),c=r(239),p=r(175);o(p),r(5);r(211);var m=r(168),d=o(m),f=function(e){function t(){return a(this,t),n(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),l(t,[{key:"render",value:function(){var e=this;return u.default.createElement(s.Fragment,null,u.default.createElement("section",{id:"bow-overview-header",ref:this.props.overviewRef},u.default.createElement("header",null,u.default.createElement("h1",null,this.props.overview.h1),function(){return u.default.createElement("div",{className:"klarna"},u.default.createElement(d.default,{id:"overview-page-top-1",amount:e.props.msrp+"00"}))}(),u.default.createElement("h2",null,this.props.overview.h2),u.default.createElement("p",null,this.props.overview.h3)),u.default.createElement(c.FullScreenVideoLoop,{src:this.props.headerVideo,autoPlay:!1,controls:!0,playsInline:!0,posterSrc:this.props.headerVideoPoster,muted:!1}),u.default.createElement("ul",null,this.props.highlights?function(){return e.props.highlights.map(function(e,t){return u.default.createElement("li",{key:t},e)})}():null)))}}]),t}(s.Component);t.default=f},175:function(e,t,r){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function n(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function i(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var l=function(){function e(e,t){for(var r=0;r<t.length;r++){var o=t[r];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,r,o){return r&&e(t.prototype,r),o&&e(t,o),t}}(),s=r(3),u=o(s),c=r(5),p=r(117),m=o(p),d=r(118);r(176);var f=function(e){function t(){a(this,t);var e=n(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return e.imageTimeline=new m.default({paused:!0}),e.image=null,e.button=null,e.handleMouseOverImage=e.handleMouseOverImage.bind(e),e.handleMouseOutImage=e.handleMouseOutImage.bind(e),e}return i(t,e),l(t,[{key:"componentDidMount",value:function(){this.imageTimeline.fromTo(this.image,1,{filter:"brightness(1)",scale:1},{filter:"brightness(0.75)",scale:1.2,ease:d.Power3.easeInOut})}},{key:"handleMouseOverImage",value:function(){this.imageTimeline.play()}},{key:"handleMouseOutImage",value:function(){this.imageTimeline.reverse()}},{key:"componentWillUnmount",value:function(){this.imageTimeline=null,this.image=null}},{key:"render",value:function(){var e=this,t={overflow:"hidden",position:"relative",display:"block"};return u.default.createElement(c.Link,{to:this.props.linkTo,style:t,onMouseOver:this.handleMouseOverImage,onMouseOut:this.handleMouseOutImage},u.default.createElement("img",{className:"promo-bow-banner",ref:function(t){return e.image=t},src:this.props.src,alt:this.props.alt}))}}]),t}(s.Component);t.default=f},176:function(e,t,r){t=e.exports=r(4)(!1),t.push([e.i,"img.promo-bow-banner{object-fit:cover!important;height:auto!important;width:100%!important}.camo-promo{border-bottom:1px solid;padding-bottom:1rem;margin:1rem auto;width:100%}.camo-promo h3,.camo-promo h4{text-align:center}.camo-promo p{margin:1rem auto;width:85%;line-height:150%;font-weight:600}.camo-promo p:last-child{opacity:.7}.camo-promo a:hover{text-decoration:none}.camo-promo button{margin:1rem auto;text-align:center;display:flex;text-transform:uppercase;font-weight:900;border:5px solid;padding:1rem}",""])},211:function(e,t,r){t=e.exports=r(4)(!1),t.push([e.i,"#bow-overview-header{display:grid;grid-template-columns:100%;justify-items:center}#bow-overview-header header{text-align:center;grid-row-start:1;grid-row-end:1;padding:1rem}#bow-overview-header header h1{font-size:300%}#bow-overview-header header h2{font-size:160%;line-height:1.1}#bow-overview-header header h3{font-size:130%;font-weight:400;line-height:1.4}#bow-overview-header header p{font-family:sans-serif;font-weight:400}#bow-overview-header img{grid-row-start:2;grid-row-end:2;height:80vh;width:auto}#bow-overview-header ul{display:grid;grid-template-columns:calc(50% - 1rem);grid-column-gap:1rem;grid-row-gap:1rem;justify-items:center;width:calc(100% - 2rem);background:#050505;margin:0 auto;padding:1rem}#bow-overview-header ul li{font-size:120%;text-transform:uppercase;font-family:sans-serif;font-weight:600;padding:0;color:#fff;text-align:center}#bow-overview-header ul li:nth-of-type(3),#bow-overview-header ul li:nth-of-type(4){border-top:2px solid;padding-top:2rem}#bow-overview-header ul li:first-of-type{grid-row-start:1;grid-row-end:1;grid-column-start:1;grid-column-end:1}#bow-overview-header ul li:nth-of-type(2){grid-row-start:1;grid-row-end:1;grid-column-start:2;grid-column-end:2}#bow-overview-header ul li:nth-of-type(3){grid-row-start:2;grid-row-end:2;grid-column-start:1;grid-column-end:1}#bow-overview-header ul li:nth-of-type(4){grid-row-start:2;grid-row-end:2;grid-column-start:2;grid-column-end:2}#bow-overview-header header div.klarna img{width:auto;height:auto}.camo-promo{text-align:center}.camo-promo .logo{object-fit:contain;padding:1.5rem;width:40%}@media screen and (max-width:1000px){#bow-overview-header header h1{margin-top:1.75rem}}@media screen and (max-width:768px){#bow-overview-header header{max-width:100%}}@media screen and (min-width:769px){#bow-overview-header header h1{font-size:450%}#bow-overview-header header h2{font-size:280%}#bow-overview-header header p{font-size:160%}#bow-overview-header ul li{font-size:170%}}",""])},239:function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.FullScreenVideoLoop=void 0;var o=r(3),a=function(e){return e&&e.__esModule?e:{default:e}}(o);r(173);t.FullScreenVideoLoop=function(e){return a.default.createElement("video",{className:"fullscreen-video "+(e.styleClass?e.styleClass:""),loop:!0,src:e.src,onEnded:e.handleEnd,autoPlay:e.autoPlay,playsInline:e.playsInline,controls:e.controls,poster:e.posterSrc,muted:e.muted})}}};