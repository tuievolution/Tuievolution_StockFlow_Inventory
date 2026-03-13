import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SayimContext = createContext();

export const SayimProvider = ({ children }) => {
  const [sayimListesi, setSayimListesi] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [searchType, setSearchType] = useState('barkod');
  
  // Form/Modal yönetimi için stateler
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null); // Null ise ekleme, doluysa güncelleme modu

  const fetchVeriler = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/sayim');
      setSayimListesi(res.data);
    } catch (error) {
      console.error("Veri çekme hatası:", error);
    }
  };

  useEffect(() => { fetchVeriler(); }, []);

  const sayimEkle = async (yeniVeri) => {
    const res = await axios.post('http://localhost:5000/api/sayim', yeniVeri);
    setSayimListesi([res.data, ...sayimListesi]);
  };

  const sayimSil = async (id) => {
    await axios.delete(`http://localhost:5000/api/sayim/${id}`);
    setSayimListesi(sayimListesi.filter(item => item._id !== id));
  };

  const sayimGuncelle = async (id, guncelVeri) => {
    const res = await axios.put(`http://localhost:5000/api/sayim/${id}`, guncelVeri);
    setSayimListesi(sayimListesi.map(item => item._id === id ? res.data : item));
  };

  const toplamMiktar = sayimListesi.reduce((sum, item) => sum + Number(item.miktar || 0), 0);

  const filteredSayimListesi = sayimListesi.filter(item => {
    if (!searchText) return true;
    const val = item[searchType] ? String(item[searchType]).toLowerCase() : '';
    return searchType === 'barkod' ? val.startsWith(searchText.toLowerCase()) : val.includes(searchText.toLowerCase());
  });

  return (
    <SayimContext.Provider value={{
      sayimListesi, filteredSayimListesi, sayimEkle, sayimSil, sayimGuncelle,
      searchText, setSearchText, searchType, setSearchType, toplamMiktar,
      isFormOpen, setIsFormOpen, editingItem, setEditingItem
    }}>
      {children}
    </SayimContext.Provider>
  );
};