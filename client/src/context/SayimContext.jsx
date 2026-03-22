import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const SayimContext = createContext();

export const SayimProvider = ({ children }) => {
  const [sayimListesi, setSayimListesi] = useState([]);
  const [arsivVerileri, setArsivVerileri] = useState([]);
  const [isAdmin, setIsAdmin] = useState(true); 
  
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const API_URL = 'https://tuievolution-stockflow-inventory.onrender.com';

  const fetchVeriler = async () => {
    try {
      // 1 ve 2. Değişiklik
      const res = await axios.get(`${API_URL}/api/sayim`);
      const arsivRes = await axios.get(`${API_URL}/api/archive`);
      setSayimListesi(res.data);
      setArsivVerileri(arsivRes.data);
    } catch (error) { console.error("Veri çekme hatası:", error); }
  };

  useEffect(() => { fetchVeriler(); }, []);

  const sayimEkle = async (yeniVeri) => {
    try {
      // 3. Değişiklik
      await axios.post(`${API_URL}/api/sayim`, yeniVeri);
      await fetchVeriler(); 
      return true;
    } catch (error) { 
      console.error("Veri ekleme hatası:", error);
      alert("Hata oluştu: " + (error.response?.data?.error || "Sunucu hatası"));
      return false;
    }
  };

  const sayimSil = async (id) => {
    try {
      // 4. Değişiklik
      await axios.delete(`${API_URL}/api/sayim/${id}`);
      await fetchVeriler(); 
    } catch (error) { console.error("Veri silme hatası:", error); }
  };

  const sayimGuncelle = async (id, guncelVeri) => {
    try {
      // 5. Değişiklik
      await axios.put(`${API_URL}/api/sayim/${id}`, guncelVeri);
      await fetchVeriler(); 
      return true;
    } catch (error) { 
      console.error("Güncelleme hatası:", error); 
      alert("Hata oluştu: " + (error.response?.data?.error || "Sunucu hatası"));
      return false;
    }
  };

  return (
    <SayimContext.Provider value={{
      sayimListesi, arsivVerileri, sayimEkle, sayimSil, sayimGuncelle, fetchVeriler,
      isAdmin, isFormOpen, setIsFormOpen, editingItem, setEditingItem
    }}>
      {children}
    </SayimContext.Provider>
  );
};