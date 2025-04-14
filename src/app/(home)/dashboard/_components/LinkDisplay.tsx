import { LinkType } from "@/types/PageTypes";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "../create/_components/input";
import { useEffect, useState } from "react";
import testUrl from "../_utils/testUrl";
import dynamic from "next/dynamic";
import { emptyIndex } from "../_utils/emptyIndex";
const EditLink = dynamic(() => import("./editLink"));
const Modal = dynamic(() => import("@/_components/modal"));

export default function LinkDisplay() {
  const [openField, setOPenField] = useState<boolean>(false);
  const {
    setError,
    clearErrors,
    getValues,
    formState: { errors },
  } = useFormContext();

  const { append, update, remove, move, fields } = useFieldArray({
    name: "links",
  });

  const lastIndex = fields.length - 1;
  const newField = `links.${lastIndex}`;
  const newLink: LinkType = getValues(newField);

  const handleOpenField = () => {
    setOPenField(true);
    append({ linkName: "", linkUrl: "" });
    return;
  };

  const validateLink = (link: LinkType) => {
    const linkUrl = testUrl(link.linkUrl);

    if (link.linkName === "") {
      setError(
        `${newField}.linkName`,
        { type: "required" },
        { shouldFocus: true },
      );
    }
    if (!linkUrl) {
      setError(
        `${newField}.linkUrl`,
        { type: "pattern" },
        { shouldFocus: true },
      );
      return null;
    }
    return link;
  };

  const addLink = () => {
    const validLink = validateLink(newLink);

    if (validLink) {
      update(lastIndex, validLink);
      setOPenField(false);
    }
  };
  const updateLink = (index: number, link: LinkType) => {
    const linkToUpdate = getValues(`links.${index}`);

    if (link.id === linkToUpdate.id) {
      update(index, link);
    }
    return;
  };
  const removeLink = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    if (newLink !== undefined)
      if (errors.links && newLink.linkName !== "") {
        clearErrors(`${newField}.linkName`);
      }
  }, [newLink, clearErrors, errors]);
  useEffect(() => {
    if (newLink !== undefined)
      if (errors.links && testUrl(newLink.linkUrl)) {
        clearErrors(`${newField}.linkUrl`);
      }
  }, [newLink, clearErrors, errors]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // enter should be allowed when user is focused on the Add button
      if (
        event.key === "Enter" &&
        document.activeElement?.tagName !== "BUTTON"
      ) {
        event.preventDefault();
      }
    };
    if (openField) {
      window.addEventListener("keydown", handleKeyDown);
      if (newLink !== undefined)
        if (newLink.linkUrl === "" && newLink.linkName === "") {
          clearErrors(newField);
        }
    }
    if (!openField) {
      remove(emptyIndex(fields as any));
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openField, clearErrors, newLink]);

  return (
    <>
      <div className="mt-3 flex min-h-52 flex-col">
        <p className="text-xl font-bold">Links</p>
        <EditLink
          links={fields as any}
          removeLink={removeLink}
          updateLink={updateLink}
          moveField={move}
        />
        <button
          className="btn btn-dash btn-sm mb-5 w-[calc(100%-12px)] self-center"
          type="button"
          onClick={() => handleOpenField()}
        >
          Add a link
        </button>
      </div>
      <Modal isOpen={openField} setIsOpen={setOPenField}>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Add Link</legend>
          <Input
            label="Name"
            name={`${newField}.linkName`}
            placeholder="Youtube"
          />
          <Input
            label="URL"
            name={`${newField}.linkUrl`}
            placeholder="https://"
            type="url"
          />
          <button className="btn" type="button" onClick={addLink}>
            Add
          </button>
        </fieldset>
      </Modal>
    </>
  );
}
