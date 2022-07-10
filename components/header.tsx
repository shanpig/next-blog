import getCourage from '../lib/courageSentence';

const Header = () => {
  const courageSentence = getCourage();
  return (
    <h2 className="text-lg  italic  text-gray-400 tracking-tight md:tracking-tighter leading-tight mb-10 mt-8">
      {courageSentence}
    </h2>
  );
};

export default Header;
