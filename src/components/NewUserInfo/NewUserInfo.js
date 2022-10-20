import { useState } from "react";
import styles from "./NewUserInfo.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import * as utils from "../../utils";
import Selfie from "../Selfie/Selfie";
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import VerifiedIcon from '@mui/icons-material/Verified';

export default function NewUserInfo() {

  const [show, setShow] = useState(false);
  const [forUpload, setForUpload] = useState([]);
  const [UserDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    pictures: [],
    verified: [],
    age: "",
    phoneNumber: "",
    gender: "",
    genderPreference: "",
    location: "",
    agePreferenceFrom: "",
    agePreferenceTo: "",
    distancePreference: "",
    profileDescription: "",
    zodiacSign: "",
    smoking: "",
    pets: "",
  });

  const [error, setError] = useState("");

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleShowSelfie = ()=> setShow(!show);

  const handleDelete = (picture) => {
    const images = UserDetails.pictures;
    const index = images.findIndex((e) => e.id === picture);
    images.splice(index, 1);
    const imgsUpload = forUpload;
    imgsUpload.splice(index, 1);
    setForUpload(imgsUpload);
    setUserDetails((oldData) => ({
      ...oldData,
      [images]: images,
    }));
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const name = e.target.name;
    const allImgs = [...UserDetails.pictures];

    if (file.type === "image/png" || file.type === "image/jpeg") {
      setError("");

      let id = uuidv4();
      let img = URL.createObjectURL(file);

      if (allImgs.length < 9) {
        const imageUpload = (image, id) => {
          const file = image;
          const copy = forUpload;
          utils.convert(file).then((convertedImg) => {
            copy.push({ img: convertedImg, id: id });
            setForUpload(copy);
          });
        };

        setError("");
        allImgs.push({ img: img, id: id });

        imageUpload(file, id);
        setUserDetails((oldData) => ({
          ...oldData,
          [name]: allImgs,
        }));
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

    setUserDetails((oldData) => ({
      ...oldData,
      [name]: value,
    }));
  };

  return (

    <div className={styles.editProfileContainer}>
      {show&&<Selfie data={UserDetails} save={setUserDetails} show={handleShowSelfie}/>}
      <div className={styles.btnsContainer}>
        <button>Edit</button>
        <button>Preview</button>
        <hr />
      </div>
      <div className={styles.container}>
        <span className={styles.error}>{error}</span>
        <div className={styles.pictureContainer}>
          {UserDetails.pictures.map((picture) => {
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
          {UserDetails.verified[0]&&<VerifiedIcon className={styles.verifiedIcon}/>}
          <CameraAltIcon
                  onClick={handleShowSelfie}
                  color="error"
                  className={styles.btn}
                />
                <img src={UserDetails.verified[0]} alt=""></img>
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
                <label htmlFor="firstName">First Name:</label>
                <input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  required={true}
                  value={UserDetails.firstName}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  required={true}
                  value={UserDetails.lastName}
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
                  value={UserDetails.age}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  id="phoneNumber"
                  type="number"
                  name="phoneNumber"
                  placeholder="Phone"
                  required={true}
                  value={UserDetails.phoneNumber}
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
                value="man"
                checked={UserDetails.gender === "man" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="man_gender">Man</label>
              <input
                id="woman_gender"
                type="radio"
                name="gender"
                value="woman"
                checked={UserDetails.gender === "woman" ? true : false}
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
                value="man"
                checked={UserDetails.genderPreference === "man" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="man_genderPreference">Man</label>
              <input
                id="woman_genderPreference"
                type="radio"
                name="genderPreference"
                value="woman"
                checked={
                  UserDetails.genderPreference === "woman" ? true : false
                }
                onChange={handleChange}
              />
              <label htmlFor="woman_genderPreference">Woman</label>
              <input
                id="both_genderPreference"
                type="radio"
                name="genderPreference"
                value="both"
                checked={UserDetails.genderPreference === "both" ? true : false}
                onChange={handleChange}
              />
              <label htmlFor="both_genderPreference">Both</label>
            </div>
            <label htmlFor="location">Location:</label>
            <input
              id="location"
              type="text"
              name="location"
              value={UserDetails.location}
              placeholder="Location"
              required={true}
              onChange={handleChange}
            />

            <label>Age Preference:</label>
            <div className={styles.distanceContainer}>
              <label htmlFor="agePreferenceFrom">From:</label>
              <input
                id="agePreferenceFrom"
                type="range"
                min="18"
                max="90"
                name="agePreferenceFrom"
                value={UserDetails.agePreferenceFrom}
                required={false}
                onChange={handleChange}
              />

              <label htmlFor="agePreferenceTo">To:</label>
              <input
                id="agePreferenceTo"
                type="range"
                min="19"
                max="90"
                name="agePreferenceTo"
                value={UserDetails.agePreferenceTo}
                required={false}
                onChange={handleChange}
              />
            </div>

            <label htmlFor="distance">Distance preference:</label>
            <input
              id="distance"
              type="range"
              min="2"
              max="200"
              name="distancePreference"
              value={UserDetails.distancePreference}
              required={false}
              onChange={handleChange}
            />
            <label htmlFor="profileDescription">About me:</label>
            <textarea
              id="profileDescription"
              name="profileDescription"
              value={UserDetails.profileDescription}
              required={false}
              onChange={handleChange}
            />

            <div className={styles.selectWrapper}>
              <div>
                <label htmlFor="zodiacSign">Zodiac sign:</label>
                <select
                  id="zodiacSign"
                  name="zodiacSign"
                  value={UserDetails.zodiacSign}
                  required={false}
                  onChange={handleChange}
                >
                  <option value="Aries">Aries</option>
                  <option value="Taurus">Taurus</option>
                  <option value="Gemini">Gemini</option>
                  <option value="Cancer">Cancer</option>
                  <option value="Leo">Leo</option>
                  <option value="Virgo">Virgo</option>
                  <option value="Libra">Libra</option>
                  <option value="Scorpio">Scorpio</option>
                  <option value="Sagittarius">Sagittarius</option>
                  <option value="Capricorn">Capricorn</option>
                  <option value="Aquarius">Aquarius</option>
                  <option value="Pisces">Pisces</option>
                </select>
              </div>

              <div>
                <label htmlFor="smoking">Smoking:</label>
                <select
                  id="smoking"
                  name="smoking"
                  value={UserDetails.smoking}
                  required={false}
                  onChange={handleChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div>
                <label htmlFor="pets">Pets:</label>
                <select
                  id="pets"
                  name="pets"
                  value={UserDetails.pets}
                  required={false}
                  onChange={handleChange}
                >
                  <option value="dogs">Dogs</option>
                  <option value="cats">Cats</option>
                  <option value="others">Others</option>
                </select>
              </div>
            </div>
          </section>
        </form>
        <button onClick={handleSubmit} className={styles.saveBtn}>
          Save
        </button>
      </div>
    </div>
  );
}
