class Config {
  apiEndpoit = "https://2taw83crpa.execute-api.us-east-1.amazonaws.com/"
}

const config = new Config();
let base64Image = '';

function readFile() {

  if (!this.files || !this.files[0]) return;

  const FR = new FileReader();

  FR.addEventListener("load", function (evt) {
    document.querySelector("#img").src = evt.target.result;
    base64Image = evt.target.result
  });

  FR.readAsDataURL(this.files[0]);

}

document.querySelector("#inp").addEventListener("change", readFile);

const sendImage = () => {
  axios({
    url: config.apiEndpoit, //your url
    method: 'post',
    responseType: 'blob',
    data: { 'img': base64Image }// important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'file.csv'); //or any other extension
    document.body.appendChild(link);
    link.click();
  }).catch(e => console.log(e));
}