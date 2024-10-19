import { types } from 'mobx-state-tree'

const Attorney = types
  .model('Attorney', {
    objectId: types.identifier,
    enabled: types.optional(types.boolean, false),
    chatEnabled: types.optional(types.boolean, false),
    name: types.string,
    companyName: types.string,
    contactEmail: types.string,
    contactPhone: types.maybe(types.string),
    summary: types.maybe(types.string),
    impMessage: types.maybe(types.string),
    createdAt: types.maybeNull(types.string),
    updatedAt: types.maybeNull(types.string),
    quoteOrder: types.maybeNull(types.number, 0),
    banner: types.frozen({}), 
    avatar: types.frozen({}), 
  })
  .views((self) => ({}))
  .actions((self) => ({}))

export default Attorney
