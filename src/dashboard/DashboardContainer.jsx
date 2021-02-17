import React, { useEffect, useState } from "react";
import Dashboard from "../components/Dashboard";
import DefaultLayout from "../components/DefaultLayout";
import firestore from "../firebase";

const DashboardContainer = () => {
  const [dashboard, setDashboard] = useState([]);

  useEffect(() => {
    firestore.collection("doneRecord").onSnapshot((snapshot) => {
      const doneArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDashboard(doneArr);
    });
  }, []);

  console.log(dashboard, dashboard.length);
  return (
    <DefaultLayout>
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
