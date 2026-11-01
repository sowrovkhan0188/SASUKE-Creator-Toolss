SASUKE Creator Tools - Cloudflare control worker

Files:
- worker.js: status endpoint and token-protected admin toggle endpoint
- wrangler.toml: Worker name and KV binding placeholder
- package.json: Wrangler deploy script

Important setup still required before deployment:
1. Create a Cloudflare KV namespace.
2. Put its namespace ID in wrangler.toml in place of REPLACE_WITH_YOUR_KV_NAMESPACE_ID.
3. Add a Worker secret named ADMIN_TOKEN in Cloudflare settings. Never commit the token to GitHub.
4. Ensure the Worker has a KV binding named SASUKE_KV matching the namespace.
5. Deploy the Worker.
6. Update extension config.js with the deployed Worker URL.

Do not publish the extension to users until KV, secret, remote status behavior, and extension functionality have been tested. Remote disable only affects connected clients after their next successful status check; it cannot erase installed copies or disable offline clients immediately.
