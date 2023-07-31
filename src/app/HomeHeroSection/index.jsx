'use client'
import { React, useState, useEffect } from 'react'
import styles from './style.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'

const HomeHeroSection = () => {
  const [fontSize, setFontSize] = useState(15);
  const [isGrowing, setIsGrowing] = useState(true);
  const [opacityAmount, setOpacityAmount] = useState(0);
  const resultingFontSize = 700;
  const router = useRouter();

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (fontSize < resultingFontSize) {
        setFontSize(prevFontSize => prevFontSize + 20);
      }
      else {
        setIsGrowing(false);
      }
    }, 100);
    return () => clearInterval(intervalId);
  }, [fontSize, resultingFontSize])
  if (!isGrowing) {
    setTimeout(() => {
      setOpacityAmount(1);
    }, [100])
  }

  // const handleClick = () => {
  //   setTimeout(() => {
  //     router.push('/login')
  //   }, [1000])
  // }

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [cursorVariant, setCursorVariant] = useState("default");


  useEffect(() => {
    const mouseMove = e => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      })
    }

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    }
  }, []);

  const variants = {
    default: {
      height: 20,
      width: 20,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
    },
    text: {
      height: 60,
      width: 60,
      x: mousePosition.x - 45,
      y: mousePosition.y - 45,
      backgroundColor: "pink",
      mixBlendMode: "difference"
    }
  }

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");

  return (
    <div className={styles.heroSection}>
      {
        isGrowing ? (
          <div className={styles.start}>
            <p className={styles.name}>L</p>
            <div className={styles.bigo} style={{ fontSize: `${fontSize}rem` }} >O</div>
            <p className={styles.name}>FICO</p>
          </div >
        ) : (
          <div className={styles.content} style={{ opacity: `${opacityAmount}` }}>
            <motion.div
              className={styles.cursor1}
              variants={variants}
              animate={cursorVariant}
            />
            <p className={styles.intro} >
              <p className={styles.para} onMouseEnter={textEnter} onMouseLeave={textLeave}>
                Welcome to <span style={{ color: `white` }}>LofiCo</span>, your ultimate destination for a unique lofi experience! Discover a haven where music, friendship, and fun blend seamlessly to create unforgettable moments at LofiCo.
              </p>
              <div className={styles.boxes}>
                <div className={styles.box1}>

                </div>
                <div className={styles.box2}>

                </div>
                <div className={styles.box3}>

                </div>
                <div className={styles.box4}>

                </div>
              </div>
            </p>
          </div>
        )
      }
    </div>
  )
}

export default HomeHeroSection
