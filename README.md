# Plan

## Setup

- [*] setup project: NodeJS/Bun/tsx/vite-node?, Typescript
  - using tsx and vite-node for now. Will see how it goes with test setup.
- [*] .nvmrc
- [*] gitignore
- [*] setup validated .env
  - done using vite-node oob env support, also added zod validation

## Ethereum

- [*] setup Ethereum Provider
- [*] setup Ethereum dynamic filtering
- [ ] add more filter types

## DB

- [*] setup db -> Sqlite/PG?, Setup ORM-> Drizzle/Sequelize?
  - went with PostgreSQL because of RLS and schemas. [data seggregation](https://www.nextlabs.com/what-is-data-segregation/)
  - went with Drizzle because of superb TS integration, query builder, studio, migrations, performance.
- [*] setup models

## Rest API

- Rest endpoints
- [ ] setup config CRUD. All endpoints need to be validated.
  - [ ] Create
  - [ ] Read
  - [ ] Update
  - (Delete)... Saved txs need to point to a configuration, so we won't delete any configs, just disable them.
- [ ] connect db updates to eth filtering

## Testing

- [ ] Add basic tests

## Quality of Life

- [ ] revisit logging
- [ ] prettier
- [ ] eslint

## Documentation

- [ ] Add documentation: Readme/ Swagger?
- [ ] Readme:
- [ ] Preface
- [ ] Architecture
- [ ] Installation
