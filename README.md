# Express and MongoDB CRUD API

Node.js backend exercise organising CRUD operations into Express routers, repository classes and MongoDB connection services.

## How it works

`app.js` mounts routers at `/todos`, `/customers`, `/products` and `/orders`. Repository classes query MongoDB collections, including lookups and paginated results. Swagger annotations in the route files generate documentation at `/api-docs`.

## Usage

Requires Node.js 20, npm and an accessible MongoDB instance. From the repository root:

```sh
npm install
```

Set `MONGODB_URI` in the process environment, then run `npm start`. The default port is `5000`, configurable through `PORT`. Service modules use resource-specific database names such as `Todos` and `Products`.

## Notes

This is an incomplete practice API. `app.js` does not register JSON body parsing, the root route references an absent `public/index.html`, and some repository methods contain variable, collection-name or response-field inconsistencies. These need correction before all endpoints can be used reliably. The supplied test script is a placeholder.
