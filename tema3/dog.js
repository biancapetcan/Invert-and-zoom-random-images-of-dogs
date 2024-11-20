const displayJSON = (data) => {
    const jsonContainer = document.createElement('pre');
    jsonContainer.textContent = JSON.stringify(data, null, 2);
    document.body.appendChild(jsonContainer);
  };
  
  const loadImage = async () => {
    try {
        const startTime = new Date();
        
        const res = await fetch('https://dog.ceo/api/breeds/image/random');
        const data = await res.json();
        
        const img = data.message;

        const dog_img = document.getElementById('dog_img');
        const img_originala = document.getElementById('img');
        const mirror_img = document.getElementById('mirror_img');
        const zoom_img = document.getElementById('zoom_img');
        const originalCtx = img_originala.getContext('2d');
        const mirror_ctx = mirror_img.getContext('2d');
        const zoom_ctx = zoom_img.getContext('2d');

        dog_img.src = img;
        
        await new Promise(resolve => dog_img.onload = resolve);

        const load_img = new Date();
        console.log('Load Image Time:', load_img - startTime, 'ms');
        
        // Imaginea originala:
        originalCtx.drawImage(dog_img, 0, 0, img_originala.width, img_originala.height);
        img_originala.style.display = 'inline-block';
        
        //Afisarea imaginii in canvas:
        const end_ph1 = new Date();
        console.log('Phase 1 Time:', end_ph1 - load_img, 'ms');

        setTimeout(() => {
          // Imaginea facuta in oglinda:
          mirror_ctx.translate(mirror_img.width, 0);
          mirror_ctx.scale(-1, 1);
          mirror_ctx.drawImage(dog_img, 0, 0, mirror_img.width, mirror_img.height);
          mirror_ctx.setTransform(1, 0, 0, 1, 0, 0); 
          mirror_img.style.display = 'inline-block';

          // Afisarea imaginii in oglinda:
          const end_ph2 = new Date();
          console.log('Phase 2 Time:', end_ph2 - end_ph1, 'ms');

          setTimeout(() => {
            //Imaginea marita:
            const scala = 1.5;
            const latime = img_originala.width * scala;
            const inaltime = img_originala.height * scala;
            zoom_ctx.drawImage(
              dog_img,
              0,
              0,
              img_originala.width,
              img_originala.height,
              (zoom_img.width - latime) / 2,
              (zoom_img.height - inaltime) / 2,
              latime,
              inaltime
            );
            zoom_img.style.display = 'inline-block';

            //Afisarea imaginii marite:
            const end_ph3 = new Date();
            console.log('Phase 3 Time:', end_ph3 - end_ph2, 'ms');
            console.log('Total Time:', end_ph3 - startTime, 'ms');
            displayJSON(data);
          }, 1000);
        }, 1000);
      } catch (error) {
        console.error('Error:', error);
      }
  };
  
  document.addEventListener('DOMContentLoaded', function () {
    const randomButton = document.getElementById('buton');
  
    randomButton.addEventListener('click', function () {
      location.reload();
    });
  
    loadImage();
  });
  