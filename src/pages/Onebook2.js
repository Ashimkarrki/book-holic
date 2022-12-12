import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Loading from "../component/Loading";

import { useGlobalContext } from "../reducer and context/context";
import CommentSection from "../component/CommentSection";
const OneBook2 = () => {
  const [comment, setComment] = React.useState("");

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
  const navigate = useNavigate();
  const { isbn } = useParams();

  const [loading, setLoading] = React.useState(true);
  const [biggerData, setBiggerData] = React.useState({});
  const { searchBookInfo, searchLoading, pushToFirebase } = useGlobalContext();

  const { id, bookname } = useParams();
  const options = {
    rating: ["none", 1, 2, 3, 4, 5],
    status: ["none", "Read", "Currently reading", "Want to read"],
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

  const fetchOne = async () => {
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}&key=${process.env.REACT_APP_BOOK_API}`
    );

    const convert = await response.json();
    const s = convert.items[0];

    if (!s.volumeInfo.imageLinks) {
      var img =
        "https://img.whaleshares.io/wls-img/einstei1/d765e65f432e7e6f0d062616d19364ecdc5631da.png";
    } else {
      img = s.volumeInfo.imageLinks.thumbnail;
    }
    setBiggerData({
      id: s.id,
      title: s.volumeInfo.title,
      author: s.volumeInfo.authors,
      published: s.volumeInfo.publishedDate,
      img,
      totalPage: s.volumeInfo.pageCount,
      rating: s.volumeInfo.averageRating,

      language: s.volumeInfo.language,
      publisher: s.volumeInfo.publisher,
      // isbn: convert.industryIdentifiers.
    });

    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    fetchOne();
  }, []);
  if (loading) {
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
          Publisher :<span> {biggerData.publisher}</span>
        </h4>

        <h4>
          Author:
          <span>{biggerData.author}</span>
        </h4>

        <h4>
          Published Date:
          <span>{biggerData.published}</span>
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
export default OneBook2;
