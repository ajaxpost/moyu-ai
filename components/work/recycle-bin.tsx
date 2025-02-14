"use client";
/**
 * 回收站
 */

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { LoaderCircle, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import duration from "dayjs/plugin/duration";
import { useRecycleList } from "@/hooks/recycle/use-recycle-list";
import { DocumentVO } from "@/shared";
import { useRecycleRestore } from "@/hooks/recycle/use-recycle-restore";
import { useToast } from "@/hooks/use-toast";

dayjs.extend(utc);
dayjs.extend(duration);

const RecycleBin: FC = () => {
  const { toast } = useToast();
  const { data, mutate, isLoading, isValidating } = useRecycleList();
  const { trigger: restore } = useRecycleRestore();
  const [currentId, setCurrentId] = useState<string>();

  const handlerRestore = async (record: DocumentVO) => {
    setCurrentId(record.id);
    const data = await restore([record.id]);

    if (data.code === 200) {
      window.open(`${window.origin}/work/${record.id}`, "_self");
    } else {
      toast({
        title: "恢复失败",
        description: data.data.error,
        variant: "destructive",
        duration: 1000,
      });
      setCurrentId(undefined);
    }
  };

  const onOpenChange = (open: boolean) => {
    if (open) {
      mutate();
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start items-center cursor-pointer"
        >
          <Trash2 />
          回收站
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[800px]">
        <DialogHeader>
          <DialogTitle>回收站</DialogTitle>
          <DialogDescription>
            注意，回收站的文档将保留 30 天，然后彻底删除
          </DialogDescription>
        </DialogHeader>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>标题</TableHead>
              <TableHead className="w-24">删除时间</TableHead>
              <TableHead className="text-right w-24">操作</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading || isValidating ? (
              <div className="m-24 flex justify-center items-center w-full text-lg">
                加载中...
              </div>
            ) : data?.data.length ? (
              data?.data.map((item) => {
                const del_at = dayjs(
                  dayjs.utc(item.del_at).format("YYYY-MM-DD HH:mm:ss")
                );
                let diff = "几秒前";
                const second = dayjs().diff(del_at, "second");
                const minute = dayjs().diff(del_at, "minute");
                const hour = dayjs().diff(del_at, "hour");
                const day = dayjs().diff(del_at, "day");

                if (second < 60) {
                  diff = `${second}秒前`;
                } else if (minute < 60) {
                  diff = `${minute}分钟前`;
                } else if (hour < 24) {
                  diff = `${hour}小时前`;
                } else if (day >= 1) {
                  diff = `${day}天前`;
                }

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium p-4">
                      {item.title ?? "<无标题>"}
                    </TableCell>
                    <TableCell>{diff}</TableCell>
                    <TableCell className="text-right flex gap-1 items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlerRestore(item)}
                        disabled={currentId === item.id}
                      >
                        {currentId === item.id && (
                          <LoaderCircle className="animate-spin" />
                        )}
                        恢复
                      </Button>
                      <Button variant="destructive" size="sm" disabled>
                        删除「暂不支持」
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <div className="m-24 flex justify-center items-center w-full text-2xl font-bold">
                暂无数据
              </div>
            )}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );
};

export default RecycleBin;
