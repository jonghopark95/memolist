import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Dashboard from "../components/Dashboard";
import DefaultLayout from "../components/DefaultLayout";
import firestore from "../firebase";

const AlertMsg = styled.span`
  position: absolute;
  right: 80px;
  top: 25px;
  width: auto;
  height: 20px;
  font-size: 18px;
`;

const DashboardContainer = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    firestore.collection("doneRecord").onSnapshot((snapshot) => {
      const doneArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const updateArr = doneArr
        .sort((a, b) => {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        .slice(0, 6);
      setDashboard(updateArr);
    });
    return () => firestore.collection("doneRecord").onSnapshot();
  }, []);

  return (
    <DefaultLayout>
      <AlertMsg>
        Dashboard는 모든 유저가 완료한 메모 중 가장 빠른 6개만 보여줍니다.{" "}
      </AlertMsg>
      {dashboard.length !== 0 &&
        dashboard.map(({ id, createdAt, displayName, photoURL, title, bg }) => (
          <Dashboard
            key={id}
            createdAt={createdAt}
            displayName={displayName}
            photoURL={photoURL}
            title={title}
            bg={bg}
          />
        ))}
    </DefaultLayout>
  );
};

export default DashboardContainer;
