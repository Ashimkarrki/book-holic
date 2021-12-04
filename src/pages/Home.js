import React from "react";
import { useGlobalContext } from "../reducer and context/context";
import BookList from "../component/BookList";
const Home = () => {
  const { setBookName, bookName } = useGlobalContext();
  const [name, setName] = React.useState("");
  return (
    <div className="home">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setBookName(name);
        }}
      >
        <input
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          name="bookName"
        />
        <h4>
          <button type="submit">Search</button>
        </h4>
      </form>

      <BookList />
    </div>
  );
};

export default Home;
