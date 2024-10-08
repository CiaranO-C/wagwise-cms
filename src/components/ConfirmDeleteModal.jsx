import { useState } from "react";
import styled from "styled-components";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  Button,
  FadeOut,
  GrowFromMiddle,
  ShrinkToMiddle,
} from "./sharedStyles";

function ConfirmModal({ onClose, id }) {
  const [success, setSuccess] = useState(false);

  async function deleteArticle() {
    const token = localStorage.getItem("accessToken");
    const res = await fetch(`/api/articles/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return false;
    }

    return true;
  }

  async function handleSubmit({ target }) {
    console.log(target.name);

    console.log("delete article!");

    const deleted = await deleteArticle(id);

    if (deleted === true) {
      setSuccess(true);

      //delay closing modal to display success message
      setTimeout(() => {
        onClose();
      }, 2100);
    }
  }

  return (
    <DivModal className={success ? "fade" : ""}>
      <div className={success ? "btnContainer close" : "btnContainer"}>
        <h2>Delete Article?</h2>

        <button className="option" onClick={() => onClose()} name="cancel">
          Cancel
        </button>
        <button className="option" onClick={handleSubmit} name="confirm">
          Confirm
        </button>

        {success && <p className="success">Article Deleted!</p>}
        <button id="closeModal" onClick={onClose}>
          <IoIosCloseCircleOutline />
        </button>
      </div>
    </DivModal>
  );
}

const DivModal = styled.div`
  display: flex;
  background-color: #ababab36;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 100vw;
  height: 100vh;
  z-index: 10;

  &.fade {
    ${FadeOut};
    animation: FadeOut 0.1s 2s forwards;
  }

  .btnContainer {
    z-index: 10;
    border-radius: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 20px 30px;
    gap: 15px;
    align-items: center;
    justify-content: space-evenly;
    box-shadow:
      rgba(0, 0, 0, 0.3) 0px 19px 38px,
      rgba(0, 0, 0, 0.22) 0px 15px 12px;

    h2 {
      font-weight: 300;
    }

    .option {
      ${Button}
      min-width: 70%;
    }
  }

  #closeModal {
    cursor: pointer;
    background-color: white;
    border: none;
    position: absolute;
    top: 5px;
    right: 5px;

    svg {
      width: 25px;
      height: 25px;
    }
    &:hover {
      color: orange;
    }
  }

  .success {
    opacity: 0;
    ${GrowFromMiddle};
    animation: GrowFromMiddle 0.3s ease-out forwards;
  }

  .close {
    ${ShrinkToMiddle};
    animation: ShrinkToMiddle 0.3s ease-out 1.7s forwards;
  }
`;

export default ConfirmModal;