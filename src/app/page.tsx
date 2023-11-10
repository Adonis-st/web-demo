"use client";

import { patientList } from "@/data/patient";
import { medicationList } from "@/data/medication";
import { useState } from "react";
import { Waste } from "./components/Waste";
import { Keypad } from "./components/Keypad";

const actionOptions = ["take", "return", "waste"];

export default function HomePage() {

  const [selectedPatient, setSelectedPatient] = useState(patientList?.[0].name);
  const [selectMedication, setSelectMedication] = useState("");
  const [currentScreen, setCurrentScreen] = useState("");
  const [keypadInput, setKeypadInput] = useState("");

  const [wasteSteps, setWasteSteps] = useState(1);

  const [medication, setMedication] = useState([{
    name: "Morphine",
    concentration: "10mg/1ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  },
  {
    name: "Midazolam",
    concentration: "2mg/2ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  },
  {
    name: "Ketamine",
    concentration: "500mg/5ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  },
  {
    name: "Fentanyl",
    concentration: "100mcg/2ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  },
  {
    name: "Propofol",
    concentration: "200mg/20ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  },
  {
    name: "Propofol",
    concentration: "200mg/20ml",
    take: "0",
    return: "0",
    waste: "0",
    wasteUnit: "mg",
  }]);

  const handlePatientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPatient(e.target.value);
    setMedication(medicationList);
  };

  const handleNextCase = () => {


    setSelectedPatient(patientList?.[1].name)
    setMedication(medicationList);
  
    
  };

  const changeScreen = ({
    chosenAction,
    chosenMedication,
  }: {
    chosenAction: string;
    chosenMedication: string;
  }) => {
    setSelectMedication(chosenMedication);
    setCurrentScreen(chosenAction);
  };

  const updateMedicationAmount = () => {
    const updatedMedication = [...medication];

    const medicationToUpdate = updatedMedication.find(
      (medication) => medication.name === selectMedication
    );
    if (currentScreen === "take") {
      if (medicationToUpdate) {
        medicationToUpdate.take = keypadInput;

        setMedication(updatedMedication);
      }
    }

    if (currentScreen === "return") {
      if (medicationToUpdate) {
        medicationToUpdate.return = keypadInput;

        setMedication(updatedMedication);
      }
    }
    setKeypadInput("");
    setCurrentScreen("");
  };

  const resetValues = () => {
    setWasteSteps(1);
    setCurrentScreen("");
    setKeypadInput("");
  };

  const saveWasteSteps = () => {
    const updatedMedication = [...medication];
    const medicationToUpdate = updatedMedication.find(
      (medication) => medication.name === selectMedication
    );

    if (medicationToUpdate) {
      medicationToUpdate.waste = keypadInput;

      setMedication(updatedMedication);
      setWasteSteps(3);
    }
  };

  return (
    <main className="mx-auto w-[93%] max-w-[400px] mt-5 lg:mt-7">
      {!currentScreen && (
        <>
          <div className="flex justify-between mt-2 ">
            <div className="text-3xl">🔒</div>
            <div className="text-4xl">⚙</div>
            <button onClick={() => handleNextCase()} className="btn">
              Next Case
            </button>
          </div>
          <div className="mt-3">
            <select
              value={selectedPatient}
              onChange={handlePatientChange}
              className="bg-[#464949] text-white"
            >
              {patientList.map((patient, index) => (
                <option
                  key={index}
                  value={patient.name}
                >{`${patient.name}, ${patient.dateOfBirth}`}</option>
              ))}
            </select>
          </div>

          <div className="flex justify-between items-center mt-3 ">
            <div className="w-[110px] border px-2 border-black text-[14px] h-[63px] rounded-[5px]">
              <span className="block">Medication</span>Name and concentration
            </div>

            {actionOptions.map((action) => (
              <div
                key={action}
                className="capitalize border border-black text-left p-2 text-[17px] h-[63px] w-[70px] rounded-[5px]"
              >
                {action}
              </div>
            ))}
          </div>

          <div className="mt-3">
            {medication.map((medication, index) => (
              <div
                key={index}
                className="flex justify-between items-center mt-3"
              >
                <div className="border border-black rounded-[5px] p-2 text-left text-[15px] w-[110px] ">
                  <div>{medication.name}</div>
                  <div>{medication.concentration}</div>
                </div>

                <button
                  onClick={() =>
                    changeScreen({
                      chosenAction: "take",
                      chosenMedication: medication.name,
                    })
                  }
                  className="border border-black rounded-[5px] text-[#464949]  h-[63px] w-[70px]"
                >
                  {`${medication.take} Vials`}
                </button>
                <button
                  onClick={() =>
                    changeScreen({
                      chosenAction: "return",
                      chosenMedication: medication.name,
                    })
                  }
                  className="border border-black rounded-[5px] text-[#464949]  h-[63px] w-[70px]"
                >
                  {`${medication.return} Vials`}
                </button>
                <button
                  onClick={() =>
                    changeScreen({
                      chosenAction: "waste",
                      chosenMedication: medication.name,
                    })
                  }
                  className="border border-black rounded-[5px] text-[#464949]  h-[63px] w-[70px]"
                >
                  {`${medication.waste} ${medication.wasteUnit}`}
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {currentScreen === "take" && (
        <>
          <div className="flex justify-between mt-2">
            <button className="btn" onClick={resetValues}>
              Cancel
            </button>
            <button className="btn" onClick={() => updateMedicationAmount()}>
              Save
            </button>
          </div>
          <h2 className="text-2xl text-center">Quantity to Take</h2>

          <Keypad keypadInput={keypadInput} setKeypadInput={setKeypadInput} />
        </>
      )}

      {currentScreen === "return" && (
        <>
          <div className="flex justify-between">
            <button className="btn" onClick={resetValues}>
              Cancel
            </button>
            <button className="btn" onClick={() => updateMedicationAmount()}>
              Save
            </button>
          </div>
          <h2 className="text-2xl text-center">Quantity to Return</h2>

          <Keypad keypadInput={keypadInput} setKeypadInput={setKeypadInput} />
        </>
      )}

      {currentScreen === "waste" && (
        <Waste
          wasteSteps={wasteSteps}
          setCurrentScreen={setCurrentScreen}
          keypadInput={keypadInput}
          setWasteSteps={setWasteSteps}
          resetValues={resetValues}
          saveWasteSteps={saveWasteSteps}
          setKeypadInput={setKeypadInput}
          setSelectMedication={setSelectMedication}
        />
      )}
    </main>
  );
}
