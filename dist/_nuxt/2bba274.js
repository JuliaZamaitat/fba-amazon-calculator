(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{162:function(t,n,e){e(163),t.exports=e(164)},211:function(t,n,e){"use strict";e.r(n),e.d(n,"state",(function(){return o})),e.d(n,"getters",(function(){return c})),e.d(n,"mutations",(function(){return f})),e.d(n,"actions",(function(){return l}));var r=e(7),o=(e(39),e(14),e(36),e(35),function(){return{posts:[]}}),c={getPosts:function(t){return t.posts}},f={SET_POSTS:function(t,n){t.posts=n}},l={fetchPosts:function(t){return Object(r.a)(regeneratorRuntime.mark((function n(){var e,r,o,c;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(e=t.state,r=t.commit,!e.posts.length){n.next=3;break}return n.abrupt("return");case 3:return console.log("production"),o=o="/api/posts",n.prev=5,n.next=8,fetch(o).then((function(t){return t.json()}));case 8:c=(c=n.sent).filter((function(t){return"publish"===t.status})).map((function(t){return{id:t.id,slug:t.slug,title:t.title,excerpt:t.excerpt,date:t.date,tags:t.tags,content:t.content}})),r("SET_POSTS",c),n.next=16;break;case 13:n.prev=13,n.t0=n.catch(5),console.log(n.t0);case 16:case"end":return n.stop()}}),n,null,[[5,13]])})))()}}}},[[162,7,1,8]]]);