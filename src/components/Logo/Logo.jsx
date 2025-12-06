import logoImg from "../../assets/logos.png";

const Logo = () => {
  return (
    <div className="flex items-end">
      <img src={logoImg} alt="" className="w-10 h-10" />
      <h3 className="text-3xl font-bold">ClubHub</h3>
    </div>
  );
};

export default Logo;
