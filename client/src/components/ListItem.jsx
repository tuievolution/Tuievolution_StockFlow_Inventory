import { useState, useContext } from 'react';
import { SayimContext } from '../context/SayimContext';
import { FaTrash, FaEdit, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const ListItem = ({ item }) => {
  const { sayimSil, setIsFormOpen, setEditingItem } = useContext(SayimContext);
  const [isExpanded, setIsExpanded] = useState(false);

  let barkodColor = 'text-gray-900';
  if (item.barkod.toLowerCase().startsWith('y')) barkodColor = 'text-green-600';
  else if (item.barkod.toLowerCase().startsWith('x')) barkodColor = 'text-red-600';

  const handleEdit = (e) => {
    e.stopPropagation(); // Satırın açılıp kapanmasını engelle
    setEditingItem(item);
    setIsFormOpen(true);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-3 overflow-hidden">
      <div 
        className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex flex-col">
          <span className="font-bold text-gray-800">Ürün Adı: {item.urunAdi || 'Ürün'}</span>
          <span className={`font-bold ${barkodColor}`}>Barkod: {item.barkod}</span>
          <span className="text-gray-600">Miktar: {item.miktar}</span>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={handleEdit} className="text-blue-500 hover:text-blue-700">
            <FaEdit size={18} />
          </button>
          <button onClick={(e) => { e.stopPropagation(); sayimSil(item._id); }} className="text-red-500 hover:text-red-700">
            <FaTrash size={18} />
          </button>
          {isExpanded ? <FaChevronUp className="text-gray-400" /> : <FaChevronDown className="text-gray-400" />}
        </div>
      </div>

      {isExpanded && (
        <div className="p-4 bg-gray-50 border-t border-gray-100 text-sm flex flex-col gap-1">
          <p><strong>Kaynak İşyeri:</strong> {item.kaynakIsyeri || '-'}</p>
          <p><strong>Fabrika:</strong> {item.fabrika || '-'}</p>
          <p><strong>Kaynak Ambar:</strong> {item.kaynakAmbar || '-'}</p>
          <p><strong>Evrak No:</strong> {item.evrakNo || '-'}</p>
          <p><strong>Özel Kod 1:</strong> {item.ozelKod1 || '-'}</p>
          <p><strong>Açıklama:</strong> {item.aciklama || '-'}</p>
          <p className="text-xs text-gray-400 mt-2 text-right">Tarih: {new Date(item.tarihSaat).toLocaleString()}</p>
        </div>
      )}
    </div>
  );
};

export default ListItem;