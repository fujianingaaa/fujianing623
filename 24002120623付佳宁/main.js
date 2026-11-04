/*
 * 交互：文学社科首页的 Tab 切换与数据渲染
 * 作者：fjn
 * 大模型：Trae
 */

// 三栏书籍数据：key 为 tab 标识，books 是 8 本书（封面路径、书名、价格）
// fjn
var fjn_bookData = {
    // 流行小说 Tab，fjn
    novel: {
        label: "流行小说",
        books: [
            { img: "img/a1.jpg", title: "省长的女婿", price: "¥5.98" },
            { img: "img/a2.jpg", title: "辛夷坞：致青春", price: "¥5.00" },
            { img: "img/a3.jpg", title: "越位", price: "¥2.99" },
            { img: "img/a4.jpg", title: "扫黑", price: "¥6.40" },
            { img: "img/a5.jpg", title: "我的帝王生涯", price: "¥4.00" },
            { img: "img/a6.jpg", title: "南水北调书记", price: "¥5.98" },
            { img: "img/a7.jpg", title: "1/14 第一季", price: "¥4.00" },
            { img: "img/a8.jpg", title: "辛夷坞：原来", price: "¥4.50" }
        ],
        rankTitle: "流行小说订阅榜",
        rankList: [
            "山西煤老板（全文）",
            "你不可不知的人性（全二）",
            "到爱的距离",
            "梅雨的季节（全文）",
            "大清相国（全文）",
            "借势（全文）",
            "省委班子2",
            "静水流深（全文）",
            "生死疲劳（全文）",
            "金瓶梅（全文）"
        ]
    },
    // 社科历史 Tab，fjn
    history: {
        label: "社科历史",
        books: [
            { img: "img/c1.jpg", title: "辛亥：摇晃的中国", price: "¥5.98" },
            { img: "img/c2.jpg", title: "秦汉史", price: "¥5.00" },
            { img: "img/c3.jpg", title: "万历十五年", price: "¥4.20" },
            { img: "img/c4.jpg", title: "中国通史", price: "¥6.50" },
            { img: "img/c5.jpg", title: "全球通史", price: "¥7.00" },
            { img: "img/c6.jpg", title: "奋斗与仕途", price: "¥4.00" },
            { img: "img/c7.jpg", title: "明朝那些事儿", price: "¥4.50" },
            { img: "img/c8.jpg", title: "人类简史", price: "¥8.00" }
        ],
        rankTitle: "社科历史订阅榜",
        rankList: [
            "人类简史（全文）",
            "万历十五年（全文）",
            "明朝那些事儿",
            "全球通史",
            "中国通史（全文）",
            "辛亥：摇晃的中国",
            "大秦帝国",
            "雍正皇帝（全文）",
            "重读中国史",
            "史记选读"
        ]
    },
    // 文学艺术 Tab，fjn
    art: {
        label: "文学艺术",
        books: [
            { img: "img/b1.jpg", title: "武昌城", price: "¥4.50" },
            { img: "img/b2.jpg", title: "贾平凹作品选", price: "¥3.00" },
            { img: "img/b3.jpg", title: "最后一个匈奴", price: "¥4.00" },
            { img: "img/b4.jpg", title: "岁月与性情", price: "¥8.00" },
            { img: "img/b5.jpg", title: "浮生六记", price: "¥3.00" },
            { img: "img/b6.jpg", title: "周国平：宝贝", price: "¥8.00" },
            { img: "img/b7.jpg", title: "岳飞传", price: "¥3.00" },
            { img: "img/b8.jpg", title: "撒哈拉的眼泪", price: "¥5.96" }
        ],
        rankTitle: "文学艺术订阅榜",
        rankList: [
            "2012诺贝尔奖得主莫言",
            "奕：2012诺贝尔文学奖得",
            "逃离：2013诺贝尔文学得",
            "青春（韩寒2011最新作品）",
            "教你幽默到心田",
            "宝贝，宝贝",
            "白落梅——白落梅的十二年",
            "中国式关系（全文）",
            "于丹：重温最美古诗词",
            "妞妞：一个父亲的札记"
        ]
    }
};

// 当前激活 Tab 的数据 key，fjn
var fjn_currentKey = "novel";

// 功能：根据给定 key 渲染中央图书网格，fjn
function fjn_renderGrid(key) {
    var data = fjn_bookData[key];
    var grid = document.getElementById("fjn_grid");
    var html = "";
    for (var i = 0; i < data.books.length; i++) {
        html +=
            '<div class="fjn_book">' +
                '<img class="fjn_book_cover" src="' + data.books[i].img + '" alt="">' +
                '<p class="fjn_book_title">' + data.books[i].title + '</p>' +
                '<p class="fjn_book_price">' + data.books[i].price + '</p>' +
            '</div>';
    }
    grid.innerHTML = html;
}

// 功能：渲染右侧订阅榜标题与 Top10 列表，fjn
function fjn_renderRank(key) {
    var data = fjn_bookData[key];
    document.getElementById("fjn_rank_head").innerText = data.rankTitle;

    var rank = document.getElementById("fjn_rank");
    var html = "";
    for (var i = 0; i < data.rankList.length; i++) {
        var topClass = i < 3 ? " fjn_rank_top" : "";
        html +=
            '<li class="' + topClass + '">' +
                '<span class="fjn_rank_num">' + (i + 1) + '</span>' +
                '<span class="fjn_rank_text">' + data.rankList[i] + '</span>' +
            '</li>';
    }
    rank.innerHTML = html;
}

// 功能：Tab 点击事件处理，切换激活态并同步渲染书籍与榜单，fjn
function fjn_switchTab(key) {
    if (fjn_currentKey === key) return;
    fjn_currentKey = key;

    var tabs = document.getElementById("fjn_tabs").getElementsByClassName("fjn_tab");
    for (var i = 0; i < tabs.length; i++) {
        if (tabs[i].getAttribute("data-key") === key) {
            tabs[i].classList.add("fjn_tab_active");
        } else {
            tabs[i].classList.remove("fjn_tab_active");
        }
    }

    fjn_renderGrid(key);
    fjn_renderRank(key);
}

// 功能：为所有 Tab 元素绑定点击事件，fjn
function fjn_bindTabs() {
    var tabs = document.getElementById("fjn_tabs").getElementsByClassName("fjn_tab");
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].onclick = function () {
            fjn_switchTab(this.getAttribute("data-key"));
        };
    }
}

// 功能：页面加载完成后初始化默认 Tab（流行小说）并绑定事件，fjn
function fjn_init() {
    fjn_renderGrid(fjn_currentKey);
    fjn_renderRank(fjn_currentKey);
    fjn_bindTabs();
}

// 页面 ready 即触发初始化，fjn
window.onload = fjn_init;
