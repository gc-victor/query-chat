# Query Chat

"Query Chat" is a project to start using Query on your local device.

## Create a new project

```sh
pnpm dlx @qery/query create https://github.com/gc-victor/query-chat
```

Or

```sh
npx @qery/query create https://github.com/gc-victor/query-chat
```

And follow the instructions.

## Demo

[Query Chat - Demo](https://query-chat.fly.dev)

## Fly Launch

If this is your first time using Fly, you can follow the [Quick Start](https://fly.io/docs/getting-started/launch/) guide to install the CLI, sign up, and sign in.

Once you have the Fly CLI installed, you have to running the following command:

```sh
fly launch
```

It is time to set the environment variables for your app. You can do it by running the following commands:

Token secret:

```sh
fly secrets set QUERY_SERVER_TOKEN_SECRET=$(openssl rand -hex 32)
```

> **Tip**: If you don't have openssl installed, you can also use
> [1Password](https://1password.com/password-generator) to generate a random
> secret, just replace `$(openssl rand -hex 32)` with the generated secret.

Admin email:

```sh
fly secrets set QUERY_SERVER_ADMIN_EMAIL=(USE_YOUR_EMAIL)
```

Admin password:

```sh
fly secrets set QUERY_SERVER_ADMIN_PASSWORD=(USE_YOUR_PASSWORD)
```

Then you can deploy your app running:

```sh
fly deploy
```

To push the code to the Fly platform, you can run:

```sh
pnpm query deploy
```

Or

```sh
npx query deploy
```

And follow the instructions:

- Server URL: The URL of the Query server to deploy (e.g., https://query-chat.fly.dev).
- Email: The email address for authentication.
- Password: The password for authentication.

## References

- [Query Website](https://qery.io)
- [Query - GitHub](https://github.com/gc-victor/query)
- [Query Examples - GitHub](https://github.com/gc-victor/query/tree/main/examples)
- [Query Chat - GitHub](https://github.com/gc-victor/query-chat)
