"use server";
import { OSS_BUCKET } from "@/shared";
import OSS from "ali-oss";

const client = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: OSS_BUCKET,
});

export const uploadImage = async (file: File) => {
  try {
    const blob = new Blob([file]);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await client.put(
      `images/${Date.now()}__${file.name}`,
      buffer
    );
    console.log(`上传成功 「${file.name}」 `, result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
