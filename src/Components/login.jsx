import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import Swal from "sweetalert2";
import { useNavigate, Link } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext"; // Import the context hook
import { Input } from "antd";


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const { setAuth, setSessionInLocalStorage } = useUserAuth();
  const navigate = useNavigate();
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [phoneNumberErrorMessage, setPhoneNumberErrorMessage] = useState("");


  // เช็ค useContext
  // console.log("setAuth function:", setAuth);

  const handlePhoneNumberInput = (e) => {
    const inputPhoneNumber = e.target.value;
    if (inputPhoneNumber.length > 10) {
      setIsPhoneNumberValid(false);
      setPhoneNumberErrorMessage("*กรุณาป้อนเบอร์โทรศัพท์ของคุณให้ถูกต้อง");
    } else {
      setIsPhoneNumberValid(true);
      setPhoneNumberErrorMessage("");
    }
  };


  const handleLogin = async () => {
    try {
      if (!phoneNumber) {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "โปรดป้อนเบอร์โทรศัพท์ของคุณ",
        });
        return;
      }
  
      // check phone firebase
      const usersRef = collection(db, "users");
      const querySnapshot = await getDocs(
        query(usersRef, where("phone", "==", phoneNumber))
      );
  
      if (querySnapshot.empty) {
        Swal.fire({
          icon: "error",
          title: "เข้าสู่ระบบไม่สำเร็จ",
          text: "โปรดป้อนข้อมูลให้ถูกต้อง หรือลงทะเบียนก่อน",
          timer: 3000,
        });
        setTimeout(() => {
          navigate("/register");
        }, 3000);
      } else {
        const userData = querySnapshot.docs[0].data();
        console.log("userData:", userData); // ตรวจสอบว่า userData มีค่า userId หรือไม่

        // *edit
        setAuth({ user: userData, token: userData.token });
  
        // ตั้งค่า userId ใน localStorage
        localStorage.setItem('userId', userData.userId);
  
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Login Success",
          showConfirmButton: false,
          timer: 3000,
        });

        setTimeout(() => {
          navigate("/luckydraw");
        }, 3000);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  

  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center  w-full">
      <div
        id="content"
        className="mx-auto ms-auto flex flex-col justify-center mt-6 "
      >
        <div className="my-10 w-full flex flex-col items-center">
          <p className="text-xl ">ลูกค้าที่เคยลงทะเบียนแล้ว</p>
          <p className="pb-4 text-xl">กรุณาใส่เบอร์โทรศัพท์</p>

          <input
            type="number"
            placeholder="กรุณาป้อนเบอร์โทรศัพท์ของคุณ..."
            className="border-2 rounded-lg w-[300px] p-2 mt-12"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            onInput={handlePhoneNumberInput}
            /* onBlur={handlePhoneNumberBlur} */
            maxLength="10"
            pattern="[0-9]*"
          />
          {!isPhoneNumberValid && (
            <p className="text-red-500">{phoneNumberErrorMessage}</p>
          )}
          <button
            className="bg-slate-950  p-2 rounded-lg text-white  w-[100px] mt-8"
            onClick={handleLogin}
          >
            ตกลง
          </button>
        </div>

        <div className="mb-10 flex flex-col items-center mt-10">
          <p className="text-xl text-slate-600">
            สำหรับลูกค้าใหม่ที่ไม่เคยลงทะเบียน
          </p>
          <p className="mb-8 text-xl text-slate-600">กรุณาคลิกปุ่มลงทะเบียน</p>
          <button className="bg-slate-950  p-2 rounded-lg text-white w-[100px]">
            <Link to="/register">ลงทะเบียน</Link>
          </button>
        </div>

        <p className="text-lg mt-10 text-slate-700">
          ติดต่อ Call Center : 095-409-8045
        </p>
      </div>
    </div>
  );
};

export default Login;
