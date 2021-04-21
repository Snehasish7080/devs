import React from "react";
import styles from "./LandingPage.module.scss";
import Layout from "../../molecules/Layout/Layout";
import Tilt from "react-parallax-tilt";
import imgBg from "../../assets/images/background.jpg";
import imgBg2 from "../../assets/images/background2.jpg";
import imgBg3 from "../../assets/images/background3.jpg";
import imgBg4 from "../../assets/images/background4.jpg";
import imgBg5 from "../../assets/images/background5.jpg";

const images = [
  {
    image: imgBg,
  },
  {
    image: imgBg2,
  },
  {
    image: imgBg3,
  },
  {
    image: imgBg4,
  },
];
const text = [
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    in reprehenderit`,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut`,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    `,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    in reprehenderit`,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
   t`,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    `,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    `,
  },
  {
    detail: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
    in reprehenderit`,
  },
];

function LandingPage() {
  return (
    <Layout className={styles.landingPageLayout}>
      <div className={styles.landingPageContainer}>
        <div className={styles.firstContainer}>
          <h5>About Devs</h5>
        </div>
        <div className={styles.secondContainer}>
          <h5>Lorem ipsum dolor</h5>
          <div className={styles.midGridContainer}>
            {text.slice(0, 3).map((item, index) => {
              return (
                <div className={styles.info} key={index}>
                  <span>{item.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.thirdContainer}>
          <h5>Lorem ipsum dolor</h5>
          <div className={styles.midGridContainer}>
            {text.map((item, index) => {
              return (
                <div className={styles.detailInfo} key={index}>
                  <span>{item.detail}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.fourthContainer}>
          <h5>Lorem ipsum dolor</h5>
          <div className={styles.midGridContainer}>
            {images.map((item, index) => {
              return (
                <div
                  className={styles.imageInfo}
                  key={index}
                  style={{
                    backgroundImage: `url(${item.image})`,
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default LandingPage;
