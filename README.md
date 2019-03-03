## HTTP status codes

Ripped from [here](https://restfulapi.net/http-status-codes/) and [here](https://www.restapitutorial.com/httpstatuscodes.html)

```
200 - for GET
201 - for POST
204 - for DELETE, PUT

400 - bad payload/request
401 - requires auth
403 - not authorized to do stuff
404 - not found duh!

500 - server b0rked
```

## Notes

- The `next()` function is express is bae. When called like `next(error)`, it'll not call the next middleware, rather the error handlers,
  i.e.. if we make one that is. If we call it like `next()`, without args, it'll call the next fn in the list. Refer [here](http://expressjs.com/en/guide/error-handling.html). Check the sample `quote.route.js` and `app.js` for implementations.

- To run the app in production, invoke it as `$ NODE_ENV=prod SECRET=secret node app`