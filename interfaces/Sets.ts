export type Product = {
  InstrumentId: number;
  ProductName: string;
  SerialNumber: string;
  Container: Array<Container>;
  Tray: number;
  Code: string | null;
  CleaningType: string;
};

export type Container = {
  ContainerId: number;
};

export interface Set {
  SetId: number;
  ProcessId?: number;
  ProcessStatusId?: number;
  Name: string;
  DescriptionEng: string;
  NameLocal: string | null;
  DescriptionLocal: string | null;
  SetImage: string;
  SetCode: string | null;
  StartDate: string | null;
  EndDate: string | null;
  Barcode: string | null;
  SetStatusId: number;
  DepositId: number;
  LocationDepositId: number;
  CreationDate: string | null;
  ModificationDate: string | null;
  IsActive: boolean;
  UserId: number;
  Products: Product[];
  Notes?: string;
}
