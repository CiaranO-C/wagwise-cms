import styled from "styled-components";
import { Card, GrowFromMiddle } from "../sharedStyles";
import { Link } from "react-router-dom";

function TagCard({ tags }) {
  return (
    <TagsSection>
      <header className="tagsHeader">
        <h2>Most used tags</h2>
        <Link to="/admin/tags">View all</Link>
      </header>
      <div>
        {tags.map((tag) => {
          return (
            <Link
              key={tag.tagName}
              className={tag?.new ? "tagLink newTag" : "tagLink"}
              to={`/admin/tags/${tag.tagName}`}
            >
              {tag.tagName}
            </Link>
          );
        })}
      </div>
    </TagsSection>
  );
}

const TagsSection = styled.section`
  ${Card}
  display: flex;
  flex-direction: column;
  gap: 15px;

  .tagsHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 0.75px solid black;
  }

  div {
    grid-row: 2 / -1;
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .tagLink {
    background-color: #ff7e31;
    padding: 7px;
    border-radius: 15px;
    color: black;
    text-wrap: nowrap;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    font-weight: 500;
    transition: background-color 0.3s ease-out;

    &:hover {
    background-color: #ffd159;
    }
  }

  .newTag {
    opacity: 0;
    ${GrowFromMiddle};
    animation: GrowFromMiddle 0.5s ease-out 0.2s forwards;
  }
`;

export default TagCard;