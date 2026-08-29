# Qsacc — later work

## ntfy lead notifications
- [x] Self-hosted ntfy on VPS (`ntfy.netmaxiscloud.dpdns.org`)
- [x] Worker posts to `qsacc-leads` after D1 save (`src/lib/ntfy.ts`)
- [x] Secrets: `NTFY_BASE_URL`, `NTFY_TOPIC`, `NTFY_TOKEN` via `npm run cf:secrets`
- [ ] Subscribe on phone: ntfy app → custom server → login → topic `qsacc-leads`
- [ ] Ensure ntfy ACL allows Apps integration token to **publish** on `qsacc-leads`

## OpenRouter website chatbot (same project / Cloudflare Worker)
- [ ] `src/app/api/chat/route.ts` — proxy to OpenRouter (`OPENROUTER_API_KEY` server-only)
- [ ] `src/lib/chat-prompt.ts` — Quicksolve system prompt, validation, rate limits
- [ ] `src/components/ChatWidget.tsx` — floating widget (hide on `/admin`)
- [ ] Mount in `src/app/layout.tsx` (alongside WhatsApp)
- [ ] `.env.example` + `cf:secrets` for `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`
- [ ] Rate limit per IP; cap message/history length
- [ ] Optional later: streaming, D1 chat logs, Turnstile
