import type { PageType } from "@/types/PageTypes";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export function IconDropzone() {
  const { setValue, register } = useFormContext<PageType>();
  const [preview, setPreview] = useState<string>("");

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/gif": [],
    },
    onDrop(incomingFiles) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(incomingFiles[0]);

      const objectUrl = URL.createObjectURL(dataTransfer.files[0]);

      setPreview(objectUrl);
      setValue("pageIcon", dataTransfer.files[0]);
    },
    noDrag: true,
    multiple: false,
    maxFiles: 1,
    maxSize: 2000000,
    validator: (file) => {
      return null;
    },
  });

  return (
    <div className="fieldset flex pt-4">
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className="bg-primary size-24 overflow-hidden rounded-full border hover:cursor-pointer"
      >
        <input
          className="invisible absolute size-0"
          type="file"
          id="pageIcon"
          {...register("pageIcon")}
          aria-hidden
        />
        <input {...getInputProps()} aria-hidden />
        {preview && (
          <Image
            className="size-24 object-cover"
            src={preview}
            alt="Page icon"
            width={100}
            height={100}
          />
        )}
      </div>
      <div>
        <p className="fieldset-legend">Upload an icon</p>
        <p className="fieldset-label">Max size 2MB</p>
      </div>
    </div>
  );
}
