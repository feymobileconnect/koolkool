

function WinnerReward() {
    const goBack = () => {
        window.history.back();
    };
  return (
    <div className="container bg-[#9cff24] ms-auto mx-auto flex flex-col text-center items-center w-full space-y-6">

        <table className="w-full border-1 mt-4 bg-white">
            <thead>
                <tr>
                    <th className='border'>
                        ชื่อ-นามสกุล
                    </th>
                    <th className='border'>
                        เบอร์โทรศัพท์
                    </th>
                    <th className='border'>
                        ใบเสร็จ
                    </th>
                </tr>
            </thead>
            <tbody className='text-center'>
                <td className='border'>
                    ธนกฤต สอนเสือ
                </td>
                <td className='border'>
                    082-xxx-xxxx
                </td>
                <td className='border'>
                    <a href="/">Pic Link</a>
                </td>
            </tbody>
        </table>

        <button className="bg-black text-white rounded-xl" onClick={goBack}>กลับสู่หน้าหลัก</button>
    </div>
  )
}

export default WinnerReward