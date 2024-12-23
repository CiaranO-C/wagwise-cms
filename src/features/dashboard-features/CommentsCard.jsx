import styled from "styled-components";
import { Card } from "../../components/sharedStyles.jsx";
import { useEffect, useMemo, useState } from "react";
import { fetchComments } from "../../api/api-comment.js";

function Comments() {
  const [comments, setComments] = useState(null);
  const [filterFlagged, setFilterFlagged] = useState(true);
  const commentCount = 10;

  const filteredComments = useMemo(() => {
    if (comments) {
      return comments.recent.filter((comment) => comment.review === false);
    }
  }, [comments]);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    async function handleFetchComments() {
      const commentData = await fetchComments(signal);
      if (commentData) {
        const { recent, review } = commentData;
        setComments({ recent, review });
      }
    }
    handleFetchComments();

    () => {
      controller.abort();
    };
  }, []);

  if (comments === null) return <CommentsCard />;

  const recentComments = filterFlagged ? filteredComments : comments.recent;

  return (
    <CommentsCard>
      <RecentComments>
        <h3>Recent</h3>
        <div className="filter">
          <label htmlFor="filterBad">Filter Flagged</label>
          <input
            type="checkbox"
            name="filterFlagged"
            id="filterFlagged"
            checked={filterFlagged}
            onChange={() => setFilterFlagged(!filterFlagged)}
          />
        </div>
        {comments.recent.length === 0 ? (
          <p>No comments</p>
        ) : (
          <ul>
            {recentComments.slice(0, commentCount).map((com) => (
              <li key={com.id}>
                <p>
                  <span className="usernameTitle">{com.author.username}:</span>{" "}
                  {com.text}
                </p>
                <p className="date">
                  {new Date(com.created).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </li>
            ))}
          </ul>
        )}
      </RecentComments>
      <div className="reviewContainer">
        <h3>Flagged</h3>
        <ul className="reviewList">
          {comments.review.length ? (
            comments.review.map((com) => (
              <li key={com.id}>
                <p>
                  <span className="usernameTitle">{com.author.username}:</span>{" "}
                  {com.text}
                </p>
                <p className="date">
                  {new Date(com.created).toLocaleString(undefined, {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </p>
              </li>
            ))
          ) : (
            <p>No flagged comments</p>
          )}
        </ul>
      </div>
    </CommentsCard>
  );
}

export default Comments;

const CommentsCard = styled.section`
  ${Card};
  grid-column: 2 / -1;
  grid-row: 4 / 5;
  display: flex;
  z-index: 1;

  div {
    padding: 0px 10px;
    flex: 1;
  }

  .reviewContainer {
    display: flex;
    flex-direction: column;
  }

  h3 {
    font-weight: 200;
    border-bottom: 0.75px solid black;
    text-align: center;
  }

  ul {
    max-height: 250px;
    overflow-y: scroll;
    list-style: none;
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: #e6e6e6;
    padding: 5px;
    gap: 5px;
    border-radius: 5px;
    box-shadow:
      rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  }

  li {
    display: flex;
    flex-direction: column;
  }

  .usernameTitle {
    font-weight: 600;
  }

  .date {
    font-style: italic;
    font-size: 0.6rem;
  }

  .reviewList {
    margin-top: 16.8px;
  }

  @media only screen and (max-width: 980px) {
    grid-column: 1 / 2;
    grid-row: 5 / 6;
  }
`;

const RecentComments = styled.div`
  display: flex;
  flex-direction: column;

  .filter {
    display: flex;
    align-items: center;
    flex-grow: 0;
    gap: 5px;
    padding: 0;
  }

  label {
    font-style: italic;
    font-size: 0.7rem;
  }
`;
