import { useState, useEffect } from "react";
import contacts from "../public/data.json";

const alphabetFilter = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

export default function Home() {
  const [form, setForm] = useState(false);
  const [filter, setFilter] = useState();
  const [listAlpha, setListAlpha] = useState([])
  const [list, setList] = useState(contacts);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [id, setId] = useState();
  const checkLetterExist = (letter) => {
    const count = list.find((ctt) => ctt.name?.startsWith(letter));
    return !count;
  };
  useEffect(() => {
    const af = alphabetFilter.map(letter => ({
      label: letter,
      exist: !!list.find(item => item.name?.startsWith(letter))
    }))
    console.log(af)
    setListAlpha(af)
  }, [list]);
  const handleSave = () => {
    const newList = list;
    const data = {
      name,
      email,
      phone,
    };
    newList.push(data);
    setList(newList)
  };
  const handleClick = (item) => {
    console.log(item);
    setForm(true);
    setId(item.id);
    setName(item.name);
    setEmail(item.email);
    setPhone(item.phone);
  };
  return (
    <div className="container mx-auto px-20 pt-9 pb-[120px]">
      <div className="flex mb-4 gap-4 justify-between align-middle">
        <div className="font-bold text-xl pb-4 overline">
          AGENDA DE CONTATOS
        </div>
        <button
          onClick={() => setForm(!form)}
          className="text-4 bg-neutral-200  hover:bg-neutral-700 transition duration-500 px-8 py-2.5 rounded-lg"
        >
          NOVO CONTATO
        </button>
      </div>
      {form && (
        <form className="border border-neutral-400 rounded-lg p-8 flex flex-col gap-6">
          <div className="grid grid-cols-6 gap-6">
            <label className="col-span-1">Nome</label>
            <input
              className="outline-none border border-neutral-400 rounded-sm col-span-5"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <label className="col-span-1">E-mail</label>
            <input
              className="outline-none border border-neutral-400 rounded-sm col-span-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="grid grid-cols-6 gap-6">
            <label>Telefone</label>
            <input
              className="outline-none border border-neutral-400 rounded-sm col-span-5"
              placeholder="(xxx) xxxxxxx"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="text-4 bg-neutral-200 hover:bg-neutral-700 transition duration-200 px-12 py-1.5 rounded-lg"
              onClick={handleSave}
            >
              SALVAR
            </button>
          </div>
        </form>
      )}
      <div className="font-mono pt-12 text-lg flex gap-1.5">
        <button
          onClick={() => setFilter()}
          className={`${!filter ? "overline font-bold" : ""}`}
        >
          TODOS
        </button>

        {listAlpha.map((letter) => {
          return (
            <button
              key={letter.label}
              type="button"
              disabled={!letter.exist}
              onClick={() => setFilter(letter.label)}
              className={`${
                filter === letter.label ? "underline" : ""
              } disabled:text-[gray]`}
            >
              {letter.label}
            </button>
          );
        })}
      </div>
      <div className="grid gap-4">
        <div className="font-bold text-xl py-4 overline grid">CONTATOS</div>
        {/*cartão de contato */}
        {list
          .filter((ctt) =>
            filter ? ctt.name.toUpperCase().startsWith(filter) : true
          )
          .sort((a, b) => a.name?.localeCompare(b.name))
          .map((ctt, index) => (
            <button
              type="button"
              key={ctt.id + index}
              className="border border-neutral-400 rounded-lg p-4 px-6"
              onClick={() => handleClick(ctt)}
            >
              <div className="font-bold">{ctt.name}</div>
              <div>
                {ctt.email} {/* E-mail */}
              </div>
              <div>
                {ctt.phone} {/* Telefone */}
              </div>
            </button>
          ))}
      </div>
    </div>
  );
}
