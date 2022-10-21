import { useState } from "react";
import styles from "./NewUserInfo.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import * as utils from "../../utils";
import Selfie from "../Selfie/Selfie";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedIcon from '@mui/icons-material/Verified';
import notVerified from "../../images/notVerified.png";
import { useSelector, useDispatch } from "react-redux";
import { temporaryData, changeUserData } from "../../store/ActiveUserSlice";
import { AgeSliderComponent, DistanceSliderComponent } from "../SliderComponent/SliderComponent";
import Select from "./Select";
import {PETS, SMOKING, zodiacSigns, PASSIONS} from "../../consts";
import UserProperties from "./Accordion";


export default function NewUserInfo() {

  const user = useSelector(state => state.activeUser);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserData());
  };

  const handleShowSelfie = ()=> setShow(!show);

  const handleDelete = (picture) => {
    let images = [...user.pictures];
    const index = images.findIndex((e) => e.id === picture);
    images.splice(index, 1);
    dispatch(temporaryData(["pictures", images]));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    let allImgs = [...user.pictures];

    if (file.type === "image/png" || file.type === "image/jpeg") {
      setError("");
      let id = uuidv4();

      if (allImgs.length < 8) {
        const imageUpload = (image, id) => {
          const file = image;
          utils.convert(file).then((convertedImg) => {
            allImgs.push({ img: convertedImg, id: id });
            dispatch(temporaryData([name, allImgs]));
          });
        };

        setError("");
        imageUpload(file, id);

      } else {
        setError("You can upload only 9 pictures!");
      }
    } else {
      setError("File is not supported!");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    dispatch(temporaryData([name, value]))
  };

  return (

    <div className={styles.editProfileContainer}>
      {show&&<Selfie show={handleShowSelfie}/>}
      <div className={styles.btnsContainer}>
        <button>Edit</button>
        <button>Preview</button>
        <hr />
      </div>
      <div className={styles.container}>
        <span className={styles.error}>{error}</span>
        <div className={styles.pictureContainer}>
          {user.pictures&&user.pictures.map((picture) => {
            return (
              <div key={uuidv4()} id={uuidv4()} className={styles.imgWrapper}>
                <DeleteIcon
                  onClick={() => handleDelete(picture.id)}
                  color="error"
                  className={styles.btn}
                />
                <img src={picture.img} alt="logo"></img>
              </div>
            );
          })}
          <div className={styles.imgWrapper}>
          {user.verified&&user.verified[0] ? <VerifiedIcon className={styles.verifiedIcon}/> : <></>}
          <CameraAltIcon
                  onClick={handleShowSelfie}
                  color="error"
                  className={styles.btn}
                />
                {user.verified&&user.verified[0] ? <img src={user.verified[0]} alt=""></img> : <img src={notVerified} alt="notVerified"></img>}
          </div>
        </div>
        <p>
          Add a video, pic, or Loop to get 4% closer to completing your profile
          and you may even get more Likes.
        </p>
        <div>
          <label className={styles.addMedia} htmlFor="addMedia">
            Add Media
            <input
              type="file"
              id="addMedia"
              name="pictures"
              onChange={handleUpload}
              accept="image/png, image/jpeg"
            />
          </label>
        </div>
        <form onSubmit={handleSubmit}>
          <section>
            <div className={styles.namesWrapper}>
              <div>
                <label htmlFor="username">Names:</label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Names"
                  required={true}
                  value={user.username}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="email">Email:</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="email"
                  disabled={true}
                  required={false}
                  value={user.email}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className={styles.agesAndPhoneWrapper}>
              <div>
                <label htmlFor="age">Age:</label>
                <input
                  id="lastNageame"
                  type="number"
                  name="age"
                  placeholder="Age"
                  required={true}
                  value={user.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="number"
                  name="phone"
                  placeholder="Phone"
                  required={true}
                  value={user.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            <label>Gender:</label>
            <div className={styles.radioWrapper}>
              <input
                id="man_gender"
                type="radio"
                name="gender"
                value={"man"}
                checked={user.gender === "man" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="man_gender">Man</label>
              <input
                id="woman_gender"
                type="radio"
                name="gender"
                value={"woman"}
                checked={user.gender === "woman" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="woman_gender">Woman</label>
            </div>

            <label>I have interests in:</label>
            <div className={styles.radioWrapper}>
              <input
                id="man_genderPreference"
                type="radio"
                name="genderPreference"
                value={"man"}
                checked={user.genderPreference === "man" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="man_genderPreference">Man</label>
              <input
                id="woman_genderPreference"
                type="radio"
                name="genderPreference"
                value={"woman"}
                checked={
                  user.genderPreference === "woman" ? true : false
                }
                onChange={handleChange}
              />
              <label htmlFor="woman_genderPreference">Woman</label>
              <input
                id="both_genderPreference"
                type="radio"
                name="genderPreference"
                value={"both"}
                checked={user.genderPreference === "both" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="both_genderPreference">Both</label>
            </div>
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              name="location"
              value={user.location}
              placeholder="Location"
              required={true}
              onChange={handleChange}
            />

            <label>Age Preference:</label>
                <div className={styles.slider}>
                <AgeSliderComponent />
                </div>
            
            <label htmlFor="distance">Distance preference:</label>

            <div className={styles.slider}><DistanceSliderComponent/></div>

            <label htmlFor="profileDescription">About me:</label>
            <textarea
              id="profileDescription"
              name="description"
              value={user.description}
              required={true}
              onChange={handleChange}
            />
            <UserProperties label={"Passions"} data={PASSIONS} name={"passions"} property={user.passions}/>
            <div className={styles.selectWrapper}>
              <div>
                <label htmlFor="zodiacSign">Zodiac sign:</label>
                <Select 
                id={"zodiacSign"}
                name={"zodiacSign"}
                value={user.zodiacSign}
                required={false}
                function={handleChange}
                data={zodiacSigns}
                />
              </div>

              <div>
                <label htmlFor="smoking">Smoking:</label>
                <Select
                id={"smoking"}
                name={"smoking"}
                value={user.smoking}
                required={false}
                function={handleChange}
                data={SMOKING}
                />
              </div>

              <div>
                <label htmlFor="pets">Pet:</label>
                <Select
                id={"pet"}
                name={"pet"}
                value={user.pet}
                required={false}
                function={handleChange}
                data={PETS}
                />
              </div>
            </div>
          </section>
          <button type="submit" className={styles.saveBtn}>
          Save
        </button>
        </form>
      </div>
    </div>
  );
}
