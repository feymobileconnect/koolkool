import React, { useEffect } from 'react';
import { useUserAuth } from '../Components/context/UserAuthContext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const { user } = useUserAuth();

  useEffect(() => {
    if (!user) {
      // ถ้าผู้ใช้ยังไม่ล็อกอิน, ให้ทำบางอย่างที่คุณต้องการ (ในที่นี้คือไม่ทำอะไรเพิ่มเติม)
    }
  }, [user]);

  // ถ้าผู้ใช้ยังไม่ล็อกอิน, ให้ทำการ redirect ไปที่หน้าล็อกอิน
  if (!user) {
    return <Navigate to="/" />;
  }

  // ถ้าผู้ใช้ล็อกอินแล้ว, ให้แสดง children (คือ component ที่ได้รับ)
  return children;
}

export default ProtectedRoute;
