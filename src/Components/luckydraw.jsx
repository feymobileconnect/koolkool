import React from 'react'

function Luckydraw() {
  return (
    <div className="container bg-[#9cff24] min-w-screen  ms-auto mx-auto flex flex-col text-center items-center w-full">

      <div className="space-y-10 mt-10 w-[18rem] ">
        <div className="bg-white rounded-3xl p-6 space-y-3">
          <p className="text-xl ">ส่งใบเสร็จร่วมกิจกรรม</p>
          <button className="bg-black text-white w-[100px] rounded-xl">
            <a href="/activity">คลิก</a>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 space-y-3">
          <p className="text-xl">สถานะใบเสร็จ</p>
          <button className="bg-black text-white w-[100px] rounded-xl">
            <a href="/statusbill">คลิก</a>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 space-y-3">
          <p className="text-xl">เงื่อนไขกติการและของรางวัล</p>
          <button className="bg-black text-white w-[100px] rounded-xl">
            <a  href="/term">คลิก</a>
          </button>
        </div>

        <div className="bg-white rounded-3xl p-6 space-y-3">
          <p className="text-xl">ประกาศรายชื่อผู้โชคดี</p>
          <button className="bg-black text-white w-[100px] rounded-xl ">
            <a href="/winners">คลิก</a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Luckydraw