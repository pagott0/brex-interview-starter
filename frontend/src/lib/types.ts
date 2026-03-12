export type Item = {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateItemPayload = {
  title: string;
  description?: string;
  status?: string;
};