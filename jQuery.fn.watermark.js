//add watermark plugin on $
//set watermark array to jquery objs: $(selector).watermark(['watermark1','watermark2', ...]);
//use jquery objs placeholder or title attributes to apply watermark: $(selectorWithTitle).watermark()
$.fn.watermark = function (wmTxt, wmCss) {
    var keepVal, isWm = wmTxt instanceof Array && wmTxt.length >= this.length;

    if (typeof wmTxt == 'boolean') {
        keepVal = wmTxt;
        wmTxt = null;
    }
    wmCss = wmCss || "watermark";
    this.each(function (i, el) {
        var it = $(el), wm = isWm && wmTxt[i] || el.getAttribute('placeholder') || el.title;

        if (it.is(":input")) {
            var isEmpty = function (fi) { var val = $.trim(it.val()), err = it.data('err'); return val == "" || val == wm || fi && val == err; },
                addWm = function () { isEmpty() && it.addClass(wmCss).val(wm); },
                delWm = function () { isEmpty(1) && it.removeClass(wmCss + ' err').val(''); };

            it.removeAttr('placeholder') && !(keepVal && it.val() != '') && it.val('') && addWm();
            !it.data("watermark") && it.focusin(delWm).focusout(addWm).data("watermark", wm);
        }
        else throw new Error("Watermark plugin can only apply to input element.");
    });

    return this;
};
