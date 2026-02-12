export interface PopupConfig {
  enabled: boolean
  imageUrl: string
  linkUrl: string
  title: string
  description: string
}

export const defaultPopupConfig: PopupConfig = {
  enabled: false,
  imageUrl: "",
  linkUrl: "",
  title: "",
  description: "",
}
