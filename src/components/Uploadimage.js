import { useState } from "react";
import React from "react";
import Button from "@mui/material/Button";
import CircularStatic from "./CircularStatic";
import { Card, CardMedia, CardActions } from "@mui/material";

const Uploadimage = () => {
  const [image, setimage] = useState();
  const [fileLoding, setfileLoding] = useState(false);

  const imgHanduler = (e) => {
    let imgSize = e.target.files[0].size * 0.001;
    let imgType = e.target.files[0].type;

    if (
      imgType === "image/jpeg" ||
      imgType === "image/png" ||
      imgType === "image/jpg"
    ) {
      console.log("yes selecter file mawa");
      if (imgSize >= 500 && imgSize <= 1024) {
        setfileLoding(true);
        setTimeout(() => {
          setimage(URL.createObjectURL(e.target.files[0]));
          setfileLoding(false);
        }, 3000);
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
            borderRadius: "50%",
            margintop: "20px",
            border: "2px solid blue",
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
        </CardActions>
      </Card>
      {fileLoding && <CircularStatic />}
    </div>
  );
};

export default Uploadimage;
