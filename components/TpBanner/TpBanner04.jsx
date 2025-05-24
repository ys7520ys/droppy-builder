// components/TpBanner/TpBanner04.jsx
import React, { useEffect, useRef } from "react";
import styles from "./TpBanner04.module.scss";
import { gsap } from "gsap";

// ✅ ScrollTrigger를 브라우저 환경에서만 등록
if (typeof window !== "undefined") {
  import("gsap/ScrollTrigger").then((mod) => {
    gsap.registerPlugin(mod.ScrollTrigger);
  });
}

const TpBanner04 = ({
  title = "건강한 하루의 시작",
  subTitle = "신선한 재료로 만들어지는 건강한 습관",
  mediaUrl = "/videos/default.mp4",
  mediaType = "video",
  align = "center",
  buttonText = "지금 문의하기",
}) => {
  const sectionRef = useRef(null);

  // ✅ 반응형 클래스 자동 추가
  useEffect(() => {
    const updateResponsiveClass = () => {
      if (!sectionRef.current) return;
      sectionRef.current.classList.remove("is-mobile", "is-tablet", "is-pc");

      const width = window.innerWidth;
      if (width <= 768) {
        sectionRef.current.classList.add("is-mobile");
      } else if (width <= 1200) {
        sectionRef.current.classList.add("is-tablet");
      } else {
        sectionRef.current.classList.add("is-pc");
      }
    };

    updateResponsiveClass();
    window.addEventListener("resize", updateResponsiveClass);
    return () => window.removeEventListener("resize", updateResponsiveClass);
  }, []);

  // ✅ GSAP 애니메이션
  useEffect(() => {
    if (!sectionRef.current || typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      gsap.from(`.${styles.title}`, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.tpBanner04}>
      {mediaType === "video" ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className={styles.tpBanner04__background}
        >
          <source src={mediaUrl} type="video/mp4" />
        </video>
      ) : (
        <div
          className={styles.tpBanner04__background}
          style={{
            backgroundImage: `url(${mediaUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}

      <div className={styles.tpBanner04__text} style={{ textAlign: align }}>
        <h2 className={styles.title}>
          {title.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </h2>
        <p className={styles.subTitle}>
          {subTitle.split("\n").map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
        <button className={styles.btn}>{buttonText}</button>
      </div>
    </section>
  );
};

export default TpBanner04;
