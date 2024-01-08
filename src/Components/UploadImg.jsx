import React, { useState, useEffect } from "react";
import { imageDb } from "../firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function UploadImg() {
  const [img, setImg] = useState("");
  // useState imgUrl คือ ไว้ get รูปภาพมาแสดง เก็บข้อมูลเป็น Array
  const [imgUrl, setImgUrl] = useState([]);

  const handleUpload = () => {
    if (img != null) {
      const imgRef = ref(imageDb, `files/${v4()}`);
      uploadBytes(imgRef, img).then(value =>{
        console.log(value);
        getDownloadURL(value.ref).then((url) => {
            // useState setImgUrl และ กระจายข้อมูลโดยใช้ ... speac operator push url ที่ละรายการ
            setImgUrl((data) => [...data, url]);
          });
      })
    }
  };

  // get img
  useEffect(() => {
    listAll(ref(imageDb, "files")).then((imgs) => {
      console.log(imgs);
      // items ดูจาก console เพื่อเข้าถึงรูปภาพ
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          // useState setImgUrl และ กระจายข้อมูลโดยใช้ ... speac operator push url ที่ละรายการ
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  console.log("ImgURL : ", imgUrl);

  return (
    <div>
      <input
        type="file"
        name="file"
        accept="images/*"
        onChange={(e) => setImg(e.target.files[0])}
      />
      <button onClick={handleUpload}>upload</button>

      {imgUrl.map((dataVal) => (
        <div key={dataVal}>
          <img src={dataVal} height="200px" width="200px" alt="" />
        </div>
      ))}
    </div>
  );
}

export default UploadImg;
