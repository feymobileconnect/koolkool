import Rule from '../assets/img/rulelucky.jpg'

function TermsAndPrize() {
    const goBack = () => {
        window.history.back();
    };
  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center w-full space-y-6 mt-4"> 

    <p className='text-lg'>เงื่อนไขกติกาและของรางวัล</p>
  <div className='bg-white rounded-2xl m-3 overflow-y-scroll text-left space-y-2 h-[500px]'>
    <p className='text-md text-left pl-4 pt-2'>กติการ่วมสนุก</p>
      <div className="flex flex-col">
        <div className='flex-warp'>
        <p className='text-md font-black underline-offset-4'>1. ระยะเวลากิจกรรม</p> 
        <p className="font-black underline-offset-4">ครั้งที่ 1</p><span className='text-sm'>เก็บข้อมูลตั้งแต่วันที่ 1 ก.พ. – 25 ก.พ. 67 (25 วัน)  จับรางวัลที่ 29 ก.พ. 67  ประกาศผลวันที่ 7 มี.ค. 67</span>
        <p className="font-black underline-offset-4">ครั้งที่ 2</p><span className='text-sm'>เก็บข้อมูลตั้งแต่วันที่ 26 ก.พ. – 25 มี.ค. 67 (29 วัน)  จับรางวัลที่ 29 มี.ค. 67  ประกาศผลวันที่ 9 เม.ย. 67</span>
        <p className="font-black underline-offset-4">ครั้งที่ 3</p><span className='text-sm'>เก็บข้อมูลตั้งแต่วันที่ 26 มี.ค. – 25 เม.ย. 67 (31 วัน)  จับรางวัลที่ 29 เม.ย. 67 ประกาศผลวันที่ 8 พ.ค. 67</span>
        <p className="font-black underline-offset-4">ครั้งที่ 4</p><span className='text-sm'>เก็บข้อมูลตั้งแต่วันที่ 26 เม.ย. 67 – 25 พ.ค. 67 (30 วัน)  จับรางวัลที่ 29 พ.ค. 67 ประกาศผลวันที่ 7 มิ.ย. 67</span>
        </div>
      </div>

      <p className='text-md font-black underline-offset-4'>2. สินค้าที่ร่วมกิจกรรม  จำนวน 2 รสชาติ :</p>
        <p className='text-sm '>KUKURU  Kyohogrape Osaka Kyoto ขนาด 280 มล.</p>
        <p className='text-sm '>KUKURU PEACH  Sakura Osaka Kyoto ขนาด 280 มล.</p>

      <p className='text-md font-black underline-offset-4'>3. วิธีการลงทะเบียนร่วมกิจกรรม</p>
        <p className='text-sm '>ผู้ร่วมกิจกรรมสามารถซื้อผลิตภัณฑ์เครื่องดื่มน้ำผลไม้ผสมโยเกิร์ตและวุ้นมะพร้าว KUKURU ที่ร่วมรายการ 2 รสชาติ ได้แก่ KUKURU Kyohogrape Osaka Kyoto ขนาด 280 มล. และ KUKURU PEACH Sakura Osaka Kyoto ขนาด 280 มล. แล้วพลิกใต้ฝาพบรหัส 10 หลักเพื่อส่งลุ้นรางวัล ( 1 รหัส ต่อ 1 สิทธิ์ ) มีวิธีร่วมกิจกรรมลุ้นรางวัลได้ 2 วิธีคือ ผ่านทางระบบ USSD และผ่านทางระบบเว็บแอปพลิเคชัน ซึ่ง 1 รหัสสามารถลงทะเบียนได้ 1 ระบบเท่านั้น</p>
    
      <p className="text-md font-black underline-offset-4">วิธีที่ 1</p> <span className='text-sm'>ร่วมกิจกรรมส่งรหัสผ่านทางระบบ USSD โดยผู้ร่วมกิจกรรมเข้าที่แป้นพิมพ์โทรออก <strong className="text-blue-700">กด *467*69* รหัสใต้ฝา10 หลัก # และ กดโทรออก </strong>(ครั้งละ 3 บาท/1ครั้ง ส่งได้เฉพาะเครือข่าย AIS , TRUE , DTAC )  ผู้ร่วมกิจกรรมที่ลงทะเบียนสำเร็จจะมีข้อความ SMS ตอบกลับ ว่าลงทะเบียนสำเร็จ หากมีการลงทะเบียนซ้ำโดยใช้รหัสเดิมจะมีข้อความตอบกลับว่าขออภัยรหัสนี้ได้ถูกใช้งานแล้ว  และ กรณีที่ใช้รหัสไม่ถูกต้อง จะมีข้อความตอบกลับว่าขออภัยรหัสของท่านไม่ถูกต้อง กรุณาตรวจสอบรหัสอีกครั้ง ภายในระยะเวลากิจกรรมเท่านั้น ถ้าลูกค้าลงทะเบียนก่อนระยะเวลากิจกรรม จะมีข้อความตอบกลับว่า กิจกรรมเริ่มวันที่ 1 กุมภาพันธ์ 2567  ถึง วันที่ 25 พฤษภาคม 2567 และกรณีที่ลงทะเบียนหลังระยะเวลากิจกรรมสิ้นสุดลงแล้ว จะมีข้อความตอบกลับว่า กิจกรรมเริ่มวันที่ 1 กุมภาพันธ์ 2567  ถึง วันที่ 25 พฤษภาคม 2567 ตอนนี้กิจกรรมได้สิ้นสุดแล้ว</span>

      <p className="text-md font-black underline-offset-4">วิธีที่ 2</p> <span className='text-sm'>ผู้ร่วมกิจกรรมลงทะเบียนผ่านทางระบบ เว็บแอปพลิเคชัน โดยผู้ร่วมกิจกรรมสามารถสแกน QR Code หรือ ผ่านช่องทางสื่อออนไลน์ หรือสื่อโฆษณา ณ จุดขาย หรือลงทะเบียนร่วมกิจกรรมและส่งรหัสใต้ฝาผ่านทางเว็บ <a className="text-blue-700"  href="https://kukurucampaign2024.com">https://kukurucampaign2024.com</a>
โดยผู้ร่วมกิจกรรมจะต้องคลิกเมนูลงทะเบียน และต้องกดยอดรับนโยบายข้อมูลส่วนบุคคล และกดยอมรับ เงื่อนไขกิจกรรม และ กรอก ชื่อ-นามสกุล, เบอร์โทร, วันเดือนปีเกิด, เพศ ข้อมูลต้องเป็นข้อมูลจริงที่สามารถติดต่อได้ และ กรอกรหัสใต้ฝา เพื่อส่งรหัสร่วมกิจกรรมลุ้นรางวัลในแถบเมนู “ส่งรหัสใต้ฝาร่วมกิจกรรม”</span>
      <p className='text-sm '>ในกรณีที่ลงทะเบียนสำเร็จจะขึ้นข้อความ  “ขอบคุณที่ร่วมกิจกรรม”</p>
      <p className='text-sm '>หากมีการลงทะเบียนซ้ำโดยใช้รหัสเดิมจะมีขึ้นข้อความ “ขออภัยรหัสนี้ได้ถูกใช้งานแล้ว</p>
      <p className='text-sm '>หากมีการลงทะเบียนรหัสไม่ถูกต้องจะมีขึ้นข้อความ “ขออภัยรหัสของท่านไม่ถูกต้อง กรุณาตรวจสอบรหัสอีกครั้งภายในระยะเวลากิจกรรมเท่านั้น
และกรณีที่กิจกรรมได้สิ้นสุดลงแล้วจะไม่สามารถลงทะเบียนหรือส่งรหัสร่วมกิจกรรมได้</p>
        
      {/* <p className="text-sm font-black underline-offset-4">5. การ Gen Code <strong className="text-blue-700">รหัสใต้ฝา จำนวน 10 หลัก</strong></p> <span>ตามที่ระบุมา (กำหนด code นำหน้าที่จะไม่ซ้ำ ป้องกันการ random และโกงสิทธิ์)</span> */}
      

      {/* <p className="font-black text-blue-700">KUKURU Campaign</p>
      
      <table className='border'>
        <thead>
          <tr className='text-center'>
            <th className="font-black text-sm text-blue-700 border">รสชาติ</th>
            <th className="font-black text-sm text-blue-700 border">จำนวน Code</th>
            <th className="font-black text-sm text-blue-700 border">รหัสขึ้นต้นด้วย	</th>
            <th className="font-black text-sm text-blue-700 border">timeline ส่ง File รหัสใต้ฝาให้โรงงาน</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-xs text-blue-700 ">Kyoho grape</td>
            <td className="text-xs text-blue-700">728,000</td>
            <td className="text-xs text-blue-700">1XXXXXXXXX</td>
            <td className="text-xs text-blue-700">week 2 ของ Dec.  (แยก zip ไฟล์)</td>
          </tr>
          <tr>
            <td className="text-xs text-blue-700">Peach sakura	</td>
            <td className="text-xs text-blue-700">605,000</td>
            <td className="text-xs text-blue-700">2XXXXXXXXX</td>
            <td className="text-xs text-blue-700">week 4 ของ Jan.   (แยก zip ไฟล์)</td>
          </tr>
          <tr>
            <td className=" text-blue-700">รวม	</td>
            <td className=" text-blue-700">1,333,000	 Code</td>
          </tr>
        </tbody>
      </table>
      <p className="font-black text-blue-700">ส่งในรูปแบบไฟล์ txt</p>
      <img src={Rule} alt="Code" />
       */}
    </div>

    <button className="bg-black text-white rounded-xl" onClick={goBack}>กลับสู่หน้าหลัก</button>


    </div>
  )
}

export default TermsAndPrize