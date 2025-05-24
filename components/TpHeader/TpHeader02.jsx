// import React from "react";
// import styles from "./TpHeader02.module.scss";

// const TpHeader02 = ({
//   menuItems = [],
//   isPreview = false,
//   currentPageIndex = 0,
//   setCurrentPageIndex = () => {}
// }) => {
//   return (
//     <header className={styles.tpHeader02}>
//       <nav className={styles.tpHeader02__nav}>
//         <ul className={styles.tpHeader02__navLists}>
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <button
//                 className={`${styles.linkButton} ${currentPageIndex === index ? styles.active : ""}`}
//                 onClick={() => setCurrentPageIndex(index)}
//               >
//                 {item.label}
//               </button>
//             </li>
//           ))}
//         </ul>
//       </nav>
//     </header>
//   );
// };

// export default TpHeader02;






import React from "react";
import styles from "./TpHeader02.module.scss";

const TpHeader02 = ({
  menuItems = [],
  isPreview = false,
  currentPageIndex = 0,
  setCurrentPageIndex = () => {},
}) => {
  return (
    <header className={styles.tpHeader02}>
      <nav className={styles.tpHeader02__nav}>
        <ul className={styles.tpHeader02__navLists}>
          {menuItems.map((item, index) => (
            <li key={index}>
              <button
                className={`${styles.linkButton} ${
                  currentPageIndex === index ? styles.active : ""
                }`}
                onClick={() => setCurrentPageIndex(index)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default TpHeader02;
