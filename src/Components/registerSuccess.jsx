import React,{useEffect} from 'react'
import { useNavigate } from 'react-router-dom';

function RegisterSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      // เปลี่ยน Path ไปที่หน้า Login
      navigate('/luckydraw');
    }, 3000);

    // ตอน unmount component ให้ clear timeout
    return () => clearTimeout(timeoutId);
  }, [navigate]);
  return (
    <div>
        <div className='container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center w-full'>

        {/* <div className='border-2 p-10 mt-10 rounded-2xl bg-white'>
              <img src="" alt="Logo Campaign"/>
        </div> */}

        <div className="absolute top-[44%] bg-white p-10">
            <h1 className="flex-center text-2xl ">ลงทะเบียนสำเร็จ</h1>
        </div>
                
        </div>
    </div>
  )
}

export default RegisterSuccess