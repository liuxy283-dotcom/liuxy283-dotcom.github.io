# 小刘的博客

> 使用 Jekyll + GitHub Pages 搭建的个人学习博客。

## 在线访问

🔗 [https://liuxy283-dotcom.github.io/](https://liuxy283-dotcom.github.io/)

## 项目结构

```
.
├── _config.yml          # Jekyll 站点配置
├── Gemfile              # Ruby 依赖
├── _layouts/            # 页面布局模板
├── _includes/           # 公共组件（导航、页脚、侧边栏）
├── _posts/              # 博文（Markdown 格式）
├── assets/css/          # 自定义样式
├── index.html           # 首页（博文列表）
├── about.md             # 关于页面
└── .github/workflows/   # GitHub Actions 自动部署
```

## 技术栈

- **构建工具**：Jekyll 4.x
- **主题**：自定义明亮简洁风格
- **托管**：GitHub Pages
- **部署**：GitHub Actions 自动构建

## 分支说明

| 分支 | 用途 |
|------|------|
| `main` | Jekyll 源代码 |
| `gh-pages` | 编译后的静态网站（由 GitHub Actions 自动生成） |

## 本地预览

```bash
bundle install
bundle exec jekyll serve
```

浏览器访问：http://localhost:4000

## 作者

小刘 — 计算机专业在读本科生
