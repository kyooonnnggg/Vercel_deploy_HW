import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// const MOCK_COMMENTS = [
//   {
//     id: "1",
//     author: "박세은",
//     comment: "최근에 밥친구가 과학 영상으로 바꼈습니다:) 재미지다..",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "2",
//     author: "박소연",
//     comment: "녹차 말차 완전 좋아해요🌿 곧 말차 설레임, 티코 신상 나온대요~~~",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "3",
//     author: "이승채",
//     comment: "최근에 방탈출 카페 알바를 시작했어요~~",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "4",
//     author: "이연서",
//     comment: "최근에 노트북 배경화면을 바꿨습니다 ✌🏻",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "5",
//     author: "이채빈",
//     comment: "장마가 싫어요",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "6",
//     author: "정교은",
//     comment: "얼마 전 6개월만에 네일을 받았습니다 ~ 💅🪽",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
//   {
//     id: "7",
//     author: "성윤정",
//     comment:
//       "이렇게하고싶은말이너무많아서말이길어지면당연히텍스트영역이넓어지고똑같은컴포넌트인데높이가들쑥날쑥하면보기에예쁘지가않겠죠그래서css로깔끔하게바꿔주려고합니다",
//     timestamp: "2025-06-25T22:54:21Z",
//   },
// ];

const Comment = () => {
  const navigate = useNavigate();
  //   const [comments] = useState(MOCK_COMMENTS);
  const [comments, setComments] = useState([]); // comments response로 받은 게시글 배열을 저장
  const baseURL = import.meta.env.VITE_API_BASE_URL; // 환경변수에서 API 기본 URL을 가져옴
  const getComment = () => {
    axios
      .get(`${baseURL}/entries/`) // API에서 댓글 목록을 가져옴
      .then((response) => {
        // 오류 없이 응답을 받으면
        console.log(response);
        setComments(response.data);
      })
      .catch((error) => {
        // 오류가 발생하면
        console.error(error);
      });
  };

  useState(() => {
    // 최초 렌더링 시에만 getComment 함수 1회 실행
    getComment();
  }, []);

  return (
    <>
      {comments.map(
        (
          comment // comments를 map으로 돌려서 각 댓글을 CommentContainer로 렌더링
        ) => (
          // 각 댓글을 클릭하면 해당 댓글의 상세 페이지로 이동
          // navigate(`/comment/${comment.id}`)로 이동
          // comment.id는 각 댓글의 고유 ID로 사용
          // 이 ID를 이용해 상세 페이지에서 해당 댓글의 정보를 가져올 수 있습니다.
          // 예시: /comment/1, /comment/2 등
          // 이 부분은 실제 API에서 댓글의 ID를 어떻게 관리하는지에 따라 달라질 수 있습니다.
          // 여기서는 comment.id를 사용한다고 가정합니다.
          <CommentContainer
            key={comment.id}
            onClick={() => navigate(`/comment/${comment.id}`)}
          >
            <MetaInfo>
              <Author>{comment.author}</Author>
              <Time>{comment.timestamp}</Time>
            </MetaInfo>
            <CommentTxt>{comment.comment}</CommentTxt>
          </CommentContainer>
        )
      )}
    </>
  );
};

export default Comment;

const CommentContainer = styled.div`
  min-width: 100%;
  min-height: 6.25rem;
  box-shadow: 0 0 0.625rem rgba(0, 0, 0, 0.15);
  border-radius: 1.25rem;
  background-color: white;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  color: var(--text-black);
  &:hover {
    cursor: pointer;
    color: var(--main-orange);
    box-shadow: 0 0 0.625rem rgba(238, 110, 67, 0.727);
    background-color: #fef5f0;
    > span {
      color: #ffcca8;
    }
  }
`;

const MetaInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`;

const Author = styled.div`
  font-size: 1.5625rem;
  font-weight: 700;
`;
const Time = styled.span`
  font-size: 0.9375rem;
  color: var(--text-grey);
  font-weight: 600;
`;
const CommentTxt = styled.div`
  font-size: 1.125rem;
  font-weight: 600;
  overflow: hidden; /* 박스에서 넘쳐난 텍스트 숨기기 */
  white-space: nowrap; /* 줄바꿈이 없어짐 */
  text-overflow: ellipsis; /* 말줄임 효과 (...) */
  word-break: break-all; /* 어절이 유지되지 않고 끊어져서 줄바꿈 됨 */
`;
