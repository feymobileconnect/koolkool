import React, { useState, useEffect } from "react";
// Import database firebase
import { db } from "../firebase";
import {
  collection,
  addDoc,
  doc,
  onSnapshot,
  getDocs,
  where,
  query
} from "firebase/firestore";
import Select from "react-select";
import stopicon from "../assets/icon/icons8-stop.svg";
import correct from "../assets/icon/icons-correct.svg";
import reject from "../assets/icon/icons-reject.svg";
import { useUserAuth } from "./context/UserAuthContext";


function StatusBill() {
  const { user, setUser } = useUserAuth();
  const activityCollection = collection(db, "activity");


  const [data, setData] = useState([]);
  const [status, setStatus] = useState("รอตรวจสอบ");


  useEffect(() => {
    if (user) {
      // ตรวจสอบว่ามีการ login หรือไม่
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const userActivityRef = collection(db, "activity");
      const querySnapshot = await getDocs(
        query(userActivityRef, where("userId", "==", userId))
      );

      const newData = [];

      querySnapshot.forEach((doc) => {
        const activityData = {
          id: doc.id,
          timestamp: doc.data().timestamp,
          selectedShop: doc.data().selectedShop,
          state: doc.data().state,
          imgUrl: doc.data().imgUrl,
        };  

        newData.push(activityData);
      });

      setData(newData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
};


  const goBack = () => {
    window.history.back();
  };
  
  const handleStatus = (selectedOption) => {
    setStatus(selectedOption.value);
    console.log(selectedOption.value);
  };

  return (
    <div className="container  bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center min-w-screen w-full">
      <h1 className="text-xl mt-4">สถานะใบเสร็จ</h1>
      <table className="w-[390px] rounded-xl overflow-hidden mt-4 bg-white">
        <thead>
          <tr>
            <th className="border">วันที่</th>
            <th className="border ">ร้านค้า</th>
            <th className="border  ">จังหวัด</th>
            <th className="border  ">ใบเสร็จ</th>
            <th className="border  ">จำนวนสิทธิ์</th>
            <th className="border  ">สถานะ</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {data.map((item, index) => (
            <tr key={index}>
              <td className="border">{item.timestamp}</td>
              <td className="border">{item.selectedShop}</td>
              <td className="border">{item.state}</td>
              <td className="border">
                <a href={item.imgUrl} >
                  Pic Links
                </a>
              </td>
              <td className="border"></td>
              {/* <td className="border  flex items-center justify-center">
              
                <img
                  src={stopicon}
                  alt="รอตรวจสอบ"
                  width="20px"
                  height="20px"
                  className="pr-2"
                />
                <span>รอตรวจสอบ</span>
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-6 text-sm">
        หมายเหตุ : ใบเสร็จทุกใบ รอการตรวจสอบใบเสร็จภายใน 24 ชั่วโมงของวันถัดไป
      </p>
      <button
        className="bg-black text-white rounded-xl mt-6 p-2"
        onClick={goBack}
      >
        กลับสู่หน้าหลัก
      </button>
    </div>
  );
}

export default StatusBill;
