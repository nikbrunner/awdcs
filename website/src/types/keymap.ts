export interface KeymapNode {
  label: string;
  description?: string;
  notes?: string;
  keymaps?: Record<string, KeymapNode>;
}

export interface KeymapRoot {
  leader?: {
    label: string;
    keymaps: Record<string, KeymapNode>;
  };
  [key: string]: KeymapNode | undefined;
}
