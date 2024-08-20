parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"dr0g":[function(require,module,exports) {
var t,e,a,n,r=0,o=0,s=d3.select("main"),l=s.select("#scrolly"),c=l.select("#sticky-thing"),i=l.select("article"),d=i.selectAll(".step"),u=["January","February","March","April","May","June","July","August","September","October","November","December"],f=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],g=[{date:new Date("2024-08-25"),label:"First day of NSOP",segment:"start",annotation:"Barnard starts NSOP here",target:new Date(2024,7,28)},{date:new Date("2024-09-01"),label:"End of NSOP",segment:"end"},{date:new Date("2024-09-03"),label:"First day of class",segment:"start",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/SXKBMSVSGRG33IB2XATXOLRLD4.png"},{date:new Date("2024-09-13"),label:"End of shopping period",segment:"end",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/BKWCFTETX5D3XFUR2KICPMFP4E.png"},{date:new Date("2024-10-08"),label:"Last day to drop classes",segment:"na"},{date:new Date("2024-10-17"),label:"Fall midterm date",segment:"na",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/WBKEKOAX3BED3LR7466RLHXJKY.png"},{date:new Date("2024-10-25"),label:"Start Homcoming and family days",segment:"start"},{date:new Date("2024-10-26"),label:"Homecoming game",segment:"na",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/MOBF27JBSRCKHNWURS4M24G2T4.png"},{date:new Date("2024-11-04"),label:"Start of election holiday",segment:"start",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/DQGZ4DEU4NGK5APJB4KP3MENY4.png"},{date:new Date("2024-11-05"),label:"End of election holiday",segment:"end"},{date:new Date("2024-11-14"),label:"Last day to withdraw/PDF",segment:"na",annotation:"Last day to drop classes for SEAS students",target:new Date(2024,10,15)},{date:new Date("2024-11-18"),label:"Start registration",segment:"start"},{date:new Date("2024-11-22"),label:"End registration",segment:"end"},{date:new Date("2024-11-27"),label:"Start of Thanksgiving break",segment:"start",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/IYOOWB5KB5BXJKSKIMHAZIVWNA.png"},{date:new Date("2024-11-29"),label:"End of Thanksgiving break",segment:"end"},{date:new Date("2024-12-09"),label:"Last day of class",segment:"na",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/Y256NHNJ6FFSZLZ2ZULRUQI3DE.png"},{date:new Date("2024-12-10"),label:"Start of reading period",segment:"start",link:"https://cloudfront-us-east-1.images.arcpublishing.com/spectator/YUYOAPVRPFHIRFQ75CTARUZVNE.png"},{date:new Date("2024-12-12"),label:"End of reading period",segment:"end"},{date:new Date("2024-12-13"),label:"Start of finals",segment:"start"},{date:new Date("2024-12-20"),label:"End of finals",segment:"end"}];t=document.body.clientWidth,e=window.innerHeight;var p=d3.select("svg").attr("width",t).attr("height",e).style("display","block").style("margin","auto").attr("viewBox","0 0 ".concat(t," ").concat(e)),h=Math.min(t/7,e/8);function m(t,e){t.each(function(){for(var t,a=d3.select(this),n=a.text().split(/\s+/).reverse(),r=[],o=0,s=a.attr("x"),l=a.attr("y"),c=a.text(null).append("tspan").attr("x",s).attr("y",l).attr("dy","-1em");t=n.pop();)r.push(t),c.text(r.join(" ")),c.node().getComputedTextLength()>e&&(r.pop(),c.text(r.join(" ")),r=[t],c=a.append("tspan").attr("x",s).attr("y",l).attr("dy",1.1*++o-1+"em").text(t))})}function y(e,a){var n=new Date(a,e,1).getDay(),r=new Date(a,e+1,0).getDate(),o=p.append("g").attr("class","calendar-month-".concat(e)).attr("transform","translate(".concat(t,", 0)"));o.append("text").attr("x",t/2).attr("y",h/2).attr("text-anchor","middle").text(u[e]+" "+a).style("font-weight","bold").style("font-size","16px").classed("roboto-bold",!0),o.selectAll(".header").data(f).enter().append("text").attr("x",function(e,a){return a*h+h/2+(t-7*h)/2}).attr("y",h).attr("text-anchor","middle").text(function(t){return t}).classed("roboto",!0),o.selectAll("rect").data(d3.range(r)).enter().append("rect").attr("x",function(e,a){return(a+n)%7*h+(t-7*h)/2}).attr("y",function(t){return Math.floor((t+n)/7)*h+h+20}).attr("width",h).attr("height",h).attr("fill","#fff").attr("stroke","#ddd").attr("id",function(t){return"day-".concat(e+1,"-").concat(t+1)}),o.selectAll(".day").data(d3.range(r)).enter().append("text").attr("x",function(e,a){return(a+n)%7*h+h/2+(t-7*h)/2}).attr("y",function(t){return Math.floor((t+n)/7)*h+h+35}).attr("text-anchor","middle").classed("roboto-light",!0).text(function(t){return t+1}).style("font-size","14px"),g.forEach(function(r){if(r.date.getUTCMonth()===e&&r.date.getUTCFullYear()===a){var s=r.date.getUTCDate(),l=(s+n-1)%7*h+h/2+(t-7*h)/2,c=Math.floor((s+n-1)/7)*h+h+.8*h;r.link&&o.append("image").attr("xlink:href",r.link).attr("x",l-h/2).attr("y",c-h/2).attr("width",h).attr("height",h).attr("id",function(t,e){return"image-".concat(e)})}})}var b=[7,8,9,10,11],w=2024,x=b[0],D=scrollama();function v(t){return"down"==t.direction?S[t.index]():"up"==t.direction&&U[t.index](),c.attr("class","step-"+t.index),console.log("index",t.index),t}function k(t){0==t.index&&"up"==t.direction&&H(b[0])}function M(){p.selectAll(".calendar-month").remove(),b.forEach(function(t){y(t,w)}),H(b[0])}function T(e,a){var n=e.getUTCDate(),r=e.getUTCMonth(),o=p.select(".calendar-month-".concat(r)),s=(n+2)%7*h+h/2+(t-7*h)/2,l=Math.floor((n+1+0)/7)*h+h+h/2;o.append("path").attr("d","M".concat(s+h/4," ").concat(l-h/2," Q").concat(s+h/1.7," ").concat(l+h/2," ").concat(s+h," ").concat(l)).attr("fill","none").attr("stroke","black").attr("stroke-width",2).classed("annotation-arrow",!0).style("opacity","100").classed("annotation",!0).attr("stroke-dasharray",function(){return this.getTotalLength()}).attr("stroke-dashoffset",function(){return this.getTotalLength()}).transition().duration(500).attr("stroke-dashoffset",0).on("end",function(){d3.select(this).attr("marker-end","url(#arrowhead)")}),o.append("text").attr("x",s+h/8).attr("y",l-h/1.8).text("".concat(a)).style("opacity","100").style("font-size","14px").attr("text-anchor","middle").style("fill","black").classed("annotation",!0).classed("roboto",!0).call(m,3*h)}function A(){M(),H(b[0])}function M(){p.selectAll(".calendar-month").remove(),b.forEach(function(t){return y(t,w)}),H(b[0])}p.append("defs").append("marker").attr("id","arrowhead").attr("viewBox","0 0 10 10").attr("refX",9).attr("refY",5).attr("markerWidth",5).attr("markerHeight",5).attr("orient","auto-start-reverse").append("path").attr("d","M 0 0 L 10 5 L 0 10 z").attr("fill","black");for(var S=[],E=function(t){S.push(function(){(H(g[t].date.getUTCMonth()),p.select(".event-".concat(t)).transition().duration(1e3).style("fill","#75aadb"),"end"!==g[t].segment&&(p.selectAll(".event-".concat(t-1)).transition().duration(1e3).style("fill","white"),p.selectAll(".event-".concat(t-2)).transition().duration(1e3).style("fill","white")),"start"==g[t].segment)&&P(g[t].date,g[t+1].date);g[t].annotation&&T(g[t].target,g[t].annotation)})},F=0;F<g.length+2;F++)E(F);for(var U=[],C=function(t){U.push(function(){(p.selectAll(".annotation").transition().duration(1e3).style("opacity","0"),p.select(".event-".concat(t)).transition().duration(1e3).style("fill","#75aadb"),"start"==g[t].segment)&&P(g[t].date,g[t+1].date);X(g[t].date.getUTCMonth())}),"end"!==g[t].segment&&(p.selectAll(".event-".concat(t+1)).transition().duration(1e3).style("fill","white"),p.selectAll(".event-".concat(t+2)).transition().duration(1e3).style("fill","white"))},L=0;L<g.length;L++)C(L);var B=d3.select("#scroll-steps").selectAll("div").data(g).enter().append("div").attr("class","step").text(function(t){return t.label});function K(){A(),D.setup({step:"#scrolly article .step",offset:.98,debug:!1}).onStepEnter(v).onStepExit(k),window.addEventListener("resize",D.resize)}K();for(var I=0;I<g.length;I++){var N=g[I].date.getUTCMonth()+1,R=g[I].date.getUTCDate(),O="".concat(N,"-").concat(R);p.select("#day-".concat(O)).classed("event-".concat(I),!0)}function P(t,e){if(t>e){var a=[e,t];t=a[0],e=a[1]}p.selectAll("rect").transition().duration(1e3).style("fill","white").on("end",function(){for(var a=new Date(t),n=function(){var t=a.getUTCMonth()+1,e=a.getUTCDate(),n="day-".concat(t,"-").concat(e),r=["day-12-14","day-12-15"];p.select("#".concat(n)).transition().duration(1e3).style("fill",function(){return r.includes(n)?"#FFFFFF":"#75aadb"}),a.setUTCDate(a.getUTCDate()+1)};a<=e;)n()})}function H(t){if(console.log("currentMonthIndex",x),console.log("newMonthIndex",t),x!==t){var a=p.select(".calendar-month-".concat(x)),n=p.select(".calendar-month-".concat(t)),r=e;a.transition().duration(1e3).attr("transform","translate(0, ".concat(r,")")).on("end",function(){a.style("display","none")}),n.attr("transform","translate(0, ".concat(-r,")")).style("display","block").transition().duration(1e3).attr("transform","translate(0, 0)"),x=t}else p.select(".calendar-month-".concat(t)).style("display","block").attr("transform","translate(0, 0)")}function X(t){if(console.log("currentMonthIndex",x),console.log("newMonthIndex",t),x!==t){var a=p.select(".calendar-month-".concat(x)),n=p.select(".calendar-month-".concat(t)),r=e;a.transition().duration(1e3).attr("transform","translate(0, ".concat(-r,")")).on("end",function(){a.style("display","none")}),n.attr("transform","translate(0, ".concat(r,")")).style("display","block").transition().duration(1e3).attr("transform","translate(0, 0)"),x=t}}
},{}]},{},["dr0g"], "script")
//# sourceMappingURL=script_calendar.027d29ae.js.map