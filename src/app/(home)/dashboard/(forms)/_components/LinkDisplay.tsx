import { LinkType } from "@/types/PageTypes";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Input } from "@(forms)/_components/input";
import { useEffect, useState } from "react";
import testUrl from "@(forms)/_utils/testUrl";
import dynamic from "next/dynamic";
import { emptyIndex } from "@(forms)/_utils/emptyIndex";
const EditLink = dynamic(() => import("@(forms)/_components/editLink"));
const Modal = dynamic(() => import("@/_components/modal"));

export default function LinkDisplay() {
  const [openField, setOPenField] = useState<boolean>(false);
  const { setError, clearErrors, getValues } = useFormContext();

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

  const validateLink = (link: LinkType, fieldName: string) => {
    const linkUrl = testUrl(link.linkUrl);

    if (link.linkName === "") {
      setError(
        `${fieldName}.linkName`,
        { type: "required" },
        { shouldFocus: true },
      );
      return null;
    } else clearErrors(`${fieldName}.linkName`);
    if (!linkUrl) {
      setError(
        `${fieldName}.linkUrl`,
        { type: "pattern" },
        { shouldFocus: true },
      );
      return null;
    } else clearErrors(`${fieldName}.linkUrl`);
    return link;
  };
  const addLink = () => {
    const validLink = validateLink(newLink, newField);

    if (validLink) {
      update(lastIndex, validLink);
      setOPenField(false);
    }
    return;
  };
  const updateLink = (index: number, link: LinkType) => {
    const fieldName = `links.${index}`;
    const linkToUpdate = getValues(fieldName);
    const validLink = validateLink(link, fieldName);

    if (link.id === linkToUpdate.id) {
      if (validLink) {
        update(index, validLink);

        return true;
      }
    }
    return false;
  };
  const removeLink = (index: number) => {
    remove(index);
  };

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
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openField, clearErrors, newLink, newField]);
  useEffect(() => {
    if (!openField) {
      const test = emptyIndex(fields as any);

      if (test.length >= 1) {
        remove(test);
      }
    }
  }, [openField, remove, fields]);

  return (
    <>
      <div className="mt-3 flex flex-col">
        <p className="text-xl font-bold">Links</p>
        <div className="mt-3 min-h-32 p-2">
          <EditLink
            links={fields as any}
            removeLink={removeLink}
            updateLink={updateLink}
            moveField={move}
          />
        </div>
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
            required={true}
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
