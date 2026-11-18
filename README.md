# Railway Static Hosting Examples

Two static frontends and a small form API for comparing static hosting with an application platform.

## Examples

- `apps/web`: React and Vite. Railpack builds the static output and serves it through Caddy. The custom Caddyfile proxies `/api/*` to the private API service and serves client-side routes from the SPA shell.
- `apps/api`: dependency-free Node.js form endpoint. It validates JSON and returns a response. It discards submissions without storing them, sending email, or logging the submitted fields. This is an integration demonstration, not a production contact form service.
- `apps/docs`: Docusaurus 3.10.2. Set `RAILPACK_SPA_OUTPUT_DIR=build`. Its Staticfile disables SPA fallback so nonexistent documentation pages return HTTP 404.
- `.railway/railway.ts`: Railway TypeScript IaC for the three services, GitHub source roots, health checks, and a service-reference variable for the private API hostname.

## Run locally

Requires Node.js 22 or newer and npm. Each app has its own lockfile because Railway builds its source directory independently.

```sh
cd apps/api
npm test
npm start
```

In another terminal, build the frontend:

```sh
cd apps/web
npm ci
npm run build
```

For development, add a Vite development proxy or run Caddy against the output directory. `vite preview` is useful for reviewing the build locally but is not a production server. The supplied Caddyfile expects Railway's `/app/dist` path; for a local Caddy instance, use your absolute `apps/web/dist` directory, `API_HOST=localhost`, and `API_PORT=3000`.

```sh
cd apps/docs
npm ci
npm run build
```

## Deploy to Railway

The IaC file is for a new, dedicated project. Never apply it to an unrelated project: a whole-project configuration can remove omitted resources.

Install the root dependencies, link the intended project, inspect `railway config plan`, then apply the reviewed plan. Confirm the GitHub source repository and branch before applying a fork. The template is generated from the tested project's actual configuration rather than requiring readers to apply IaC themselves.

Generate public domains for `web` and `docs`. The API uses Railway private networking and does not need a public domain. A public domain must exist before enabling the optional Railway CDN. Keep API responses `Cache-Control: no-store`; immutable hashed assets can use a long cache lifetime. Review HTML caching policy and purge behavior separately.

## Production changes

Before accepting real submissions, add durable delivery or storage, abuse controls, operational monitoring, and any required consent and retention policy. Configure resource limits and usage alerts. This sample does not implement those production requirements.

## Verification status

See the article workspace's dated verification record for executed checks. Local builds do not by themselves establish Railway deployment or CDN behavior.
