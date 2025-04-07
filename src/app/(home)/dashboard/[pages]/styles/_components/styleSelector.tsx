"use client";

import dynamic from "next/dynamic";
import { LinkStyleType } from "@/types/PageTypes";
const LinkStyleSelector = dynamic(() =>
  import("./linkStyleSelector").then((mod) => mod.LinkStyleSelector),
);
const SolidSelector = dynamic(() =>
  import("../colorSelector").then((mod) => mod.SolidSelector),
);
const MultiColorTabs = dynamic(() =>
  import("../colorSelector").then((mod) => mod.MultiColorTabs),
);
const Collapse = dynamic(() =>
  import("./collapse").then((mod) => mod.Collapse),
);

export function Background({ currentStyle }: { currentStyle: string }) {
  return (
    <Collapse name="background" label="background" open={true}>
      <MultiColorTabs fieldName="background" currentStyle={currentStyle} />
    </Collapse>
  );
}

export function TextColor({ currentStyle }: { currentStyle: string }) {
  return (
    <Collapse name="" label="Text Color">
      <SolidSelector fieldName="textColor" currentStyle={currentStyle} />
    </Collapse>
  );
}

export function CardBackground({ currentStyle }: { currentStyle: string }) {
  return (
    <Collapse name="cardColor" label="Card Color">
      <MultiColorTabs
        fieldName="cardColor"
        currentStyle={currentStyle}
        transparent={true}
      />
    </Collapse>
  );
}

export function LinkStyle({ currentStyle }: { currentStyle: LinkStyleType }) {
  return (
    <Collapse name="link" label="Link Style">
      <div className="grid gap-y-5">
        <p className="text-sm font-medium">Style</p>
        <LinkStyleSelector
          currentStyle={currentStyle.linkStyle}
          fieldName="linkStyle"
        />
      </div>
      <div className="grid gap-y-5">
        <p className="text-sm font-medium">Background</p>
        <SolidSelector
          fieldName="linkBackground"
          currentStyle={currentStyle.linkBackground}
        />
      </div>
      <div className="grid gap-y-5">
        <p className="text-sm font-medium">Color</p>
        <SolidSelector
          fieldName="linkColor"
          currentStyle={currentStyle.linkColor}
        />
      </div>
    </Collapse>
  );
}
