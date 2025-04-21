import type { PageType } from "@/types/PageTypes";
import Image from "next/image";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { DropzoneError } from "./dropzoneError";
import { fileSizeLimit, fileTypes } from "@/app/api/_schema/schema";

export function IconDropzone() {
  const { setValue, register } = useFormContext<PageType>();
  const [preview, setPreview] = useState<string>("");
  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
      "image/gif": [],
    },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length < 1) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(acceptedFiles[0]);
      const objectUrl = URL.createObjectURL(dataTransfer.files[0]);

      setPreview(objectUrl);
      setValue("pageIcon", dataTransfer.files[0]);
    },
    noDrag: true,
    multiple: false,
    maxFiles: 1,
    maxSize: fileSizeLimit,
    validator: (file) => {
      if (file.size > fileSizeLimit) {
        return {
          code: "size",
          message: "Icon too large. Must be under 2MB.",
        };
      }
      if (!fileTypes.includes(file.type)) {
        return {
          code: "type",
          message: "Invalid icon type. Must either be JPEG, PNG, GIF, or SVG.",
        };
      }
      return null;
    },
  });

  return (
    <div className="fieldset flex gap-x-3 pt-4">
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className="bg-primary size-24 overflow-hidden rounded-full border hover:cursor-pointer"
      >
        <input
          className="invisible absolute size-0"
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

        {fileRejections[0] ? (
          <DropzoneError error={fileRejections[0].errors} />
        ) : (
          <>
            <p className="fieldset-label">Max size 2MB.</p>
            <p className="fieldset-label">
              Icon must either be JPEG, PNG, GIF, or SVG.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
