import React from "react";
import Select from "react-select";

const cameras = [
  { value: "ANY", label: "Any" },
  { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
  { value: "NAVCAM", label: "Navigation Camera" },
  { value: "MAST", label: "Mast Camera" },
  { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
  { value: "MAHLI", label: "Mars Hand Lens Imager" },
  { value: "MARDI", label: "Mars Descent Imager" },
  { value: "RHAZ", label: "Rear Hazard Avoidance Camera" }
];

const selectStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#fff" : "#000",
    textAlign: 'left'
  })
};

export default ({
  selectedCamera,
  sol,
  handleCameraChange,
  handleSolChange,
  handleSubmit,
  isFetchingImages
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <Select
        value={selectedCamera}
        onChange={handleCameraChange}
        options={cameras}
        styles={selectStyles}
        placeholder="Select Camera"
      />
      <input
        placeholder="Sol value between 0 to 2444"
        defaultValue={sol}
        onChange={e => handleSolChange(e.target.value)}
      />
      <br />
      <button type="submit" disabled={!selectedCamera || sol === '' || isFetchingImages}>{isFetchingImages ? 'Fetching Images' : 'Submit'}</button>
    </form>
    <style jsx>{`
      input {
          width: calc(100% - 20px);
          height: 34px;
          border-radius: 4px;
          outline: none;
          border: none;
          margin-top: 10px;
          padding: 2px 10px;
          font-size: 16px;
      }
      button {
          height: 34px;
          border-radius: 4px;
          outline: none;
          border: none;
          margin-top: 10px;
          padding: 2px 10px;
          font-size: 16px;
      }
    `}</style>
  </div>
);
