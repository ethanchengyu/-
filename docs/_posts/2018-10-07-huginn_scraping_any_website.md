---
title: RSS 进阶篇：Huginn - 真·为任意网页定制 RSS 源（PhantomJs 抓取）
date: 2018-10-07
category:
  - 自动化
tag:
  - Huginn
  - rss
order: -22
---

烧制网页 RSS 源，主要有 **FEED43** 和 **Huginn** 两种方法。

- FEED43：简单免费，六小时抓取一次，每次抓取 20 条静态页面。
- Huginn：自由度高，能自定义**抓取频率、内容结构、js 结果、输出样式**等；需要搭建服务器，学习 Huginn 抓取规则。

<BiliBili bvid="BV1k5411B7vF" />

## Huginn 准备工作

- 准备 NAS 或 Debian/Ubuntu 环境的服务器；
- 参考 [deploy Huginn inside of Docker](https://github.com/huginn/huginn/blob/master/doc/docker/install.md)、[installation guide for Debian/Ubuntu](https://github.com/huginn/huginn/blob/master/doc/manual/installation.md) 来搭建 Huginn。
- 注册 [PhantomJs Cloud](https://phantomjscloud.com/) ,然后将 API key 保存在 Huginn 的 Credentials 中。很多网站是用 JS 加载动态内容，因此需要 **PhantomJs Cloud** 来抓取页面 JS 缓存。免费版每天限制抓取 500 次页面，需求不大可建立多个账号使用不同 API key，足够个人使用。

  ![](https://img.newzone.top/20181006010447.png?imageMogr2/format/webp)

## PhantomJs 网页抓取

新建 Huginn 任务组 Scenario「国内应急新闻」，样例抓取链接为 `http://www.cneb.gov.cn/guoneinews/`。

![](https://img.newzone.top/20181008131549.png?imageMogr2/format/webp)

### 页面缓存

使用 Phantom Js Cloud Agent，获得动态网页缓存。

![](https://img.newzone.top/20181008111704.png?imageMogr2/format/webp)

### 解析网页内容

使用 WebsiteAgent，抓取网页内容。

![](https://img.newzone.top/20181008112658.png?imageMogr2/format/webp)

### 获取内容路径

使用火狐浏览器打开目标页面，获取 css path 路径。如果你使用的是 Xpath 路径，请将路径中的双引号替换为单引号，或者用反义符 `\` 注释掉路径中的双引号。

1. 按下 `F12`, 然后点击 _Developer Tools_ 左上角的*检查指针*。

   ![](https://img.newzone.top/20181008114911.png?imageMogr2/format/webp)

2. 选中要抓取的部分。

   ![](https://img.newzone.top/20181008113925.png?imageMogr2/format/webp)

3. 回到 _Developer Tools_ 窗口，右键选中的蓝色部分，获取 css path、Xpath。这里以 css path 为例。

   ![](https://img.newzone.top/20181008114207.png?imageMogr2/format/webp)

4. 初始 css path 路径，`html body div.area.areabg1 div.area-half.right div.tabBox div.tabContents.active table tbody tr td.red a`。
5. css path 原始路径过长，删去不带 `.` 或 `#` 的节点（节点间以空格“ ”分割），并删去每个节点在 `.` 或 `#` 前的第一个标签，得到 `.area.areabg1 .area-half.right .tabBox .tabContents.active .red a`。
6. 前半部分对节点定位无用，继续省略（比如：中国上海，省略掉中国，大家也知道上海在哪），获得短路径 `.tabContents.active .red a`。

**特殊路径处理**：

- 有些路径中的**节点带空格**，如 `<div class="packery-item article">`,路径中的空格由 `.` 代替，截取为 `.packery-item.article`。
- 当抓取**多种 css path 规则**时，用逗号分割，比如 `"css": ".focus-title .current a , .stress h2 a",`。
- 有时节点路径输入正确，但输出为空。此时，将路径更改为 `html`，检查源码中是否含有你需要的内容。动态页面直接获取会为空，你需要使用 PhantomJs Cloud 来缓存页面。

### 导出 RSS

使用 DataOutputAgent，将抓取内容导出为 RSS。

![](https://img.newzone.top/20181008130943.png?imageMogr2/format/webp)

回到 Scenarios，点击 Data Output Agent 旁的按钮「Actions」>「Show」，复制导出的 xml 链接 `http://xxx.xxx/users/1/web_requests/xxx/xxxx.xml`。

![](https://img.newzone.top/20181008131059.png?imageMogr2/format/webp)

[点击网盘下载](https://pan.baidu.com/s/1JdsFkLN9kczR9C92tKi83A)国内应急新闻的详细设置，导入到 Huginn 即可使用。其他问题参考 [PhantomJs Cloud 英文攻略](https://github.com/huginn/huginn/wiki/Browser-Emulation-Using-PhantomJs-Cloud)。

微信的屏蔽措施非常之多，公众号抓取可以尝试 [wechat-feeds](https://wechat.privacyhide.com/)。

## 跳转链接处理示例

要获取跳转链接的真实地址，可以使用 WebsiteAgent 直接读取原网页的 HTML 代码，并检查其中的跳转代码。

<BiliBili bvid="BV1ae411v7Qg" />

跳转代码通常位于`<script>`标签内。由于`<script>`标签内的内容是文本，而非 HTML 属性，我们不能使用属性选择器（如@href）。相反，我们应使用 XPath 的`string()`函数来提取整个`<script>`标签的文本内容。之后，可以利用 EventFormattingAgent 的正则表达式从这些文本中提取 URL。

```json
# WebsiteAgent
{
  "expected_update_period_in_days": "2",
  "url": "https://www.chncpa.org/ycxm/202308/t20230817_254985.html",
  "type": "html",
  "mode": "on_change",
  "extract": {
    "url": {
      "xpath": "//script",
      "value": "string(.)"
    }
  }
}

# EventFormattingAgent
{
  "instructions": {
    "jumpurl": "{{real_url.1}}"
  },
  "matchers": [
    {
      "path": "{{url}}",
      "regexp": "window\\.location\\.href\\s*=\\s*\\\\?[\"']([^\"']+?)(?:\\\\?[\"']);",
      "to": "real_url"
    }
  ],
  "mode": "clean"
}
```

## RSS 合集

汇总的 RSS 永久订阅 feeds，均通过 RSSHub 和 Huginn 制作。如果有兴趣自制 RSS，可参考以下教程。

- [RSS 入门篇：FEED43&FeedEx-为静态网页定制 RSS 源](https://newzone.top/posts/2017-04-22-rss_feed43_feedex.html)

- [RSS 进阶篇：Huginn - 真·为任意网页定制 RSS 源（PhantomJs 抓取）](https://newzone.top/posts/2018-10-07-huginn_scraping_any_website.html)

- [RSS 速成篇：RSSHub 捡现成的轮子](https://newzone.top/posts/2019-04-01-rsshub_noob.html)

- [RSS 速成篇 2：RSSHub 自部署](https://newzone.top/posts/2020-03-25-rsshub_on_vps.html)

- [RSS 完结篇：节省千元服务费，RSSHub、Huginn 转移 NAS](https://newzone.top/posts/2021-10-23-nas_with_rsshub_and_huginn.html)

- [RSS 汇总篇：RSS 永久链接合集，拒绝 RSS 失效](https://newzone.top/posts/2022-03-17-rss_persistent_link_collection.html)
