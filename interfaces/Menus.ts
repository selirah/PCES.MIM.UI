export type MenuType = {
  CreatedBy: string
  CreationDate: string
  Description: string
  Executables: boolean
  HeaderDefinition: string
  IconName: string
  IsActive: boolean
  MenuId: number
  MenuOrder: number
  MenuParameters: string
  ModificationDate: string
  Name: string
  ParentMenuId: 0
  Role: string | null
  subMenus: Array<MenuType>
  Title: string
  UrlPath: string
}