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






// import React from "react";
// import styles from "./TpHeader02.module.scss";

// const TpHeader02 = ({
//   menuItems = [],
//   isPreview = false,
//   currentPageIndex = 0,
//   setCurrentPageIndex = () => {},
// }) => {
//   return (
//     <header className={styles.tpHeader02}>
//       <nav className={styles.tpHeader02__nav}>
//         <ul className={styles.tpHeader02__navLists}>
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <button
//                 className={`${styles.linkButton} ${
//                   currentPageIndex === index ? styles.active : ""
//                 }`}
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












// import React, { useEffect, useState } from "react";
// import styles from "./TpHeader02.module.scss";
// import { db } from "@/lib/firebase";
// import { collection, query, where, getDocs } from "firebase/firestore";

// const TpHeader02 = ({
//   menuItems: defaultMenuItems = [],
//   isPreview = false,
//   currentPageIndex = 0,
//   setCurrentPageIndex = () => {},
// }) => {
//   const [menuItems, setMenuItems] = useState(defaultMenuItems);

//   useEffect(() => {
//     const domain = window.location.hostname; // 예: abc.droppy.kr

//     const getMenu = async () => {
//       try {
//         const q = query(collection(db, "orders"), where("domain", "==", domain));
//         const snap = await getDocs(q);
//         if (!snap.empty) {
//           const data = snap.docs[0].data();
//           setMenuItems(data.menuItems || []);
//         }
//       } catch (error) {
//         console.error("메뉴 데이터를 불러오는 중 오류 발생:", error);
//       }
//     };

//     getMenu();
//   }, []);

//   return (
//     <header className={styles.tpHeader02}>
//       <nav className={styles.tpHeader02__nav}>
//         <ul className={styles.tpHeader02__navLists}>
//           {menuItems.map((item, index) => (
//             <li key={index}>
//               <button
//                 className={`${styles.linkButton} ${
//                   currentPageIndex === index ? styles.active : ""
//                 }`}
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
