import React, { useState, useEffect } from "react";
import { FaCamera } from "react-icons/fa";
import { residences, shopName } from "./GetData/MockData";
import { db } from "../firebase";
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import SaveActivity from "./Modal/saveActivity";
import { imageDb } from "../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "./context/UserAuthContext";
import { Cascader, Form, Select, message } from "antd";
import Swal from "sweetalert2";

function Activity() {
  const { user, setUser } = useUserAuth();
  const navigate = useNavigate();
  const [selectedShop, setSelectedShop] = useState("");
  const [textValue, setTextValue] = useState("");
  const [region, setRegion] = useState("ภูมิภาค");
  const [state, setState] = useState("");
  /* const [stateOptions, setStateOptions] = useState([]); */
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const [fileName, setFileName] = useState("");

  const [modalData, setModalData] = useState({
    textValue: "",
    selectedShop: "",
    region: "",
    state: "",
    imgUrl: "",
  });
  const [file, setFile] = useState();

  console.log("User:", user);

  // timestamp
  const currentDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, "0"); // ให้วันที่มีรูปแบบ 01, 02, 03 แทนที่จะเป็น 1, 2, 3
    const month = (now.getMonth() + 1).toString().padStart(2, "0"); // เพิ่ม 1 เนื่องจาก getMonth เริ่มต้นที่ 0 (0 = มกราคม)
    const year = now.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const currentTime = () => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectShop = (value) => {
    setSelectedShop(value);
  };

  const handleTextareaChange = (e) => {
    setTextValue(e.target.value);
  };

  const handleImg = (e) => {
    const imageFile = e.target.files[0];

    if (!imageFile) {
      setError("กรุณาอัพโหลดใบเสร็จ");
    } else {
      const maxSize = 5 * 1024 * 1024; // 5 MB ในหน่วยไบต์
      if (imageFile.size > maxSize) {
        setError("ขนาดไฟล์ของภาพต้องไม่เกิน 5 MB");
        message.error("ขนาดไฟล์ของภาพต้องไม่เกิน 5 MB");
      } else {
        setFile(imageFile);
        setFileName(imageFile.name); // ตั้งชื่อไฟล์
        setError(null);
        message.success("ไฟล์ถูกอัปโหลดเรียบร้อยแล้ว");
      }
    }
  };

  const handleSave = () => {
    // เปิด Modal และตั้งค่าข้อมูลที่ใช้แสดงใน Modal
    if (!textValue || !selectedShop || !file) {
      Swal.fire({
        icon: "error",
        title: "ข้อมูลไม่ถูกต้อง",
        text: "กรุณากรอกข้อมูลให้ครบถ้วนและอัปโหลดไฟล์",
      });
      return;
    }
    openModal();

    const activityData = {
      textValue,
      selectedShop,
      region,
      state,
      imgUrl: file,
    };

    // ตั้งค่าข้อมูลที่ใช้แสดงใน Modal
    setModalData(activityData);
  };

  // upload img FireStorage
  const uploadImageToStorage = async (imageFile) => {
    const fileRef = ref(imageDb, `images/${v4()}`);

    const metadata = {
      contentType: imageFile.type,
    };

    await uploadBytes(fileRef, imageFile, metadata);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  };

  // บันทึกข้อมูลลงใน Firebase
  const handleAccept = async () => {
    if (!file || !user) {
      console.error("File or user is undefined");
      return;
    }

    try {
      const imgUrl = await uploadImageToStorage(file);
      const timestamp = currentDate();
      const time = currentTime();

      // ดึง userId จาก localStorage
      const userId = localStorage.getItem("session");

      if (!userId) {
        console.error("userId is undefined");
        return;
      }

      // เพิ่มข้อมูลกิจกรรมลงในคอลเล็กชัน 'activity'
      const docRef = await addDoc(collection(db, "activity"), {
        userId: userId,
        textValue,
        selectedShop,
        region,
        state,
        imgUrl,
        timestamp,
        time,
      });

      console.log("Document written with ID:", docRef.id);

      // อัปเดตข้อมูลผู้ใช้ใน Firestore
      const userDocRef = doc(db, "users", userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // อัปเดตข้อมูลผู้ใช้ด้วยข้อมูลกิจกรรมใหม่
        const updatedUserData = {
          ...userData,
          textValue,
          selectedShop,
          region,
          state,
          imgUrl,
          timestamp,
          time,
        };

        // บันทึกข้อมูลผู้ใช้ที่ถูกอัปเดตกลับไปที่ Firestore
        await setDoc(userDocRef, updatedUserData);
      }

      closeModal();

      Swal.fire({
        icon: "success",
        title: "บันทึกข้อมูลสำเร็จ",
        text: "ข้อมูลของคุณถูกบันทึกเรียบร้อยแล้ว",
      }).then(() => {
        navigate("/activitySuccess");
      });
    } catch (error) {
      console.error("Error during data submission:", error);
      // จัดการข้อผิดพลาดตามที่คุณต้องการ
    }
  };

  const handleChangeCascader = (value) => {
    if (value.length > 0) {
      setRegion(value[0]); // ตั้งค่า region จากตำแหน่งแรกของ value array
      setState(value[1]); // ตั้งค่า state จากตำแหน่งที่สองของ value array
    }
  };

  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center  w-full">
      <form>
        <div className="mx-auto ms-auto flex flex-col justify-center mt-14 items-center w-full">
          <p className="text-2xl pb-10">ส่งรหัสใต้ฝากิจกรรม</p>

          <textarea
            name=""
            cols="10"
            rows="5"
            className="rounded-lg w-[300px]"
            value={textValue}
            onChange={handleTextareaChange}
            required
          ></textarea>

          {/* Select  */}
          <div className="flex flex-col mt-6  w-full">
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "กรุณาเลือกร้านค้าที่ซื้อ",
                  whitespace: true,
                },
              ]}
            >
              <Select
                value={selectedShop || undefined}
                onChange={handleSelectShop}
                className="rounded-lg w-[300px]"
                placeholder="ร้านค้า"
                allowClear
              >
                {shopName.map((item, index) => (
                  <Select.Option key={index} value={item}>
                    {item}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="residence"
              rules={[
                {
                  type: "array",
                  required: true,
                  message: "กรุณาเลือกจังหวัดที่ซื้อสินค้า",
                },
              ]}
              className=""
            >
              <Cascader
                options={residences}
                onChange={handleChangeCascader}
                placeholder="จังหวัด"
              />
            </Form.Item>
            <div className="flex  bg-white rounded-lg w-full">
              <label
                htmlFor="fileInput"
                className="cursor-pointer flex items-center justify-between w-full pl-2 text-slate-400 "
                style={{ fontSize: "14px" }}
              >
                <div className="flex items-center ">
                  ภาพใบเสร็จ
                  {fileName && (
                    <span className="ml-2 truncate inline-block max-w-[150px]">
                      {fileName}
                    </span>
                  )}
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*"
                    onChange={handleImg}
                    className="rounded-lg w-[200px] hidden "
                    placeholder="ภาพใบเสร็จ"
                    required
                  />
                </div>
                <div className="flex items-center py-2 px-4 cursor-pointer">
                  <FaCamera />
                </div>
              </label>
            </div>

            {error && <p className="text-red-500 mt-1 ml-2">{error}</p>}
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="bg-slate-950 p-2 rounded-lg text-white w-[100px] mt-14"
          >
            ตกลง
          </button>

          <p className="text-lg mt-14 text-slate-700">
            ติดต่อ Call Center : 095-409-8045
          </p>
        </div>
      </form>
      {/* Modal */}
      {isModalOpen && (
        <SaveActivity
          isOpen={isModalOpen}
          onClose={closeModal}
          modalData={{
            textValue,
            selectedShop,
            region,
            state,
            imgUrl: file,
          }}
          onAccept={handleAccept}
          uploadedImage={file} // ส่งค่า file ไปยัง SaveActivity component
        />
      )}
    </div>
  );
}

export default Activity;
