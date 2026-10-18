import { createStore } from 'vuex'

export default createStore({
  state: {
    searchItems: [],
    library: [],
  },
  mutations: {
    setItems(state, items) {
      state.searchItems = items.docs
      console.log(items.docs)
    },
    addBookToLibrary(state, bookToAdd) {
      if (state.library.find((object) => object.book === bookToAdd) != undefined) return
      state.library.push({
        book: bookToAdd,
        state: 0,
        favorite: false,
        rating: -1,
        note: '',
        numberRead: 0,
      })
    },
    addBookToFavorites(state, bookToAdd) {
      if (state.library.find((object) => object.book === bookToAdd) == undefined) return
      state.library.find((object) => object.book === bookToAdd).favorite = true
    },
    setBookToReading(state, bookToAdd) {
      if (state.library.find((object) => object.book === bookToAdd) == undefined) return
      state.library.find((object) => object.book === bookToAdd).state = 1
    },
    setBookToFinish(state, bookToAdd) {
      if (state.library.find((object) => object.book === bookToAdd) == undefined) return
      state.library.find((object) => object.book === bookToAdd).state = 2
    },
    removeBookFromFavorites(state, bookToRemove) {
      if (state.library.find((object) => object.book === bookToRemove) == undefined) return
      state.library.find((object) => object.book === bookToRemove).favorite = false
    },
    removeBookFromLibrary(state, bookToRemove) {
      if (state.library.find((object) => object.book === bookToRemove) == undefined) return
      state.library.splice(state.library.map((object) => object.book).indexOf(bookToRemove), 1)
    },
  },
  actions: {
    async fetchBooksByTitle({ commit }, title) {
      const response = await fetch('https://openlibrary.org/search.json?title=' + title)
        .then((resp) => resp.json())
        .catch((err) => console.log(err))
      commit('setItems', response)
    },
  },
  getters: {
    items: (state) => state.searchItems,
    library: (state) => state.library.map((object) => object.book),
    favorites: (state) =>
      state.library.filter((object) => object.favorite).map((object) => object.book),
    averageRating: (state) =>
      state.library
        .filter((object) => object.rating != -1)
        .map((object) => object.rating)
        .reduce((partialSum, a) => partialSum + a, 0) /
      state.library.filter((object) => object.rating != -1).map((object) => object.rating).length,
    numberBooksRated: (state) =>
      state.library.filter((object) => object.rating != -1).map((object) => object.rating).length,
  },
})
