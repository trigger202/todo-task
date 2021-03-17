import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import styled from 'styled-components';
import config from '../config/config';
import { getTodo, updateTodo } from '../api/api';
import Card from '../components/Card';
import Video from '../components/Video';

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;


export default function VideoLandingPage () {
  const { videoName, todoId } = useParams<{todoId: string, videoName:string}>();
  const { data, status } = useQuery("getTodo", () => getTodo(todoId));
  const [title, setTitle] = useState('');

  const videoUrl = `${config.mediaServer}${videoName}`;

  useEffect(() => {
    if(status !== "loading" && data) setTitle(data.data.title);
  }, [status, data]);

  if (status === "loading" || !data) {
    return <>"Loading..."</>;
  }

  function onVideoEnded() {
    updateTodo(todoId, {video_watched: true});
  }

  return (
    <Container>
      <Card title={title}>
        <Video src={videoUrl} width="100%" onWatched={onVideoEnded}/>
      </Card>
    </Container>
  );
}
