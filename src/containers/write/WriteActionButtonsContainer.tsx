import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ReducerType } from "../../modules";
import { updatePost, writePost } from "../../modules/write";
import WriteActionButtons from "../../components/write/WriteActionButtons";

const WriteActionButtonsContainer = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const { title, body, tags, thumbnail, post, postError, originalPostId } =
    useSelector(({ write }: ReducerType) => ({
      title: write.title,
      body: write.body,
      tags: write.tags,
      thumbnail: write.thumbnail,
      post: write.post,
      postError: write.postError,
      originalPostId: write.originalPostId,
    }));

  const onPublish = () => {
    if (originalPostId) {
      dispatch(
        updatePost({ postId: originalPostId, title, body, tags, thumbnail }),
      );
      return;
    }
    dispatch(writePost({ title, body, tags, thumbnail }));
  };

  const onCancel = () => {
    navigation(-1);
  };

  useEffect(() => {
    if (post) {
      const { id, user } = post;
      navigation(`/@${user.nickname}/${id}`);
    }
    if (postError) {
      console.log(postError);
    }
  }, [navigation, post, postError]);

  return (
    <WriteActionButtons
      onPublish={onPublish}
      onCancel={onCancel}
      isEdit={!!originalPostId}
    />
  );
};

export default WriteActionButtonsContainer;
