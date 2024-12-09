import React from "react";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Field } from "@/lib/types";
import { formSchema } from "@/lib/zod";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import Question from "../Question";

const SortableQuestion = ({
  field,
  index,
}: {
  field: Field;
  index: number;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Question
        field={field}
        index={index}
        dragHandleProps={{
          ...attributes,
          ...listeners,
        }}
      />
    </div>
  );
};

export default function QuestionsList({ fields }: { fields: Field[] }) {
  const { setValue } = useFormContext<z.infer<typeof formSchema>>();

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = fields.findIndex((field) => field.id === active.id);
      const newIndex = fields.findIndex((field) => field.id === over?.id);

      const reorderedFields = arrayMove(fields, oldIndex, newIndex);
      setValue("fields", reorderedFields);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={fields.map((field) => field.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {fields.map((field, index) => (
            <SortableQuestion key={field.id} field={field} index={index} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
