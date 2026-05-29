---
layout: post
title: "创新实验：使用 Jekyll + GitHub Pages 搭建个人博客"
date: 2026-05-29
categories: [实验记录]
tags: [Jekyll, GitHub Pages, 静态网站]
---

> 这是创新实验第13周的 Jekyll 收尾任务，目标是将 Jekyll 项目推送到 GitHub，并通过 GitHub Pages 实现公网访问。

## 实验目标

- 在 GitHub 创建 `用户名.github.io` 仓库
- 使用 Jekyll 搭建个人博客
- 配置 GitHub Actions 自动部署
- 实现公网 URL 访问

## 技术方案

相比同学使用的暗色科技风 Portfolio 单页，我采用了**明亮简洁的博客风格**：

| 对比项 | 同学的作品 | 我的博客 |
|--------|-----------|---------|
| 风格 | 暗色科技风，特效丰富 | 明亮简洁，阅读优先 |
| 结构 | 单页滚动 Portfolio | 多页博客（首页 + 文章页） |
| 内容 | 项目展示为主 | 学习笔记 + 实验记录 |
| 特效 | Canvas 粒子、Glitch 故障文字 | 无复杂特效，注重排版 |

## 项目结构

```
liuxy283-dotcom.github.io/
├── _config.yml          # 站点配置
├── _layouts/            # 页面布局
├── _includes/           # 公共组件
├── _posts/              # 博文
├── assets/css/          # 自定义样式
├── index.html           # 首页
├── about.md             # 关于页面
└── .github/workflows/   # 自动部署
```

## GitHub Actions 自动部署

配置了 `.github/workflows/jekyll.yml`，实现：

1. `main` 分支存放 Jekyll 源代码
2. 每次 push 自动触发 Actions 构建
3. 构建结果自动部署到 GitHub Pages

## 踩坑记录

- **仓库命名**：必须严格等于 GitHub 用户名，否则 Pages 不生效
- **分支策略**：使用 GitHub Actions 部署时，Pages 来源设置为 "GitHub Actions" 而非分支
- **国内网络**：首次 push 可能需要多次尝试，使用校园网更稳定

## 成果

✅ 博客已上线：[https://liuxy283-dotcom.github.io/](https://liuxy283-dotcom.github.io/)

## 参考资料

- [Jekyll 官方文档](https://jekyllrb.com/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
