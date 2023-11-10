
import { BiArrowBack } from "react-icons/bi";

interface Props {
  keypadInput: string;
  setKeypadInput: React.Dispatch<React.SetStateAction<string>>;
}
export const Keypad = ({ keypadInput, setKeypadInput }: Props) => {
  const keypadItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, "back", 0, "."];

  const keypadEnter = (input: number | string) => {
    if (input === "back") {
      const removedChar = keypadInput.slice(0, -1);
      setKeypadInput(removedChar);
    } else {
      setKeypadInput((prevState) => (prevState += input));
    }
  };
  return (
    <>
      <input
        value={keypadInput}
        readOnly
        className="w-[90%] h-8 mx-auto border block focus:outline-none border-black mt-1 bg-white rounded-sm text-center"
      />
      <div className="grid grid-cols-3 mt-4 gap-[6px]">
        {keypadItems.map((item, index) => {
          return (
            <button
              key={index}
              onClick={() => keypadEnter(item)}
              className="border border-black h-[120px] text-white rounded-[5px] text-xl"
            >
              {item === "back" ? (
                <BiArrowBack className="mx-auto text-2xl text-black" />
              ) : (
                item
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
