import React, { useState } from "react";

export const UserUploadImage = () => {
  const [image, setimage] = useState();
  // const [fileLoding, setfileLoding] = useState(false);
  const submitHanduler = (e) => {
    e.preventDefault();
    console.log(e);
  };
  const changeHanduler = async (e) => {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    const res = await fetch("http://localhost:3000/upload-file", {
      method: "POST",
      body: formData,
    }).then((res) => res.json());
    alert(JSON.stringify(`${res.message}, status: ${res.status}`));

    setimage(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div>
      <div>
        <img
          src={image}
          alt="img"
          style={{ height: "200px", width: "200px" }}
        />
      </div>

      <form onSubmit={submitHanduler} action="file-upload">
        <input type="file" accept="image/*" onChange={changeHanduler} />
        <button type="submit">UPLOAD</button>
      </form>
    </div>
  );
};
