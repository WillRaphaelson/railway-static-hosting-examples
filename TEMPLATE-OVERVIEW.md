# Deploy and Host React, Docusaurus, and a Form API with Railway

This example deploys a static React frontend, a separate Node.js API, and a Docusaurus documentation site.

## About Hosting These Examples

Railpack builds the React frontend with Vite and serves its output through Caddy. The frontend proxies form requests to the API over Railway private networking. Docusaurus builds static documentation, with SPA fallback disabled so unknown documentation paths return HTTP 404.

The form API validates sample requests and returns JSON. It does not store submissions, send email, or log submitted fields. Add durable handling and abuse controls before collecting real messages.

## Why Deploy These Examples on Railway?

Use one project to inspect a static frontend, a private backend, and a documentation build. A service-reference variable connects the frontend to the API without a hardcoded deployment hostname.

## Common Use Cases

- Learn how a static frontend calls a separate application service.
- Compare SPA route fallback with static documentation routing.
- Explore CDN cache policy for frontend assets while keeping API responses uncached.

## Dependencies for These Examples

- Railway account and sufficient plan resources or credit for the selected services.
- Node.js and npm, installed by the build environment from the service sources.
- Caddy, supplied by Railpack's static-serving build path.

### Deployment Dependencies

The frontend's API_HOST variable references the API service's Railway private domain. Its API_PORT is 3000. The API listens on that port and has no public domain requirement. The docs service uses RAILPACK_SPA_OUTPUT_DIR=build.

The template creates public domains for the frontend and docs service. If applying the IaC directly instead, generate those domains afterward. Enable optional CDN caching only after the domains exist. Runtime resources consume credit or incur plan charges; this is not a promise of permanently free hosting.
