# Query Todo

"Query Todo" is a project to start using Query on your local device.

## Create a new project

```sh
pnpm dlx @qery/query create https://github.com/gc-victor/query-todo
```

Or

```sh
npx @qery/query create https://github.com/gc-victor/query-todo
```

And follow the instructions.

## Demo

[Query Todo - Demo](https://query-todo.fly.dev)

## Fly Launch

If this is your first time using Fly, you can follow the [Hands-on with Fly.io](https://fly.io/hands-on/) guide to install the CLI, sign up, and sign in.

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
pnpm query settings
```

Or

```sh
npx query settings
```

And follow the instructions.

Once you have the settings, you can run:

Clean:

```sh
pnpm query task clean
```

It will clean the cache and the dist folder

Migrations:

```sh
pnpm query task migration -y
```

Deploy:

```sh
pnpm query task deploy
```

## References

- [Query Website](https://qery.io)
- [Query - GitHub](https://github.com/gc-victor/query)
- [Query Examples - GitHub](https://github.com/gc-victor/query/tree/main/examples)
- [Query Todo - GitHub](https://github.com/gc-victor/query-todo)
