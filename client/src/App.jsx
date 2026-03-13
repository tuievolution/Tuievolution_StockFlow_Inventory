import { useContext, useState } from 'react';
import { SayimContext } from './context/SayimContext';
import ListItem from './components/ListItem';
import SayimForm from './components/SayimForm';
import { FaSearch, FaList, FaCalculator, FaPlus } from 'react-icons/fa';

function App() {
  const { filteredSayimListesi, searchType, setSearchType, setSearchText, toplamMiktar, setIsFormOpen, setEditingItem } = useContext(SayimContext);
  const [activeTab, setActiveTab] = useState('liste');

  const aramaTipleri = [
    { id: 'barkod', label: 'Barkod' }, { id: 'miktar', label: 'Miktar' },
    { id: 'urunAdi', label: 'Ürün Adı' }, { id: 'kaynakIsyeri', label: 'Kaynak İşyeri' },
    { id: 'fabrika', label: 'Fabrika' }, { id: 'evrakNo', label: 'Evrak No' }
  ];

  const handleOpenForm = () => {
    setEditingItem(null); // Yeni ekleme modu
    setIsFormOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 relative">
      <header className="bg-red-700 text-white shadow-md p-4 sticky top-0 z-10 flex justify-center items-center">
        <h1 className="text-2xl font-bold">Fiş Sayım</h1>
      </header>

      <main className="p-4 max-w-3xl mx-auto">
        {activeTab === 'ara' && (
          <div className="flex flex-col gap-4">
            <div className="flex overflow-x-auto gap-2 pb-2">
              {aramaTipleri.map(type => (
                <button
                  key={type.id}
                  onClick={() => setSearchType(type.id)}
                  className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium border transition-colors ${
                    searchType === type.id ? 'bg-red-700 text-white border-red-700' : 'bg-white text-gray-700 border-red-200'
                  }`}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <input 
              type="text" 
              placeholder={`${aramaTipleri.find(t => t.id === searchType)?.label} ara...`} 
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full p-3 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 shadow-sm"
            />
            <div className="mt-4">
              {filteredSayimListesi.map(item => <ListItem key={item._id} item={item} />)}
            </div>
          </div>
        )}

        {activeTab === 'liste' && (
          <div>
            {filteredSayimListesi.length === 0 ? (
              <p className="text-center text-gray-500 mt-10">Henüz fiş eklenmedi.</p>
            ) : (
              filteredSayimListesi.map(item => <ListItem key={item._id} item={item} />)
            )}
          </div>
        )}

        {activeTab === 'toplam' && (
          <div className="flex flex-col items-center justify-center mt-20 p-8 bg-white rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Toplam Miktar</h2>
            <span className="text-5xl font-extrabold text-gray-800">{toplamMiktar}</span>
            <p className="text-gray-500 mt-4 italic">Toplam sayılan fiş miktarı.</p>
          </div>
        )}
      </main>

      {/* Floating Action Button */}
      <button 
        className="fixed bottom-20 right-6 bg-red-700 text-white p-4 rounded-full shadow-xl hover:bg-red-800 transition-transform hover:scale-105 z-20"
        onClick={handleOpenForm}
      >
        <FaPlus size={24} />
      </button>

      {/* Modal Form */}
      <SayimForm />

      {/* Bottom TabBar */}
      <nav className="fixed bottom-0 w-full bg-red-700 text-white flex justify-around p-3 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] z-10 pb-safe">
        <button onClick={() => setActiveTab('ara')} className={`flex flex-col items-center transition-opacity ${activeTab === 'ara' ? 'opacity-100' : 'opacity-60'}`}>
          <FaSearch size={22} /> <span className="text-xs mt-1 font-medium">Ara</span>
        </button>
        <button onClick={() => setActiveTab('liste')} className={`flex flex-col items-center transition-opacity ${activeTab === 'liste' ? 'opacity-100' : 'opacity-60'}`}>
          <FaList size={22} /> <span className="text-xs mt-1 font-medium">Liste</span>
        </button>
        <button onClick={() => setActiveTab('toplam')} className={`flex flex-col items-center transition-opacity ${activeTab === 'toplam' ? 'opacity-100' : 'opacity-60'}`}>
          <FaCalculator size={22} /> <span className="text-xs mt-1 font-medium">Toplam</span>
        </button>
      </nav>
    </div>
  );
}

export default App;