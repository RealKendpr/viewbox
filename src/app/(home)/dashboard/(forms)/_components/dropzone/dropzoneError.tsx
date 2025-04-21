import { FileError } from "react-dropzone";

export function DropzoneError({ error }: { error: readonly FileError[] }) {
  return (
    error && (
      <ul className="text-error max-w-[28ch]" role="alert">
        {error.map(
          (error, index) =>
            (error.code == "type" || error.code == "size") && (
              <li key={index}>{error.message}</li>
            ),
        )}
      </ul>
    )
  );
}
