import { useEffect, useRef, useState } from "react";
import Modal from 'react-bootstrap/Modal';
import styles from './Selfie.module.css';
import { useDispatch } from "react-redux";
import { temporaryData } from "../../store/ActiveUserSlice";

export default function Selfie(props) {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [sessionId, setSessionId] = useState("");
  const [loader, setLoader] = useState(false);
  const dispatch = useDispatch();

  const savePhoto = () => {
    setSessionId(sessionId.getTracks()[0].stop())
    let copy = [];
    let selfie = photoRef.current.toDataURL();
    copy.splice(0, 1, selfie);
    dispatch(temporaryData(["verified", copy]));
    setLoader(true);
    setTimeout(() => {
      props.show()
      setLoader(false)
    }, 2000);

  };

  const takePhoto = () => {

    let photo = photoRef.current;
    let video = videoRef.current;

    photo.width = 150;
    photo.height = 150;

    let ctx = photo.getContext("2d");

    ctx.drawImage(video, 0, 0, photo.width, photo.height);
    
  };

  const getUserCamera = () => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        setSessionId(stream);
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUserCamera();
  }, []);

  return (
    <>
      <Modal dialogClassName={styles.customDialog} show={()=>props.show()} onHide={()=>{
        setSessionId(sessionId.getTracks()[0].stop())
        props.show();
      }} animation={false}>
              <Modal.Header closeButton>
                <Modal.Title>{loader ? "Saving selfie..." : "Take a selfie and get verified!"}</Modal.Title>
              </Modal.Header>
              {loader ? 
            <div className={styles.loaderWrapper}>
              <div className="spinner-border text-danger"  role="status"></div>
            </div>
            :
            <div className={styles.picturesWrapper}>
            <div>
                <video className={styles.videoStream} ref={videoRef}></video>
                <button onClick={takePhoto}>Shot</button>
            </div>
          <div>
            <canvas className={styles.canvas} ref={photoRef}></canvas>
            <div className={styles.controllerBtns}>
                <button onClick={savePhoto}>Save</button>
            </div>
          </div>
            </div>}
      </Modal>
    </>
  );
}
