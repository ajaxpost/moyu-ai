import { FC } from "react";

interface IProps {
  params: {
    id: string;
  };
}

const Page: FC<IProps> = ({ params }) => {
  const { id } = params;
  return <>work -- {id}</>;
};

export default Page;
