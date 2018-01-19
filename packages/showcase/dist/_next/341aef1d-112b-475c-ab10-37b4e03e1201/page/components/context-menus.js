
          window.__NEXT_REGISTER_PAGE('/components/context-menus', function() {
            var comp = module.exports=webpackJsonp([40],{1642:function(e,n,t){e.exports=t(1643)},1643:function(e,n,t){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var u=t(0),l=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(u),a=t(10),r=t(11),c=o(r),i=t(28),p=o(i),s=t(29),m=o(s),d={contextMenu:[{name:"openOnHover",description:"Specifies whether the context menu should open on hover.",defaultValue:"false",type:"boolean",optional:!0},{name:"keepOpenOnItemClick",description:"Suppresses the default behavior of closing the context menu when one of its items is clicked.",defaultValue:"false",type:"boolean",optional:!0},{name:"menuCss",description:"Styling overrides for the menu's container",defaultValue:"null",type:"object",optional:!0}],contextMenuItem:[{name:"onClick",description:"Click handler.",defaultValue:"-",type:"() => void",optional:!0}]};n.default=function(e){return l.createElement(c.default,{pathname:e.url.pathname},l.createElement(a.Card,null,l.createElement("p",null,"Context menus are nested menus that can expand from anywhere on a page. Their use is encouraged in the header and in the upper right corner of cards."),l.createElement("h2",null,"Usage"),l.createElement(m.default,{snippet:'\n<ContextMenu>\n  <Icon name="MoreHorizontal" size={16} />\n  <ContextMenuItem\n    onClick={() => {\n      console.log("clicked")\n    }}\n  >\n    Menu 1\n  </ContextMenuItem>\n  <ContextMenuItem>Menu 2</ContextMenuItem>\n  <ContextMenuItem>Menu 3</ContextMenuItem>\n</ContextMenu>\n',scope:{Icon:a.Icon,ContextMenuItem:a.ContextMenuItem},components:{ContextMenu:a.ContextMenu}}),l.createElement("h2",null,"ContextMenu Props"),l.createElement(p.default,{props:d.contextMenu}),l.createElement("h2",null,"ContextMenuItem Props"),l.createElement(p.default,{props:d.contextMenuItem})))}}},[1642]);
            return { page: comp.default }
          })
        