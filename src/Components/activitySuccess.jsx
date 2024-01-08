import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function ActivitySuccess() {

  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      
      navigate('/luckydraw');
    }, 3000);

    // ตอน unmount component ให้ clear timeout
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  return (

    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center w-full space-y-6">

        <div className='w-[300px] rounded-xl bg-white mt-8 space-y-4'>
            <p className='text-md pt-3'>ท่านลงทะเบียนเรียบร้อยแล้ว <br />กรุณารอการตรวจสอบใบเสร็จ <br />ภายใน 24 ชั่วโมงของวันถัดไป</p>
            <p className='text-md'>กรุณาเก็บใบเสร็จตัวจริงไว้เป็นหลักฐาน <br />เพื่อยืนยันรับรองของรางวัล</p>
            <p className='text-md pb-3'>ขอบคุณที่เข้าร่วมกิจกรรม <br />ติดตามรายชื่อผู้โชคดี <br />วันที่ 13 มีนาคม 2567</p>
        </div>

        <button className='bg-slate-950 p-2 rounded-lg text-white w-[300px] mt-20'>
            <a href="/luckydraw" className='text-white'>กลับสู่หน้าหลัก</a>
        </button>
        <button className='bg-slate-950 p-2 rounded-lg text-white w-[300px] mt-8'>
            <a href="/activity" className='text-white'>กรอกข้อมูลลงทะเบียนใบเสร็จเพิ่มเติม</a>
        </button>
      
    </div>
  )
}

export default ActivitySuccess;
