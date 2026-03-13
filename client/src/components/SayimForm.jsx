import { useState, useContext, useEffect } from 'react';
import { SayimContext } from '../context/SayimContext';

const SayimForm = () => {
  const { isFormOpen, setIsFormOpen, editingItem, setEditingItem, sayimEkle, sayimGuncelle } = useContext(SayimContext);

  const [formData, setFormData] = useState({
    barkod: '', miktar: '', urunAdi: '', kaynakIsyeri: '', fabrika: '', kaynakAmbar: '', evrakNo: '', ozelKod1: '', aciklama: ''
  });

  useEffect(() => {
    if (editingItem) {
      setFormData(editingItem); // Güncelleme moduysa mevcut verileri doldur
    } else {
      setFormData({ barkod: '', miktar: '', urunAdi: '', kaynakIsyeri: '', fabrika: '', kaynakAmbar: '', evrakNo: '', ozelKod1: '', aciklama: '' });
    }
  }, [editingItem]);

  if (!isFormOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.barkod || !formData.miktar) return alert("Barkod ve Miktar zorunludur!");

    if (editingItem) {
      sayimGuncelle(editingItem._id, formData);
    } else {
      sayimEkle(formData);
    }
    kapatForm();
  };

  const kapatForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
  };

  const inputs = [
    { name: 'barkod', label: 'Barkod *', type: 'text', required: true },
    { name: 'miktar', label: 'Miktar *', type: 'number', required: true },
    { name: 'urunAdi', label: 'Ürün Adı', type: 'text' },
    { name: 'kaynakIsyeri', label: 'Kaynak İşyeri', type: 'text' },
    { name: 'fabrika', label: 'Fabrika', type: 'text' },
    { name: 'kaynakAmbar', label: 'Kaynak Ambar', type: 'text' },
    { name: 'evrakNo', label: 'Evrak No', type: 'text' },
    { name: 'ozelKod1', label: 'Özel Kod 1', type: 'text' },
    { name: 'aciklama', label: 'Açıklama', type: 'text' },
  ];

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-red-700 text-white p-4">
          <h2 className="text-xl font-bold">{editingItem ? 'Fiş Güncelle' : 'Yeni Fiş Ekle'}</h2>
        </div>
        
        <div className="p-6 overflow-y-auto">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {inputs.map((input) => (
              <div key={input.name}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{input.label}</label>
                <input
                  type={input.type}
                  name={input.name}
                  value={formData[input.name] || ''}
                  onChange={handleChange}
                  required={input.required}
                  className="w-full p-2 bg-gray-100 border-none rounded-md focus:ring-2 focus:ring-red-500 outline-none"
                />
              </div>
            ))}
          </form>
        </div>

        <div className="p-4 border-t bg-gray-50 flex justify-end gap-3">
          <button onClick={kapatForm} className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-md font-medium transition">
            İptal
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md font-medium transition">
            {editingItem ? 'Güncelle' : 'Ekle'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SayimForm;