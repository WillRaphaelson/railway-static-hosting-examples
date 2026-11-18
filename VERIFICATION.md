# Verification

Checked November 17, 2026. This is an example workflow check, not a cross-provider speed benchmark or a test of every Railway plan.

## Versions

- Vite 8.3.8 and React 19.3.1.
- Docusaurus 3.10.2 and React 19.3.1.
- Railway CLI 5.71.0 and Railway TypeScript SDK 3.17.0.
- Local checks used Node.js 23.11.0 and Caddy 2.11.9. Railway used its Railpack build and static Caddy serving path.

## Checks

Both the original dedicated Railway project and a fresh deployment of the published template passed:

- Public HTTPS for both frontends.
- Direct navigation to the SPA's `/guides/hosting` route.
- Valid form submission through the frontend proxy to the API's private Railway domain.
- Invalid form submission returns HTTP 400 with an uncached JSON response.
- Hashed JavaScript assets have the correct MIME type and immutable cache policy.
- Missing frontend asset returns HTTP 404.
- Docusaurus home and `/deployment` route return HTTP 200; an unknown documentation route returns HTTP 404.
- After enabling optional Railway CDN caching on the frontend, repeated asset requests return `x-cache: HIT`.

The original frontend also passed a repeat deployment from its connected GitHub source. Local production builds, an IaC type check, API request tests, and a browser form-submission check passed before cloud deployment.

## Scope

The API discards sample submissions. It does not implement email delivery, durable storage, or production abuse controls. A missing docs route has a real HTTP 404 response; this example does not promise a custom rendered error page.

CDN settings are not included in the generated template snapshot; enable CDN caching separately after deployment. Public frontend domains are included. No personal credentials or account-specific hostnames are required as template inputs.

The tested projects run in the author's contractor Pro workspace. These checks do not establish that three continuously running services fit within Free credit. Supporting deployments are stopped after verification to avoid ongoing usage.
