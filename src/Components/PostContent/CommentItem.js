import React, { useState } from 'react';
import { Box, VStack } from '@chakra-ui/react';

import { commentWrite, commentLike } from '../../Api/CommentApi';
import { useLoginContext } from '../../Context/LoginData';
import ReplyItem from './ReplyItem';
import timePassed from '../../helpers/functions/time';
import img_user from '../../Images/user.png';

const CommentItem = ({ comment }) => {
  const { user } = useLoginContext();

  const [WriteReply, setWriteReply] = useState(false);

  const [Reply, setReply] = useState({
    post: comment.post_id,
    parent: comment.id,
    content: '',
    is_anonym: false,
  });

  const onClickReply = () => {
    setWriteReply((writeReply) => !writeReply);
  };

  const onClickLike = () => {
    if (window.confirm('이 댓글에 공감하십니까?')) {
      commentLike(comment.id, user.token);
    }
  };

  const onChangeInput = (event) => {
    const { name, value } = event.target;
    setReply({
      ...Reply,
      [name]: value,
    });
  };

  const onClickAnon = () => {
    setReply((comment) => ({ ...comment, is_anonym: !comment.is_anonym }));
  };

  const onClickSubmit = () => {
    if (Reply.content === '') return window.alert('내용을 입력해 주세요.');
    commentWrite(Reply, user.token);
    setReply({ ...Reply, content: '' });
  };

  return (
    <Box w="100%" borderBottom="1px" borderColor="#e3e3e3">
      <Box w="100%" p="15px 15px 4px 15px">
        <img className="img-user-s" src={img_user} alt="user" />
        <span className="black12b"> {comment.nickname}</span>
        <div className="postcontent-status">
          <button onClick={onClickReply}>대댓글</button>
          <button onClick={onClickLike}>공감</button>
        </div>
        <div className="gray14">{comment.content}</div>
        <time className="time12">{timePassed(comment.created_at)}</time>
      </Box>

      {comment.reply && comment.reply.length > 0 ? (
        <VStack
          w="737px"
          m="0 4px 4px 35px"
          border="1px"
          borderBottom="0"
          borderColor="#e3e3e3"
          bgColor="#f9f9f9"
          spacing="0"
        >
          {comment.reply.map((reply) => (
            <ReplyItem key={reply.id} reply={reply} />
          ))}
        </VStack>
      ) : null}

      {WriteReply ? (
        <div className="postcontent-form-reply">
          <input
            className="postcontent-reply"
            name="content"
            value={Reply.content}
            type="text"
            maxLength="300"
            placeholder="대댓글을 입력하세요."
            onChange={onChangeInput}
          />
          <div className="postcontent-option">
            <button
              className={Reply.is_anonym ? 'postcontent-anon-on' : 'postcontent-anon-off'}
              onClick={onClickAnon}
            />
            <button className="postcontent-submit" onClick={onClickSubmit} />
          </div>
        </div>
      ) : null}
    </Box>
  );
};

export default CommentItem;
