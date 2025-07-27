import styled from "styled-components";
import Button from "../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [detail, setDetail] = useState([]); // 게시글 상세 정보를 저장할 상태
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  const getDetail = () => {
    axios
      .get(`${baseURL}/entries/${id}/`)
      .then((response) => {
        // 게시글 상세 정보를 가져오면 상태에 저장
        console.log(response);
        setDetail(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getDelete = () => {
    axios
      .delete(`${baseURL}/entries/${id}/`)
      .then((response) => {
        console.log(response);
        alert("게시글이 삭제되었습니다.");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <Wrapper>
      <Button txt="게시글 작성하기" onBtnClick={() => navigate("/write")} />
      <DetailWrapper>
        <Author>{detail.author}</Author>
        <Time>{detail.timestamp}</Time>
        <Comment>{detail.comment}</Comment>
        <BtnWrapper>
          <Button
            txt="수정"
            fontSize="1.875rem"
            onBtnClick={() => navigate(`/edit/${id}`)}
          />
          <Button txt="삭제" fontSize="1.875rem" onBtnClick={getDelete} />
        </BtnWrapper>
      </DetailWrapper>
    </Wrapper>
  );
};

export default DetailPage;

const Wrapper = styled.div`
  margin-top: 1.25rem;
  color: var(--text-black);
`;

const DetailWrapper = styled.div`
  /* width: calc(100% - 12.5rem); */
  height: fit-content;
  background-color: white;
  border-radius: 1.25rem;
  padding: 6.25rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  margin-top: 3.125rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Author = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
`;

const Time = styled.div`
  color: var(--text-grey);
  font-weight: 600;
  font-size: 1.25rem;
`;

const Comment = styled.div`
  font-size: 1.875rem;
  font-weight: 700;
  margin: 3.125rem 0;
`;

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.25rem;
`;
