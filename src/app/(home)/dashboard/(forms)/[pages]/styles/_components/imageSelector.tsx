import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import { fileSizeLimit, fileTypes } from "@/app/api/_schema/schema";
import Image from "next/image";
import { DropzoneError } from "@(forms)/_components/dropzone/dropzoneError";

export function ImageSelector({ fieldName }: { fieldName: string }) {
  const { setValue, register } = useFormContext();
  const [preview, setPreview] = useState<string>("");

  const { fileRejections, getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
      "image/svg+xml": [],
    },
    onDrop(acceptedFiles) {
      if (acceptedFiles.length < 1) {
        return;
      }

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(acceptedFiles[0]);
      const objectUrl = URL.createObjectURL(dataTransfer.files[0]);

      setPreview(objectUrl);
      setValue(fieldName, dataTransfer.files[0]);
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
    <>
      <div
        {...getRootProps({
          className: "dropzone",
        })}
        className="relative grid h-32 w-full place-items-center justify-center overflow-hidden hover:cursor-pointer"
        tabIndex={0}
      >
        <input
          className="invisible absolute size-0"
          id="pageIcon"
          {...register("pageIcon")}
          aria-hidden
        />
        <input className="absolute size-0!" {...getInputProps()} aria-hidden />
        <span className="bg-base-300 relative z-10 rounded p-1">
          <svg
            width="32"
            height="32"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.81825 1.18188C7.64251 1.00615 7.35759 1.00615 7.18185 1.18188L4.18185 4.18188C4.00611 4.35762 4.00611 4.64254 4.18185 4.81828C4.35759 4.99401 4.64251 4.99401 4.81825 4.81828L7.05005 2.58648V9.49996C7.05005 9.74849 7.25152 9.94996 7.50005 9.94996C7.74858 9.94996 7.95005 9.74849 7.95005 9.49996V2.58648L10.1819 4.81828C10.3576 4.99401 10.6425 4.99401 10.8182 4.81828C10.994 4.64254 10.994 4.35762 10.8182 4.18188L7.81825 1.18188ZM2.5 9.99997C2.77614 9.99997 3 10.2238 3 10.5V12C3 12.5538 3.44565 13 3.99635 13H11.0012C11.5529 13 12 12.5528 12 12V10.5C12 10.2238 12.2239 9.99997 12.5 9.99997C12.7761 9.99997 13 10.2238 13 10.5V12C13 13.104 12.1062 14 11.0012 14H3.99635C2.89019 14 2 13.103 2 12V10.5C2 10.2238 2.22386 9.99997 2.5 9.99997Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
        {preview !== "" && (
          <Image
            className="object-cover"
            src={preview}
            alt="Page icon"
            fill={true}
          />
        )}
      </div>
      {fileRejections[0] && <DropzoneError error={fileRejections[0].errors} />}
    </>
  );
}
