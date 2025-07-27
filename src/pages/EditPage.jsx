import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const EditPage = () => {
  const navigate = useNavigate();
  const [author, setAuthor] = useState("");
  const [comment, setComment] = useState("");
  const baseURL = import.meta.env.VITE_API_BASE_URL; // 환경변수에서 API 기본 URL을 가져옴
  const { id } = useParams(); // URL 파라미터에서 게시글 ID를 가져옴

  const onChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const onChangeComment = (e) => {
    setComment(e.target.value);
  };

  // 게시글 수정 페이지에서 게시글 ID를 이용해 기존 데이터를 가져오는 함수
  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = () => {
    axios
      .get(`${baseURL}/entries/${id}/`)
      .then((response) => {
        console.log(response);
        setAuthor(response.data.author); // 게시글 작성자 이름을 상태에 저장
        setComment(response.data.comment); // 게시글 내용을 상태에 저장
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const editComment = () => {
    axios
      .put(`${baseURL}/entries/${id}/`, {
        author: author,
        comment: comment,
      })
      .then((response) => {
        console.log(response);
        alert("게시글이 수정이 완료되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("게시글 수정에 실패했습니다.");
      });
  };

  return (
    <Wrapper>
      <FormGroup>
        <InputLabel>이름</InputLabel>
        <StyledInput
          placeholder="이름을 입력해주세요."
          value={author}
          onChange={onChangeAuthor}
        />
      </FormGroup>
      <FormGroup>
        <InputLabel>내용</InputLabel>
        <StyledTxtarea
          placeholder="게시글 내용을 입력해주세요."
          value={comment}
          onChange={onChangeComment}
        />
      </FormGroup>
      <BtnWrapper>
        <Button txt="수정하기" onBtnClick={editComment} />
      </BtnWrapper>
    </Wrapper>
  );
};

export default EditPage;

const Wrapper = styled.div`
  margin-top: 3.125rem;
  display: flex;
  flex-direction: column;
  gap: 1.875rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
`;

const InputLabel = styled.div`
  color: var(--text-black);
  font-size: 1.875rem;
  font-weight: 700;
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  background-color: white;
  padding: 0.625rem 1.875rem;
  border-radius: 0.9375rem;
  width: 18.75rem;
  height: 3.125rem;
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--text-black);
  &::placeholder {
    color: #acacac;
    font-weight: 700;
  }
`;

const StyledTxtarea = styled.textarea`
  border: none;
  outline: none;
  width: 100%;
  height: 12.5rem;
  background-color: white;
  padding: 1.875rem;
  border-radius: 0.9375rem;
  font-size: 1.125rem;
  font-weight: 700;
  resize: none;
  color: var(--text-black);
  &::placeholder {
    color: #acacac;
    font-weight: 700;
  }
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
