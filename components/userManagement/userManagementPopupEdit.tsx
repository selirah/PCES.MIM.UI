import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import router from 'next/router';
import React, { useEffect, useState } from 'react';
import { MultiSelect } from 'react-multi-select-component';
import { useQuery } from 'react-query';
import { ENV } from '../../env';

interface Props {
  openEdit: boolean;
  setOpenEdit: any;
  userId: number | undefined;
  username: string;
  fullName: string;
  email: string;
  primaryPhoneNo: number;
  setUsername: any;
  setRoleIds: any;
  setFullname: any;
  setEmail: any;
  setPrimaryPhoneNo: any;
  selected: any;
  setSelected: any;
  specialUser: string;
  setSpecialUser: any;
}

const UserManagementPopupEdit: React.FC<Props> = (props) => {
  const {
    openEdit,
    setOpenEdit,
    userId,
    username,
    fullName,
    email,
    primaryPhoneNo,
    setUsername,
    setRoleIds,
    setFullname,
    setEmail,
    setPrimaryPhoneNo,
    selected,
    setSelected,
    specialUser,
    setSpecialUser,
  } = props;

  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [options, setOptions] = useState([]);
  const [role, setRole] = useState<string>('');
  const [roles, setRoles] = useState<any[]>([]);
  const [Show, setShow] = useState<any>(false);

  const specialUserValues = [
    {
      name: 'true',
      value: true,
    },
    {
      name: 'false',
      value: false,
    },
  ];

  const fetchRoles = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetRoles');
  };

  const rolesQuery = useQuery('fetchRoles', fetchRoles);

  useEffect(() => {
    if (rolesQuery.data != undefined) {
      setRoles(rolesQuery.data.data);
    }
  }, [rolesQuery.data]);

  const submit = async () => {
    const toSubmit = {
      userId,
      username,
      email,
      fullName,
      primaryPhoneNo,
      specialUser,
      roleIds: selected,
    };
    try {
      setSuccessMessage('Successfully updated user');
      await axios.put(ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetUsers', toSubmit);
      setUsername('');
      setEmail('');
      setFullname('');
      setPrimaryPhoneNo('');
      setSpecialUser('');

      setShowSuccess(true);
    } catch (error) {
      setShowError(true);
    }
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  useEffect(() => {
    setOptions(
      roles.map((element: any) => {
        return { label: element.role, value: element.roleId };
      })
    );
  }, [roles]);

  return openEdit ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setOpenEdit(false);
          }
        }}
      >
        <div className="rounded-md relative w-full h-auto max-w-screen-sm bg-blend-overlay bg-white">
          <div className="font-semibold text-center text-xl divide-y border-b-4 mt-6">
            <span>Add New User</span>
          </div>
          <div className="grid grid-cols-2 p-4 col-auto gap-4 ">
            <div>
              <label className="font-semibold text-gray-700">Username: </label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md w-full"
                value={username}
                onChange={(event) => {
                  setUsername(event?.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Email</label>
              <input
                type="email"
                placeholder="example@email.com"
                className="border-2 border-gray-400 rounded-md w-full"
                value={email}
                onChange={(event) => {
                  setEmail(event?.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Fullname</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md w-full"
                value={fullName}
                onChange={(event) => {
                  setFullname(event?.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Phone</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md w-full"
                value={primaryPhoneNo}
                onChange={(event) => {
                  setPrimaryPhoneNo(event?.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">
                Special User
              </label>
              <select
                className="border-2 border-gray-400 rounded-md w-full"
                value={specialUser}
                onChange={(event) => {
                  setSpecialUser(event?.target.value);
                }}
              >
                {specialUserValues.map((element: any) => {
                  return <option value={element.value}>{element.name}</option>;
                })}
              </select>
            </div>
            <div>
              <label className="font-semibold text-gray-700">Roles</label>
              <MultiSelect
                className="rounded-md bg-gray-50 w-full"
                value={selected}
                onChange={setSelected}
                options={options}
                labelledBy="Select"
              />
            </div>
          </div>
          <div className="mx-4">
            <button
              onClick={submit}
              className="text-white font-semibold bg-blue-900 rounded-md p-2 mb-4 w-full"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      {showError ? (
        <GeneralFailPopup
          errorMessage="Something went wrong. Try again"
          setShow={setShowError}
        />
      ) : (
        ''
      )}
      {showSuccess ? (
        <GeneralSuccessPopup
          buttonLink={'/'}
          buttonMessage={'Ok'}
          successMessage={successMessage}
          onClick={onClick}
        />
      ) : (
        ''
      )}
    </>
  ) : (
    <></>
  );
};

export default UserManagementPopupEdit;
