export interface Field {
  id: string;
  type: string;
  label: string;
  description?: string;
  options?: string[];
  value?: string | number;
}

export interface Form {
  _id: string;
  formId: string;
  title: string;
  fields: Field[];
}
