import React, { useEffect, useState } from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { useRouter } from 'next/router';

const LanguagePicker = () => {
  // const router = useRouter();
  // const { locale } = router;
  const [selected, setSelected] = useState('GB');

  // useEffect(() => {
  //   router.push(router.pathname, router.pathname, { locale: selected });
  // }, [selected]);

  // useEffect(() => {
  //   console.log(router);
  // }, [router]);
  return (
    <div>
      <ReactFlagsSelect
        countries={['GB', 'MK', 'AL']}
        selected={selected}
        onSelect={(code) => setSelected(code)}
        customLabels={{ GB: 'English', MK: 'Macedonian', AL: 'Albanian' }}
      />
    </div>
  );
};

export default LanguagePicker;
