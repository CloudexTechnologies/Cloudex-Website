/**
 * Whop Pixel, injected into <head> by `app/layout.tsx` before hydration, so
 * visits to this site are attributed against Whop purchases (Cod Dev OS) and
 * ad spend.
 *
 * This is Whop's installation snippet verbatim, scoped to the Cloudex
 * Technologies account. It sends the first page view; https://t.whop.tw/s.js
 * then follows App Router navigations on its own (a `leave` plus a `page` per
 * route change), so there is no per-route tracking in React.
 * Setup guide: https://docs.whop.com/developer/guides/pixel
 */
export const WHOP_ACCOUNT_ID = "biz_BXJ9wCiMbyr8AM";

export const WHOP_PIXEL_SNIPPET = `!function(w,d,s,u,n,a,b){if(w[n])return;a=w[n]={q:[],t:+new Date,s:[],o:u,track:function(){a.q.push([+new Date].concat([].slice.call(arguments)))},setScope:function(){a.s=[].slice.call(arguments).filter(function(x){return typeof x==="string"});a.q.push([+new Date,"setScope"].concat(a.s))},scope:function(){var c=[].slice.call(arguments);return{track:function(){a.q.push([+new Date].concat([].slice.call(arguments)).concat([{__scope:c}]))}}}};b=d.createElement(s);b.async=1;b.src=u+"/s.js";d.getElementsByTagName(s)[0].parentNode.insertBefore(b,d.getElementsByTagName(s)[0])}(window,document,"script","https://t.whop.tw","whop");
whop.setScope("${WHOP_ACCOUNT_ID}");
whop.track("page");`;
