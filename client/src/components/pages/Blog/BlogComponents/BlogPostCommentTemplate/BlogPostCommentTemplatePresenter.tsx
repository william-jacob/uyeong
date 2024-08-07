import MarkdownViewer from '@organisms/MarkdownViewer';
import { SECTION, DIV, P, BTN } from './BlogPostCommentTemplateStyle';
import Image from 'next/image';
import { BlogComment, BlogReply } from '@app/services/blog/commentApi';
import formatDate from '@utils/formatDate';
import CaretDownIcon from '@icons/CaretDownIcon';
import CaretUpIcon from '@icons/CaretUpIcon';
import BlogPostCommentWrite from '../BlogPostCommentWrite';
import { UserResponse } from '@app/services/user/userApi';
import Modal from '@organisms/Modal';
import useOnClickOutside from '@hooks/useOnClickOutside';
import { useCallback, useRef, useState } from 'react';
import EllipsisVerticalIcon from '@icons/EllipsisVerticalIcon';
import EditIcon from '@icons/EditIcon';
import TrashCanIcon from '@icons/TrashCanIcon';
import UserIcon from '@icons/UserIcon';

interface Props {
  postId?: string;
  comment: BlogComment;
  reply?: BlogReply;
  userData?: UserResponse;
  userMatch?: boolean;
  taggedNickname: string;
  regexTaggedNickname: string;
  writeReply: boolean;
  setWriteReply: (writeReply: boolean) => void;
  editComment: boolean;
  setEditComment: (editComment: boolean) => void;
  isOpenReplies?: boolean;
  setOpenReplies?: (isOpenReplies: boolean) => void;
  commentContent: string;
  setCommentContent: (commentContent: string) => void;
  replyContent: string;
  setReplyContent: (replyContent: string) => void;
  isModalOpen: boolean;
  setModalOpen: (isModalOpen: boolean) => void;
  onClickReply: () => void;
  onClickReplies?: () => void;
  onClickEdit: () => void;
  onClickDelete: (isCallback?: boolean) => void;
  deleteCommentError: any;
}

const BlogPostCommentTemplatePresenter = ({
  postId,
  userData,
  comment,
  reply,
  userMatch,
  taggedNickname,
  regexTaggedNickname,
  writeReply,
  setWriteReply,
  editComment,
  setEditComment,
  isOpenReplies,
  setOpenReplies,
  commentContent,
  setCommentContent,
  replyContent,
  setReplyContent,
  isModalOpen,
  setModalOpen,
  onClickReply,
  onClickReplies,
  onClickEdit,
  onClickDelete,
  deleteCommentError,
}: Props) => {
  const { user, content, replies, createdAt } = comment;

  const dropdownBoxRef = useRef(null);
  const [isCommentMenuOpen, setCommentMenuOpen] = useState(false);

  const onClickCommentMenu = useCallback(() => {
    setCommentMenuOpen((prev) => !prev);
  }, []);

  const onClickOutside = useCallback(() => {
    setCommentMenuOpen(false);
  }, []);

  useOnClickOutside(dropdownBoxRef, onClickOutside);

  return (
    <SECTION.Frame>
      {/* 프로필 이미지 */}
      <DIV.CommentTop>
        <div className="comment-user-avatar-warpper comment-user-avatar">
          {reply ? (
            //userData 변경 되면 바로 적용
            userData?.user?._id === reply.user._id ? (
              userData.user.avatar ? (
                <Image
                  className="comment-user-avatar"
                  src={userData.user.avatar}
                  alt="user-avatar"
                  layout="fill"
                  objectFit="cover"
                />
              ) : (
                <>
                  <UserIcon />
                </>
              )
            ) : reply.user.avatar ? (
              <Image
                className="comment-user-avatar"
                src={reply.user.avatar}
                alt="user-avatar"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <>
                <UserIcon />
              </>
            )
          ) : userData?.user?._id === user._id ? (
            userData.user.avatar ? (
              <Image
                className="comment-user-avatar"
                src={userData.user.avatar}
                alt="user-avatar"
                layout="fill"
                objectFit="cover"
              />
            ) : (
              <>
                <UserIcon />
              </>
            )
          ) : user.avatar ? (
            <Image
              className="comment-user-avatar"
              src={user.avatar}
              alt="user-avatar"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <>
              <UserIcon />
            </>
          )}
        </div>
        <DIV.CommentTopRight>
          <DIV.CommentInfo>
            <P.Nickname>
              {/* userData 변경 되면 바로 적용 */}
              {reply
                ? userData?.user?._id === reply.user._id
                  ? userData.user.nickname
                  : reply.user.nickname
                : userData?.user?._id === user._id
                ? userData.user.nickname
                : user.nickname}
            </P.Nickname>
            <span>·</span>
            <P.CreatedDate>{reply ? formatDate(reply.createdAt) : formatDate(createdAt)}</P.CreatedDate>
          </DIV.CommentInfo>

          {(userMatch || (reply && userData?.user?._id === reply?.user._id) || userData?.user?.role === 'admin') && (
            <DIV.CommentMenu ref={dropdownBoxRef} onClick={onClickCommentMenu}>
              <EllipsisVerticalIcon />
              {isCommentMenuOpen && (
                <DIV.CommentMenuBtns>
                  <BTN.CommentEditBtn onClick={onClickEdit}>
                    <EditIcon />
                    Edit
                  </BTN.CommentEditBtn>
                  <BTN.CommentDeleteBtn onClick={() => onClickDelete()}>
                    <TrashCanIcon />
                    Delete
                  </BTN.CommentDeleteBtn>
                </DIV.CommentMenuBtns>
              )}
            </DIV.CommentMenu>
          )}
        </DIV.CommentTopRight>
      </DIV.CommentTop>

      <DIV.CommentMain>
        <DIV.CommentMainContent>
          {!editComment ? (
            <MarkdownViewer
              content={
                //저장시 잠시 이전 내용이 노출되어 분리
                // client data: replyContent, commentContent
                // server data: reply.content, content
                reply ? (replyContent ? replyContent : reply.content) : commentContent ? commentContent : content
              }
            />
          ) : (
            <BlogPostCommentWrite
              comment={comment}
              reply={reply}
              regexTaggedNickname={regexTaggedNickname}
              editComment={editComment}
              setEditComment={setEditComment}
              setCommentContent={setCommentContent}
              setReplyContent={setReplyContent}
            />
          )}
        </DIV.CommentMainContent>

        <DIV.CommentMainReply>
          {!reply &&
            (replies.length > 0 ? (
              <>
                <P.Replies onClick={onClickReplies}>
                  {isOpenReplies ? <CaretUpIcon /> : <CaretDownIcon />}{' '}
                  {replies.length > 1 ? `${replies.length} replies` : `${replies.length} reply`}
                </P.Replies>
                <span>·</span>
              </>
            ) : (
              <></>
            ))}

          <BTN.CommentReplyBtn onClick={onClickReply} writeReply={writeReply}>
            Reply
          </BTN.CommentReplyBtn>
        </DIV.CommentMainReply>

        {writeReply && (
          <BlogPostCommentWrite
            postId={postId}
            comment={comment}
            taggedNickname={taggedNickname}
            writeReply={writeReply}
            setWriteReply={setWriteReply}
            setOpenReplies={setOpenReplies}
          />
        )}
      </DIV.CommentMain>
      <Modal
        type="delete"
        msg={`Are you sure you want to delete this ${reply ? `reply` : `comment`}?`}
        isOpen={isModalOpen}
        setOpen={setModalOpen}
        callback={() => onClickDelete(true)}
        shakeAlert
      />
      {deleteCommentError && (
        <Modal type="alert" msg={deleteCommentError.data.msg} isOpen={isModalOpen} setOpen={setModalOpen} shakeAlert />
      )}
    </SECTION.Frame>
  );
};

export default BlogPostCommentTemplatePresenter;
