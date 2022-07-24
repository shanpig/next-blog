import { FC, ReactNode } from 'react';

type Props = {
  children?: ReactNode
};

const Container: FC<Props> = ({ children }) => <div className="container mx-auto px-5 py-8">{children}</div>;

export default Container;
