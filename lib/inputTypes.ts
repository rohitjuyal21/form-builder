import { AlignLeft, AlignRight, CircleDot, Hash, Link } from "lucide-react";

export const inputTypes = [
  {
    value: "short-answer",
    label: "Short Answer",
    icon: AlignLeft,
  },
  {
    value: "long-answer",
    label: "Long Answer",
    icon: AlignRight,
  },
  {
    value: "single-select",
    label: "Single Select",
    icon: CircleDot,
  },
  {
    value: "url",
    label: "URL",
    icon: Link,
  },
  {
    value: "number",
    label: "Number",
    icon: Hash,
  },
];
