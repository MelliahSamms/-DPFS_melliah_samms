const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
      const filetypes = /jpeg|jpg|png|gif/;
      const mimetype = filetypes.test(file.mimetype);
      const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb(new Error('Tipo de archivo no permitido'), false);
      }
    },
    limits: { fileSize: 2 * 1024 * 1024 } // Limitar tamaño de archivo a 2MB
  });
  