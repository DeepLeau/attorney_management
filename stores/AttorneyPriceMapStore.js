import { types, flow } from "mobx-state-tree"
import AttorneyPrice from './models/AttorneyPrice'

const AttorneyPriceMapStore = types
  .model("AttorneyPriceMapStore", {
    priceMaps: types.array(AttorneyPrice),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string)
  })
  .actions(self => ({
    setPriceMaps(priceMapArray) {
      self.priceMaps.replace(priceMapArray)
    },
    addPriceMap: flow(function* (priceMapData) {
      self.isLoading = true
      try {
        const response = yield fetch('/api/attorney-price-map', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(priceMapData)
        })
        const data = yield response.json()
        if (data.success) {
          self.priceMaps.push(AttorneyPrice.create(data.data))
        } else {
          throw new Error(data.message || "Failed to add price map")
        }
      } catch (error) {
        self.error = error.message
      } finally {
        self.isLoading = false
      }
    }),
    updatePriceMap: flow(function* (id, updatedData) {
      self.isLoading = true
      try {
        const response = yield fetch(`/api/attorney-price-map/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        })
        const data = yield response.json()
        if (data.success) {
          const priceMap = self.priceMaps.find(p => p.objectId === id)
          if (priceMap) {
            Object.assign(priceMap, data.data)
          }
        } else {
          throw new Error(data.message || "Failed to update price map")
        }
      } catch (error) {
        self.error = error.message
      } finally {
        self.isLoading = false
      }
    }),
    deletePriceMap: flow(function* (id) {
      self.isLoading = true
      try {
        const response = yield fetch(`/api/attorney-price-map/${id}`, {
          method: 'DELETE'
        })
        const data = yield response.json()
        if (data.success) {
          self.priceMaps = self.priceMaps.filter(p => p.objectId !== id)
        } else {
          throw new Error(data.message || "Failed to delete price map")
        }
      } catch (error) {
        self.error = error.message
      } finally {
        self.isLoading = false
      }
    }),
    fetchPriceMaps: flow(function* () {
      self.isLoading = true
      try {
        const response = yield fetch('/api/attorney-price-map')
        const data = yield response.json()
        if (data.success) {
          self.setPriceMaps(data.data.map(priceMap => AttorneyPrice.create(priceMap)))
        } else {
          throw new Error(data.message || "Failed to retrieve price maps")
        }
      } catch (error) {
        self.error = error.message
      } finally {
        self.isLoading = false
      }
    })
  }))

export default AttorneyPriceMapStore