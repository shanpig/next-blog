import { defaultAuthor } from 'lib/constants';
import Author from 'types/author';

type Props = {
  author: Author;
};

const Avatar = ({ author = defaultAuthor }: Props) => {
  const { name, picture } = author;

  return (
    <div className="flex items-center">
      <img src={picture} className="w-12 h-12 rounded-full mr-4" alt={name} />
      <div className="text-xl font-bold">{name}</div>
    </div>
  );
};

export default Avatar;
