import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from 'react-query';
import styled from 'styled-components';
import config from '../config/config';
import Button from '../components/Button';
import Card from '../components/Card';
import Popup from '../components/Popup';
import WebCam from '../components/WebCam';
import Video from '../components/Video';
import {getTodo, uploadVideo} from '../api/api';
import {TodoDetails, TodoStatus} from '../types/Todo';

interface PopupVideoDetails {
  title: string;
  videoUrl: string;
}

const Container = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TodoItemContainer = styled.div`
  margin: 5px 0;
`;

const Status = styled.div<Pick<TodoDetails, 'status'>>`
  color: ${(props) => (props.status === TodoStatus.completed ? '#2ed573' : '#ff4757')};
`;

export default function TodoDetailsPage() {
  const query = useParams<{todoId: string}>();
  const {data, status} = useQuery('getTodo', () => getTodo(query.todoId));

  const [todo, setTodo] = useState<TodoDetails>({} as TodoDetails);
  const [openCamera, setOpenCamera] = useState(false);
  const [openVideoPopup, setOpenVideoPopup] = useState(false);
  const [videoDetails, setVideoDetails] = useState<PopupVideoDetails>({} as PopupVideoDetails);

  useEffect(() => {
    if (status !== 'loading' && data) setTodo(data.data);
  }, [status, data]);

  if (status === 'loading') {
    return <>"Loading..."</>;
  }

  if (!todo) {
    return <>Todo not found</>;
  }
  async function onUploadVideo(video: Blob) {
    const {data} = await uploadVideo(query.todoId, video);
    setTodo({...todo, video_name: data.video_name, status: TodoStatus.completed});
    setOpenCamera(false);
  }

  function toggleCamera() {
    setOpenCamera(!openCamera);
  }

  function togglePopupVideo() {
    setOpenVideoPopup(!openVideoPopup);
  }

  function openPoupVideo(title: string, videoName: string) {
    return function () {
      const videoUrl = `${config.mediaServer}${videoName}`;
      setVideoDetails({title, videoUrl});
      togglePopupVideo();
    };
  }

  return (
    <Container>
      {openCamera && <WebCam open={openCamera} onSubmit={onUploadVideo} onClose={toggleCamera} />}
      <Popup open={openVideoPopup} title={videoDetails.title} onClose={togglePopupVideo}>
        <Video src={videoDetails.videoUrl} width='100%' />
      </Popup>
      <Card title={todo.title}>
        <TodoItemContainer>
          <Status status={todo.status}>{todo.status}</Status>
          <div>To: {todo.recipient}</div>
          <div>
            Video Link:{' '}
            {todo.video_name && (
              <a
                href={`/${todo.id}/video/${todo.video_name}`}
              >{`${window.location.origin}/${todo.id}/video/${todo.video_name}`}</a>
            )}
          </div>
          <div>Has the video been watched?: {todo.video_watched ? 'Yes' : 'No'}</div>
          <div>Created Time: {todo.created_at}</div>
          {todo.status === TodoStatus.not_completed && <Button label='Add Video' onClick={toggleCamera} />}
          {todo.status === TodoStatus.completed && (
            <Button label='Play Video' onClick={openPoupVideo(todo.title, todo.video_name)} />
          )}
        </TodoItemContainer>
      </Card>
    </Container>
  );
}
