import { useEffect, useRef } from "react";
import Modal from 'react-bootstrap/Modal';
import styles from './Selfie.module.css';

export default function Selfie(props) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);

  const savePhoto = () => {
    let copy = props.data;
    let selfie = document.getElementById("canvas").toDataURL();
    copy.verified.splice(0, 1, selfie);
    props.save(copy);
  };

  const takePhoto = () => {

    let width = 150;
    let height = 150;

    let photo = photoRef.current;

    let video = videoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, photo.width, photo.height);
    
  };

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserCamera();
  }, [videoRef]);

  return (
    <>

<Modal show={()=>props.show()} onHide={()=>props.show()} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Take a selfie and get verified!</Modal.Title>
        </Modal.Header>
        <div className={styles.picturesWrapper}>
        <div>
            <video className={styles.videoStream} ref={videoRef}></video>
            <button onClick={takePhoto}>Shot</button>
        </div>
       <div>
        <canvas className={styles.canvas} id="canvas" ref={photoRef}></canvas>
        <div className={styles.controllerBtns}>
            <button onClick={savePhoto}>Save</button>
        </div>
       </div>
        </div>
      </Modal>

    </>
  );
}
