// 在scripts/app.js getLayoutColorCode方法后面加入 getCurrentStyle方法：
getCurrentStyle: function(color) {
    var _clrs = {
        default: '#ffffff !important',
        blue: '#ffffff !important',
        brown: '#ffffff !important',
        purple: '#ffffff !important',
        grey: '#ffffff !important',
        light: '#000000 !important'
    };
    var _bgs = {
        default: '#3D3D3D !important',
        blue: '#1570a6 !important',
        brown: '#623F18 !important',
        purple: '#701584 !important',
        grey: '#666666 !important',
        light: '#E2E2E2 !important'
    };
    var _overs = {
        default: '#e02222 !important',
        blue: '#e02222 !important',
        brown: '#4E3112 !important',
        purple: '#571067 !important',
        grey: '#e02222 !important',
        light: '#28B779 !important'
    };

    if (_clrs[color]) {
        return '<style type="text/css" id="curr">.curr_bg{background: ' + _bgs[color] + ';border: 1px solid ' + _bgs[color] + ';border-top: 0;} .curr_btn{color: ' + _clrs[color] + ';background: ' + _bgs[color] + ';} .curr_btn:hover{color: ' + _clrs[color] + ';background: ' + _overs[color] + ';text-decoration: none !important;}</style>';
    } else {
        return '<style type="text/css" id="curr">.curr_bg{background: ' + _bgs.
        default +';border: 1px solid ' + _bgs.
        default +';border-top: 0;} .curr_btn{color: ' + _clrs.
        default +';background: ' + _bgs.
        default +';} .curr_btn:hover{color: ' + _clrs.
        default +';background: ' + _overs.
        default +';text-decoration: none !important;}</style>';
    }
}

// 在setColor中调用getCurrentStyle方法
var setColor = function(color) {
    $('#style_color').attr("href", "themes/" + color + ".css");
    $.cookie('style_color', color);
    //调用
    var $curr = $('#curr');
    if ($curr) {
        $curr.remove();
    }
    $('#style_color').after(App.getCurrentStyle(color));
}

// 在setColor方法前加入以下代码
$('#theme_switch > li').each(function(i, e) {
    $(e).on('click', function() {
        setColor($(e).attr('data-style'));
    });
});
