!function(a){function b(){var a=document.createElement("input"),b="onpaste";return a.setAttribute(b,""),"function"==typeof a[b]?"paste":"input"}var c,d=b()+".mask",e=navigator.userAgent,f=/iphone/i.test(e),g=/android/i.test(e);a.mask={definitions:{9:"[0-9]",a:"[A-Za-z]","*":"[A-Za-z0-9]"},dataName:"rawMaskFn",placeholder:"_"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(b,e){var h,i,j,k,l,m;return!b&&this.length>0?(h=a(this[0]),h.data(a.mask.dataName)()):(e=a.extend({placeholder:a.mask.placeholder,completed:null},e),i=a.mask.definitions,j=[],k=m=b.length,l=null,a.each(b.split(""),function(a,b){"?"==b?(m--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(a){for(;++a<m&&!j[a];);return a}function n(a){for(;--a>=0&&!j[a];);return a}function o(a,b){var c,d;if(!(0>a)){for(c=a,d=h(b);m>c;c++)if(j[c]){if(!(m>d&&j[c].test(w[d])))break;w[c]=w[d],w[d]=e.placeholder,d=h(d)}t(),v.caret(Math.max(l,a))}}function p(a){var b,c,d,f;for(b=a,c=e.placeholder;m>b;b++)if(j[b]){if(d=h(b),f=w[b],w[b]=c,!(m>d&&j[d].test(f)))break;c=f}}function q(a){var b,c,d,e=a.which;8===e||46===e||f&&127===e?(b=v.caret(),c=b.begin,d=b.end,d-c===0&&(c=46!==e?n(c):d=h(c-1),d=46===e?h(d):d),s(c,d),o(c,d-1),a.preventDefault()):27==e&&(v.val(x),v.caret(0,u()),a.preventDefault())}function r(b){var c,d,f,i=b.which,k=v.caret();b.ctrlKey||b.altKey||b.metaKey||32>i||i&&(k.end-k.begin!==0&&(s(k.begin,k.end),o(k.begin,k.end-1)),c=h(k.begin-1),m>c&&(d=String.fromCharCode(i),j[c].test(d)&&(p(c),w[c]=d,t(),f=h(c),g?setTimeout(a.proxy(a.fn.caret,v,f),0):v.caret(f),e.completed&&f>=m&&e.completed.call(v))),b.preventDefault())}function s(a,b){var c;for(c=a;b>c&&m>c;c++)j[c]&&(w[c]=e.placeholder)}function t(){v.val(w.join(""))}function u(a){var b,c,d=v.val(),f=-1;for(b=0,pos=0;m>b;b++)if(j[b]){for(w[b]=e.placeholder;pos++<d.length;)if(c=d.charAt(pos-1),j[b].test(c)){w[b]=c,f=b;break}if(pos>d.length)break}else w[b]===d.charAt(pos)&&b!==k&&(pos++,f=b);return a?t():k>f+1?(v.val(""),s(0,m)):(t(),v.val(v.val().substring(0,f+1))),k?b:l}var v=a(this),w=a.map(b.split(""),function(a){return"?"!=a?i[a]?e.placeholder:a:void 0}),x=v.val();v.data(a.mask.dataName,function(){return a.map(w,function(a,b){return j[b]&&a!=e.placeholder?a:null}).join("")}),v.attr("readonly")||v.one("unmask",function(){v.unbind(".mask").removeData(a.mask.dataName)}).bind("focus.mask",function(){clearTimeout(c);var a;x=v.val(),a=u(),c=setTimeout(function(){t(),a==b.length?v.caret(0,a):v.caret(a)},10)}).bind("blur.mask",function(){u(),v.val()!=x&&v.change()}).bind("keydown.mask",q).bind("keypress.mask",r).bind(d,function(){setTimeout(function(){var a=u(!0);v.caret(a),e.completed&&a==v.val().length&&e.completed.call(v)},0)}),u()}))}})}(jQuery);