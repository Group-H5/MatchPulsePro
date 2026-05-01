# MatchPulse.pro — 快速启动说明

本 README 侧重 MatchPulse.pro 的部署与运维要点：环境变量、Sitemap 生成、以及数据源切换说明。

## 项目简介

MatchPulse.pro 是基于 ShipAny 模板的 NBA 季后赛资讯站（AI 预热 + 实时数据管线）。当前仓库包含：

- 多语言友好的页面与 JSON-LD（SportsEvent）结构化数据
- AI Insight 生成入口（通过 `GEMINI_API_KEY` 启用）
- 可切换的体育数据提供器（`mock` / `rapidapi`）与本地文件缓存回退
- 自动生成多语言 `sitemap.xml` 的脚本

## 重要环境变量

- `SITE_URL` — 网站根域名（用于 canonical 与 sitemap）。示例：`https://matchpulse.pro`。
- `GEMINI_API_KEY` — （可选）用于调用 Gemini / AI 服务生成赛况简评。
- `SPORTS_API_PROVIDER` — 数据源提供器，取值：`mock`（默认）或 `rapidapi`。
- `RAPIDAPI_KEY` & `RAPIDAPI_HOST` — 当 `SPORTS_API_PROVIDER=rapidapi` 时需要配置，用于请求真实体育数据。

注意：当未正确配置 RapidAPI 凭证时，应用会记录警告并优雅回退到内置 mock 数据，不会抛出未捕获异常。

## 本地运行（开发）

安装：

```bash
pnpm install
```

启动开发服务器：

```bash
pnpm dev
```

页面示例：

- NBA 季后赛首页： `/nba`
- 单场页面： `/matches/:slug`（如 `/matches/lakers-vs-nuggets`）

## 生成 Sitemap

项目提供了脚本 `scripts/generate-sitemap.mjs`，会输出 `public/sitemap.xml`，并为每个比赛页面生成 `xhtml:link` 多语言替代条目（`en` / `pl` / `ko`）。

手动运行：

```bash
node scripts/generate-sitemap.mjs
```

自动化：已在 `package.json` 中添加 `postbuild` 钩子，`next build` 后会自动运行该脚本并写入 `public/sitemap.xml`。

## 切换体育数据源

默认：`SPORTS_API_PROVIDER=mock`，使用内置的模拟数据，适合开发与预热阶段。

切换到 RapidAPI（生产示例）：

```bash
export SPORTS_API_PROVIDER=rapidapi
export RAPIDAPI_KEY=YOUR_KEY
export RAPIDAPI_HOST=THE_RAPIDAPI_HOST
pnpm build
```

实现细节：`src/lib/sportsApi.ts` 已实现策略模式（provider switch）并包含对 RapidAPI 的调用封装。若远程请求失败会写入控制台警告并回退到 mock 数据。

## 部署建议（Vercel）

1. 在 Vercel 项目设置中新增上述环境变量（特别是 `SITE_URL` 和 `GEMINI_API_KEY`）。
2. 保持 `SPORTS_API_PROVIDER=mock` 直到你准备好为高并发付费的体育数据 API。
3. 部署后，通过 Google Search Console 提交 `https://<your-domain>/sitemap.xml`。

## 维护说明

- 若要添加更多比赛到 sitemap，更新 `scripts/generate-sitemap.mjs` 中的 slug 源（或改为从 `getHotMatches()` 动态拉取）。
- 若要接入其它体育数据提供商（例如 `sportsdata.io`），请在 `src/lib/sportsApi.ts` 中添加相应 provider 的映射与 headers。

## 联系与扩展

如需我帮忙接入 RapidAPI、配置 Gemini Key，或添加广告/变现位（UTM + Affiliate），随时告诉我。

# ShipAny Template Two

## Getting Started

read [ShipAny Document](https://shipany.ai/docs/quick-start) to start your AI SaaS project.

## Buy Templates

check [ShipAny Templates](https://shipany.ai/templates) to buy Business Templates.

## Feedback

submit your feedbacks on [Github Issues](https://github.com/shipanyai/shipany-template-two/issues)

## LICENSE

!!! Please do not publicly release ShipAny's Code. Illegal use will be prosecuted

[ShipAny LICENSE](./LICENSE)
