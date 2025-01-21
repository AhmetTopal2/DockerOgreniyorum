import { toast } from 'react-toastify';

export const notify = {
  success: (message) => {
    toast.success(message, {
      icon: '🎉'
    });
  },
  error: (message) => {
    toast.error(message, {
      icon: '❌'
    });
  },
  warning: (message) => {
    toast.warning(message, {
      icon: '⚠️'
    });
  },
  info: (message) => {
    toast.info(message, {
      icon: 'ℹ️'
    });
  },
  // Ürün işlemleri
  productSuccess: {
    create: () => notify.success('Ürün başarıyla eklendi!'),
    update: () => notify.success('Ürün başarıyla güncellendi!'),
    delete: () => notify.success('Ürün başarıyla silindi!'),
  },
  productError: {
    create: (error) => notify.error(`Ürün eklenirken hata oluştu: ${error}`),
    update: (error) => notify.error(`Ürün güncellenirken hata oluştu: ${error}`),
    delete: (error) => notify.error(`Ürün silinirken hata oluştu: ${error}`),
    notFound: () => notify.error('Ürün bulunamadı!'),
    load: (error) => notify.error(`Ürünler yüklenirken hata oluştu: ${error}`),
  },
  // Kategori işlemleri
  categorySuccess: {
    create: () => notify.success('Kategori başarıyla eklendi!'),
    update: () => notify.success('Kategori başarıyla güncellendi!'),
    delete: () => notify.success('Kategori başarıyla silindi!'),
    statusChange: (isActive) => notify.success(
      `Kategori başarıyla ${isActive ? 'aktif' : 'pasif'} duruma getirildi!`
    ),
  },
  categoryError: {
    create: (error) => notify.error(`Kategori eklenirken hata oluştu: ${error}`),
    update: (error) => notify.error(`Kategori güncellenirken hata oluştu: ${error}`),
    delete: (error) => notify.error(`Kategori silinirken hata oluştu: ${error}`),
    notFound: () => notify.error('Kategori bulunamadı!'),
    load: (error) => notify.error(`Kategoriler yüklenirken hata oluştu: ${error}`),
  },
  // Satıcı işlemleri
  sellerSuccess: {
    create: () => notify.success('Satıcı başarıyla eklendi!'),
    update: () => notify.success('Satıcı başarıyla güncellendi!'),
    delete: () => notify.success('Satıcı başarıyla silindi!'),
  },
  sellerError: {
    create: (error) => notify.error(`Satıcı eklenirken hata oluştu: ${error}`),
    update: (error) => notify.error(`Satıcı güncellenirken hata oluştu: ${error}`),
    delete: (error) => notify.error(`Satıcı silinirken hata oluştu: ${error}`),
    notFound: () => notify.error('Satıcı bulunamadı!'),
    load: (error) => notify.error(`Satıcılar yüklenirken hata oluştu: ${error}`),
  },
  // Validasyon uyarıları
  validation: {
    required: (field) => notify.warning(`${field} alanı zorunludur!`),
    invalid: (field) => notify.warning(`Geçersiz ${field} değeri!`),
    minLength: (field, length) => notify.warning(`${field} en az ${length} karakter olmalıdır!`),
    maxLength: (field, length) => notify.warning(`${field} en fazla ${length} karakter olmalıdır!`),
    minValue: (field, value) => notify.warning(`${field} en az ${value} olmalıdır!`),
    maxValue: (field, value) => notify.warning(`${field} en fazla ${value} olmalıdır!`),
  }
}; 