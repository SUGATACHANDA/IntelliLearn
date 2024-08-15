"use client";
import { FileUpload } from "@/components/file-upload";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachment, Course } from "@prisma/client";
import axios from "axios";
import {
  File,
  ImageUpIcon,
  Loader2,
  Pencil,
  PencilLine,
  PlusCircle,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

interface AttachmentFormProps {
  initialData: Course & { attachments: Attachment[] };
  courseId: string;
}

const formSchema = z.object({
  url: z.string().min(1),
});

export const AttachmentForm = ({
  initialData,
  courseId,
}: AttachmentFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/courses/${courseId}/attachments`, values);
      toast.success("Course Updated Successfully");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  const onDelete = async (Id: string) => {
    try {
      setDeletingId(Id);
      await axios.delete(`/api/courses/${courseId}/attachments/${Id}`);
      toast.success("Attachment Deleted");
      router.refresh();
    } catch (error) {
      toast.error("Something Went Wrong");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="mt-6 bg-slate-100 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Course Attachments
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && (
            <>
              <div className="text-red-600">Cancel</div>
            </>
          )}
          {!isEditing && (
            <>
              <PlusCircle className="h-4 w-4 mr-2 text-sky-700" />
              <div className="text-sky-700">Add File</div>
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          {initialData.attachments.length === 0 && (
            <p className="text-sm mt-2 text-slate-500 italic">
              No Attachments yet
            </p>
          )}
          {initialData.attachments.length > 0 && (
            <div className="space-y-2">
              {initialData.attachments.map((attach) => (
                <div
                  key={attach.id}
                  className="flex items-center p-3 w-full bg-sky-100 border-sky-200 border text-sky-700 rounded-md"
                >
                  <File className="h-4 w-4 mr-2 flex-shrink-0" />
                  <p className="line-clamp-1">{attach.name}</p>
                  {deletingId === attach.id && (
                    <div className="flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin flex items-center justify-center" />
                    </div>
                  )}
                  {deletingId !== attach.id && (
                    <button
                    title="Delete Attachment"
                      className="ml-auto hover:opacity-75 transition"
                      onClick={() => onDelete(attach.id)}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
      {isEditing && (
        <div>
          <FileUpload
            endpoint="courseAttachment"
            onChange={(url) => {
              if (url) {
                onSubmit({ url: url });
              }
            }}
          />
          <div className="text-xs text-muted-foreground mt-4">
            Add Anything your Students might need to complete the Course
          </div>
        </div>
      )}
    </div>
  );
};
