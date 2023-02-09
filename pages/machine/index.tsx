import AppLayout from 'components/AppLayout';
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import MarijaTable from '../../components/MarijaTable/MarijaTable';

const client = new QueryClient();
const index: React.FC = () => {
  return (
    <>
      <MarijaTable
        classifier="machine"
        hiddenTableFields="MachineProducersId,MachineProducers,MachineId,SetProcesses,WasteProcesses,AccessoryProcesses,MachineSetUps,Parts,ProducerId,CentralId,MachineTypeId,CreationDate,ModificationDate,IsActive,UserId,NameLocal,DescriptionLocal,InstallationDate1,InstallationTime,ValidationDate1,ValidationTime,WarrantyPeriodFromDate,WarrantyPeriodFromTime,WarrantyPeriodToDate,WarrantyPeriodToTime"
      />
    </>
  );
};

export default index;
