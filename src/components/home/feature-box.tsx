import React from "react";

import { LucideIcon } from "lucide-react";

import { H2 } from "../typography/h2";
import { Para } from "../typography/para";

type FeatureBoxProps = {
  Icon: LucideIcon;
  title: string;
  description: string;
};

export default function FeatureBox({
  Icon,
  title,
  description,
}: FeatureBoxProps) {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg bg-brand-bg px-5 py-5 shadow-md sm:px-10">
      <Icon className="mx-auto mb-5 h-10 w-10 text-brand-blue" />

      <H2 className="break-words pb-4">{title}</H2>

      <Para className="mx-auto w-full break-words">{description}</Para>
    </div>
  );
}
