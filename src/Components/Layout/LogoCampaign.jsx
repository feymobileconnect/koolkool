import Logo from '../../assets/logo/Logo.jpg'

function LogoCampaign() {
  return (
    <div className=" rounded-2xl w-full">
       <img
        src={Logo}
        alt="Logo Campaign"
        className="w-[350px] h-[200px] mx-auto rounded-lg"
        />
    </div>
  )
}

export default LogoCampaign
