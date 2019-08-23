# graphql-import-webpack-loader

Webpack loader for [`graphql-import`](https://github.com/graphcool/graphql-import)

## Install

```console
yarn add --dev graphql-import-webpack-loader
```

## Usage

Resolve GraphQL file import statements as a string. See the tests for more details

```graphql
# import { A } from 'src/schema/a.graphql'
# import { B } from 'src/schema/b.graphql'
# import { C, D } from 'src/schema/cd.graphql'

type Complex  {
  id: ID!
  a: A!
  b: B!
  c: C!
  d: D!
}
```

```js
import typeDefs from './schema.graphql'
```

```js
// webpack.config.js

module.exports = {
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.graphql$/,
        use: [{ loader: 'graphql-import-webpack-loader' }]
      }
    ]
  }
}
```

## Examples

Simple Server:

```ts
import { GraphQLServer } from 'graphql-yoga'
import resolvers from './resolvers'
import typeDefs from './schema.graphql'

const server = new GraphQLServer({ typeDefs, resolvers })
server.start(() => console.log('Server running on :4000'))
```
