"use server";
import { OSS_BUCKET } from "@/shared";
import OSS from "ali-oss";

const client = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: process.env.OSS_ACCESS_KEY_ID!,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET!,
  bucket: OSS_BUCKET,
});

export const uploadImage = async (file: File, isPaste?: boolean) => {
  try {
    const blob = new Blob([file]);
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filename = isPaste ? `${Date.now()}.${file.name}` : file.name;
    const result = await client.put(`images/${filename}`, buffer);
    console.log(`上传成功 「${filename}」 `, result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const uploadImageByBlob = async (blob: Blob) => {
  try {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const result = await client.put(`images/${Date.now()}`, buffer);
    console.log(`上传成功 `, result);
    return result;
  } catch (error) {
    console.log(error);
  }
};
