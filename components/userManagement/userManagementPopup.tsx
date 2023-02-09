import axios from 'axios';
import GeneralFailPopup from 'components/general/PopUp/GeneralFailPopup';
import GeneralSuccessPopup from 'components/general/PopUp/GeneralSuccessPopup';
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import Select from 'react-select';
import { MultiSelect } from 'react-multi-select-component';
import router from 'next/router';
import { ENV } from '../../env';

interface Props {
  show: boolean;
  setShow: any;
  userId: number | undefined;
}

const UserManagementPopup: React.FC<Props> = (props) => {
  const { show, setShow, userId } = props;

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [fullname, setFullname] = useState<string>('');
  const [primaryPhoneNo, setPhone] = useState<string>('');
  const [roleId, setRoleId] = useState<any[]>([]);
  const [specialUser, setSpecialUser] = useState<string>();
  const [showError, setShowError] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [role, setRole] = useState<number[]>([]);
  const [selected, setSelected] = useState([]);
  const [options, setOptions] = useState([]);

  const fetchRoles = async () => {
    return await axios.get(ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetRoles');
  };

  const onClick = (e) => {
    e.preventDefault();
    setShow(false);
    setShowSuccess(false);
    router.reload();
  };

  const specialUserValues = [
    {
      name: 'True',
      value: true,
    },
    {
      name: 'False',
      value: false,
    },
  ];

  const rolesQuery = useQuery('fetchRoles', fetchRoles);

  useEffect(() => {
    if (rolesQuery.data != undefined) {
      setRoleId(rolesQuery.data.data);
    }
  }, [rolesQuery.data]);

  const submit = async () => {
    const toSubmit = {
      username,
      password,
      email,
      fullname,
      primaryPhoneNo,
      roleIds: selected,
      specialUser,
    };
    try {
      await axios.post(ENV.NEXT_PUBLIC_API_ENDPOINT + '/AspNetUsers', toSubmit);
      setSuccessMessage('Successfully added new user');
      setShowSuccess(true);
      setUsername('');
      setEmail('');
      setPassword('');
      setFullname('');
      setPhone('');
      setRoleId(roleId);
      setSpecialUser('');
      setShow(false);
    } catch (error) {
      setShowError(true);
    }
  };

  useEffect(() => {
    setOptions(
      roleId.map((element: any) => {
        return { label: element.role, value: element.roleId };
      })
    );
  }, [roleId]);

  return show ? (
    <>
      <div
        className="fixed top-0 left-0 w-full h-full bg-opacity-50 bg-black flex justify-center items-center"
        onClick={(event: any) => {
          if (event.target.getAttribute('class')?.includes('bg-opacity-50')) {
            setShow(false);
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
              <label className="font-semibold text-gray-700">Password</label>
              <input
                type="password"
                className="border-2 border-gray-400 rounded-md w-full"
                value={password}
                onChange={(event) => {
                  setPassword(event?.target.value);
                }}
              />
            </div>
            <div>
              <label className="font-semibold text-gray-700">Fullname</label>
              <input
                type="text"
                className="border-2 border-gray-400 rounded-md w-full"
                value={fullname}
                onChange={(event: any) => {
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
                  setPhone(event?.target.value);
                }}
              />
            </div>
            <div className="flex-col">
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
            <div className="flex-col">
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
              className="text-white font-semibold bg-blue-900 rounded-md p-2 w-full mb-4"
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

export default UserManagementPopup;
