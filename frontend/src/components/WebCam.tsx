import React, { useEffect, useRef,  useState } from 'react';
import styled from 'styled-components';
import Popup from '../components/Popup';
import Button from '../components/Button';

interface Props {
  open: boolean;
  onSubmit?: (video: Blob) => void;
  onClose?: () => void;
}

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
`;

const VideoButtonsContainer = styled.div`
  left: 40%;
  bottom: 10px;
  position: absolute;
  z-index: 1; 
`;

const Timer = styled.div`
  right: 20px;
  top: 0;
  font-size: 40px;
  bottom: 10px;
  position: absolute;
  z-index: 1; 
`;

const Video = styled.video`
  width: inherit;
`;

const StyledButton = styled(Button)`
  height: 30px;
`;
function WebCam(props: Props) {
  const { open: initialOpenStatus = false, onSubmit, onClose } = props;
  const [ open, setIsOpen ] = useState(initialOpenStatus);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaChunks, setMediaChunks ] = useState<Blob[]>([]);
  const [timer, setTimer] = useState(0);
  const [startTimer, setStartTimer] = useState(false);
  const [videoBlob, setVideoBlob] = useState<Blob | null>(null);
  const video = useRef(null);

  useEffect(() => {
    initUserMedia();
  }, []);

  async function initUserMedia() {
    const constraints = {
      audio: true,
      video: true
    };
    const str = await navigator.mediaDevices.getUserMedia(constraints);
    //@ts-ignore
    video.current.srcObject = str;
    setStream(str);
  }

  useEffect(() => {
    if(startTimer) {
      const interval = setInterval(() => {
        setTimer(seconds => seconds + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [startTimer]);

  function startRecording() {
    if(!stream) return;
    setVideoBlob(null);

    const record = new MediaRecorder(stream);
    record.start(1000);
    setTimer(1);
    setStartTimer(true);
    record.ondataavailable = onRecordingActive;
    setRecorder(record);
    setIsRecording(true);
  }

  const onRecordingActive = ({ data }: BlobEvent) => {
    mediaChunks.push(data);
    setMediaChunks(mediaChunks);
  };

  function stopRecording() {
    if(!recorder) return;
    recorder.stop();
    recorder.ondataavailable = null;

    setIsRecording(false);
    setStartTimer(false);
    setTimer(0);
    const [ chunk]  = mediaChunks;
    const blobProperty: BlobPropertyBag = Object.assign(
      { type: chunk.type },
      (video ? { type: "video/mp4" } : { type: "audio/wav" })
    );
    const blob = new Blob(mediaChunks, blobProperty);
    setVideoBlob(blob);
    setMediaChunks([]);
    setRecorder(null);
  }

  function onPopupClose() {
    if(!stream) return;
    if(typeof onClose === 'function') onClose();
    stream.getTracks().map((track) => track.stop());
    setMediaChunks([])
    setRecorder(null);
    setIsOpen(false);
  }

  function onSubmitVideo() {
    if(typeof onSubmit !== 'function' || !videoBlob) return;
    onSubmit(videoBlob);
  }
  
  return open ? (
    <Popup open={open} title="Webcamera Recording" onClose={onPopupClose}>
        <VideoContainer>
          <Video autoPlay ref={video} muted/>
          <VideoButtonsContainer>
          {!isRecording && (<StyledButton label="Start" onClick={() => {startRecording()}}/>)}
          {isRecording && timer >= 3 && (<StyledButton label="Stop" onClick={() => {stopRecording()}}/>)}
          {!isRecording && videoBlob && (<StyledButton label="Upload" onClick={() => {onSubmitVideo()}}/>)}
          </VideoButtonsContainer>
          <Timer>{timer}</Timer>
        </VideoContainer>
    </Popup>
  ) : null
}

export default WebCam;
