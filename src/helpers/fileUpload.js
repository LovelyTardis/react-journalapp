export const fileUpload = async (file) => {
  const cloudUrl = process.env.REACT_APP_URL;
  const formData = new FormData();
  formData.append("upload_preset", "react-journal");
  formData.append("file", file);
  try {
    const res = await fetch(cloudUrl, { method: "POST", body: formData });
    const { secure_url } = await res.json();
    return secure_url;
  } catch (err) {
    console.log(err);
  }
};
