import Modal from 'react-modal';
import { useEffect, useState } from 'react'; // Importa useState para manejar el estado de las imágenes
import { AiOutlineClose } from 'react-icons/ai';
import { IoIosCloseCircle } from 'react-icons/io';

import { useModalStore } from '../hooks/useModalStore';
import { useProductStore } from '../hooks/useProductStore';

Modal.setAppElement('#root');

export function ImageManagerModal() {
  const { activeVariant, uploadImages, deleteImage } = useProductStore();
  const { isImageManagerModalOpen, closeImageManagerModal } = useModalStore();
  const [images, setImages] = useState<File[]>([]);

  // Agrega un estado para las imágenes de la variante
  const [variantImages, setVariantImages] = useState(activeVariant.product_images);

  // Función para eliminar una imagen de la variante
  function handleDeleteImage(imageId: number) {
    // Filtra las imágenes para eliminar la que coincida con el ID
    deleteImage(imageId);
  }

  // Función para manejar la selección de nuevas imágenes
  function handleImageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const imagesArray: File[] = Array.from(event.target.files);
      setImages(imagesArray);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    uploadImages(images, activeVariant.uuid);
  }

  useEffect(() => {
    setVariantImages(activeVariant.product_images);
  }, [activeVariant]);

  useEffect(() => {
    return () => {
      closeImageManagerModal();
    };
  }, []);

  return (
    <Modal
      isOpen={isImageManagerModalOpen}
      onRequestClose={closeImageManagerModal}
      className="sticky top-0 w-3/7 flex-col p-8 text-left border rounded-lg bg-white"
      overlayClassName="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-30"
      closeTimeoutMS={50}
    >
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center gap-4">
          <div className="flex gap-4 items-center">
            <h2 className="text-xl sm:text-2xl  leading-relaxed font-bold text-gray-800">Imágenes</h2>
          </div>
          <button type="button" onClick={closeImageManagerModal}>
            <AiOutlineClose size={20} className="text-gray-900 hover:text-gray-500 transition-all duration-200" />
          </button>
        </div>
        <div className="flex flex-wrap">
          {variantImages.map(image => (
            <div key={image.id} className="flex gap-2">
              <div className="flex items-center mb-4 mr-4 relative">
                <img src={image.source} alt="Imagen de variante" className="w-24 h-24 mr-2 rounded-lg" />
                <button
                  className=" transition duration-300 ease-in-out text-red-500 hover:text-red-600 absolute -top-2 right-0"
                  onClick={() => handleDeleteImage(image.id)}
                >
                  <IoIosCloseCircle size={25} className="bg-white rounded-full" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Formulario para subir imágenes */}
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          id="images"
          name="images"
          multiple
          accept="image/*"
          onChange={handleImageUpload}
          className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
          required
        />
        {/* Botón para subir imágenes */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition duration-300 ease-in-out mt-4"
        >
          Subir imágenes
        </button>
        {/* Texto informativo sobre el rango de imágenes permitidas */}
        <p className="text-sm mt-2">Rango de imágenes permitidas: mínimo 1, máximo 5.</p>
      </form>
    </Modal>
  );
}
