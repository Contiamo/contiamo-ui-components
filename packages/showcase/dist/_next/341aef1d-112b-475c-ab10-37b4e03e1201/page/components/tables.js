
          window.__NEXT_REGISTER_PAGE('/components/tables', function() {
            var comp = module.exports=webpackJsonp([28],{1670:function(e,n,t){e.exports=t(1671)},1671:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var l=t(0),r=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(l),o=t(10),u=t(28),s=a(u),p=t(29),c=a(p),i=t(11),d=a(i),f=[{name:"columns",description:"Table column headings",defaultValue:"-",type:"(string[])[]",optional:!1},{name:"rows",description:"Table rows as an array of array of cells",defaultValue:"-",type:"(string[])[]",optional:!1}];n.default=function(e){return r.createElement(d.default,{pathname:e.url.pathname},r.createElement(o.Card,null,r.createElement("p",null,"Tables simply render a semantic HTML table structure based on raw data."),r.createElement(o.Heading2Type,null,"Usage"),r.createElement(c.default,{snippet:'\n<Table \n  columns={[ "Name", "Title"]}\n  rows={[\n    [ "Max", "Carpenter" ],\n    [ "Moritz", "Baker" ]\n  ]}\n/>\n',components:{Table:o.Table}}),r.createElement(o.Heading2Type,null,"Props"),r.createElement(s.default,{props:f})))}}},[1670]);
            return { page: comp.default }
          })
        