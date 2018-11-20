#Run Tests

1. `npm install --save-dev mocha chai`.
1. `npm install --save-dev ts-node typescript`.
1. `npm install --save-dev @types/chai @types/mocha`.

Now add a test command in "scripts" in package.json as follows:
```
"scripts": {
    "test": "mocha --require ts-node/register test/*.ts"
},
```
To run the tests use `npm run test`.

Chai: is an assertion library.
Mocha: is to run tests xD.
Note: `--save-dev` adds dependencies to package.json, so that people know what packages you use (I think).