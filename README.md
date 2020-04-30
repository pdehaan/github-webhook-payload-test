# github-webhook-payload-test

Testing GitHub webhooks for issues.

**PROTIP:** Use [ngrok](https://ngrok.com/download) for local testing of webhooks before deploying to a public server. Much easier to quickly iterate without having to redeploy to GCP/AWS/Zeit.

## SETUP

Copy the .env-dist file and set the values to the GitHub webhook secret that you set in your repo's settings, and the PORT to whatever you're running your local/remote site on.
```
GH_HOOK_SECRET="WHATEVER_YOU_SET_IN_GITHUB_ADMIN"
PORT=80
```
