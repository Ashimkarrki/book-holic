const reducer = (state, action) => {
  switch (action.type) {
    case "SET-BOOK-NAME":
      return { ...state, bookName: action.payload };

      break;
    case "INSTALL-SEARCH-BOOKS":
      const temp2 = action.payload.items;
      const temp = temp2.length;
      const newHai = temp2.map((s) => {
        return {
          id: s.id,
          selfLink: s.selfLink,
          title: s.volumeInfo.title,
          author: s.volumeInfo.authors,
          published: s.volumeInfo.publishedDate,
          img: s.volumeInfo.imageLinks.thumbnail,
        };
      });
      return {
        ...state,
        searchLoading: false,
        searchBookInfo: {
          totalItem: temp,
          books: newHai,
        },
      };
  }
};
export default reducer;
