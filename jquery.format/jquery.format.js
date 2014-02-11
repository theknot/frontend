// DEAL: $.format('Hello,{3:u}{2:d4}, this is the {1}th {3:L}, just for {3:U}:{0:d3}-{1}.', 123.2, 0, 66, 'tESt')
// -OUT: Hello,Test0066, this is the 0th test, just for TEST:123.200-0.
$.extend({
    format: function () {
        var args = arguments,
            original = args[0],
            pattern = /(?!<\{)\{(\d+)(?:\:([uUL]|d\d))?\}/g,
            pos;

        if (typeof original === "string") {
            while ((pos = pattern.exec(original)) !== null) {
                var txt = pos[0],
                    n = parseInt(pos[1], 10) + 1,
                    type = pos[2],
                    arg = args[n] != null ? args[n].toString() : '';

                if (arg) {
                    if (type) {
                        switch (type) {
                            case 'u': arg = arg.substr(0, 1).toUpperCase() + arg.substr(1).toLowerCase(); break;
                            case 'U': arg = arg.toUpperCase(); break;
                            case 'L': arg = arg.toLowerCase(); break;
                            default:
                                var n = parseInt(type.substr(1));
                                if (/^\d+$/.test(arg)) {
                                    while (arg.length < n) {
                                        arg = 0 + arg;
                                    }
                                }
                                else arg = parseFloat(arg).toFixed(n);
                            break;
                        }
                    }
                    original = original.replace(txt, arg);
                }

                pattern.lastIndex = 0;
            }
        }
        return original;
    }
});

/****
// DEAL: $.format('Hello,{3:u}{2:d4}, this is the {1}th {3:L}, just for {3:U}:{0:d3}-{1}.', 123.2, 0, 66, 'tESt')
// -OUT: Hello,Test0066, this is the 0th test, just for TEST:123.200-0.
$.extend({format:function(){var c=arguments,d=c[0],f=/(?!<\{)\{(\d+)(?:\:([uUL]|d\d))?\}/g,h;if(typeof d==="string"){while((h=f.exec(d))!==null){var b=h[0],g=parseInt(h[1],10)+1,e=h[2],a=c[g]!=null?c[g].toString():"";if(a){if(e){switch(e){case"u":a=a.substr(0,1).toUpperCase()+a.substr(1).toLowerCase();break;case"U":a=a.toUpperCase();break;case"L":a=a.toLowerCase();break;default:var g=parseInt(e.substr(1));if(/^\d+$/.test(a)){while(a.length<g){a=0+a}}else{a=parseFloat(a).toFixed(g)}break}}d=d.replace(b,a)}f.lastIndex=0}}return d}});
****/
