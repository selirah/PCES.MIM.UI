import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface Props {
  materials: any[];
  letter: string;
  depositId: number;
  subCategoryId: number;
}

const SituationButton: React.FC<Props> = ({
  materials,
  letter,
  depositId,
  subCategoryId,
}: Props) => {
  const [shortage, setShortage] = useState<boolean>(false);

  useEffect(() => {
    setShortage(
      materials.find((element) => element.ProposedQuantity > 0) != undefined
    );
  }, [materials]);
  const inShortage: string =
    'mx-2 px-4 py-2 bg-red-400 rounded-xl text-white hover:scale-110';
  const notInShortage: string =
    'mx-2 px-4 py-2 bg-green-400 rounded-xl text-white hover:scale-110';
  return (
    <Link
      href={`depositsituation/depositpreview/${depositId}?subCategoryId=${subCategoryId}`}
    >
      <a>
        <div className={shortage ? inShortage : notInShortage}>{letter}</div>
      </a>
    </Link>
  );
};

export default SituationButton;
