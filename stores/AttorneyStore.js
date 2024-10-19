import { types, flow } from "mobx-state-tree";
import Attorney from './models/Attorney';

const AttorneyStore = types
  .model("AttorneyStore", {
    attorneys: types.array(Attorney),
    currentAttorney: types.maybeNull(Attorney),
    isLoading: types.optional(types.boolean, false),
    error: types.maybeNull(types.string)
  })
  .actions(self => ({
    setAttorneys(attorneyArray) {
      self.attorneys.replace(attorneyArray);
    },

    setError(error) {
      self.error = error;
    },

    setLoading(loading) {
      self.isLoading = loading;
    },

    fetchAttorneys: flow(function* () {
      self.isLoading = true;
      self.error = null;
      try {
        const response = yield fetch('/api/attorney-data');
        const data = yield response.json();
        if (data.success) {
          self.setAttorneys(data.data.map(attorney => Attorney.create(attorney)));
        } else {
          throw new Error(data.message || "Failed to retrieve attorneys");
        }
      } catch (error) {
        self.error = error.message;
      } finally {
        self.isLoading = false;
      }
    }),

    fetchAttorney: flow(function* (id) {
      self.isLoading = true;
      self.error = null;
      try {
        const response = yield fetch(`/api/attorney-data/${id}`);
        const data = yield response.json();
        if (data.success) {
          self.currentAttorney = Attorney.create(data.data);
          return data.data;
        } else {
          throw new Error(data.message || "Failed to retrieve attorney");
        }
      } catch (error) {
        self.error = error.message;
      } finally {
        self.isLoading = false;
      }
    }),

    updateAttorney: flow(function* (id, updatedData) {
      self.isLoading = true;
      self.error = null;
      try {
        const response = yield fetch(`/api/attorney-data/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedData)
        });
        const data = yield response.json();
        if (data.success) {
          const attorney = self.attorneys.find(a => a._id === id);
          if (attorney) {
            Object.assign(attorney, data.data);
          }
          if (self.currentAttorney && self.currentAttorney._id === id) {
            self.currentAttorney = Attorney.create(data.data);
          }
        } else {
          throw new Error(data.message || "Failed to update attorney");
        }
      } catch (error) {
        self.error = error.message;
      } finally {
        self.isLoading = false;
      }
    }),

    deleteAttorney: flow(function* (id) {
      self.isLoading = true;
      self.error = null;
      try {
        const response = yield fetch(`/api/attorney-data/${id}`, {
          method: 'DELETE'
        });
        const data = yield response.json();
        if (data.success) {
          self.attorneys = self.attorneys.filter(a => a._id !== id);
          if (self.currentAttorney && self.currentAttorney._id === id) {
            self.currentAttorney = null;
          }
        } else {
          throw new Error(data.message || "Failed to delete attorney");
        }
      } catch (error) {
        self.error = error.message;
      } finally {
        self.isLoading = false;
      }
    })
  }));

export default AttorneyStore;