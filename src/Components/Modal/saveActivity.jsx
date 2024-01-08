const SaveActivity = ({
  isOpen,
  onClose,
  modalData,
  onAccept,
  uploadedImage,
}) => {
  const { textValue, selectedShop, region, state, imgUrl } = modalData;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="modal-content bg-white p-4 rounded-lg relative z-50 space-y-4 w-[300px]">
        <h1 className="text-xl font-bold mb-4">
          ยืนยันการลงทะเบียนข้อมูลที่ถูกต้อง
        </h1>
        <p>ร้านค้า: {selectedShop}</p>
        <p>จังหวัด: {state}</p>
        {/* แสดงรูปภาพที่มีการอัพโหลดเข้ามาล่าสุด */}
        {uploadedImage ? (
          <img
            src={URL.createObjectURL(uploadedImage)}
            alt="Latest Uploaded Image"
            className="my-2"
          />
        ) : (
          <p>No image available</p> /* ถ้าไม่มี img */
        )}

        <button
          className="bg-black text-white px-4 py-2 mt-4 rounded-md mr-4"
          onClick={onClose}
        >
          แก้ไข
        </button>
        {/* ปุ่มยอมรับ */}
        <button
          onClick={onAccept}
          className="bg-black text-white px-4 py-2 mt-4 rounded-md"
        >
          ตกลง
        </button>
      </div>
      {/* ส่วนที่ใช้เพื่อให้ส่วนหลังของ Modal เป็นสีดำ */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
      />
    </div>
  );
};

export default SaveActivity;
