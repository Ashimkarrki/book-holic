import React, { useEffect } from "react";
import { useParams } from "react-router";
import CommentSection from "../component/CommentSection";
import Loading from "../component/Loading";
import { useGlobalContext } from "../reducer and context/context";
const OneBook = () => {
  const {
    user,
    bookName,
    setBookName,
    addToLibrary,
    userInfo,
    addRating,
    addBookStatus,
    addComment,
  } = useGlobalContext();

  const { id, bookname } = useParams();
  const [comment, setComment] = React.useState("");
  const options = {
    rating: ["none", 1, 2, 3, 4, 5],
    status: ["none", "read", "currently reading", "want to read"],
  };
  const isPresent = (any) => {
    var temp = [];
    if (any === "bookStatus") {
      temp = userInfo.bookStatus.map((s) => {
        return s.bookId;
      });
    } else if (any === "rated") {
      temp = userInfo.rated.map((s) => {
        return s.bookId;
      });
    }

    if (temp.includes(biggerData.id)) {
      const position = temp.indexOf(biggerData.id);
      return { bo: true, position };
    }
    return { bo: false };
  };

  const [loading, setLoading] = React.useState(true);
  const [biggerData, setBiggerData] = React.useState({});
  const { searchBookInfo, searchLoading, pushToFirebase } = useGlobalContext();
  var smallData = React.useRef();
  var url = React.useRef();
  smallData.current = searchBookInfo.books?.filter((s) => {
    return s.id === id;
  });
  url.current = smallData.current?.map((s) => {
    return s.selfLink;
  })[0];
  const fetchOne = async () => {
    const response = await fetch(url.current);

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

  useEffect(() => {
    setLoading(true);
    setBookName(bookname);
    fetchOne();
  }, [url.current]);
  if (loading || searchLoading) {
    return (
      <div className="loadingKoMathi">
        <Loading />
      </div>
    );
  }

  return (
    <div className="up">
      <div className="onebook">
        <div className="pictureRwname">
          <img src={biggerData?.img} />
          <h3>{biggerData.title}!</h3>
        </div>
        <div className="subOnebook">
          <h3>SYPNOSIS: </h3>

          <h4>
            <p>{biggerData.desc}</p>
          </h4>
        </div>
      </div>

      <div className="extra">
        <h4>
          Total page :<span> {biggerData.totalPage}</span>
        </h4>

        <h4>
          Rating :<span> {biggerData?.rating}</span>
        </h4>
        <h4>
          Language :<span> {biggerData.language}</span>
        </h4>
        <h4>
          Publisher:
          <span> {biggerData.publisher}</span>
        </h4>

        <h4>
          Author :<span> {biggerData.author}</span>
        </h4>

        <h4>
          Published Date :<span> {biggerData.published}</span>
        </h4>
        {user && (
          <div className="features">
            <select
              name="status"
              onClick={(e) => {
                addBookStatus(biggerData.id, e.target.value);
              }}
            >
              {(!userInfo.bookStatus || !isPresent("bookStatus").bo) && (
                <>
                  {options.status.map((s, index) => {
                    if (s === "none") {
                      return (
                        <option key={index} selected value={s}>
                          select one
                        </option>
                      );
                    }
                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </>
              )}
              {userInfo.bookStatus && isPresent("bookStatus").bo && (
                <>
                  {options.status.map((s, index) => {
                    const where = isPresent("bookStatus").position;
                    if (s === userInfo.bookStatus[where].status)
                      return (
                        <option key={index} selected value={s}>
                          {s}
                        </option>
                      );

                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
            <button
              onClick={() => {
                addToLibrary(biggerData.id);
              }}
            >
              Add to library +
            </button>
            <select
              name="rating"
              onClick={(e) => {
                addRating(biggerData.id, e.target.value);
              }}
            >
              {(!userInfo.rated || !isPresent("rated").bo) && (
                <>
                  {options.rating.map((s, index) => {
                    if (s === "none") {
                      return (
                        <option key={index} selected value={s}>
                          select one
                        </option>
                      );
                    }
                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </>
              )}
              {userInfo.rated && isPresent("rated").bo && (
                <>
                  {options.rating.map((s, index) => {
                    const where = isPresent("rated").position;
                    if (s == userInfo.rated[where].rating)
                      return (
                        <option key={index} selected value={s}>
                          {s}
                        </option>
                      );

                    return (
                      <option key={index} value={s}>
                        {s}
                      </option>
                    );
                  })}
                </>
              )}
            </select>
          </div>
        )}
        <CommentSection id={biggerData.id} />
        {user && (
          <div className="reviewsection">
            <h2>Review</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addComment(biggerData.id, comment).finally(() => {
                  setComment("");
                });
              }}
            >
              <textarea
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                rows="4"
                cols="50"
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
export default OneBook;
