import { Link } from "react-router";
import logoImg from "../../assets/logos.png";

const Logo = () => {
  return (
    <Link to="/" className="flex items-end">
      <img src={logoImg} alt="" className="w-10 h-10" />
      <h3 className="text-3xl font-bold">ClubHub</h3>
    </Link>
  );
};

export default Logo;
