import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";
import CircularStatic from "./CircularStatic";
import { Card, CardMedia, CardActions } from "@mui/material";

const Uploadimage = () => {
  const [image, setimage] = useState();
  const [fileLoding, setfileLoding] = useState(false);

  const imgHanduler = async (e) => {
    let imgSize = e.target.files[0].size * 0.001;
    let imgType = e.target.files[0].type;

    if (
      imgType === "image/jpeg" ||
      imgType === "image/png" ||
      imgType === "image/jpg"
    ) {
      if (imgSize >= 500 && imgSize <= 1024) {
        setfileLoding(true);
        setTimeout(() => {
          setimage(URL.createObjectURL(e.target.files[0]));
          setfileLoding(false);
        }, 3000);
        const formData = new FormData();
        formData.append("file", e.target.files[0]);

        const res = await fetch("http://localhost:3001/upload-file", {
          method: "POST",
          body: formData,
        }).then((res) => res.json());
        alert(JSON.stringify(`${res.message}, status: ${res.status}`));
      } else {
        alert(
          `Please choose file between 0.5 - 1.0 mb other than ${Math.round(
            imgSize
          )}kb`
        );
      }
    } else {
      alert("Please upload in this formates {JPEG,JPG,PNG}");
    }
  };
  const showFileHanduler = async () => {
    const data = await fetch("http://localhost:3001/show-files", {
      method: "GET",
    }).then((item) => console.log(item));
    console.log(data);
  };

  return (
    <div>
      <Card
        sx={{
          width: "500px",
          height: "300px",
          backgroundColor: "lightblue",
          marginTop: "20px",
          margin: "auto",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt="Profile image"
          sx={{
            width: "200px",
            height: "200px",
            borderRadius: "40%",
            margintop: "20px",
            border: "10px solid skyblue",
            margin: "auto",
          }}
        />
        <CardActions>
          <Button
            variant="contained"
            component="label"
            sx={{
              margin: "auto",
            }}
          >
            Upload
            <input
              hidden
              accept="image/*"
              multiple
              type="file"
              onChange={imgHanduler}
            />
          </Button>
          <Button
            variant="contained"
            component="label"
            sx={{
              margin: "auto",
            }}
            onClick={showFileHanduler}
          >
            Show files
          </Button>
        </CardActions>
      </Card>
      {fileLoding && <CircularStatic />}
    </div>
  );
};

export default Uploadimage;
