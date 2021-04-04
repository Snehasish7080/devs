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
    id: 0,
    img: imgBg2,
  },
  {
    id: 1,
    img: imgBg,
  },
  {
    id: 2,
    img: imgBg3,
  },
  {
    id: 3,
    img: imgBg4,
  },
  {
    id: 4,
    img: imgBg5,
  },
];

function LandingPage() {
  return (
    <Layout>
      <div className={styles.gridContainer}>
        {images.map((item, index) => {
          return (
            <Tilt
              className={`${styles.tilt} ${index === 0 && styles.takeArea} ${
                index === 2 && styles.takeAreaLast
              }`}
              tiltMaxAngleX={10}
              tiltMaxAngleY={5}
              key={item.id}
            >
              <div
                className={styles.landingCard}
                style={{
                  background: `url(${item.img})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                }}
              >
                <h4>Devs</h4>
              </div>
            </Tilt>
          );
        })}
      </div>
    </Layout>
  );
}

export default LandingPage;
