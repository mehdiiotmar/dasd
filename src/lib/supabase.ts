import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Order {
  id?: string;
  order_number?: string;
  customer_name: string;
  customer_phone: string;
  delivery_address: string;
  size: string;
  meat: string;
  sauce: string;
  extras: string[];
  quantity: number;
  special_instructions?: string;
  total_price: number;
  status?: string;
  created_at?: string;
  updated_at?: string;
}

export const createOrder = async (orderData: Order) => {
  const orderNumber = `NST-${new Date().toISOString().split('T')[0].replace(/-/g, '')}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

  console.log('Inserting order with number:', orderNumber);

  const { data, error } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      customer_name: orderData.customer_name,
      customer_phone: orderData.customer_phone,
      delivery_address: orderData.delivery_address,
      size: orderData.size,
      meat: orderData.meat,
      sauce: orderData.sauce,
      extras: orderData.extras || [],
      quantity: orderData.quantity,
      special_instructions: orderData.special_instructions || '',
      total_price: orderData.total_price,
      status: 'pending'
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Supabase error:', error);
    throw new Error(`Erreur base de données: ${error.message}`);
  }

  if (!data) {
    throw new Error('Aucune donnée retournée après insertion');
  }

  return data;
};

export const generateWhatsAppMessage = (order: Order, orderNumber: string) => {
  const extrasText = order.extras.length > 0 ? order.extras.join(', ') : 'Aucun';
  const specialText = order.special_instructions ? `\n📝 Instructions: ${order.special_instructions}` : '';

  return `🌮 *NOUVELLE COMMANDE - NEW SCHOOL TACOS*

👤 *${order.customer_name}*
📞 ${order.customer_phone}
📍 Adresse de livraison: ${order.delivery_address}

*MES INGRÉDIENTS:*
🥩 Viande: ${order.meat}
🌶️ Sauce: ${order.sauce}
📏 Taille: ${order.size}
➕ Extras: ${extrasText}
🔢 Quantité: ${order.quantity}${specialText}

💰 *Prix Total: ${order.total_price} DH*

Merci! 🔥`;
};
