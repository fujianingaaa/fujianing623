/* ============================================================
   fjn 文学社社图书频道脚本
   规则：所有JS变量、函数名均以 fjn_ 开头
   功能：点击选项卡切换图书面板与右侧订阅榜
   ============================================================ */

// fjn 获取所有选项卡元素（流行小说 / 社科历史 / 文学艺术）
var fjn_tabs = document.getElementsByClassName("fjn_tab");

// fjn 获取中栏所有图书面板
var fjn_panels = document.getElementsByClassName("fjn_panel");

// fjn 获取右栏所有订阅榜面板
var fjn_rankPanels = document.getElementsByClassName("fjn_rankPanel");

/*
 * fjn 选项卡切换函数
 * fjnIndex：要显示的面板下标（0=流行小说，1=社科历史，2=文学艺术）
 */
function fjn_switchTab(fjnIndex) {
    // fjn 遍历选项卡，只保留当前项的高亮状态
    for (var fjnI = 0; fjnI < fjn_tabs.length; fjnI++) {
        if (fjnI === fjnIndex) {
            fjn_tabs[fjnI].className = "fjn_tab fjn_active";
        } else {
            fjn_tabs[fjnI].className = "fjn_tab";
        }
    }

    // fjn 遍历图书面板，只显示当前选项卡对应的面板
    for (var fjnJ = 0; fjnJ < fjn_panels.length; fjnJ++) {
        if (fjnJ === fjnIndex) {
            fjn_panels[fjnJ].className = "fjn_panel";
        } else {
            fjn_panels[fjnJ].className = "fjn_panel fjn_hide";
        }
    }

    // fjn 遍历订阅榜面板，与图书面板同步切换
    for (var fjnK = 0; fjnK < fjn_rankPanels.length; fjnK++) {
        if (fjnK === fjnIndex) {
            fjn_rankPanels[fjnK].className = "fjn_rankPanel";
        } else {
            fjn_rankPanels[fjnK].className = "fjn_rankPanel fjn_hide";
        }
    }
}

// fjn 给每个选项卡绑定点击事件，点击时切换到对应面板
for (var fjnN = 0; fjnN < fjn_tabs.length; fjnN++) {
    // fjn 用立即执行函数保存当前下标，避免闭包取值错误
    (function (fjnIdx) {
        fjn_tabs[fjnIdx].onclick = function () {
            fjn_switchTab(fjnIdx);
        };
    })(fjnN);
}
