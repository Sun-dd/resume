$(function () {
    $(".container").fullpage({
        navigation: true,
        continuousVertical: true,
        anchors: ['Home', 'message', 'skill', 'projects', 'hope', 'callme'],
        menu: ".nav",
        navigationTooltips: ['首页', '基本信息', '技能掌握', '项目经验', '工作期望', '联系我吧'],
        resize: true,
        verticalCentered: false
    });


    var html1 = $(".s4  #html");
    var css1 = $("#css");
    var js1 = $("#js");
    var jq1 = $("#jq");
    html1.radialIndicator({
        showPercentage: false,
        radius: 35,
        barWidth: 10,
        fontFamily: "黑体",
        fontWeight: "normal",
        barBgColor: "white",
        barColor: "rgba(248, 84, 23, 0.8)"
    });
    css1.radialIndicator({
        showPercentage: false,
        radius: 35,
        barWidth: 10,
        fontFamily: "黑体",
        fontWeight: "normal",
        barBgColor: "white",
        barColor: "rgba(248, 84, 23, 0.8)"
    });
    js1.radialIndicator({
        showPercentage: false,
        radius: 35,
        barWidth: 10,
        fontFamily: "黑体",
        fontWeight: "normal",
        barBgColor: "white",
        barColor: "rgba(248, 84, 23, 0.8)"
    });
    jq1.radialIndicator({
        showPercentage: false,
        radius: 35,
        barWidth: 10,
        fontFamily: "黑体",
        fontWeight: "normal",
        barBgColor: "white",
        barColor: "rgba(248, 84, 23, 0.8)"
    });

    var htmlObj = html1.data('radialIndicator');
    var cssObj = css1.data('radialIndicator');
    var jsObj = js1.data('radialIndicator');
    var jqObj = jq1.data('radialIndicator');

    htmlObj.animate(85);
    cssObj.animate(85);
    jsObj.animate(68);
    jqObj.animate(60);
});

