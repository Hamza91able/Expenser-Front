export let connection_string;
export let image_url;

if (window.location.hostname == "localhost") {
  connection_string = "http://localhost:8000/api/v1";
  image_url = "http://localhost:8000/";
} else {
  connection_string = "https://expenser-back.herokuapp.com/api/v1";
  image_url = "https://expenser-back.herokuapp.com/";
}
