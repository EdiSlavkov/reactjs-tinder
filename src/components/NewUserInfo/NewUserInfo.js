import { useEffect, useState } from "react";
import styles from "./NewUserInfo.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuidv4 } from "uuid";
import * as utils from "../../utils";
import Selfie from "../Selfie/Selfie";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import VerifiedIcon from "@mui/icons-material/Verified";
import notVerified from "../../images/notVerified.png";
import { useSelector, useDispatch } from "react-redux";
import { temporaryData, changeUserData } from "../../store/ActiveUserSlice";
import {
  AgeSliderComponent,
  DistanceSliderComponent,
} from "../SliderComponent/SliderComponent";
import { PETS, SMOKING, zodiacSigns, PASSIONS } from "../../consts";
import UserProperties from "./Accordion";
import DetailedActiveUserCard from "../DetailedActiveUserCard/DetailedActiveUserCard";
import { validateLength } from "../../utils";
import LoadingBtn from "./LoadingBtn";
import { hide, reveal } from "../../store/DetailedInfoSlice";

export default function NewUserInfo(props) {
  const user = useSelector((state) => state.activeUser);
  const detailedInfo = useSelector((state) => state.detailedInfo);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showEdit, setShowEdit] = useState(true);

  useEffect(() => {
    dispatch(hide());
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(changeUserData());
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 1500);
  };

  const handleShowSelfie = () => setShow(!show);

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
        setError("You can upload only 8 pictures and 1 validation selfie!");
      }
    } else {
      setError("File is not supported!");
    }
  };

  const handleChange = (e) => {
    let target = e.currentTarget;
    const value = e.target.value.trimStart();
    const name = e.target.name;
    const firstLetterUp = value.charAt(0).toUpperCase().concat(value.slice(1));

    if (name !== "age" && name !== "phone" && name !== "description") {
      const allowed = /^[A-Za-z\s]*$/;
      if (allowed.test(firstLetterUp)) {
        if (name === "username") {
          if (value.trim().length < 3) {
            target.style.background = "#ff0000b8";
          } else {
            target.style.background = "";
          }
        }
        dispatch(temporaryData([name, firstLetterUp]));
      }
    } else {
      if (name === "phone") {
        if (validateLength(value, 10)) {
          dispatch(temporaryData([name, value]));
          if (value.length < 10 || value[0] !== "0" || value[1] !== "8") {
            target.style.background = "#ff0000b8";
          } else {
            target.style.background = "";
          }
        }
      } else if (name === "age") {
        if (validateLength(value, 2)) {
          dispatch(temporaryData([name, value]));
          if (value.length < 2 || value < "18") {
            target.style.background = "#ff0000b8";
          } else {
            target.style.background = "";
          }
        }
      } else {
        typeof value === "string"
          ? dispatch(temporaryData([name, firstLetterUp]))
          : dispatch(temporaryData([name, value]));
      }
    }
  };

  return (
    
    <div
      className={
        detailedInfo
          ? styles.editProfileContainerSmall
          : styles.editProfileContainer
      }
    >
      {show && <Selfie show={handleShowSelfie} />}
      <div className={styles.btnsContainer}>
        <button
          className={showEdit ? styles.active : ""}
          onClick={() =>
            {
              setShowEdit(true);
              setShowPreview(false);
            }
          }
        >
          Edit
        </button>
        <button
          className={showPreview ? styles.active : ""}
          onClick={() =>
            {
              setShowPreview(true)
              setShowEdit(false)
              dispatch(reveal())
            }
          }
        >
          Preview
        </button>
        <hr />
      </div>
      <div className={styles.container}>
        {showEdit ? (
          <>
            <span className={styles.error}>{error}</span>
            <div className={styles.pictureContainer}>
              {user.pictures &&
                user.pictures.map((picture) => {
                  return (
                    <div
                      key={uuidv4()}
                      id={uuidv4()}
                      className={styles.imgWrapper}
                    >
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
                {user.verified && user.verified[0] ? (
                  <VerifiedIcon className={styles.verifiedIcon} />
                ) : (
                  <></>
                )}
                <CameraAltIcon
                  onClick={handleShowSelfie}
                  color="error"
                  className={styles.btn}
                />
                {user.verified && user.verified[0] ? (
                  <img src={user.verified[0]} alt=""></img>
                ) : (
                  <img src={notVerified} alt="notVerified"></img>
                )}
              </div>
            </div>
            <p>
              Add a pic to get <span style={{color:"red", fontSize:"12px"}}>10%</span> closer to completing your
              profile and you may even get more Likes.
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
                  <div className={styles.inputWrapper}>
                    <span style={user.username ? {display:"none"} : {display:"inline"}} className={styles.bonus}>+10%</span>
                    <label htmlFor="username">Names:</label>
                    <input
                      id="username"
                      max="2"
                      maxLength={15}
                      type="text"
                      name="username"
                      placeholder="Up to 15 letters!"
                      required={true}
                      value={user.username}
                      onChange={handleChange}
                    />
                    <span className={styles.required}>
                      *Required! Need 3 letters!
                    </span>
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
                  <div className={styles.inputWrapper}>
                  <span style={user.age ? {display:"none"} : {display:"inline"}} className={styles.bonus}>+10%</span>
                    <label htmlFor="age">Age:</label>
                    <input
                      id="age"
                      pattern="^[0-9]*$"
                      type="number"
                      name="age"
                      placeholder="Age"
                      required={true}
                      value={user.age}
                      onChange={handleChange}
                    />
                    <span className={styles.required}>
                      *Required! 18 years minimum!
                    </span>
                  </div>
                  <div className={styles.inputWrapper}>
                  <span style={user.phone ? {display:"none"} : {display:"inline"}}  className={styles.bonus}>+10%</span>
                    <label htmlFor="phoneNumber">Phone:</label>
                    <input
                      id="phoneNumber"
                      pattern="^[0-9]*$"
                      type="number"
                      name="phone"
                      placeholder="Up to 10 digits!"
                      required={true}
                      value={user.phone}
                      onChange={handleChange}
                    />
                    <span className={styles.required}>
                      *Required! Need 10 digits! Starting with 08 e.g:0881122332
                    </span>
                  </div>
                </div>

                <label style={{position:"relative"}}><span style={user.gender ? {display:"none"} : {display:"inline"}}  className={styles.bonusGender}>+10%</span>
                 Gender:</label>
                
                <div className={styles.radioWrapper}>
                  <input
                    id="man_gender"
                    type="radio"
                    name="gender"
                    value={"Man"}
                    checked={user.gender === "Man" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="man_gender">Man</label>
                  <input
                    id="woman_gender"
                    type="radio"
                    name="gender"
                    value={"Woman"}
                    checked={user.gender === "Woman" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="woman_gender">Woman</label>
                </div>

                <label>I have interests in:</label>
                <div className={styles.radioWrapper}>
                  <input
                    id="men_genderPreference"
                    type="radio"
                    name="genderPreference"
                    value={"Men"}
                    checked={user.genderPreference === "Men" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="men_genderPreference">Men</label>
                  <input
                    id="women_genderPreference"
                    type="radio"
                    name="genderPreference"
                    value={"Women"}
                    checked={user.genderPreference === "Women" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="women_genderPreference">Women</label>
                  <input
                    id="both_genderPreference"
                    type="radio"
                    name="genderPreference"
                    value={"Both"}
                    checked={user.genderPreference === "Both" ? true : false}
                    onChange={handleChange}
                  />
                  <label htmlFor="both_genderPreference">Both</label>
                </div>
                <label htmlFor="location">Location:</label>
                <input
                  maxLength={15}
                  id="location"
                  type="text"
                  name="location"
                  value={user.location}
                  placeholder="Up to 15 letters!"
                  required={false}
                  onChange={handleChange}
                />

                <label>Age Preference:</label>
                <span>{`${user.agePreference[0]} - ${user.agePreference[1]} years`}</span>
                <div className={styles.slider}>
                  <AgeSliderComponent />
                </div>

                <label htmlFor="distance">Distance preference:</label>
                <span>{`${user.distancePreference} km`}</span>
                <div className={styles.slider}>
                  <DistanceSliderComponent />
                </div>
              
                <label style={{position:"relative"}} htmlFor="profileDescription">
                <span style={user.description ? {display:"none"} : {display:"inline"}}  className={styles.bonusGender}>+10%</span>
                  About me:</label>
                <textarea
                  id="profileDescription"
                  maxLength={100}
                  name="description"
                  placeholder="Up to 100 symbols!"
                  value={user.description}
                  required={false}
                  onChange={handleChange}
                />
                <div className={styles.accordionWrapper}>
                  <UserProperties
                    label={"Passions:"}
                    data={PASSIONS}
                    name={"passions"}
                    property={user.passions}
                  />
                  {user.passions.length > 0 && (
                    <div className={styles.passionsWrapper}>
                      {user.passions.map(
                        (passion, i) =>
                          i < 5 && (
                            <span key={i}>
                              {i < 1 ? null : ","}
                              {passion}
                            </span>
                          )
                      )}
                    </div>
                  )}
                </div>
                <div className={styles.accordionWrapper}>
                  <UserProperties
                    onlyOne={true}
                    label={"Smoking:"}
                    data={SMOKING}
                    name={"smoking"}
                    property={user.smoking}
                  />
                  {user.smoking && (
                    <div className={styles.passionsWrapper}>
                      {<span>{user.smoking}</span>}
                    </div>
                  )}
                </div>
                <div className={styles.accordionWrapper}>
                  <UserProperties
                    onlyOne={true}
                    label={"Zodiac sign:"}
                    data={zodiacSigns}
                    name={"zodiacSign"}
                    property={user.zodiacSign}
                  />
                  {user.zodiacSign && (
                    <div className={styles.passionsWrapper}>
                      {<span>{user.zodiacSign}</span>}
                    </div>
                  )}
                </div>
                <div className={styles.accordionWrapper}>
                  <UserProperties
                  bonus={<span style={user.pet ? {display:"none"} : {display:"inline"}}  className={styles.bonus}>+10%</span>}
                    onlyOne={true}
                    label={"Pet:"}
                    data={PETS}
                    name={"pet"}
                    property={user.pet}
                  />
                  {user.pet && (
                    <div className={styles.passionsWrapper}>
                      {<span>{user.pet}</span>}
                    </div>
                  )}
                </div>
                <div className={styles.jobWrapper}>
                  <div>
                    <label htmlFor="job">Job:</label>
                    <input
                      id="job"
                      maxLength={15}
                      type="text"
                      name="job"
                      value={user.job}
                      placeholder="Up to 15 letters!"
                      required={false}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="school">School:</label>
                    <input
                      id="school"
                      maxLength={15}
                      type="text"
                      name="school"
                      value={user.school}
                      placeholder="Up to 15 letters!"
                      required={false}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className={styles.companyWrapper}>
                  <label htmlFor="company">Company:</label>
                  <input
                    id="company"
                    type="text"
                    maxLength={15}
                    name="company"
                    value={user.company}
                    placeholder="Up to 15 letters!"
                    required={false}
                    onChange={handleChange}
                  />
                </div>
              </section>
              {saving ? (
                <LoadingBtn />
              ) : (
                <button
                  disabled={utils.validateRequirements(user)}
                  id="saveBtn"
                  type="submit"
                  onClick={()=>props.showErr(true)}
                  className={
                    utils.validateRequirements(user)
                      ? styles.saveBtnDisabled
                      : styles.saveBtn
                  }
                >
                  Save
                </button>
              )}
            </form>
          </>
        ) : (
          <DetailedActiveUserCard user={user} />
        )}
      </div>
    </div>
  );
}
