import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useGlobalContext } from "../reducer and context/context";
const OneBook = () => {
  // console.log("daata fetch vayo");
  const { bookName, setBookName } = useGlobalContext();
  const { id, bookname } = useParams();
  const [loading, setLoading] = React.useState(true);
  const [biggerData, setBiggerData] = React.useState({});
  const { searchBookInfo, searchLoading } = useGlobalContext();
  var smallData = React.useRef();
  var url = React.useRef();
  smallData.current = searchBookInfo.books?.filter((s) => {
    return s.id === id;
  });
  url.current = smallData.current?.map((s) => {
    return s.selfLink;
  })[0];
  // console.log(url.current ? "xa" : "xaina");
  const fetchOne = async () => {
    console.log("vitra xa");
    const response = await fetch(url.current);

    // console.log("data received");
    const convert = await response.json();
    setBiggerData({
      ...smallData.current[0],
      totalPage: convert.volumeInfo.pageCount,
      rating: convert.volumeInfo.averageRating,

      language: convert.volumeInfo.language,
      publisher: convert.volumeInfo.publisher,
    });

    setLoading(false);
  };
  // setBookName

  useEffect(() => {
    setLoading(true);
    setBookName(bookname);

    fetchOne();
    console.log("effect");
  }, [url.current]);
  if (loading || searchLoading) {
    return <h1>Loading</h1>;
  }

  return (
    <div className="onebook">
      <img src={biggerData?.img} />
      <h3>{biggerData.title}!</h3>
      <h3>
        Description: <p>{biggerData.desc}</p>{" "}
      </h3>
      <h4> Total page:{biggerData.totalPage}</h4>
      {/* {biggerData.id && console.log(biggerData)} */}
      {/* {console.log(biggerData.id : "happy")} */}
      <h4> Rating:{biggerData?.rating}</h4>
      <h4>Language:{biggerData.language}</h4>
      <h4>Publisher:{biggerData.publisher}</h4>
      <h4>Author:{biggerData.author}</h4>
      <h4>Published Date:{biggerData.published}</h4>
      <select name="status">
        <option value="currenty reading">currenty reading</option>
        <option value="Read">Read</option>
        <option value="want to read">want to read</option>
      </select>
      <button> Add to library +</button>
      <select name="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
    </div>
  );
};
export default OneBook;
