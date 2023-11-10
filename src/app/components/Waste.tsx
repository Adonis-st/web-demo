import { useState } from "react";
import { Keypad } from "./Keypad";
import { BiArrowBack } from "react-icons/bi";
import { units, wasteReasons, witnessScanKeypadItems } from "@/data/medication";

interface Props {
  wasteSteps: number;
  setCurrentScreen: React.Dispatch<React.SetStateAction<string>>;
  keypadInput: string;
  setWasteSteps: React.Dispatch<React.SetStateAction<number>>;
  setKeypadInput: React.Dispatch<React.SetStateAction<string>>;
  resetValues: () => void;
  saveWasteSteps: () => void;
  setSelectMedication: React.Dispatch<React.SetStateAction<string>>;
}

export const Waste = ({
  wasteSteps,
  setCurrentScreen,
  keypadInput,
  setWasteSteps,
  resetValues,
  saveWasteSteps,
  setKeypadInput,
}: Props) => {
  const [wasteUnit, setWasteUnit] = useState("mg");

  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setWasteUnit(e.target.value);
  };

  const handleWasteSave = () => {
    saveWasteSteps();
    setWasteSteps(1);
    setKeypadInput("");
    setCurrentScreen("");
  };

  return (
    <>
      {wasteSteps === 1 && (
        <>
          <div className="flex justify-between mt-4">
            <button className="btn" onClick={() => setCurrentScreen("")}>
              back
            </button>
          </div>
          <h2 className="text-2xl text-center mt-3 ">Enter/Scan Witness</h2>
          {/* <input
            value={keypadInput}
            readOnly
            className="w-[90%] h-6 mx-auto border block focus:outline-none"
          /> */}
          <div className="grid grid-cols-3 mt-5 gap-[10px]">
            {witnessScanKeypadItems.map((item, index) => {
              return (
                <button
                  key={index}
                  // onClick={() => keypadEnter(item)}
                  onClick={() => setWasteSteps(2)}
                  className="border border-black h-[120px] font-bold rounded-[5px] text-2xl"
                >
                  {item === "back" ? (
                    <BiArrowBack className="mx-auto text-4xl text-black font-bold" />
                  ) : (
                    item
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      {wasteSteps === 2 && (
        <>
          <div className="flex justify-between">
            <button className="btn" onClick={resetValues}>
              Cancel
            </button>
            <button className="btn" onClick={() => setWasteSteps(3)}>
              Save
            </button>
          </div>
          <h2 className="text-2xl text-center">Quantity to Waste</h2>

          <Keypad keypadInput={keypadInput} setKeypadInput={setKeypadInput} />
        </>
      )}

      {wasteSteps === 3 && (
        <>
          <div className="flex justify-between">
            <button className="btn" onClick={resetValues}>
              Cancel
            </button>
            <button className="btn" onClick={() => handleWasteSave()}>
              Save
            </button>
          </div>
          <h2 className="text-2xl text-center mt-3 font-medium">
            Waste Options
          </h2>
          <input
            value={`${keypadInput} ${wasteUnit}`}
            readOnly
            className="w-[90%] h-8 mx-auto border block focus:outline-none border-black mt-2 text-center rounded-sm "
          />

          <div className="mt-5 flex items-center">
            <label htmlFor="wasteUnits" className=" mr-10">
              Waste UOM:
            </label>
            <select
              id="wasteUnits"
              value={wasteUnit}
              onChange={handleUnitChange}
              className="grow bg-[#464949] text-white rounded-[5px] h-6"
            >
              {units.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-5 flex items-center ">
            <label htmlFor="wasteReason" className="min-w-max mr-5">
              Waste Reason:
            </label>
            <select
              id="wasteReason"
              value={wasteUnit}
              onChange={handleUnitChange}
              className="grow bg-[#464949] text-white rounded-[5px] h-6 "
            >
              <option value=""></option>
              {wasteReasons.map((reason) => (
                <option key={reason} value={reason}>
                  {reason}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </>
  );
};
