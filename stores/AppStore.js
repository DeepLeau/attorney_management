import { types } from 'mobx-state-tree'
import ThemeStore from '@/stores/ThemeStore'
import AttorneyStore from '@/stores/AttorneyStore'
import AttorneyPriceMapStore from '@/stores/AttorneyPriceMapStore'

const AppStore = types.model('AppStore', {
  attorney: types.optional(AttorneyStore, {}),
  attorneyPriceMap: types.optional(AttorneyPriceMapStore, {}),
  theme: types.optional(ThemeStore, {}),
})

const initialStore = {
  attorney: {},
  attorneyPriceMap: {},
  theme: {},
}

export const createStore = (data = {}) => AppStore.create({ ...initialStore, ...data })

const store = createStore()
export default store