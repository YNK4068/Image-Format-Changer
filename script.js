  let image = new Image();
    let originalDataURL = "";

    document.getElementById('imageInput').addEventListener('change', function (e) {
      const file = e.target.files[0];
      const done_msg = document.getElementById('done_msg');
      const downloadbtn = document.getElementById('downloadbtn');
      const convertbtn = document.getElementById('convertbtn');
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        originalDataURL = event.target.result;
        image.src = originalDataURL;
        document.getElementById('preview').src = originalDataURL;
        document.getElementById('preview').style.display = 'block';
      };
      reader.readAsDataURL(file);
      done_msg.classList.add("hidden");
      downloadbtn.classList.add("hidden");
      convertbtn.classList.remove("hidden");

    });

    function convertImage() {
      const format = document.getElementById('format').value;
      const grayscale = document.getElementById('grayscale').checked;
      const canvas = document.getElementById('canvas');
      const ctx = canvas.getContext('2d');

      

      let width = parseInt(document.getElementById('resizeWidth').value) || image.width;
      let height = parseInt(document.getElementById('resizeHeight').value) || image.height;

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(image, 0, 0, width, height);

      if (grayscale) {
        let imgData = ctx.getImageData(0, 0, width, height);
        let data = imgData.data;
        for (let i = 0; i < data.length; i += 4) {
          let avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = data[i + 1] = data[i + 2] = avg;
        }
        ctx.putImageData(imgData, 0, 0);
      }

      let mimeType = format === 'ico' ? 'image/png' : `image/${format}`;
      let dataURL = canvas.toDataURL(mimeType);

      // For ICO, simulate by renaming PNG extension (works for favicon)
      let extension = format === 'ico' ? 'ico' : format;

      const link = document.getElementById('downloadLink');
      const imageInput = document.getElementById("imageInput");
      const downloadbtn = document.getElementById('downloadbtn');
      const done_msg = document.getElementById('done_msg');
      link.href = dataURL;
      link.download = `converted-image.${extension}`;
      link.style.display = 'inline-block';
      link.textContent = 'Download';
      
      downloadbtn.classList.remove("hidden");
      done_msg.classList.remove("hidden");
    }

    function handlemenu(){
      var menu = document.getElementById("menubtn"); 
      menu.classList.toggle("hidden");
    }

    function sendMsg(){
      
      let name = document.getElementById("name");
      let mail = document.getElementById("mail");
      let msg = document.getElementById("msg");
      
      if(!name.value){
        alert("Please enter a your name before sending.");
        return;
      }
      else if(!mail.value){
        alert("Please enter a your email before sending.");
        return;
      }
      else if(!msg.value){
        alert("Please enter a message before sending.");
        return;
      }

      msg.value="";
      mail.value="";
      name.value="";
      alert(" Message send succussfully 👍");
    }

    function showHide(){
      let pass = document.getElementById("password");
      let eye = document.getElementById("eye");
      if(pass.type === "password"){
        pass.type = "text";
        eye.src = "./assets/hide_pass.png";
      }
      else{
        pass.type = "password";
        eye.src = "./assets/show_pass.png";
      }
    }
