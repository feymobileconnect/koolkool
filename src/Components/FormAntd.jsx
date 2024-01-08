import React, { useState } from "react";
import { Button, Checkbox, Form, Input, Modal, Select, DatePicker } from "antd";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import RegisterModal from "../Components/Modal/registerModal";
import { useNavigate } from "react-router-dom";
import PrivacyModal from "./Modal/privacyModal";
import ActivityPrivacy from "./Modal/ActivityPrivacy";
import moment from "moment";
import Swal from "sweetalert2";

const { Option } = Select;

const FormAntd = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({});
  const [selectedResidence, setSelectedResidence] = useState([]);

  const [isChecked, setIsChecked] = useState(false);
  const [actChecked, setActChecked] = useState(false);

  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isActivityPrivacyOpen, setIsActivityPrivacyOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleAcceptTermsInModalFromRegister = async () => {
    try {
      if (
        !formData ||
        Object.values(formData).some(
          (value) => value === undefined || value === null
        )
      ) {
        console.error("Form data is incomplete");
        return;
      }
      const formattedBirth = formData.birth.format("DD-MM-YYYY");

      const updatedForm = { ...formData, role: "user", birth: formattedBirth };

      const docRef = await addDoc(collection(db, "users"), updatedForm);
      console.log("Data sent to Firestore:", updatedForm);
      console.log("Document written with ID: ", docRef.id);

      Swal.fire({
        icon: "success",
        title: "ลงทะเบียนสำเร็จ",
        showConfirmButton: false,
        timer: 1500,
      });

      closeModal();
      navigate("/registerSuccess");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkPhoneNumberInFirestore = async (phoneNumber) => {
    const userRef = collection(db, "users");
    const snapshot = await getDocs(userRef);

    const registeredPhoneNumbers = snapshot.docs.map((doc) => doc.data().phone);

    return registeredPhoneNumbers.includes(phoneNumber);
  };

  const handleAddData = () => {
      form.validateFields()
      .then(async (values) => {
        setFormData(values);

        const isPhoneRegistered = await checkPhoneNumberInFirestore(
          values.phone
        );

        if (isPhoneRegistered) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "เบอร์โทรศัพท์นี้ถูกลงทะเบียนแล้ว!",
          });
          console.log("เบอร์โทรศัพท์นี้ถูกลงทะเบียนแล้ว!");

          return; 

        openModal();
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };
  // Checkbox
  const handlePrivacyAccept = () => {
    form.setFieldsValue({ privacyCheckbox: true });
    setIsChecked(true);
    setIsPrivacyModalOpen(true);
  };

  const handlePrivacyReject = () => {
    form.setFieldsValue({ privacyCheckbox: false });
    setIsChecked(false);
    setIsPrivacyModalOpen(false);
  };

  const handleActivityPrivacyAccept = () => {
    form.setFieldsValue({ activityPrivacyCheckbox: true }); 
    setActChecked(true);
    setIsActivityPrivacyOpen(true);
  };

  const handleActivityPrivacyReject = () => {
    form.setFieldsValue({ activityPrivacyCheckbox: false });
    setActChecked(false);
    setIsActivityPrivacyOpen(false);
  };



  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center w-full ">
      <p className="text-2xl my-8 ">ลงทะเบียนกิจกรรม</p>
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        style={{
          maxWidth: 600,
        }}
        scrollToFirstError
        onValuesChange={(changedValues, allValues) => {
          form.setFieldsValue(changedValues);
          setSelectedResidence(allValues.residence);
          setFormData({
            ...allValues,
            selectedResidence, 
          });
        }}
      >
        <Form.Item
          className="mt-4 text-center"
          name="nickname"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "ป้อน ชื่อ-นามสกุล ของคุณ",
              whitespace: true,
            },
          ]}
        >
          <Input
            placeholder="ชื่อ-นามสกุล*"
            className="p-2"
            style={{
              fontFamily: "'Kanit', sans-serif",
            }}
          />
        </Form.Item>

        <Form.Item
          name="email"
          className="text-center"
          style={{
            width: "100%",
            fontFamily: "'Kanit', sans-serif",
          }}
          rules={[
            {
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            placeholder="อีเมล(ไม่บังคับ)"
            className="p-2"
            style={{
              fontFamily: "'Kanit', sans-serif",
            }}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[
            {
              validator: (_, value) => {
                if (!value) {
                  return Promise.reject("ป้อนเบอร์โทรศัพท์ของคุณ");
                }
                const containsNonDigit = /\D/.test(value);

                if (containsNonDigit) {
                  return Promise.reject("กรุณาป้อนตัวเลขเท่านั้น");
                }
                const phoneRegex = /^\d{10}$/;
                if (!phoneRegex.test(value)) {
                  return Promise.reject("รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง");
                }

                return Promise.resolve();
              },
            },
          ]}
          className="text-center"
        >
          <Input
            style={{
              width: "100%",
              fontFamily: "'Kanit', sans-serif",
            }}
            placeholder="เบอร์โทรศัพท์*"
            inputmode="numeric"
            className="p-2"
          />
        </Form.Item>

        <Form.Item
          name="birth"
          rules={[
            {
              required: true,
              message: "โปรดเลือกวัน/เดือน/ปีเกิดของคุณ",
            },
          ]}
          className="text-center"
        >
          <DatePicker
            placeholder="วัน/เดือน/ปีเกิด"
            className="w-[300px] p-2"
            disabledDate={(current) =>
              current && current >= moment().startOf("day")
            }
          />
        </Form.Item>

        <Form.Item
          name="gender"
          rules={[{ required: true, message: "โปรดเลือกเพศของคุณ" }]}
          className="text-center " 
        >
          <Select
            placeholder="เพศ"
            className="text-left h-[39px]"
            style={{ fontSize: "16px", fontFamily: "'Kanit', sans-serif" }}
          >
            <Option value="ชาย">ชาย</Option>
            <Option value="หญิง">หญิง</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="privacyCheckbox"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("กรุณายอมรับเงื่อนไข-นโยบายการให้ข้อมูลส่วนตัว")
                    ),
            },
          ]}
        >
          <div className="flex items-center mt-10">
            <Checkbox checked={isChecked} onChange={handlePrivacyAccept}>
              <PrivacyModal
                onAccept={handlePrivacyAccept}
                onReject={handlePrivacyReject}
                isChecked={isChecked}
              />
            </Checkbox>
          </div>
        </Form.Item>

        <Form.Item
          name="activityPrivacyCheckbox"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(
                      new Error("กรุณายอมรับเงื่อนไขและกติกาการร่วมกิจกรรม")
                    ),
            },
          ]}
        >
          <div className="flex items-center">
            <Checkbox
              checked={actChecked}
              onChange={handleActivityPrivacyAccept}
            >
              <ActivityPrivacy
                onAccept={handleActivityPrivacyAccept}
                onReject={handleActivityPrivacyReject}
                isChecked={actChecked}
              />
            </Checkbox>
          </div>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            onClick={handleAddData}
            className="bg-slate-950  rounded-lg text-white w-[100px]  transition duration-300 ease-in-out mx-auto "
          >
            ลงทะเบียน
          </Button>
        </Form.Item>

        {isModalOpen && (
          <RegisterModal
            formData={formData}
            closeModal={closeModal}
            handleAcceptTermsInModal={handleAcceptTermsInModalFromRegister}
          />
        )}
      </Form>
    </div>
  );
};

export default FormAntd;
