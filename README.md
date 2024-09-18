# Basic Plan

## Setup

- [*] setup project: NodeJS/Bun/tsx/vite-node?, Typescript
  - using tsx and vite-node for now. Will see how it goes with test setup.
- [*] .nvmrc
- [*] gitignore
- [*] setup validated .env
  - [*] done using vite-node oob env support, also added zod validation

## Ethereum

- [*] setup Ethereum Provider
- [*] setup Ethereum dynamic filtering
- [ ] add more filter types

## DB

- [*] setup db -> Sqlite/PG?, Setup ORM-> Drizzle/Sequelize?
  - [*] went with PostgreSQL because of RLS and schemas for the purpose of future [data segregation](https://www.nextlabs.com/what-is-data-segregation/)
  - [*] went with Drizzle because of superb TS integration, query builder, studio, migrations, performance.
- [*] setup models

## Rest API

- Rest endpoints: express/koa/fastify/...
  - [*] endpoints validated using zod
  - [*] response type is pretty.
- [*] setup config CRUD. All endpoints need to be validated.
  - [*] Create
  - [*] Read
  - [*] Update -> saved txs need to point to a valid config. So it doesn't make sense to update any props on a config other than the enabled flag.
  - [*] Delete... cascade delete txs
- [*] connect db updates to eth filtering

## Testing

- [ ] Add basic tests

## Quality of Life

- [ ] revisit logging
- [*] prettier
- [*] eslint

## Documentation

- [ ] Add documentation: Readme/ Swagger?
  - [*] added Swagger docs
- [ ] Readme:
- [ ] Preface
- [ ] Architecture
- [ ] Installation

# Bonus:

Create a simple front-end to show off the back-end's features

- [*] Add a websocket endpoint to fastify api
- [*] Create a simple svelte UI to show the live data
  - global state
  - [*] See a list of filters
  - [*] Create a filter
  - [*] Delete a filter
  - [*] Edit a filter
- [*] visualize the live data
  - [*] color transactions based on the filter they match
  - [*] glowing green to indicate live
- [*] make site mobile friendly
- [*] display all saved transactions
- [ ] dockerize everything

## TODO extract overlapping types into a shared lib
