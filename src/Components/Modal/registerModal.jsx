import { useState,useEffect } from "react";
import moment from "moment";

const RegisterModal = ({ closeModal, formData, handleAcceptTermsInModal,open }) => {
  const [acceptTerms, setAcceptTerms] = useState(false);

  const formatBirthDate = (date) => {
    return moment(date).format("DD-MM-YYYY");
  };

  const handleEdit = () => {
    closeModal();
  };

  return (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-6 mx-auto max-w-sm">
          {/* content */}
          <div className="rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            {/* header */}
            <div className="flex items-center  mx-auto p-5 ">
              <p className="text-xl font-semibold">
                ยืนยันการลงทะเบียนข้อมูลที่ถูกต้อง
              </p>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={closeModal}
              ></button>
            </div>
            {/* body */}
            <div className="relative p-6 flex flex-col space-y-5 items-center ">
              <input
                type="text"
                className="border-2 p-1 rounded-lg w-[200px]"
                placeholder="Username Get Register มาแสดง"
                value={formData.nickname} // ใช้ข้อมูลจาก form ใน State
                readOnly // ทำให้ input เป็นแบบอ่านเท่านั้น
              />
              <input
                type="text"
                className="border-2 p-1 rounded-lg w-[200px] " 
                value={formData.phone} // ใช้ข้อมูลจาก form ใน State
                readOnly // ทำให้ input เป็นแบบอ่านเท่านั้น
              />
              <input
                type="text"
                className="border-2 p-1 rounded-lg w-[200px]"
                value={formData.email} // ใช้ข้อมูลจาก form ใน State
                readOnly // ทำให้ input เป็นแบบอ่านเท่านั้น
              />
              <input
                type="text"
                className="border-2 p-1 rounded-lg w-[200px]"
                value={formatBirthDate(formData.birth)} // ใช้ข้อมูลจาก form ใน State
                readOnly // ทำให้ input เป็นแบบอ่านเท่านั้น
              />
              <input
                type="text"
                className="border-2 p-1 rounded-lg w-[200px]"
                value={formData.gender} // ใช้ข้อมูลจาก form ใน State
                readOnly // ทำให้ input เป็นแบบอ่านเท่านั้น
              />
            </div>

            {/* footer */}
            <div className="flex items-center justify-center p-6 border-solid border-blueGray-200 rounded-b">
              <button
                className="bg-black text-white px-4 py-2 mt-4 rounded-md mr-4"
                type="button"
                
                onClick={closeModal}
              >
                แก้ไข
              </button>
              <button
                className="bg-black text-white px-4 py-2 mt-4 rounded-md mr-4"
                type="button"
                onClick={() => {
                  setAcceptTerms(true); // เปลี่ยน acceptTerms เป็น true
                  handleAcceptTermsInModal();
                  closeModal(); // เรียก handleAcceptTermsInModal
                }}
                disabled={acceptTerms}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default RegisterModal;
