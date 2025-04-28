import { getFavicon } from "@/app/_utils/getFavicon";
import { LinkType } from "@/types/PageTypes";
import { useEffect, useState } from "react";
import { UseFieldArrayMove, useFormContext } from "react-hook-form";
import { Input } from "./input";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Reorder } from "motion/react";
const Modal = dynamic(() => import("@/_components/modal"));

export default function EditLink({
  links,
  removeLink,
  updateLink,
  moveField,
}: {
  links: LinkType[];
  removeLink: (index: number) => void;
  updateLink: (index: number, link: LinkType) => boolean;
  moveField: UseFieldArrayMove;
}) {
  const [activeDrag, setActiveDrag] = useState<number>();
  const [openField, setOpenField] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const { getValues, clearErrors } = useFormContext();

  const activeField = `links.${activeIndex}`;
  const newLinkValue: LinkType = getValues(activeField);

  const openEdit = (index: number) => {
    setOpenField(true);
    setActiveIndex(index);
    return;
  };
  const closeEdit = () => {
    setOpenField(false);
    setActiveIndex(null);
    clearErrors(activeField);
    return;
  };
  const editLink = () => {
    if (activeIndex === null) {
      return;
    }

    const updateOk = updateLink(activeIndex, newLinkValue);

    if (updateOk) {
      setOpenField(false);
      setActiveIndex(null);
    }
    return;
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
    if (!openField) {
      clearErrors(activeField);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [openField, clearErrors, activeField]);

  return (
    <>
      {links.length < 1 ? (
        <>
          <span className="text-base-content/50 mb-3 flex justify-center">
            <svg
              width="64"
              height="64"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4.50021 0C4.77635 0 5.0002 0.223853 5.0002 0.49999V2.49995C5.0002 2.77609 4.77635 2.99994 4.50021 2.99994C4.22408 2.99994 4.00022 2.77609 4.00022 2.49995V0.49999C4.00022 0.223853 4.22408 0 4.50021 0ZM0.646451 0.64647C0.84171 0.451212 1.15829 0.451212 1.35354 0.64647L2.85351 2.14644C3.04877 2.3417 3.04877 2.65827 2.85351 2.85353C2.65826 3.04879 2.34168 3.04879 2.14642 2.85353L0.646452 1.35356C0.451193 1.1583 0.451193 0.841728 0.646451 0.64647ZM0.00030517 4.49991C0.00030517 4.22377 0.224158 3.99992 0.500295 3.99992H2.50025C2.77639 3.99992 3.00024 4.22377 3.00024 4.49991C3.00024 4.77605 2.77639 4.9999 2.50025 4.9999H0.500295C0.224158 4.9999 0.00030517 4.77605 0.00030517 4.49991ZM12.0001 10.4998C12.0001 10.2236 12.2239 9.9998 12.5001 9.9998H14.5C14.7761 9.9998 15 10.2236 15 10.4998C15 10.7759 14.7761 10.9998 14.5 10.9998H12.5001C12.2239 10.9998 12.0001 10.7759 12.0001 10.4998ZM10.5001 11.9998C10.7762 11.9998 11.0001 12.2236 11.0001 12.4997V14.4997C11.0001 14.7758 10.7762 14.9997 10.5001 14.9997C10.224 14.9997 10.0001 14.7758 10.0001 14.4997V12.4997C10.0001 12.2236 10.224 11.9998 10.5001 11.9998ZM12.1462 12.1462C12.3415 11.951 12.658 11.951 12.8533 12.1462L14.3533 13.6462C14.5485 13.8415 14.5485 14.158 14.3533 14.3533C14.158 14.5485 13.8414 14.5485 13.6462 14.3533L12.1462 12.8533C11.951 12.6581 11.951 12.3415 12.1462 12.1462ZM7.76478 3.69938C8.19177 3.27238 8.35724 3.11008 8.5116 3.00522C9.18794 2.54577 10.0431 2.53677 10.6784 2.95401C10.8227 3.04875 10.9767 3.19911 11.3886 3.61099C11.8005 4.02287 11.9509 4.17694 12.0456 4.3212C12.4628 4.95653 12.4539 5.81168 11.9944 6.48802C11.8895 6.64238 11.7272 6.80785 11.3002 7.23484L10.6815 7.85354C10.4863 8.0488 10.4863 8.36538 10.6815 8.56064C10.8768 8.75589 11.1934 8.75589 11.3886 8.56064L12.0073 7.94193L12.0502 7.89903C12.4199 7.5295 12.6564 7.29303 12.8216 7.04993C13.4968 6.05598 13.5316 4.7623 12.8815 3.77228C12.7229 3.53083 12.4918 3.29982 12.1404 2.94853L12.0957 2.9039L12.0511 2.85925C11.6998 2.50782 11.4688 2.27672 11.2273 2.11816C10.2373 1.46798 8.94364 1.50284 7.94968 2.17805C7.70659 2.34319 7.47012 2.57973 7.1006 2.94936L7.1006 2.94937L7.05769 2.99228L6.43898 3.61099C6.24372 3.80625 6.24372 4.12282 6.43898 4.31808C6.63424 4.51334 6.95081 4.51334 7.14607 4.31808L7.76478 3.69938ZM2.99191 7.05807L2.94899 7.10097C2.57935 7.4705 2.34282 7.70697 2.17767 7.95006C1.50246 8.94401 1.4676 10.2377 2.11778 11.2277C2.27634 11.4692 2.50744 11.7002 2.85886 12.0515L2.85888 12.0515L2.90352 12.0961L2.94815 12.1407L2.94815 12.1407L2.94817 12.1408C3.29945 12.4922 3.53045 12.7233 3.7719 12.8818C4.76193 13.532 6.0556 13.4972 7.04956 12.8219C7.29265 12.6568 7.52912 12.4203 7.89865 12.0506L7.94155 12.0077L8.56026 11.389C8.75552 11.1937 8.75552 10.8772 8.56026 10.6819C8.365 10.4867 8.04842 10.4867 7.85317 10.6819L7.23446 11.3006C6.80747 11.7276 6.642 11.8899 6.48764 11.9948C5.8113 12.4542 4.95615 12.4632 4.32082 12.046C4.17656 11.9512 4.02249 11.8009 3.61061 11.389C3.19873 10.9771 3.04837 10.8231 2.95363 10.6788C2.53639 10.0435 2.54539 9.18832 3.00484 8.51198C3.10971 8.35761 3.27201 8.19215 3.699 7.76516L4.3177 7.14645C4.51296 6.95119 4.51296 6.63462 4.3177 6.43936C4.12245 6.2441 3.80587 6.2441 3.61061 6.43936L2.99191 7.05807Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
          <span className="text-base-content/50 text-center">
            <p className="mb-3 font-semibold">There&apos;s nothing here yet!</p>
          </span>
        </>
      ) : (
        <>
          <Reorder.Group
            values={links}
            onReorder={(e) => {
              e.map((item, index) => {
                const activeElement = links[activeDrag!];
                if (item === activeElement) {
                  moveField(activeDrag!, index);
                  setActiveDrag(index);
                }
              });
            }}
          >
            {links.map((item, index) => (
              <Reorder.Item
                className="group flex items-center justify-between hover:cursor-grab"
                value={item}
                key={item.id}
                onDragStart={() => {
                  setActiveDrag(index);
                }}
              >
                <div className="flex gap-x-3">
                  {item.linkUrl != "" && (
                    <Image
                      src={getFavicon(item.linkUrl)}
                      width={24}
                      height={24}
                      alt=""
                    />
                  )}
                  <span>{item.linkName}</span>
                </div>
                <div className="opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    className="btn btn-circle btn-ghost btn-sm"
                    type="button"
                    onClick={() => openEdit(index)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.8536 1.14645C11.6583 0.951184 11.3417 0.951184 11.1465 1.14645L3.71455 8.57836C3.62459 8.66832 3.55263 8.77461 3.50251 8.89155L2.04044 12.303C1.9599 12.491 2.00189 12.709 2.14646 12.8536C2.29103 12.9981 2.50905 13.0401 2.69697 12.9596L6.10847 11.4975C6.2254 11.4474 6.3317 11.3754 6.42166 11.2855L13.8536 3.85355C14.0488 3.65829 14.0488 3.34171 13.8536 3.14645L11.8536 1.14645ZM4.42166 9.28547L11.5 2.20711L12.7929 3.5L5.71455 10.5784L4.21924 11.2192L3.78081 10.7808L4.42166 9.28547Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                  <button
                    className="btn btn-circle btn-ghost hover:text-warning btn-sm"
                    type="button"
                    onClick={() => removeLink(index)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.5 1C5.22386 1 5 1.22386 5 1.5C5 1.77614 5.22386 2 5.5 2H9.5C9.77614 2 10 1.77614 10 1.5C10 1.22386 9.77614 1 9.5 1H5.5ZM3 3.5C3 3.22386 3.22386 3 3.5 3H5H10H11.5C11.7761 3 12 3.22386 12 3.5C12 3.77614 11.7761 4 11.5 4H11V12C11 12.5523 10.5523 13 10 13H5C4.44772 13 4 12.5523 4 12V4L3.5 4C3.22386 4 3 3.77614 3 3.5ZM5 4H10V12H5V4Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
              </Reorder.Item>
            ))}
          </Reorder.Group>
          <Modal isOpen={openField} setIsOpen={setOpenField}>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Edit Link</legend>
              <Input
                label="Name"
                name={`${activeField}.linkName`}
                placeholder="Youtube"
              />
              <Input
                label="URL"
                name={`${activeField}.linkUrl`}
                placeholder="https://"
                type="url"
              />
              <div className="flex justify-around gap-x-2">
                <button
                  className="btn grow"
                  type="button"
                  onClick={() => closeEdit()}
                >
                  Cancel
                </button>
                <button
                  className="btn grow"
                  type="button"
                  onClick={() => editLink()}
                >
                  Done
                </button>
              </div>
            </fieldset>
          </Modal>
        </>
      )}
    </>
  );
}
