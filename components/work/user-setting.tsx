"use client";

import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { Button } from "../ui/button";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Session } from "next-auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { saveUser } from "@/actions/user";
import { LoaderCircle, Pencil } from "lucide-react";
import { uploadImage, uploadImageByBlob } from "@/actions/oss";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg from "@/lib/crop";

interface IProps {
  session: Session | null;
}

interface CropAvatarProps {
  url: string | undefined;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange: (v: any) => void;
}

const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(50, { message: "Name must be 50 or fewer characters long" }),
  email: z.string().email({ message: "Invalid email address" }),
  avatar: z.string().url({ message: "Invalid URL for avatar" }),
});

const UserSetting: FC<IProps> = ({ session }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string>();
  const [cropOpen, setCropOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: session?.user.name || "",
      email: session?.user.email || "",
      avatar: session?.user.image || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (session?.user.id) {
      const data = await saveUser({
        id: session?.user.id,
        ...values,
      });
      if (!data?.error) {
        window.location.reload();
      } else {
        alert("更新信息失败，请稍后再试");
      }
    }
  }

  const handlerUpload = () => {
    fileRef.current!.click();
  };

  const handlerUploadChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const file = files[0];
      setLoading(true);
      try {
        const result = await uploadImage(file);
        const url = result?.url;
        setUploadUrl(url);
        setCropOpen(true);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div>
            <Button
              variant="ghost"
              className="h-10 w-full justify-start items-center cursor-pointer"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={session?.user?.image || ""} />
              </Avatar>
              &nbsp;用户/设置
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑用户信息</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                disabled
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-medium">Name</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入用户名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => {
                  return (
                    <FormItem className="relative">
                      <Avatar className="w-28 h-28">
                        <AvatarImage src={field.value} />
                      </Avatar>
                      <Input
                        type="file"
                        ref={fileRef}
                        className="hidden"
                        onChange={handlerUploadChange}
                        accept=".png,.jpg,.jpeg,.gif"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-0 z-10"
                        type="button"
                        onClick={handlerUpload}
                      >
                        {loading ? (
                          <LoaderCircle className="!size-3 animate-spin" />
                        ) : (
                          <Pencil className="!size-3" />
                        )}
                      </Button>
                      <CropAvatar
                        open={cropOpen}
                        url={uploadUrl}
                        onChange={field.onChange}
                        setOpen={setCropOpen}
                      />
                    </FormItem>
                  );
                }}
              />
              <Button type="submit">保存</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

const CropAvatar: FC<CropAvatarProps> = ({ url, open, setOpen, onChange }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handlerUploadNew = async () => {
    try {
      if (url && croppedAreaPixels) {
        const croppedImage = await getCroppedImg(
          url,
          croppedAreaPixels,
          rotation
        );
        if (croppedImage) {
          const result = await uploadImageByBlob(croppedImage);
          const url = result?.url;
          if (url) {
            onChange(url);
            setOpen(false);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>裁剪新的个人资料图片</DialogTitle>
        </DialogHeader>
        <div className="relative aspect-square">
          <Cropper
            image={url}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={false}
          />
        </div>
        <div className="mt-2">
          <Button disabled={!url} onClick={handlerUploadNew} className="w-full">
            上传新头像
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default UserSetting;
