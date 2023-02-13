[![npm version](https://badge.fury.io/js/@kohost%2Fapi-client.svg)](https://badge.fury.io/js/@kohost%2Fapi-client)

# Kohost API Client

Kohost API Client is a Node.js and Browser library for interacting with the Kohost API. It provides a simple and convenient way to access the API, as well as standard models, schemas, commands, and events.

## Installation

```bash
npm install @kohost/api-client
```

## Usage

The library consists of several modules, including:

- Models: Defines the models used in the API.
- Errors: Defines the error objects returned by the API.
- Commands: Defines the available commands for managing hosting resources.
- Events: Defines the events emitted by the API.
- defs: Defines the API endpoint definitions.
- utils: Contains utility functions.
- Client: The main http client for interacting with the API

```javascript
import { Client } from "@kohost/api-client";

const kohost = new Client({
  url: "https://localhost:8080/v3",
  propertyId: "development",
});
```

## Authentication

Currently, the only supported mode of Authentication with the API is via an HTTP Only cookie. You can login a user via the following command to get a cookie.

### Requesting a Login Token

```javascript
const email = "help@kohost.io";

await kohost.RequestLoginLink({
  data: { email },
});

/** OR via Phone **/

const phone = "+17025555555";

await kohost.RequestLoginLink({
  data: { phone },
});
```

Click the link in the email or SMS to authenticate.

### Using a Token

Simply use the `LoginUser` use case to provide a user ID via the `sub` parameter, along with the `token` parameter.

```javascript
const sub = "user-id-from-api";
const token = "token-provided-by-api";

await kohost.LoginUser({
  data: { sub, token },
});
```

A successful response will set an HTTP only cookie in the browser.
