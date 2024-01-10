import{_ as e}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as t,o as c,c as p,a as s,b as n,d as o,e as l}from"./app-MLpdLwqA.js";const u={},i={href:"https://github.com/ossrs/srs-stack",target:"_blank",rel:"noopener noreferrer"},r=l(`<p>在我的日常工作和学习中，我通常会开启直播，但如果推送多路流，会对上传带宽造成较大压力。通过使用 SRS Stack，这个问题得到了解决。</p><p>目前，我将电脑上的 OBS 推流到 NAS 上的 SRS Stack，然后在 NAS 上进行多平台统一转播。这样一来，我能够节省上行带宽，同时避免客户端推送多路流。然而，需要注意的是，SRS Stack 目前仅支持最多同时进行三个平台的转播。如果你需要更多平台，可以运行多个实例。</p><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">srs-stack</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> registry.cn<span class="token punctuation">-</span>hangzhou.aliyuncs.com/ossrs/srs<span class="token punctuation">-</span>stack<span class="token punctuation">:</span><span class="token number">5</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> srs<span class="token punctuation">-</span>stack
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /volume1/docker/srs<span class="token punctuation">-</span>stack/data<span class="token punctuation">:</span>/data
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 23322<span class="token punctuation">:</span><span class="token number">2022</span>
      <span class="token punctuation">-</span> 23323<span class="token punctuation">:</span><span class="token number">2443</span>
      <span class="token punctuation">-</span> 1935<span class="token punctuation">:</span><span class="token number">1935</span>
      <span class="token punctuation">-</span> 8000<span class="token punctuation">:</span>8000/udp
      <span class="token punctuation">-</span> 10080<span class="token punctuation">:</span>10080/udp
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,3);function k(d,m){const a=t("ExternalLinkIcon");return c(),p("div",null,[s("p",null,[n("SRS 是一个免费开源的实时视频服务器应用，通过 "),s("a",i,[n("SRS Stack"),o(a)]),n(" 能够轻松在多平台上进行简单高效的直播同步推流部署。")]),r])}const _=e(u,[["render",k],["__file","srs-stack.html.vue"]]);export{_ as default};
