export type StoreProfile = {
  store_name: string;
  owner_name: string;
  store_type: string;
  address: string;
  email: string;
  phone: string;
  pos_status: string;
  invoice_tracking_status: string;
  market_area: string;
};

export const storeProfile: StoreProfile = {
  store_name: "Sam's Market",
  owner_name: "Sam Patel",
  store_type: "Neighborhood Grocery",
  address: "123 Main Street, Queens, NY 11375",
  email: "sam@samsmarket.example",
  phone: "(718) 555-0198",
  pos_status: "Connected",
  invoice_tracking_status: "Active",
  market_area: "Queens, NY",
};
