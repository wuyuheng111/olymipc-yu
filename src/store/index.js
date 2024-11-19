import { defineStore } from 'pinia';

export const useCommentsStore = defineStore('comments', {
  state: () => ({
    comments: {},
  }),
  actions: {
    addComment(countryId, comment) {
      if (!this.comments[countryId]) {
        this.comments[countryId] = [];
      }
      this.comments[countryId].push(comment);
    },
    clearComments(countryId) {
      if (this.comments[countryId]) {
        this.comments[countryId] = [];
      }
    },
    getComments(countryId) {
      return this.comments[countryId] || [];
    },
  },
});
