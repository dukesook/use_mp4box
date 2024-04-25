console.log('MP4Box: ', MP4Box);

const fileInput = document.getElementById('input');
fileInput.onchange = () => {
  const selectedFile = fileInput.files[0];

  selectedFile.arrayBuffer().then((buf) => {
    const mp4boxfile = MP4Box.createFile();

    mp4boxfile.onReady = function (info) {
      // console.log('Received File Information', info);
    };

    buf.fileStart = 0; // MP4Box needs each buffer to have a custom `fileStart` property, supposedly telling which slice of the file this ArrayBuffer refers to.
    mp4boxfile.appendBuffer(buf);
    mp4boxfile.flush();

    console.log(mp4boxfile);

    const meta = mp4boxfile.boxes.find((b) => b.type === 'meta');
    console.log('meta', meta);
  });
};
