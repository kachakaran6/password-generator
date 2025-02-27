import { useState, useCallback, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*()_+";

    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipBoard = () => {
    window.navigator.clipboard.writeText(password);
    passwordRef.current?.select();
  };

  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed]);

  return (
    <div className="h-screen bg-gradient-to-b from-green-200 to-green-500">
      <div className="max-w-7xl mx-auto p-4">
        <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-5 my-8 bg-[#11131e] text-pink-500">
          <h1 className="text-white text-2xl font-semibold text-center my-4">
            Password Generator
          </h1>
          <div className="flex shadow-md overflow-hidden mb-6">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-2 px-4 bg-[#222634] text-white text-lg font-medium"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipBoard}
              className="outline-none bg-blue-600 text-white px-4 py-2 hover:bg-blue-500 transition duration-300 ease-in-out"
            >
              Copy
            </button>
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-x-2">
                <label htmlFor="length" className="text-white">
                  Length:
                </label>
                <input
                  type="range"
                  min={6}
                  max={100}
                  value={length}
                  onChange={(e) => setLength(e.target.value)}
                  className="w-64 cursor-pointer"
                />
                <span className="text-white">{length}</span>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={numberAllowed}
                  onChange={() => {
                    setNumberAllowed((prev) => !prev);
                  }}
                  id="numberAllowed"
                  className="h-4 w-4"
                />
                <label htmlFor="numberAllowed" className="text-white">
                  Include Numbers
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center text-sm">
              <div className="flex items-center gap-x-2">
                <input
                  type="checkbox"
                  checked={charAllowed}
                  onChange={() => {
                    setCharAllowed((prev) => !prev);
                  }}
                  id="charAllowed"
                  className="h-4 w-4"
                />
                <label htmlFor="charAllowed" className="text-white">
                  Include Special Characters
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
