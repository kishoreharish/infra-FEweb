import React from "react";
import styles from "./MyProfile.module.scss";

import ProfileCard from "../ProfileCard/ProfileCard";
import Analytics from "../LeftColumn/Analytics/Analytics";
import CandidateAbout from "../CandidateAbout/CandidateAbout";
import CandidateCertificates from "../CandidateCertificates/CandidateCertificates";
import CandidateEducation from "../CandidateEducation/CandidateEducation";
import CandidateWorkExperience from "../WorkExperience/CandidateWorkExperience";
import CandidateSkills from "../CandidatesSkills/CandidateSkills";
import CandidateReferTest from "../CandidateReferTest/CandidateReferTest";
import CandidateLanguages from "../CandidateLanguages/CandidateLanguages";
import CandidateInterest from "../CandidateInterest/CandidateInterest";

const MyProfile = () => {
  return (
    <div className={styles.myProfile}>
      <ProfileCard />
      <Analytics />
      <CandidateSkills />
      <CandidateCertificates />
      <CandidateEducation />
      <CandidateWorkExperience />
      <CandidateReferTest />
      <CandidateAbout />
      <CandidateLanguages />
      <CandidateInterest />
    </div>
  );
};

export default MyProfile;
