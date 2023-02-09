import AppLayout from 'components/AppLayout';
import React, { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import axios from 'axios';
import BaseTable from 'components/general/BaseTable';
import UserManagementPopup from 'components/userManagement/userManagementPopup';
import UserManagementPopupEdit from 'components/userManagement/userManagementPopupEdit';
import UserManagementPopupDelete from 'components/userManagement/userManagementPopupDelete';
import UserManagementChangePassword from 'components/userManagement/userManagementChangePassword';
import ValidatePasswordPopup from 'components/validationManager/ValidatePasswordPopup';
import { OpenValidate } from 'types/user-managemnt';
import { ENV } from '../../env';

const index: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openPassword, setOpenPassword] = useState(false);
  const [openValidate, setOpenValidate] = useState<OpenValidate>({
    open: false,
    action: '',
  });

  const [show, setShow] = useState<boolean>(false);
  const [userId, setUserId] = useState();
  const [username, setUsername] = useState<any>();
  const [fullName, setFullname] = useState();
  const [password, setPassword] = useState();
  const [specialUser, setSpecialUser] = useState<string>();
  const [email, setEmail] = useState();
  const [primaryPhoneNo, setPrimaryPhoneNo] = useState();
  const [roleIds, setRoleIds] = useState<any[]>([]);

  const [selected, setSelected] = useState<any>([]);

  const usersQuery = useQuery(['fetchUsers'], fetchUsers);

  useEffect(() => {
    setSelected(
      roles
        .filter((element: any) => roleIds.includes(element.roleId))
        .map((element: any) => {
          return { label: element.role, value: element.roleId };
        })
    );
    console.log(selected);
  }, [roleIds]);

  const fetchRoles = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetRoles');
  };

  const rolesQuery = useQuery('fetchRoles', fetchRoles);
  const [roles, setRoles] = useState<any[]>([]);
  useEffect(() => {
    if (rolesQuery.data != undefined) {
      setRoles(rolesQuery.data.data);
    }
  }, [rolesQuery.data]);

  useEffect(() => {
    if (usersQuery.data != undefined) {
      setUsers(usersQuery.data.data);
    }
  }, [usersQuery.data]);
  const handleOnClose = () => {
    setOpenValidate({ open: false, action: '' });
  };

  const validatePasswordResult = (isValid: boolean) => {
    if (isValid) {
      setOpenValidate({ ...openValidate, open: false });
      switch (openValidate?.action) {
        case 'delete':
          setOpenDelete(true);
          break;
        case 'edit':
          setOpenEdit(true);
          break;
        case 'pwchange':
          setOpenPassword(true);
          break;
        case 'add':
          setShow(true);
          break;
        default: {
        }
      }
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Username',
        accessor: 'username',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },

      {
        Header: 'FullName',
        accessor: 'fullName',
      },

      {
        Header: 'Phone Number',
        accessor: 'primaryPhoneNo',
      },
      {
        Header: 'Roles',
        accessor: 'roleIds',
        Cell: ({ cell }: any) => {
          if (cell.value != undefined) {
            return cell.value.map((element: any) => {
              return (
                <div>
                  {roles.find((role: any) => role.roleId == element).role}
                  <br />
                </div>
              );
            });
          } else {
            return <div>No Roles</div>;
          }
        },
      },
      {
        Header: 'Actions',
        accessor: '',
        Cell: ({ cell }) => {
          return (
            <div className="flex gap-1">
              <div className="w-2/6 ">
                <button
                  onClick={() => {
                    setUserId(cell.row.original.userId);
                    setUsername(cell.row.original.username);
                    setEmail(cell.row.original.email);
                    setFullname(cell.row.original.fullName);
                    setPrimaryPhoneNo(cell.row.original.primaryPhoneNo);
                    setSpecialUser(cell.row.original.specialUser);
                    setRoleIds(cell.row.original.roleIds);
                    setOpenValidate({ open: true, action: 'edit' });
                  }}
                  className="bg-gray-500 w-full h-full text-white flex-1 text-lg p-2 rounded-md font-semibold"
                >
                  Edit
                </button>
              </div>
              <div className="w-3/6">
                <button
                  onClick={() => {
                    setPassword(cell.row.original.password);
                    setUserId(cell.row.original.userId);
                    setOpenValidate({ open: true, action: 'pwchange' });
                  }}
                  className="bg-green-500 w-full h-full text-white flex-1 text-lg p-2 rounded-md font-semibold"
                >
                  Change Password
                </button>
              </div>
              <div className="w-1/6">
                <button
                  onClick={() => {
                    setUserId(cell.row.original.userId);
                    setOpenValidate({ open: true, action: 'delete' });
                  }}
                  className=" bg-red-600 text-white w-full h-full flex-1 text-lg p-2 rounded-md font-semibold"
                >
                  x
                </button>
              </div>
            </div>
          );
        },
      },
    ],
    [users]
  );
  return (
    <>
      <div className="w-full p-8">
        <div className="row-span-2 mt-4 mb-8">
          <div className="w-full flex flex-col col-span-3 row-span-2 shadow-md rounded-md border-blue-800 border-t-4 ">
            <div className="w-fit overflow-x-scroll">
              <BaseTable data={users} columns={columns} />
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            setOpenValidate({ open: true, action: 'add' });
          }}
          className={
            'w-full bg-blue-900 rounded-md hover:bg-blue-700 font-semibold text-white text-lg p-2 mx-auto'
          }
        >
          Add New
        </button>
      </div>
      <UserManagementPopup userId={userId} show={show} setShow={setShow} />
      <UserManagementPopupEdit
        userId={userId}
        username={username}
        email={email}
        fullName={fullName}
        primaryPhoneNo={primaryPhoneNo}
        openEdit={openEdit}
        setUsername={setUsername}
        setEmail={setEmail}
        setFullname={setFullname}
        setRoleIds={setRoleIds}
        setPrimaryPhoneNo={setPrimaryPhoneNo}
        setOpenEdit={setOpenEdit}
        selected={selected}
        setSelected={setSelected}
        specialUser={specialUser}
        setSpecialUser={setSpecialUser}
      />
      <UserManagementPopupDelete
        userId={userId}
        openDelete={openDelete}
        setOpenDelete={setOpenDelete}
      />
      <UserManagementChangePassword
        userId={userId}
        openPassword={openPassword}
        setOpenPassword={setOpenPassword}
      />
      <ValidatePasswordPopup
        validatePasswordResult={validatePasswordResult}
        openValidate={openValidate}
        onClose={handleOnClose}
      />
    </>
  );
};

const fetchUsers = async () => {
  //const [_, { setUserId }] = params.queryKey;
  const result = await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + `/AspNetUsers`);
  return result;
};

export default index;
