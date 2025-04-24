"use client";
import { useRouter } from "next/navigation";
import { FC, use, useEffect } from "react";

interface IProps {
  params: Promise<{ id: string }>;
}

const TestPage: FC<IProps> = ({ params }) => {
  const { id } = use(params);
  const router = useRouter();
  useEffect(() => {
    console.log(id, "id");
  }, [id]);
  return (
    <>
      test-page--{id}
      <button
        onClick={() => {
          router.push(`${Date.now()}`);
        }}
      >
        跳转
      </button>
    </>
  );
};

export default TestPage;
