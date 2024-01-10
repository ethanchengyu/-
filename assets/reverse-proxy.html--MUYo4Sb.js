import{_ as o}from"./plugin-vue_export-helper-x3n3nnut.js";import{r as c,o as p,c as l,a as n,b as s,d as e,e as t}from"./app-MLpdLwqA.js";const i={},r=n("p",null,"反向代理是一种方便的后端工具，其作用是拦截所有传入请求并进行统一的转发管理。在 Docker 容器管理领域，使用反向代理可以让你摆脱繁琐的端口号记忆，只需通过不同的域名即可访问特定的 Docker 服务。常见的反向代理工具包括 Nginx Proxy Manager、nginxWebUI、Caddy 和 Lucky。",-1),u=n("h2",{id:"nginx-proxy-manager",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#nginx-proxy-manager","aria-hidden":"true"},"#"),s(" Nginx Proxy Manager")],-1),d={href:"https://github.com/jlesage/docker-nginx-proxy-manager",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.nginxwebui.cn/product.html",target:"_blank",rel:"noopener noreferrer"},v=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.8&quot;</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">app</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> <span class="token string">&quot;jlesage/nginx-proxy-manager:latest&quot;</span>
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> nginx<span class="token punctuation">-</span>proxy<span class="token punctuation">-</span>manager
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9001:8080&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9002:8181&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9003:4443&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /volume1/docker/nginx<span class="token punctuation">-</span>proxy<span class="token punctuation">-</span>manager/config<span class="token punctuation">:</span>/config
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>要访问后台管理界面，请前往 <code>localhost:9002</code>。初始登录账户为 <code>admin@example.com</code>，密码为 <code>changeme</code>。初次登录时，系统会提示你修改默认账户和密码。<sup class="footnote-ref"><a href="#footnote1">[1]</a><a class="footnote-anchor" id="footnote-ref1"></a></sup></p><p>反向代理启用后，路由器只需要开放 9003 端口即可实现流量转发，避免了我们在公网上开放不必要的端口。接下来，通过 CNAME 方式将你定制的域名 xxx.newzone.top 解析到你家中的 DDNS 域名 yyy.newzone.top。完成设置后，访问 xxx.newzone.top:9003 即可访问指定服务，并享受自动 SSL 部署的便利。在需要切换到其他服务时，只需更改 xxx 部分的服务名即可。</p><h2 id="caddy" tabindex="-1"><a class="header-anchor" href="#caddy" aria-hidden="true">#</a> Caddy</h2>`,4),m={href:"https://caddyserver.com/",target:"_blank",rel:"noopener noreferrer"},y=t(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3.9&quot;</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">caddy</span><span class="token punctuation">:</span>
    <span class="token key atrule">image</span><span class="token punctuation">:</span> caddy<span class="token punctuation">:</span>latest
    <span class="token key atrule">container_name</span><span class="token punctuation">:</span> caddy
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> unless<span class="token punctuation">-</span>stopped
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9080:80&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9443:443&quot;</span>
      <span class="token punctuation">-</span> <span class="token string">&quot;9443:443/udp&quot;</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> /volume1/docker/caddy/Caddyfile<span class="token punctuation">:</span>/etc/caddy/Caddyfile
      <span class="token punctuation">-</span> /volume1/docker/caddy/site<span class="token punctuation">:</span>/srv
      <span class="token punctuation">-</span> /volume1/docker/caddy/caddy_data<span class="token punctuation">:</span>/data
      <span class="token punctuation">-</span> /volume1/docker/caddy/caddy_config<span class="token punctuation">:</span>/config

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">caddy_data</span><span class="token punctuation">:</span>
  <span class="token key atrule">caddy_config</span><span class="token punctuation">:</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><hr class="footnotes-sep">`,2),g={class:"footnotes"},b={class:"footnotes-list"},_={id:"footnote1",class:"footnote-item"},x={href:"https://post.smzdm.com/p/az6989nn/",target:"_blank",rel:"noopener noreferrer"},h=n("a",{href:"#footnote-ref1",class:"footnote-backref"},"↩︎",-1);function f(q,N){const a=c("ExternalLinkIcon");return p(),l("div",null,[r,u,n("p",null,[n("a",d,[s("Nginx Proxy Manager"),e(a)]),s(" 具备图形用户界面，其 SSL 证书有效期为 3 个月，到期时会自动续期。由于国内家用宽带不支持 80 和 443 端口，因此这里未采用 Nginx Proxy Manager 官方容器，同时由于端口原因也不建议使用 Caddy。如果你对 Nginx Proxy Manager 不熟悉，也可以尝试国内开发的"),n("a",k,[s("nginxWebUI"),e(a)]),s("，它同样集成了图形化配置、SSL 证书申请、自动续签 SSL 证书等功能。")]),v,n("p",null,[n("a",m,[s("Caddy"),e(a)]),s(" 的配置更加简便，但需要注意的是，Caddy v2 在默认情况下使用 http-01 方式进行 HTTPS 证书申请，这要求你能够通过公网访问域名的 80/443 端口，以进行所有权验证。因此，在国内的情况下，你可能需要手动指定证书。你可以选择通过 Certbot 免费申请证书，或者在阿里云、腾讯云等平台免费申请一年有效的证书。")]),y,n("section",g,[n("ol",b,[n("li",_,[n("p",null,[n("a",x,[s("NAS 原来这么有用 篇 143：一个端口访问 NAS 所有服务，使用二级域名定义你的每一项服务"),e(a)]),s(),h])])])])])}const w=o(i,[["render",f],["__file","reverse-proxy.html.vue"]]);export{w as default};
