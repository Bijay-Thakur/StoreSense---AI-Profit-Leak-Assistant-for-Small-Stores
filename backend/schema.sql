-- =========================================================
-- StoreSense MVP Database Schema
-- Supabase / PostgreSQL
-- Safe version: does not drop existing tables
-- =========================================================

-- =========================================================
-- 1. user_profiles
-- User and business profile
-- =========================================================
create table if not exists public.user_profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text,
  business_name text,
  business_type text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- =========================================================
-- 2. vendors
-- Vendor / supplier information
-- =========================================================
create table if not exists public.vendors (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  vendor_name text not null,
  email text,
  phone text,
  payment_terms text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now()
);

-- =========================================================
-- 3. products
-- Product catalog, price, cost, stock
-- =========================================================
create table if not exists public.products (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  vendor_id bigint references public.vendors(id) on delete set null,

  sku text,
  name text not null,
  category text,

  sell_price numeric(10,2) not null default 0,
  latest_vendor_cost numeric(10,2) not null default 0,
  margin_pct numeric(6,2) not null default 0,

  current_stock integer not null default 0,
  reorder_point integer not null default 0,

  status text not null default 'active',
  image_url text,
  is_active boolean not null default true,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint products_status_check
    check (
      status in (
        'active',
        'low_stock',
        'profit_leak',
        'slow_moving',
        'weak_margin',
        'discontinued'
      )
    )
);

-- =========================================================
-- 4. sale_records
-- POS transaction / manual sale parent record
-- =========================================================
create table if not exists public.sale_records (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,

  sale_date date not null default current_date,
  transaction_time timestamp with time zone not null default now(),

  source_type text not null default 'mock_pos',
  pos_transaction_id text,
  payment_method text,
  store_location text,

  total_amount numeric(10,2) not null default 0,
  total_cost numeric(10,2) not null default 0,
  profit numeric(10,2) not null default 0,

  note text,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint sale_records_source_type_check
    check (source_type in ('manual', 'mock_pos', 'pos', 'receipt_upload'))
);

-- =========================================================
-- 5. sale_items
-- Items inside each sale
-- =========================================================
create table if not exists public.sale_items (
  id bigint generated always as identity primary key,
  sale_record_id bigint not null references public.sale_records(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,

  item_name text not null,
  quantity integer not null default 1,

  unit_price numeric(10,2) not null default 0,
  unit_cost numeric(10,2) not null default 0,
  line_total numeric(10,2) not null default 0,
  line_profit numeric(10,2) not null default 0,

  created_at timestamp with time zone not null default now()
);

-- =========================================================
-- 6. vendor_invoices
-- Vendor invoice / payment tracking
-- =========================================================
create table if not exists public.vendor_invoices (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  vendor_id bigint references public.vendors(id) on delete set null,

  invoice_number text,
  invoice_date date not null,
  due_date date not null,
  amount numeric(10,2) not null default 0,

  status text not null default 'unpaid',
  urgency text not null default 'green',

  pdf_file_path text,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint vendor_invoices_status_check
    check (status in ('paid', 'unpaid', 'due_soon', 'overdue')),

  constraint vendor_invoices_urgency_check
    check (urgency in ('green', 'yellow', 'orange', 'red'))
);

-- =========================================================
-- 7. invoice_line_items
-- Products/costs inside vendor invoices
-- =========================================================
create table if not exists public.invoice_line_items (
  id bigint generated always as identity primary key,
  invoice_id bigint not null references public.vendor_invoices(id) on delete cascade,
  product_id bigint references public.products(id) on delete set null,

  description text not null,
  quantity integer not null default 1,
  unit_cost numeric(10,2) not null default 0,
  total_cost numeric(10,2) not null default 0,

  created_at timestamp with time zone not null default now()
);

-- =========================================================
-- 8. uploaded_files
-- Images / PDFs stored in Supabase Storage
-- =========================================================
create table if not exists public.uploaded_files (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,

  sale_record_id bigint references public.sale_records(id) on delete set null,
  vendor_invoice_id bigint references public.vendor_invoices(id) on delete set null,

  file_path text not null,
  public_url text,
  file_type text not null default 'image',
  original_filename text,

  uploaded_at timestamp with time zone not null default now(),

  constraint uploaded_files_file_type_check
    check (file_type in ('image', 'pdf', 'receipt', 'invoice_pdf'))
);

-- =========================================================
-- 9. cost_history
-- Vendor cost history for product insight chart
-- =========================================================
create table if not exists public.cost_history (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,
  product_id bigint not null references public.products(id) on delete cascade,
  vendor_id bigint references public.vendors(id) on delete set null,
  invoice_id bigint references public.vendor_invoices(id) on delete set null,

  cost_date date not null default current_date,
  vendor_cost numeric(10,2) not null default 0,

  created_at timestamp with time zone not null default now()
);

-- =========================================================
-- 10. alerts
-- Owner action cards and alerts
-- =========================================================
create table if not exists public.alerts (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.user_profiles(id) on delete cascade,

  product_id bigint references public.products(id) on delete set null,
  vendor_invoice_id bigint references public.vendor_invoices(id) on delete set null,

  type text not null,
  severity text not null default 'medium',

  title text not null,
  message text,
  recommended_action text,

  impact_amount numeric(10,2),
  is_resolved boolean not null default false,
  resolved_at timestamp with time zone,

  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),

  constraint alerts_type_check
    check (
      type in (
        'low_stock',
        'profit_leak',
        'invoice_due',
        'invoice_overdue',
        'low_turnover',
        'weak_margin',
        'do_not_reorder',
        'reorder',
        'reprice'
      )
    ),

  constraint alerts_severity_check
    check (severity in ('low', 'medium', 'high', 'urgent', 'resolved'))
);